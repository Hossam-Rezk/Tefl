# Tefl — طِفْل · Motherhood Companion for Cairo

> A stage-aware mobile-first web app for Cairo mothers: pregnancy tracker, child milestone tracker, local directory of doctors/hospitals/nurseries/schools, product price comparison, learning guides, and a symptom checker — in English & Arabic.

---

## ✨ Features

| Page | What it does |
|---|---|
| 🏠 **Home** | Pregnancy tracker (month-by-month) or milestone tracker (physical / emotional / behavioral), health & self-care quick cards, stage-specific product highlights |
| 📚 **Learn** | Filtered articles by stage & category, interactive symptom & warning-signs checker |
| 🗺️ **Directory** | Search & filter Cairo doctors, hospitals, nurseries and schools; side-by-side comparison table |
| 🛍️ **Products** | Cairo store price comparison for baby/pregnancy essentials |
| ✅ **Checklist** | Stage-specific interactive prep checklists — hospital bag, nursery setup, school enrollment |
| 👤 **Profile** | Switch motherhood stage, select Cairo area, onboarding wizard, language toggle (EN / AR) |

---

## 🚀 Running Locally

### Prerequisites

- **Node.js ≥ 18** — install via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows)
- **npm ≥ 9** (comes with Node.js)

> Alternatively, the project also works with [Bun](https://bun.sh/) — see `bunfig.toml`.

### Steps

```sh
# 1. Clone the repository
git clone https://github.com/Hossam-Rezk/Tefl.git
cd Tefl

# 2. Install dependencies
npm install
# or: bun install

# 3. Start the development server
npm run dev
# or: bun run dev
```

The app will be available at **http://localhost:3000** (or the port shown in your terminal).

### Other scripts

```sh
npm run build        # Production build
npm run preview      # Preview production build locally
npm run lint         # ESLint check
npm run format       # Prettier formatting
npm run test         # Run tests (Vitest)
npm run test:watch   # Run tests in watch mode
```

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [TanStack Start](https://tanstack.com/start) (SSR + file-based routing) |
| Router | [TanStack Router](https://tanstack.com/router) |
| Data fetching | [TanStack Query](https://tanstack.com/query) |
| UI components | [Radix UI](https://www.radix-ui.com/) primitives |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Forms | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| Charts | [Recharts](https://recharts.org/) |
| Build tool | [Vite](https://vitejs.dev/) |
| Language | TypeScript |

---

## 📁 Project Structure

```
src/
├── routes/           # File-based pages (TanStack Router)
│   ├── __root.tsx    # Root shell — Header, BottomNav, QueryClient
│   ├── index.tsx     # Home — pregnancy / milestone tracker
│   ├── learn.tsx     # Learning hub & symptom checker
│   ├── directory.tsx # Cairo local directory & comparison
│   ├── products.tsx  # Product price comparison
│   ├── checklist.tsx # Stage-based prep checklists
│   └── profile.tsx   # Profile, stage/area settings
├── components/
│   ├── Header.tsx    # Sticky header with stage & area selectors
│   ├── BottomNav.tsx # Persistent bottom navigation
│   └── ui-kit.tsx    # Shared primitives (Sheet, Badge, Pills…)
├── lib/
│   ├── app-state.tsx # Global React context (stage, area, lang)
│   ├── data.ts       # All app data (places, products, articles…)
│   └── compare.ts    # Comparison selection helpers
└── styles.css        # Tailwind v4 design tokens & global styles
```

---

