-- 🛡️ Secure Database RPC for Atomic Order Cancellation and Inventory Restoration

-- 1. Create the RPC function
CREATE OR REPLACE FUNCTION public.cancel_order_with_inventory(p_order_id UUID)
RETURNS JSONB AS $$
DECLARE
  v_status TEXT;
  v_history JSONB;
  v_created_at TIMESTAMPTZ;
  v_items JSONB;
  v_order_user_id UUID;
  v_caller_role TEXT;
  v_item JSONB;
BEGIN
  -- A. Fetch the caller's role from user_roles (if registered)
  SELECT role INTO v_caller_role
  FROM public.user_roles
  WHERE user_id = auth.uid();

  -- B. Fetch order details
  SELECT status, status_history, created_at, items, user_id
  INTO v_status, v_history, v_created_at, v_items, v_order_user_id
  FROM public.orders
  WHERE id = p_order_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Order not found';
  END IF;

  -- C. Enforce Authorization (Prevent BOLA/IDOR)
  -- The operation is only authorized if:
  --   1. The caller is the order's owner (auth.uid() = user_id)
  --   2. OR the caller is an administrator ('admin' or 'operator')
  IF auth.uid() IS DISTINCT FROM v_order_user_id 
     AND COALESCE(v_caller_role, '') NOT IN ('admin', 'operator') THEN
    RAISE EXCEPTION 'Permission denied. You must be the owner of this order or an administrator to cancel it.';
  END IF;

  -- D. Idempotency Check
  IF v_status = 'cancelled' THEN
    RETURN jsonb_build_object('success', TRUE, 'message', 'Order is already cancelled.');
  END IF;

  -- E. State Validation
  -- Orders can only be cancelled while in 'pending' or 'accepted' state.
  -- Shipped, delivered, or already refunded orders cannot be cancelled.
  IF v_status NOT IN ('pending', 'accepted') THEN
    RAISE EXCEPTION 'Order cannot be cancelled in its current state: %', v_status;
  END IF;

  -- F. Update Status History
  v_history := COALESCE(v_history, '{}'::jsonb);
  IF NOT (v_history ? 'pending') THEN
    v_history := jsonb_set(v_history, '{pending}', to_jsonb(COALESCE(v_created_at, now())));
  END IF;
  v_history := jsonb_set(v_history, '{cancelled}', to_jsonb(now()));

  -- G. Atomically Update Order Status
  UPDATE public.orders
  SET status = 'cancelled',
      status_history = v_history
  WHERE id = p_order_id;

  -- H. Atomically Restore Inventory Stock
  FOR v_item IN SELECT * FROM jsonb_array_elements(v_items)
  LOOP
    UPDATE public.products
    SET quantity = quantity + COALESCE((v_item->>'cart_quantity')::integer, (v_item->>'quantity')::integer),
        in_stock = TRUE
    WHERE id = (v_item->>'id')::uuid;
  END LOOP;

  RETURN jsonb_build_object(
    'success', TRUE, 
    'message', 'Order cancelled and product stock successfully restored.',
    'order_id', p_order_id
  );
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER -- Runs with high-privilege access to bypass RLS for writing, but self-validates auth above
SET search_path = public;

-- 2. Grant execution permissions to anon, authenticated, and service roles
GRANT EXECUTE ON FUNCTION public.cancel_order_with_inventory(UUID) TO anon, authenticated, service_role;
