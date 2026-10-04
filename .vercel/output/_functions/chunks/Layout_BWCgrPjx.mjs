import { C as createAstro, c as renderSlot, d as renderTemplate, m as addAttribute, p as renderHead } from "./server_Rc8_5O2w.mjs";
import { t as createComponent } from "./compiler_COKNl-CR.mjs";
import { n as isLoggedIn } from "./auth_CfRwcMdO.mjs";
//#region src/layouts/Layout.astro
createAstro("https://astro.build");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	const { title = "Permata", description = "Portal Berita Magang MAN Kota Blitar 2026", activeKategori = null } = Astro.props;
	const loggedIn = isLoggedIn(Astro.request.headers.get("cookie"));
	return renderTemplate`<html lang="id"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"${addAttribute(description, "content")}><title>${title}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">${renderHead($$result)}</head><body><!-- Header --><header class="border-b-4 border-red-700"><div class="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between"><a href="/" class="flex items-center gap-3"><img src="/logo-man.png" alt="Logo MAN Kota Blitar" class="w-12 h-12 object-contain"><div><h1 class="text-2xl font-extrabold tracking-tight">PERMATA</h1><p class="text-xs text-neutral-500 hidden sm:block">Portal Berita Magang MAN Kota Blitar 2026</p></div></a>${loggedIn ? renderTemplate`<div class="flex items-center gap-2"><a href="/kirim" class="bg-red-700 hover:bg-red-800 text-white text-sm font-semibold px-4 py-2 rounded transition">+ Kirim Berita</a><a href="/api/logout" class="text-sm text-neutral-500 hover:text-red-700 px-2 py-2">Keluar</a></div>` : renderTemplate`<a href="/login" class="text-sm text-neutral-500 hover:text-red-700 font-medium px-4 py-2">Login</a>`}</div><!-- Nav --><nav class="bg-neutral-100 border-t"><div class="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto text-sm font-medium">${[
		{
			href: "/",
			label: "Beranda",
			key: null
		},
		{
			href: "/?kategori=kegiatan",
			label: "Kegiatan",
			key: "kegiatan"
		},
		{
			href: "/?kategori=prestasi",
			label: "Prestasi",
			key: "prestasi"
		},
		{
			href: "/tentang",
			label: "Tentang",
			key: "tentang"
		}
	].map((item) => {
		const isActive = activeKategori === item.key || item.key === "tentang" && Astro.url.pathname === "/tentang";
		return renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(["px-4 py-3 whitespace-nowrap transition-colors", isActive ? "bg-white text-red-700 font-bold" : "hover:bg-white hover:text-red-700"], "class:list")}>${item.label}</a>`;
	})}</div></nav></header><main class="max-w-6xl mx-auto px-4 py-8 min-h-[60vh]">${renderSlot($$result, $$slots["default"])}</main><footer class="bg-neutral-900 text-neutral-300 mt-12"><div class="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm"><div><h3 class="text-white font-bold mb-2">PERMATA</h3><p>Portal Berita Magang MAN Kota Blitar 2026. Situs ini bukan situs resmi MAN Kota Blitar.</p></div><div class="sm:text-right"><h3 class="text-white font-bold mb-2">Kategori</h3><ul class="space-y-1"><li><a href="/?kategori=kegiatan" class="hover:text-white">Kegiatan</a></li><li><a href="/?kategori=prestasi" class="hover:text-white">Prestasi</a></li></ul></div></div><div class="border-t border-neutral-800 text-center text-xs py-4">&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} Permata - Laporan Kegiatan Magang MAN Kota Blitar</div></footer></body></html>`;
}, "/home/hatch/workspace/berita-magang/src/layouts/Layout.astro", void 0);
//#endregion
export { $$Layout as t };
