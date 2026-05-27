-- 4. Create Product  Table with Foreign Keys
create table if not exists products (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    description TEXT NOT NULL DEFAULT '',
    manufacturer TEXT NOT NULL DEFAULT '',
    sku text unique  NOT NULL CHECK (price >= 0),
    price numeric(10, 2),
    discount_percentage NUMERIC(10, 2) NOT NULL CHECK (discount_percentage >= 0),
    category_id uuid references categories(id) on delete set null,
    brand_id uuid references brands(id) on delete set null,
    in_stock BOOLEAN NOT NULL DEFAULT TRUE,
    quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0 AND quantity <= 100),
    image_url TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?q=80&w=800&auto=format&fit=crop',
    barcode_id TEXT UNIQUE,
    -- flexible attributes (Sizes, colors, specs)
    metadata jsonb default '{}'::jsonb not null, 
    metadata_url TEXT NOT NULL DEFAULT '',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. PERFORMANCE INDEXES (Crucial for scaling)
create index if not exists idx_categories_parent_id on categories(parent_id);
create index if not exists idx_products_category_id on products(category_id);
create index if not exists idx_products_brand_id on products(brand_id);
create index if not exists idx_products_metadata on products using gin (metadata); -- Speeds up JSON search
CREATE INDEX IF NOT EXISTS idx_products_barcode_id ON products(barcode_id); 



-- Product translations table
CREATE TABLE product_translations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    language_id UUID NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(product_id, language_id)
);

-- CREATE INDEX idx_product_id ON product_translations(product_id);
-- CREATE INDEX idx_language_id ON product_translations(language_id);


