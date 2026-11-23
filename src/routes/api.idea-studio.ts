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
async function saveLead(body: z.infer<typeof Body>) {
  if (!body.consent || !body.name || !body.email || !body.brief) return Response.json({ error: "Name, email, brief and consent are required." }, { status: 400 });
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return Response.json({ error: "Lead storage is not configured. Please book a call or contact us directly." }, { status: 503 });
  const row = { name: body.name, email: body.email, whatsapp: body.whatsapp || null, brief: body.brief, transcript: body.messages || [], consent: true };
  const saved = await fetch(`${url.replace(/\/+$/, "")}/rest/v1/idea_studio_leads`, { method: "POST", headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" }, body: JSON.stringify(row), signal: AbortSignal.timeout(10000) });
  if (!saved.ok) { console.error("Idea Studio database insert failed:", saved.status); return Response.json({ error: "We couldn't save your brief. Please book a call instead." }, { status: 502 }); }
  const mailKey = process.env.RESEND_API_KEY, to = process.env.LEADS_TO_EMAIL, from = process.env.LEADS_FROM_EMAIL;
  if (mailKey && to && from) {
    const mail = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${mailKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from, to: [to], subject: `New ZehanX project enquiry: ${body.name}`, text: `Name: ${body.name}\nEmail: ${body.email}\nWhatsApp: ${body.whatsapp || "Not supplied"}\n\nBrief:\n${JSON.stringify(body.brief, null, 2)}` }), signal: AbortSignal.timeout(10000) });
    if (!mail.ok) console.error("Idea Studio notification email failed:", mail.status);
    const visitorCopy = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${mailKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from, to: [body.email], subject: "Your ZehanX project brief", text: `Hi ${body.name},\n\nThanks for sharing your idea with ZehanX Tech. Your AI-prepared draft is preliminary; our team will review the scope and confirm the quote within 24 working hours.\n\n${JSON.stringify(body.brief, null, 2)}\n\nBook a call: https://cal.com/zehanx-technologies-official` }), signal: AbortSignal.timeout(10000) });
    if (!visitorCopy.ok) console.error("Idea Studio visitor confirmation failed:", visitorCopy.status);
  }
  return Response.json({ saved: true });
}
export const Route = createFileRoute("/api/idea-studio")({
  server: { handlers: { POST: async ({ request }) => {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!rateLimit(ip)) return Response.json({ error: "Please wait a minute before trying again." }, { status: 429 });
    try {
      const body = Body.parse(await request.json());
      if (body.action === "submit") return await saveLead(body);
      if (!body.messages?.length) return Response.json({ error: "Conversation is required." }, { status: 400 });
      return Response.json(await runIdeaStudio(body.messages));
    } catch (error) {
      if (error instanceof z.ZodError) return Response.json({ error: "Invalid request format." }, { status: 400 });
      console.error("Idea Studio failed:", error instanceof Error ? error.message : "Unknown error");
      return Response.json({ error: "Idea Studio is temporarily unavailable. Please book a call or contact us." }, { status: 503 });
    }
  } } },
});
