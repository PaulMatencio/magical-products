-- Strategy 1: Safe INSERT new Category with ON CONFLICT
INSERT INTO categories (name, slug, parent_id, display_order)
VALUES ('New Category', 'new-category', NULL, 4)
ON CONFLICT (slug) DO NOTHING
RETURNING id, name, slug;

-- Or update existing if needed
INSERT INTO categories (name, slug, parent_id, display_order)
VALUES ('New Category', 'new-category', NULL, 4)
ON CONFLICT (slug) 
DO UPDATE SET 
    name = EXCLUDED.name,
    parent_id = EXCLUDED.parent_id,
    display_order = EXCLUDED.display_order
RETURNING id, name, slug;


-- Strategy 2: Safe Addition of Subcategories-------------------
DO $$
DECLARE
    parent_id UUID;
    new_category_id UUID;
BEGIN
    -- Get the parent category ID dynamically
    SELECT id INTO parent_id FROM categories WHERE slug = 'electronics';
    
    -- Only proceed if parent exists
    IF parent_id IS NOT NULL THEN
        -- Add new subcategory
        INSERT INTO categories (name, slug, parent_id, display_order)
        VALUES ('Smart Home', 'smart-home', parent_id, 4)
        ON CONFLICT (slug) DO UPDATE 
        SET name = EXCLUDED.name,
            parent_id = EXCLUDED.parent_id
        RETURNING id INTO new_category_id;
        
        RAISE NOTICE 'Category added/updated with ID: %', new_category_id;
    ELSE
        RAISE NOTICE 'Parent category not found';
    END IF;
END $$;


--   Strategy 3 Create a reusable function to add or update a category
CREATE OR REPLACE FUNCTION add_or_update_category(
    p_name TEXT,
    p_slug TEXT,
    p_parent_slug TEXT DEFAULT NULL,
    p_display_order INTEGER DEFAULT 0
)
RETURNS UUID AS $$
DECLARE
    v_parent_id UUID;
    v_category_id UUID;
BEGIN
    -- Get parent ID if parent slug provided
    IF p_parent_slug IS NOT NULL THEN
        SELECT id INTO v_parent_id FROM categories WHERE slug = p_parent_slug;
        IF v_parent_id IS NULL THEN
            RAISE EXCEPTION 'Parent category with slug "%" not found', p_parent_slug;
        END IF;
    END IF;
    
    -- Insert or update category
    INSERT INTO categories (name, slug, parent_id, display_order)
    VALUES (p_name, p_slug, v_parent_id, p_display_order)
    ON CONFLICT (slug) 
    DO UPDATE SET 
        name = EXCLUDED.name,
        parent_id = EXCLUDED.parent_id,
        display_order = EXCLUDED.display_order,
        updated_at = NOW()
    RETURNING id INTO v_category_id;
    
    RETURN v_category_id;
END;
$$ LANGUAGE plpgsql;

-- Usage examples:
SELECT add_or_update_category('Smart Home', 'smart-home', 'electronics', 4);
SELECT add_or_update_category('Wireless Earbuds', 'wireless-earbuds', 'electronics-accessories', 7);
SELECT add_or_update_category('New Top Category', 'new-top-category', NULL, 4);






-- Strategy 4: Batch insert with Existence Check
DO $$
DECLARE
    v_parent_id UUID;
BEGIN
    -- Get parent once
    SELECT id INTO v_parent_id FROM categories WHERE slug = 'apparel-accessories';
    
    IF v_parent_id IS NOT NULL THEN
        -- Insert multiple categories, skip if exist
        INSERT INTO categories (name, slug, parent_id, display_order)
        VALUES 
            ('Face Masks', 'face-masks', v_parent_id, 10),
            ('Arm Warmers', 'arm-warmers', v_parent_id, 11),
            ('Leg Warmers', 'leg-warmers', v_parent_id, 12)
        ON CONFLICT (slug) DO NOTHING;
        
        RAISE NOTICE 'Categories added successfully';
    END IF;
