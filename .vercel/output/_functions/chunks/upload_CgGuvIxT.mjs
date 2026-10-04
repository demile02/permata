import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
//#region src/pages/api/upload.ts
var upload_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async ({ request }) => {
	try {
		const file = (await request.formData()).get("file");
		if (!file) return new Response(JSON.stringify({ error: "No file" }), { status: 400 });
		if (file.size > 5242880) return new Response(JSON.stringify({ error: "Maksimal 5MB" }), { status: 400 });
		const ext = file.name.split(".").pop() || "jpg";
		const filename = `${Date.now()}.${ext}`;
		const uploadDir = join(process.cwd(), "public", "uploads");
		await mkdir(uploadDir, { recursive: true });
		const buffer = Buffer.from(await file.arrayBuffer());
		await writeFile(join(uploadDir, filename), buffer);
		return new Response(JSON.stringify({ url: `/uploads/${filename}` }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (e) {
		return new Response(JSON.stringify({ error: e.message }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/upload@_@ts
var page = () => upload_exports;
//#endregion
export { page };
