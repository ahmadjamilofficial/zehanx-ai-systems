import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowUp, Check, RotateCcw, Sparkles } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };
type Brief = {
  projectType: string;
  summary: string;
  features: string[];
  risks: string[];
  urgency: string;
  budgetBand: string;
  dataReadiness: string;
};
const greeting: Message = {
  role: "assistant",
  content: "Hi. I'm the ZehanX project assistant. Tell me what you're thinking of building, what isn't working today, or what you'd like to improve. I'll explore the idea with you, ask relevant follow-up questions one at a time, and turn our conversation into a clear project brief.\n\nWhere would you like to start?"
};

function Report({ brief }: { brief: Brief }) {
  return (
    <article className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#171717]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-xs text-white/60">
        <Sparkles size={14} className="text-red-400" />
        <span>ZEHANX PROJECT REPORT</span>
        <span className="ml-auto rounded-full border border-white/10 px-2 py-1 text-[10px]">AI DRAFT</span>
      </div>
      <div className="space-y-5 p-4 sm:p-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">Project direction</p>
          <h3 className="mt-2 text-lg font-semibold capitalize text-white">{brief.projectType.replaceAll("-", " ")}</h3>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-white/75">{brief.summary}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">Potential capabilities</p>
          <ul className="mt-2 space-y-2">{brief.features.map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-white/75"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />{item}</li>)}</ul>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><p className="text-[11px] uppercase tracking-[0.18em] text-white/40">Timing</p><p className="mt-2 text-sm text-white/75">{brief.urgency}</p></div>
          <div><p className="text-[11px] uppercase tracking-[0.18em] text-white/40">Budget indication</p><p className="mt-2 text-sm text-white/75">{brief.budgetBand}</p></div>
          <div className="sm:col-span-2"><p className="text-[11px] uppercase tracking-[0.18em] text-white/40">Data and integrations</p><p className="mt-2 text-sm leading-6 text-white/75">{brief.dataReadiness}</p></div>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">Open questions and risks</p>
          <ul className="mt-2 space-y-2">{brief.risks.map((item) => <li key={item} className="text-sm leading-6 text-white/60">• {item}</li>)}</ul>
        </div>
        <p className="border-t border-white/10 pt-4 text-xs leading-5 text-white/40">This is an initial discovery report, not a binding quote or delivery commitment. Our team will validate scope, feasibility, pricing and timing with you.</p>
      </div>
    </article>
  );
}

export function IdeaStudio() {
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [input, setInput] = useState("");
  const [brief, setBrief] = useState<Brief | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy, brief]);

  function resizeInput() {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 180) + "px";
  }

  async function sendMessage(value = input) {
    const content = value.trim();
    if (!content || busy || brief) return;
    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/idea-studio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "chat", messages: next })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "I couldn't complete that response. Please try again.");
      setMessages([...next, { role: "assistant", content: data.reply }]);
      if (data.complete && data.brief) setBrief(data.brief);
    } catch (err) {
      setError(err instanceof Error ? err.message : "The assistant is temporarily unavailable.");
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  }

  async function submitReport(event: FormEvent) {
    event.preventDefault();
    if (!brief || !consent || busy || sent) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/idea-studio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "submit", messages, brief, name, email, consent: true })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "We couldn't send your report. Please try again.");
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn't send your report.");
    } finally {
      setBusy(false);
    }
  }

  function startOver() {
    setMessages([greeting]);
    setBrief(null);
    setInput("");
    setError("");
    setSent(false);
    setName("");
    setEmail("");
    setConsent(false);
  }

  return (
    <main className="min-h-[100svh] bg-[#212121] text-[#ececec]">
      <div className="mx-auto flex min-h-[100svh] w-full max-w-4xl flex-col px-3 sm:px-6">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#212121]/95 py-3 backdrop-blur sm:py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10"><Sparkles size={17} /></div>
            <div className="min-w-0"><h1 className="truncate text-sm font-semibold">ZehanX Project Assistant</h1><p className="text-xs text-white/45">Project discovery · AI assistant</p></div>
          </div>
          <button type="button" onClick={startOver} className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-white/60 transition hover:bg-white/10 hover:text-white"><RotateCcw size={14} /><span className="hidden sm:inline">New conversation</span></button>
        </header>

        <section ref={scrollRef} className="flex-1 space-y-7 overflow-y-auto py-7 sm:py-10" aria-label="Conversation" aria-live="polite">
          {messages.map((message, index) => (
            <div key={index} className={message.role === "user" ? "flex justify-end" : "flex items-start gap-3 sm:gap-4"}>
              {message.role === "assistant" && <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10"><Sparkles size={15} /></div>}
              <div className={message.role === "user" ? "max-w-[88%] rounded-3xl bg-[#303030] px-4 py-3 text-sm leading-7 sm:max-w-[80%] sm:px-5" : "min-w-0 max-w-[calc(100%-44px)] flex-1 pt-1 text-sm leading-7 text-white/85 sm:text-[15px]"}>
                <p className="whitespace-pre-wrap">{message.content}</p>
                {brief && index === messages.length - 1 && <Report brief={brief} />}
              </div>
            </div>
          ))}
          {busy && <div className="flex items-start gap-3 sm:gap-4"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10"><Sparkles size={15} /></div><div className="flex items-center gap-2 pt-2 text-sm text-white/50"><span className="flex gap-1"><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:-0.2s]" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:-0.1s]" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60" /></span><span>Thinking</span></div></div>}
          {brief && <div className="ml-11 max-w-2xl">
            {sent ? <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200"><Check size={17} /> Your report has been sent. ZehanX Tech will review it and reply to {email}.</div> :
              <form onSubmit={submitReport} className="space-y-3 rounded-2xl border border-white/10 bg-[#171717] p-4 sm:p-5">
                <p className="text-sm font-medium">Where should we send your project report?</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input required minLength={2} maxLength={100} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" className="min-w-0 rounded-xl border border-white/10 bg-[#242424] px-3 py-3 text-sm outline-none transition focus:border-white/30" />
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" autoComplete="email" className="min-w-0 rounded-xl border border-white/10 bg-[#242424] px-3 py-3 text-sm outline-none transition focus:border-white/30" />
                </div>
                <label className="flex items-start gap-2 text-xs leading-5 text-white/50"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required className="mt-1 accent-red-500" /><span>I agree to the <a href="/privacy" className="underline underline-offset-2">Privacy Policy</a> and consent to ZehanX Tech receiving this conversation and project report.</span></label>
                <button type="submit" disabled={busy || !consent} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/85 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto">Send report to ZehanX <ArrowUp size={15} /></button>
              </form>}
          </div>}
          {error && <div role="alert" className="ml-11 rounded-xl border border-red-400/20 bg-red-400/5 p-3 text-sm text-red-200">{error}</div>}
        </section>

        {!brief && <div className="sticky bottom-0 bg-gradient-to-t from-[#212121] via-[#212121] to-transparent pb-4 pt-3 sm:pb-6">
          <form onSubmit={(event) => { event.preventDefault(); void sendMessage(); }} className="rounded-3xl border border-white/10 bg-[#303030] p-2 shadow-2xl transition focus-within:border-white/20">
            <label htmlFor="idea-message" className="sr-only">Message the ZehanX project assistant</label>
            <textarea ref={inputRef} id="idea-message" value={input} onChange={(event) => { setInput(event.target.value); resizeInput(); }} onKeyDown={onKeyDown} rows={1} maxLength={1600} placeholder="Describe what you'd like to build…" className="max-h-[180px] min-h-[44px] w-full resize-none bg-transparent px-3 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/40" />
            <div className="flex items-center justify-between px-1 pb-1">
              <span className="px-2 text-[11px] text-white/35">Enter to send · Shift + Enter for a new line</span>
              <button type="submit" aria-label="Send message" disabled={busy || !input.trim()} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition hover:bg-white/80 disabled:cursor-not-allowed disabled:opacity-30"><ArrowUp size={18} /></button>
            </div>
          </form>
          <p className="mt-3 text-center text-[10px] leading-4 text-white/30">Do not share passwords, payment details or sensitive personal information. AI-generated plans are reviewed by our team.</p>
        </div>}
      </div>
    </main>
  );
}
