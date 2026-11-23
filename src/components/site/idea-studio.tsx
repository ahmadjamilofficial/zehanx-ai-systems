import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, LoaderCircle, Mic, Send } from "lucide-react";
import { CAL_URL, WHATSAPP_URL } from "@/lib/site";
import { Reveal } from "./reveal";

type Message = { role: "user" | "assistant"; content: string };
type Brief = { projectType: string; summary: string; features: string[]; risks: string[]; urgency: string; budgetBand: string; dataReadiness: string };
type SpeechResult = { results: ArrayLike<ArrayLike<{ transcript: string }>> };
type SpeechRecognitionLike = { lang: string; onresult: ((event: SpeechResult) => void) | null; onerror: (() => void) | null; start: () => void };
type SpeechRecognitionCtor = new () => SpeechRecognitionLike;
const greeting: Message = { role: "assistant", content: "Tell me what you want to build or improve. I’ll ask a few focused questions about your users, current process, data, budget and timeline, then prepare a project brief." };

export function IdeaStudio() {
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [input, setInput] = useState("");
  const [brief, setBrief] = useState<Brief | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [consent, setConsent] = useState(false);
  const [saved, setSaved] = useState(false);
  const [manual, setManual] = useState(false);
  const [manualGoal, setManualGoal] = useState("");
  const [manualUsers, setManualUsers] = useState("");
  const [manualProcess, setManualProcess] = useState("");
  const [manualData, setManualData] = useState("");
  const [manualBudget, setManualBudget] = useState("Not specified");
  const [manualDeadline, setManualDeadline] = useState("Exploring");
  const [manualOwner, setManualOwner] = useState("");
  const speechRef = useRef<SpeechRecognitionLike | null>(null);
  async function send(e: FormEvent) {
    e.preventDefault(); const value = input.trim();
    if (!value || busy || brief) return;
    const next = [...messages, { role: "user" as const, content: value }];
    setMessages(next); setInput(""); setBusy(true); setError("");
    try {
      const response = await fetch("/api/idea-studio", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "chat", messages: next }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || "Please try again.");
      setMessages([...next, { role: "assistant", content: data.reply }]); if (data.complete && data.brief) setBrief(data.brief);
    } catch (err) { setError(err instanceof Error ? err.message : "Idea Studio is unavailable."); setManual(true); } finally { setBusy(false); }
  }
  function startVoiceInput() {
    const browser = window as Window & { SpeechRecognition?: SpeechRecognitionCtor; webkitSpeechRecognition?: SpeechRecognitionCtor };
    const Speech = browser.SpeechRecognition || browser.webkitSpeechRecognition;
    if (!Speech) { setError("Voice input is not supported in this browser. You can type your idea instead."); return; }
    const recognition = new Speech();
    recognition.lang = navigator.language || "en-US";
    recognition.onresult = (event) => setInput((current) => `${current}${current ? " " : ""}${event.results[0][0].transcript}`);
    recognition.onerror = () => setError("Voice input stopped. Please try again or type your idea.");
    speechRef.current = recognition;
    recognition.start();
  }
  function useManualBrief(e: FormEvent) {
    e.preventDefault();
    setBrief({ projectType: "other", summary: `Goal: ${manualGoal}. Users: ${manualUsers}. Current process: ${manualProcess}. Decision-maker: ${manualOwner || "Not specified"}.`, features: [], risks: ["Technical feasibility and integrations require a scoping review."], urgency: manualDeadline, budgetBand: manualBudget, dataReadiness: manualData || "Not yet assessed; confirm available data during scoping." });
    setMessages([...messages, { role: "user", content: `Manual project brief: ${manualGoal}` }]);
    setManual(false);
  }
  async function submitLead(e: FormEvent) {
    e.preventDefault(); if (!brief || !consent || busy) return; setBusy(true); setError("");
    try {
      const response = await fetch("/api/idea-studio", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "submit", messages, brief, name, email, whatsapp, consent }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || "Unable to submit.");
      setSaved(true);
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to submit your brief."); } finally { setBusy(false); }
  }
  return <section id="idea-studio" className="scroll-mt-20 border-t border-line px-5 py-24 sm:px-6 md:px-10 md:py-32 lg:px-14" aria-labelledby="idea-studio-heading">
    <Reveal><p className="font-pixel text-sm uppercase tracking-widest text-muted-foreground">01 / Idea Studio</p><h2 id="idea-studio-heading" className="mt-6 text-3xl font-medium uppercase tracking-wide md:text-5xl">START WITH AN <span className="font-pixel text-[1.15em]">IDEA</span></h2><p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">Describe the problem. Our AI-assisted discovery flow shapes it into a practical starting brief. No account required.</p></Reveal>
    <Reveal delay={100}><div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="border border-line bg-card/40"><div className="border-b border-line px-5 py-4"><p className="font-pixel text-xs tracking-widest text-muted-foreground">ZEHANX / PROJECT DISCOVERY</p></div>
        <div className="max-h-[420px] space-y-4 overflow-y-auto p-5" aria-live="polite">{messages.map((m,i)=><div key={i} className={m.role==="user"?"ml-8 bg-foreground/10 p-4 text-sm":"mr-8 border border-line p-4 text-sm text-muted-foreground"}><p className="mb-2 font-pixel text-[10px] tracking-widest text-accent">{m.role==="user"?"YOU":"IDEA STUDIO"}</p><p className="leading-relaxed">{m.content}</p></div>)}{busy&&<div className="flex items-center gap-2 text-xs text-muted-foreground"><LoaderCircle size={14} className="animate-spin"/>Thinking through your project…</div>}</div>
        {!brief&&!manual&&<form onSubmit={send} className="flex gap-2 border-t border-line p-4"><label className="sr-only" htmlFor="idea-message">Describe your project</label><textarea id="idea-message" value={input} onChange={e=>setInput(e.target.value)} rows={2} maxLength={1600} placeholder="I want to build…" className="min-w-0 flex-1 resize-y border border-line bg-background px-3 py-3 text-sm outline-none focus:border-accent"/><button type="button" onClick={startVoiceInput} aria-label="Use voice input" className="self-end border border-line p-3 text-foreground"><Mic size={18}/></button><button type="submit" disabled={busy||!input.trim()} aria-label="Send message" className="self-end bg-primary p-3 text-primary-foreground disabled:opacity-40"><Send size={18}/></button></form>}
      </div>
      <div>{brief?<div className="border border-line p-5"><p className="font-pixel text-xs tracking-widest text-accent">PRELIMINARY PROJECT BRIEF</p><h3 className="mt-4 text-xl font-semibold capitalize">{brief.projectType.replaceAll("-"," ")}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{brief.summary}</p><h4 className="mt-5 text-xs font-semibold uppercase tracking-widest">Potential features</h4><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">{brief.features.map(x=><li key={x}>{x}</li>)}</ul><h4 className="mt-5 text-xs font-semibold uppercase tracking-widest">Budget band</h4><p className="mt-2 text-sm text-muted-foreground">{brief.budgetBand}</p><h4 className="mt-5 text-xs font-semibold uppercase tracking-widest">Data readiness</h4><p className="mt-2 text-sm text-muted-foreground">{brief.dataReadiness}</p><h4 className="mt-5 text-xs font-semibold uppercase tracking-widest">Risks and unknowns</h4><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">{brief.risks.map(x=><li key={x}>{x}</li>)}</ul><p className="mt-5 text-xs text-muted-foreground">Budget and timeline are confirmed after scope review. This draft is not a binding quote.</p><p className="mt-4 border-t border-line pt-4 text-xs text-muted-foreground">AI-prepared draft. A member of our team confirms the quote within 24 working hours.</p>
        {!saved?<form onSubmit={submitLead} className="mt-5 space-y-3"><input required minLength={2} maxLength={100} value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="w-full border border-line bg-background px-3 py-3 text-sm"/><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" className="w-full border border-line bg-background px-3 py-3 text-sm"/><input value={whatsapp} onChange={e=>setWhatsapp(e.target.value)} placeholder="WhatsApp (optional)" className="w-full border border-line bg-background px-3 py-3 text-sm"/><label className="flex gap-2 text-xs text-muted-foreground"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} required/>I agree to the <a href="/privacy" className="text-accent underline">Privacy Policy</a> and consent to this enquiry being sent to ZehanX Tech.</label><button disabled={busy||!consent} className="w-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-40">Send my project brief</button></form>:<p className="mt-5 text-sm text-accent">Your brief has been submitted.</p>}
        <div className="mt-4 flex flex-wrap gap-3 text-sm"><a href={CAL_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-accent">Book a call <ArrowUpRight size={14}/></a><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="text-muted-foreground underline">WhatsApp</a></div>
      </div>:<div className="border border-line p-5"><p className="font-pixel text-xs tracking-widest text-muted-foreground">WHAT WE’LL CLARIFY</p><ul className="mt-4 space-y-3 text-sm text-muted-foreground">{["The outcome you want","Who will use the product","Your current process and tools","Data and integrations available","Budget range and target deadline","Who approves the project"].map(x=><li key={x} className="border-b border-line pb-3">{x}</li>)}</ul><p className="mt-4 text-xs text-muted-foreground">Please do not share passwords, payment details or sensitive personal information.</p></div>}</div>
    </div>
      {manual && !brief && <form onSubmit={useManualBrief} className="mt-6 grid gap-3 border border-line p-5 md:grid-cols-2">
        <p className="font-pixel text-xs tracking-widest text-accent md:col-span-2">MANUAL PROJECT BRIEF / AI FALLBACK</p>
        <label className="text-xs text-muted-foreground">What do you want to achieve?<textarea required value={manualGoal} onChange={e=>setManualGoal(e.target.value)} className="mt-2 w-full border border-line bg-background p-3 text-sm" rows={3}/></label>
        <label className="text-xs text-muted-foreground">Who will use it?<input required value={manualUsers} onChange={e=>setManualUsers(e.target.value)} className="mt-2 w-full border border-line bg-background p-3 text-sm"/></label>
        <label className="text-xs text-muted-foreground">Current process and tools<textarea value={manualProcess} onChange={e=>setManualProcess(e.target.value)} className="mt-2 w-full border border-line bg-background p-3 text-sm" rows={3}/></label>
        <label className="text-xs text-muted-foreground">Available data and integrations<textarea value={manualData} onChange={e=>setManualData(e.target.value)} className="mt-2 w-full border border-line bg-background p-3 text-sm" rows={3}/></label>
        <label className="text-xs text-muted-foreground">Budget band<select value={manualBudget} onChange={e=>setManualBudget(e.target.value)} className="mt-2 w-full border border-line bg-background p-3 text-sm"><option>Not specified</option><option>Under 1k (currency to confirm)</option><option>1k–5k (currency to confirm)</option><option>5k–15k (currency to confirm)</option><option>15k+ (currency to confirm)</option></select></label>
        <label className="text-xs text-muted-foreground">Target deadline<select value={manualDeadline} onChange={e=>setManualDeadline(e.target.value)} className="mt-2 w-full border border-line bg-background p-3 text-sm"><option>Exploring</option><option>Within 1 month</option><option>1–3 months</option><option>3+ months</option><option>Urgent</option></select></label>
        <label className="text-xs text-muted-foreground md:col-span-2">Who approves the project?<input value={manualOwner} onChange={e=>setManualOwner(e.target.value)} className="mt-2 w-full border border-line bg-background p-3 text-sm"/></label>
        <button className="bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground md:col-span-2">Prepare my project brief</button>
      </form>}
      {error&&<p role="alert" className="mt-4 text-sm text-accent">{error}</p>}</Reveal>
  </section>;
}
