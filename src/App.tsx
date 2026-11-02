import { useState } from "react";
import { img } from "./assets";
import Alvy from "./Alvy";
import { site, nav, hero, imperative, services, approach, process, growth, testimonials, faq, footer } from "./content";

// Flip to true once Nina Flax, Nicole Ornelas, and Tony Bridwell have signed off on their quotes.
const SHOW_PENDING_TESTIMONIALS = false;

const clientLogo: Record<string, string> = {
  "Timo Nentwich": img.clientLogos.siemens,
  "Catherine McNealy": img.clientLogos.ccs,
  "Tyler Woychyshyn": img.clientLogos.preparedHero,
  "Nina Flax": img.clientLogos.mayerBrown,
  "Nicole Ornelas": img.clientLogos.lifespace,
  "Dr. Tony Bridwell": img.clientLogos.smuCox,
};
const badge = ["bg-blue", "bg-purple", "bg-mint"];
const tileGrad = [
  "from-blue to-violet",
  "from-purple to-pink",
  "from-blue-deep to-blue",
  "from-violet to-purple",
];

function Floaters({ className = "" }: { className?: string }) {
  return (
    <div className={"pointer-events-none absolute inset-0 " + className} aria-hidden>
      <img src={img.cubeBlue} alt="" className="anim-float absolute left-[6%] top-[12%] w-9" />
      <img src={img.ballPink} alt="" className="anim-float-slow absolute right-[10%] top-[18%] w-7" />
      <img src={img.cubeOrange} alt="" className="anim-float absolute bottom-[14%] right-[22%] w-10 [animation-delay:1.5s]" />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/85 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <img src={img.logoMark} alt="" className="h-9 w-auto" />
          <span className="text-base font-bold tracking-tight text-navy">{site.name}</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-slate transition hover:text-blue">{n.label}</a>
          ))}
          <a href="#contact" className="text-sm font-semibold text-blue">Ask Alvy</a>
          <a href="#contact" className="btn-primary px-5 py-2.5">Book a call</a>
        </nav>
        <button className="rounded-md p-2 text-navy md:hidden" aria-label="Open menu" onClick={() => setOpen(!open)}>
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
    <section id="top" className="hero-bg relative overflow-hidden">
      <div className="ring-orb left-[-10%] top-[10%] h-72 w-72 bg-violet" />
      <div className="ring-orb bottom-[-10%] right-[5%] h-80 w-80 bg-blue" />
      <Floaters />
      <div className="container-x relative grid items-center gap-10 py-16 md:grid-cols-12 md:py-24">
        <div className="anim-rise md:col-span-6">
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-5xl lg:text-6xl">
            {hero.lines[0]}<br />
            <span className="grad-text">{hero.lines[1]}</span><br />
            {hero.lines[2]}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate">{hero.sub}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn-primary">{hero.primary}</a>
            <a href="#process" className="btn-ghost">{hero.secondary} →</a>
          </div>
          <p className="mt-10 max-w-xl text-sm leading-relaxed text-slate">{hero.trust}</p>
        </div>
        <div className="relative md:col-span-6">
          <img src={img.heroIllustration} alt="Isometric illustration of connected AI systems" className="anim-float relative z-10 mx-auto w-full max-w-xl drop-shadow-2xl" />
          <img src={img.floatingAi} alt="" className="anim-float-slow absolute -bottom-6 left-0 w-36 opacity-90 md:-left-8" aria-hidden />
        </div>
      </div>
    </section>
  );
}

function Platforms() {
  return (
    <section className="border-y border-line bg-white py-8">
      <div className="container-x">
        <p className="text-center text-xs font-semibold tracking-widest text-slate">BUILT ON THE PLATFORMS YOU ALREADY RUN</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
          {img.platforms.map((p) => (
            <img key={p.name} src={p.src} alt={p.name} title={p.name} className="h-11 w-auto object-contain opacity-90 transition hover:scale-110 hover:opacity-100" />
          ))}
        </div>
      </div>
    </section>
  );
}

