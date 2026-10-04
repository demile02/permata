import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as createAstro, d as renderTemplate, f as maybeRenderHead, i as renderComponent } from "./server_Rc8_5O2w.mjs";
import { t as createComponent } from "./compiler_COKNl-CR.mjs";
import { t as renderScript } from "./script_BnlWh586.mjs";
import { t as $$Layout } from "./Layout_BWCgrPjx.mjs";
import { n as isLoggedIn } from "./auth_CfRwcMdO.mjs";
//#region src/pages/login.astro
var login_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Login,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Login = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Login;
	const cookies = Astro.request.headers.get("cookie");
	if (isLoggedIn(cookies)) return Astro.redirect("/");
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Login - Permata" }, { "default": async ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="max-w-sm mx-auto"><h1 class="text-2xl font-extrabold mb-1">Login Admin</h1><p class="text-sm text-neutral-500 mb-6">Khusus redaksi PERMATA.</p><form id="form-login" class="space-y-4 bg-white border rounded-lg p-6"><div><label class="block text-sm font-semibold mb-1" for="username">Username</label><input id="username" name="username" required autocomplete="username" class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-red-700 focus:outline-none"></div><div><label class="block text-sm font-semibold mb-1" for="password">Password</label><input id="password" name="password" type="password" required autocomplete="current-password" class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-red-700 focus:outline-none"></div><div id="status" class="hidden text-sm rounded px-3 py-2"></div><button type="submit" id="btn" class="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2.5 rounded transition disabled:opacity-50">Masuk</button></form></div>${renderScript($$result, "/home/hatch/workspace/berita-magang/src/pages/login.astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "/home/hatch/workspace/berita-magang/src/pages/login.astro", void 0);
var $$file = "/home/hatch/workspace/berita-magang/src/pages/login.astro";
var $$url = "/login";
//#endregion
//#region \0virtual:astro:page:src/pages/login@_@astro
var page = () => login_exports;
//#endregion
export { page };
