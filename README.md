# LIFEWS CONNECT MVP v0.1

Modern Next.js + Tailwind + Supabase platform connecting schools, teachers, parents, and community partners under four LIFEWS pillars.

## Features
- Authentication scaffold (login/sign up flow)
- Role-based dashboard shell
- Pillars overview
- Learning library module
- Garden activities module
- Announcements module
- Messaging module
- Profile/settings module
- Multilingual categories: English, French, Yoruba, Igbo, Hausa, German

## Tech Stack
- Next.js 14 (App Router)
- Tailwind CSS
- Supabase (Auth + Postgres)
- TypeScript

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure env vars:
   ```bash
   cp .env.example .env.local
   ```
3. Add your Supabase project URL and anon key.
4. Run schema SQL from `supabase/schema.sql` in Supabase SQL editor.
5. Start app:
   ```bash
   npm run dev
   ```

## Authentication flow (MVP)
1. User opens `/auth`.
2. User chooses login or sign up.
3. On sign up, assign role and optionally attach school.
4. Persist profile details in `users` table linked to Supabase Auth user id.
5. Redirect to `/dashboard` and render role-specific cards/actions.

## Deployment
- Deploy to Vercel.
- Set environment variables in Vercel project settings.
- Ensure Supabase database has schema and RLS policies.
