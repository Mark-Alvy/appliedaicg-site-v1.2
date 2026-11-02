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
const badgeText = ["text-blue", "text-purple", "text-mint"];

type Fl = { t: "cube" | "ball" | "orange" | "dot" | "ring" | "diamond"; s: number; p: string; k: number; d: number; o?: number; sm?: boolean; du?: number; u?: boolean };
const flSrc = { cube: img.cubeBlue, ball: img.ballPink, orange: img.cubeOrange };
const flShape = {
  dot: "rounded-full bg-gradient-to-br from-blue to-violet",
  ring: "rounded-full border-2 border-violet",
  diamond: "rotate-45 rounded-md bg-gradient-to-br from-pink to-fuchsia",
};
// Each floater drifts on its own keyframe (fl-1 to fl-8) with its own phase offset.
const floaters = (list: Fl[]) =>
  list.map((f, i) => (
    <span key={i} aria-hidden className={"fl fl-" + f.k + " pointer-events-none absolute " + (f.u ? "z-20 " : "") + f.p + (f.sm ? "" : " hidden md:block")} style={{ width: f.s, height: f.s, opacity: f.o ?? 0.9, animationDelay: "-" + f.d + "s", ...(f.du ? { animationDuration: f.du + "s" } : {}) }}>
      {f.t === "dot" || f.t === "ring" || f.t === "diamond" ? <span className={"block h-full w-full " + flShape[f.t]} /> : <img src={flSrc[f.t]} alt="" className={"h-full w-full object-contain" + (f.u ? " scale-75 sm:scale-100" : "")} />}
    </span>
  ));

