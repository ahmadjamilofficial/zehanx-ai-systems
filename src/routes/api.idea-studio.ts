import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { IdeaStudioProviderError, runIdeaStudio } from "@/lib/ai/rewind";
import { sendGmailMessages } from "@/lib/email/gmail";

const Body = z.object({
  action: z.enum(["chat", "submit"]).default("chat"),
  messages: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1).max(1600) })).max(32).optional(),
  brief: z.record(z.string(), z.unknown()).optional(),
  name: z.string().trim().min(2).max(100).optional(),
  email: z.string().email().max(200).optional(),
  whatsapp: z.string().trim().max(40).optional(),
  consent: z.literal(true).optional(),
});
const hits = new Map<string, { count: number; reset: number }>();
function htmlEscape(value: string) {
  return value.replace(/[&<>\"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" })[char] || char);
}
function reportTable(brief: Record<string, unknown>) {
  const rows = Object.entries(brief).map(([key, value]) => {
    const cell = Array.isArray(value) ? "<ul>" + value.map((item) => "<li>" + htmlEscape(String(item)) + "</li>").join("") + "</ul>" : htmlEscape(String(value ?? ""));
    return "<tr><th style=\"padding:12px;text-align:left;color:#777;border-bottom:1px solid #eee;font-size:12px;text-transform:uppercase\">" + htmlEscape(key) + "</th><td style=\"padding:12px;border-bottom:1px solid #eee;font-size:14px;line-height:1.6\">" + cell + "</td></tr>";
  }).join("");
  return "<table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse\">" + rows + "</table>";
}
function emailShell(title: string, intro: string, body: string) {
  return "<!doctype html><html><body style=\"margin:0;padding:30px 12px;background:#f3f4f6;font-family:Arial,sans-serif;color:#222\"><table role=\"presentation\" width=\"100%\" style=\"max-width:680px;margin:auto;background:#fff;border:1px solid #e5e7eb;border-radius:14px\"><tr><td style=\"padding:24px 30px;background:#111;color:#fff\"><div style=\"color:#f87171;font-size:12px;letter-spacing:3px;font-weight:bold\">ZEHANX TECH</div><h1 style=\"font-size:22px;margin:12px 0 0\">" + title + "</h1></td></tr><tr><td style=\"padding:30px\"><p style=\"font-size:15px;line-height:1.7;color:#555\">" + intro + "</p>" + body + "<p style=\"border-top:1px solid #eee;padding-top:18px;margin-top:28px;color:#999;font-size:12px;line-height:1.6\">AI-assisted preliminary report. Scope, feasibility, pricing and timing are confirmed after human review.</p></td></tr><tr><td style=\"padding:18px 30px;background:#fafafa;color:#888;font-size:12px\">ZehanX Tech · <a href=\"https://zehanxtech.vercel.app\" style=\"color:#888\">zehanxtech.vercel.app</a></td></tr></table></body></html>";
}
function rateLimit(ip: string) {
  const now = Date.now(), item = hits.get(ip);
  if (!item || item.reset < now) { hits.set(ip, { count: 1, reset: now + 60000 }); return true; }
  if (item.count >= 8) return false;
  item.count += 1; return true;
}

