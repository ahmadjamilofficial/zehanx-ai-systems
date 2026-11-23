# Idea Studio deployment

## Required Vercel Production environment variables

- `REWIND_API_KEY` — Rewind API key for the AI discovery chat.
- `GMAIL_USER=zehanxtech@gmail.com` — the Gmail mailbox used as the sender.
- `GMAIL_APP_PASSWORD` — a Google App Password generated while signed in to `zehanxtech@gmail.com`.
- `LEADS_TO_EMAIL=zehanxtech@gmail.com` — destination for new project enquiries.

The email transport uses Gmail SMTP over TLS on port 465. The team notification is sent from the ZehanX mailbox, with the visitor's email in Reply-To. A visitor receipt is sent after the team notification; receipt failure does not undo successful team delivery.

## Configure Gmail

1. Sign in to the Google account `zehanxtech@gmail.com`.
2. Enable 2-Step Verification for that account.
3. Open https://myaccount.google.com/apppasswords and create an App Password for this website.
4. In Vercel, open the ZehanX project → Settings → Environment Variables.
5. Add `GMAIL_USER`, `GMAIL_APP_PASSWORD`, and `LEADS_TO_EMAIL` for Production (and Preview if you want preview deployments to send email).
6. Redeploy after saving the variables.

Do not paste the App Password into chat, source code, GitHub files, or commits. Store it only as the Vercel environment variable. If Google does not offer App Passwords, check that 2-Step Verification is enabled and that the account's security policy allows them.

## Optional lead persistence

Apply `supabase/migrations/202611230001_idea_studio_leads.sql`, then set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. Database persistence is best-effort: email delivery is the primary submission channel and is not blocked by a database failure.

## Verify delivery

After configuring the Vercel variables and redeploying, submit a real test enquiry through `/idea-studio`. Confirm the team notification arrives at `zehanxtech@gmail.com`, reply to the visitor using Reply-To, and confirm the visitor receipt. Repository tests and preview builds cannot verify Gmail account authentication or real-world inbox delivery.
