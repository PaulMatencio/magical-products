-- ============================================================
-- PRODUCTS OPERATOR RLS SETUP
-- Run this entire file in the Supabase SQL Editor to grant
-- insert and update permissions on products to the Operator role.
-- ============================================================

-- ── 1. Update Ingestion Policies for Products ──

-- Drop existing admin-only insert policy
DROP POLICY IF EXISTS "Admins can insert products" ON public.products;

-- Create new policy allowing both admins and operators to insert products
CREATE POLICY "Admins and operators can insert products"
ON public.products
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'operator')
  )
);

-- Drop existing admin-only update policy
DROP POLICY IF EXISTS "Admins can update products" ON public.products;

-- Create new policy allowing both admins and operators to update products
CREATE POLICY "Admins and operators can update products"
ON public.products
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'operator')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'operator')
  )
);
