# Westone HQ — Official Website

Portfolio & company site for **Westone**, a software studio specializing in product design and full-stack engineering.

🌐 **Live**: [westone-hq.github.io](https://westone-hq.github.io)

---

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 7
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion 12
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## Project Structure

```
src/
├── assets/           # Images and static files
├── components/
│   ├── common/       # Shared UI components (forms, icons)
│   ├── interactive/  # Animations, carousels, cursor, scroll
│   ├── layout/       # Header, menu, nav
│   ├── sections/     # Page sections (hero, services, contact, etc.)
│   └── stats/        # Impact stats
├── context/          # React context (UI, cursor)
├── data/             # Static content (projects, news, menu items)
├── pages/            # Top-level page components
└── types/            # TypeScript type definitions
```

## Development

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build   # Outputs to dist/
```

Deployment is handled via GitHub Pages from the `main` branch.

---

**Contact**: westone251113@gmail.com
