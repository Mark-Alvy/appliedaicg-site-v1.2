import { useState } from "react";
import { img } from "./assets";
import Alvy from "./Alvy";
import Reveal from "./Reveal";
import { site, nav, hero, imperative, services, approach, process, growth, testimonials, faq, footer } from "./content";

// Flip to true once Nina Flax, Nicole Ornelas, and Tony Bridwell have signed off on their quotes.
const SHOW_PENDING_TESTIMONIALS = true;

const clientLogo: Record<string, string> = {
  "Timo Nentwich": img.clientLogos.siemens,
  "Catherine McNealy": img.clientLogos.ccs,
  "Tyler Woychyshyn": img.clientLogos.preparedHero,
  "Nina Flax": img.clientLogos.mayerBrown,
  "Nicole Ornelas": img.clientLogos.lifespace,
  "Dr. Tony Bridwell": img.clientLogos.smuCox,
};
const badge = ["bg-blue", "bg-purple", "bg-mint"];
const tileGrad = ["from-blue to-violet", "from-purple to-pink", "from-blue-deep to-blue", "from-violet to-purple"];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/85 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <img src={img.logoMark} alt="" className="h-9 w-auto" />
          <span className="text-sm font-bold tracking-tight text-navy sm:text-base">{site.name}</span>
        </a>
        <nav className="hidden items-center gap-6 lg:flex">
          {nav.slice(0, 3).map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-ink transition hover:text-blue">{n.label}</a>
          ))}
          <a href={site.linkedinCompany} target="_blank" rel="noreferrer" className="text-sm font-medium text-ink transition hover:text-blue">LinkedIn</a>
          <a href="#contact" className="text-sm font-medium text-ink transition hover:text-blue">Contact</a>
          <a href="#contact" className="text-sm font-semibold" style={{ background: "linear-gradient(90deg,#3b82f6,#d946ef,#f472b6)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Ask Alvy</a>
          <a href="#contact" className="rounded-full bg-blue px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-deep">Request a Call</a>
        </nav>
        <button className="rounded-md p-2 text-navy lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open
            ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
            : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>}
        </button>
      </div>
      {open && (
        <div className="border-t border-line bg-white lg:hidden">
          <div className="container-x flex flex-col gap-1 py-3">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium text-navy hover:bg-mist">{n.label}</a>
            ))}
            <a href={site.linkedinCompany} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium text-navy hover:bg-mist">LinkedIn</a>
            <a href="#contact" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-base font-semibold" style={{ background: "linear-gradient(90deg,#3b82f6,#d946ef,#f472b6)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Ask Alvy</a>
            <a href="#contact" onClick={() => setOpen(false)} className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-blue px-5 py-3 text-sm font-semibold text-white">Request a Call</a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="surface-soft relative overflow-hidden">
      <div className="container-x relative grid items-center gap-10 py-14 md:grid-cols-12 md:py-24">
        <div className="anim-rise text-center md:col-span-6 md:text-left">
          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-6xl">
            {hero.lines[0]}<br />
            <span className="grad-text">{hero.lines[1]}</span><br />
            {hero.lines[2]}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate sm:text-lg md:mx-0">{hero.sub}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <a href="#contact" className="btn-primary">{hero.primary}</a>
            <a href="#process" className="btn-ghost">{hero.secondary} →</a>
          </div>
          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-slate md:mx-0">{hero.trust}</p>
        </div>
        <div className="relative md:col-span-6">
          <img src={img.heroIllustration} alt="Isometric illustration of connected AI systems" width={768} height={600} className="anim-float relative z-10 mx-auto w-full max-w-md md:max-w-xl" />
          <img src={img.cubeBlue} alt="" className="anim-orbit absolute left-[4%] top-[8%] hidden w-9 md:block" aria-hidden />
          <img src={img.ballPink} alt="" className="anim-orbit-rev absolute right-[6%] top-[14%] hidden w-7 md:block" aria-hidden />
          <img src={img.cubeOrange} alt="" className="anim-float absolute bottom-[10%] right-[4%] hidden w-10 md:block [animation-delay:1.5s]" aria-hidden />
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
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-5 sm:gap-x-8">
          {img.platforms.map((p) => (
            <img key={p.name} src={p.src} alt={p.name} title={p.name} className="h-9 w-auto object-contain opacity-90 transition hover:scale-110 hover:opacity-100 sm:h-11" />
          ))}
        </div>
      </div>
    </section>
  );
}

