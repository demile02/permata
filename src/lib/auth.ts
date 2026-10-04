import { scryptSync, timingSafeEqual, randomBytes, createHmac } from 'crypto';
import { supabase } from './supabase';

const COOKIE_NAME = 'permata_admin';
// Secret untuk sign cookie. Set AUTH_SECRET di env untuk production.
const AUTH_SECRET = process.env.AUTH_SECRET || 'permata-dev-secret-change-me';

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const testHash = scryptSync(password, salt, 64);
  const realHash = Buffer.from(hash, 'hex');
  if (testHash.length !== realHash.length) return false;
  return timingSafeEqual(testHash, realHash);
}

export async function checkLogin(username: string, password: string): Promise<boolean> {
  const { data } = await supabase
    .from('users')
    .select('password_hash')
    .eq('username', username)
    .single();
  if (!data) return false;
  return verifyPassword(password, (data as any).password_hash);
}

function sign(value: string): string {
  return createHmac('sha256', AUTH_SECRET).update(value).digest('hex');
}

export function isLoggedIn(cookies: string | null): boolean {
  if (!cookies) return false;
  const cookie = cookies.split(';').map(c => c.trim()).find(c => c.startsWith(`${COOKIE_NAME}=`));
  if (!cookie) return false;
  const value = cookie.slice(COOKIE_NAME.length + 1);
  const [payload, signature] = value.split('.');
  if (payload !== '1' || !signature) return false;
  const expected = sign(payload);
  if (signature.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export function loginCookie(): string {
  const payload = '1';
  const value = `${payload}.${sign(payload)}`;
  // 7 hari
  return `${COOKIE_NAME}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`;
}

export function logoutCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}
