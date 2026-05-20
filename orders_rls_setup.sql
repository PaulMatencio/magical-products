-- ───────────────────────────────────────────────────────────────────
-- Orders Table RLS (Row Level Security) Configuration
-- Run this in your Supabase SQL Editor to enable guest checkouts
-- ───────────────────────────────────────────────────────────────────

-- 1. Enable RLS on the orders table
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 2. Grant basic permissions to all frontend users (anon and authenticated)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.orders TO anon, authenticated;


-- ───────────────────────────────────────────────────────────────────
-- CHOOSE ONE OF THE OPTIONS BELOW
-- ───────────────────────────────────────────────────────────────────

-- ── OPTION A: Using Anonymous Sign-in (Recommended) ───────────────
-- Use this if you have Anonymous Sign-in enabled in Supabase.
-- It ensures every guest has a unique user ID and cannot access others' data.

/*
-- Policy: Allow users to view their own orders
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
CREATE POLICY "Users can view own orders"
ON public.orders FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Allow users to create their own orders
DROP POLICY IF EXISTS "Base users can create their own orders" ON public.orders;
CREATE POLICY "Base users can create their own orders"
ON public.orders FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Allow users to delete/cancel their own orders
DROP POLICY IF EXISTS "Users can delete their own orders" ON public.orders;
CREATE POLICY "Users can delete their own orders"
ON public.orders FOR DELETE
USING (auth.uid() = user_id);

-- Policy: Allow users to update their own pending orders
DROP POLICY IF EXISTS "Users can update own pending orders" ON public.orders;
CREATE POLICY "Users can update own pending orders"
ON public.orders FOR UPDATE
USING (auth.uid() = user_id AND status = 'pending')
WITH CHECK (auth.uid() = user_id AND status = 'pending');
*/


-- ── OPTION B: Relaxed Policies for Unauthenticated Guests ─────────
-- Use this if you do NOT use Anonymous Sign-in and orders can have NULL user_id.

DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
CREATE POLICY "Users can view own orders"
ON public.orders FOR SELECT
USING (
  (auth.uid() = user_id) OR (is_guest = TRUE)
);

DROP POLICY IF EXISTS "Base users can create their own orders" ON public.orders;
CREATE POLICY "Base users can create their own orders"
ON public.orders FOR INSERT
WITH CHECK (
  (auth.uid() = user_id) OR (user_id IS NULL AND is_guest = TRUE)
);

DROP POLICY IF EXISTS "Users can delete their own orders" ON public.orders;
CREATE POLICY "Users can delete their own orders"
ON public.orders FOR DELETE
USING (
  (auth.uid() = user_id) OR (user_id IS NULL AND is_guest = TRUE AND status = 'pending')
);

DROP POLICY IF EXISTS "Users can update own pending orders" ON public.orders;
CREATE POLICY "Users can update own pending orders"
ON public.orders FOR UPDATE
USING (
  (auth.uid() = user_id AND status = 'pending') OR 
  (user_id IS NULL AND is_guest = TRUE AND status = 'pending')
)
WITH CHECK (
  (auth.uid() = user_id AND status = 'pending') OR 
  (user_id IS NULL AND is_guest = TRUE AND status = 'pending')
);
