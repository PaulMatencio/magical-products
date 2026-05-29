-- 1. Enable UUID extension (standard practice in Supabase)
create extension if not exists "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;



-- 2. Category Table (new version) : products_categories.sql
-- 3. Brand Table : products_brands.sql
-- 4. Product Table (new version) : products_product.sql



--  order table

CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  total_price NUMERIC(10, 2) NOT NULL CHECK (total_price >= 0),
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'cancelled','accepted', 'ready', 'shipped', 'delivered', 'refunded')),
  payment_method TEXT NOT NUL
  shipping_address TEXT NOT NULL DEFAULT '',
  user_phone TEXT NOT NULL ,
  user_email TEXT ,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_guest BOOLEAN NOT NULL DEFAULT FALSE
);

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS is_guest BOOLEAN NOT NULL DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS idx_orders_user_id
ON public.orders(user_id);

CREATE INDEX IF NOT EXISTS idx_orders_status
ON public.orders(status);

ALTER TABLE public.orders REPLICA IDENTITY FULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'orders'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
  END IF;
END $$;

-- ── User roles ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_roles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  last_login TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.user_roles DROP CONSTRAINT IF EXISTS user_roles_role_check;
ALTER TABLE public.user_roles
  ADD CONSTRAINT user_roles_role_check
  CHECK (LOWER(TRIM(role)) IN ('admin', 'customer', 'shipper', 'operator'));

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role, last_login)
  VALUES (NEW.id, 'customer', NEW.last_sign_in_at)
  ON CONFLICT (user_id) DO UPDATE SET last_login = EXCLUDED.last_login;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_user_update()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.user_roles
  SET last_login = NEW.last_sign_in_at
  WHERE user_id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE OF last_sign_in_at ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_user_update();

-- ── Row Level Security and grants ──────────────────────────────────
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands  ENABLE ROW LEVEL SECURITY;



DROP POLICY IF EXISTS "Base anyone can view categories" ON public.categories;
CREATE POLICY "Base anyone can view categories"
ON public.categories
FOR SELECT
USING (TRUE);

DROP POLICY IF EXISTS "Base anyone can view products" ON public.products;
CREATE POLICY "Base anyone can view products"
ON public.products
FOR SELECT
USING (TRUE);

DROP POLICY IF EXISTS "Base anyone can update product stock" ON public.products;
CREATE POLICY "Base anyone can update product stock"
ON public.products
FOR UPDATE
USING (TRUE)
WITH CHECK (quantity >= 0);

DROP POLICY IF EXISTS "Base users can view their own role" ON public.user_roles;
CREATE POLICY "Base users can view their own role"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
CREATE POLICY "Users can view own orders"
ON public.orders
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Base users can create their own orders" ON public.orders;
CREATE POLICY "Base users can create their own orders"
ON public.orders
FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own pending orders" ON public.orders;
CREATE POLICY "Users can update own pending orders"
ON public.orders
FOR UPDATE
USING (auth.uid() = user_id AND status = 'pending')
WITH CHECK (auth.uid() = user_id AND (status = 'pending' OR status = 'cancelled'));

DROP POLICY IF EXISTS "Users can delete their own orders" ON public.orders;
CREATE POLICY "Users can delete their own orders"
ON public.orders
FOR DELETE
USING (auth.uid() = user_id);

GRANT SELECT ON public.categories TO anon, authenticated;
GRANT SELECT ON public.products TO anon, authenticated;
GRANT SELECT ON public.brands TO anon, authenticated;
GRANT UPDATE (quantity, in_stock) ON public.products TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.orders TO anon, authenticated;
GRANT SELECT ON public.user_roles TO authenticated;



-- 1. Prevent stock from ever becoming negative at the database level
-- ALTER TABLE products ADD CONSTRAINT products_quantity_check CHECK (quantity >= 0);

-- 2. Create a function to decrement stock atomically
-- This ensures that the "current" quantity is used at the exact moment of update
CREATE OR REPLACE FUNCTION decrement_product_stock(target_product_id UUID, amount INT)
RETURNS VOID AS $$
BEGIN
  UPDATE products
  SET 
    quantity = quantity - amount,
    in_stock = (quantity - amount) > 0
  WHERE id = target_product_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Product not found';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- This allows the function to bypass RLS and work for all users
CREATE OR REPLACE FUNCTION decrement_product_stock(target_product_id UUID, amount INT)
RETURNS VOID 
SECURITY DEFINER -- IMPORTANT: This allows non-admins to update stock via this function
AS $$
BEGIN
  UPDATE products
  SET 
    quantity = quantity - amount,
    in_stock = (quantity - amount) > 0
  WHERE id = target_product_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Product not found';
  END IF;
