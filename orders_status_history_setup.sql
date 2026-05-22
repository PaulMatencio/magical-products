-- ───────────────────────────────────────────────────────────────────
-- Orders Status History Database Migration
-- Run this script in the Supabase SQL Editor to enable tracking of the
-- exact date and time when order status changes occur.
-- ───────────────────────────────────────────────────────────────────

-- 1. Add status_history column to public.orders table if not exists
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS status_history JSONB DEFAULT '{}'::jsonb;

-- 2. Populate existing orders' status_history with their creation date as the 'pending' status date
UPDATE public.orders
SET status_history = jsonb_build_object('pending', created_at)
WHERE status_history IS NULL OR status_history = '{}'::jsonb;
