-- 1. Create User Roles Table
CREATE TABLE IF NOT EXISTS public.user_roles (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role TEXT NOT NULL
);

-- Grant basic permissions so PostgREST allows the request
GRANT SELECT ON public.user_roles TO authenticated;
GRANT SELECT ON public.user_roles TO anon;

-- Drop any existing constraint and re-add a more flexible one
ALTER TABLE public.user_roles DROP CONSTRAINT IF EXISTS user_roles_role_check;
ALTER TABLE public.user_roles ADD CONSTRAINT user_roles_role_check CHECK (LOWER(TRIM(role)) IN ('admin', 'customer'));

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own role
CREATE POLICY "Users can view their own role" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

-- 2. Secure the 'toys' table
-- First ensure RLS is enabled on toys
ALTER TABLE public.toys ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone (including guests) can view toys
CREATE POLICY "Anyone can view toys" 
ON public.toys 
FOR SELECT 
USING (true);

-- Policy: Only admins can insert, update, or delete toys
CREATE POLICY "Admins can insert toys" 
ON public.toys 
FOR INSERT 
WITH CHECK (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admins can update toys" 
ON public.toys 
FOR UPDATE 
USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admins can delete toys" 
ON public.toys 
FOR DELETE 
USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- 3. Secure the 'orders' table
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own orders OR admins can view all orders
CREATE POLICY "Users can view own orders, admins can view all" 
ON public.orders 
FOR SELECT 
USING (
  auth.uid() = user_id 
  OR 
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Policy: Authenticated users can insert their own orders
CREATE POLICY "Users can create their own orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (
  auth.uid() = user_id OR is_guest = true
);

-- Policy: Admins can update any order, users can only update their own (e.g. shipping address if pending)
CREATE POLICY "Admins can update all orders, users own pending" 
ON public.orders 
FOR UPDATE 
USING (
  (auth.uid() = user_id AND status = 'pending')
  OR 
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Policy: Admins can delete any order, users can delete their own
CREATE POLICY "Admins can delete all, users own" 
ON public.orders 
FOR DELETE 
USING (
  auth.uid() = user_id 
  OR 
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Optional: Function to automatically assign 'customer' role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'customer');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();






