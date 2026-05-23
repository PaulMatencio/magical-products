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

-- ─────────────────────────────────────────────────────────────────────────────
-- ── EVENT PROCESSING MIGRATION (DB CRON / TRIGGERS) ──────────────────────────
-- ─────────────────────────────────────────────────────────────────────────────

-- Create a table to log processed events on the database side for visibility
CREATE TABLE IF NOT EXISTS public.db_event_processing_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.domain_events(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  status TEXT NOT NULL,
  error_message TEXT,
  processed_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on logs
ALTER TABLE public.db_event_processing_logs ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.db_event_processing_logs TO service_role;

-- 1. TRIGGER-BASED EVENT PROCESSING (Instant asynchronous webhook/worker dispatcher)
CREATE OR REPLACE FUNCTION public.process_domain_event_trigger()
RETURNS TRIGGER AS $$
DECLARE
  v_payload JSONB;
  v_order_id TEXT;
  v_shipping_address TEXT;
  v_total_price NUMERIC;
BEGIN
  -- Handle specific event types (e.g. OrderPlacedEvent)
  IF NEW.type = 'OrderPlacedEvent' THEN
    v_payload := NEW.payload;
    v_order_id := v_payload->>'orderId';
    v_shipping_address := v_payload->>'shippingAddress';
    v_total_price := (v_payload->>'totalPrice')::NUMERIC;
    
    -- [PRODUCTION NOTE]: In production, invoke a Supabase Edge Function:
    -- PERFORM net.http_post(
    --   url := 'https://<project-ref>.supabase.co/functions/v1/process-order-event',
    --   headers := '{"Content-Type": "application/json", "Authorization": "Bearer <service-key>"}'::jsonb,
    --   body := jsonb_build_object('eventId', NEW.id, 'type', NEW.type, 'payload', NEW.payload)
    -- );

    -- Log DB side execution
    INSERT INTO public.db_event_processing_logs (event_id, event_type, status)
    VALUES (NEW.id, NEW.type, 'SUCCESS');
  END IF;

  -- Mark the event as processed in the outbox
  UPDATE public.domain_events
  SET processed_at = now()
  WHERE id = NEW.id;

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  INSERT INTO public.db_event_processing_logs (event_id, event_type, status, error_message)
  VALUES (NEW.id, NEW.type, 'FAILED', SQLERRM);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public;

-- Bind the trigger to public.domain_events
DROP TRIGGER IF EXISTS trg_process_domain_event ON public.domain_events;
CREATE TRIGGER trg_process_domain_event
  AFTER INSERT ON public.domain_events
  FOR EACH ROW
  EXECUTE FUNCTION public.process_domain_event_trigger();

-- 2. CRON/SCHEDULE-BASED EVENT PROCESSING (Durable fallback/retry worker)
CREATE OR REPLACE FUNCTION public.cron_process_pending_events()
RETURNS VOID AS $$
DECLARE
  v_event RECORD;
BEGIN
  FOR v_event IN 
    SELECT * FROM public.domain_events 
    WHERE processed_at IS NULL 
    ORDER BY occurred_at ASC 
    LIMIT 100
  LOOP
    BEGIN
      -- [PRODUCTION NOTE]: Call edge function or worker webhook:
      -- PERFORM net.http_post(...);
      
      INSERT INTO public.db_event_processing_logs (event_id, event_type, status)
      VALUES (v_event.id, v_event.type, 'SUCCESS');
      
      UPDATE public.domain_events 
      SET processed_at = now() 
      WHERE id = v_event.id;
      
    EXCEPTION WHEN OTHERS THEN
      INSERT INTO public.db_event_processing_logs (event_id, event_type, status, error_message)
      VALUES (v_event.id, v_event.type, 'FAILED', SQLERRM);
    END;
  END LOOP;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public;

-- To register the cron schedule in Supabase (run manually in dashboard):
-- SELECT cron.schedule('process-outbox-events', '* * * * *', 'SELECT public.cron_process_pending_events()');
