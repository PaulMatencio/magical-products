
-- Create the Domain Events (Outbox) Table
CREATE TABLE IF NOT EXISTS public.domain_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  payload JSONB NOT NULL,
  occurred_at TIMESTAMPTZ DEFAULT now(),
  processed_at TIMESTAMPTZ,
  metadata JSONB
);

-- Enable RLS (Security)
ALTER TABLE public.domain_events ENABLE ROW LEVEL SECURITY;

-- Grant permissions (though the SECURITY DEFINER function can write, it's good practice)
GRANT INSERT ON public.domain_events TO anon, authenticated;
GRANT ALL ON public.domain_events TO service_role;





-- 1. Drop existing overloaded functions to prevent conflicts
DROP FUNCTION IF EXISTS public.create_order_with_outbox(JSONB, DECIMAL, TEXT, TEXT, TEXT, TEXT, UUID, TEXT, JSONB);
DROP FUNCTION IF EXISTS public.create_order_with_outbox(JSONB, DECIMAL, TEXT, TEXT, TEXT, UUID, TEXT, JSONB);

-- 2. Create the unified transactional function with default values
CREATE OR REPLACE FUNCTION public.create_order_with_outbox(
  p_items JSONB,
  p_total_price NUMERIC,
  p_payment_method TEXT,
  p_shipping_address TEXT,
  p_user_phone TEXT DEFAULT NULL,
  p_user_email TEXT DEFAULT NULL,
  p_user_id UUID DEFAULT NULL,
  p_event_type TEXT DEFAULT NULL,
  p_event_payload JSONB DEFAULT NULL
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
    created_at
  ) VALUES (
    p_items, 
    p_total_price, 
    p_payment_method, 
    p_shipping_address, 
    p_user_phone, 
    p_user_email,
    p_user_id,
    'pending',
    now()
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
    'status', 'pending'
  ) INTO v_result;

  RETURN v_result;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public;

-- 3. Grant EXECUTE permissions to all roles
GRANT EXECUTE ON FUNCTION public.create_order_with_outbox TO anon, authenticated, service_role;
