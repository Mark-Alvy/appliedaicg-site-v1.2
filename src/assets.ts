// Image assets, served from /public/img. Source of truth: Drive, 00-AppliedAI/Company/website/site-assets.
const base = "/img/";

export const img = {
  logoMark: base + "logo-mark.png",
  heroIllustration: base + "hero-illustration.webp",
  strategyIllustration: base + "strategy-illustration.webp",
  processIllustration: base + "process-illustration.webp",
  floatingAi: base + "floating-ai.png",
  mark: base + "mark-alvarez.webp",
  cubeBlue: base + "cube-blue.png",
  ballPink: base + "ball-pink.png",
  cubeOrange: base + "cube-orange.png",
  growthIllustration: base + "growth-illustration.webp",
  clientLogos: {
    siemens: base + "client-siemens-eda.png",
    ccs: base + "client-ccs.png",
    preparedHero: base + "client-prepared-hero.png",
    mayerBrown: base + "client-mayer-brown.png",
    lifespace: base + "client-lifespace.png",
    smuCox: base + "client-smu-cox.png",
  },
  platforms: [
    { name: "Anthropic", src: base + "platform-anthropic.png" },
    { name: "OpenAI", src: base + "platform-openai.png" },
    { name: "Microsoft Copilot", src: base + "platform-copilot.png" },
    { name: "Google Gemini", src: base + "platform-gemini.png" },
    { name: "IBM Watson", src: base + "platform-ibm-watson.png" },
    { name: "Perplexity", src: base + "platform-perplexity.png" },
    { name: "Meta", src: base + "platform-meta.png" },
    { name: "Hugging Face", src: base + "platform-hugging-face.png" },
    { name: "DeepSeek", src: base + "platform-deepseek.png" },
  ],
};
