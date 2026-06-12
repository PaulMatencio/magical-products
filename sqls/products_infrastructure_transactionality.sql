-- 1. Create the Domain Events (Outbox) Table
CREATE TABLE IF NOT EXISTS domain_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  payload JSONB NOT NULL,
  occurred_at TIMESTAMPTZ DEFAULT now(),
  processed_at TIMESTAMPTZ,
  metadata JSONB
);


-- Ensure orders table has payment_id column
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_id UUID;

-- 2. Create a Transactional Function to save Order + Event
DROP FUNCTION IF EXISTS public.create_order_with_outbox(JSONB, NUMERIC, TEXT, TEXT, TEXT, TEXT, UUID, TEXT, JSONB);
DROP FUNCTION IF EXISTS public.create_order_with_outbox(JSONB, NUMERIC, TEXT, TEXT, TEXT, TEXT, UUID, TEXT, JSONB, UUID);
DROP FUNCTION IF EXISTS public.create_order_with_outbox(JSONB, DECIMAL, TEXT, TEXT, TEXT, TEXT, UUID, TEXT, JSONB);
DROP FUNCTION IF EXISTS public.create_order_with_outbox(JSONB, DECIMAL, TEXT, TEXT, TEXT, TEXT, UUID, TEXT, JSONB, UUID);
DROP FUNCTION IF EXISTS public.create_order_with_outbox(JSONB, DECIMAL, TEXT, TEXT, TEXT, UUID, TEXT, JSONB);
DROP FUNCTION IF EXISTS public.create_order_with_outbox(JSONB, NUMERIC, TEXT, TEXT, TEXT, UUID, TEXT, JSONB);

CREATE OR REPLACE FUNCTION public.create_order_with_outbox(
  p_items JSONB,
  p_total_price NUMERIC,
  p_payment_method TEXT,
  p_shipping_address TEXT,
  p_user_phone TEXT DEFAULT NULL,
  p_user_email TEXT DEFAULT NULL,
  p_user_id UUID DEFAULT NULL,
  p_event_type TEXT DEFAULT NULL,
  p_event_payload JSONB DEFAULT NULL,
  p_payment_id UUID DEFAULT NULL
) RETURNS JSONB AS $$
DECLARE
  v_order_id UUID;
  v_result JSONB;
BEGIN
  -- 1. Insert the Order
  INSERT INTO public.orders (
    items, 
    total_price, 
    payment_method, 
    shipping_address, 
    user_phone, 
    user_email,
    user_id,
    status,
    created_at,
    payment_id
  ) VALUES (
    p_items, 
    p_total_price, 
    p_payment_method, 
    p_shipping_address, 
    p_user_phone, 
    p_user_email,
    p_user_id,
    'pending',
    now(),
    p_payment_id
  ) RETURNING id INTO v_order_id;

  -- 2. Insert the Event into the Outbox (if provided)
  IF p_event_type IS NOT NULL AND p_event_payload IS NOT NULL THEN
    INSERT INTO public.domain_events (
      type, 
      payload
    ) VALUES (
      p_event_type, 
      p_event_payload || jsonb_build_object('id', v_order_id)
    );
  END IF;

  -- 3. Return the created order
  SELECT jsonb_build_object(
    'id', v_order_id,
    'created_at', now(),
    'total_price', p_total_price,
    'status', 'pending',
    'payment_method', p_payment_method,
    'shipping_address', p_shipping_address,
    'user_phone', p_user_phone,
    'user_email', p_user_email,
    'user_id', p_user_id,
    'items', p_items,
    'payment_id', p_payment_id
  ) INTO v_result;

  RETURN v_result;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public;

-- 3. Grant Permissions
GRANT INSERT ON public.domain_events TO anon, authenticated;
GRANT ALL ON public.domain_events TO service_role;
GRANT EXECUTE ON FUNCTION public.create_order_with_outbox TO anon, authenticated, service_role;
