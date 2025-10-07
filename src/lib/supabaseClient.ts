import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../../database/types.ts'
const { VITE_SUPABASE_BASE_URL, VITE_SUPABASE_APIKEY } = import.meta.env
// Create a single supabase client for interacting with your database
export const supabaseClient: SupabaseClient = createClient<Database>(
  VITE_SUPABASE_BASE_URL,
  VITE_SUPABASE_APIKEY,
)
