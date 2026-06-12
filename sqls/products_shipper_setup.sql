-- ============================================================
-- SHIPPER RLS SETUP
-- Run this entire file in the Supabase SQL Editor.
-- ============================================================

-- ── 1. SELECT: shippers can see all ready / shipped orders ──
DROP POLICY IF EXISTS "Shippers can view ready and shipped orders" ON public.orders;

CREATE POLICY "Shippers can view ready and shipped orders"
ON public.orders
FOR SELECT
USING (
  status IN ('ready', 'shipped')
  AND EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'shipper'
  )
);


-- ── 2. SELECT: shippers can also see delivered orders (needed for stats) ──
DROP POLICY IF EXISTS "Shippers can view delivered orders for stats" ON public.orders;

CREATE POLICY "Shippers can view delivered orders for stats"
ON public.orders
FOR SELECT
USING (
  status = 'delivered'
  AND EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'shipper'
  )
);

-- ── 3. UPDATE: drop ALL existing UPDATE policies to eliminate conflicts ──
--    Old policies from supabase_setup.sql may have conflicting WITH CHECK
--    clauses that block shippers (e.g. "Update address constraint" which
--    enforces status IN ('pending','accepted')).

DROP POLICY IF EXISTS "Update address constraint"                    ON public.orders;
DROP POLICY IF EXISTS "Admins can update all orders, users own pending" ON public.orders;
DROP POLICY IF EXISTS "Shippers can update order status"             ON public.orders;

-- ── 4. Recreate UPDATE policies cleanly ──

-- Customers: can only edit their own orders while status is still 'pending'
CREATE POLICY "Customers can update own pending orders"
ON public.orders
FOR UPDATE
USING  (auth.uid() = user_id AND status = 'pending')
WITH CHECK (auth.uid() = user_id);

-- Admins: full update access on all orders
CREATE POLICY "Admins can update any order"
ON public.orders
FOR UPDATE
USING  (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- Shippers: can advance ready→shipped or shipped→delivered on any order
CREATE POLICY "Shippers can update order status"
ON public.orders
FOR UPDATE
USING (
  status IN ('ready', 'shipped')
  AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'shipper')
)
WITH CHECK (
  status IN ('shipped', 'delivered')
  AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'shipper')
);
