# Idea Studio deployment checklist

The Idea Studio uses Rewind as its only LLM provider. The API key is read server-side and must never be prefixed with VITE_ or NEXT_PUBLIC_.

## Vercel environment variables

Set these in the Production environment:
- REWIND_API_KEY (the owner says this is already configured)
- REWIND_BASE_URL=https://api.rewind.ai
- REWIND_MODEL=qwen/qwen3.5-9b
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY

Optional email delivery:
- RESEND_API_KEY
- LEADS_TO_EMAIL
- LEADS_FROM_EMAIL

## Database

Apply `supabase/migrations/202611230001_idea_studio_leads.sql` to the Supabase project. The table has RLS enabled and no public policies. The server inserts with the service-role key; never expose that key to the browser.

## Important operational limits

The API includes request validation, a short conversation-history cap, a Rewind timeout, one JSON repair attempt and an in-process IP rate limit. The in-memory rate limit is best-effort only and is not a distributed limiter or a durable daily spend cap on serverless infrastructure. Add a shared rate limiter and provider spend controls before high-traffic launch.

Email delivery is optional and currently notifies the configured team address. Verify sender-domain authentication and test deliverability before enabling it.
