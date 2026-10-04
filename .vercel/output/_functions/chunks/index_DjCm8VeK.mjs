import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as createAstro, a as Fragment, d as renderTemplate, f as maybeRenderHead, i as renderComponent, m as addAttribute } from "./server_Rc8_5O2w.mjs";
import { t as createComponent } from "./compiler_COKNl-CR.mjs";
import { t as $$Layout } from "./Layout_BWCgrPjx.mjs";
import { a as supabase } from "./auth_CfRwcMdO.mjs";
//#region src/components/NewsCard.astro
createAstro("https://astro.build");
var $$NewsCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$NewsCard;
	const { berita, featured = false } = Astro.props;
	const tanggal = new Date(berita.created_at).toLocaleDateString("id-ID", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
	return renderTemplate`${featured ? renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(`/berita/${berita.slug}`, "href")} class="group block relative rounded-lg overflow-hidden bg-neutral-900 text-white">${berita.gambar_url ? renderTemplate`<img${addAttribute(berita.gambar_url, "src")}${addAttribute(berita.judul, "alt")} class="w-full h-80 sm:h-96 object-cover opacity-70 group-hover:opacity-60 transition">` : renderTemplate`<div class="w-full h-80 sm:h-96 bg-gradient-to-br from-red-800 to-neutral-900"></div>`}<div class="absolute bottom-0 p-6 bg-gradient-to-t from-black/90 to-transparent w-full"><span class="inline-block bg-red-700 text-xs font-semibold px-2 py-1 rounded mb-2">${berita.kategori_nama ?? "Berita"}</span><h2 class="text-2xl sm:text-3xl font-extrabold leading-tight group-hover:underline">${berita.judul}</h2><p class="text-sm text-neutral-300 mt-2 line-clamp-2">${berita.ringkasan}</p><p class="text-xs text-neutral-400 mt-2">${berita.penulis} • ${tanggal} • <svg class="inline w-3.5 h-3.5 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg> ${berita.views ?? 0}x</p></div></a>` : renderTemplate`<a${addAttribute(`/berita/${berita.slug}`, "href")} class="group block bg-white rounded-lg overflow-hidden border hover:shadow-lg transition">${berita.gambar_url ? renderTemplate`<img${addAttribute(berita.gambar_url, "src")}${addAttribute(berita.judul, "alt")} class="w-full h-44 object-cover group-hover:scale-[1.02] transition" loading="lazy">` : renderTemplate`<div class="w-full h-44 bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center text-neutral-400 text-4xl font-extrabold">B</div>`}<div class="p-4"><span class="inline-block text-red-700 text-xs font-bold uppercase tracking-wide mb-1">${berita.kategori_nama ?? "Berita"}</span><h3 class="font-bold leading-snug group-hover:text-red-700 group-hover:underline line-clamp-2">${berita.judul}</h3><p class="text-sm text-neutral-600 mt-1 line-clamp-2">${berita.ringkasan}</p><p class="text-xs text-neutral-400 mt-2">${berita.penulis} • ${tanggal} • <svg class="inline w-3.5 h-3.5 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg> ${berita.views ?? 0}x</p></div></a>`}`;
}, "/home/hatch/workspace/berita-magang/src/components/NewsCard.astro", void 0);
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
createAstro("https://astro.build");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const kategoriFilter = Astro.url.searchParams.get("kategori");
	let query = supabase.from("berita").select("*, kategori:kategori_id(nama)").eq("status", "published").order("created_at", { ascending: false });
	if (kategoriFilter) {
		const { data: kat } = await supabase.from("kategori").select("id").eq("slug", kategoriFilter).single();
		if (kat) query = query.eq("kategori_id", kat.id);
	}
	const { data: list } = await query.limit(20);
	const berita = (list ?? []).map((b) => ({
		...b,
		kategori_nama: b.kategori?.nama
	}));
	const { data: pop } = await supabase.from("berita").select("id, judul, slug, views, created_at").eq("status", "published").order("views", { ascending: false }).order("created_at", { ascending: false }).limit(5);
	const terpopuler = pop ?? [];
	const featured = berita[0];
	const rest = berita.slice(1);
	const demo = berita.length === 0;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": kategoriFilter ? `Kategori ${kategoriFilter} - Permata` : "Beranda - Permata",
		"activeKategori": kategoriFilter
	}, { "default": ($$result) => renderTemplate`${demo ? renderTemplate`${maybeRenderHead($$result)}<div class="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center"><h2 class="font-bold text-lg mb-2">🚧 Supabase belum terhubung</h2><p class="text-sm text-neutral-600 mb-4">Ikuti panduan di <code class="bg-neutral-100 px-1 rounded">README.md</code> untuk menghubungkan Supabase, lalu berita akan muncul di sini.</p><a href="/kirim" class="inline-block bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded">Coba Form Kirim Berita</a></div>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${featured && renderTemplate`${renderComponent($$result, "NewsCard", $$NewsCard, {
		"berita": featured,
		"featured": true
	})}`}<div class="mt-8 grid lg:grid-cols-3 gap-8"><div class="lg:col-span-2"><h2 class="text-xl font-extrabold mb-4 border-l-4 border-red-700 pl-3">${kategoriFilter ? `Kategori: ${kategoriFilter}` : "Berita Terbaru"}</h2>${rest.length > 0 ? renderTemplate`<div class="grid sm:grid-cols-2 gap-5">${rest.map((b) => renderTemplate`${renderComponent($$result, "NewsCard", $$NewsCard, { "berita": b })}`)}</div>` : !featured && renderTemplate`<div class="text-center py-16 text-neutral-500"><p class="text-lg font-medium">Belum ada berita published.</p><a href="/kirim" class="text-red-700 font-medium hover:underline">Jadilah yang pertama mengirim →</a></div>`}</div>${terpopuler.length > 0 && renderTemplate`<aside><h2 class="text-xl font-extrabold mb-4 border-l-4 border-red-700 pl-3">Terpopuler</h2><ol class="space-y-4">${terpopuler.map((t, i) => renderTemplate`<li><a${addAttribute(`/berita/${t.slug}`, "href")} class="group flex gap-3 items-start"><span class="text-4xl font-extrabold text-neutral-200 group-hover:text-red-700 leading-none transition">${i + 1}</span><div><h3 class="font-bold text-[15px] leading-snug group-hover:text-red-700 group-hover:underline line-clamp-3">${t.judul}</h3><p class="text-xs text-neutral-400 mt-1">${new Date(t.created_at).toLocaleDateString("id-ID", {
		day: "numeric",
		month: "short",
		year: "numeric"
	})} • <svg class="inline w-3.5 h-3.5 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg> ${t.views ?? 0}x</p></div></a></li>`)}</ol></aside>`}</div>` })}`}` })}`;
}, "/home/hatch/workspace/berita-magang/src/pages/index.astro", void 0);
var $$file = "/home/hatch/workspace/berita-magang/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
