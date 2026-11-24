# Project enquiry email setup

The Plan Your Project form sends enquiries directly to the ZehanX team using Gmail SMTP over TLS. No AI provider or Rewind credentials are required.

## Required Vercel Production environment variables

- `GMAIL_USER=zehanxtech@gmail.com` — the Gmail mailbox used as the sender.
- `GMAIL_APP_PASSWORD` — a Google App Password generated while signed in to `zehanxtech@gmail.com`.
- `LEADS_TO_EMAIL=zehanxtech@gmail.com` — destination for new project enquiries. If omitted, the endpoint defaults to this address.

## Configure Gmail

1. Sign in to the Google account `zehanxtech@gmail.com`.
2. Enable 2-Step Verification for that account.
3. Open https://myaccount.google.com/apppasswords and create an App Password for this website.
4. In Vercel, open the ZehanX project → Settings → Environment Variables.
5. Add `GMAIL_USER`, `GMAIL_APP_PASSWORD`, and `LEADS_TO_EMAIL` for Production (and Preview if you want preview deployments to send email).
6. Redeploy after saving the variables.

Do not paste the App Password into chat, source code, GitHub files, or commits. Store it only as a Vercel environment variable. If Google does not offer App Passwords, check that 2-Step Verification is enabled and that the account's security policy allows them.

## Verify delivery

After configuring the Vercel variables and redeploying, submit a real test enquiry through `/plan-project`. Confirm the team notification arrives at `zehanxtech@gmail.com`, reply to the visitor using Reply-To, and confirm the visitor receipt. Repository builds cannot verify Gmail account authentication or real-world inbox delivery.
