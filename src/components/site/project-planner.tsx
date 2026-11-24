import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/site/navbar";

type ProjectDetails = {
  projectType: string;
  projectName: string;
  outcome: string;
  users: string;
  features: string[];
  existingSystems: string;
  timeline: string;
  budget: string;
  name: string;
  email: string;
  whatsapp: string;
};

const INITIAL: ProjectDetails = {
  projectType: "",
  projectName: "",
  outcome: "",
  users: "",
  features: [],
  existingSystems: "",
  timeline: "",
  budget: "",
  name: "",
  email: "",
  whatsapp: "",
};

const STEPS = [
  { label: "PROJECT", title: "What are we building?", note: "Start with the kind of product or system you have in mind." },
  { label: "THE IDEA", title: "What should it achieve?", note: "Describe the problem, opportunity or outcome you want to create." },
  { label: "PEOPLE", title: "Who will use it?", note: "This helps us understand the experience and scale we should plan for." },
  { label: "FUNCTIONALITY", title: "What should it do?", note: "Choose the capabilities that matter most. You can add context later." },
  { label: "TECHNICAL CONTEXT", title: "What do you already have?", note: "Tell us about existing tools, systems, data or integrations. It's okay if you're starting from zero." },
  { label: "PLANNING", title: "What does your timeline look like?", note: "These are planning signals, not commitments or a quote." },
  { label: "YOUR DETAILS", title: "Where can our team reach you?", note: "We'll review your brief and follow up personally." },
];

const PROJECT_TYPES = [
  ["Website", "A company website, landing page or online presence"],
  ["Web application", "A portal, dashboard, SaaS product or customer app"],
  ["Business system", "An internal platform, ERP, CRM or operations tool"],
  ["AI / machine learning", "An AI product, model, agent or intelligent workflow"],
  ["Automation", "Connect tools and remove repetitive manual work"],
  ["Mobile application", "An iOS or Android application"],
  ["Not sure yet", "I have a problem to solve and need guidance"],
];

const FEATURES = [
  "User accounts & dashboards",
  "Payments & subscriptions",
  "Admin panel & reporting",
  "AI assistant or intelligent agents",
  "Third-party API integrations",
  "Workflow automation",
  "Data analytics & visualisation",
  "Mobile-friendly experience",
  "Notifications & messaging",
  "Not sure yet — help me scope it",
];

const TIMELINES = ["As soon as possible", "Within 1 month", "1–3 months", "3–6 months", "Flexible / exploring"];
const BUDGETS = ["Under $750", "Under $1500", "Under $2,500", "$2,500–$5,000", "$5,000–$15,000", "$15,000–$50,000", "$50,000+", "Not sure — advise me"];

