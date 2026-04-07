# PrimeFuture

PrimeFuture is a responsive marketing site / landing page for a study-abroad consultancy built with React, Vite and Tailwind CSS. It includes an animated hero, services grid, leadership bios, success metrics, testimonials carousel, and contact call-to-action.

**Tech stack:** React, Vite, TailwindCSS, Framer Motion, Swiper, React Router

## Quick Features
- **Hero carousel** with autoplay/fade slides (Swiper)
- **Leadership** section with bios and deep-linking from the home page
- **Services grid** with animated cards
- **Success metrics** animated with `react-countup`
- **Testimonials carousel** (Swiper)
- **Accessible** routing, reduced-motion friendly animations and focusable interactive elements

## Project Structure (important files)
- `index.html` — app shell
- `src/main.jsx` — app entry (router + providers)
- `src/App.jsx` — layout, routes and global components (Navbar, Footer)
- `src/pages/*` — page routes (`Home.jsx`, `About.jsx`, `Services.jsx`, `Contact.jsx`, ...)
- `src/components/*` — reusable UI components
- `public/image/` — static images served by the app

## Prerequisites
- Node.js (LTS recommended, e.g. 18+)
- npm (or yarn / pnpm)

## Setup — Install dependencies
Open a terminal in the project root and run:

```powershell
npm install
```

## Development — Run the dev server
Start the Vite dev server:

```powershell
npm audit fix
```

Open the indicated local URL (usually `http://localhost:5173`) to preview the site.

## Build & Preview
- Build a production bundle:

```powershell
npm run build
```

- Preview the production build locally:

```powershell
npm run preview
```

## Linting
- Run ESLint across the source files:

```powershell
npm run lint
```

## Deployment
This project includes `gh-pages` as a dependency. If you want to publish to GitHub Pages you can add a deploy script in `package.json` and run it. Example (adjust `homepage` and branch as needed):

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

Then run:

```powershell
npm run deploy
```

## Customization notes
- Visual assets live in `public/image/`. Replace with your own brand assets.
- Tailwind configuration is in `tailwind.config.js` — update colors and breakpoints there.
- Animations are implemented with Framer Motion in page components and custom hooks (see `src/hooks/useReveal.js`). Respect `prefers-reduced-motion` when changing animations.
- Swiper carousels are used in the hero and testimonials. Tune `autoplay`, `speed` and `breakpoints` in the corresponding page files.

## Accessibility & Best Practices
- The project tries to preserve keyboard focus and uses semantic HTML for interactive elements.
- Links from the home page to the About page use navigation state (`location.state.scrollTo`) for deep-scrolling. If you change section IDs, update the link state and the scroll handler in `About.jsx`.

## Troubleshooting
- If images do not appear, check that files exist under `public/image/` and paths match (e.g. `/image/logo.jpg`).
- If routing scroll behavior does not work, ensure the About page contains the matching `id` (for example `id="leadership"`).

## Contributing
- Fork the repo, create a branch, and open a pull request. Keep changes focused and include screenshots for UI work.

## License
- This repository does not include a license file. Add one (for example MIT) to clarify usage rights.

---

If you want, I can:
- add a `CONTRIBUTING.md` with PR guidelines,
- wire up a `deploy` script for GitHub Pages, or
- run the dev server and verify any UI behavior you want checked.


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
