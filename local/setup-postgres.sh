#!/bin/bash
# Setup PostgreSQL lokal untuk BeritaMagang
set -e

DB_NAME="berita_magang"
DB_USER="berita"
DB_PASS="berita123"

echo "=== Setup PostgreSQL lokal ==="

# Start postgres
sudo service postgresql start 2>/dev/null || sudo pg_ctlcluster $(ls /etc/postgresql/ | head -1) main start 2>/dev/null || true
sleep 3

# Buat user dan database
sudo -u postgres psql -c "DO \$\$ BEGIN IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname='$DB_USER') THEN CREATE ROLE $DB_USER LOGIN PASSWORD '$DB_PASS'; END IF; END \$\$;" 2>/dev/null
sudo -u postgres psql -c "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'" | grep -q 1 || sudo -u postgres psql -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;"

# Buat role anon untuk PostgREST
sudo -u postgres psql -d $DB_NAME -c "DO \$\$ BEGIN IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname='anon') THEN CREATE ROLE anon NOLOGIN; END IF; END \$\$;"
sudo -u postgres psql -d $DB_NAME -c "GRANT USAGE ON SCHEMA public TO anon;"
sudo -u postgres psql -d $DB_NAME -c "GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO anon;"
sudo -u postgres psql -d $DB_NAME -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE ON TABLES TO anon;"
sudo -u postgres psql -d $DB_NAME -c "GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;"

# Jalankan skema (versi lokal tanpa RLS Supabase)
sudo -u postgres psql -d $DB_NAME -f "$(dirname $0)/schema.local.sql"

echo "=== PostgreSQL siap ==="
echo "DB: $DB_NAME, User: $DB_USER"
