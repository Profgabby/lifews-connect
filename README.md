# LIFEWS CONNECT MVP v0.1

Modern Next.js + Tailwind + Supabase platform connecting schools, teachers, parents, and community partners under four LIFEWS pillars.

## Features
- Supabase authentication (login + signup)
- Role selection at signup: Admin, Teacher, Parent, School, Community Partner
- Protected routes via Next.js middleware
- Session persistence using Supabase SSR cookie handling
- Logout support in dashboard shell
- Role-aware dashboard scaffold and collaboration modules
- Multilingual categories: English, French, Yoruba, Igbo, Hausa, German

## Tech Stack
- Next.js 14 (App Router)
- Tailwind CSS
- Supabase (Auth + Postgres)
- TypeScript

## Environment setup
Create `.env.local` from `.env.example` and set:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

In Supabase Auth settings, set site URL and redirect URL:
- Site URL: `http://localhost:3000`
- Redirect URL: `http://localhost:3000/auth/callback`

## Run locally
1. Install dependencies
   ```bash
   npm install
   ```
2. Run schema from `supabase/schema.sql` in the Supabase SQL editor.
3. Start dev server
   ```bash
   npm run dev
   ```
4. Visit `/signup` to create account and select role.

## Auth flow
1. Sign up on `/signup` and choose role.
2. Supabase creates user and persists session.
3. Middleware protects `/dashboard`, `/library`, `/garden`, `/announcements`, `/messages`, `/pillars`, `/settings`.
4. Unauthenticated users are redirected to `/login`.
5. Logout from dashboard header ends session and returns user to `/login`.

## Deployment
- Deploy on Vercel.
- Set environment variables in Vercel.
- Add production redirect URL in Supabase Auth.
