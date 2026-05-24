-- 1. Enable UUID extension (standard practice in Supabase)
create extension if not exists "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- 2. THE SCALABLE CATEGORIES TABLE

create table if not exists categories (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    description text,
    -- This column allows infinite nesting in the future:
    parent_id uuid references categories(id) on delete cascade, 
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    
    -- Ensures you don't duplicate names under the same parent
    constraint unique_category_per_parent unique (name, parent_id)
);

-- 3. Create Brands Table
create table if not exists brands (
    id uuid default gen_random_uuid() primary key,
    name text not null unique,
    website text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Create Product  Table with Foreign Keys
create table if not exists products (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    description TEXT NOT NULL DEFAULT '',
    manufacturer TEXT NOT NULL DEFAULT '',
    sku text unique  NOT NULL CHECK (price >= 0),
    price numeric(10, 2),
    discount_percentage NUMERIC(10, 2) NOT NULL CHECK (discount_percentage >= 0),
    category_id uuid references categories(id) on delete set null,
    brand_id uuid references brands(id) on delete set null,
    in_stock BOOLEAN NOT NULL DEFAULT TRUE,
    quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0 AND quantity <= 100),
    image_url TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?q=80&w=800&auto=format&fit=crop',
    barcode_id TEXT UNIQUE,
    -- flexible attributes (Sizes, colors, specs)
    metadata jsonb default '{}'::jsonb not null, 
    metadata_url TEXT NOT NULL DEFAULT '',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. PERFORMANCE INDEXES (Crucial for scaling)
create index if not exists idx_categories_parent_id on categories(parent_id);
create index if not exists idx_products_category_id on products(category_id);
create index if not exists idx_products_brand_id on products(brand_id);
create index if not exists idx_products_metadata on products using gin (metadata); -- Speeds up JSON search
CREATE INDEX IF NOT EXISTS idx_products_barcode_id ON products(barcode_id); 


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
  role TEXT NOT NULL
);

ALTER TABLE public.user_roles DROP CONSTRAINT IF EXISTS user_roles_role_check;
ALTER TABLE public.user_roles
  ADD CONSTRAINT user_roles_role_check
  CHECK (LOWER(TRIM(role)) IN ('admin', 'customer', 'shipper', 'operator'));

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'customer')
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

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
