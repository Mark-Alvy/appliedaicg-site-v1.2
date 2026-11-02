import { useEffect, useRef, useState } from "react";
import { site, contact } from "./content";

type Msg = { role: "user" | "alvy"; text: string };

// Phase 3 replaces this with a call to the Alvy worker (Claude API + Google Calendar).
async function alvyReply(history: Msg[]): Promise<string> {
  const last = history[history.length - 1]?.text.toLowerCase() ?? "";
  await new Promise((r) => setTimeout(r, 900));
  if (/(book|schedule|call|meeting|time|calendar)/.test(last)) {
    return "Happy to set that up. Pick a slot that works for you on the calendar below the form, or tell me the days and times you prefer and I will pass them to Mark.";
  }
  if (/(price|cost|rate|fee|budget)/.test(last)) {
    return "Engagements are fixed scope with a date and a baseline agreed up front, so pricing follows the scope. The first 30 minute call and the written assessment that follows are free.";
  }
  if (/(service|do you|what can|help with|offer)/.test(last)) {
    return "Three things: designing your AI operating model, building agentic workflows inside the platforms you already run (Claude, Microsoft 365, Copilot Studio), and enabling leadership teams to work with AI daily. Which one is closest to what you are working on?";
  }
  return "Thanks. Tell me a little about the workflow or decision you are trying to improve, and whether you would like to book a 30 minute call with Mark. I can take it from there.";
}

function Orb() {
  return (
    <img src="/img/alvy-orb.gif" alt="" width={360} height={270} className="mx-auto w-44 sm:w-52" aria-hidden />
  );
}

export default function Alvy() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  async function send(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || thinking) return;
    const next = [...messages, { role: "user", text } as Msg];
    setMessages(next);
    setInput("");
    setThinking(true);
    const reply = await alvyReply(next);
    setThinking(false);
    setMessages([...next, { role: "alvy", text: reply }]);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData(e.currentTarget);
    try {
      const r = await fetch(site.formspree, { method: "POST", body: data, headers: { Accept: "application/json" } });
      setStatus(r.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="surface-soft relative overflow-hidden py-16 md:py-28">
      <div className="container-x relative max-w-4xl text-center">
        <Orb />
        <h2 className="h2">
          <span className="grad-text-alvy">Hi, I'm Alvy</span>
        </h2>
        <p className="mt-3 text-base text-slate sm:text-lg">Your AI assistant for scheduling free strategy sessions</p>

        {/* Gradient bordered chat panel */}
        <div className="grad-live mt-8 rounded-[22px] p-[3px] shadow-[0_30px_80px_-30px_rgba(37,99,235,0.45)]">
          <div className="flex h-[380px] flex-col overflow-hidden rounded-[20px] bg-gradient-to-b from-white to-mist sm:h-[420px]">
            <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto px-5 py-5 text-left">
              {messages.length === 0 && !thinking && (
                <div className="flex h-full items-end justify-center pb-2">
                  <div className="flex flex-wrap justify-center gap-2">
                    {["Book a 30 minute call", "What do you help with?", "How does pricing work?"].map((s) => (
                      <button key={s} type="button" onClick={() => { setInput(s); }} className="rounded-full border border-line bg-white px-4 py-2 text-sm text-slate shadow-sm transition hover:border-blue hover:text-blue">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={"flex " + (m.role === "user" ? "justify-end" : "justify-start")}>
                  <div className={
                    "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm " +
                    (m.role === "user" ? "rounded-br-md bg-blue text-white" : "rounded-bl-md border border-line bg-white text-ink")
                  }>
                    {m.text}
                  </div>
                </div>
              ))}
              {thinking && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-line bg-white px-4 py-3 shadow-sm">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-violet" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-blue [animation-delay:0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-pink [animation-delay:0.3s]" />
                  </div>
                </div>
              )}
            </div>
            <form onSubmit={send} className="flex items-center gap-2 border-t border-line/70 bg-white/70 px-3 py-3 backdrop-blur sm:gap-3 sm:px-4">
              <button type="button" title="Attach a file (coming soon)" className="rounded-md p-2 text-slate/60 transition hover:text-slate" aria-label="Attach">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 11.5l-8.5 8.5a5 5 0 0 1-7-7l9-9a3.5 3.5 0 0 1 5 5l-9 9a2 2 0 0 1-3-3l8-8" /></svg>
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Alvy..."
                className="flex-1 rounded-xl border border-line bg-mist px-4 py-3 text-sm outline-none transition focus:border-blue focus:bg-white focus:ring-2 focus:ring-blue/20"
                aria-label="Message Alvy"
              />
              <button type="submit" disabled={!input.trim() || thinking} className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue to-violet text-white shadow-md transition hover:scale-105 disabled:opacity-50" aria-label="Send">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
              </button>
            </form>
          </div>
        </div>
        <p className="mt-3 text-xs text-slate/70">Alvy is an AI agent built by Applied AI Consulting Group. It schedules calls and answers questions about our services. It does not give advice.</p>

        {/* Form toggle */}
        <button type="button" onClick={() => setFormOpen(!formOpen)} className="btn-ghost mt-8 max-w-full gap-4 border border-line bg-white text-center">
          <span>
            <span className="block text-lg font-bold">Or Fill Out This Form</span>
            <span className="block text-sm font-normal text-slate">{contact.formSub}</span>
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={"transition " + (formOpen ? "rotate-180" : "")}><path d="M6 9l6 6 6-6" /></svg>
        </button>

        {formOpen && (
          <form onSubmit={onSubmit} className="card anim-rise mx-auto mt-6 max-w-2xl text-left">
            <h3 className="text-2xl font-bold text-navy">{contact.formHeading}</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <input name="name" required placeholder="Full name" className="rounded-xl border border-line px-4 py-3 text-sm outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/20" />
              <input name="email" type="email" required placeholder="Work email" className="rounded-xl border border-line px-4 py-3 text-sm outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/20" />
              <input name="company" placeholder="Company" className="rounded-xl border border-line px-4 py-3 text-sm outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/20 sm:col-span-2" />
              <textarea name="message" required rows={4} placeholder="What are you trying to get done?" className="rounded-xl border border-line px-4 py-3 text-sm outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/20 sm:col-span-2" />
              {status === "sent" ? (
                <p role="status" className="text-base font-medium text-navy sm:col-span-2">Thank you. Your message has reached Mark and he will be in touch shortly.</p>
              ) : (
                <button type="submit" disabled={status === "sending"} className="btn-primary sm:col-span-2 disabled:opacity-60">
                  {status === "sending" ? "Sending" : "Send message →"}
                </button>
              )}
              {status === "error" && <p className="text-sm text-red-600 sm:col-span-2">Something went wrong. Email us at {site.email}.</p>}
            </div>
          </form>
        )}

        <div className="card mx-auto mt-8 max-w-2xl text-center">
          <h3 className="text-lg font-bold text-navy">{contact.bookHeading}</h3>
          <p className="mt-1 text-sm text-slate">{contact.bookSub}</p>
          <a href={site.bookingUrl} target="_blank" rel="noreferrer" className="btn-primary mt-4 w-full sm:w-auto">Pick a time on the calendar →</a>
        </div>
      </div>
    </section>
  );
}
