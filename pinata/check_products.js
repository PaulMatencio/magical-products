import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase URL or Key not found in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    const { data, error } = await supabase
        .from('products')
        .select('id, name, image_url, barcode_id, metadata_url')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products:', error);
    } else {
        console.log('Fetched products (latest first):', JSON.stringify(data, null, 2));
    }
}

run();