function Imperative() {
  return (
    <section id="approach" className="relative overflow-hidden py-20 md:py-28">
      <div className="container-x grid items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <span className="eyebrow">{imperative.eyebrow}</span>
          <p className="mt-7 text-xl leading-relaxed text-ink md:text-2xl">
            <span className="font-semibold text-purple">Most companies now own more AI than they use.</span>{" "}
            {imperative.p1.replace("Most companies now own more AI than they use. ", "")}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-slate md:text-xl">{imperative.p2}</p>
        </div>
        <div className="relative md:col-span-5">
          <div className="ring-orb right-[-20%] top-[10%] h-64 w-64 bg-violet" />
          <img src={img.strategyIllustration} alt="Illustration of strategic AI transformation" className="anim-float relative mx-auto w-full max-w-md" />
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="surface-soft relative overflow-hidden py-20 md:py-28">
      <Floaters className="opacity-70" />
      <div className="container-x relative text-center">
        <span className="eyebrow">{services.eyebrow}</span>
        <h2 className="h2">Three layers of <span className="grad-text">one system</span></h2>
        <p className="lead mx-auto">{services.intro}</p>
        <div className="mt-14 grid gap-6 text-left md:grid-cols-3">
          {services.cards.map((c, i) => (
            <article key={c.title} className="card flex flex-col">
              <div className={"flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white " + badge[i]}>{i + 1}</div>
              <p className="mt-6 text-xs font-semibold tracking-widest text-slate">{c.tag}</p>
              <h3 className="mt-2 text-xl font-bold text-navy">{c.title}</h3>
              <p className="mt-2 text-sm font-semibold text-navy">What?</p>
              <p className="mt-1 text-slate">{c.what}</p>
              <p className="mt-4 text-sm font-semibold text-navy">Ideal for:</p>
              <p className="mt-1 text-slate">{c.ideal}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="container-x grid items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <span className="eyebrow">{approach.eyebrow}</span>
          <h2 className="h2">Practical, measured, <span className="grad-text">built to be owned by you</span></h2>
          <p className="lead">{approach.body}</p>
          <div id="results" className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-6">
            <span className="text-xs font-semibold tracking-widest text-blue-deep">{approach.resultsEyebrow}</span>
            <p className="mt-2 text-lg font-medium text-navy">{approach.results}</p>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-bold text-navy">{approach.bioTitle}</h3>
            <p className="text-sm font-semibold text-purple">{approach.bioRole}</p>
            <p className="mt-3 text-slate">{approach.bio}</p>
            <a href={site.linkedinMark} className="mt-4 inline-block text-sm font-semibold text-blue hover:underline" target="_blank" rel="noreferrer">Connect with Mark on LinkedIn →</a>
          </div>
        </div>
        <div className="relative mx-auto md:col-span-5">
          <div className="ring-orb left-[-15%] top-[20%] h-72 w-72 bg-blue" />
          <div className="relative">
            <div className="grad-live absolute inset-0 rounded-full blur-md" />
            <img src={img.mark} alt="Mark Alvarez, Founder and Principal Consultant" className="relative m-2 aspect-square w-72 rounded-full object-cover object-top shadow-2xl md:w-80" />
            <img src={img.cubeBlue} alt="" className="anim-float absolute -left-4 top-6 w-10" aria-hidden />
            <img src={img.ballPink} alt="" className="anim-float-slow absolute -right-2 bottom-12 w-7" aria-hidden />
            <img src={img.cubeOrange} alt="" className="anim-float absolute -bottom-4 left-10 w-11 [animation-delay:2s]" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="surface-soft relative overflow-hidden py-20 md:py-28">
      <div className="container-x text-center">
        <span className="eyebrow">{process.eyebrow}</span>
        <h2 className="h2">The <span className="grad-text">4D Framework</span>: from workflow to operating capability</h2>
        <p className="lead mx-auto">{process.intro}</p>
        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {process.steps.map((s, i) => (
            <div key={s.title} className="card text-center">
              <div className={"tile mx-auto bg-gradient-to-br " + tileGrad[i]}>{s.n}</div>
              <h3 className="mt-5 text-xl font-bold text-navy">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{s.body}</p>
            </div>
          ))}
        </div>
        <img src={img.processIllustration} alt="Illustration of the AI implementation process" className="anim-float mx-auto mt-14 w-full max-w-xl" />
      </div>
    </section>
  );
}

function Growth() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <Floaters className="opacity-60" />
      <div className="container-x relative grid items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <span className="eyebrow">{growth.eyebrow}</span>
          <h2 className="h2">From first call to <span className="grad-text">running agent</span></h2>
          <p className="lead">{growth.intro}</p>
          <ol className="mt-10 space-y-5">
            {growth.steps.map((s, i) => (
              <li key={s.title} className="card flex gap-5 p-6">
                <div className={"tile shrink-0 bg-gradient-to-br " + tileGrad[i]}>{i + 1}</div>
                <div>
                  <p className="text-xs font-semibold tracking-widest text-slate">STEP {i + 1}</p>
                  <h3 className="mt-1 text-lg font-bold text-navy">{s.title}</h3>
                  <p className="mt-2 text-slate">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative md:col-span-5">
          <div className="ring-orb right-[-10%] top-[0%] h-72 w-72 bg-pink" />
          <img src={img.alvyOrb} alt="Animated Alvy orb" className="relative mx-auto w-64 mix-blend-multiply md:w-80" />
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = testimonials.items.filter((t) => SHOW_PENDING_TESTIMONIALS || !t.pending);
  return (
    <section className="py-20 md:py-28">
      <div className="container-x text-center">
        <span className="eyebrow">{testimonials.eyebrow}</span>
        <h2 className="h2">What leaders say <span className="grad-text">after the work is done</span></h2>
        <div className="mt-14 grid gap-6 text-left md:grid-cols-3">
          {items.map((t) => (
            <figure key={t.name} className="card flex flex-col">
              {clientLogo[t.name] && <img src={clientLogo[t.name]} alt="" className="mb-5 h-8 w-auto self-start object-contain" />}
              <blockquote className="flex-1 leading-relaxed text-slate">“{t.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div>
                  <div className="font-semibold text-navy">{t.name}</div>
                  <div className="text-sm text-slate">{t.title}</div>
                </div>
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
    <section className="surface-soft py-20 md:py-28">
      <div className="container-x max-w-3xl">
        <h2 className="h2 mt-0 text-center">Frequently asked <span className="grad-text">questions</span></h2>
        <div className="mt-10 divide-y divide-line rounded-2xl border border-line bg-white shadow-sm">
          {faq.map((f) => (
            <details key={f.q} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-navy">
                {f.q}
                <span className="ml-4 text-xl text-blue transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-slate">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-navy py-14 text-white">
      <div className="container-x grid gap-10 md:grid-cols-3">
        <div>
          <img src={img.logoMark} alt="Applied AI Consulting Group" className="h-16 w-auto rounded-md bg-white/95 p-2" />
          <p className="mt-4 max-w-xs text-sm text-white/70">{footer.tagline}</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Let's connect</p>
          <a href={`mailto:${site.email}`} className="mt-2 block text-white/70 hover:text-white">{site.email}</a>
          <p className="mt-2 text-white/70">{footer.location}</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Links</p>
          <a href={site.linkedinCompany} target="_blank" rel="noreferrer" className="mt-2 block text-white/70 hover:text-white">Applied AI Consulting Group on LinkedIn</a>
          <a href={site.linkedinMark} target="_blank" rel="noreferrer" className="mt-2 block text-white/70 hover:text-white">Mark Alvarez on LinkedIn</a>
          <a href="/privacy.html" className="mt-2 block text-white/70 hover:text-white">Privacy policy</a>
        </div>
      </div>
      <div className="container-x mt-10 border-t border-white/10 pt-6 text-xs text-white/50">© {new Date().getFullYear()} Applied AI Consulting Group. All rights reserved.</div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Platforms />
        <Imperative />
        <Services />
        <Approach />
        <Process />
        <Growth />
        <Alvy />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
