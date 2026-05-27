
-- Category translations table
CREATE TABLE category_translations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    language_id UUID NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(category_id, language_id)

);
-- Create indexes for category_translations table
CREATE INDEX idx_category_id ON category_translations(category_id);
CREATE INDEX idx_language_id ON category_translations(language_id);


-- First, ensure all languages exist
INSERT INTO languages (code, name, native_name, flag_emoji, is_default, is_active) VALUES
('es', 'Spanish', 'Español', '🇪🇸', FALSE, TRUE),
('fr', 'French', 'Français', '🇫🇷', FALSE, TRUE),
('it', 'Italian', 'Italiano', '🇮🇹', FALSE, TRUE)
ON CONFLICT (code) DO NOTHING;

-- ========================================
-- SPANISH TRANSLATIONS (Names & Descriptions)
-- ========================================
INSERT INTO category_translations (category_id, language_id, name, description)
SELECT 
    c.id,
    l.id,
    CASE c.slug
        -- Electronics & subcategories
        WHEN 'electronics' THEN 'Electrónicos'
        WHEN 'computers' THEN 'Computadoras'
        WHEN 'mobile-devices' THEN 'Dispositivos Móviles'
        WHEN 'electronics-accessories' THEN 'Accesorios Electrónicos'
        WHEN 'laptops' THEN 'Portátiles'
        WHEN 'desktops' THEN 'Computadoras de Escritorio'
        WHEN 'computer-accessories' THEN 'Accesorios de Computadora'
        WHEN 'smartphones' THEN 'Teléfonos Inteligentes'
        WHEN 'smartphone-accessories' THEN 'Accesorios para Teléfonos'
        WHEN 'smartphone-cases' THEN 'Fundas para Teléfonos'
        WHEN 'screen-protectors' THEN 'Protectores de Pantalla'
        WHEN 'tablets' THEN 'Tabletas'
        WHEN 'tablet-accessories' THEN 'Accesorios para Tabletas'
        WHEN 'tablet-cases' THEN 'Fundas para Tabletas'
        WHEN 'power-banks' THEN 'Bancos de Energía'
        WHEN 'chargers-cables' THEN 'Cargadores y Cables'
        WHEN 'audio-headphones' THEN 'Audio y Auriculares'
        WHEN 'batteries' THEN 'Baterías'
        WHEN 'screen-cleaners' THEN 'Limpiadores de Pantalla'
        WHEN 'cable-organizers' THEN 'Organizadores de Cables'
        
        -- Apparel & subcategories
        WHEN 'apparel' THEN 'Ropa'
        WHEN 'men' THEN 'Hombres'
        WHEN 'women' THEN 'Mujeres'
        WHEN 'kids' THEN 'Niños'
        WHEN 'apparel-accessories' THEN 'Accesorios de Ropa'
        WHEN 't-shirts' THEN 'Camisetas'
        WHEN 'jeans' THEN 'Jeans'
        WHEN 'shirts' THEN 'Camisas'
        WHEN 'jackets' THEN 'Chaquetas'
        WHEN 'suits' THEN 'Trajes'
        WHEN 'dresses' THEN 'Vestidos'
        WHEN 'blouses' THEN 'Blusas'
        WHEN 'skirts' THEN 'Faldas'
        WHEN 'pants' THEN 'Pantalones'
        WHEN 'boys' THEN 'Niños'
        WHEN 'girls' THEN 'Niñas'
        WHEN 'baby' THEN 'Bebés'
        WHEN 'bags' THEN 'Bolsos'
        WHEN 'belts' THEN 'Cinturones'
        WHEN 'hats-caps' THEN 'Sombreros y Gorras'
        WHEN 'scarves' THEN 'Bufandas'
        WHEN 'gloves' THEN 'Guantes'
        WHEN 'wallets' THEN 'Carteras'
        WHEN 'sunglasses' THEN 'Gafas de Sol'
        WHEN 'watches' THEN 'Relojes'
        WHEN 'jewelry' THEN 'Joyería'
        WHEN 'backpacks' THEN 'Mochilas'
        WHEN 'handbags' THEN 'Bolsos de Mano'
        WHEN 'tote-bags' THEN 'Bolsas Tote'
        WHEN 'messenger-bags' THEN 'Bolsos Mensajero'
        WHEN 'clutches' THEN 'Carteras de Mano'
        WHEN 'duffel-bags' THEN 'Bolsas Deportivas'
        WHEN 'laptop-bags' THEN 'Bolsas para Portátil'
        
        -- Home & Kitchen
        WHEN 'home-kitchen' THEN 'Hogar y Cocina'
        WHEN 'drinkware' THEN 'Vajilla para Beber'
        WHEN 'cookware' THEN 'Utensilios de Cocina'
        WHEN 'kitchen-accessories' THEN 'Accesorios de Cocina'
        WHEN 'home-decor' THEN 'Decoración del Hogar'
        WHEN 'water-bottles' THEN 'Botellas de Agua'
        WHEN 'coffee-mugs' THEN 'Tazas de Café'
        WHEN 'travel-tumblers' THEN 'Vasos Térmicos de Viaje'
        WHEN 'wine-glasses' THEN 'Copas de Vino'
        WHEN 'pots-pans' THEN 'Ollas y Sartenes'
        WHEN 'bakeware' THEN 'Utensilios de Hornear'
        WHEN 'knives' THEN 'Cuchillos'
        WHEN 'cutting-boards' THEN 'Tablas de Cortar'
        WHEN 'utensils' THEN 'Utensilios'
        WHEN 'food-storage' THEN 'Almacenamiento de Alimentos'
        
        ELSE c.name
    END as name,
    CASE c.slug
        -- Electronics descriptions
        WHEN 'electronics' THEN 'Dispositivos y accesorios electrónicos para el hogar y la oficina'
        WHEN 'computers' THEN 'Computadoras de escritorio, portátiles y accesorios informáticos'
        WHEN 'mobile-devices' THEN 'Teléfonos inteligentes, tabletas y dispositivos móviles'
        WHEN 'electronics-accessories' THEN 'Accesorios para dispositivos electrónicos'
        WHEN 'laptops' THEN 'Computadoras portátiles para trabajo, estudio y juegos'
        WHEN 'desktops' THEN 'Computadoras de escritorio para uso doméstico y profesional'
        WHEN 'computer-accessories' THEN 'Accesorios como teclados, ratones y monitores'
        WHEN 'smartphones' THEN 'Teléfonos inteligentes de última generación'
        WHEN 'smartphone-accessories' THEN 'Accesorios como fundas, protectores de pantalla y soportes'
        WHEN 'smartphone-cases' THEN 'Fundas protectoras para teléfonos inteligentes'
        WHEN 'screen-protectors' THEN 'Protectores de pantalla para dispositivos móviles'
        WHEN 'tablets' THEN 'Tabletas para entretenimiento y productividad'
        WHEN 'tablet-accessories' THEN 'Accesorios para tabletas'
        WHEN 'tablet-cases' THEN 'Fundas protectoras para tabletas'
        WHEN 'power-banks' THEN 'Baterías portátiles para cargar dispositivos móviles'
        WHEN 'chargers-cables' THEN 'Cargadores y cables para todo tipo de dispositivos'
        WHEN 'audio-headphones' THEN 'Auriculares y equipos de audio'
        WHEN 'batteries' THEN 'Baterías para dispositivos electrónicos'
        WHEN 'screen-cleaners' THEN 'Productos para limpiar pantallas electrónicas'
        WHEN 'cable-organizers' THEN 'Organizadores para gestionar cables y alambres'
        
        -- Apparel descriptions
        WHEN 'apparel' THEN 'Ropa y accesorios de moda para toda la familia'
        WHEN 'men' THEN 'Ropa y accesorios diseñados para hombres'
        WHEN 'women' THEN 'Ropa y accesorios diseñados para mujeres'
        WHEN 'kids' THEN 'Ropa y accesorios para niños de todas las edades'
        WHEN 'apparel-accessories' THEN 'Complementos y accesorios para completar tu look'
        WHEN 't-shirts' THEN 'Camisetas cómodas y elegantes para uso diario'
        WHEN 'jeans' THEN 'Jeans duraderos y modernos en varios estilos'
        WHEN 'shirts' THEN 'Camisas formales e informales para cualquier ocasión'
        WHEN 'jackets' THEN 'Chaquetas y abrigos para todas las estaciones'
        WHEN 'suits' THEN 'Trajes elegantes para ocasiones especiales y trabajo'
        WHEN 'dresses' THEN 'Vestidos para todas las ocasiones y estilos'
        WHEN 'blouses' THEN 'Blusas femeninas y versátiles'
        WHEN 'skirts' THEN 'Faldas en diferentes largos y estilos'
        WHEN 'pants' THEN 'Pantalones cómodos y modernos'
        WHEN 'boys' THEN 'Ropa y accesorios para niños'
        WHEN 'girls' THEN 'Ropa y accesorios para niñas'
        WHEN 'baby' THEN 'Ropa suave y segura para bebés'
        WHEN 'bags' THEN 'Bolsos y carteras para hombre y mujer'
        WHEN 'belts' THEN 'Cinturones de cuero y tela'
        WHEN 'hats-caps' THEN 'Sombreros y gorras para protección solar y estilo'
        WHEN 'scarves' THEN 'Bufandas y pañuelos para todas las estaciones'
        WHEN 'gloves' THEN 'Guantes para invierno y protección'
        WHEN 'wallets' THEN 'Carteras y billeteras prácticas y elegantes'
        WHEN 'sunglasses' THEN 'Gafas de sol con protección UV'
        WHEN 'watches' THEN 'Relojes elegantes y funcionales'
        WHEN 'jewelry' THEN 'Joyas y bisutería para complementar tu estilo'
        WHEN 'backpacks' THEN 'Mochilas para escuela, trabajo y viajes'
        WHEN 'handbags' THEN 'Bolsos de mano elegantes y prácticos'
        WHEN 'tote-bags' THEN 'Bolsas tote espaciosas para el día a día'
        WHEN 'messenger-bags' THEN 'Bolsos tipo mensajero casuales y funcionales'
        WHEN 'clutches' THEN 'Carteras de mano para ocasiones especiales'
        WHEN 'duffel-bags' THEN 'Bolsas deportivas para viajes y gimnasio'
        WHEN 'laptop-bags' THEN 'Bolsas diseñadas para proteger tu portátil'
        
        -- Home & Kitchen descriptions
        WHEN 'home-kitchen' THEN 'Productos para el hogar, cocina y comedor'
        WHEN 'drinkware' THEN 'Tazas, vasos y botellas para bebidas'
        WHEN 'cookware' THEN 'Utensilios y recipientes para cocinar'
        WHEN 'kitchen-accessories' THEN 'Accesorios prácticos para la cocina'
        WHEN 'home-decor' THEN 'Artículos decorativos para embellecer tu hogar'
        WHEN 'water-bottles' THEN 'Botellas reutilizables para mantenerte hidratado'
        WHEN 'coffee-mugs' THEN 'Tazas para disfrutar tu café favorito'
        WHEN 'travel-tumblers' THEN 'Vasos térmicos para mantener tus bebidas a temperatura'
        WHEN 'wine-glasses' THEN 'Copas para disfrutar del vino'
        WHEN 'pots-pans' THEN 'Ollas y sartenes para todas tus recetas'
        WHEN 'bakeware' THEN 'Moldes y bandejas para hornear'
        WHEN 'knives' THEN 'Cuchillos de cocina profesionales'
        WHEN 'cutting-boards' THEN 'Tablas de cortar duraderas y seguras'
        WHEN 'utensils' THEN 'Utensilios básicos para cocinar'
        WHEN 'food-storage' THEN 'Recipientes para conservar alimentos'
        
        ELSE NULL
    END as description
