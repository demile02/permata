import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { r as loginCookie, t as checkLogin } from "./auth_CfRwcMdO.mjs";
//#region src/pages/api/login.ts
var login_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async ({ request }) => {
	try {
		const { username, password } = await request.json();
		if (!username || !password) return new Response(JSON.stringify({ error: "Username dan password wajib diisi." }), { status: 400 });
		if (!await checkLogin(String(username), String(password))) return new Response(JSON.stringify({ error: "Username atau password salah." }), { status: 401 });
		return new Response(JSON.stringify({ ok: true }), {
			status: 200,
			headers: {
				"Set-Cookie": loginCookie(),
				"Content-Type": "application/json"
			}
		});
	} catch {
		return new Response(JSON.stringify({ error: "Terjadi kesalahan." }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/login@_@ts
var page = () => login_exports;
//#endregion
export { page };
