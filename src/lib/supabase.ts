import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase env vars belum diset. Lihat README untuk setup.');
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '');

export type Berita = {
  id: string;
  judul: string;
  slug: string;
  ringkasan: string;
  isi: string;
  gambar_url: string | null;
  kategori: string;
  penulis: string;
  status: 'draft' | 'published';
  views: number;
  created_at: string;
};
