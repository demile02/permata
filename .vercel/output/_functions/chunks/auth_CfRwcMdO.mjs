import { scryptSync, timingSafeEqual } from "crypto";
import { createClient } from "@supabase/supabase-js";
var supabase = createClient("http://localhost:3002", "dummy-local-key");
//#endregion
//#region src/lib/auth.ts
var COOKIE_NAME = "permata_admin";
function verifyPassword(password, stored) {
	const [salt, hash] = stored.split(":");
	if (!salt || !hash) return false;
	const testHash = scryptSync(password, salt, 64);
	const realHash = Buffer.from(hash, "hex");
	if (testHash.length !== realHash.length) return false;
	return timingSafeEqual(testHash, realHash);
}
async function checkLogin(username, password) {
	const { data } = await supabase.from("users").select("password_hash").eq("username", username).single();
	if (!data) return false;
	return verifyPassword(password, data.password_hash);
}
function isLoggedIn(cookies) {
	if (!cookies) return false;
	return cookies.split(";").some((c) => c.trim().startsWith(`${COOKIE_NAME}=1`));
}
function loginCookie() {
	return `${COOKIE_NAME}=1; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`;
}
function logoutCookie() {
	return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}
//#endregion
export { supabase as a, logoutCookie as i, isLoggedIn as n, loginCookie as r, checkLogin as t };
