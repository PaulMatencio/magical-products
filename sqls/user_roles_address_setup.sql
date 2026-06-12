-- ============================================================
-- USER ROLES ADDRESS SETUP
-- Run this entire file in the Supabase SQL Editor.
-- ============================================================

-- 1. Add address and contact columns to public.user_roles
ALTER TABLE public.user_roles ADD COLUMN IF NOT EXISTS name TEXT DEFAULT '';
ALTER TABLE public.user_roles ADD COLUMN IF NOT EXISTS street TEXT DEFAULT '';
ALTER TABLE public.user_roles ADD COLUMN IF NOT EXISTS city TEXT DEFAULT '';
ALTER TABLE public.user_roles ADD COLUMN IF NOT EXISTS zip TEXT DEFAULT '';
ALTER TABLE public.user_roles ADD COLUMN IF NOT EXISTS is_guest BOOLEAN DEFAULT FALSE;
ALTER TABLE public.user_roles ADD COLUMN IF NOT EXISTS phone TEXT DEFAULT '';

-- 2. Grant update permissions on public.user_roles to authenticated users
GRANT UPDATE ON public.user_roles TO authenticated;

-- 3. Enable RLS and add policies for update
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can update their own user_role information" ON public.user_roles;
CREATE POLICY "Users can update their own user_role information"
ON public.user_roles
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
