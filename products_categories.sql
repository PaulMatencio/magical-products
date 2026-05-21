-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table (without generated column)
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    parent_id UUID NULL REFERENCES categories(id) ON DELETE CASCADE,
    description TEXT,
    level INTEGER DEFAULT 0,
    path TEXT, -- Regular column, updated via trigger
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    meta_title TEXT,
    meta_description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_parent_id ON categories(parent_id);
CREATE INDEX idx_level ON categories(level);
CREATE INDEX idx_slug ON categories(slug);
CREATE INDEX idx_is_active ON categories(is_active);
CREATE INDEX idx_display_order ON categories(display_order);
CREATE INDEX idx_path ON categories(path);

-- Function to update path and level recursively
CREATE OR REPLACE FUNCTION update_category_path_and_level()
RETURNS TRIGGER AS $$
DECLARE
    parent_path TEXT;
    parent_level INTEGER;
BEGIN
    -- Get parent's path and level if parent exists
    IF NEW.parent_id IS NULL THEN
        NEW.path = NEW.name;
        NEW.level = 0;
    ELSE
        SELECT path, level INTO parent_path, parent_level 
        FROM categories WHERE id = NEW.parent_id;
        
        IF NOT FOUND THEN
            RAISE EXCEPTION 'Parent category with id % does not exist', NEW.parent_id;
        END IF;
        
        NEW.path = parent_path || ' > ' || NEW.name;
        NEW.level = parent_level + 1;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update descendants when a category's path changes
CREATE OR REPLACE FUNCTION update_descendants_paths()
RETURNS TRIGGER AS $$
BEGIN
    -- Only update descendants if the path or name changed
    IF OLD.path IS DISTINCT FROM NEW.path OR OLD.name IS DISTINCT FROM NEW.name THEN
        UPDATE categories
        SET path = REPLACE(path, OLD.path, NEW.path)
        WHERE path LIKE OLD.path || ' > %';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_category_path_trigger
    BEFORE INSERT OR UPDATE OF parent_id, name ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_category_path_and_level();

CREATE TRIGGER update_descendants_paths_trigger
    AFTER UPDATE OF path, name ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_descendants_paths();

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();




