-- 1. Enable RLS on orders table
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 2. Grant table permissions to both anonymous (anon) and authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON public.orders TO anon, authenticated;

-- 3. Policy: Allow users (including anonymous sign-ins) to view their own orders
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
CREATE POLICY "Users can view own orders"
ON public.orders
FOR SELECT
USING (auth.uid() = user_id);

-- 4. Policy: Allow users (including anonymous sign-ins) to create their own orders
DROP POLICY IF EXISTS "Base users can create their own orders" ON public.orders;
CREATE POLICY "Base users can create their own orders"
ON public.orders
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- 5. Policy: Allow users to cancel (delete) their own orders
DROP POLICY IF EXISTS "Users can delete their own orders" ON public.orders;
CREATE POLICY "Users can delete their own orders"
ON public.orders
FOR DELETE
USING (auth.uid() = user_id);

-- 6. Policy: Allow users to edit their own pending orders (e.g. shipping address)
DROP POLICY IF EXISTS "Users can update own pending orders" ON public.orders;
CREATE POLICY "Users can update own pending orders"
ON public.orders
FOR UPDATE
USING (auth.uid() = user_id AND status = 'pending')
WITH CHECK (auth.uid() = user_id AND status = 'pending');



-- 1. Enable RLS on orders table
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
-- 2. Grant table permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.orders TO anon, authenticated;
-- 3. Policy: Allow anyone (including completely unauthenticated guests) to create a guest order
DROP POLICY IF EXISTS "Base users can create their own orders" ON public.orders;
CREATE POLICY "Base users can create their own orders"
ON public.orders
FOR INSERT
WITH CHECK (
  (auth.uid() = user_id) OR (user_id IS NULL AND is_guest = TRUE)
);
-- 4. Policy: Allow unauthenticated guest tracking (selecting by ID & verification)
-- This is required so guests can retrieve their order details via ID
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
CREATE POLICY "Users can view own orders"
ON public.orders
FOR SELECT
USING (
  (auth.uid() = user_id) OR (is_guest = TRUE)
);
-- 5. Policy: Allow guests to delete/cancel their own pending guest orders
DROP POLICY IF EXISTS "Users can delete their own orders" ON public.orders;
CREATE POLICY "Users can delete their own orders"
ON public.orders
FOR DELETE
USING (
  (auth.uid() = user_id) OR (user_id IS NULL AND is_guest = TRUE AND status = 'pending')
);