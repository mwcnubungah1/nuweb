import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('ERROR: Supabase URL or Key is missing. Check your .env file.');
}

// Gunakan "as string" untuk memaksa TypeScript percaya bahwa variabel ini ada (karena kita sudah cek di atas)
export const supabase = createClient(
  supabaseUrl as string, 
  supabaseKey as string
);