-- Insert sample data (CORRECTED with separate Accessories branch)
WITH inserted AS (
    INSERT INTO categories (id, name, slug, parent_id, display_order) VALUES
    -- Level 0: Top-level categories
    ('11111111-1111-1111-1111-111111111111', 'Electronics', 'electronics', NULL, 1),
    ('77777777-7777-7777-7777-777777777777', 'Apparel', 'apparel', NULL, 2),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Home & Kitchen', 'home-kitchen', NULL, 3),
    
    -- Level 1: Electronics subcategories
    ('22222222-2222-2222-2222-222222222222', 'Computers', 'computers', '11111111-1111-1111-1111-111111111111', 1),
    ('55555555-5555-5555-5555-555555555555', 'Mobile Devices', 'mobile-devices', '11111111-1111-1111-1111-111111111111', 2),
    ('66666666-6666-6666-6666-666666666669', 'Accessories', 'accessories', '11111111-1111-1111-1111-111111111111', 3),
    
    -- Level 2: Computers subcategories
    ('33333333-3333-3333-3333-333333333333', 'Laptops', 'laptops', '22222222-2222-2222-2222-222222222222', 1),
    ('44444444-4444-4444-4444-444444444444', 'Desktops', 'desktops', '22222222-2222-2222-2222-222222222222', 2),
    
    -- Level 2: Mobile Devices subcategories
    ('88888888-8888-8888-8888-888888888881', 'Smartphones', 'smartphones', '55555555-5555-5555-5555-555555555555', 1),
    ('88888888-8888-8888-8888-888888888882', 'Tablets', 'tablets', '55555555-5555-5555-5555-555555555555', 2),
    
    -- Level 3: Smartphone accessories (device-specific)
    ('99999999-9999-9999-9999-999999999991', 'Smartphone Accessories', 'smartphone-accessories', '88888888-8888-8888-8888-888888888881', 1),
    ('99999999-9999-9999-9999-999999999992', 'Smartphone Cases', 'smartphone-cases', '88888888-8888-8888-8888-888888888881', 2),
    ('99999999-9999-9999-9999-999999999993', 'Screen Protectors', 'screen-protectors', '88888888-8888-8888-8888-888888888881', 3),
    
    -- Level 3: Tablet accessories (device-specific)
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'Tablet Accessories', 'tablet-accessories', '88888888-8888-8888-8888-888888888882', 1),
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2', 'Tablet Cases', 'tablet-cases', '88888888-8888-8888-8888-888888888882', 2),
    
    -- Level 2: General Accessories (Electronics > Accessories)
    ('cccccccc-cccc-cccc-cccc-ccccccccccc1', 'Power Banks', 'power-banks', '66666666-6666-6666-6666-666666666669', 1),
    ('cccccccc-cccc-cccc-cccc-ccccccccccc2', 'Chargers & Cables', 'chargers-cables', '66666666-6666-6666-6666-666666666669', 2),
    ('cccccccc-cccc-cccc-cccc-ccccccccccc3', 'Audio & Headphones', 'audio-headphones', '66666666-6666-6666-6666-666666666669', 3),
    ('cccccccc-cccc-cccc-cccc-ccccccccccc4', 'Batteries', 'batteries', '66666666-6666-6666-6666-666666666669', 4),
    ('cccccccc-cccc-cccc-cccc-ccccccccccc5', 'Screen Cleaners', 'screen-cleaners', '66666666-6666-6666-6666-666666666669', 5),
    
    -- Level 1: Apparel subcategories
    ('dddddddd-dddd-dddd-dddd-ddddddddddd1', 'Men', 'men', '77777777-7777-7777-7777-777777777777', 1),
    ('dddddddd-dddd-dddd-dddd-ddddddddddd2', 'Women', 'women', '77777777-7777-7777-7777-777777777777', 2),
    
    -- Level 2: Men subcategories
    ('dddddddd-dddd-dddd-dddd-ddddddddddd3', 'T-Shirts', 't-shirts', 'dddddddd-dddd-dddd-dddd-ddddddddddd1', 1),
    ('dddddddd-dddd-dddd-dddd-ddddddddddd4', 'Jeans', 'jeans', 'dddddddd-dddd-dddd-dddd-ddddddddddd1', 2),
    
    -- Level 2: Women subcategories
    ('dddddddd-dddd-dddd-dddd-ddddddddddd5', 'Dresses', 'dresses', 'dddddddd-dddd-dddd-dddd-ddddddddddd2', 1),
    ('dddddddd-dddd-dddd-dddd-ddddddddddd6', 'Blouses', 'blouses', 'dddddddd-dddd-dddd-dddd-ddddddddddd2', 2),
    
    -- Level 1: Home & Kitchen subcategories
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee1', 'Drinkware', 'drinkware', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 1),
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee2', 'Cookware', 'cookware', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 2),
    
    -- Level 2: Drinkware subcategories
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee3', 'Water Bottles', 'water-bottles', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee1', 1),
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee4', 'Coffee Mugs', 'coffee-mugs', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee1', 2),
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee5', 'Travel Tumblers', 'travel-tumblers', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee1', 3)
    
    RETURNING id, name, slug, parent_id, level, path, display_order
)
SELECT * FROM inserted;


-- Enable RLS on categories table
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active categories
CREATE POLICY "Allow public read access for active categories"
    ON categories FOR SELECT
    USING (is_active = TRUE);

-- Allow authenticated users to create categories
CREATE POLICY "Allow authenticated users to create categories"
    ON categories FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update categories
CREATE POLICY "Allow authenticated users to update categories"
    ON categories FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete categories
CREATE POLICY "Allow authenticated users to delete categories"
    ON categories FOR DELETE
    USING (auth.role() = 'authenticated');


-- check the table existence  and indexes 

SELECT table_name
FROM information_schema.tables 
WHERE table_name IN ('categories');


SELECT 
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename IN ('categories')
ORDER BY tablename, indexname;


-- Enable real-time replication on the categories table
-- Run this once in your Supabase SQL Editor

ALTER TABLE public.categories REPLICA IDENTITY FULL;

ALTER PUBLICATION supabase_realtime ADD TABLE public.categories;