FROM categories c
CROSS JOIN languages l
WHERE l.code = 'es'
ON CONFLICT (category_id, language_id) DO UPDATE 
SET name = EXCLUDED.name, description = EXCLUDED.description;

-- ========================================
-- FRENCH TRANSLATIONS (Names & Descriptions)
-- ========================================
INSERT INTO category_translations (category_id, language_id, name, description)
SELECT 
    c.id,
    l.id,
    CASE c.slug
        -- Electronics & subcategories
        WHEN 'electronics' THEN 'Électronique'
        WHEN 'computers' THEN 'Ordinateurs'
        WHEN 'mobile-devices' THEN 'Appareils Mobiles'
        WHEN 'electronics-accessories' THEN 'Accessoires Électroniques'
        WHEN 'laptops' THEN 'Ordinateurs Portables'
        WHEN 'desktops' THEN 'Ordinateurs de Bureau'
        WHEN 'computer-accessories' THEN 'Accessoires Informatiques'
        WHEN 'smartphones' THEN 'Smartphones'
        WHEN 'smartphone-accessories' THEN 'Accessoires pour Smartphones'
        WHEN 'smartphone-cases' THEN 'Coques pour Smartphones'
        WHEN 'screen-protectors' THEN 'Protège-écrans'
        WHEN 'tablets' THEN 'Tablettes'
        WHEN 'tablet-accessories' THEN 'Accessoires pour Tablettes'
        WHEN 'tablet-cases' THEN 'Coques pour Tablettes'
        WHEN 'power-banks' THEN 'Batteries Externes'
        WHEN 'chargers-cables' THEN 'Chargeurs et Câbles'
        WHEN 'audio-headphones' THEN 'Audio et Casques'
        WHEN 'batteries' THEN 'Piles'
        WHEN 'screen-cleaners' THEN 'Nettoyants pour Écrans'
        WHEN 'cable-organizers' THEN 'Organisateurs de Câbles'
        
        -- Apparel & subcategories
        WHEN 'apparel' THEN 'Vêtements'
        WHEN 'men' THEN 'Hommes'
        WHEN 'women' THEN 'Femmes'
        WHEN 'kids' THEN 'Enfants'
        WHEN 'apparel-accessories' THEN 'Accessoires de Mode'
        WHEN 't-shirts' THEN 'T-shirts'
        WHEN 'jeans' THEN 'Jeans'
        WHEN 'shirts' THEN 'Chemises'
        WHEN 'jackets' THEN 'Vestes'
        WHEN 'suits' THEN 'Costumes'
        WHEN 'dresses' THEN 'Robes'
        WHEN 'blouses' THEN 'Blouses'
        WHEN 'skirts' THEN 'Jupes'
        WHEN 'pants' THEN 'Pantalons'
        WHEN 'boys' THEN 'Garçons'
        WHEN 'girls' THEN 'Filles'
        WHEN 'baby' THEN 'Bébés'
        WHEN 'bags' THEN 'Sacs'
        WHEN 'belts' THEN 'Ceintures'
        WHEN 'hats-caps' THEN 'Chapeaux et Casquettes'
        WHEN 'scarves' THEN 'Écharpes'
        WHEN 'gloves' THEN 'Gants'
        WHEN 'wallets' THEN 'Portefeuilles'
        WHEN 'sunglasses' THEN 'Lunettes de Soleil'
        WHEN 'watches' THEN 'Montres'
        WHEN 'jewelry' THEN 'Bijoux'
        WHEN 'backpacks' THEN 'Sacs à Dos'
        WHEN 'handbags' THEN 'Sacs à Main'
        WHEN 'tote-bags' THEN 'Sacs Tote'
        WHEN 'messenger-bags' THEN 'Sacs Messenger'
        WHEN 'clutches' THEN 'Pochettes'
        WHEN 'duffel-bags' THEN 'Sacs de Sport'
        WHEN 'laptop-bags' THEN 'Sacs pour Ordinateur Portable'
        
        -- Home & Kitchen
        WHEN 'home-kitchen' THEN 'Maison et Cuisine'
        WHEN 'drinkware' THEN 'Verres et Tasses'
        WHEN 'cookware' THEN 'Ustensiles de Cuisine'
        WHEN 'kitchen-accessories' THEN 'Accessoires de Cuisine'
        WHEN 'home-decor' THEN 'Décoration Intérieure'
        WHEN 'water-bottles' THEN 'Bouteilles d''Eau'
        WHEN 'coffee-mugs' THEN 'Tasses à Café'
        WHEN 'travel-tumblers' THEN 'Gobelets Isothermes'
        WHEN 'wine-glasses' THEN 'Verres à Vin'
        WHEN 'pots-pans' THEN 'Casseroles et Poêles'
        WHEN 'bakeware' THEN 'Plats de Cuisson'
        WHEN 'knives' THEN 'Couteaux'
        WHEN 'cutting-boards' THEN 'Planches à Découper'
        WHEN 'utensils' THEN 'Ustensiles'
        WHEN 'food-storage' THEN 'Stockage Alimentaire'
        
        ELSE c.name
    END as name,
    CASE c.slug
        -- Electronics descriptions
        WHEN 'electronics' THEN 'Appareils et accessoires électroniques pour la maison et le bureau'
        WHEN 'computers' THEN 'Ordinateurs de bureau, portables et accessoires informatiques'
        WHEN 'mobile-devices' THEN 'Smartphones, tablettes et appareils mobiles'
        WHEN 'electronics-accessories' THEN 'Accessoires pour appareils électroniques'
        WHEN 'laptops' THEN 'Ordinateurs portables pour le travail, les études et les jeux'
        WHEN 'desktops' THEN 'Ordinateurs de bureau pour usage domestique et professionnel'
        WHEN 'computer-accessories' THEN 'Accessoires tels que claviers, souris et moniteurs'
        WHEN 'smartphones' THEN 'Smartphones de dernière génération'
        WHEN 'smartphone-accessories' THEN 'Accessoires comme coques, protège-écrans et supports'
        WHEN 'smartphone-cases' THEN 'Coques de protection pour smartphones'
        WHEN 'screen-protectors' THEN 'Protecteurs d''écran pour appareils mobiles'
        WHEN 'tablets' THEN 'Tablettes pour divertissement et productivité'
        WHEN 'tablet-accessories' THEN 'Accessoires pour tablettes'
        WHEN 'tablet-cases' THEN 'Coques de protection pour tablettes'
        WHEN 'power-banks' THEN 'Batteries portables pour charger les appareils mobiles'
        WHEN 'chargers-cables' THEN 'Chargeurs et câbles pour tous types d''appareils'
        WHEN 'audio-headphones' THEN 'Casques et équipements audio'
        WHEN 'batteries' THEN 'Piles pour appareils électroniques'
        WHEN 'screen-cleaners' THEN 'Produits pour nettoyer les écrans électroniques'
        WHEN 'cable-organizers' THEN 'Organisateurs pour gérer les câbles et fils'
        
        -- Apparel descriptions
        WHEN 'apparel' THEN 'Vêtements et accessoires de mode pour toute la famille'
        WHEN 'men' THEN 'Vêtements et accessoires conçus pour hommes'
        WHEN 'women' THEN 'Vêtements et accessoires conçus pour femmes'
        WHEN 'kids' THEN 'Vêtements et accessoires pour enfants de tous âges'
        WHEN 'apparel-accessories' THEN 'Accessoires pour compléter votre look'
        WHEN 't-shirts' THEN 'T-shirts confortables et élégants pour un usage quotidien'
        WHEN 'jeans' THEN 'Jeans durables et modernes en différents styles'
        WHEN 'shirts' THEN 'Chemises formelles et décontractées pour toute occasion'
        WHEN 'jackets' THEN 'Vestes et manteaux pour toutes les saisons'
        WHEN 'suits' THEN 'Costumes élégants pour occasions spéciales et travail'
        WHEN 'dresses' THEN 'Robes pour toutes occasions et tous styles'
        WHEN 'blouses' THEN 'Blouses féminines et polyvalentes'
        WHEN 'skirts' THEN 'Jupes en différentes longueurs et styles'
        WHEN 'pants' THEN 'Pantalons confortables et modernes'
        WHEN 'boys' THEN 'Vêtements et accessoires pour garçons'
        WHEN 'girls' THEN 'Vêtements et accessoires pour filles'
        WHEN 'baby' THEN 'Vêtements doux et sûrs pour bébés'
        WHEN 'bags' THEN 'Sacs et sacs à main pour hommes et femmes'
        WHEN 'belts' THEN 'Ceintures en cuir et tissu'
        WHEN 'hats-caps' THEN 'Chapeaux et casquettes pour protection solaire et style'
        WHEN 'scarves' THEN 'Écharpes et foulards pour toutes les saisons'
        WHEN 'gloves' THEN 'Gants pour l''hiver et la protection'
        WHEN 'wallets' THEN 'Portefeuilles pratiques et élégants'
        WHEN 'sunglasses' THEN 'Lunettes de soleil avec protection UV'
        WHEN 'watches' THEN 'Montres élégantes et fonctionnelles'
        WHEN 'jewelry' THEN 'Bijoux et accessoires pour compléter votre style'
        WHEN 'backpacks' THEN 'Sacs à dos pour l''école, le travail et les voyages'
        WHEN 'handbags' THEN 'Sacs à main élégants et pratiques'
        WHEN 'tote-bags' THEN 'Sacs tote spacieux pour le quotidien'
        WHEN 'messenger-bags' THEN 'Sacs messenger décontractés et fonctionnels'
        WHEN 'clutches' THEN 'Pochettes pour occasions spéciales'
        WHEN 'duffel-bags' THEN 'Sacs de sport pour les voyages et la salle de sport'
        WHEN 'laptop-bags' THEN 'Sacs conçus pour protéger votre ordinateur portable'
        
        -- Home & Kitchen descriptions
        WHEN 'home-kitchen' THEN 'Produits pour la maison, la cuisine et la salle à manger'
        WHEN 'drinkware' THEN 'Tasses, verres et bouteilles pour boissons'
        WHEN 'cookware' THEN 'Ustensiles et récipients pour cuisiner'
        WHEN 'kitchen-accessories' THEN 'Accessoires pratiques pour la cuisine'
        WHEN 'home-decor' THEN 'Articles décoratifs pour embellir votre maison'
        WHEN 'water-bottles' THEN 'Bouteilles réutilisables pour rester hydraté'
        WHEN 'coffee-mugs' THEN 'Tasses pour déguster votre café préféré'
        WHEN 'travel-tumblers' THEN 'Gobelets isothermes pour maintenir la température des boissons'
        WHEN 'wine-glasses' THEN 'Verres pour déguster le vin'
        WHEN 'pots-pans' THEN 'Casseroles et poêles pour toutes vos recettes'
        WHEN 'bakeware' THEN 'Moules et plateaux pour la pâtisserie'
        WHEN 'knives' THEN 'Couteaux de cuisine professionnels'
        WHEN 'cutting-boards' THEN 'Planches à découper durables et sûres'
        WHEN 'utensils' THEN 'Ustensiles de base pour cuisiner'
        WHEN 'food-storage' THEN 'Récipients pour conserver les aliments'
        
        ELSE NULL
    END as description