const heroFl: Fl[] = [
  { t: "cube", s: 38, p: "left-[3%] top-[14px]", k: 1, d: 0.4, du: 3.3, o: 0.75, sm: true, u: true },
  { t: "ball", s: 26, p: "left-[calc(50%-13px)] top-[8px]", k: 4, d: 2.7, du: 5.1, o: 0.7, sm: true, u: true },
  { t: "orange", s: 42, p: "right-[24%] top-[4px]", k: 6, d: 1.1, du: 4, o: 0.8, sm: true, u: true },
  { t: "cube", s: 28, p: "right-[0%] top-[48px]", k: 2, d: 3.9, du: 5.7, o: 0.65, sm: true, u: true },
  { t: "orange", s: 30, p: "bottom-[1px] left-[29%]", k: 5, d: 0.9, du: 3.7, o: 0.7, sm: true, u: true },
  { t: "ball", s: 34, p: "bottom-[0px] right-[5%]", k: 3, d: 2.2, du: 4.6, o: 0.75, sm: true, u: true },
];
const strategyFl: Fl[] = [
  { t: "cube", s: 34, p: "left-[9%] top-[10px]", k: 3, d: 1.4, du: 4.7, o: 0.75, u: true },
  { t: "orange", s: 38, p: "right-[7%] top-[4px]", k: 1, d: 0.6, du: 5.4, o: 0.8, u: true },
  { t: "orange", s: 28, p: "bottom-[2px] left-[38%]", k: 8, d: 2.4, du: 4.1, o: 0.7, u: true },
  { t: "cube", s: 26, p: "right-[1px] top-[43%]", k: 7, d: 1.9, du: 4.4, o: 0.7, u: true },
];
const processFl: Fl[] = [
  { t: "cube", s: 32, p: "left-[2%] top-[6%]", k: 5, d: 2 },
  { t: "dot", s: 14, p: "right-[4%] top-[8%]", k: 3, d: 6 },
  { t: "orange", s: 36, p: "-right-5 -bottom-3", k: 7, d: 0 },
  { t: "diamond", s: 18, p: "left-[0%] bottom-[22%]", k: 2, d: 4 },
  { t: "ball", s: 22, p: "left-[42%] -bottom-9", k: 8, d: 8 },
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/85 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <img src={img.logoMark} alt="" className="h-9 w-auto" />
          <span className="text-sm font-bold tracking-tight text-ink sm:text-base">{site.name}</span>
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
        <button className="rounded-md p-2 text-ink lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open
            ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
            : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>}
        </button>
      </div>
      {open && (
        <div className="border-t border-line bg-white lg:hidden">
          <div className="container-x flex flex-col gap-1 py-3">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-mist">{n.label}</a>
            ))}
            <a href={site.linkedinCompany} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-mist">LinkedIn</a>
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
    <section id="top" className="surface-soft relative flex items-center justify-center overflow-hidden pb-12 pt-16 lg:pb-16 lg:pt-24">
      <div className="container-x relative grid items-center gap-8 lg:grid-cols-2">
        <div className="anim-slide-left space-y-6 text-center lg:text-left">
          <div className="space-y-3">
            <h1 className="text-5xl font-light leading-[1.05] tracking-tight text-ink lg:text-7xl">
              {hero.lines[0]}<br />
              <span className="grad-text font-semibold">{hero.lines[1]}</span><br />
              <span className="font-semibold">{hero.lines[2]}</span>
            </h1>
            <p className="anim-fade-d8 mx-auto max-w-xl text-lg leading-relaxed text-gray-700 lg:mx-0 lg:text-xl">{hero.sub}</p>
            <p className="anim-fade-d8 mx-auto max-w-xl text-base leading-relaxed text-gray-700 lg:mx-0">{hero.audience}</p>
          </div>
          <div className="anim-fade-d12 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <a href="#contact" className="inline-flex transform items-center justify-center rounded-full bg-blue px-8 py-4 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-orange-500 hover:shadow-xl">{hero.primary}</a>
            <a href="#process" className="btn-ghost">{hero.secondary} →</a>
          </div>
          <p className="anim-fade-d12 mx-auto max-w-xl pt-4 text-base leading-relaxed text-slate lg:mx-0">{hero.trust}</p>
        </div>
        <div className="anim-slide-right relative ml-auto flex items-center justify-end">
          <div className="relative pb-8 pt-[84px]">
            <img src={img.heroIllustration} alt="Isometric illustration of connected AI systems" width={768} height={600} className="anim-float w-full max-w-5xl opacity-90" />
            <div className="pointer-events-none absolute inset-0">{floaters(heroFl)}</div>
          </div>
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
    <section id="approach" className="relative overflow-hidden py-14 md:py-24">
      <div className="container-x grid items-center gap-10 md:grid-cols-12 md:gap-16">
        <Reveal dir="right" className="md:order-2 md:col-span-7">
          <span className="eyebrow">{imperative.eyebrow}</span>
          <p className="mt-6 max-w-[35rem] text-base leading-relaxed text-gray-700 sm:text-lg">
            <span className="font-semibold text-purple">Most companies now own more AI than they use.</span>{" "}
            {imperative.p1.replace("Most companies now own more AI than they use. ", "")}
          </p>
          <p className="mt-6 max-w-[35rem] text-base leading-relaxed text-slate sm:text-lg">
            {imperative.p2.slice(0, imperative.p2.indexOf("The result is"))}
            <span className="font-semibold text-pink-600">{imperative.p2.slice(imperative.p2.indexOf("The result is"))}</span>
          </p>
        </Reveal>
        <Reveal dir="left" className="relative md:order-1 md:col-span-5">
          <div className="relative md:pb-8 md:pr-9 md:pt-12">
            <img src={img.strategyIllustration} alt="Illustration of strategic AI transformation" width={932} height={890} className="anim-float relative mx-auto w-full max-w-sm md:max-w-md" />
            {floaters(strategyFl)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="surface-soft relative overflow-hidden py-14 md:py-24">
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
                <h3 className="mt-2 text-xl font-bold text-ink">{c.title}</h3>
                <p className="mt-2 text-sm font-semibold text-ink">What?</p>
                <p className="mt-1 text-slate">{c.what}</p>
                <p className={"mt-4 text-sm font-semibold " + badgeText[i]}>Ideal for:</p>
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
  const bioSplit = approach.bio.indexOf("He holds an Executive MBA");
  return (
    <section id="about" className="relative overflow-hidden py-14 md:py-24">
      <div className="container-x grid gap-y-10 md:grid-cols-12 md:gap-x-16 md:gap-y-0">
        <Reveal dir="left" className="md:col-span-7 md:col-start-1 md:row-start-1">
          <span className="eyebrow">{approach.eyebrow}</span>
          <h2 className="h2">Practical, measured, <span className="grad-text">built to be owned by you</span></h2>
          <p className="lead">{approach.body}</p>
          <div id="results" className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-6">
            <span className="text-xs font-semibold tracking-widest text-blue-deep">{approach.resultsEyebrow}</span>
            <p className="mt-2 text-lg text-ink">{approach.results}</p>
          </div>
        </Reveal>
        <Reveal dir="right" className="relative mx-auto md:col-span-5 md:col-start-8 md:row-span-2 md:row-start-1 md:self-center">
          <div className="group relative mx-auto w-fit p-3">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[312px] w-[312px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_closest-side,#8B6CF5_0%,#5B8CF5_65%,transparent_100%)] opacity-60 blur-[40px] transition-opacity duration-300 ease-in-out group-hover:opacity-80 sm:h-[374px] sm:w-[374px] md:h-[416px] md:w-[416px]" aria-hidden />
            <img src={img.mark} alt="Mark Alvarez, Founder and Principal Consultant" width={640} height={773} className="relative aspect-square transition-transform duration-300 group-hover:scale-105 w-60 rounded-full object-cover object-top shadow-xl ring-4 ring-white sm:w-72 md:w-80" />
          </div>
          <div className="mt-6 text-center">
            <h3 className="text-2xl font-bold text-ink">{approach.bioTitle}</h3>
            <p className="mt-2 text-[15px] font-semibold leading-snug text-purple">
              <span className="block">{approach.bioRole.split(",")[0]}</span>
              <span className="block">{approach.bioRole.split(",").slice(1).join(",").trim()}</span>
            </p>
            <a href={site.linkedinMark} className="mt-5 inline-flex items-center justify-center rounded-full border border-blue px-5 py-2.5 text-base font-semibold text-blue transition hover:bg-blue hover:text-white" target="_blank" rel="noreferrer">Connect with Mark on LinkedIn →</a>
          </div>
        </Reveal>
        <Reveal dir="left" className="md:col-span-7 md:col-start-1 md:row-start-2 md:mt-10">
          <p className="max-w-[35rem] text-base leading-relaxed text-slate sm:text-lg">{approach.bio.slice(0, bioSplit).trim()}</p>
          <p className="mt-5 max-w-[35rem] text-base leading-relaxed text-slate sm:text-lg">{approach.bio.slice(bioSplit)}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="surface-soft relative overflow-hidden py-14 md:py-24">
      <div className="container-x text-center">
        <Reveal>
          <span className="eyebrow">{process.eyebrow}</span>
          <h2 className="mt-5 text-3xl font-medium tracking-tight text-ink sm:text-4xl lg:text-[40px]">The <span className="grad-text">4D Framework</span>: from workflow to operating capability</h2>
          <p className="mx-auto mt-6 max-w-[720px] text-base leading-relaxed text-slate sm:text-xl">{process.intro}</p>
        </Reveal>
        <Reveal className="relative mt-12">
          <div className="connector absolute left-[12%] right-[12%] top-6 hidden h-0.5 bg-gradient-to-r from-blue via-violet to-pink md:block" aria-hidden />
          <div className="grid gap-6 md:grid-cols-4">
            {process.steps.map((s) => (
              <div key={s.title} className="card relative text-center">
                <div className="tile mx-auto bg-gradient-to-r from-purple-400 to-blue-500">{s.n}</div>
                <h3 className="mt-5 text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate">{s.body}</p>
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
    <section className="relative overflow-hidden bg-gray-50 py-14 md:py-24">
      <div className="container-x relative grid gap-y-10 md:grid-cols-12 md:gap-x-12 md:gap-y-10">
        <Reveal dir="left" className="md:col-span-7 md:col-start-1 md:row-start-1">
          <span className="eyebrow">{growth.eyebrow}</span>
          <h2 className="h2">From first call to <span className="grad-text">running agent</span></h2>
          <p className="lead">{growth.intro}</p>
        </Reveal>
        <Reveal dir="left" className="md:col-span-7 md:col-start-1 md:row-start-2">
          <ol className="space-y-4">
            {growth.steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-[20px] bg-white px-6 py-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-blue-500 text-sm font-bold text-white">{i + 1}</div>
                <div>
                  <p className="text-xs font-semibold tracking-widest text-slate">STEP {i + 1}</p>
                  <h3 className="mt-1 text-lg font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 text-slate">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal dir="right" className="relative md:col-span-5 md:col-start-8 md:row-start-2 md:self-center">
          <img src={img.processIllustration} alt="Isometric illustration of a team building an AI workflow" width={827} height={662} className="anim-float relative mx-auto w-full max-w-xs md:max-w-sm" />
          {floaters(processFl)}
        </Reveal>
      </div>
    </section>
  );
}
function Testimonials() {
  const items = testimonials.items.filter((t) => SHOW_PENDING_TESTIMONIALS || !t.pending);
  const card = (t: (typeof items)[number], cls: string) => (
    <figure key={t.name} className={"card flex flex-col " + cls}>
      {clientLogo[t.name] && <img src={clientLogo[t.name]} alt="" className="mb-5 h-8 w-auto self-start object-contain" />}
      <blockquote className="flex-1 italic leading-relaxed text-slate">“{t.quote}”</blockquote>
      <figcaption className="mt-6">
        <div className="font-semibold text-ink">{t.name}</div>
        <div className="text-sm text-slate">{t.title}</div>
      </figcaption>
    </figure>
  );
  return (
    <section className="py-14 md:py-24">
      <div className="container-x text-center">
        <Reveal>
          <span className="eyebrow">{testimonials.eyebrow}</span>
          <h2 className="h2">What leaders say <span className="grad-text">after the work is done</span></h2>
        </Reveal>
        {/* Slow continuous carousel; paused on hover or touch; static grid under reduced motion */}
        <div className="marquee-wrap marquee-mask -my-4 mt-8 overflow-hidden py-4 text-left motion-reduce:hidden">
          <div className="marquee flex w-max">
            {items.map((t) => card(t, "mr-6 w-[58vw] shrink-0 sm:w-[346px]"))}
            <div className="flex" aria-hidden>
              {items.map((t) => card(t, "mr-6 w-[58vw] shrink-0 sm:w-[346px]"))}
            </div>
          </div>
        </div>
        <div className="mt-12 hidden gap-6 text-left motion-reduce:grid sm:grid-cols-2 md:grid-cols-3">
          {items.map((t) => card(t, "h-full"))}
        </div>
      </div>
    </section>
  );
}
function Faq() {
  return (
    <section className="surface-soft py-14 md:py-24">
      <div className="container-x max-w-3xl">
        <Reveal>
          <h2 className="h2 mt-0 text-center">Frequently asked <span className="grad-text">questions</span></h2>
          <div className="mt-10 space-y-3">
            {faq.map((f) => (
              <details key={f.q} className="group rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-6 py-5 text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-blue transition-transform duration-200 group-open:rotate-180" aria-hidden><path d="M6 9l6 6 6-6" /></svg>
                </summary>
                <p className="max-w-[720px] px-6 pb-5 text-base leading-[1.65] text-gray-700">{f.a}</p>
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
          <a href={`mailto:${site.email}`} className="block py-3 text-white/70 hover:text-white">{site.email}</a>
          <p className="mt-2 text-white/70">{footer.location}</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Links</p>
          <a href={site.linkedinCompany} target="_blank" rel="noreferrer" className="block py-3 text-white/70 hover:text-white">Applied AI Consulting Group on LinkedIn</a>
          <a href={site.linkedinMark} target="_blank" rel="noreferrer" className="block py-3 text-white/70 hover:text-white">Mark Alvarez on LinkedIn</a>
          <a href="/privacy.html" className="block py-3 text-white/70 hover:text-white">Privacy policy</a>
        </div>
      </div>
      <div className="container-x mt-10 border-t border-white/10 pt-6 text-xs text-white/50">© {new Date().getFullYear()} Applied AI Consulting Group. All rights reserved.</div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main">
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
