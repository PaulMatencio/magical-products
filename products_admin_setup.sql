-- ============================================================
-- PRODUCTS ADMIN RLS SETUP & SCHEMA UPDATE
-- Run this entire file in the Supabase SQL Editor.
-- ============================================================

-- ── 0. Update Schema (Adds missing columns if they don't exist) ──
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS description TEXT DEFAULT '';
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS manufacturer TEXT DEFAULT '';

-- ── 1. Enable RLS on Products, Categories, Brands and User Roles ──
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- ── 2. Policies for products ──
DROP POLICY IF EXISTS "Base anyone can view products" ON public.products;
CREATE POLICY "Base anyone can view products"
ON public.products
FOR SELECT
USING (TRUE);

DROP POLICY IF EXISTS "Admins can insert products" ON public.products;
CREATE POLICY "Admins can insert products"
ON public.products
FOR INSERT
WITH CHECK (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

DROP POLICY IF EXISTS "Admins can update products" ON public.products;
CREATE POLICY "Admins can update products"
ON public.products
FOR UPDATE
USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
)
WITH CHECK (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

DROP POLICY IF EXISTS "Admins can delete products" ON public.products;
CREATE POLICY "Admins can delete products"
ON public.products
FOR DELETE
USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- ── 3. Policies for categories ──
DROP POLICY IF EXISTS "Base anyone can view categories" ON public.categories;
CREATE POLICY "Base anyone can view categories"
ON public.categories
FOR SELECT
USING (TRUE);

DROP POLICY IF EXISTS "Admins can manage categories" ON public.categories;
CREATE POLICY "Admins can manage categories"
ON public.categories
FOR ALL
USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
)
WITH CHECK (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- ── 4. Policies for brands ──
DROP POLICY IF EXISTS "Base anyone can view brands" ON public.brands;
CREATE POLICY "Base anyone can view brands"
ON public.brands
FOR SELECT
USING (TRUE);

DROP POLICY IF EXISTS "Admins can manage brands" ON public.brands;
CREATE POLICY "Admins can manage brands"
ON public.brands
FOR ALL
USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
)
WITH CHECK (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);



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


-- ── 5. Admin and Shipper RLS Policies for orders ──
DROP POLICY IF EXISTS "Admins and shippers can view orders" ON public.orders;
CREATE POLICY "Admins and shippers can view orders"
ON public.orders FOR SELECT
USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'shipper'))
);

DROP POLICY IF EXISTS "Admins and shippers can update orders" ON public.orders;
CREATE POLICY "Admins and shippers can update orders"
ON public.orders FOR UPDATE
USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'shipper'))
)
WITH CHECK (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'shipper'))
);

DROP POLICY IF EXISTS "Admins can delete all orders" ON public.orders;
CREATE POLICY "Admins can delete all orders"
ON public.orders FOR DELETE
USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);
