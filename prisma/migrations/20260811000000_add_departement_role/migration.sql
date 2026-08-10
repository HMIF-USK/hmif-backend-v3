-- Tambah role "departement" (akun login per departemen)
ALTER TYPE "userrRole" ADD VALUE IF NOT EXISTS 'departement';
