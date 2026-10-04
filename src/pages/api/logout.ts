import type { APIRoute } from 'astro';
import { logoutCookie } from '../../lib/auth';

export const GET: APIRoute = async () => {
  return new Response(null, {
    status: 302,
    headers: { 'Set-Cookie': logoutCookie(), 'Location': '/' },
  });
};

export const POST: APIRoute = async () => {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Set-Cookie': logoutCookie(), 'Content-Type': 'application/json' },
  });
};
