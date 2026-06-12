-- Insert Italian food shop categories with auto-generated UUIDs
DO $$
DECLARE
    -- Main shop ID
    shop_id UUID;
    
    -- Level 1 category IDs
    pasta_id UUID;
    sauces_id UUID;
    olive_oil_id UUID;
    cheese_id UUID;
    meats_id UUID;
    bread_bakery_id UUID;
    vegetables_id UUID;
    pantry_id UUID;
    beverages_id UUID;
    desserts_id UUID;
    frozen_id UUID;
    gift_sets_id UUID;
    fresh_seafood_id UUID;
    spices_herbs_id UUID;
    rice_grains_id UUID;
    kitchenware_id UUID;
    
BEGIN
    -- ========================================
    -- TOP LEVEL: Shop Name
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('La Cucina Italiana', 'la-cucina-italiana', NULL, 1) 
    RETURNING id INTO shop_id;
    
    -- ========================================
    -- MAIN CATEGORIES (Level 1)
    -- ========================================
    
    -- Pasta (Pasta)
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Pasta', 'pasta', shop_id, 1) 
    RETURNING id INTO pasta_id;
    
    -- Sauces (Salse)
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Sauces', 'sauces', shop_id, 2) 
    RETURNING id INTO sauces_id;
    
    -- Olive Oil (Olio d''Oliva)
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Olive Oil', 'olive-oil', shop_id, 3) 
    RETURNING id INTO olive_oil_id;
    
    -- Cheese (Formaggio)
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Cheese', 'cheese', shop_id, 4) 
    RETURNING id INTO cheese_id;
    
    -- Cured Meats (Salumi)
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Cured Meats', 'cured-meats', shop_id, 5) 
    RETURNING id INTO meats_id;
    
    -- Bread & Bakery (Pane e Prodotti da Forno)
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Bread & Bakery', 'bread-bakery', shop_id, 6) 
    RETURNING id INTO bread_bakery_id;
    
    -- Fresh Vegetables (Ortaggi Freschi)
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Fresh Vegetables', 'fresh-vegetables', shop_id, 7) 
    RETURNING id INTO vegetables_id;
    
    -- Pantry Essentials (Dispensa)
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Pantry Essentials', 'pantry-essentials', shop_id, 8) 
    RETURNING id INTO pantry_id;
    
    -- Beverages (Bevande)
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Beverages', 'beverages', shop_id, 9) 
    RETURNING id INTO beverages_id;
    
    -- Desserts (Dolci)
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Desserts', 'desserts', shop_id, 10) 
    RETURNING id INTO desserts_id;
    
    -- Frozen Foods (Surgelati)
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Frozen Foods', 'frozen-foods', shop_id, 11) 
    RETURNING id INTO frozen_id;
    
    -- Gift Sets (Cesti Regalo)
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Gift Sets', 'gift-sets', shop_id, 12) 
    RETURNING id INTO gift_sets_id;
    
    -- Fresh Seafood (Pesce Fresco)
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Fresh Seafood', 'fresh-seafood', shop_id, 13) 
    RETURNING id INTO fresh_seafood_id;
    
    -- Spices & Herbs (Spezie ed Erbe)
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Spices & Herbs', 'spices-herbs', shop_id, 14) 
    RETURNING id INTO spices_herbs_id;
    
    -- Rice & Grains (Riso e Cereali)
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Rice & Grains', 'rice-grains', shop_id, 15) 
    RETURNING id INTO rice_grains_id;
    
    -- Kitchenware (Utensili da Cucina)
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Kitchenware', 'kitchenware', shop_id, 16) 
    RETURNING id INTO kitchenware_id;
    
    -- ========================================
    -- PASTA SUB-CATEGORIES (Level 2)
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Dried Pasta', 'dried-pasta', pasta_id, 1),
        ('Fresh Pasta', 'fresh-pasta', pasta_id, 2),
        ('Stuffed Pasta', 'stuffed-pasta', pasta_id, 3),
        ('Gluten-Free Pasta', 'gluten-free-pasta', pasta_id, 4),
        ('Whole Wheat Pasta', 'whole-wheat-pasta', pasta_id, 5),
        ('Organic Pasta', 'organic-pasta', pasta_id, 6);
    
    -- ========================================
    -- PASTA SHAPES (Level 3 - under Dried Pasta)
    -- ========================================
    DECLARE
        dried_pasta_id UUID;
        fresh_pasta_id UUID;
        stuffed_pasta_id UUID;
    BEGIN
        SELECT id INTO dried_pasta_id FROM categories WHERE slug = 'dried-pasta' AND parent_id = pasta_id;
        SELECT id INTO fresh_pasta_id FROM categories WHERE slug = 'fresh-pasta' AND parent_id = pasta_id;
        SELECT id INTO stuffed_pasta_id FROM categories WHERE slug = 'stuffed-pasta' AND parent_id = pasta_id;
        
        -- Dried pasta shapes
        INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
            ('Spaghetti', 'spaghetti', dried_pasta_id, 1),
            ('Penne', 'penne', dried_pasta_id, 2),
            ('Fusilli', 'fusilli', dried_pasta_id, 3),
            ('Fettuccine', 'fettuccine', dried_pasta_id, 4),
            ('Linguine', 'linguine', dried_pasta_id, 5),
            ('Pappardelle', 'pappardelle', dried_pasta_id, 6),
            ('Tagliatelle', 'tagliatelle', dried_pasta_id, 7),
            ('Rigatoni', 'rigatoni', dried_pasta_id, 8),
            ('Farfalle', 'farfalle', dried_pasta_id, 9),
            ('Orecchiette', 'orecchiette', dried_pasta_id, 10),
            ('Lasagna Sheets', 'lasagna-sheets', dried_pasta_id, 11),
            ('Orzo', 'orzo', dried_pasta_id, 12),
            ('Ditalini', 'ditalini', dried_pasta_id, 13);
        
        -- Fresh pasta
        INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
            ('Fresh Fettuccine', 'fresh-fettuccine', fresh_pasta_id, 1),
            ('Fresh Tagliatelle', 'fresh-tagliatelle', fresh_pasta_id, 2),
            ('Fresh Pappardelle', 'fresh-pappardelle', fresh_pasta_id, 3);
        
        -- Stuffed pasta
        INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
            ('Ravioli', 'ravioli', stuffed_pasta_id, 1),
            ('Tortellini', 'tortellini', stuffed_pasta_id, 2),
            ('Agnolotti', 'agnolotti', stuffed_pasta_id, 3),
            ('Gnocchi', 'gnocchi', stuffed_pasta_id, 4);
    END;
    
    -- ========================================
    -- SAUCES SUB-CATEGORIES (Level 2)
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Tomato Sauces', 'tomato-sauces', sauces_id, 1),
        ('Pesto', 'pesto', sauces_id, 2),
        ('Alfredo Sauces', 'alfredo-sauces', sauces_id, 3),
        ('Carbonara Sauces', 'carbonara-sauces', sauces_id, 4),
        ('Arrabbiata Sauces', 'arrabbiata-sauces', sauces_id, 5),
        ('Bolognese Sauces', 'bolognese-sauces', sauces_id, 6),
        ('Marinara Sauces', 'marinara-sauces', sauces_id, 7),
        ('White Sauces', 'white-sauces', sauces_id, 8),
        ('Organic Sauces', 'organic-sauces', sauces_id, 9);
    
    -- ========================================
    -- OLIVE OIL SUB-CATEGORIES (Level 2)
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Extra Virgin Olive Oil', 'extra-virgin-olive-oil', olive_oil_id, 1),
        ('Cold Pressed', 'cold-pressed', olive_oil_id, 2),
        ('Organic Olive Oil', 'organic-olive-oil', olive_oil_id, 3),
        ('Flavored Olive Oil', 'flavored-olive-oil', olive_oil_id, 4),
        ('Premium Collection', 'premium-collection', olive_oil_id, 5),
        ('Tuscan EVOO', 'tuscan-evoo', olive_oil_id, 6),
        ('Sicilian EVOO', 'sicilian-evoo', olive_oil_id, 7),
        ('Puglian EVOO', 'puglian-evoo', olive_oil_id, 8);
    
    -- Flavored oils subcategories
    DECLARE
        flavored_oil_id UUID;
    BEGIN
        SELECT id INTO flavored_oil_id FROM categories WHERE slug = 'flavored-olive-oil' AND parent_id = olive_oil_id;
        
        INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
            ('Garlic Infused', 'garlic-infused', flavored_oil_id, 1),
            ('Lemon Infused', 'lemon-infused', flavored_oil_id, 2),
            ('Rosemary Infused', 'rosemary-infused', flavored_oil_id, 3),
            ('Truffle Infused', 'truffle-infused', flavored_oil_id, 4),
            ('Chili Infused', 'chili-infused', flavored_oil_id, 5);
    END;
    
    -- ========================================
    -- CHEESE SUB-CATEGORIES (Level 2)
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Parmigiano Reggiano', 'parmigiano-reggiano', cheese_id, 1),
        ('Pecorino Romano', 'pecorino-romano', cheese_id, 2),
        ('Mozzarella', 'mozzarella', cheese_id, 3),
        ('Burrata', 'burrata', cheese_id, 4),
        ('Gorgonzola', 'gorgonzola', cheese_id, 5),
        ('Taleggio', 'taleggio', cheese_id, 6),
        ('Fontina', 'fontina', cheese_id, 7),
        ('Ricotta', 'ricotta', cheese_id, 8),
        ('Mascarpone', 'mascarpone', cheese_id, 9),
        ('Provolone', 'provolone', cheese_id, 10),
        ('Asiago', 'asiago', cheese_id, 11),
        ('Grana Padano', 'grana-padano', cheese_id, 12),
        ('Fresh Cheese', 'fresh-cheese', cheese_id, 13),
        ('Aged Cheese', 'aged-cheese', cheese_id, 14),
        ('Goat Cheese', 'goat-cheese', cheese_id, 15);
    
    -- ========================================
    -- CURED MEATS SUB-CATEGORIES (Level 2)
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Prosciutto', 'prosciutto', meats_id, 1),
        ('Pancetta', 'pancetta', meats_id, 2),
        ('Salami', 'salami', meats_id, 3),
        ('Speck', 'speck', meats_id, 4),
        ('Bresaola', 'bresaola', meats_id, 5),
        ('Mortadella', 'mortadella', meats_id, 6),
        ('Coppa', 'coppa', meats_id, 7),
        ('Soppressata', 'soppressata', meats_id, 8),
        ('Guanciale', 'guanciale', meats_id, 9),
        ('Italian Sausage', 'italian-sausage', meats_id, 10);
    
    -- Salami varieties
    DECLARE
        salami_id UUID;
    BEGIN
        SELECT id INTO salami_id FROM categories WHERE slug = 'salami' AND parent_id = meats_id;
        
        INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
            ('Milano Salami', 'milano-salami', salami_id, 1),
            ('Genoa Salami', 'genoa-salami', salami_id, 2),
            ('Spicy Salami', 'spicy-salami', salami_id, 3),
            ('Wild Boar Salami', 'wild-boar-salami', salami_id, 4),
            ('Truffle Salami', 'truffle-salami', salami_id, 5);
    END;
    
    -- ========================================
    -- BREAD & BAKERY SUB-CATEGORIES (Level 2)
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Ciabatta', 'ciabatta', bread_bakery_id, 1),
        ('Focaccia', 'focaccia', bread_bakery_id, 2),
        ('Grissini', 'grissini', bread_bakery_id, 3),
        ('Pane Toscano', 'pane-toscano', bread_bakery_id, 4),
        ('Pizza Dough', 'pizza-dough', bread_bakery_id, 5),
        ('Breadsticks', 'breadsticks', bread_bakery_id, 6),
        ('Croissants', 'croissants', bread_bakery_id, 7),
        ('Cornetti', 'cornetti', bread_bakery_id, 8);
    
    -- ========================================
    -- FRESH VEGETABLES SUB-CATEGORIES (Level 2)
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Tomatoes', 'tomatoes', vegetables_id, 1),
        ('Eggplant', 'eggplant', vegetables_id, 2),
        ('Zucchini', 'zucchini', vegetables_id, 3),
        ('Bell Peppers', 'bell-peppers', vegetables_id, 4),
        ('Artichokes', 'artichokes', vegetables_id, 5),
        ('Mushrooms', 'mushrooms', vegetables_id, 6),
        ('Arugula', 'arugula', vegetables_id, 7),
        ('Radicchio', 'radicchio', vegetables_id, 8),
        ('Fennel', 'fennel', vegetables_id, 9),
        ('Garlic', 'garlic', vegetables_id, 10),
        ('Onions', 'onions', vegetables_id, 11),
        ('Broccoli Rabe', 'broccoli-rabe', vegetables_id, 12);
    
    -- ========================================
    -- PANTRY ESSENTIALS SUB-CATEGORIES (Level 2)
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Canned Tomatoes', 'canned-tomatoes', pantry_id, 1),
        ('Tomato Paste', 'tomato-paste', pantry_id, 2),
        ('Sun-Dried Tomatoes', 'sun-dried-tomatoes', pantry_id, 3),
        ('Olives', 'olives', pantry_id, 4),
        ('Capers', 'capers', pantry_id, 5),
        ('Anchovies', 'anchovies', pantry_id, 6),
        ('Vinegars', 'vinegars', pantry_id, 7),
        ('Flour', 'flour', pantry_id, 8),
        ('Polenta', 'polenta', pantry_id, 9),
        ('Canned Beans', 'canned-beans', pantry_id, 10),
        ('Pesto Jarred', 'pesto-jarred', pantry_id, 11),
        ('Tapenade', 'tapenade', pantry_id, 12);
    
    -- Vinegars subcategories
    DECLARE
        vinegars_id UUID;
    BEGIN
        SELECT id INTO vinegars_id FROM categories WHERE slug = 'vinegars' AND parent_id = pantry_id;
        
        INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
            ('Balsamic Vinegar', 'balsamic-vinegar', vinegars_id, 1),
            ('Red Wine Vinegar', 'red-wine-vinegar', vinegars_id, 2),
            ('White Wine Vinegar', 'white-wine-vinegar', vinegars_id, 3),
            ('Champagne Vinegar', 'champagne-vinegar', vinegars_id, 4),
            ('Apple Cider Vinegar', 'apple-cider-vinegar', vinegars_id, 5);
    END;
    
    -- ========================================
    -- BEVERAGES SUB-CATEGORIES (Level 2)
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Italian Wine', 'italian-wine', beverages_id, 1),
        ('Sparkling Water', 'sparkling-water', beverages_id, 2),
        ('Italian Sodas', 'italian-sodas', beverages_id, 3),
        ('Coffee', 'coffee', beverages_id, 4),
        ('Espresso', 'espresso', beverages_id, 5),
        ('Aperitifs', 'aperitifs', beverages_id, 6),
        ('Limoncello', 'limoncello', beverages_id, 7),
        ('Grappa', 'grappa', beverages_id, 8),
        ('Italian Beer', 'italian-beer', beverages_id, 9);
    
    -- Wine subcategories
    DECLARE
        wine_id UUID;
    BEGIN
        SELECT id INTO wine_id FROM categories WHERE slug = 'italian-wine' AND parent_id = beverages_id;
        
        INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
            ('Red Wine', 'red-wine', wine_id, 1),
            ('White Wine', 'white-wine', wine_id, 2),
            ('Rosé Wine', 'rose-wine', wine_id, 3),
            ('Sparkling Wine', 'sparkling-wine', wine_id, 4),
            ('Dessert Wine', 'dessert-wine', wine_id, 5);
    END;
    
    -- ========================================
    -- DESSERTS SUB-CATEGORIES (Level 2)
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Tiramisu', 'tiramisu', desserts_id, 1),
        ('Cannoli', 'cannoli', desserts_id, 2),
        ('Panna Cotta', 'panna-cotta', desserts_id, 3),
        ('Gelato', 'gelato', desserts_id, 4),
        ('Biscotti', 'biscotti', desserts_id, 5),
        ('Amaretti', 'amaretti', desserts_id, 6),
        ('Panettone', 'panettone', desserts_id, 7),
        ('Pandoro', 'pandoro', desserts_id, 8),
        ('Sbriciolata', 'sbriciolata', desserts_id, 9),
        ('Zeppole', 'zeppole', desserts_id, 10),
        ('Italian Pastries', 'italian-pastries', desserts_id, 11),
        ('Cookies', 'cookies', desserts_id, 12);
    
    -- ========================================
    -- FROZEN FOODS SUB-CATEGORIES (Level 2)
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Frozen Pizza', 'frozen-pizza', frozen_id, 1),
        ('Frozen Pasta', 'frozen-pasta', frozen_id, 2),
        ('Frozen Vegetables', 'frozen-vegetables', frozen_id, 3),
        ('Frozen Seafood', 'frozen-seafood', frozen_id, 4),
        ('Frozen Gelato', 'frozen-gelato', frozen_id, 5),
        ('Frozen Meals', 'frozen-meals', frozen_id, 6),
        ('Frozen Dough', 'frozen-dough', frozen_id, 7);
    
    -- ========================================
    -- GIFT SETS SUB-CATEGORIES (Level 2)
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Pasta Gift Sets', 'pasta-gift-sets', gift_sets_id, 1),
        ('Olive Oil Gift Sets', 'olive-oil-gift-sets', gift_sets_id, 2),
        ('Wine Gift Sets', 'wine-gift-sets', gift_sets_id, 3),
        ('Cheese Gift Sets', 'cheese-gift-sets', gift_sets_id, 4),
        ('Meat Gift Sets', 'meat-gift-sets', gift_sets_id, 5),
        ('Dessert Gift Sets', 'dessert-gift-sets', gift_sets_id, 6),
        ('Gourmet Baskets', 'gourmet-baskets', gift_sets_id, 7),
        ('Corporate Gifts', 'corporate-gifts', gift_sets_id, 8),
        ('Holiday Specials', 'holiday-specials', gift_sets_id, 9);
    
    -- ========================================
    -- SPICES & HERBS SUB-CATEGORIES (Level 2)
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Dried Oregano', 'dried-oregano', spices_herbs_id, 1),
        ('Basil', 'basil', spices_herbs_id, 2),
        ('Rosemary', 'rosemary', spices_herbs_id, 3),
        ('Thyme', 'thyme', spices_herbs_id, 4),
        ('Sage', 'sage', spices_herbs_id, 5),
        ('Parsley', 'parsley', spices_herbs_id, 6),
        ('Italian Seasoning', 'italian-seasoning', spices_herbs_id, 7),
        ('Red Pepper Flakes', 'red-pepper-flakes', spices_herbs_id, 8),
        ('Fennel Seeds', 'fennel-seeds', spices_herbs_id, 9),
        ('Saffron', 'saffron', spices_herbs_id, 10);
    
    -- ========================================
    -- RICE & GRAINS SUB-CATEGORIES (Level 2)
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Arborio Rice', 'arborio-rice', rice_grains_id, 1),
        ('Carnaroli Rice', 'carnaroli-rice', rice_grains_id, 2),
        ('Vialone Nano', 'vialone-nano', rice_grains_id, 3),
        ('Risotto Rice', 'risotto-rice', rice_grains_id, 4),
        ('Farro', 'farro', rice_grains_id, 5),
        ('Polenta Cornmeal', 'polenta-cornmeal', rice_grains_id, 6);
    
    -- ========================================
    -- KITCHENWARE SUB-CATEGORIES (Level 2)
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Pasta Makers', 'pasta-makers', kitchenware_id, 1),
        ('Pizza Stones', 'pizza-stones', kitchenware_id, 2),
        ('Espresso Makers', 'espresso-makers', kitchenware_id, 3),
        ('Cheese Graters', 'cheese-graters', kitchenware_id, 4),
        ('Pots & Pans', 'pots-pans', kitchenware_id, 5),
        ('Cookbooks', 'cookbooks', kitchenware_id, 6),
        ('Aprons', 'aprons', kitchenware_id, 7),
        ('Tuscan Ceramics', 'tuscan-ceramics', kitchenware_id, 8);
    
END $$;

-- View the complete category structure
WITH RECURSIVE category_tree AS (
    SELECT 
        id,
        name,
        slug,
        parent_id,
        0 as depth,
        name as full_path,
        display_order
    FROM categories
    WHERE parent_id IS NULL
    
    UNION ALL
    
    SELECT 
        c.id,
        c.name,
        c.slug,
        c.parent_id,
        ct.depth + 1,
        ct.full_path || ' > ' || c.name,
        c.display_order
    FROM categories c
    INNER JOIN category_tree ct ON c.parent_id = ct.id
)
SELECT 
    depth,
    repeat('  ', depth) || name as indented_name,
    full_path,
    slug,
    display_order
FROM category_tree
ORDER BY full_path;