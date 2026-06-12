-- ============================================================
-- Business Owner Role Setup
-- ============================================================
-- This script ensures the 'business_owner' role is supported
-- in the user_roles table and grants appropriate permissions.
-- 
-- The business_owner role provides read-only access to all
-- business intelligence data including orders, payments,
-- products, and analytics data.
-- ============================================================

-- 1) Update role CHECK constraint
ALTER TABLE public.user_roles
  DROP CONSTRAINT IF EXISTS user_roles_role_check;

ALTER TABLE public.user_roles 
  ADD CONSTRAINT user_roles_role_check 
  CHECK (role IN ('admin', 'shipper', 'operator', 'business_owner', 'customer'));

-- 2) orders
DROP POLICY IF EXISTS "Business owners can read all orders" ON public.orders;

CREATE POLICY "Business owners can read all orders"
  ON public.orders
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = 'business_owner'
    )
  );

-- 3) payments
DROP POLICY IF EXISTS "Business owners can read all payments" ON public.payments;

CREATE POLICY "Business owners can read all payments"
  ON public.payments
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = 'business_owner'
    )
  );

-- 4) products (may be redundant)
DROP POLICY IF EXISTS "Business owners can read all products" ON public.products;

CREATE POLICY "Business owners can read all products"
  ON public.products
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = 'business_owner'
    )
  );
