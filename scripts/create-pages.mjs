import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const dist = resolve('dist');
const shell = await readFile(resolve(dist, 'index.html'), 'utf8');
const content = JSON.parse(await readFile(resolve('src/data/berita.json'), 'utf8'));

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function pageShell(title, description) {
  return shell
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeHtml(description)}" />`);
}

const pages = [
  { path: '', title: 'Beranda - Permata', description: 'Berita kegiatan magang MAN Kota Blitar.' },
  { path: 'tentang', title: 'Tentang - Permata', description: 'Informasi tentang portal Permata.' },
  ...content.kategori.map((item) => {
    if (!/^[a-z0-9-]+$/.test(item.slug)) throw new Error(`Slug kategori tidak aman untuk path: ${item.slug}`);
    return {
      path: `kategori/${item.slug}`,
      title: `${item.nama} - Permata`,
      description: `Berita kategori ${item.nama} di Permata.`,
    };
  }),
  ...content.berita
    .filter((item) => item.status === 'published')
    .map((item) => {
      if (!/^[a-z0-9-]+$/.test(item.slug)) throw new Error(`Slug berita tidak aman untuk path: ${item.id}`);
      return { path: `berita/${item.slug}`, title: `${item.judul} - Permata`, description: item.ringkasan };
    }),
];

const writtenPaths = new Set();
for (const page of pages) {
  if (writtenPaths.has(page.path)) throw new Error(`Path halaman duplikat: ${page.path || '/'}`);
  writtenPaths.add(page.path);
  const output = resolve(dist, page.path, 'index.html');
  if (!output.startsWith(`${dist}/`) && output !== resolve(dist, 'index.html')) {
    throw new Error(`Path halaman keluar dari direktori build: ${page.path}`);
  }
  await mkdir(resolve(output, '..'), { recursive: true });
  await writeFile(output, pageShell(page.title, page.description));
}

await writeFile(resolve(dist, '404.html'), pageShell('404 - Permata', 'Halaman tidak ditemukan.'));
