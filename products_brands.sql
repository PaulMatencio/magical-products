-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Brands table (no inline indexes)
CREATE TABLE brands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    logo_url TEXT,
    website TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    is_manufacturer BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes AFTER the table is created
CREATE INDEX idx_brands_name ON brands(name);
CREATE INDEX idx_brands_slug ON brands(slug);
CREATE INDEX idx_brands_is_active ON brands(is_active);
CREATE INDEX idx_brands_is_manufacturer ON brands(is_manufacturer);

-- Brand sustainability table
CREATE TABLE brand_sustainability (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
    certification TEXT,
    carbon_neutral BOOLEAN DEFAULT FALSE,
    sustainable_materials BOOLEAN DEFAULT FALSE,
    ethical_labor BOOLEAN DEFAULT FALSE,
    packaging_type TEXT,
    recycling_program BOOLEAN DEFAULT FALSE,
    evidence_url TEXT,
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for brand_sustainability
CREATE INDEX idx_brand_sustainability_brand_id ON brand_sustainability(brand_id);
CREATE INDEX idx_brand_sustainability_certification ON brand_sustainability(certification);

-- Create unique constraint for brand + certification
CREATE UNIQUE INDEX idx_brand_sustainability_unique ON brand_sustainability(brand_id, certification);

-- Function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_brands_updated_at
    BEFORE UPDATE ON brands
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_brand_sustainability_updated_at
    BEFORE UPDATE ON brand_sustainability
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample brand data
INSERT INTO brands (id, name, slug, description, logo_url, website, is_manufacturer, is_active) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'EcoTech', 'ecotech', 'Sustainable electronics manufacturer using recycled materials', 'https://cdn.example.com/logos/ecotech.png', 'https://ecotech.com', TRUE, TRUE),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2', 'PureWear', 'purewear', 'Organic cotton apparel with fair trade certification', 'https://cdn.example.com/logos/purewear.png', 'https://purewear.com', TRUE, TRUE),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3', 'EverFlow', 'everflow', 'Eco-friendly drinkware made from recycled stainless steel', 'https://cdn.example.com/logos/everflow.png', 'https://everflow.com', TRUE, TRUE),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa4', 'LittleGreen', 'littlegreen', 'Sustainable wooden toys from rubberwood', 'https://cdn.example.com/logos/littlegreen.png', 'https://littlegreen.com', TRUE, TRUE),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa5', 'PixelPhone', 'pixelphone', 'Consumer electronics company', 'https://cdn.example.com/logos/pixelphone.png', 'https://pixelphone.com', TRUE, TRUE),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa6', 'GreenTech Renewed', 'greentech-renewed', 'Certified refurbished electronics provider', 'https://cdn.example.com/logos/greentech.png', 'https://greentechrenewed.com', FALSE, TRUE);

-- Insert sustainability data
INSERT INTO brand_sustainability (brand_id, certification, carbon_neutral, sustainable_materials, ethical_labor, packaging_type, verified_at) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'B Corp', TRUE, TRUE, TRUE, 'recycled', '2024-01-15 00:00:00+00'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'EPEAT Gold', FALSE, TRUE, FALSE, 'recycled', '2024-01-15 00:00:00+00'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2', 'Fair Trade', TRUE, TRUE, TRUE, 'compostable', '2024-02-10 00:00:00+00'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2', 'GOTS', FALSE, TRUE, TRUE, 'compostable', '2024-02-10 00:00:00+00'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3', 'Climate Neutral', TRUE, TRUE, TRUE, 'plastic-free', '2024-01-20 00:00:00+00'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa4', 'FSC', FALSE, TRUE, TRUE, 'recycled', '2024-03-01 00:00:00+00'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa6', 'R2 Certified', FALSE, TRUE, TRUE, 'recycled', '2024-01-05 00:00:00+00');

-- Verify the data
SELECT 
    b.name as brand_name,
    b.is_manufacturer,
    bs.certification,
    bs.carbon_neutral,
    bs.packaging_type
FROM brands b
LEFT JOIN brand_sustainability bs ON bs.brand_id = b.id
ORDER BY b.name;





SELECT tablename
FROM information_schema.tables 
WHERE table_name IN ('brands', 'brand_sustainability');

-- Check indexes
SELECT 
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename IN ('brands', 'brand_sustainability')
ORDER BY tablename, indexname;