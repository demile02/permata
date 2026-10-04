#!/bin/bash
# Jalankan semua layanan lokal untuk BeritaMagang
# PostgreSQL + PostgREST + Proxy + Astro

cd "$(dirname $0)/.."

echo "=== Starting BeritaMagang (mode lokal) ==="

# 1. PostgreSQL
sudo service postgresql start 2>/dev/null || true

# 2. PostgREST (tanpa JWT untuk dev lokal)
PGRST_DB_URI="postgres://berita:berita123@localhost:5432/berita_magang" \
PGRST_DB_SCHEMAS="public" \
PGRST_DB_ANON_ROLE="anon" \
PGRST_SERVER_PORT="3001" \
./local/postgrest > /tmp/postgrest.log 2>&1 &
echo "PostgREST: http://localhost:3001"

# 3. Proxy (Supabase-compatible /rest/v1/)
node ./local/proxy.cjs > /tmp/proxy.log 2>&1 &
echo "Proxy: http://localhost:3002"

sleep 3

# 4. Astro dev
echo "Astro: http://localhost:4321"
echo ""
echo "Tekan Ctrl+C untuk berhenti semua"
npx astro dev --port 4321
