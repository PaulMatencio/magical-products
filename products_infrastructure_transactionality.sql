-- 1. Create the Domain Events (Outbox) Table
CREATE TABLE IF NOT EXISTS domain_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  payload JSONB NOT NULL,
  occurred_at TIMESTAMPTZ DEFAULT now(),
  processed_at TIMESTAMPTZ,
  metadata JSONB
);


-- 2. Create a Transactional Function to save Order + Event
CREATE OR REPLACE FUNCTION create_order_with_outbox(
  p_items JSONB,
  p_total_price DECIMAL,
  p_payment_method TEXT,
  p_shipping_address TEXT,
  p_user_phone TEXT,
  p_user_email TEXT,
  p_user_id UUID,
  p_event_type TEXT,
  p_event_payload JSONB
) RETURNS JSONB AS $$
DECLARE
  v_order_id UUID;
  v_result JSONB;
BEGIN
  -- 1. Insert the Order
  INSERT INTO orders (
    items, 
    total_price, 
    payment_method, 
    shipping_address, 
    user_phone, 
    user_email,
    user_id,
    status,
    created_at
  ) VALUES (
    p_items, 
    p_total_price, 
    p_payment_method, 
    p_shipping_address, 
    p_user_phone, 
    P_user_email,
    p_user_id,
    'pending',
    now()
  ) RETURNING id INTO v_order_id;

  -- 2. Insert the Event into the Outbox (in the same transaction)
  INSERT INTO domain_events (
    type, 
    payload
  ) VALUES (
    p_event_type, 
    p_event_payload || jsonb_build_object('id', v_order_id)
  );

  -- 3. Return the created order
  SELECT jsonb_build_object(
    'id', v_order_id,
    'created_at', now(),
    'total_price', p_total_price,
    'status', 'pending'
  ) INTO v_result;

  RETURN v_result;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public;

-- 3. Grant Permissions
GRANT INSERT ON domain_events TO authenticated;
GRANT ALL ON domain_events TO service_role;
GRANT EXECUTE ON FUNCTION create_order_with_outbox TO authenticated;
