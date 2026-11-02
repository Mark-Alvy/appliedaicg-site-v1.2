// Image assets. These are the same files the current live site serves from imgur.
// Phase 2 cleanup: download the album, place files under public/img/, and change the base.
const base = "https://i.imgur.com/";

export const img = {
  heroIllustration: base + "u8HJ9F0.png",
  strategyIllustration: base + "SVKyCZF.png",
  processIllustration: base + "kkswHg5.png",
  floatingAi: base + "Y3L6kaQ.png",
  mark: base + "3MangNx.png",
  cubeBlue: base + "mPO3hsy.png",
  ballPink: base + "FGBYPXW.png",
  cubeOrange: base + "iO2hx3X.png",
  aiGif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmk5azh3YXR4MzN3Zm01cmkwN3hlZ3VpcTRsM3M4aGp4cmg3YzE1ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iHoq17SKrO6de161hh/giphy.gif",
  headshots: {
    timo: base + "bGKqok5.png",
    catherine: base + "OTSnejm.png",
    tyler: base + "URhAnUX.png",
  },
  clientLogos: {
    siemens: base + "2noIzKz.png",
    ccs: base + "rNqDPHa.png",
    preparedHero: base + "Z8Q9Gnd.png",
  },
  platforms: [
    { name: "Anthropic", src: base + "rWhTs2K.png" },
    { name: "OpenAI", src: base + "1OroYCJ.png" },
    { name: "Microsoft Copilot", src: base + "8C1PthU.png" },
    { name: "Google Gemini", src: base + "z3uRbxV.png" },
    { name: "IBM Watson", src: base + "7ZubkDB.png" },
    { name: "Perplexity", src: base + "FQB98UB.png" },
    { name: "Meta", src: base + "WNmebho.png" },
    { name: "Hugging Face", src: base + "JEU0gdR.png" },
    { name: "DeepSeek", src: base + "Votus3X.png" },
  ],
};
