import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as createAstro, d as renderTemplate, f as maybeRenderHead, i as renderComponent, m as addAttribute } from "./server_Rc8_5O2w.mjs";
import { t as createComponent } from "./compiler_COKNl-CR.mjs";
import { t as $$Layout } from "./Layout_BWCgrPjx.mjs";
import { a as supabase } from "./auth_CfRwcMdO.mjs";
//#region src/pages/berita/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const { slug } = Astro.params;
	const { data } = await supabase.from("berita").select("*, kategori:kategori_id(nama)").eq("slug", slug).eq("status", "published").single();
	if (!data) return Astro.redirect("/404");
	await supabase.from("berita").update({ views: (data.views ?? 0) + 1 }).eq("id", data.id);
	const b = data;
	const tanggal = new Date(b.created_at).toLocaleDateString("id-ID", {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	});
	const { data: related } = await supabase.from("berita").select("id, judul, slug, ringkasan, gambar_url, penulis, created_at, kategori:kategori_id(nama)").eq("status", "published").neq("id", b.id).order("created_at", { ascending: false }).limit(3);
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": `${b.judul} - Permata`,
		"description": b.ringkasan
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<article class="max-w-3xl mx-auto"><a href="/" class="text-sm text-red-700 hover:underline">← Kembali ke Beranda</a><div class="mt-3"><span class="inline-block bg-red-700 text-white text-xs font-semibold px-2 py-1 rounded">${b.kategori?.nama ?? "Berita"}</span><h1 class="text-3xl sm:text-4xl font-extrabold leading-tight mt-2">${b.judul}</h1><p class="text-sm text-neutral-500 mt-2">Oleh <span class="font-medium text-neutral-700">${b.penulis}</span> • ${tanggal} • <svg class="inline w-3.5 h-3.5 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg> ${(b.views ?? 0) + 1}x dibaca</p></div>${b.gambar_url && renderTemplate`<img${addAttribute(b.gambar_url, "src")}${addAttribute(b.judul, "alt")} class="w-full rounded-lg mt-6 object-cover max-h-96">`}<div class="prose-berita mt-6 text-[17px]"><p class="font-medium text-lg text-neutral-900">${b.ringkasan}</p>${b.isi.split("\n").map((p) => {
		const t = p.trim();
		if (!t) return null;
		const imgMatch = t.match(/^!\[(.*?)\]\((.*?)\)$/);
		if (imgMatch) return renderTemplate`<figure class="my-6"><img${addAttribute(imgMatch[2], "src")}${addAttribute(imgMatch[1], "alt")} class="w-full rounded-lg object-cover" loading="lazy">${imgMatch[1] && renderTemplate`<figcaption class="text-sm text-neutral-500 text-center mt-2">${imgMatch[1]}</figcaption>`}</figure>`;
		return renderTemplate`<p>${t}</p>`;
	})}</div></article>${related && related.length > 0 && renderTemplate`<div class="max-w-3xl mx-auto mt-12"><h2 class="text-xl font-extrabold mb-4 border-l-4 border-red-700 pl-3">Berita Terkait</h2><div class="grid sm:grid-cols-3 gap-4">${related.map((r) => renderTemplate`<a${addAttribute(`/berita/${r.slug}`, "href")} class="block border rounded-lg overflow-hidden hover:shadow transition">${r.gambar_url && renderTemplate`<img${addAttribute(r.gambar_url, "src")}${addAttribute(r.judul, "alt")} class="w-full h-28 object-cover" loading="lazy">`}<div class="p-3"><h3 class="text-sm font-bold line-clamp-2 hover:text-red-700">${r.judul}</h3></div></a>`)}</div></div>`}` })}`;
}, "/home/hatch/workspace/berita-magang/src/pages/berita/[slug].astro", void 0);
var $$file = "/home/hatch/workspace/berita-magang/src/pages/berita/[slug].astro";
var $$url = "/berita/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/berita/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
