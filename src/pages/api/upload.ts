import type { APIRoute } from 'astro';
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { isLoggedIn } from '../../lib/auth';

const ALLOWED_EXT = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif']);
const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

export const POST: APIRoute = async ({ request }) => {
  // Hanya untuk dev lokal
  if (import.meta.env.PUBLIC_LOCAL_UPLOAD !== 'true') {
    return new Response(JSON.stringify({ error: 'Local upload disabled' }), { status: 403 });
  }

  // Wajib login
  if (!isLoggedIn(request.headers.get('cookie'))) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file' }), { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return new Response(JSON.stringify({ error: 'Maksimal 5MB' }), { status: 400 });
    }

    const ext = (file.name.split('.').pop() || '').toLowerCase();
    if (!ALLOWED_EXT.has(ext) || !ALLOWED_MIME.has(file.type)) {
      return new Response(JSON.stringify({ error: 'Tipe file tidak diizinkan. Gunakan JPG, PNG, WebP, atau GIF.' }), { status: 400 });
    }

    const filename = `${randomUUID()}.${ext}`;
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(join(uploadDir, filename), buffer);

    return new Response(JSON.stringify({ url: `/uploads/${filename}` }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Upload gagal.' }), { status: 500 });
  }
};
