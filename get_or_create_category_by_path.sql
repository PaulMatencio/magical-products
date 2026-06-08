-- Create or replace function to get or create a category by its full path
CREATE OR REPLACE FUNCTION public.get_or_create_category_by_path(p_path TEXT)
RETURNS UUID AS $$
DECLARE
    v_parts TEXT[];
    v_part TEXT;
    v_parent_id UUID := NULL;
    v_cat_id UUID;
    v_slug TEXT;
    v_base_slug TEXT;
    v_counter INTEGER;
BEGIN
    -- Trim whitespace and split the path by ' > '
    v_parts := string_to_array(p_path, ' > ');
    
    -- Loop through each category in the path
    FOREACH v_part IN ARRAY v_parts LOOP
        v_part := trim(v_part);
        IF v_part = '' THEN
            CONTINUE;
        END IF;
        
        -- Try to find an existing category at this level under the current parent
        SELECT id INTO v_cat_id 
        FROM public.categories 
        WHERE name = v_part 
          AND (parent_id IS NOT DISTINCT FROM v_parent_id);
          
        -- If it doesn't exist, create it
        IF v_cat_id IS NULL THEN
            -- Generate a clean base slug from the category name
            v_base_slug := lower(regexp_replace(v_part, '[^a-zA-Z0-9]+', '-', 'g'));
            v_base_slug := regexp_replace(v_base_slug, '^-+|-+$', '', 'g'); -- trim leading/trailing dashes
            IF v_base_slug = '' THEN
                v_base_slug := 'category';
            END IF;
            
            v_slug := v_base_slug;
            v_counter := 1;
            
            -- Handle slug collisions (enforce uniqueness)
            WHILE EXISTS (SELECT 1 FROM public.categories WHERE slug = v_slug) LOOP
                v_slug := v_base_slug || '-' || v_counter;
                v_counter := v_counter + 1;
            END LOOP;
            
            -- Insert the new category
            INSERT INTO public.categories (name, slug, parent_id, is_active)
            VALUES (v_part, v_slug, v_parent_id, TRUE)
            RETURNING id INTO v_cat_id;
        END IF;
        
        -- Set current category as parent for the next iteration
        v_parent_id := v_cat_id;
    END LOOP;
    
    RETURN v_parent_id;
END;
$$ LANGUAGE plpgsql;
