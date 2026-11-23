import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { runIdeaStudio } from "@/lib/ai/rewind";

const Body = z.object({
  action: z.enum(["chat", "submit"]).default("chat"),
  messages: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1).max(1600) })).max(16).optional(),
  brief: z.record(z.string(), z.unknown()).optional(),
  name: z.string().trim().min(2).max(100).optional(),
  email: z.string().email().max(200).optional(),
  whatsapp: z.string().trim().max(40).optional(),
  consent: z.literal(true).optional(),
});
const hits = new Map<string, { count: number; reset: number }>();
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

  const mailKey = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_TO_EMAIL;
  const from = process.env.LEADS_FROM_EMAIL;
  if (!mailKey || !to || !from) {
    console.error("Idea Studio email delivery is not configured.");
    return Response.json(
      { error: "Email delivery is not configured yet. Please contact us directly or book a call." },
      { status: 503 },
    );
  }

  const transcript = (body.messages || [])
    .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
    .join("\n\n");
  const briefText = JSON.stringify(body.brief, null, 2);
  const mail = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${mailKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: body.email,
      subject: `New ZehanX project enquiry: ${body.name}`,
      text: [
        "NEW ZEHANX TECH PROJECT ENQUIRY",
        "",
        `Name: ${body.name}`,
        `Email: ${body.email}`,
        `WhatsApp: ${body.whatsapp || "Not supplied"}`,
        "",
        "AI-PREPARED PROJECT BRIEF",
        briefText,
        "",
        "DISCOVERY CONVERSATION",
        transcript || "No transcript supplied.",
      ].join("\n"),
    }),
    signal: AbortSignal.timeout(15000),
  });
  if (!mail.ok) {
    const detail = await mail.text().catch(() => "");
    console.error("Idea Studio team notification failed:", mail.status, detail.slice(0, 300));
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
    const receipt = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${mailKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [body.email],
        subject: "We received your ZehanX project brief",
        text: `Hi ${body.name},\n\nThanks for sharing your project with ZehanX Tech. We have received your brief and will review it. The AI-generated plan is preliminary; scope, pricing and delivery are confirmed after a human review.\n\n${briefText}\n\nBook a call: https://cal.com/zehanx-technologies-official`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!receipt.ok) console.error("Idea Studio visitor confirmation failed:", receipt.status);
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
          console.error("Idea Studio failed:", error instanceof Error ? error.message : "Unknown error");
          return Response.json({ error: "Idea Studio is temporarily unavailable. Please try again or book a call." }, { status: 503 });
        }
      },
    },
  },
});