END $$;






-- Strategy 5: Create a migration tracking table (optional but recommended)
CREATE TABLE IF NOT EXISTS category_migrations (
    id SERIAL PRIMARY KEY,
    migration_name TEXT UNIQUE NOT NULL,
    applied_at TIMESTAMP DEFAULT NOW()
);

-- Example migration
DO $$
DECLARE
    migration_exists BOOLEAN;
    v_parent_id UUID;
BEGIN
    -- Check if migration already applied
    SELECT EXISTS(
        SELECT 1 FROM category_migrations WHERE migration_name = 'add_smart_home_category'
    ) INTO migration_exists;
    
    IF migration_exists THEN
        RAISE NOTICE 'Migration already applied, skipping...';
        RETURN;
    END IF;
    
    -- Get parent category
    SELECT id INTO v_parent_id FROM categories WHERE slug = 'electronics';
    
    IF v_parent_id IS NULL THEN
        RAISE EXCEPTION 'Parent category not found';
    END IF;
    
    -- Add new category
    INSERT INTO categories (name, slug, parent_id, display_order)
    VALUES ('Smart Home', 'smart-home', v_parent_id, 
        (SELECT COALESCE(MAX(display_order), 0) + 1 FROM categories WHERE parent_id = v_parent_id)
    )
    ON CONFLICT (slug) DO NOTHING;
    
    -- Record migration
    INSERT INTO category_migrations (migration_name) VALUES ('add_smart_home_category');
    
    RAISE NOTICE 'Migration completed successfully';
END $$;




-- Strategy 6: Safely move a category to a new parent
DO $$
DECLARE
    v_category_id UUID;
    v_new_parent_id UUID;
BEGIN
    -- Get the category to move
    SELECT id INTO v_category_id FROM categories WHERE slug = 'tablet-accessories';
    
    -- Get the new parent
    SELECT id INTO v_new_parent_id FROM categories WHERE slug = 'electronics-accessories';
    
    IF v_category_id IS NULL OR v_new_parent_id IS NULL THEN
        RAISE EXCEPTION 'Category or new parent not found';
    END IF;
    
    -- Update the parent (this preserves the category ID)
    UPDATE categories 
    SET parent_id = v_new_parent_id,
        updated_at = NOW()
    WHERE id = v_category_id;
    
    RAISE NOTICE 'Category moved successfully';
END $$;

-- Safely move a category to a new parent
DO $$
DECLARE
    v_category_id UUID;
    v_new_parent_id UUID;
BEGIN
    -- Get the category to move
    SELECT id INTO v_category_id FROM categories WHERE slug = 'tablet-accessories';
    
    -- Get the new parent
    SELECT id INTO v_new_parent_id FROM categories WHERE slug = 'electronics-accessories';
    
    IF v_category_id IS NULL OR v_new_parent_id IS NULL THEN
        RAISE EXCEPTION 'Category or new parent not found';
    END IF;
    
    -- Update the parent (this preserves the category ID)
    UPDATE categories 
    SET parent_id = v_new_parent_id,
        updated_at = NOW()
    WHERE id = v_category_id;
    
    RAISE NOTICE 'Category moved successfully';
END $$;



-- Category 7Safely delete a category only if no children
DO $$
DECLARE
    v_category_id UUID;
    v_child_count INTEGER;
BEGIN
    -- Get category
    SELECT id INTO v_category_id FROM categories WHERE slug = 'old-category';
    
    IF v_category_id IS NULL THEN
        RAISE NOTICE 'Category not found';
        RETURN;
    END IF;
    
    -- Check for children
    SELECT COUNT(*) INTO v_child_count FROM categories WHERE parent_id = v_category_id;
    
    IF v_child_count > 0 THEN
        RAISE NOTICE 'Cannot delete: Category has % child categories', v_child_count;
    ELSE
        DELETE FROM categories WHERE id = v_category_id;
        RAISE NOTICE 'Category deleted successfully';
    END IF;
