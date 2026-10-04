import type { APIRoute } from 'astro';
import { checkLogin, loginCookie } from '../../lib/auth';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      return new Response(JSON.stringify({ error: 'Username dan password wajib diisi.' }), { status: 400 });
    }
    const ok = await checkLogin(String(username), String(password));
    if (!ok) {
      return new Response(JSON.stringify({ error: 'Username atau password salah.' }), { status: 401 });
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Set-Cookie': loginCookie(), 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Terjadi kesalahan.' }), { status: 500 });
  }
};
