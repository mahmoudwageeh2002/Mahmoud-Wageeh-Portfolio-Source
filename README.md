# Mahmoud Wageeh Portfolio

A multi-page portfolio built with Next.js, TypeScript, Tailwind CSS, Motion, Three.js, React Three Fiber, next-themes, and Lucide icons.

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

If you prefer npm:

```bash
npm install
npm run dev
```

## Production build

```bash
pnpm build
```

## Main folders

- `app/` — routes, metadata, and global styling
- `components/` — shared navigation, theme, cursor-reveal hero, and interactive components
- `data/` — portfolio content, experience, skills, and projects
- `public/` — static assets and favicon

Update personal content in `data/portfolio.ts`. The navigation and theme controls live in `components/bottom-dock.tsx`, while the sketch-to-color cursor trail lives in `components/hero-scene.tsx`. Its day/night background pairs are stored in `public/images/portfolio/`.
