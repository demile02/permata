import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { i as logoutCookie } from "./auth_CfRwcMdO.mjs";
//#region src/pages/api/logout.ts
var logout_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST
});
var GET = async () => {
	return new Response(null, {
		status: 302,
		headers: {
			"Set-Cookie": logoutCookie(),
			"Location": "/"
		}
	});
};
var POST = async () => {
	return new Response(JSON.stringify({ ok: true }), {
		status: 200,
		headers: {
			"Set-Cookie": logoutCookie(),
			"Content-Type": "application/json"
		}
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/logout@_@ts
var page = () => logout_exports;
//#endregion
export { page };
