import { useEffect, useRef, useState } from "react";
import { site, contact } from "./content";

type Msg = {
  role: "user" | "alvy";
  text: string; // what the visitor sees
  raw?: string; // what the model said, kept for history
  notice?: boolean; // local message, never sent to the model
  booking?: boolean; // show the calendar picker under this message
};

const COPY = {
  limit: "That is as far as I can take this one. For anything more, book a 30 minute strategy call or send a note through the form below.",
  rate: "You are moving faster than I can keep up. Give it a minute and try again.",
  busy: "Something went wrong on my end. Try again in a moment, or use the form below and a person will follow up.",
};

const MARKER = /\[\[BOOK\s+name="([^"]*)"\s+email="([^"]*)"\s+topic="([^"]*)"\s*\]\]/;

// Hide the booking marker, including a half streamed one.
function visibleText(raw: string): string {
  const i = raw.indexOf("[[");
  let t = i === -1 ? raw : raw.slice(0, i);
  if (i === -1 && t.endsWith("[")) t = t.slice(0, -1);
  return t.trimEnd();
}

async function postLead(lead: { name: string; email: string; topic: string }) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return;
  const data = new FormData();
  data.set("name", lead.name);
  data.set("email", lead.email);
  data.set("topic", lead.topic);
  data.set("source", "Alvy chat");
  try {
    await fetch(site.formspree, { method: "POST", body: data, headers: { Accept: "application/json" } });
  } catch {
    /* the picker is already open; a lost lead is not shown to the visitor */
  }
}

function Orb() {
  return (
    <div className="relative mx-auto mb-2.5 h-14 w-14" aria-hidden>
      <div className="relative h-14 w-14 overflow-hidden rounded-full">
        <img src="/img/alvy-orb-final.gif" alt="" width={56} height={56} className="h-full w-full object-cover mix-blend-multiply" />
      </div>
    </div>
  );
}

