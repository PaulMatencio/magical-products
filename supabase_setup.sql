-- Magical Toys Store - current base Supabase schema
--
-- This file represents the current application schema. It intentionally omits
-- earlier development-only statements such as repeated order-table rebuilds,
-- public demo policies, duplicate seed blocks, and hard-coded user role grants.
--
-- Recommended order:
-- 1. supabase_setup.sql
-- 2. supabase_admin_setup.sql
-- 3. supabase_shipper_setup.sql
-- 4. supabase_anonymous_cleanup_setup.sql
-- 5. supabase_validation_orders.sql

CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- ── Categories ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.categories (
  code SMALLINT PRIMARY KEY,
  title TEXT NOT NULL
);


INSERT INTO public.categories (code, title) VALUES
  (1, 'computers'),
  (2, 'textiles'),
  (3, 'furnitures'),
  (4, 'accessories'),
  (5, 'toys'),
  (6, 'shoes'),
  (7,'watches'),
  (8,'phones')
ON CONFLICT (code) DO UPDATE
SET title = EXCLUDED.title;


-- ── Toys ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.toys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  discount_percentage NUMERIC(10, 2) NOT NULL CHECK (discount_percentage >= 0),
  category_code SMALLINT REFERENCES public.categories(code),
  in_stock BOOLEAN NOT NULL DEFAULT TRUE,
  quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0 AND quantity <= 100),
  image_url TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?q=80&w=800&auto=format&fit=crop',
  barcode_id TEXT UNIQUE,
  metadata_url TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_toys_category_code
ON public.toys(category_code);

CREATE INDEX IF NOT EXISTS idx_toys_barcode_id
ON public.toys(barcode_id); 


ALTER TABLE public.toys
  ADD COLUMN IF NOT EXISTS name TEXT NOT NULL,
  ADD COLUMN IF NOT EXISTS title TEXT NOT NULL,
  ADD COLUMN IF NOT EXISTS description TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS category_code SMALLINT REFERENCES public.categories(code),
  ADD COLUMN IF NOT EXISTS in_stock BOOLEAN NOT NULL DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS barcode_id TEXT UNIQUE;
  ADD COLUMN IF NOT EXISTS quantity INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS image_url TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?q=80&w=800&auto=format&fit=crop',
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

CREATE INDEX IF NOT EXISTS idx_toys_category_code
ON public.toys(category_code);

COMMENT ON COLUMN public.toys.category_code IS 'Numerical code referencing public.categories.code';



-- ── Orders ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  total_price NUMERIC(10, 2) NOT NULL CHECK (total_price >= 0),
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'accepted', 'ready', 'shipped', 'delivered')),
  payment_method TEXT NOT NULL,
  shipping_address TEXT NOT NULL DEFAULT '',
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_guest BOOLEAN NOT NULL DEFAULT FALSE
);

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS is_guest BOOLEAN NOT NULL DEFAULT FALSE

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
ALTER TABLE public.toys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Base anyone can view categories" ON public.categories;
CREATE POLICY "Base anyone can view categories"
ON public.categories
FOR SELECT
USING (TRUE);

DROP POLICY IF EXISTS "Base anyone can view toys" ON public.toys;
CREATE POLICY "Base anyone can view toys"
ON public.toys
FOR SELECT
USING (TRUE);

DROP POLICY IF EXISTS "Base anyone can update toy stock" ON public.toys;
CREATE POLICY "Base anyone can update toy stock"
ON public.toys
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
WITH CHECK (auth.uid() = user_id AND status = 'pending');

DROP POLICY IF EXISTS "Users can delete their own orders" ON public.orders;
CREATE POLICY "Users can delete their own orders"
ON public.orders
FOR DELETE
USING (auth.uid() = user_id);

GRANT SELECT ON public.categories TO anon, authenticated;
GRANT SELECT ON public.toys TO anon, authenticated;
GRANT UPDATE (quantity, in_stock) ON public.toys TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.orders TO anon, authenticated;
GRANT SELECT ON public.user_roles TO authenticated;




-- 1. Prevent stock from ever becoming negative at the database level
ALTER TABLE toys ADD CONSTRAINT toys_quantity_check CHECK (quantity >= 0);

-- 2. Create a function to decrement stock atomically
-- This ensures that the "current" quantity is used at the exact moment of update
CREATE OR REPLACE FUNCTION decrement_toy_stock(target_toy_id UUID, amount INT)
RETURNS VOID AS $$
BEGIN
  UPDATE toys
  SET 
    quantity = quantity - amount,
    in_stock = (quantity - amount) > 0
  WHERE id = target_toy_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Toy not found';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- This allows the function to bypass RLS and work for all users
CREATE OR REPLACE FUNCTION decrement_toy_stock(target_toy_id UUID, amount INT)
RETURNS VOID 
SECURITY DEFINER -- IMPORTANT: This allows non-admins to update stock via this function
AS $$
BEGIN
  UPDATE toys
  SET 
    quantity = quantity - amount,
    in_stock = (quantity - amount) > 0
  WHERE id = target_toy_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Toy not found';
  END IF;
END;
$$ LANGUAGE plpgsql;



-- Enable Realtime for the toys table
-- 1. Add the toys table to the realtime broadcast
ALTER PUBLICATION supabase_realtime ADD TABLE toys;

-- 2. Ensure the database sends the full toy data on every update
ALTER TABLE toys REPLICA IDENTITY FULL;


-- This IS necessary for User B to add items to cart
GRANT EXECUTE ON FUNCTION decrement_toy_stock(UUID, INT) TO anon, authenticated;

-- Ensure users can see the toys (needed for Realtime to send them data)
GRANT SELECT ON public.toys TO anon, authenticated;



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




-- Add the user_phone column to the orders table
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS user_phone TEXT;

-- Optional: Update existing orders to have an empty string if null
UPDATE public.orders 
SET user_phone = '' 
WHERE user_phone IS NULL;


CREATE INDEX IF NOT EXISTS idx_toys_category_code
ON public.toys(category_code);

CREATE INDEX IF NOT EXISTS idx_toys_barcode_id
ON public.toys(barcode_id); 
