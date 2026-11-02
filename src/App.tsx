import { useState } from "react";
import HeroArt from "./HeroArt";
import { site, nav, hero, imperative, services, approach, process, growth, contact, testimonials, faq, footer } from "./content";

// Flip to true once Nina Flax, Nicole Ornelas, and Tony Bridwell have signed off on their quotes.
const SHOW_PENDING_TESTIMONIALS = false;

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <img src="/mark.png" alt="" className="h-9 w-auto" />
          <span className="text-base font-bold tracking-tight text-navy">{site.name}</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-slate hover:text-navy">{n.label}</a>
          ))}
          <a href="#contact" className="btn-primary px-5 py-2">Book a call</a>
        </nav>
        <button className="md:hidden rounded-md p-2 text-navy" aria-label="Open menu" onClick={() => setOpen(!open)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-line bg-white md:hidden">
          <div className="container-x flex flex-col gap-4 py-4">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="text-base font-medium text-navy">{n.label}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary w-full">Book a call</a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="bg-gradient-to-b from-mist to-white">
      <div className="container-x grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-navy sm:text-5xl lg:text-6xl">
            {hero.lines[0]}<br />{hero.lines[1]}<br /><span className="text-brand">{hero.lines[2]}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate">{hero.sub}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn-primary">{hero.primary}</a>
            <a href="#process" className="btn-ghost">{hero.secondary} →</a>
          </div>
          <p className="mt-10 max-w-xl text-sm text-slate">{hero.trust}</p>
        </div>
        <div className="md:pl-6"><HeroArt /></div>
      </div>
    </section>
  );
}

