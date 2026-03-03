# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start both Vite (port 3000) + Express API (port 3001) concurrently
npm run build      # Build client (dist/) via Vite + server (dist-server/) via tsc
npm start          # Run production server (serves both API and static files)
npx tsc --noEmit   # Type-check client code only
npx tsc -p tsconfig.server.json --noEmit  # Type-check server code only
```

## Architecture

This is a client/server app with a strict security boundary: the Gemini API key lives **only** on the server.

### Client (`src/`) — React 19 + Vite + Tailwind 3
- `App.tsx` manages two views: `wizard` (multi-step form) and `report` (PDF-ready document)
- `Wizard.tsx` is the main form component — 5 steps defined in `constants.ts`, with form validation, AI-assisted drafting, and auto-save to localStorage via `useAutoSave` hook
- `Report.tsx` renders the completed assessment and uses `html2pdf.js` (npm, not CDN) for PDF export
- `AnalysisRenderer.tsx` is shared between Wizard and Report with a `variant` prop for visual differences
- `geminiService.ts` calls `/api/suggest` and `/api/analyze` — no AI SDK on the client

### Server (`server/`) — Express with separate tsconfig
- `server.ts` serves the API and static files in production, with in-memory rate limiting (30 req/min/IP)
- `api/gemini.ts` proxies to Gemini API using `@google/genai` SDK. Two routes: `POST /api/suggest` (flash model) and `POST /api/analyze` (pro model)
- `edpbContext.ts` contains EDPB Guidelines 1/2024 and Opinion 28/2024 reference text injected into prompts
- Server uses `.js` extensions in imports (required by NodeNext module resolution)
- In dev, Vite proxies `/api` requests to port 3001

### Key Conventions
- Client imports use bare specifiers without `.ts`/`.tsx` extensions (Vite resolves them)
- Server imports use `.js` extensions (NodeNext requirement, even though source is `.ts`)
- All types in `src/types.ts` — `ComplianceCheck` and `ComplianceAnalysis` for AI response typing
- Brand colors: `brand-black` (#111), `brand-lime` (#D2F558) for decorative use, `brand-limeText` (#5A7A00) for text-on-white (WCAG AA compliant)
- Modals use `useFocusTrap` hook for accessibility (Tab trapping, Escape to close, `role="dialog"`)
- Wizard progress bar uses `role="progressbar"` with `aria-valuenow`/`aria-valuemax`

### Deployment (Hostinger)
- Environment variables: `GEMINI_API_KEY`, `NODE_ENV=production`
- Build: `npm install && npm run build`
- Start: `npm start` (entry: `dist-server/server.js`)