function ChoiceCard({ selected, title, description, onClick }: { selected: boolean; title: string; description?: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={selected} className={`group flex w-full items-start gap-4 border p-4 text-left transition-colors sm:p-5 ${selected ? "border-accent bg-accent/10" : "border-line bg-card hover:border-foreground/30"}`}>
      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border ${selected ? "border-accent bg-accent text-white" : "border-foreground/30"}`}>{selected && <Check size={13} />}</span>
      <span className="min-w-0">
        <span className="block text-sm font-medium">{title}</span>
        {description && <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{description}</span>}
      </span>
    </button>
  );
}

export function ProjectPlanner() {
  const [step, setStep] = useState(0);
  const [details, setDetails] = useState<ProjectDetails>(INITIAL);
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof ProjectDetails, value: string | string[]) => {
    setDetails((current) => ({ ...current, [key]: value }));
  };
  const toggleFeature = (feature: string) => {
    setDetails((current) => ({
      ...current,
      features: current.features.includes(feature)
        ? current.features.filter((item) => item !== feature)
        : [...current.features, feature],
    }));
  };

  const canContinue = () => {
    if (step === 0) return Boolean(details.projectType);
    if (step === 1) return details.outcome.trim().length >= 15;
    if (step === 2) return Boolean(details.users);
    if (step === 3) return details.features.length > 0;
    if (step === 5) return Boolean(details.timeline && details.budget);
    if (step === 6) return details.name.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email) && consent;
    return true;
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!canContinue() || busy) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/project-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...details, consent: true }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "We couldn't send your project details. Please try again.");
      setSubmitted(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex min-h-[calc(100svh-1px)] w-full max-w-6xl flex-col px-5 pb-12 pt-28 sm:px-8 md:px-12 lg:px-16">
        <div className="mb-10 flex items-center justify-between gap-4">
          <a href="/" aria-label="ZehanX Tech home" className="inline-flex items-center gap-3 text-foreground transition-opacity hover:opacity-70"><Logo size={26} /><span className="font-pixel text-xs tracking-[0.2em] text-muted-foreground">ZEHANX TECH</span></a>
          <span className="font-pixel text-[10px] tracking-widest text-muted-foreground">PROJECT ENQUIRY / 2026</span>
        </div>

        {submitted ? (
          <section className="my-auto grid min-h-[65vh] place-items-center py-12 text-center">
            <div className="max-w-2xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center border border-accent/50 bg-accent/10 text-accent"><CheckCircle2 size={30} /></div>
              <p className="mt-8 font-pixel text-xs tracking-[0.22em] text-accent">SUBMISSION RECEIVED</p>
              <h1 className="mt-5 text-4xl font-medium uppercase leading-[0.98] tracking-wide sm:text-5xl md:text-6xl">YOUR PROJECT<br /><span className="font-pixel text-[1.08em] font-normal">IS IN OUR HANDS.</span></h1>
              <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">Your project details have been sent to the ZehanX team. We'll review your requirements and get back to you within <strong className="font-semibold text-foreground">24 business hours</strong> at {details.email}.</p>
              <p className="mt-3 text-xs text-muted-foreground">No automated pitch. A member of our team will review your brief.</p>
              <a href="/" className="mt-9 inline-flex items-center gap-3 bg-primary px-6 py-3 text-xs font-semibold tracking-widest text-primary-foreground transition-opacity hover:opacity-85">BACK TO HOME <ArrowRight size={15} /></a>
            </div>
          </section>
        ) : (
          <>
            <div className="grid flex-1 grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <p className="font-pixel text-xs uppercase tracking-[0.2em] text-accent">LET'S PLAN SOMETHING</p>
                <h1 className="mt-5 max-w-xl text-4xl font-medium uppercase leading-[0.98] tracking-wide sm:text-5xl xl:text-6xl">A GOOD BUILD<br />STARTS WITH<br /><span className="font-pixel text-[1.08em] font-normal">A CLEAR PLAN.</span></h1>
                <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground">A few focused questions help us understand what you need, who it's for and what success looks like. It takes about 3–5 minutes.</p>
                <div className="mt-10 hidden space-y-4 lg:block">
                  {STEPS.map((item, index) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <span className={`flex h-7 w-7 items-center justify-center border font-pixel text-[10px] ${index === step ? "border-accent bg-accent text-white" : index < step ? "border-foreground/30 text-foreground" : "border-line text-muted-foreground"}`}>{index < step ? <Check size={12} /> : String(index + 1).padStart(2, "0")}</span>
                      <span className={`font-pixel text-[10px] tracking-widest ${index === step ? "text-foreground" : "text-muted-foreground"}`}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </aside>

              <section className="min-w-0 border border-line bg-card/40 p-5 sm:p-8 md:p-10" aria-live="polite">
                <div className="mb-8">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-pixel text-[10px] tracking-[0.18em] text-accent">STEP {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}</span>
                    <span className="text-xs tabular-nums text-muted-foreground">{Math.round(((step + 1) / STEPS.length) * 100)}% complete</span>
                  </div>
                  <div className="mt-3 h-1 w-full bg-foreground/10"><div className="h-1 bg-accent transition-all duration-500" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} /></div>
                  <p className="mt-8 font-pixel text-[10px] tracking-[0.18em] text-muted-foreground">{STEPS[step].label}</p>
                  <h2 className="mt-3 text-2xl font-medium uppercase tracking-wide sm:text-3xl">{STEPS[step].title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{STEPS[step].note}</p>
                </div>

                <form onSubmit={step === STEPS.length - 1 ? submit : (event) => { event.preventDefault(); if (canContinue()) setStep((current) => Math.min(current + 1, STEPS.length - 1)); }} className="space-y-3">
                  {step === 0 && (
                    <>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {PROJECT_TYPES.map(([title, description]) => <ChoiceCard key={title} selected={details.projectType === title} title={title} description={description} onClick={() => update("projectType", title)} />)}
                      </div>
                      <label className="block pt-4 text-xs text-muted-foreground" htmlFor="project-name">Project name (optional)</label>
                      <input id="project-name" value={details.projectName} onChange={(event) => update("projectName", event.target.value)} maxLength={120} placeholder="e.g. Customer operations platform" className="w-full border border-line bg-background px-4 py-3 text-sm outline-none transition focus:border-foreground/40" />
                    </>
                  )}

                  {step === 1 && (
                    <label className="block">
                      <span className="sr-only">Describe the project outcome</span>
                      <textarea autoFocus required minLength={15} maxLength={1800} rows={7} value={details.outcome} onChange={(event) => update("outcome", event.target.value)} placeholder="What are you trying to achieve? What problem should this solve? What would a successful result look like?" className="w-full resize-y border border-line bg-background px-4 py-4 text-sm leading-7 outline-none transition placeholder:text-muted-foreground/60 focus:border-foreground/40" />
                      <span className="mt-2 block text-right text-[11px] text-muted-foreground">{details.outcome.length}/1800</span>
                    </label>
                  )}

                  {step === 2 && (
                    <div className="space-y-3">
                      {["Just me / personal use", "My team or employees", "Customers or the public", "Multiple organisations / enterprise", "A mix of these", "Not decided yet"].map((option) => <ChoiceCard key={option} selected={details.users === option} title={option} onClick={() => update("users", option)} />)}
                    </div>
                  )}

                  {step === 3 && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {FEATURES.map((feature) => <ChoiceCard key={feature} selected={details.features.includes(feature)} title={feature} onClick={() => toggleFeature(feature)} />)}
                    </div>
                  )}

                  {step === 4 && (
                    <label className="block">
                      <span className="mb-3 block text-xs text-muted-foreground">Existing software, APIs, databases, spreadsheets, tools or other context (optional)</span>
                      <textarea rows={7} maxLength={1600} value={details.existingSystems} onChange={(event) => update("existingSystems", event.target.value)} placeholder="e.g. We currently use HubSpot, Google Sheets and Stripe. We have an existing website and a PostgreSQL database…" className="w-full resize-y border border-line bg-background px-4 py-4 text-sm leading-7 outline-none transition placeholder:text-muted-foreground/60 focus:border-foreground/40" />
                      <span className="mt-2 block text-right text-[11px] text-muted-foreground">{details.existingSystems.length}/1600</span>
                    </label>
                  )}

                  {step === 5 && (
                    <div className="space-y-7">
                      <div>
                        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Target timeline</p>
                        <div className="grid gap-2 sm:grid-cols-2">{TIMELINES.map((option) => <ChoiceCard key={option} selected={details.timeline === option} title={option} onClick={() => update("timeline", option)} />)}</div>
                      </div>
                      <div>
                        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Estimated project budget (USD)</p>
                        <div className="grid gap-2 sm:grid-cols-2">{BUDGETS.map((option) => <ChoiceCard key={option} selected={details.budget === option} title={option} onClick={() => update("budget", option)} />)}</div>
                      </div>
                    </div>
                  )}

                  {step === 6 && (
                    <div className="space-y-4">
                      <label className="block"><span className="mb-2 block text-xs text-muted-foreground">Full name *</span><input required minLength={2} maxLength={100} autoComplete="name" value={details.name} onChange={(event) => update("name", event.target.value)} placeholder="Your name" className="w-full border border-line bg-background px-4 py-3 text-sm outline-none transition focus:border-foreground/40" /></label>
                      <label className="block"><span className="mb-2 block text-xs text-muted-foreground">Work email *</span><input required type="email" maxLength={200} autoComplete="email" value={details.email} onChange={(event) => update("email", event.target.value)} placeholder="you@company.com" className="w-full border border-line bg-background px-4 py-3 text-sm outline-none transition focus:border-foreground/40" /></label>
                      <label className="block"><span className="mb-2 block text-xs text-muted-foreground">WhatsApp / phone (optional)</span><input type="tel" maxLength={40} autoComplete="tel" value={details.whatsapp} onChange={(event) => update("whatsapp", event.target.value)} placeholder="+1 555 000 0000" className="w-full border border-line bg-background px-4 py-3 text-sm outline-none transition focus:border-foreground/40" /></label>
                      <label className="flex items-start gap-3 border-t border-line pt-5 text-xs leading-5 text-muted-foreground"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1 accent-red-600" /><span>I agree to the <a href="/privacy" className="text-foreground underline underline-offset-2">Privacy Policy</a> and consent to ZehanX Tech using these details to review and respond to my project enquiry.</span></label>
                    </div>
                  )}

                  {error && <p role="alert" className="border border-red-500/30 bg-red-500/5 p-3 text-xs leading-5 text-red-300">{error}</p>}
                  <div className="flex flex-col-reverse justify-between gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
                    <button type="button" disabled={step === 0 || busy} onClick={() => { setError(""); setStep((current) => Math.max(current - 1, 0)); }} className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs tracking-widest text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"><ArrowLeft size={15} /> BACK</button>
                    <button type="submit" disabled={!canContinue() || busy} className="inline-flex items-center justify-center gap-3 bg-primary px-6 py-4 text-xs font-semibold tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-35">{busy ? "SENDING…" : step === STEPS.length - 1 ? "SEND PROJECT DETAILS" : "CONTINUE"} <ArrowRight size={15} /></button>
                  </div>
                </form>
              </section>
            </div>
            <p className="mt-12 border-t border-line pt-5 text-[10px] leading-5 text-muted-foreground">Your answers are used only to review and respond to this enquiry. Please do not include passwords, payment details or sensitive personal information.</p>
          </>
        )}
      </main>
    </div>
  );
}
