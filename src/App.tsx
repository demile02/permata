import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { beritaByKategori, beritaPublished, beritaTerkait, cariBerita, semuaKategori } from './lib/data';
import type { Berita } from './lib/data';

const date = (value: string, options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }) =>
  new Date(value).toLocaleDateString('id-ID', options);

function Layout({ children, title = 'Permata', description = 'Portal Berita Magang MAN Kota Blitar 2026' }: { children: ReactNode; title?: string; description?: string }) {
  const location = useLocation();
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }, [title, description]);
  const links = [
    { to: '/', label: 'Beranda' },
    ...semuaKategori.map((kategori) => ({ to: `/kategori/${kategori.slug}`, label: kategori.nama })),
    { to: '/tentang', label: 'Tentang' },
  ];
  return <div className="site-shell">
    <a href="#konten" className="skip-link">Lewati ke konten</a>
    <header className="site-header">
      <div className="edition-bar"><span>Portal kabar dan gagasan siswa</span><span>MAN Kota Blitar <b>·</b> 2026</span></div>
      <div className="masthead">
        <Link to="/" className="brand-lockup"><img src="/logo-man.png" alt="" className="brand-logo" /><span className="brand-copy"><strong>PERMATA</strong><small>Berita Magang MAN Kota Blitar</small></span></Link>
        <div className="masthead-note">Ruang cerita, karya, dan kabar sekolah</div>
      </div>
      <nav aria-label="Navigasi utama" className="main-nav"><div className="nav-scroll">
        {links.map((item) => <Link key={item.to} to={item.to} aria-current={location.pathname === item.to ? 'page' : undefined} className={`nav-link ${location.pathname === item.to ? 'is-active' : ''}`}>{item.label}</Link>)}
      </div></nav>
    </header>
    <main id="konten" tabIndex={-1} className="page-content">{children}</main>
    <footer className="site-footer"><div className="footer-inner"><div className="footer-brand"><strong>PERMATA</strong><span>Portal Berita Magang MAN Kota Blitar</span><p>Catatan kegiatan, prestasi, pengumuman, dan gagasan dari lingkungan sekolah.</p></div><nav aria-label="Navigasi kaki halaman" className="footer-links">{semuaKategori.map((k) => <Link key={k.slug} to={`/kategori/${k.slug}`}>{k.nama}</Link>)}<Link to="/tentang">Tentang Permata</Link></nav></div><div className="footer-bottom"><span>© 2026 Permata</span><span>Media dokumentasi magang · Bukan situs resmi MAN Kota Blitar</span></div></footer>
  </div>;
}

function NewsCard({ berita, featured = false }: { berita: Berita; featured?: boolean }) {
  const focus = 'focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-red-700';
  if (featured) return <Link to={`/berita/${berita.slug}`} className={`group block relative overflow-hidden bg-neutral-900 text-white ${focus}`}>
    {berita.gambar_url ? <img src={berita.gambar_url} alt="" className="w-full h-80 sm:h-96 object-cover opacity-70 group-hover:opacity-60 transition" /> : <div className="w-full h-80 sm:h-96 bg-neutral-800" />}
    <div className="absolute bottom-0 p-6 bg-gradient-to-t from-black/95 to-black/75 w-full"><span className="inline-block bg-red-700 text-xs font-semibold px-2 py-1 mb-2">{berita.kategori_nama}</span><h2 className="text-2xl sm:text-3xl font-extrabold leading-tight group-hover:underline">{berita.judul}</h2><p className="text-sm text-neutral-200 mt-2 line-clamp-2">{berita.ringkasan}</p><p className="text-sm text-neutral-200 mt-2">{berita.penulis} · {date(berita.created_at)}</p></div>
  </Link>;
  return <Link to={`/berita/${berita.slug}`} className={`group block bg-white overflow-hidden border hover:shadow-lg transition ${focus}`}>
    {berita.gambar_url ? <img src={berita.gambar_url} alt="" className="w-full h-44 object-cover group-hover:scale-[1.02] transition" loading="lazy" /> : <div aria-hidden="true" className="w-full h-44 bg-neutral-200" />}
    <div className="p-4"><span className="inline-block text-red-800 text-xs font-bold uppercase tracking-wide mb-1">{berita.kategori_nama}</span><h3 className="font-bold leading-snug group-hover:text-red-800 group-hover:underline line-clamp-2">{berita.judul}</h3><p className="text-sm text-neutral-700 mt-1 line-clamp-2">{berita.ringkasan}</p><p className="text-sm text-neutral-600 mt-2">{berita.penulis} · {date(berita.created_at)}</p></div>
  </Link>;
}

