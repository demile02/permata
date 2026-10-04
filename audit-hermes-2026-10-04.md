# Audit Website Astro (berita-magang) — 2026-10-04

Ruang lingkup: read-only. Tidak ada kode yang diubah.
File yang diaudit: `src/lib/auth.ts`, `src/lib/supabase.ts`, `src/pages/api/*.ts`,
`src/pages/*.astro`, `src/pages/berita/[slug].astro`, `src/layouts/Layout.astro`,
`src/components/NewsCard.astro`, `supabase/schema.sql`, `local/schema.local.sql`,
`astro.config.mjs`, `vercel.json`, `public/uploads/`.

Ringkasan: 6 HIGH, 7 MEDIUM, 9 LOW. Masalah terberat ada di auth (cookie tempa),
upload tanpa auth/validasi tipe, dan RLS Supabase yang membolehkan publik
publish langsung.

## Temuan KEAMANAN

1. [HIGH] Auth cookie bisa ditempa siapa saja — `src/lib/auth.ts:31-39`.
   `isLoggedIn()` hanya mengecek string `permata_admin=1` di header Cookie.
   Tidak ada signature/HMAC/session server-side. Siapa pun bisa lolos gate
   `/kirim` (dan terlihat "login" di Layout) hanya dengan set cookie manual.
   Rekomendasi: session token acak di DB/server + cookie `Secure; HttpOnly;
   SameSite=Lax` (atau pakai Supabase Auth).

2. [HIGH] Endpoint upload tanpa autentikasi — `src/pages/api/upload.ts:5-9`.
   Satu-satunya gate adalah flag env `PUBLIC_LOCAL_UPLOAD`, tidak ada cek
   login sama sekali. Jika flag `true` di production, publik anonim bisa
   upload file. Rekomendasi: wajibkan session valid + batasi hanya admin.

3. [HIGH] Upload tanpa validasi tipe file → stored XSS — `src/pages/api/upload.ts:23-29`.
   Ekstensi diambil mentah dari nama file (`file.name.split('.').pop()`),
   tanpa allowlist (jpg/png/webp), tanpa cek MIME/magic bytes. Penyerang bisa
   upload `x.svg` berisi `<script>` atau `x.html` ke `public/uploads/` yang
   diserve statis — script dieksekusi dalam origin situs saat URL dibuka
   langsung. Bukti pendukung: sudah ada file `.json` asing di
   `public/uploads/`. Rekomendasi: allowlist ekstensi+MIME, verifikasi magic
   bytes, simpan di luar web root atau serve dengan `Content-Disposition:
   attachment` / `Content-Type` ketat.

4. [HIGH] RLS membolehkan anonim publish langsung, moderasi bisa di-bypass —
   `supabase/schema.sql:48-49`. Policy `berita for insert with check (true)`
   tanpa memaksa `status='draft'`. Siapa pun dengan anon key bisa insert
   `status='published'` langsung via API Supabase, melewati alur redaksi.
   Rekomendasi: `with check (status = 'draft')`, publish hanya via service
   role / akun redaksi.

5. [HIGH] Storage bucket terbuka untuk publik tulis — `supabase/schema.sql:56-57`.
   Policy yang disarankan (`insert with check (bucket_id='berita')` untuk
   siapa saja) memungkinkan siapa pun mengisi bucket (abuse/porn/malware,
   tagihan storage). Rekomendasi: upload via signed URL / server-side dengan
   akun terautentikasi, baca publik saja.

6. [HIGH] Tabel `users` tidak ada di skema — `supabase/schema.sql`,
   `local/schema.local.sql`, vs `src/lib/auth.ts:21-29` (`checkLogin`
   query tabel `users`). Login tidak bisa berfungsi kecuali tabel dibuat
   manual (prosedur tidak terdokumentasi di README). Jika seseorang
   membuatnya tanpa RLS yang benar, hash password bisa terbaca publik via
   anon key. Rekomendasi: tambahkan definisi tabel + policy ke schema.sql
   (select hanya via service role, tidak ada akses anon).

7. [MEDIUM] Tidak ada rate limit / lockout di login — `src/pages/api/login.ts`.
   Brute-force password tidak dibatasi (ditambah `scryptSync` sinkron per
   percobaan membebani event loop → amplifikasi DoS). Rekomendasi: rate limit
   per IP/akun, backoff/lockout, captcha.

8. [MEDIUM] Cookie login tanpa flag `Secure` — `src/lib/auth.ts:36-43`.
   Cookie bisa terkirim via HTTP polos (sniffing), tanpa prefix `__Host-`.
   Rekomendasi: tambah `Secure` (dan `__Host-` bila memungkinkan).

9. [MEDIUM] Parsing cookie longgar — `src/lib/auth.ts:33`.
   `startsWith('permata_admin=1')` juga menerima `permata_admin=1evil` /
   `=10`. Rekomendasi: parse nilai cookie secara eksak (`=1` penuh + batas).

10. [MEDIUM] Salt password dari `Math.random()+Date.now()` —
    `src/lib/auth.ts:6-10`. Bukan CSPRNG, entropi rendah dan tertebak.
    Rekomendasi: `crypto.randomBytes(16)`.

