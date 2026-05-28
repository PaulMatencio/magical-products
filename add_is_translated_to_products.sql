-- SQL statement to add "is_translated" column to the products table.
-- This indicates whether the background translations for this product have run.

ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS is_translated BOOLEAN NOT NULL DEFAULT FALSE;
