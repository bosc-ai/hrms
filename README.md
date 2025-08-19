# HRMS X — Next.js (Vercel-ready)

A stylish, animated HRMS demo that runs **100% on Vercel** with no external DB using demo data (browser-persisted). Perfect for UI/UX demos and flows. Plug in a real backend later (Google Apps Script, Neon, PlanetScale).

## 🚀 Quick Start (Local)
```bash
cp .env.example .env
npm install
npm run dev
# http://localhost:3000/login
# user: bosc / pass: inex2025
```

## 🔐 Auth
- `/api/login` checks env creds (`AUTH_USER`, `AUTH_PASS`) and sets an **httpOnly JWT** cookie
- `middleware.ts` protects all routes except `/login` and `/api/*`

## 🧩 Pages
- `/login` – frosted-glass animated login
- `/dashboard` – KPIs + recent tables
- `/employees` – list + add (stored to **localStorage** in demo mode)
- `/attendance` – punch in/out (localStorage)
- `/leave` – apply/approve (localStorage)
- `/payroll` – India basics: PF/ESI/PT; extend for TDS/LOP

## 🧪 Demo Mode
- Data lives client-side via `localStorage`, seeded from `/lib/data.ts`.
- No persistence on the server (Vercel files are read-only/ephemeral).

## 🔌 Production Options
- Replace UI data calls with a backend adapter:
  - **Google Apps Script** (Sheets as DB)
  - **Postgres (Neon)** / **MySQL (PlanetScale)** / **Turso**
- Keep UI as-is; swap `lib/data` for API calls.

## ☁️ Deploy on Vercel
1. Push to GitHub
2. Import to Vercel → Framework: **Next.js**
3. Add Environment Variables:
   - `AUTH_USER` = `bosc`
   - `AUTH_PASS` = `inex2025`
   - `JWT_SECRET` = (random string)
   - `APP_NAME` = `HRMS X` (optional)
4. Deploy → open `/login`

## 🛠️ Stack
- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion
- jose (JWT)