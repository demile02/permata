import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as createAstro, d as renderTemplate, f as maybeRenderHead, i as renderComponent, m as addAttribute } from "./server_Rc8_5O2w.mjs";
import { t as createComponent } from "./compiler_COKNl-CR.mjs";
import { t as renderScript } from "./script_BnlWh586.mjs";
import { t as $$Layout } from "./Layout_BWCgrPjx.mjs";
import { a as supabase, n as isLoggedIn } from "./auth_CfRwcMdO.mjs";
//#region src/pages/kirim.astro
var kirim_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Kirim,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Kirim = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Kirim;
	if (!isLoggedIn(Astro.request.headers.get("cookie"))) return Astro.redirect("/login");
	const { data: kategoriList } = await supabase.from("kategori").select("id, nama").order("nama");
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Kirim Berita - Permata",
		"description": "Formulir pengiriman berita kegiatan magang"
	}, { "default": async ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="max-w-2xl mx-auto"><h1 class="text-3xl font-extrabold mb-2">Kirim Berita</h1><p class="text-neutral-600 mb-6">Bagikan laporan kegiatan magangmu. Berita akan ditinjau redaksi sebelum dipublikasikan.</p><form id="form-berita" class="space-y-5 bg-white border rounded-lg p-6"><div><label class="block text-sm font-semibold mb-1" for="judul">Judul Berita *</label><input id="judul" name="judul" required maxlength="120" class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-red-700 focus:outline-none" placeholder="cth: Kunjungan Industri ke PT Maju Bersama"></div><div class="grid sm:grid-cols-2 gap-4"><div><label class="block text-sm font-semibold mb-1" for="kategori">Kategori *</label><select id="kategori" name="kategori" required class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-red-700 focus:outline-none"><option value="">- Pilih -</option>${(kategoriList ?? []).map((k) => renderTemplate`<option${addAttribute(k.id, "value")}>${k.nama}</option>`)}</select></div><div><label class="block text-sm font-semibold mb-1" for="penulis">Nama Penulis *</label><input id="penulis" name="penulis" required maxlength="60" class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-red-700 focus:outline-none" placeholder="Nama kamu"></div></div><div><label class="block text-sm font-semibold mb-1" for="ringkasan">Ringkasan *</label><textarea id="ringkasan" name="ringkasan" required rows="2" maxlength="300" class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-red-700 focus:outline-none" placeholder="1-2 kalimat pembuka berita..."></textarea></div><div><label class="block text-sm font-semibold mb-1" for="isi">Isi Berita *</label><textarea id="isi" name="isi" required rows="8" class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-red-700 focus:outline-none" placeholder="Tulis laporan kegiatan secara lengkap..."></textarea><p class="text-xs text-neutral-500 mt-1">Untuk sisipkan foto di tengah artikel, tulis di baris tersendiri: <code class="bg-neutral-100 px-1 rounded">![keterangan foto](url-gambar)</code></p></div><div><label class="block text-sm font-semibold mb-1" for="gambar">Foto Utama / Header (opsional, maks 5MB)</label><input id="gambar" name="gambar" type="file" accept="image/*" class="w-full text-sm"></div><div class="bg-neutral-50 border rounded p-4"><label class="block text-sm font-semibold mb-1">Foto Tambahan (untuk disisipkan di tengah artikel)</label><input id="gambar-extra" type="file" accept="image/*" multiple class="w-full text-sm mb-2"><button type="button" id="btn-upload-extra" class="text-sm bg-neutral-800 hover:bg-neutral-900 text-white px-3 py-1.5 rounded">Upload Foto Tambahan</button><div id="extra-list" class="mt-2 space-y-1 text-xs"></div><p class="text-xs text-neutral-500 mt-1">Upload foto, lalu klik kode yang muncul untuk menyalin & tempel ke isi berita.</p></div><div id="status" class="hidden text-sm rounded px-3 py-2"></div><button type="submit" id="btn-submit" class="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded transition disabled:opacity-50">Kirim Berita</button><p class="text-xs text-neutral-500 text-center">Dengan mengirim, kamu menyetujui pedoman redaksi.</p></form></div>${renderScript($$result, "/home/hatch/workspace/berita-magang/src/pages/kirim.astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "/home/hatch/workspace/berita-magang/src/pages/kirim.astro", void 0);
var $$file = "/home/hatch/workspace/berita-magang/src/pages/kirim.astro";
var $$url = "/kirim";
//#endregion
//#region \0virtual:astro:page:src/pages/kirim@_@astro
var page = () => kirim_exports;
//#endregion
export { page };
