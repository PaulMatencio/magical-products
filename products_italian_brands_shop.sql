-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Brands table with proper ID
CREATE TABLE brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
    
    -- Additional brand metadata
    founded_year INTEGER,
    country_of_origin TEXT,
    certifications TEXT[], -- Array of certifications like {'B Corp', 'Fair Trade', 'Organic'}
    
    -- Sustainability metrics (optional)
    sustainability_score DECIMAL(3,2), -- 0-10 scale
    carbon_neutral BOOLEAN DEFAULT FALSE,
    
    -- JSON for flexible data
    metadata JSONB DEFAULT '{}'::jsonb,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    INDEX idx_brands_name (name),
    INDEX idx_brands_slug (slug),
    INDEX idx_brands_is_active (is_active),
    INDEX idx_brands_country (country_of_origin)
);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_brands_updated_at
    BEFORE UPDATE ON brands
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();