-- Skema database untuk Web Berita Magang
-- Jalankan di Supabase SQL Editor

-- Tabel kategori
create table if not exists kategori (
  id uuid primary key default gen_random_uuid(),
  nama text not null unique,
  slug text not null unique,
  created_at timestamptz default now()
);

-- Tabel berita
create table if not exists berita (
  id uuid primary key default gen_random_uuid(),
  judul text not null,
  slug text not null unique,
  ringkasan text not null,
  isi text not null,
  gambar_url text,
  kategori_id uuid references kategori(id) on delete set null,
  penulis text not null default 'Redaksi',
  status text not null default 'draft' check (status in ('draft', 'published')),
  views integer not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index untuk performa
create index if not exists idx_berita_status on berita(status);
create index if not exists idx_berita_slug on berita(slug);
create index if not exists idx_berita_created on berita(created_at desc);

-- Kategori awal
insert into kategori (nama, slug) values
  ('Kegiatan', 'kegiatan'),
  ('Pengumuman', 'pengumuman'),
  ('Prestasi', 'prestasi'),
  ('Artikel', 'artikel')
on conflict (slug) do nothing;

-- Row Level Security: publik bisa baca yang published, semua bisa insert (untuk form submit)
alter table berita enable row level security;
alter table kategori enable row level security;

create policy "Publik baca berita published"
  on berita for select using (status = 'published');

create policy "Siapa saja bisa submit berita"
  on berita for insert with check (true);

create policy "Publik baca kategori"
  on kategori for select using (true);

-- Storage untuk gambar berita (buat bucket 'berita' di dashboard Supabase, set public)
-- Policy storage (jalankan setelah buat bucket):
-- create policy "Publik baca gambar" on storage.objects for select using (bucket_id = 'berita');
-- create policy "Siapa saja upload gambar" on storage.objects for insert with check (bucket_id = 'berita');
