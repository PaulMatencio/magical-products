-- 1. Enable Realtime publication for products table safely
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'products'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
  END IF;
END $$;

-- 2. Enable Realtime publication for categories table safely
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'categories'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.categories;
  END IF;
END $$;

-- 3. Ensure the replica identity is set to FULL so updates send all column data
ALTER TABLE public.products REPLICA IDENTITY FULL;
ALTER TABLE public.categories REPLICA IDENTITY FULL;

-- Ensure orders table has payment_id column
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_id UUID;

-- 4. Re-create the create_order_with_outbox function (with new payment_id parameter)
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
  -- Insert the Order
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

  -- Insert the Event into the Outbox (if provided)
  IF p_event_type IS NOT NULL AND p_event_payload IS NOT NULL THEN
    INSERT INTO public.domain_events (
      type, 
      payload
    ) VALUES (
      p_event_type, 
      p_event_payload || jsonb_build_object('id', v_order_id)
    );
  END IF;

  -- Return the created order with full details
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

GRANT EXECUTE ON FUNCTION public.create_order_with_outbox TO anon, authenticated, service_role;




-- 1. Ensure the supabase_realtime publication exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    CREATE PUBLICATION supabase_realtime;
  END IF;
END $$;

-- 2. Add the products table safely
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'products'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
  END IF;
END $$;

-- 3. Add the categories table safely
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'categories'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.categories;
  END IF;
END $$;

-- 4. Set Replica Identity to FULL so the database streams complete row data
ALTER TABLE public.products REPLICA IDENTITY FULL;
ALTER TABLE public.categories REPLICA IDENTITY FULL;