async function sendLeadEmail(body: z.infer<typeof Body>) {
  if (!body.consent || !body.name || !body.email || !body.brief) {
    return Response.json({ error: "Name, email, brief and consent are required." }, { status: 400 });
  }

  const user = process.env.GMAIL_USER?.trim();
  const password = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.LEADS_TO_EMAIL?.trim();
  if (!user || !password || !to || user.toLowerCase() !== "zehanxtech@gmail.com" || to.toLowerCase() !== "zehanxtech@gmail.com") {
    console.error("Idea Studio Gmail delivery is not configured for the ZehanX mailbox.");
    return Response.json(
      { error: "Email delivery is not configured yet. Please contact us directly or book a call." },
      { status: 503 },
    );
  }

  const transcript = (body.messages || [])
    .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
    .join("\n\n");
  const briefText = JSON.stringify(body.brief, null, 2);
  try {
    await sendGmailMessages([{
      to,
      replyTo: body.email,
      subject: `New ZehanX project enquiry: ${body.name}`,
      text: [ "New project enquiry from " + body.name, "Email: " + body.email, "WhatsApp: " + (body.whatsapp || "Not supplied"), "", "PROJECT REPORT", briefText, "", "DISCOVERY CONVERSATION", transcript || "No transcript supplied." ].join("\n"),
      html: emailShell("New project enquiry", "A new project discovery report has been submitted through the ZehanX website.",
        "<h3>Contact details</h3><p><strong>Name:</strong> " + htmlEscape(body.name) + "<br><strong>Email:</strong> " + htmlEscape(body.email) + "<br><strong>WhatsApp:</strong> " + htmlEscape(body.whatsapp || "Not supplied") + "</p><h3>AI-prepared project report</h3>" + reportTable(body.brief as Record<string, unknown>) + "<h3>Discovery conversation</h3><div style=\"white-space:pre-wrap;background:#f8f8f8;padding:16px;border-radius:8px;font-size:13px;line-height:1.6\">" + htmlEscape(transcript || "No transcript supplied.") + "</div>"),
    }]);
  } catch (error) {
    console.error("Idea Studio team notification failed:", error instanceof Error ? error.message : "Unknown error");
    return Response.json(
      { error: "We couldn't email your project brief. Please try again or contact us directly." },
      { status: 502 },
    );
  }

  // Email is the primary delivery channel. Database persistence is best-effort,
  // so missing Supabase configuration cannot silently block the enquiry email.
  let saved = false;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && key) {
    try {
      const response = await fetch(`${url.replace(/\/+$/, "")}/rest/v1/idea_studio_leads`, {
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          name: body.name,
          email: body.email,
          whatsapp: body.whatsapp || null,
          brief: body.brief,
          transcript: body.messages || [],
          consent: true,
        }),
        signal: AbortSignal.timeout(10000),
      });
      saved = response.ok;
      if (!response.ok) console.error("Idea Studio database insert failed:", response.status);
    } catch (error) {
      console.error("Idea Studio database insert failed:", error instanceof Error ? error.message : "Unknown error");
    }
  } else {
    console.warn("Idea Studio email sent, but Supabase lead storage is not configured.");
  }

  // A visitor receipt is useful, but it must never undo successful team delivery.
  try {
    await sendGmailMessages([{
      to: body.email,
      subject: "We received your ZehanX project brief",
      text: "Hi " + body.name + ",\n\nThank you for sharing your project with ZehanX Tech. Your report has reached our team and will be reviewed.\n\n" + briefText + "\n\nSchedule a conversation: https://cal.com/zehanx-technologies-official",
      html: emailShell("We received your project brief", "Hi " + htmlEscape(body.name) + ", thank you for telling us about your project. Your report has reached our team and will be reviewed.",
        "<h3>Your project report</h3>" + reportTable(body.brief as Record<string, unknown>) + "<p style=\"margin-top:24px;font-size:14px;line-height:1.7\">We will follow up at <strong>" + htmlEscape(body.email) + "</strong> to discuss next steps.</p><p style=\"margin:24px 0\"><a href=\"https://cal.com/zehanx-technologies-official\" style=\"display:inline-block;background:#111;color:#fff;text-decoration:none;padding:13px 18px;border-radius:8px\">Schedule a conversation</a></p>"),
    }]);
  } catch (error) {
    console.error("Idea Studio visitor confirmation failed:", error instanceof Error ? error.message : "Unknown error");
  }

  return Response.json({ emailed: true, saved });
}

export const Route = createFileRoute("/api/idea-studio")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
        if (!rateLimit(ip)) return Response.json({ error: "Please wait a minute before trying again." }, { status: 429 });
        try {
          const body = Body.parse(await request.json());
          if (body.action === "submit") return await sendLeadEmail(body);
          if (!body.messages?.length) return Response.json({ error: "Conversation is required." }, { status: 400 });
          return Response.json(await runIdeaStudio(body.messages));
        } catch (error) {
          if (error instanceof z.ZodError) return Response.json({ error: "Invalid request format." }, { status: 400 });
          if (error instanceof IdeaStudioProviderError) {
            console.error("Idea Studio provider error:", error.message);
            if (error.message.includes("REWIND_API_KEY is not configured")) {
              return Response.json(
                { error: "Idea Studio is not configured yet. The site administrator must add REWIND_API_KEY to the Vercel Production environment and redeploy." },
                { status: 503 },
              );
            }
            if (error.status === 429) {
              return Response.json({ error: "Idea Studio has reached its AI provider limit. Please try again later." }, { status: 429 });
            }
            if (error.status === 401 || error.status === 403) {
              return Response.json(
                { error: "Idea Studio's AI credentials were rejected. The site administrator must verify REWIND_API_KEY in Vercel." },
                { status: 503 },
              );
            }
            return Response.json(
              { error: "The AI provider is temporarily unavailable. Please try again shortly or book a call." },
              { status: error.status && error.status >= 500 ? 502 : 503 },
            );
          }
          console.error("Idea Studio failed:", error instanceof Error ? error.message : "Unknown error");
          return Response.json({ error: "Idea Studio is temporarily unavailable. Please try again or book a call." }, { status: 503 });
        }
      },
    },
  },
});
