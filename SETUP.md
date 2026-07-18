# TestiWall - Setup Guide

## 1. Create Supabase Project (Free)

1. Go to https://supabase.com and create a free account
2. Create a new project
3. Go to SQL Editor and run the contents of `supabase-schema.sql`
4. Go to Settings > API and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 2. Local Setup

```bash
# Clone/enter the project
cd testiwall

# Install dependencies
npm install

# Create env file
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Run dev server
npm run dev
```

Open http://localhost:3000

## 3. Deploy to Vercel (Free)

1. Push code to GitHub
2. Go to https://vercel.com
3. Import your GitHub repo
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

## Supabase Auth Setup

In Supabase Dashboard > Authentication > Settings:
- Enable Email auth (enabled by default)
- Set Site URL to your Vercel domain
- Add redirect URLs for your domain
