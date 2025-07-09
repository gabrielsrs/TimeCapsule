import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY

export const supabase = createClient(SUPABASE_URL, PUBLIC_KEY)