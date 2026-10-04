-- Skema lokal (PostgreSQL biasa, tanpa RLS Supabase)
-- Untuk dev lokal via PostgREST

create table if not exists kategori (
  id uuid primary key default gen_random_uuid(),
  nama text not null unique,
  slug text not null unique,
  created_at timestamptz default now()
);

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

create index if not exists idx_berita_status on berita(status);
create index if not exists idx_berita_slug on berita(slug);
create index if not exists idx_berita_created on berita(created_at desc);

insert into kategori (nama, slug) values
  ('Kegiatan', 'kegiatan'),
  ('Pengumuman', 'pengumuman'),
  ('Prestasi', 'prestasi'),
  ('Artikel', 'artikel')
on conflict (slug) do nothing;

-- Data contoh untuk testing lokal
insert into berita (judul, slug, ringkasan, isi, kategori_id, penulis, status, views) values
  ('Kunjungan Industri ke PT Maju Bersama', 'kunjungan-industri-pt-maju-bersama', 'Siswa magang mengunjungi PT Maju Bersama untuk mempelajari proses produksi modern.', 'Pada hari Senin, rombongan siswa magang melakukan kunjungan industri ke PT Maju Bersama.\n\nKegiatan diawali dengan sambutan dari HRD perusahaan, dilanjutkan dengan tur ke area produksi. Siswa diperkenalkan pada mesin-mesin modern dan standar keselamatan kerja.\n\n"Pengalaman yang sangat berharga," ujar salah satu peserta magang.', (select id from kategori where slug='kegiatan'), 'Redaksi', 'published', 42),
  ('Pengumuman Jadwal Magang Semester Genap', 'pengumuman-jadwal-magang-semester-genap', 'Jadwal magang semester genap telah dirilis. Simak tanggal pentingnya.', 'Diumumkan bahwa jadwal magang semester genap akan dimulai pada awal Februari.\n\nSiswa diminta untuk melengkapi berkas administrasi sebelum tanggal yang ditentukan.', (select id from kategori where slug='pengumuman'), 'Admin', 'published', 28),
  ('Siswa Magang Raih Juara Lomba Karya Tulis', 'siswa-magang-raih-juara-lomba-karya-tulis', 'Prestasi membanggakan dari tim magang di lomba karya tulis tingkat kota.', 'Tim magang berhasil meraih juara 1 lomba karya tulis tingkat kota dengan tema inovasi industri.\n\nSelamat kepada para pemenang!', (select id from kategori where slug='prestasi'), 'Redaksi', 'published', 15)
on conflict (slug) do nothing;
