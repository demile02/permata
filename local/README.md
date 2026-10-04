# Cara pakai database lokal (bukan Supabase)

## 1. Install & setup PostgreSQL (sekali saja)
```bash
sudo apt install postgresql postgresql-contrib
bash local/setup-postgres.sh
```

## 2. Jalankan PostgREST (API-nya Supabase)
```bash
cd local && ./postgrest postgrest.conf
# API jalan di http://localhost:3001
```

## 3. Set env untuk mode lokal
Buat file `.env`:
```
PUBLIC_SUPABASE_URL=http://localhost:3001
PUBLIC_SUPABASE_ANON_KEY=dummy-local-key
PUBLIC_LOCAL_UPLOAD=true
```

## 4. Jalankan Astro
```bash
npm run dev
```

## Catatan
- Upload gambar di mode lokal disimpan ke `public/uploads/` (via `/api/upload`)
- Data contoh sudah termasuk 3 berita published untuk testing
- Untuk kembali ke Supabase asli, ganti `.env` dengan URL & key Supabase
