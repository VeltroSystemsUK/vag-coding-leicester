import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Falls back to a no-op client if env vars aren't set yet (local dev without Supabase)
export const supabase = createClient(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseAnonKey ?? 'placeholder-key'
);

// Fixed admin email — the customer sets the matching password in Supabase Auth
export const ADMIN_EMAIL = 'admin@vagcodingleicester.co.uk';

// Supabase Storage bucket name (create this in the Supabase dashboard)
export const STORAGE_BUCKET = 'vag-uploads';
