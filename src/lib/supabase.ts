import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. App may not function correctly.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Role = 'SUPER_ADMIN' | 'WAREHOUSE_MANAGER' | 'EMPLOYEE' | 'VIEWER';

export interface UserProfile {
  id: string;
  name: string;
  role: Role;
  warehouse_id?: string;
  email: string;
}