export default function Alvy() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [limited, setLimited] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  function addAlvy(m: Omit<Msg, "role">) {
    setMessages((prev) => [...prev, { role: "alvy", ...m }]);
  }

  async function ask(history: Msg[]) {
    const body = JSON.stringify({
      messages: history.filter((m) => !m.notice).map((m) => ({ role: m.role === "alvy" ? "assistant" : "user", content: m.raw ?? m.text })),
    });
    let raw = "";
    let started = false;
    try {
      const res = await fetch("/api/alvy", { method: "POST", headers: { "content-type": "application/json" }, body });
      if (!res.ok || !res.body) {
        let code = "";
        try { code = (await res.json()).error ?? ""; } catch { /* no body */ }
        if (res.status === 429 && code === "conversation_limit") {
          setLimited(true);
          addAlvy({ text: COPY.limit, notice: true });
        } else if (res.status === 429) {
          addAlvy({ text: COPY.rate, notice: true });
        } else {
          addAlvy({ text: COPY.busy, notice: true });
        }
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        raw += decoder.decode(value, { stream: true });
        const text = visibleText(raw);
        if (!text) continue;
        if (!started) {
          started = true;
          setThinking(false);
          setMessages((prev) => [...prev, { role: "alvy", text, raw }]);
        } else {
          setMessages((prev) => [...prev.slice(0, -1), { role: "alvy", text, raw }]);
        }
      }
      raw += decoder.decode();
      const found = raw.match(MARKER);
      const wantsBooking = raw.includes("[[BOOK");
      if (!raw.trim()) {
        addAlvy({ text: COPY.busy, notice: true });
      } else if (wantsBooking) {
        const text = visibleText(raw);
        setThinking(false);
        setMessages((prev) => {
          const m: Msg = { role: "alvy", text, raw, booking: true };
          return started ? [...prev.slice(0, -1), m] : [...prev, m];
        });
        void postLead({ name: found?.[1] ?? "", email: found?.[2] ?? "", topic: found?.[3] ?? "" });
      }
    } catch {
      addAlvy({ text: COPY.busy, notice: true });
    } finally {
      setThinking(false);
    }
  }

  async function send(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || thinking || limited) return;
    const next = [...messages, { role: "user", text } as Msg];
    setMessages(next);
    setInput("");
    setThinking(true);
    await ask(next);
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
    <section id="contact" className="surface-soft relative overflow-hidden py-16">
      <div className="container-x relative max-w-4xl text-center">
        <Orb />
        <h2 className="relative text-[32px] font-bold leading-[1.1] tracking-tight">
          <span className="grad-text-alvy">Hi, I'm Alvy</span>
        </h2>
        <p className="relative mt-2 text-[15px] text-slate">Your AI assistant for scheduling free strategy sessions</p>

        {/* Gradient bordered chat panel */}
        <div className="grad-live mt-8 rounded-[22px] p-[3px] shadow-[0_30px_80px_-30px_rgba(37,99,235,0.45)]">
          <div className="flex h-[60vh] flex-col overflow-hidden rounded-[20px] bg-gradient-to-b from-white to-mist md:h-[520px]">
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
                <div key={i} className="space-y-3">
                  {m.text && (
                    <div className={"flex " + (m.role === "user" ? "justify-end" : "justify-start")}>
                      <div className={
                        "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm " +
                        (m.role === "user" ? "rounded-br-md bg-blue text-white" : "rounded-bl-md border border-line bg-white text-ink")
                      }>
                        {m.text}
                      </div>
                    </div>
                  )}
                  {m.booking && (
                    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
                      <iframe src={site.bookingUrl} title="Book a 30 minute call with Mark" loading="lazy" className="h-[420px] w-full" />
                    </div>
                  )}
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
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Alvy..."
                className="flex-1 rounded-xl border border-line bg-mist px-4 py-3 text-sm outline-none transition focus:border-blue focus:bg-white focus:ring-2 focus:ring-blue/20"
                aria-label="Message Alvy"
                disabled={limited}
              />
              <button type="submit" disabled={!input.trim() || thinking || limited} className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue to-violet text-white shadow-md transition hover:scale-105 disabled:opacity-50" aria-label="Send">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
              </button>
            </form>
          </div>
        </div>
        <p className="mt-3 text-xs text-slate/70">Alvy is an AI agent built by Applied AI Consulting Group. It schedules calls and answers questions about our services. It does not give advice.</p>

        {/* Single tier: booking first, form as a quiet text link */}
        <div className="mx-auto mt-8 max-w-2xl text-center">
          <h3 className="text-lg font-bold text-ink">{contact.bookHeading}</h3>
          <p className="mt-1 text-base text-slate">{contact.bookSub}</p>
          <div className="mt-4 flex justify-center">
            <a href={site.bookingUrl} target="_blank" rel="noreferrer" className="btn-primary">Pick a time on the calendar →</a>
          </div>
          <div className="mt-5">
            <button type="button" onClick={() => setFormOpen(!formOpen)} aria-expanded={formOpen} className="mx-auto inline-flex flex-col items-center text-gray-500 transition-colors hover:text-blue">
              <span className="inline-flex items-center gap-1.5 text-base font-medium">
                Or Fill Out This Form
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={"transition " + (formOpen ? "rotate-180" : "")}><path d="M6 9l6 6 6-6" /></svg>
              </span>
              <span className="text-sm">{contact.formSub}</span>
            </button>
          </div>
          {formOpen && (
            <form onSubmit={onSubmit} className="card anim-rise mx-auto mt-6 max-w-2xl text-left">
              <h3 className="text-2xl font-bold text-ink">{contact.formHeading}</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <input name="name" required placeholder="Full name" className="rounded-xl border border-line px-4 py-3 text-sm outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/20" />
                <input name="email" type="email" required placeholder="Work email" className="rounded-xl border border-line px-4 py-3 text-sm outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/20" />
                <input name="company" placeholder="Company" className="rounded-xl border border-line px-4 py-3 text-sm outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/20 sm:col-span-2" />
                <textarea name="message" required rows={4} placeholder="What are you trying to get done?" className="rounded-xl border border-line px-4 py-3 text-sm outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/20 sm:col-span-2" />
                {status === "sent" ? (
                  <p role="status" className="text-base font-medium text-ink sm:col-span-2">Thank you. Your message has been received and we will be in touch.</p>
                ) : (
                  <button type="submit" disabled={status === "sending"} className="btn-primary sm:col-span-2 disabled:opacity-60">
                    {status === "sending" ? "Sending" : "Send message →"}
                  </button>
                )}
                {status === "error" && <p className="text-sm text-red-600 sm:col-span-2">Something went wrong. Email us at {site.email}.</p>}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
