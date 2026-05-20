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

-- Insert sample data
WITH inserted AS (
    INSERT INTO categories (id, name, slug, parent_id, display_order) VALUES
    ('11111111-1111-1111-1111-111111111111', 'Electronics', 'electronics', NULL, 1),
    ('22222222-2222-2222-2222-222222222222', 'Computers', 'computers', '11111111-1111-1111-1111-111111111111', 1),
    ('33333333-3333-3333-3333-333333333333', 'Laptops', 'laptops', '22222222-2222-2222-2222-222222222222', 1),
    ('44444444-4444-4444-4444-444444444444', 'Desktops', 'desktops', '22222222-2222-2222-2222-222222222222', 2),
    ('55555555-5555-5555-5555-555555555555', 'Mobile', 'mobile', '11111111-1111-1111-1111-111111111111', 2),
    ('66666666-6666-6666-6666-666666666666', 'Smartphones', 'smartphones', '55555555-5555-5555-5555-555555555555', 1),
    ('77777777-7777-7777-7777-777777777777', 'Apparel', 'apparel', NULL, 2),
    ('88888888-8888-8888-8888-888888888888', 'Men', 'men', '77777777-7777-7777-7777-777777777777', 1),
    ('99999999-9999-9999-9999-999999999999', 'T-Shirts', 't-shirts', '88888888-8888-8888-8888-888888888888', 1),
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Women', 'women', '77777777-7777-7777-7777-777777777777', 2),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Home & Kitchen', 'home-kitchen', NULL, 3),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Drinkware', 'drinkware', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 1),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Water Bottles', 'water-bottles', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 1)
    RETURNING id, name, path, level
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