function Imperative() {
  return (
    <section id="approach" className="py-20">
      <div className="container-x max-w-3xl">
        <span className="eyebrow">{imperative.eyebrow}</span>
        <p className="mt-6 text-xl leading-relaxed text-ink"><span className="font-semibold text-brand-deep">Most companies now own more AI than they use.</span> {imperative.p1.replace("Most companies now own more AI than they use. ", "")}</p>
        <p className="mt-6 text-xl leading-relaxed text-ink">{imperative.p2}</p>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-mist py-20">
      <div className="container-x">
        <span className="eyebrow">{services.eyebrow}</span>
        <h2 className="h2 text-navy">{services.heading}</h2>
        <p className="lead">{services.intro}</p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.cards.map((c, i) => (
            <article key={c.title} className="card flex flex-col">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">{i + 1}</span>
                <span className="text-xs font-semibold tracking-widest text-brand-deep">{c.tag}</span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-navy">{c.title}</h3>
              <p className="mt-3 text-slate">{c.what}</p>
              <p className="mt-5 text-sm text-slate"><span className="font-semibold text-navy">Ideal for: </span>{c.ideal}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section className="py-20">
      <div className="container-x grid gap-12 md:grid-cols-5">
        <div className="md:col-span-3">
          <span className="eyebrow">{approach.eyebrow}</span>
          <h2 className="h2 text-navy">{approach.heading}</h2>
          <p className="lead">{approach.body}</p>
          <div id="results" className="mt-10 rounded-2xl border border-line bg-mist p-6">
            <span className="text-xs font-semibold tracking-widest text-brand-deep">{approach.resultsEyebrow}</span>
            <p className="mt-2 text-lg font-medium text-navy">{approach.results}</p>
          </div>
        </div>
        <aside className="card md:col-span-2 self-start">
          <p className="text-xs font-semibold tracking-widest text-brand-deep">LED BY</p>
          <h3 className="mt-2 text-2xl font-bold text-navy">{approach.bioTitle}</h3>
          <p className="text-sm font-medium text-slate">{approach.bioRole}</p>
          <p className="mt-4 text-sm leading-relaxed text-slate">{approach.bio}</p>
          <a href={site.linkedinMark} className="mt-5 inline-block text-sm font-semibold text-brand hover:underline" target="_blank" rel="noreferrer">Connect on LinkedIn →</a>
        </aside>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="bg-navy py-20 text-white">
      <div className="container-x">
        <span className="eyebrow bg-white/10 text-white">{process.eyebrow}</span>
        <h2 className="h2 text-white">{process.heading}</h2>
        <p className="lead text-white/75">{process.intro}</p>
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {process.steps.map((s) => (
            <div key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-3xl font-extrabold text-brand">{s.n}</div>
              <h3 className="mt-3 text-xl font-bold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Growth() {
  return (
    <section className="py-20">
      <div className="container-x">
        <span className="eyebrow">{growth.eyebrow}</span>
        <h2 className="h2 text-navy">{growth.heading}</h2>
        <p className="lead">{growth.intro}</p>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {growth.steps.map((s, i) => (
            <li key={s.title} className="card">
              <span className="text-xs font-semibold tracking-widest text-brand-deep">STEP {i + 1}</span>
              <h3 className="mt-3 text-xl font-bold text-navy">{s.title}</h3>
              <p className="mt-3 text-slate">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
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
    <section id="contact" className="bg-mist py-20">
      <div className="container-x grid gap-10 md:grid-cols-2">
        <div className="card">
          <h2 className="text-2xl font-bold text-navy">{contact.bookHeading}</h2>
          <p className="mt-2 text-slate">{contact.bookSub}</p>
          <div className="mt-6 flex min-h-64 items-center justify-center rounded-xl border border-dashed border-line bg-mist text-sm text-slate">
            Calendar booking embed goes here (Google Workspace appointment schedule).
          </div>
        </div>
        <form onSubmit={onSubmit} className="card">
          <h2 className="text-2xl font-bold text-navy">{contact.formHeading}</h2>
          <p className="mt-2 text-slate">{contact.formSub}</p>
          <div className="mt-6 grid gap-4">
            <input name="name" required placeholder="Full name" className="rounded-lg border border-line px-4 py-3 text-sm outline-none focus:border-brand" />
            <input name="email" type="email" required placeholder="Work email" className="rounded-lg border border-line px-4 py-3 text-sm outline-none focus:border-brand" />
            <input name="company" placeholder="Company" className="rounded-lg border border-line px-4 py-3 text-sm outline-none focus:border-brand" />
            <textarea name="message" required rows={4} placeholder="What are you trying to get done?" className="rounded-lg border border-line px-4 py-3 text-sm outline-none focus:border-brand" />
            <button type="submit" disabled={status === "sending" || status === "sent"} className="btn-primary disabled:opacity-60">
              {status === "sent" ? "Sent" : status === "sending" ? "Sending" : "Send"}
            </button>
            {status === "error" && <p className="text-sm text-red-600">Something went wrong. Email us at {site.email}.</p>}
          </div>
        </form>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = testimonials.items.filter((t) => SHOW_PENDING_TESTIMONIALS || !t.pending);
  return (
    <section className="py-20">
      <div className="container-x">
        <span className="eyebrow">{testimonials.eyebrow}</span>
        <h2 className="h2 text-navy">{testimonials.heading}</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <figure key={t.name} className="card flex flex-col">
              <blockquote className="flex-1 text-slate">“{t.quote}”</blockquote>
              <figcaption className="mt-6">
                <div className="font-semibold text-navy">{t.name}</div>
                <div className="text-sm text-slate">{t.title}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="bg-mist py-20">
      <div className="container-x max-w-3xl">
        <h2 className="h2 mt-0 text-navy">Frequently asked questions</h2>
        <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-white">
          {faq.map((f) => (
            <details key={f.q} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-navy">
                {f.q}
                <span className="ml-4 text-brand transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-slate">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <div className="container-x grid gap-8 md:grid-cols-3">
        <div>
          <img src="/logo.png" alt="Applied AI Consulting Group" className="h-14 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-slate">{footer.tagline}</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-navy">Contact</p>
          <a href={`mailto:${site.email}`} className="mt-2 block text-slate hover:text-navy">{site.email}</a>
          <p className="mt-2 text-slate">{footer.location}</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-navy">Links</p>
          <a href={site.linkedinCompany} target="_blank" rel="noreferrer" className="mt-2 block text-slate hover:text-navy">Applied AI Consulting Group on LinkedIn</a>
          <a href={site.linkedinMark} target="_blank" rel="noreferrer" className="mt-2 block text-slate hover:text-navy">Mark Alvarez on LinkedIn</a>
          <a href="/privacy.html" className="mt-2 block text-slate hover:text-navy">Privacy policy</a>
        </div>
      </div>
      <div className="container-x mt-10 text-xs text-slate">© {new Date().getFullYear()} Applied AI Consulting Group. All rights reserved.</div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Imperative />
        <Services />
        <Approach />
        <Process />
        <Growth />
        <Contact />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
