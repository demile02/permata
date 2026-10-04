import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { d as renderTemplate, f as maybeRenderHead, i as renderComponent } from "./server_Rc8_5O2w.mjs";
import { t as createComponent } from "./compiler_COKNl-CR.mjs";
import { t as $$Layout } from "./Layout_BWCgrPjx.mjs";
//#region src/pages/404.astro
var _404_exports = /* @__PURE__ */ __exportAll({
	default: () => $$404,
	file: () => $$file,
	url: () => $$url
});
var $$404 = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "404 - Permata" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="text-center py-20"><h1 class="text-6xl font-extrabold text-neutral-300">404</h1><p class="text-lg text-neutral-600 mt-2">Halaman tidak ditemukan.</p><a href="/" class="inline-block mt-4 bg-red-700 text-white px-5 py-2 rounded font-semibold">← Kembali ke Beranda</a></div>` })}`;
}, "/home/hatch/workspace/berita-magang/src/pages/404.astro", void 0);
var $$file = "/home/hatch/workspace/berita-magang/src/pages/404.astro";
var $$url = "/404";
//#endregion
//#region \0virtual:astro:page:src/pages/404@_@astro
var page = () => _404_exports;
//#endregion
export { page };
