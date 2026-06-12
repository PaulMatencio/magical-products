-- ============================================================
-- SECURE TRANSLATION RPCs (SECURITY DEFINER)
-- Run this script in your Supabase SQL Editor.
-- ============================================================

-- 1. Secure RPC for category translations
CREATE OR REPLACE FUNCTION public.upsert_category_translation(
  p_category_id UUID,
  p_language_id UUID,
  p_name TEXT,
  p_description TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER -- Bypasses client RLS by executing as database creator
AS $$
BEGIN
  INSERT INTO public.category_translations (category_id, language_id, name, description)
  VALUES (p_category_id, p_language_id, p_name, p_description)
  ON CONFLICT (category_id, language_id)
  DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    updated_at = NOW();
END;
$$;

-- Grant execute permissions to public/authenticated users
GRANT EXECUTE ON FUNCTION public.upsert_category_translation(UUID, UUID, TEXT, TEXT) TO authenticated, anon;


-- 2. Secure RPC for product translations
CREATE OR REPLACE FUNCTION public.upsert_product_translation(
  p_product_id UUID,
  p_language_id UUID,
  p_name TEXT,
  p_description TEXT,
  p_metadata_url TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER -- Bypasses client RLS by executing as database creator
AS $$
BEGIN
  INSERT INTO public.product_translations (product_id, language_id, name, description, metadata_url)
  VALUES (p_product_id, p_language_id, p_name, p_description, p_metadata_url)
  ON CONFLICT (product_id, language_id)
  DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    metadata_url = EXCLUDED.metadata_url,
    updated_at = NOW();
END;
$$;

-- Grant execute permissions to public/authenticated users
GRANT EXECUTE ON FUNCTION public.upsert_product_translation(UUID, UUID, TEXT, TEXT, TEXT) TO authenticated, anon;