FROM categories c
CROSS JOIN languages l
WHERE l.code = 'fr'
ON CONFLICT (category_id, language_id) DO UPDATE 
SET name = EXCLUDED.name, description = EXCLUDED.description;

-- ========================================
-- ITALIAN TRANSLATIONS (Names & Descriptions)
-- ========================================
INSERT INTO category_translations (category_id, language_id, name, description)
SELECT 
    c.id,
    l.id,
    CASE c.slug
        -- Electronics & subcategories
        WHEN 'electronics' THEN 'Elettronica'
        WHEN 'computers' THEN 'Computer'
        WHEN 'mobile-devices' THEN 'Dispositivi Mobili'
        WHEN 'electronics-accessories' THEN 'Accessori Elettronici'
        WHEN 'laptops' THEN 'Portatili'
        WHEN 'desktops' THEN 'Computer Fissi'
        WHEN 'computer-accessories' THEN 'Accessori per Computer'
        WHEN 'smartphones' THEN 'Smartphone'
        WHEN 'smartphone-accessories' THEN 'Accessori per Smartphone'
        WHEN 'smartphone-cases' THEN 'Custodie per Smartphone'
        WHEN 'screen-protectors' THEN 'Proteggi Schermo'
        WHEN 'tablets' THEN 'Tablet'
        WHEN 'tablet-accessories' THEN 'Accessori per Tablet'
        WHEN 'tablet-cases' THEN 'Custodie per Tablet'
        WHEN 'power-banks' THEN 'Power Bank'
        WHEN 'chargers-cables' THEN 'Caricabatterie e Cavi'
        WHEN 'audio-headphones' THEN 'Audio e Cuffie'
        WHEN 'batteries' THEN 'Batterie'
        WHEN 'screen-cleaners' THEN 'Detergenti per Schermi'
        WHEN 'cable-organizers' THEN 'Organizzatori di Cavi'
        
        -- Apparel & subcategories
        WHEN 'apparel' THEN 'Abbigliamento'
        WHEN 'men' THEN 'Uomo'
        WHEN 'women' THEN 'Donna'
        WHEN 'kids' THEN 'Bambini'
        WHEN 'apparel-accessories' THEN 'Accessori Abbigliamento'
        WHEN 't-shirts' THEN 'Magliette'
        WHEN 'jeans' THEN 'Jeans'
        WHEN 'shirts' THEN 'Camicie'
        WHEN 'jackets' THEN 'Giubbotti'
        WHEN 'suits' THEN 'Abiti'
        WHEN 'dresses' THEN 'Vestiti'
        WHEN 'blouses' THEN 'Bluse'
        WHEN 'skirts' THEN 'Gonne'
        WHEN 'pants' THEN 'Pantaloni'
        WHEN 'boys' THEN 'Ragazzi'
        WHEN 'girls' THEN 'Ragazze'
        WHEN 'baby' THEN 'Neonati'
        WHEN 'bags' THEN 'Borse'
        WHEN 'belts' THEN 'Cinture'
        WHEN 'hats-caps' THEN 'Cappelli e Berretti'
        WHEN 'scarves' THEN 'Sciarpe'
        WHEN 'gloves' THEN 'Guanti'
        WHEN 'wallets' THEN 'Portafogli'
        WHEN 'sunglasses' THEN 'Occhiali da Sole'
        WHEN 'watches' THEN 'Orologi'
        WHEN 'jewelry' THEN 'Gioielli'
        WHEN 'backpacks' THEN 'Zaini'
        WHEN 'handbags' THEN 'Borse a Mano'
        WHEN 'tote-bags' THEN 'Borse Tote'
        WHEN 'messenger-bags' THEN 'Borse Messenger'
        WHEN 'clutches' THEN 'Pochette'
        WHEN 'duffel-bags' THEN 'Borse Sportive'
        WHEN 'laptop-bags' THEN 'Borse per Portatile'
        
        -- Home & Kitchen
        WHEN 'home-kitchen' THEN 'Casa e Cucina'
        WHEN 'drinkware' THEN 'Bicchieri e Tazze'
        WHEN 'cookware' THEN 'Pentole e Padelle'
        WHEN 'kitchen-accessories' THEN 'Accessori da Cucina'
        WHEN 'home-decor' THEN 'Arredamento Casa'
        WHEN 'water-bottles' THEN 'Bottiglie d''Acqua'
        WHEN 'coffee-mugs' THEN 'Tazze da Caffè'
        WHEN 'travel-tumblers' THEN 'Borracce Termiche'
        WHEN 'wine-glasses' THEN 'Bicchieri da Vino'
        WHEN 'pots-pans' THEN 'Pentole e Padelle'
        WHEN 'bakeware' THEN 'Stampo da Forno'
        WHEN 'knives' THEN 'Coltelli'
        WHEN 'cutting-boards' THEN 'Taglieri'
        WHEN 'utensils' THEN 'Utensili'
        WHEN 'food-storage' THEN 'Conservazione Alimenti'
        
        ELSE c.name
    END as name,
    CASE c.slug
        -- Electronics descriptions
        WHEN 'electronics' THEN 'Dispositivi e accessori elettronici per casa e ufficio'
        WHEN 'computers' THEN 'Computer desktop, portatili e accessori informatici'
        WHEN 'mobile-devices' THEN 'Smartphone, tablet e dispositivi mobili'
        WHEN 'electronics-accessories' THEN 'Accessori per dispositivi elettronici'
        WHEN 'laptops' THEN 'Computer portatili per lavoro, studio e gioco'
        WHEN 'desktops' THEN 'Computer desktop per uso domestico e professionale'
        WHEN 'computer-accessories' THEN 'Accessori come tastiere, mouse e monitor'
        WHEN 'smartphones' THEN 'Smartphone di ultima generazione'
        WHEN 'smartphone-accessories' THEN 'Accessori come custodie, proteggi schermo e supporti'
        WHEN 'smartphone-cases' THEN 'Custodie protettive per smartphone'
        WHEN 'screen-protectors' THEN 'Proteggi schermo per dispositivi mobili'
        WHEN 'tablets' THEN 'Tablet per intrattenimento e produttività'
        WHEN 'tablet-accessories' THEN 'Accessori per tablet'
        WHEN 'tablet-cases' THEN 'Custodie protettive per tablet'
        WHEN 'power-banks' THEN 'Batterie portatili per caricare dispositivi mobili'
        WHEN 'chargers-cables' THEN 'Caricabatterie e cavi per tutti i tipi di dispositivi'
        WHEN 'audio-headphones' THEN 'Cuffie e apparecchiature audio'
        WHEN 'batteries' THEN 'Batterie per dispositivi elettronici'
        WHEN 'screen-cleaners' THEN 'Prodotti per pulire schermi elettronici'
        WHEN 'cable-organizers' THEN 'Organizzatori per gestire cavi e fili'
        
        -- Apparel descriptions
        WHEN 'apparel' THEN 'Abbigliamento e accessori di moda per tutta la famiglia'
        WHEN 'men' THEN 'Abbigliamento e accessori progettati per uomo'
        WHEN 'women' THEN 'Abbigliamento e accessori progettati per donna'
        WHEN 'kids' THEN 'Abbigliamento e accessori per bambini di tutte le età'
        WHEN 'apparel-accessories' THEN 'Complementi e accessori per completare il tuo look'
        WHEN 't-shirts' THEN 'Magliette comode ed eleganti per l''uso quotidiano'
        WHEN 'jeans' THEN 'Jeans durevoli e moderni in vari stili'
        WHEN 'shirts' THEN 'Camicie formali e informali per ogni occasione'
        WHEN 'jackets' THEN 'Giubbotti e cappotti per tutte le stagioni'
        WHEN 'suits' THEN 'Abiti eleganti per occasioni speciali e lavoro'
        WHEN 'dresses' THEN 'Vestiti per tutte le occasioni e stili'
        WHEN 'blouses' THEN 'Bluse femminili e versatili'
        WHEN 'skirts' THEN 'Gonne in diverse lunghezze e stili'
        WHEN 'pants' THEN 'Pantaloni comodi e moderni'
        WHEN 'boys' THEN 'Abbigliamento e accessori per ragazzi'
        WHEN 'girls' THEN 'Abbigliamento e accessori per ragazze'
        WHEN 'baby' THEN 'Abbigliamento morbido e sicuro per neonati'
        WHEN 'bags' THEN 'Borse e portafogli per uomo e donna'
        WHEN 'belts' THEN 'Cinture in pelle e tessuto'
        WHEN 'hats-caps' THEN 'Cappelli e berretti per protezione solare e stile'
        WHEN 'scarves' THEN 'Sciarpe e foulard per tutte le stagioni'
        WHEN 'gloves' THEN 'Guanti per inverno e protezione'
        WHEN 'wallets' THEN 'Portafogli pratici ed eleganti'
        WHEN 'sunglasses' THEN 'Occhiali da sole con protezione UV'
        WHEN 'watches' THEN 'Orologi eleganti e funzionali'
        WHEN 'jewelry' THEN 'Gioielli e bigiotteria per completare il tuo stile'
        WHEN 'backpacks' THEN 'Zaini per scuola, lavoro e viaggi'
        WHEN 'handbags' THEN 'Borse a mano eleganti e pratiche'
        WHEN 'tote-bags' THEN 'Borse tote spaziose per tutti i giorni'
        WHEN 'messenger-bags' THEN 'Borse messenger casual e funzionali'
        WHEN 'clutches' THEN 'Pochette per occasioni speciali'
        WHEN 'duffel-bags' THEN 'Borse sportive per viaggi e palestra'
        WHEN 'laptop-bags' THEN 'Borse progettate per proteggere il tuo portatile'
        
        -- Home & Kitchen descriptions
        WHEN 'home-kitchen' THEN 'Prodotti per la casa, cucina e sala da pranzo'
        WHEN 'drinkware' THEN 'Tazze, bicchieri e bottiglie per bevande'
        WHEN 'cookware' THEN 'Utensili e recipienti per cucinare'
        WHEN 'kitchen-accessories' THEN 'Accessori pratici per la cucina'
        WHEN 'home-decor' THEN 'Articoli decorativi per abbellire la tua casa'
        WHEN 'water-bottles' THEN 'Bottiglie riutilizzabili per rimanere idratato'
        WHEN 'coffee-mugs' THEN 'Tazze per gustare il tuo caffè preferito'
        WHEN 'travel-tumblers' THEN 'Borracce termiche per mantenere la temperatura delle bevande'
        WHEN 'wine-glasses' THEN 'Bicchieri per gustare il vino'
        WHEN 'pots-pans' THEN 'Pentole e padelle per tutte le tue ricette'
        WHEN 'bakeware' THEN 'Stampo e teglie per cucinare al forno'
        WHEN 'knives' THEN 'Coltelli da cucina professionali'
        WHEN 'cutting-boards' THEN 'Taglieri durevoli e sicuri'
        WHEN 'utensils' THEN 'Utensili base per cucinare'
        WHEN 'food-storage' THEN 'Contenitori per conservare gli alimenti'
        
        ELSE NULL
    END as description
