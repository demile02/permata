# PERMATA

PERMATA adalah portal dokumentasi kegiatan magang MAN Kota Blitar. Situs ini bukan situs resmi madrasah. Frontend memakai React, TypeScript, Vite, dan Tailwind CSS. Berita dimuat dari `src/data/berita.json`; tidak ada database atau endpoint publik yang aktif.

Arah tampilan mengikuti catatan editorial pada versi sebelumnya: hierarki berita bergaya BBC, logo MAN yang sudah tersedia, serta aksen merah pada dasar netral. Referensi ini hanya menjelaskan tata baca, bukan afiliasi dengan BBC.

## Menjalankan situs

Perlu Node.js 20.19+ atau 22.12+.

```sh
npm install
npm run dev
```

Buka alamat lokal yang dicetak Vite, biasanya `http://localhost:5173`.

Untuk membuat hasil produksi lokal:

```sh
npm run typecheck
npm run build
npm run preview
```

Hasil build berada di `dist/`. Build membuat berkas route untuk halaman yang tersedia dan berita berstatus `published`, mengisi judul serta deskripsi tiap halaman, lalu membuat `404.html`. Dengan begitu, tautan langsung tetap bekerja dan URL yang tidak dikenal tidak perlu rewrite wildcard. Alur deploy GitHub Pages tersedia di `.github/workflows/deploy.yml`.

## Data berita JSON

Situs ini membaca seluruh konten dari `src/data/berita.json`. Tidak ada formulir pengiriman atau pengelolaan konten di halaman publik. Untuk menambah atau memperbarui berita, ubah file JSON tersebut, pastikan kategori dan slug cocok, lalu bangun dan terbitkan ulang situs.

Halaman publik hanya menampilkan berita dengan `status` bernilai `published`. Entri `draft` tetap berada dalam sumber proyek dan tidak ditampilkan sebagai berita. Sebelum mengubah status menjadi `published`, redaksi perlu memeriksa fakta, tanggal, nama penulis, izin foto, dan sumber informasi.

Struktur satu objek berita:

```json
{
  "id": "uuid-atau-id-unik",
  "judul": "Judul berita",
  "slug": "judul-berita",
  "ringkasan": "Ringkasan faktual berita.",
  "isi": "Paragraf pertama.\n\nParagraf kedua.",
  "gambar_url": "/uploads/foto-kegiatan.jpg",
  "kategori_nama": "Kegiatan",
  "kategori_slug": "kegiatan",
  "penulis": "Nama penulis",
  "status": "draft",
  "created_at": "2026-10-22T08:00:00.000Z"
}
```

Kategori yang tersedia: `Kegiatan`, `Pengumuman`, `Prestasi`, dan `Artikel`. Nilai slug harus sesuai dengan kategori pada objek. Untuk menyisipkan foto di isi berita, tambahkan satu baris seperti `![Siswa mengikuti kegiatan](/uploads/foto-kegiatan.jpg)`. Simpan foto di `public/uploads/` dan ikut sertakan file foto dalam Git. Jangan masukkan data pribadi atau kredensial ke JSON.

## Rahasia dan konfigurasi

Frontend statis ini tidak memerlukan kunci Supabase atau rahasia autentikasi. Jangan menambahkan file `.env.production` ke Git atau memasukkan rahasia ke variabel `VITE_*`, karena Vite menyertakan variabel tersebut ke bundel browser. Jika konfigurasi lingkungan diperlukan kelak, commit hanya `.env.example` yang memuat nama variabel dan nilai contoh aman.

Jika kredensial dari file lokal pernah diterbitkan ke repositori jarak jauh atau dipakai layanan lain, cabut atau rotasi kredensial itu di layanan asal. Menghapus file pada commit terbaru tidak menghapus salinan di riwayat Git.

## Struktur proyek

```text
src/App.tsx             Routing dan halaman berita
src/data/berita.json    Kategori dan data berita
src/lib/data.ts         Filter berita yang boleh ditampilkan
public/uploads/         Foto yang dipakai berita
supabase/schema.sql     Skema referensi untuk backend terpisah
.github/workflows/      Build dan deploy GitHub Pages
```

Skema Supabase adalah referensi untuk backend terpisah dan tidak dipakai aplikasi ini. Kebijakannya membatasi kiriman anonim ke draf teks tanpa foto, tetapi belum menyediakan pembatasan spam. Tambahkan kontrol penyalahgunaan di server sebelum memakai skema itu untuk kiriman publik. Kebijakan unggah anonim tidak disediakan.
