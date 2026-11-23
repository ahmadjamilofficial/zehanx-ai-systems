# Idea Studio deployment checklist

The Idea Studio uses Rewind as its only LLM provider. The API key is read server-side and must never be prefixed with VITE_ or NEXT_PUBLIC_.

## Vercel environment variables

Set these in the Production environment:
- REWIND_API_KEY (the owner says this is already configured)
- REWIND_BASE_URL=https://api.rewind.ai
- REWIND_MODEL=qwen/qwen3.5-9b
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY

Required email delivery (the submission API returns an error if these are missing):
- RESEND_API_KEY
- LEADS_TO_EMAIL=zehanxtech@gmail.com
- LEADS_FROM_EMAIL (a sender address verified in Resend)

## Database

Apply `supabase/migrations/202611230001_idea_studio_leads.sql` to the Supabase project. The table has RLS enabled and no public policies. The server inserts with the service-role key; never expose that key to the browser.

## Important operational limits

The API includes request validation, a short conversation-history cap, a Rewind timeout, one JSON repair attempt and an in-process IP rate limit. The in-memory rate limit and daily request ceiling are best-effort only; they are not distributed controls and reset across serverless instances/cold starts. Add a shared rate limiter and provider spend controls before high-traffic launch.

The project brief is emailed directly to LEADS_TO_EMAIL through Resend before the API reports success. Configure and verify the sender domain in Resend, set all three email variables in Vercel Production, then submit a real test enquiry and confirm delivery. Supabase storage is best-effort and no longer blocks email delivery.
