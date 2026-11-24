import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { sendGmailMessages } from "@/lib/email/gmail";

const Body = z.object({
  projectType: z.string().min(2).max(80),
  projectName: z.string().max(120).optional().default(""),
  outcome: z.string().trim().min(15).max(1800),
  users: z.string().min(2).max(120),
  features: z.array(z.string().min(2).max(120)).min(1).max(12),
  existingSystems: z.string().max(1600).optional().default(""),
  timeline: z.string().min(2).max(100),
  budget: z.string().min(2).max(100),
  name: z.string().trim().min(2).max(100),
  email: z.string().email().max(200),
  whatsapp: z.string().trim().max(40).optional().default(""),
  consent: z.literal(true),
});

const hits = new Map<string, { count: number; reset: number }>();
function rateLimit(ip: string) {
  const now = Date.now();
  const current = hits.get(ip);
  if (!current || current.reset < now) {
    hits.set(ip, { count: 1, reset: now + 60_000 });
    return true;
  }
  if (current.count >= 5) return false;
  current.count += 1;
  return true;
}
function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char] || char);
}
function rows(details: z.infer<typeof Body>) {
  const entries: Array<[string, string]> = [
    ["Contact", details.name],
    ["Email", details.email],
    ["WhatsApp", details.whatsapp || "Not supplied"],
    ["Project type", details.projectType],
    ["Project name", details.projectName || "Not supplied"],
    ["Desired outcome", details.outcome],
    ["Intended users", details.users],
    ["Key capabilities", details.features.join(", ")],
    ["Existing systems / context", details.existingSystems || "Not supplied"],
    ["Timeline", details.timeline],
    ["Budget range", details.budget],
  ];
  return entries.map(([label, value]) =>
    "<tr><th style='padding:12px;text-align:left;vertical-align:top;color:#888;border-bottom:1px solid #292929;font-size:11px;text-transform:uppercase;letter-spacing:1px;width:32%'>" +
    escapeHtml(label) +
    "</th><td style='padding:12px;border-bottom:1px solid #292929;font-size:14px;line-height:1.7;white-space:pre-wrap'>" +
    escapeHtml(value) + "</td></tr>",
  ).join("");
}
function emailHtml(title: string, intro: string, details: z.infer<typeof Body>) {
  return "<!doctype html><html><body style='margin:0;padding:28px 12px;background:#080808;color:#f5f5f5;font-family:Arial,sans-serif'><table role='presentation' width='100%' style='max-width:680px;margin:auto;border:1px solid #333;background:#111'><tr><td style='padding:25px 28px;border-bottom:2px solid #b91c1c'><div style='font-size:11px;letter-spacing:3px;color:#ef4444;font-weight:bold'>ZEHANX TECH</div><h1 style='font-size:23px;margin:12px 0 0;color:#fff'>" + title + "</h1></td></tr><tr><td style='padding:28px'><p style='font-size:14px;line-height:1.8;color:#bbb'>" + intro + "</p><table role='presentation' width='100%' style='border-collapse:collapse;margin-top:20px'>" + rows(details) + "</table><p style='margin-top:26px;font-size:12px;line-height:1.7;color:#888'>Submitted through the ZehanX Tech project planner. Please review and follow up within 24 business hours.</p></td></tr></table></body></html>";
}

export const Route = createFileRoute("/api/project-inquiry")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
        if (!rateLimit(ip)) {
          return Response.json({ error: "Too many submissions. Please wait a minute and try again." }, { status: 429 });
        }
        let details: z.infer<typeof Body>;
        try {
          details = Body.parse(await request.json());
        } catch {
          return Response.json({ error: "Please check the required fields and try again." }, { status: 400 });
        }

        const inbox = "zehanxtech@gmail.com";
        try {
          await sendGmailMessages([{
            to: inbox,
            replyTo: details.email,
            subject: "New project enquiry — " + details.name + (details.projectName ? " / " + details.projectName : ""),
            text: [
              "NEW PROJECT ENQUIRY — ZEHANX TECH",
              "",
              ...[
                ["Name", details.name], ["Email", details.email], ["WhatsApp", details.whatsapp || "Not supplied"],
                ["Project type", details.projectType], ["Project name", details.projectName || "Not supplied"],
                ["Desired outcome", details.outcome], ["Intended users", details.users],
                ["Key capabilities", details.features.join(", ")], ["Existing systems", details.existingSystems || "Not supplied"],
                ["Timeline", details.timeline], ["Budget", details.budget],
              ].map(([label, value]) => label + ": " + value),
              "", "Please review and follow up within 24 business hours.",
            ].join("\n"),
            html: emailHtml("New project enquiry", "A visitor has completed the project planner. Their answers are below.", details),
          }]);
        } catch (error) {
          console.error("Project enquiry email failed:", error instanceof Error ? error.message : "Unknown error");
          return Response.json({ error: "We couldn't send your project details just now. Please try again or email zehanxtech@gmail.com." }, { status: 503 });
        }

        try {
          await sendGmailMessages([{
            to: details.email,
            subject: "We received your project enquiry — ZehanX Tech",
            text: "Hi " + details.name + ",\n\nYour project details have been sent to the ZehanX team. We'll review your requirements and get back to you within 24 business hours.\n\nThank you,\nZehanX Tech",
            html: emailHtml("Your project details are with us.", "Hi " + escapeHtml(details.name) + ", thank you for taking the time to tell us about your project. Your details have been sent to our team. We'll review your requirements and get back to you within <strong style='color:#fff'>24 business hours</strong>.", details),
          }]);
        } catch (error) {
          console.error("Project enquiry receipt email failed:", error instanceof Error ? error.message : "Unknown error");
        }

        return Response.json({ received: true });
      },
    },
  },
});