11. [MEDIUM] Tidak ada security headers — `vercel.json`, `src/layouts/Layout.astro`.
    Tanpa CSP, `X-Frame-Options`/`frame-ancestors`, HSTS, `X-Content-Type-Options`.
    Situs rentan clickjacking dan mempermudah eksploitasi XSS (temuan #3).
    Rekomendasi: set header di `vercel.json` + CSP ketat.

12. [MEDIUM] Error 500 membocorkan pesan internal — `src/pages/api/upload.ts:35-37`
    (`error: e.message`). Rekomendasi: log di server, kembalikan pesan generik.

13. [LOW] Logout GET rentan CSRF (logout paksa) — `src/pages/api/logout.ts:4-9`
    dan link `<a href="/api/logout">` di `Layout.astro:41`. Dampak kecil.
    Rekomendasi: logout hanya via POST.

## Temuan BUG / FUNGSIONAL

14. [HIGH] Counter views tidak bekerja (mode Supabase) — `src/pages/berita/[slug].astro:18`.
    Update `views` memakai anon key, tapi `schema.sql` tidak punya policy
    UPDATE → RLS menolak, error diabaikan (`await` tanpa cek). Akibatnya
    angka dibaca selalu nilai basi (+1 hanya di tampilan sesaat).
    Rekomendasi: RPC `increment_views` dengan `security definer`, atau
    Edge Function; jangan update langsung dari anon key.

15. [MEDIUM] Slug tidak ketemu me-redirect ke `/404` (302), bukan status 404 —
    `src/pages/berita/[slug].astro:13-15`. Buruk untuk SEO dan cache.
    Rekomendasi: `throw new Response('Not found', { status: 404 })` /
    `Astro.redirect('/404', 404)`.

16. [MEDIUM] Filter kategori tak dikenal diam-diam menampilkan semua berita —
    `src/pages/index.astro:14-17`. `?kategori=xyz` (typo) → judul halaman
    "Kategori: xyz" tapi isi = semua berita. Rekomendasi: tampilkan 404/pesan
    "kategori tidak ditemukan" bila `kat` null.

17. [MEDIUM] Form kirim tanpa validasi server-side — `src/pages/kirim.astro:127-136`.
    Hanya mengandalkan atribut HTML (`required`, `maxlength`) yang mudah
    di-bypass; `judul`/isi kosong atau raksasa, `kategori_id` asal, dan
    `gambar_url` arbitrary bisa di-insert langsung (diperparah policy
    terbuka temuan #4). Rekomendasi: validasi + sanitasi di server sebelum
    insert (trim, panjang min/maks, `kategori_id` harus ada di tabel).

18. [LOW] Nav tidak konsisten dengan README — `src/layouts/Layout.astro:50-54`.
    README menjanjikan filter Kegiatan, Pengumuman, Prestasi, Artikel; nav
    hanya punya Kegiatan, Prestasi, Tentang. Rekomendasi: samakan keduanya.

19. [LOW] Banner "Supabase belum terhubung" muncul juga saat DB kosong —
    `src/pages/index.astro:34-43`. Kondisi `berita.length === 0` disamakan
    dengan "belum diset", menyesatkan admin yang DB-nya memang kosong.
    Rekomendasi: bedakan (cek koneksi/env, bukan jumlah data).

20. [LOW] Tidak ada favicon, `robots.txt`, sitemap — `public/`, `src/layouts/Layout.astro`.
    Tiap kunjungan memicu 404 favicon; crawler tak dipandu.
    Rekomendasi: tambah `public/favicon.svg` + `<link rel="icon">`,
    `robots.txt`, sitemap.

21. [LOW] Kolisi nama file upload — `src/pages/api/upload.ts:24`
    (`Date.now()` resolusi ms). Dua upload bersamaan bisa saling timpa.
    Rekomendasi: tambah `crypto.randomUUID()`.

22. [LOW] Race condition increment views — `src/pages/berita/[slug].astro:18`
    (pola read-modify-write). Hitungan hilang saat traffic bersamaan.
    Rekomendasi: increment atomik di DB (terkait temuan #14).

## Hasil pengecekan yang NEGATIF (tidak ditemukan masalah)

- Tidak ada `set:html` / `innerHTML` di `src/`; body artikel (`[slug].astro:46-60`)
  dan caption dirender sebagai text node → Astro meng-escape otomatis.
  XSS via isi berita relatif aman selama tidak ada render HTML mentah.
- `alt`/`figcaption` gambar markdown juga lewat escaping Astro.
- Copy markdown gambar ekstra memakai `textContent`, bukan `innerHTML`
  (`kirim.astro:186-196`) — aman.
- Pesan error login generik ("Username atau password salah") — tidak
  membedakan user ada/tidak (bagus, abaikan beda timing kecil).
- `salt:hash` tidak mengandung `:` (base36) sehingga `split(':')` aman.
- Skema lokal (`local/schema.local.sql`) memang tanpa RLS — wajar untuk
  PostgREST dev lokal, tapi jangan dipakai untuk production.
- File `astro.config.mjs.bak` berisi `base: '/berita'` usang — pastikan tidak
  terpakai; hapus agar tidak membingungkan deploy.