FROM categories c
CROSS JOIN languages l
WHERE l.code = 'it'
ON CONFLICT (category_id, language_id) DO UPDATE 
SET name = EXCLUDED.name, description = EXCLUDED.description;

-- ========================================
-- VERIFY ALL TRANSLATIONS
-- ========================================
SELECT 
    c.slug,
    c.name as english,
    MAX(CASE WHEN l.code = 'es' THEN ct.name END) as spanish_name,
    MAX(CASE WHEN l.code = 'es' THEN ct.description END) as spanish_desc,
    MAX(CASE WHEN l.code = 'fr' THEN ct.name END) as french_name,
    MAX(CASE WHEN l.code = 'fr' THEN ct.description END) as french_desc,
    MAX(CASE WHEN l.code = 'it' THEN ct.name END) as italian_name,
    MAX(CASE WHEN l.code = 'it' THEN ct.description END) as italian_desc
FROM categories c
LEFT JOIN category_translations ct ON c.id = ct.category_id
LEFT JOIN languages l ON ct.language_id = l.id
WHERE c.slug IN (
    'electronics', 'computers', 'laptops', 'smartphones', 
    'apparel', 'men', 'women', 'kids',
    'home-kitchen', 'drinkware', 'cookware'
)
GROUP BY c.slug, c.name, c.display_order
ORDER BY c.display_order, c.name;










-- Enable RLS and add public SELECT policies for localization tables
ALTER TABLE public.languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_translations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to languages" ON public.languages;
CREATE POLICY "Allow public read access to languages" 
ON public.languages FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access to category_translations" ON public.category_translations;
CREATE POLICY "Allow public read access to category_translations" 
ON public.category_translations FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access to product_translations" ON public.product_translations;
CREATE POLICY "Allow public read access to product_translations" 
ON public.product_translations FOR SELECT USING (true);

GRANT SELECT ON public.languages TO anon, authenticated;
GRANT SELECT ON public.category_translations TO anon, authenticated;
GRANT SELECT ON public.product_translations TO anon, authenticated;
