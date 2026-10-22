import data from '../data/berita.json';

export type Berita = {
  id: string;
  judul: string;
  slug: string;
  ringkasan: string;
  isi: string;
  gambar_url: string | null;
  kategori_nama: string;
  kategori_slug: string;
  penulis: string;
  status: 'draft' | 'published';
  created_at: string;
};

export type Kategori = {
  nama: string;
  slug: string;
};

export const semuaKategori = data.kategori as Kategori[];

// Draf tetap tersimpan di JSON, tetapi hanya berita berstatus published yang ditampilkan.
const semua = data.berita as Berita[];

export const beritaPublished: Berita[] = semua
  .filter((b) => b.status === 'published')
  .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));

export function beritaByKategori(slug: string): Berita[] {
  return beritaPublished.filter((b) => b.kategori_slug === slug);
}

export function cariBerita(slug: string): Berita | undefined {
  return beritaPublished.find((b) => b.slug === slug);
}

export function beritaTerkait(id: string, jumlah = 3): Berita[] {
  return beritaPublished.filter((b) => b.id !== id).slice(0, jumlah);
}
