import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { d as renderTemplate, f as maybeRenderHead, i as renderComponent } from "./server_Rc8_5O2w.mjs";
import { t as createComponent } from "./compiler_COKNl-CR.mjs";
import { t as $$Layout } from "./Layout_BWCgrPjx.mjs";
//#region src/pages/tentang.astro
var tentang_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Tentang,
	file: () => $$file,
	url: () => $$url
});
var $$Tentang = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Tentang - Permata" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="max-w-2xl mx-auto"><h1 class="text-3xl font-extrabold mb-4">Tentang Permata</h1><div class="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded"><p class="text-sm text-amber-900"><strong>Perhatian:</strong> Situs ini <strong>bukan situs resmi MAN Kota Blitar</strong>. PERMATA adalah situs yang dibuat dan dikelola oleh <strong>mahasiswa magang</strong>sebagai media dokumentasi kegiatan magang tahun 2026.</p></div><div class="prose-berita"><p><strong>PERMATA</strong> (Portal Berita Magang MAN Kota Blitar 2026) adalah portal berita tentang MAN Kota Blitar, mulai dari kegiatan sekolah, prestasi siswa, hingga berbagai kabar terkini dari lingkungan madrasah.</p><p>Situs ini dibuat dan dikelola oleh <strong>mahasiswa magang</strong> sebagai bagian dari kegiatan praktik kerja lapangan tahun 2026.</p><p>Setiap siswa dapat berkontribusi dengan mengirimkan laporan kegiatan melalui halaman <a href="/kirim" class="text-red-700 hover:underline font-medium">Kirim Berita</a>. Kiriman akan ditinjau oleh redaksi sebelum dipublikasikan.</p><h2 class="text-xl font-bold mt-6 mb-2">Pedoman Singkat</h2><ul class="list-disc pl-5 space-y-1 text-neutral-800"><li>Tulis dengan bahasa yang jelas dan faktual.</li><li>Sertakan foto kegiatan bila memungkinkan.</li><li>Cantumkan nama penulis dengan benar.</li><li>Hindari konten SARA dan ujaran kebencian.</li></ul></div></div>` })}`;
}, "/home/hatch/workspace/berita-magang/src/pages/tentang.astro", void 0);
var $$file = "/home/hatch/workspace/berita-magang/src/pages/tentang.astro";
var $$url = "/tentang";
//#endregion
//#region \0virtual:astro:page:src/pages/tentang@_@astro
var page = () => tentang_exports;
//#endregion
export { page };