END;
$$ LANGUAGE plpgsql;


-- Enable Realtime for the products table
-- 1. Add the products table to the realtime broadcast
ALTER PUBLICATION supabase_realtime ADD TABLE products;

-- 2. Ensure the database sends the full product data on every update
ALTER TABLE products REPLICA IDENTITY FULL;


-- This IS necessary for User B to add items to cart
GRANT EXECUTE ON FUNCTION decrement_product_stock(UUID, INT) TO anon, authenticated;

-- Ensure users can see the products (needed for Realtime to send them data)
GRANT SELECT ON public.products TO anon, authenticated;



-- 1. Add email columns
ALTER TABLE public.user_roles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS user_email TEXT;

-- 2. Update the automation to sync emails to user_roles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role, email)
  VALUES (NEW.id, 'customer', NEW.email)
  ON CONFLICT (user_id) DO UPDATE SET email = EXCLUDED.email;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;



-- ── 0. Update Schema (Adds missing columns if they don't exist) ──
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS description TEXT DEFAULT '';
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS manufacturer TEXT DEFAULT ''


-- 1. Drop the existing status constraint (Postgres names it orders_status_check by default)
ALTER TABLE public.orders 
DROP CONSTRAINT IF EXISTS orders_status_check;

-- 2. Add the new constraint with 'cancelled' and 'refunded' included
ALTER TABLE public.orders 
ADD CONSTRAINT orders_status_check 
CHECK (status IN ('pending', 'cancelled', 'accepted', 'ready', 'shipped', 'delivered', 'refunded'));

-- Users can update own pending orders (i.e. cancel)
DROP POLICY IF EXISTS "Users can update own pending orders" ON public.orders;
CREATE POLICY "Users can update own pending orders"
ON public.orders
FOR UPDATE
USING (auth.uid() = user_id AND status = 'pending')
WITH CHECK (auth.uid() = user_id AND (status = 'pending' OR status = 'cancelled'));




ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS status_history JSONB DEFAULT '{}'::jsonb;

-- 2. Populate existing orders' status_history with their creation date as the 'pending' status date
UPDATE public.orders
SET status_history = jsonb_build_object('pending', created_at)
WHERE status_history IS NULL OR status_history = '{}'::jsonb;


-- SQL statement to add a "product_state" column to the products table.
-- The column is set to TEXT, has a default value of 'active', and is constrained to the three valid options.

ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS product_state TEXT DEFAULT 'active'
CHECK (product_state IN ('active', 'phasing_out', 'discontinued'));




-- 1. Ensure the user_roles table has the correct columns
ALTER TABLE public.user_roles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.user_roles ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL;
ALTER TABLE public.user_roles ADD COLUMN IF NOT EXISTS last_login TIMESTAMP WITH TIME ZONE;

-- 2. Create the trigger function to automatically insert new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role, email, last_login)
  VALUES (NEW.id, 'customer', NEW.email, NEW.last_sign_in_at)
  ON CONFLICT (user_id) DO UPDATE 
  SET email = EXCLUDED.email, last_login = EXCLUDED.last_login;
  
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Prevents silent failures or rollbacks if something unexpected happens
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Bind the trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 4. Create the update function and trigger
CREATE OR REPLACE FUNCTION public.handle_user_update()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.user_roles
  SET email = NEW.email,
      last_login = NEW.last_sign_in_at
  WHERE user_id = NEW.id;
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE OF last_sign_in_at, email ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_user_update();


-- Create user_carts table to sync carts across browsers/devices
CREATE TABLE IF NOT EXISTS public.user_carts (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  save_for_later BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.user_carts ADD COLUMN IF NOT EXISTS save_for_later BOOLEAN NOT NULL DEFAULT FALSE;

-- Enable Row-Level Security
ALTER TABLE public.user_carts ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own cart
DROP POLICY IF EXISTS "Users can view own cart" ON public.user_carts;
CREATE POLICY "Users can view own cart"
ON public.user_carts FOR SELECT
USING (auth.uid() = user_id);

-- Allow users to insert/update their own cart
DROP POLICY IF EXISTS "Users can insert own cart" ON public.user_carts;
CREATE POLICY "Users can insert own cart"
ON public.user_carts FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own cart" ON public.user_carts;
CREATE POLICY "Users can update own cart"
ON public.user_carts FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own cart" ON public.user_carts;
CREATE POLICY "Users can delete own cart"
ON public.user_carts FOR DELETE
USING (auth.uid() = user_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_carts TO anon, authenticated;

-- Create an index on user_id to optimize lookups
CREATE INDEX IF NOT EXISTS idx_user_carts_user_id ON public.user_carts(user_id);

