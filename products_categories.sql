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

-- Create indexes for categories table
CREATE INDEX IF NOT EXISTS  ISTS idx_parent_id ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_level ON categories(level);
CREATE INDEX IF NOT EXISTS idx_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_is_active ON categories(is_active);
CREATE INDEX IF NOT EXISTS idx_display_order ON categories(display_order);
CREATE INDEX IF NOT EXISTS idx_path ON categories(path);

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

-- Feed categories table with data
-- Insert main categories and capture their IDs using RETURNING

DO $$
DECLARE
    -- Electronics IDs
    electronics_id UUID;
    computers_id UUID;
    mobile_devices_id UUID;
    electronics_accessories_id UUID;
    smartphones_id UUID;
    tablets_id UUID;
    
    -- Apparel IDs
    apparel_id UUID;
    men_id UUID;
    women_id UUID;
    kids_id UUID;
    apparel_accessories_id UUID;
    bags_id UUID;
    
    -- Home & Kitchen IDs
    home_kitchen_id UUID;
    drinkware_id UUID;
    cookware_id UUID;
    kitchen_accessories_id UUID;
    
BEGIN
    -- ========================================
    -- ELECTRONICS
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Electronics', 'electronics', NULL, 1) 
    RETURNING id INTO electronics_id;
    
    -- Insert Computers and capture its ID
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Computers', 'computers', electronics_id, 1) 
    RETURNING id INTO computers_id;
    
    -- Insert Mobile Devices
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Mobile Devices', 'mobile-devices', electronics_id, 2) 
    RETURNING id INTO mobile_devices_id;
    
    -- Insert Electronics Accessories
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Electronics Accessories', 'electronics-accessories', electronics_id, 3) 
    RETURNING id INTO electronics_accessories_id;
    
    -- Computers subcategories
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Laptops', 'laptops', computers_id, 1),
        ('Desktops', 'desktops', computers_id, 2),
        ('Computer Accessories', 'computer-accessories', computers_id, 3);
    
    -- Mobile Devices subcategories - capture Smartphones ID
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Smartphones', 'smartphones', mobile_devices_id, 1) 
    RETURNING id INTO smartphones_id;
    
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Tablets', 'tablets', mobile_devices_id, 2) 
    RETURNING id INTO tablets_id;
    
    -- Smartphone accessories
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Smartphone Accessories', 'smartphone-accessories', smartphones_id, 1),
        ('Smartphone Cases', 'smartphone-cases', smartphones_id, 2),
        ('Screen Protectors', 'screen-protectors', smartphones_id, 3);
    
    -- Tablet accessories
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Tablet Accessories', 'tablet-accessories', tablets_id, 1),
        ('Tablet Cases', 'tablet-cases', tablets_id, 2);
    
    -- Electronics Accessories (general)
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Power Banks', 'power-banks', electronics_accessories_id, 1),
        ('Chargers & Cables', 'chargers-cables', electronics_accessories_id, 2),
        ('Audio & Headphones', 'audio-headphones', electronics_accessories_id, 3),
        ('Batteries', 'batteries', electronics_accessories_id, 4),
        ('Screen Cleaners', 'screen-cleaners', electronics_accessories_id, 5),
        ('Cable Organizers', 'cable-organizers', electronics_accessories_id, 6);
    
    -- ========================================
    -- APPAREL
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Apparel', 'apparel', NULL, 2) 
    RETURNING id INTO apparel_id;
    
    -- Insert main apparel categories and capture IDs
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Men', 'men', apparel_id, 1) 
    RETURNING id INTO men_id;
    
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Women', 'women', apparel_id, 2) 
    RETURNING id INTO women_id;
    
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Kids', 'kids', apparel_id, 3) 
    RETURNING id INTO kids_id;
    
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Apparel Accessories', 'apparel-accessories', apparel_id, 4) 
    RETURNING id INTO apparel_accessories_id;
    
    -- Men subcategories
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('T-Shirts', 't-shirts', men_id, 1),
        ('Jeans', 'jeans', men_id, 2),
        ('Shirts', 'shirts', men_id, 3),
        ('Jackets', 'jackets', men_id, 4),
        ('Suits', 'suits', men_id, 5);
    
    -- Women subcategories
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Dresses', 'dresses', women_id, 1),
        ('Blouses', 'blouses', women_id, 2),
        ('Skirts', 'skirts', women_id, 3),
        ('Pants', 'pants', women_id, 4);
    
    -- Kids subcategories
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Boys', 'boys', kids_id, 1),
        ('Girls', 'girls', kids_id, 2),
        ('Baby', 'baby', kids_id, 3);
    
    -- Apparel Accessories - capture Bags ID
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Bags', 'bags', apparel_accessories_id, 1) 
    RETURNING id INTO bags_id;
    
    -- Other apparel accessories (no need to capture IDs)
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Belts', 'belts', apparel_accessories_id, 2),
        ('Hats & Caps', 'hats-caps', apparel_accessories_id, 3),
        ('Scarves', 'scarves', apparel_accessories_id, 4),
        ('Gloves', 'gloves', apparel_accessories_id, 5),
        ('Wallets', 'wallets', apparel_accessories_id, 6),
        ('Sunglasses', 'sunglasses', apparel_accessories_id, 7),
        ('Watches', 'watches', apparel_accessories_id, 8),
        ('Jewelry', 'jewelry', apparel_accessories_id, 9);
    
    -- Bag types
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Backpacks', 'backpacks', bags_id, 1),
        ('Handbags', 'handbags', bags_id, 2),
        ('Tote Bags', 'tote-bags', bags_id, 3),
        ('Messenger Bags', 'messenger-bags', bags_id, 4),
        ('Clutches', 'clutches', bags_id, 5),
        ('Duffel Bags', 'duffel-bags', bags_id, 6),
        ('Laptop Bags', 'laptop-bags', bags_id, 7);
    
    -- ========================================
    -- HOME & KITCHEN
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Home & Kitchen', 'home-kitchen', NULL, 3) 
    RETURNING id INTO home_kitchen_id;
    
    -- Insert subcategories and capture IDs
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Drinkware', 'drinkware', home_kitchen_id, 1) 
    RETURNING id INTO drinkware_id;
    
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Cookware', 'cookware', home_kitchen_id, 2) 
    RETURNING id INTO cookware_id;
    
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Kitchen Accessories', 'kitchen-accessories', home_kitchen_id, 3) 
    RETURNING id INTO kitchen_accessories_id;
    
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Home Decor', 'home-decor', home_kitchen_id, 4);
    
    -- Drinkware subcategories
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Water Bottles', 'water-bottles', drinkware_id, 1),
        ('Coffee Mugs', 'coffee-mugs', drinkware_id, 2),
        ('Travel Tumblers', 'travel-tumblers', drinkware_id, 3),
        ('Wine Glasses', 'wine-glasses', drinkware_id, 4);
    
    -- Cookware subcategories
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Pots & Pans', 'pots-pans', cookware_id, 1),
        ('Bakeware', 'bakeware', cookware_id, 2),
        ('Knives', 'knives', cookware_id, 3);
    
    -- Kitchen Accessories subcategories
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Cutting Boards', 'cutting-boards', kitchen_accessories_id, 1),
        ('Utensils', 'utensils', kitchen_accessories_id, 2),
        ('Food Storage', 'food-storage', kitchen_accessories_id, 3);
    
END $$;



-- Verify the insertion
SELECT COUNT(*) as total_categories FROM categories;

-- View the hierarchy
WITH RECURSIVE category_tree AS (
    SELECT 
        id,
        name,
        slug,
        parent_id,
        0 as depth,
        name as full_path
    FROM categories
    WHERE parent_id IS NULL
    
    UNION ALL
    
    SELECT 
        c.id,
        c.name,
        c.slug,
        c.parent_id,
        ct.depth + 1,
        ct.full_path || ' > ' || c.name
    FROM categories c
    INNER JOIN category_tree ct ON c.parent_id = ct.id
)
SELECT depth, repeat('  ', depth) || name as indented_name, full_path
FROM category_tree
ORDER BY full_path;





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




