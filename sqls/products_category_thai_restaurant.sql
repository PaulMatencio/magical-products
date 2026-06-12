-- Insert Thai restaurant categories with auto-generated UUIDs
DO $$
DECLARE
    -- Main categories IDs
    main_categories_id UUID;
    appetizers_id UUID;
    soups_id UUID;
    salads_id UUID;
    noodle_rice_id UUID;
    curry_id UUID;
    stir_fried_id UUID;
    seafood_id UUID;
    vegetarian_id UUID;
    desserts_id UUID;
    beverages_id UUID;
    chef_specials_id UUID;
    set_menus_id UUID;
    
BEGIN
    -- ========================================
    -- TOP LEVEL: Restaurant Name
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Bangkok Garden', 'bangkok-garden', NULL, 1) 
    RETURNING id INTO main_categories_id;
    
    -- ========================================
    -- MAIN COURSE CATEGORIES (Level 1)
    -- ========================================
    
    -- Appetizers (อาหารเรียกน้ำย่อย)
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Appetizers', 'appetizers', main_categories_id, 1) 
    RETURNING id INTO appetizers_id;
    
    -- Soups (ซุป)
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Soups', 'soups', main_categories_id, 2) 
    RETURNING id INTO soups_id;
    
    -- Salads (สลัด)
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Salads', 'salads', main_categories_id, 3) 
    RETURNING id INTO salads_id;
    
    -- Noodle & Rice Dishes (ก๋วยเตี๋ยวและข้าว)
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Noodle & Rice', 'noodle-rice', main_categories_id, 4) 
    RETURNING id INTO noodle_rice_id;
    
    -- Curries (แกง)
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Curries', 'curries', main_categories_id, 5) 
    RETURNING id INTO curry_id;
    
    -- Stir-Fried Dishes (ผัด)
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Stir-Fried Dishes', 'stir-fried', main_categories_id, 6) 
    RETURNING id INTO stir_fried_id;
    
    -- Seafood (อาหารทะเล)
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Seafood', 'seafood', main_categories_id, 7) 
    RETURNING id INTO seafood_id;
    
    -- Vegetarian (มังสวิรัติ)
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Vegetarian', 'vegetarian', main_categories_id, 8) 
    RETURNING id INTO vegetarian_id;
    
    -- Chef's Specials (เมนูพิเศษ)
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Chef''s Specials', 'chef-specials', main_categories_id, 9) 
    RETURNING id INTO chef_specials_id;
    
    -- Set Menus (ชุดอาหาร)
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Set Menus', 'set-menus', main_categories_id, 10) 
    RETURNING id INTO set_menus_id;
    
    -- Desserts (ของหวาน)
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Desserts', 'desserts', main_categories_id, 11) 
    RETURNING id INTO desserts_id;
    
    -- Beverages (เครื่องดื่ม)
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Beverages', 'beverages', main_categories_id, 12) 
    RETURNING id INTO beverages_id;
    
    -- ========================================
    -- APPETIZERS SUB-CATEGORIES (Level 2)
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Spring Rolls', 'spring-rolls', appetizers_id, 1),
        ('Satay', 'satay', appetizers_id, 2),
        ('Dumplings', 'dumplings', appetizers_id, 3),
        ('Fish Cakes', 'fish-cakes', appetizers_id, 4),
        ('Crab Rolls', 'crab-rolls', appetizers_id, 5),
        ('Fried Tofu', 'fried-tofu', appetizers_id, 6),
        ('Chicken Wings', 'chicken-wings', appetizers_id, 7),
        ('Crispy Wontons', 'crispy-wontons', appetizers_id, 8);
    
    -- ========================================
    -- SOUPS SUB-CATEGORIES (Level 2)
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Tom Yum Goong', 'tom-yum-goong', soups_id, 1),
        ('Tom Kha Gai', 'tom-kha-gai', soups_id, 2),
        ('Wonton Soup', 'wonton-soup', soups_id, 3),
        ('Tofu Soup', 'tofu-soup', soups_id, 4),
        ('Vegetable Soup', 'vegetable-soup', soups_id, 5);
    
    -- ========================================
    -- SALADS SUB-CATEGORIES (Level 2)
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Som Tum', 'som-tum', salads_id, 1),
        ('Larb', 'larb', salads_id, 2),
        ('Yum Woon Sen', 'yum-woon-sen', salads_id, 3),
        ('Beef Salad', 'beef-salad', salads_id, 4),
        ('Mango Salad', 'mango-salad', salads_id, 5);
    
    -- ========================================
    -- NOODLE & RICE SUB-CATEGORIES (Level 2)
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Pad Thai', 'pad-thai', noodle_rice_id, 1),
        ('Pad See Ew', 'pad-see-ew', noodle_rice_id, 2),
        ('Drunken Noodles', 'drunken-noodles', noodle_rice_id, 3),
        ('Khao Pad', 'khao-pad', noodle_rice_id, 4),
        ('Thai Fried Rice', 'thai-fried-rice', noodle_rice_id, 5),
        ('Pineapple Fried Rice', 'pineapple-fried-rice', noodle_rice_id, 6),
        ('Crab Fried Rice', 'crab-fried-rice', noodle_rice_id, 7),
        ('Ramen Noodle Soup', 'ramen-noodle-soup', noodle_rice_id, 8);
    
    -- ========================================
    -- CURRIES SUB-CATEGORIES (Level 2)
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Green Curry', 'green-curry', curry_id, 1),
        ('Red Curry', 'red-curry', curry_id, 2),
        ('Panang Curry', 'panang-curry', curry_id, 3),
        ('Massaman Curry', 'massaman-curry', curry_id, 4),
        ('Yellow Curry', 'yellow-curry', curry_id, 5),
        ('Jungle Curry', 'jungle-curry', curry_id, 6);
    
    -- ========================================
    -- STIR-FRIED SUB-CATEGORIES (Level 2)
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Pad Kra Pao', 'pad-kra-pao', stir_fried_id, 1),
        ('Pad Prik King', 'pad-prik-king', stir_fried_id, 2),
        ('Cashew Chicken', 'cashew-chicken', stir_fried_id, 3),
        ('Garlic Pepper', 'garlic-pepper', stir_fried_id, 4),
        ('Sweet & Sour', 'sweet-sour', stir_fried_id, 5),
        ('Pad Pak Ruam', 'pad-pak-ruam', stir_fried_id, 6);
    
    -- ========================================
    -- SEAFOOD SUB-CATEGORIES (Level 2)
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Fried Fish', 'fried-fish', seafood_id, 1),
        ('Steamed Fish', 'steamed-fish', seafood_id, 2),
        ('Fish Pad Ped', 'fish-pad-ped', seafood_id, 3),
        ('Garlic Prawns', 'garlic-prawns', seafood_id, 4),
        ('Spicy Squid', 'spicy-squid', seafood_id, 5),
        ('Seafood Curry', 'seafood-curry', seafood_id, 6);
    
    -- ========================================
    -- VEGETARIAN SUB-CATEGORIES (Level 2)
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Vegetable Spring Rolls', 'veg-spring-rolls', vegetarian_id, 1),
        ('Tofu Pad Thai', 'tofu-pad-thai', vegetarian_id, 2),
        ('Vegetable Curry', 'vegetable-curry', vegetarian_id, 3),
        ('Vegetable Fried Rice', 'veg-fried-rice', vegetarian_id, 4),
        ('Mixed Vegetables', 'mixed-vegetables', vegetarian_id, 5),
        ('Tofu Delight', 'tofu-delight', vegetarian_id, 6);
    
    -- ========================================
    -- CHEF'S SPECIALS SUB-CATEGORIES (Level 2)
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Royal Thai Platter', 'royal-thai-platter', chef_specials_id, 1),
        ('Signature Duck Curry', 'signature-duck-curry', chef_specials_id, 2),
        ('Whole Fried Fish', 'whole-fried-fish', chef_specials_id, 3),
        ('Lobster Pad Thai', 'lobster-pad-thai', chef_specials_id, 4),
        ('Crying Tiger Beef', 'crying-tiger-beef', chef_specials_id, 5);
    
    -- ========================================
    -- SET MENUS SUB-CATEGORIES (Level 2)
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Dinner for Two', 'dinner-for-two', set_menus_id, 1),
        ('Family Set', 'family-set', set_menus_id, 2),
        ('Vegetarian Feast', 'vegetarian-feast', set_menus_id, 3),
        ('Seafood Lover', 'seafood-lover', set_menus_id, 4),
        ('Tasting Menu', 'tasting-menu', set_menus_id, 5);
    
    -- ========================================
    -- DESSERTS SUB-CATEGORIES (Level 2)
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Mango Sticky Rice', 'mango-sticky-rice', desserts_id, 1),
        ('Thai Coconut Ice Cream', 'coconut-ice-cream', desserts_id, 2),
        ('Fried Banana', 'fried-banana', desserts_id, 3),
        ('Tapioca Pudding', 'tapioca-pudding', desserts_id, 4),
        ('Sweet Sticky Rice', 'sweet-sticky-rice', desserts_id, 5),
        ('Coconut Pancakes', 'coconut-pancakes', desserts_id, 6);
    
    -- ========================================
    -- BEVERAGES SUB-CATEGORIES (Level 2)
    -- ========================================
    INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
        ('Thai Iced Tea', 'thai-iced-tea', beverages_id, 1),
        ('Thai Iced Coffee', 'thai-iced-coffee', beverages_id, 2),
        ('Coconut Water', 'coconut-water', beverages_id, 3),
        ('Lemongrass Tea', 'lemongrass-tea', beverages_id, 4),
        ('Fresh Juice', 'fresh-juice', beverages_id, 5),
        ('Soft Drinks', 'soft-drinks', beverages_id, 6),
        ('Beer', 'beer', beverages_id, 7),
        ('Wine', 'wine', beverages_id, 8);
    
    -- ========================================
    -- SPICE LEVELS (Could be tags instead of categories)
    -- ========================================
    -- Note: These might be better as product attributes rather than categories
    -- But if you want them as categories, here's how:
    INSERT INTO categories (name, slug, parent_id, display_order) 
    VALUES ('Spice Levels', 'spice-levels', main_categories_id, 13);
    
    -- Get the spice levels ID
    DECLARE
        spice_levels_id UUID;
    BEGIN
        SELECT id INTO spice_levels_id FROM categories WHERE slug = 'spice-levels';
        
        INSERT INTO categories (name, slug, parent_id, display_order) VALUES 
            ('Mild', 'mild', spice_levels_id, 1),
            ('Medium', 'medium', spice_levels_id, 2),
            ('Hot', 'hot', spice_levels_id, 3),
            ('Thai Hot', 'thai-hot', spice_levels_id, 4);
    END;
    
END $$;

-- View the complete Thai restaurant category structure
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