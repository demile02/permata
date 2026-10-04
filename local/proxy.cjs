// Proxy sederhana: /rest/v1/* -> PostgREST di :3001/*
// Juga handle /storage/v1/* untuk kompatibilitas (return 404 yang jelas)
const http = require('http');

const TARGET = 'http://localhost:3001';

const server = http.createServer((req, res) => {
  let targetPath = req.url;

  // Supabase JS client memanggil /rest/v1/<tabel>
  if (targetPath.startsWith('/rest/v1/')) {
    targetPath = targetPath.slice('/rest/v1'.length);
  } else if (targetPath.startsWith('/storage/v1/')) {
    // Storage tidak tersedia di mode lokal (pakai /api/upload)
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Storage API tidak tersedia di mode lokal, pakai /api/upload' }));
    return;
  }

  const headers = { ...req.headers, host: 'localhost:3001' };
  // Mode lokal tanpa JWT: hapus Authorization header agar PostgREST pakai anon role
  delete headers['authorization'];
  delete headers['apikey'];

  const proxyReq = http.request(
    TARGET + targetPath,
    {
      method: req.method,
      headers,
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    }
  );

  proxyReq.on('error', (e) => {
    res.writeHead(502, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Proxy error: ' + e.message }));
  });

  req.pipe(proxyReq);
});

server.listen(3002, () => {
  console.log('Supabase-local proxy: http://localhost:3002 -> PostgREST :3001');
  console.log('  /rest/v1/*  =>  /*');
});
