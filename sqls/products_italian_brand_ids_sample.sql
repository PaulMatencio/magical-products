-- Insert Italian food brands
INSERT INTO brands (id, name, slug, description, website, country_of_origin, founded_year, is_manufacturer, certifications) VALUES
    -- Pasta brands
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'Barilla', 'barilla', 'World-famous pasta brand, symbol of Italian pasta quality', 'https://www.barilla.com', 'Italy', 1877, TRUE, ARRAY['ISO 9001', 'B Corp']),
    
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2', 'De Cecco', 'de-cecco', 'Premium pasta made with high-quality durum wheat', 'https://www.dececco.com', 'Italy', 1886, TRUE, ARRAY['ISO 9001']),
    
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3', 'Rummo', 'rummo', 'Artisan pasta with bronze dies for perfect texture', 'https://www.rummo.it', 'Italy', 1846, TRUE, ARRAY['Organic Certified']),
    
    -- Olive Oil brands
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1', 'Monini', 'monini', 'Premium extra virgin olive oil from Umbria', 'https://www.monini.com', 'Italy', 1920, TRUE, ARRAY['PDO', 'Organic']),
    
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb2', 'Filippo Berio', 'filippo-berio', 'Renowned olive oil brand since 1867', 'https://www.filippoberio.com', 'Italy', 1867, TRUE, NULL),
    
    -- Cheese brands
    ('cccccccc-cccc-cccc-cccc-ccccccccccc1', 'Nuova Castelli', 'nuova-castelli', 'Specialist in Parmigiano Reggiano and Gorgonzola', 'https://www.nuovacastelli.it', 'Italy', 1950, TRUE, ARRAY['DOP Certified']),
    
    ('cccccccc-cccc-cccc-cccc-ccccccccccc2', 'Galbani', 'galbani', 'Famous for mozzarella and soft cheeses', 'https://www.galbani.com', 'Italy', 1882, TRUE, NULL),
    
    -- Coffee brands
    ('dddddddd-dddd-dddd-dddd-ddddddddddd1', 'Lavazza', 'lavazza', 'Iconic Italian coffee brand since 1895', 'https://www.lavazza.com', 'Italy', 1895, TRUE, ARRAY['Rainforest Alliance']),
    
    ('dddddddd-dddd-dddd-dddd-ddddddddddd2', 'Illy', 'illy', 'Premium espresso brand known for unique blend', 'https://www.illy.com', 'Italy', 1933, TRUE, ARRAY['B Corp', 'Carbon Neutral']),
    
    -- Cured Meats brands
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee1', 'Devodier Prosciutti', 'devodier', 'Premium Parma Ham producer', 'https://www.devodier.it', 'Italy', 1901, TRUE, ARRAY['DOP Certified']),
    
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee2', 'Beretta', 'beretta', 'Traditional Italian salumi and cured meats', 'https://www.beretta.com', 'Italy', 1812, TRUE, NULL),
    
    -- Vinegar brands
    ('ffffffff-ffff-ffff-ffff-fffffffffff1', 'Acetaia Malpighi', 'acetaia-malpighi', 'Traditional Balsamic Vinegar of Modena since 1850', 'https://www.mal-pighi.it', 'Italy', 1850, TRUE, ARRAY['PGI Certified']),
    
    ('ffffffff-ffff-ffff-ffff-fffffffffff2', 'Giusti', 'giusti', 'Historic balsamic vinegar producer from Modena', 'https://www.giusti.it', 'Italy', 1605, TRUE, ARRAY['DOP', 'PGI']),
    
    -- Tomato/Sauce brands
    ('11111111-1111-1111-1111-111111111111', 'Mutti', 'mutti', 'Leading tomato products from Parma', 'https://www.mutti.it', 'Italy', 1899, TRUE, ARRAY['Organic', 'B Corp']),
    
    -- Wine brands
    ('22222222-2222-2222-2222-222222222222', 'Antinori', 'antinori', 'Historic Tuscan wine producer since 1385', 'https://www.antinori.it', 'Italy', 1385, TRUE, ARRAY['Sustainable Practice']),
    
    -- Chocolate/Sweets brands
    ('33333333-3333-3333-3333-333333333333', 'Ferrero', 'ferrero', 'Famous for Nutella, Ferrero Rocher, and Kinder', 'https://www.ferrero.com', 'Italy', 1946, TRUE, NULL),
    
    ('33333333-3333-3333-3333-333333333334', 'Venchi', 'venchi', 'Premium Italian chocolate since 1878', 'https://www.venchi.com', 'Italy', 1878, TRUE, ARRAY['Rainforest Alliance']),

    -- Gluten-free / Specialty brands
    ('44444444-4444-4444-4444-444444444441', 'Govifarm', 'govifarm', 'Gluten-free pasta made from legumes and superfoods', 'https://www.govifarm.com', 'Italy', 2010, TRUE, ARRAY['Organic', 'Vegan', 'Kosher', 'Gluten-Free']),
    
    ('44444444-4444-4444-4444-444444444442', 'Tiberino', 'tiberino', 'Gourmet one-pot meal kits with natural ingredients', 'https://www.tiberino.com', 'Italy', 1997, TRUE, ARRAY['Natural', 'No Preservatives']);

-- Get count of brands
SELECT COUNT(*) as total_brands FROM brands;