function Imperative() {
  return (
    <section id="approach" className="relative overflow-hidden py-16 md:py-28">
      <div className="container-x grid items-center gap-10 md:grid-cols-12">
        <Reveal dir="left" className="md:col-span-7">
          <span className="eyebrow">{imperative.eyebrow}</span>
          <p className="mt-6 text-lg leading-relaxed text-ink sm:text-xl md:text-2xl">
            <span className="font-semibold text-purple">Most companies now own more AI than they use.</span>{" "}
            {imperative.p1.replace("Most companies now own more AI than they use. ", "")}
          </p>
          <p className="mt-6 text-base leading-relaxed text-slate sm:text-lg md:text-xl">{imperative.p2}</p>
        </Reveal>
        <Reveal dir="right" className="relative md:col-span-5">
          <img src={img.strategyIllustration} alt="Illustration of strategic AI transformation" width={932} height={890} className="anim-float relative mx-auto w-full max-w-sm md:max-w-md" />
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="surface-soft relative overflow-hidden py-16 md:py-28">
      <div className="container-x relative text-center">
        <Reveal>
          <span className="eyebrow">{services.eyebrow}</span>
          <h2 className="h2">Three layers of <span className="grad-text">one system</span></h2>
          <p className="lead mx-auto">{services.intro}</p>
        </Reveal>
        <div className="mt-12 grid gap-6 text-left md:grid-cols-3">
          {services.cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 160} className="h-full">
              <article className="card group flex h-full flex-col hover:-translate-y-2 hover:border-blue/40">
                <div className={"flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white shadow-md transition duration-300 group-hover:scale-110 group-hover:rotate-6 " + badge[i]}>{i + 1}</div>
                <p className="mt-6 text-xs font-semibold tracking-widest text-slate">{c.tag}</p>
                <h3 className="mt-2 text-xl font-bold text-navy">{c.title}</h3>
                <p className="mt-2 text-sm font-semibold text-navy">What?</p>
                <p className="mt-1 text-slate">{c.what}</p>
                <p className="mt-4 text-sm font-semibold text-navy">Ideal for:</p>
                <p className="mt-1 text-slate">{c.ideal}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section id="about" className="relative overflow-hidden py-16 md:py-28">
      <div className="container-x grid items-center gap-12 md:grid-cols-12">
        <Reveal dir="left" className="md:col-span-7">
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
        </Reveal>
        <Reveal dir="right" className="relative mx-auto md:col-span-5">
          <div className="relative p-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-50 to-purple-50" />
            <img src={img.mark} alt="Mark Alvarez, Founder and Principal Consultant" width={640} height={773} className="relative aspect-square w-60 rounded-full object-cover object-top shadow-xl ring-4 ring-white sm:w-72 md:w-80" />
            <img src={img.cubeBlue} alt="" className="anim-orbit absolute left-0 top-10 w-9" aria-hidden />
            <img src={img.ballPink} alt="" className="anim-orbit-rev absolute right-2 top-16 w-6" aria-hidden />
            <img src={img.cubeOrange} alt="" className="anim-float absolute bottom-8 right-4 w-9 [animation-delay:2s]" aria-hidden />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="surface-soft relative overflow-hidden py-16 md:py-28">
      <div className="container-x text-center">
        <Reveal>
          <span className="eyebrow">{process.eyebrow}</span>
          <h2 className="h2">The <span className="grad-text">4D Framework</span>: from workflow to operating capability</h2>
          <p className="lead mx-auto">{process.intro}</p>
        </Reveal>
        <Reveal className="relative mt-12">
          <div className="connector absolute left-[12%] right-[12%] top-6 hidden h-0.5 bg-gradient-to-r from-blue via-violet to-pink md:block" aria-hidden />
          <div className="grid gap-6 md:grid-cols-4">
            {process.steps.map((s, i) => (
              <div key={s.title} className="card relative text-center">
                <div className={"tile mx-auto bg-gradient-to-br " + tileGrad[i]}>{s.n}</div>
                <h3 className="mt-5 text-xl font-bold text-navy">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{s.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Growth() {
  return (
    <section className="relative overflow-hidden py-16 md:py-28">
      <div className="container-x relative grid items-center gap-12 md:grid-cols-12">
        <Reveal dir="left" className="md:col-span-7">
          <span className="eyebrow">{growth.eyebrow}</span>
          <h2 className="h2">From first call to <span className="grad-text">running agent</span></h2>
          <p className="lead">{growth.intro}</p>
          <ol className="mt-10 space-y-5">
            {growth.steps.map((s, i) => (
              <li key={s.title} className="card flex gap-4 sm:gap-5">
                <div className={"tile shrink-0 bg-gradient-to-br " + tileGrad[i]}>{i + 1}</div>
                <div>
                  <p className="text-xs font-semibold tracking-widest text-slate">STEP {i + 1}</p>
                  <h3 className="mt-1 text-lg font-bold text-navy">{s.title}</h3>
                  <p className="mt-2 text-slate">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal dir="right" className="relative md:col-span-5">
          <img src={img.processIllustration} alt="Isometric illustration of a team building an AI workflow" width={827} height={662} className="anim-float relative mx-auto w-full max-w-xs md:max-w-sm" />
          <img src={img.cubeBlue} alt="" className="anim-orbit absolute left-[6%] top-[12%] hidden w-8 md:block" aria-hidden />
          <img src={img.cubeOrange} alt="" className="anim-float absolute bottom-[14%] right-[8%] hidden w-9 md:block" aria-hidden />
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = testimonials.items.filter((t) => SHOW_PENDING_TESTIMONIALS || !t.pending);
  return (
    <section className="py-16 md:py-28">
      <div className="container-x text-center">
        <Reveal>
          <span className="eyebrow">{testimonials.eyebrow}</span>
          <h2 className="h2">What leaders say <span className="grad-text">after the work is done</span></h2>
        </Reveal>
        <div className="mt-12 grid gap-6 text-left sm:grid-cols-2 md:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={i * 120} className="h-full">
              <figure className="card flex h-full flex-col">
                {clientLogo[t.name] && <img src={clientLogo[t.name]} alt="" className="mb-5 h-8 w-auto self-start object-contain" />}
                <blockquote className="flex-1 italic leading-relaxed text-slate">“{t.quote}”</blockquote>
                <figcaption className="mt-6">
                  <div className="font-semibold text-navy">{t.name}</div>
                  <div className="text-sm text-slate">{t.title}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="surface-soft py-16 md:py-28">
      <div className="container-x max-w-3xl">
        <Reveal>
          <h2 className="h2 mt-0 text-center">Frequently asked <span className="grad-text">questions</span></h2>
          <div className="mt-10 divide-y divide-line rounded-2xl border border-line bg-white shadow-sm">
            {faq.map((f) => (
              <details key={f.q} className="group px-5 py-5 sm:px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy">
                  {f.q}
                  <span className="text-xl text-blue transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-slate">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative bg-navy py-14 text-white">
      <div className="grad-live absolute inset-x-0 top-0 h-1" aria-hidden />
      <div className="container-x grid gap-10 md:grid-cols-3">
        <div>
          <img src={img.logoMark} alt="Applied AI Consulting Group" className="h-16 w-auto rounded-lg bg-white p-2" />
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
