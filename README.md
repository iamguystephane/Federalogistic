# Federalogistic

## Run the app

```bash
npm run dev
```

This starts:

- Backend API: `http://127.0.0.1:4100`
- Frontend app: `http://127.0.0.1:3000`

## Admin

- Login page: `http://127.0.0.1:3000/admin`
- Dashboard: `http://127.0.0.1:3000/admin/dashboard`

Admin credentials are read from `backend/.env`:

```env
ADMIN_EMAIL="admin@federalogistic.com"
ADMIN_PASSWORD="Admin@12345"
ADMIN_RESET_CODE="RESET-ADMIN-2026"
```

## Neon + Prisma

1. Create a Neon Postgres database.
2. Replace `DATABASE_URL` in `backend/.env`.
3. Push the Prisma schema:

```bash
npm run db:push
```

4. Start the app:

```bash
npm run dev
```

## Push

```bash
npm run push
```
