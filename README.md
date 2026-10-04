# 📰 BeritaMagang — Portal Berita Kegiatan Magang

Web berita ringan untuk laporan kegiatan magang. Dibangun dengan **Astro** + **Tailwind CSS** + **Supabase** + **Vercel**.

## Fitur
- 🏠 Beranda dengan berita featured + grid terbaru (gaya BBC)
- 🔥 Sidebar **Terpopuler** bernomor (otomatis dari jumlah views)
- 📰 Halaman detail artikel + berita terkait
- ✏️ Form publik untuk kirim berita (dengan upload foto)
- 🏷️ Filter kategori: Kegiatan, Pengumuman, Prestasi, Artikel
- 📱 Responsif (mobile & desktop)

## 1. Setup Supabase

1. Buat project gratis di [supabase.com](https://supabase.com) → dapatkan **Project URL** dan **anon key**.
2. Buka **SQL Editor** → jalankan isi file `supabase/schema.sql`.
3. Buat bucket storage bernama `berita`:
   - Storage → New bucket → nama: `berita` → centang **Public**
   - Jalankan policy storage di bagian bawah `schema.sql` (atau via Storage → Policies).
4. Copy `.env.example` ke `.env`, isi URL & anon key.

## 2. Jalankan Lokal

```bash
npm install
npm run dev
# buka http://localhost:4321
```

## 3. Deploy ke Vercel

1. Push project ini ke GitHub.
2. Di [vercel.com](https://vercel.com) → Import project → pilih repo.
3. Tambahkan Environment Variables:
   - `PUBLIC_SUPABASE_URL`
   - `PUBLIC_SUPABASE_ANON_KEY`
4. Deploy. Selesai!

## 4. Routing ke DNS Sekolah

Setelah deploy, di dashboard Vercel → project → **Settings → Domains** → tambahkan domain sekolah
(misal `berita.sekolah.sch.id`). Vercel akan memberi record DNS (A/CNAME) untuk
dipasang di DNS sekolah. Tunggu propagasi 5–60 menit.

## 5. Moderasi Berita

Berita dari form masuk sebagai `draft`. Untuk mempublish, buka Supabase →
Table Editor → tabel `berita` → ubah `status` jadi `published`.

## Struktur
```
src/
  pages/
    index.astro          → beranda
    berita/[slug].astro   → detail artikel
    kirim.astro          → form submit berita
    tentang.astro        → tentang
  components/NewsCard.astro
  layouts/Layout.astro
  lib/supabase.ts
supabase/schema.sql      → skema database
```
