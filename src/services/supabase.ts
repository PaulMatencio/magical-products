import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase Lib: Initialization check');
console.log('Supabase Lib: URL found?', !!supabaseUrl);
console.log('Supabase Lib: Key found?', !!supabaseAnonKey);

if (!supabaseUrl) {
  console.error('Supabase Error: VITE_SUPABASE_URL is missing!');
}
if (!supabaseAnonKey) {
  console.error('Supabase Error: VITE_SUPABASE_PUBLISHABLE_KEY or VITE_SUPABASE_ANON_KEY is missing!');
} else if (!supabaseAnonKey.startsWith('eyJ')) {
  console.warn('Supabase Warning: The provided key does not look like a standard Supabase "Anon Key" (which usually starts with "eyJ"). A 401 error is likely if this is a platform publishable key instead of the API anon key.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
