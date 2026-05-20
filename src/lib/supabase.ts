import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://scbwnojxtgbqztejuqnk.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_fxw9DS7KduS8PZAsEGDGiw_dlsH2IiU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