function BerandaList({ list, kategoriAktif = null }: { list: Berita[]; kategoriAktif?: string | null }) {
  const featured = list[0];
  const rest = list.slice(1);
  if (list.length === 0) return <section className="border-y-2 border-neutral-300 py-10"><h2 className="text-2xl font-bold mb-2">Belum ada berita untuk ditampilkan</h2></section>;
  return <>
    {featured && <NewsCard berita={featured} featured />}
    <div className="mt-8 grid lg:grid-cols-3 gap-8"><div className="lg:col-span-2"><h2 className="text-xl font-extrabold mb-4">{kategoriAktif ? `Berita ${kategoriAktif}` : 'Berita Terbaru'}</h2>
      {rest.length > 0 && <div className="grid sm:grid-cols-2 gap-5">{rest.map((b) => <NewsCard key={b.id} berita={b} />)}</div>}
    </div>
    </div>
  </>;
}

function Home() { return <Layout title="Beranda - Permata"><div className="page-kicker"><span>Jurnal sekolah</span><span>Arsip magang / 2026</span></div><section className="home-intro"><div><p className="eyebrow">Cerita dari MAN Kota Blitar</p><h1>Ruang untuk kabar<br /><em>dan cerita bermakna.</em></h1></div><p className="intro-copy">Permata merangkum kegiatan, pencapaian, dan gagasan selama program magang 2026.</p></section><BerandaList list={beritaPublished} /></Layout>; }
function Category() {
  const { kategori = '' } = useParams();
  const selected = semuaKategori.find((item) => item.slug === kategori);
  if (!selected) return <NotFound />;
  return <Layout title={`${selected.nama} - Permata`}><div className="page-kicker"><span>Jelajahi topik</span><span>Permata / {selected.nama}</span></div><section className="section-heading"><p className="eyebrow">Arsip kategori</p><h1>{selected.nama}</h1><p>Catatan dan kabar pilihan dari program magang MAN Kota Blitar.</p></section><BerandaList list={beritaByKategori(kategori)} kategoriAktif={selected.nama} /></Layout>;
}

function About() { return <Layout title="Tentang - Permata"><div className="editorial-page"><div className="page-kicker"><span>Permata</span><span>MAN Kota Blitar / 2026</span></div><section className="about-hero"><div><p className="eyebrow">Jurnal sekolah</p><h1>Cerita dari<br /><em>MAN Kota Blitar.</em></h1></div><p className="about-deck">Arsip kegiatan, pengumuman, prestasi, dan gagasan dari program magang 2026.</p></section><div className="about-grid"><div className="about-main prose-berita"><p className="about-lead">PERMATA mencatat program magang MAN Kota Blitar sepanjang 2026.</p></div><aside className="editorial-aside"><p className="disclaimer">PERMATA adalah media dokumentasi program magang, bukan situs resmi MAN Kota Blitar.</p></aside></div></div></Layout>; }

function Article() {
  const { slug = '' } = useParams();
  const b = cariBerita(slug);
  if (!b) return <NotFound />;
  const related = beritaTerkait(b.id);
  return <Layout title={`${b.judul} - Permata`} description={b.ringkasan}><article className="max-w-3xl mx-auto"><Link to="/" className="inline-flex min-h-11 items-center text-sm text-red-800 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800">Kembali ke Beranda</Link><div className="mt-3"><span className="inline-block bg-red-800 text-white text-xs font-semibold px-2 py-1">{b.kategori_nama}</span><h1 className="article-headline mt-2">{b.judul}</h1><p className="text-sm text-neutral-700 mt-2">Oleh <span className="font-medium">{b.penulis}</span> · {date(b.created_at, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p></div>{b.gambar_url && <img src={b.gambar_url} alt={b.judul} className="w-full mt-6 object-cover max-h-96" />}<div className="prose-berita article-body mt-6"><p className="article-deck">{b.ringkasan}</p>{b.isi.split('\n').map((line, i) => { const t = line.trim(); if (!t) return null; const match = t.match(/^!\[(.*?)\]\((.*?)\)$/); return match ? <figure className="my-6" key={i}><img src={match[2]} alt={match[1]} className="w-full object-cover" loading="lazy" />{match[1] && <figcaption className="text-sm text-neutral-700 text-center mt-2">{match[1]}</figcaption>}</figure> : <p key={i}>{t}</p>; })}</div></article>{related.length > 0 && <div className="max-w-3xl mx-auto mt-12"><h2 className="text-xl font-extrabold mb-4">Berita Terkait</h2><div className="grid sm:grid-cols-3 gap-4">{related.map((r) => <Link key={r.id} to={`/berita/${r.slug}`} className="block border hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800"><div className="p-3"><h3 className="text-sm font-bold line-clamp-2">{r.judul}</h3></div></Link>)}</div></div>}</Layout>;
}
function NotFound() { return <Layout title="404 - Permata"><div className="text-center py-20"><h1 className="text-6xl font-extrabold">404</h1><p className="text-lg text-neutral-700 mt-2">Halaman tidak ditemukan.</p><Link to="/" className="inline-flex min-h-11 items-center mt-4 bg-red-800 text-white px-5 font-semibold hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800">Kembali ke Beranda</Link></div></Layout>; }

export default function App() { return <Routes><Route path="/" element={<Home />} /><Route path="/kategori/:kategori" element={<Category />} /><Route path="/berita/:slug" element={<Article />} /><Route path="/tentang" element={<About />} /><Route path="*" element={<NotFound />} /></Routes>; }
