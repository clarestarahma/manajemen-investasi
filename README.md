# MarketGuardian

## Prerequisite

- Docker >= 29.0.2
- NPM >= 11.5.2
- Node.js >= 22.18.0

## Cara Run

1. Pergi ke folder apps/backend

   ```bash
   cd apps/backend/
   ```

2. Jalankan database

   ```bash
   docker compose up -d
   ```

3. Install dependensi

   ```bash
   npm install
   ```

4. Buat file `.env`

   Buat file `.env` pada folder `apps/backend` dan isi file dengan:

   ```
   DATABASE_URL = postgresql://<username>:<password>@<ip>:<port>/<database>
   ```

5. Migrasi database

   ```bash
   npx drizzle-kit migrate
   ```

   Untuk melakukan inspeksi database, dapat menggunakan drizzle-kit studio dengan perintah:

   ```bash
   npx drizzle-kit studio
   ```

6. Menjalankan server

   ```bash
   npm run dev
   ```

## Spesifikasi API

Untuk melihat spesifikasi OpenAPI dari MarketGuardian Backend REST API, buka http://localhost:3000/reference di web browser.
