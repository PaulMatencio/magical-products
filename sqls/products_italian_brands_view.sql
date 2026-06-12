-- Create a view for brand details with product counts
CREATE VIEW brand_details AS
SELECT 
    b.*,
    COUNT(p.id) as product_count,
    COUNT(CASE WHEN p.is_active THEN 1 END) as active_products
FROM brands b
LEFT JOIN products p ON p.brand_id = b.id
GROUP BY b.id;

-- Usage
SELECT * FROM brand_details WHERE slug = 'barilla';