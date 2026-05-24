-- SQL statement to add a "product_state" column to the products table.
-- The column is set to TEXT, has a default value of 'active', and is constrained to the three valid options.

ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS product_state TEXT DEFAULT 'active'
CHECK (product_state IN ('active', 'phasing_out', 'discontinued'));