END $$;



-- Qwik commands reference for adding/updating categories safely

-- Add new top-level category
INSERT INTO categories (name, slug, parent_id, display_order)
VALUES ('Sports', 'sports', NULL, 
    (SELECT COALESCE(MAX(display_order), 0) + 1 FROM categories WHERE parent_id IS NULL)
)
ON CONFLICT (slug) DO NOTHING;

-- Add subcategory to existing category
INSERT INTO categories (name, slug, parent_id, display_order)
VALUES ('Running Shoes', 'running-shoes', 
    (SELECT id FROM categories WHERE slug = 'sports'),
    (SELECT COALESCE(MAX(display_order), 0) + 1 FROM categories WHERE parent_id = (SELECT id FROM categories WHERE slug = 'sports'))
)
ON CONFLICT (slug) DO UPDATE 
SET name = EXCLUDED.name, parent_id = EXCLUDED.parent_id;

-- Update category name without breaking relationships
UPDATE categories 
SET name = 'Electronics & Gadgets' 
WHERE slug = 'electronics';

-- Check category before deletion
SELECT 
    c.name,
    c.slug,
    COUNT(child.id) as child_count
FROM categories c
LEFT JOIN categories child ON child.parent_id = c.id
WHERE c.slug = 'old-category'
GROUP BY c.id, c.name, c.slug;


-- Qwik commands for adding/updating categories safely
-- Add new top-level category

WITH next_order AS (
  SELECT COALESCE(MAX(display_order), 0) + 1 AS display_order
  FROM categories 
  WHERE parent_id IS NULL
)
INSERT INTO categories (name, slug, parent_id, display_order)
SELECT 'Sports', 'sports', NULL, display_order
FROM next_order
ON CONFLICT (slug) DO NOTHING;

-- Add subcategory to existing category
INSERT INTO categories (name, slug, parent_id, display_order)
VALUES ('Running Shoes', 'running-shoes', 
    (SELECT id FROM categories WHERE slug = 'sports'),
    (SELECT COALESCE(MAX(display_order), 0) + 1 FROM categories WHERE parent_id = (SELECT id FROM categories WHERE slug = 'sports'))
)
ON CONFLICT (slug) DO UPDATE 
SET name = EXCLUDED.name, parent_id = EXCLUDED.parent_id;

-- Add subcategory to existing category
INSERT INTO categories (name, slug, parent_id, display_order)
VALUES ('Water and Aquatic Sports', 'water-and-aquatic-sports', 
    (SELECT id FROM categories WHERE slug = 'sports'),
    (SELECT COALESCE(MAX(display_order), 0) + 1 FROM categories WHERE parent_id = (SELECT id FROM categories WHERE slug = 'sports'))
)
ON CONFLICT (slug) DO UPDATE 
SET name = EXCLUDED.name, parent_id = EXCLUDED.parent_id;

-- Add subcategory to existing category
INSERT INTO categories (name, slug, parent_id, display_order)
VALUES ('Motorcycle Sports', 'motorcycle-sports', 
    (SELECT id FROM categories WHERE slug = 'sports'),
    (SELECT COALESCE(MAX(display_order), 0) + 1 FROM categories WHERE parent_id = (SELECT id FROM categories WHERE slug = 'sports'))
)
ON CONFLICT (slug) DO UPDATE 
SET name = EXCLUDED.name, parent_id = EXCLUDED.parent_id;

-- Add subcategory to existing category
INSERT INTO categories (name, slug, parent_id, display_order)
VALUES ('Combat Sports', 'combat-sports', 
    (SELECT id FROM categories WHERE slug = 'sports'),
    (SELECT COALESCE(MAX(display_order), 0) + 1 FROM categories WHERE parent_id = (SELECT id FROM categories WHERE slug = 'sports'))
)
ON CONFLICT (slug) DO UPDATE 
SET name = EXCLUDED.name, parent_id = EXCLUDED.parent_id;
