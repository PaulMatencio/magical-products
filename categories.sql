-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,
    parent_id UUID NULL REFERENCES categories(id) ON DELETE CASCADE,
    description TEXT,
    level INTEGER DEFAULT 0,
    path TEXT GENERATED ALWAYS AS (
        CASE 
            WHEN parent_id IS NULL THEN name
            ELSE (
                SELECT path FROM categories WHERE id = parent_id
            ) || ' > ' || name
        END
    ) STORED,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    meta_title VARCHAR(200),
    meta_description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    INDEX idx_parent_id (parent_id),
    INDEX idx_level (level),
    INDEX idx_slug (slug),
    INDEX idx_is_active (is_active),
    INDEX idx_display_order (display_order)
);

-- Create function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO categories (id, name, slug, parent_id, level, display_order) VALUES
('11111111-1111-1111-1111-111111111111', 'Electronics', 'electronics', NULL, 0, 1),
('22222222-2222-2222-2222-222222222222', 'Computers', 'computers', '11111111-1111-1111-1111-111111111111', 1, 1),
('33333333-3333-3333-3333-333333333333', 'Laptops', 'laptops', '22222222-2222-2222-2222-222222222222', 2, 1),
('44444444-4444-4444-4444-444444444444', 'Desktops', 'desktops', '22222222-2222-2222-2222-222222222222', 2, 2),
('55555555-5555-5555-5555-555555555555', 'Mobile', 'mobile', '11111111-1111-1111-1111-111111111111', 1, 2),
('66666666-6666-6666-6666-666666666666', 'Smartphones', 'smartphones', '55555555-5555-5555-5555-555555555555', 2, 1),
('77777777-7777-7777-7777-777777777777', 'Apparel', 'apparel', NULL, 0, 2),
('88888888-8888-8888-8888-888888888888', 'Men', 'men', '77777777-7777-7777-7777-777777777777', 1, 1),
('99999999-9999-9999-9999-999999999999', 'T-Shirts', 't-shirts', '88888888-8888-8888-8888-888888888888', 2, 1),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Women', 'women', '77777777-7777-7777-7777-777777777777', 1, 2),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Home & Kitchen', 'home-kitchen', NULL, 0, 3),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Drinkware', 'drinkware', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 1, 1),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Water Bottles', 'water-bottles', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 2, 1);