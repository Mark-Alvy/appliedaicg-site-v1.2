# appliedaicg.com

Marketing site for Applied AI Consulting Group. Static React site built with Vite, TypeScript, and Tailwind CSS v4, deployed on Cloudflare Pages.

## Develop

```
npm install
npm run dev
```

## Build

```
npm run build        # output in dist/
python3 scripts/preview.py   # single file preview.html for review
```

## Structure

- `src/content.ts` holds every word on the page. Copy changes happen there.
- `src/App.tsx` holds the sections.
- `src/HeroArt.tsx` is the hero illustration.
- `public/` holds the logo, favicon, and the privacy page.

## Deploy

Cloudflare Pages, build command `npm run build`, output directory `dist`.
