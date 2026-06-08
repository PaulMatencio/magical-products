-- Create or replace function to get, add, or update a brand in the brands table
CREATE OR REPLACE FUNCTION public.get_or_create_brand(
    p_name TEXT,
    p_description TEXT DEFAULT NULL,
    p_logo_url TEXT DEFAULT NULL,
    p_website TEXT DEFAULT NULL,
    p_email TEXT DEFAULT NULL,
    p_phone TEXT DEFAULT NULL,
    p_address TEXT DEFAULT NULL,
    p_is_manufacturer BOOLEAN DEFAULT FALSE
)
RETURNS UUID AS $$
DECLARE
    v_brand_id UUID;
    v_slug TEXT;
    v_base_slug TEXT;
    v_counter INTEGER;
BEGIN
    -- Trim whitespace
    p_name := trim(p_name);
    IF p_name = '' THEN
        RAISE EXCEPTION 'Brand name cannot be empty';
    END IF;
    
    -- Try to find an existing brand (case-insensitive name match)
    SELECT id INTO v_brand_id 
    FROM public.brands 
    WHERE lower(name) = lower(p_name);
    
    IF v_brand_id IS NOT NULL THEN
        -- Brand exists: Update its details with any non-null input arguments
        UPDATE public.brands
        SET 
            description = COALESCE(p_description, description),
            logo_url = COALESCE(p_logo_url, logo_url),
            website = COALESCE(p_website, website),
            email = COALESCE(p_email, email),
            phone = COALESCE(p_phone, phone),
            address = COALESCE(p_address, address),
            is_manufacturer = COALESCE(p_is_manufacturer, is_manufacturer)
        WHERE id = v_brand_id;
    ELSE
        -- Brand does not exist: Generate a clean base slug from the brand name
        v_base_slug := lower(regexp_replace(p_name, '[^a-zA-Z0-9]+', '-', 'g'));
        v_base_slug := regexp_replace(v_base_slug, '^-+|-+$', '', 'g'); -- trim leading/trailing dashes
        IF v_base_slug = '' THEN
            v_base_slug := 'brand';
        END IF;
        
        v_slug := v_base_slug;
        v_counter := 1;
        
        -- Handle slug collisions (ensure uniqueness)
        WHILE EXISTS (SELECT 1 FROM public.brands WHERE slug = v_slug) LOOP
            v_slug := v_base_slug || '-' || v_counter;
            v_counter := v_counter + 1;
        END LOOP;
        
        -- Insert the new brand record
        INSERT INTO public.brands (
            name, 
            slug, 
            description, 
            logo_url, 
            website, 
            email, 
            phone, 
            address, 
            is_manufacturer, 
            is_active
        )
        VALUES (
            p_name, 
            v_slug, 
            p_description, 
            p_logo_url, 
            p_website, 
            p_email, 
            p_phone, 
            p_address, 
            p_is_manufacturer, 
            TRUE
        )
        RETURNING id INTO v_brand_id;
    END IF;
    
    RETURN v_brand_id;
END;
$$ LANGUAGE plpgsql;
