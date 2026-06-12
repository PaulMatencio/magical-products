-- validation shipping address  or payment_method for Orders Table
ALTER TABLE orders ADD CONSTRAINT valid_payment_method 
  CHECK (payment_method IN ('Credit Card', 'MetaMask', 'Coinbase', 'Trust Wallet', 'Phantom', 'Lace'));


 ALTER TABLE public.orders
ADD CONSTRAINT valid_shipping_address
CHECK (
  shipping_address IS NOT NULL
  AND TRIM(shipping_address) <> ''
);   
  
  