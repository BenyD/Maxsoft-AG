import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client
export const createClientComponentClient = () => {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Server-side Supabase client (for server components)
export const createServerComponentClient = () => {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Admin client for server-side operations (use with caution)
export const createAdminClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  return createBrowserClient(supabaseUrl, serviceRoleKey)
}
