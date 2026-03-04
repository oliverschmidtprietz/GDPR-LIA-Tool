# GDPR LIA Assessment Tool

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](LICENSE)

A professional, AI-powered tool for documenting **Legitimate Interest Assessments (LIA)** under Art. 6(1)(f) GDPR. Built for data protection officers, privacy consultants, and legal teams who need to produce thorough, regulation-compliant assessments efficiently.

The tool follows the structured methodology from **EDPB Guidelines 1/2024** and **Opinion 28/2024**, guiding users through each required step with AI-assisted drafting and real-time compliance analysis.

## Features

- **AI-Powered Drafting** — Gemini AI suggests legally sound text for each assessment section, grounded in EDPB guidance
- **EDPB Guidelines 1/2024 Compliance** — Built-in reference to the European Data Protection Board's three-step LIA test (purpose, necessity, balancing)
- **Step-by-Step Wizard** — Guided 5-step workflow ensures no required element is missed
- **PDF Export** — Generate print-ready assessment documents with one click
- **Auto-Save** — Progress is automatically saved to localStorage with recovery on return
- **Server-Side API Key** — Gemini API key never reaches the browser; all AI calls are proxied through Express

## Prerequisites

- Node.js >= 18.0.0

## Local Development

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file based on `.env.example` and set your `GEMINI_API_KEY`:
   ```
   cp .env.example .env
   ```

3. Run the development servers (Vite frontend + Express backend):
   ```
   npm run dev
   ```

   This starts:
   - Vite dev server on `http://localhost:3000`
   - Express API server on `http://localhost:3001`

## AI Configuration

This tool uses **Google Gemini** for AI-powered drafting and compliance analysis. You need a [Google AI Studio API key](https://aistudio.google.com/apikey) — add it to your `.env` file as `GEMINI_API_KEY`.

**Alternative AI providers:** The architecture is provider-agnostic — only `server/api/gemini.ts` needs to be replaced. The client code and prompt structure work with any backend. OpenAI, Claude, or any OpenAI-compatible API can be swapped in with minimal changes.

## Production Build

```
npm run build
```

This builds:
- Client bundle into `dist/` (via Vite)
- Server bundle into `dist-server/` (via TypeScript)

## Running in Production

```
NODE_ENV=production npm start
```

The Express server serves both the API and the static client files.

## Project Structure

```
├── server/              # Express API server
│   ├── server.ts        # Main server entry
│   ├── api/gemini.ts    # Gemini proxy routes
│   └── edpbContext.ts   # EDPB guidelines context
├── src/                 # React client app
│   ├── components/      # UI components
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API client services
│   ├── styles/          # CSS entry (Tailwind)
│   └── types/           # TypeScript declarations
├── dist/                # Built client (generated)
└── dist-server/         # Built server (generated)
```

## License

This project is licensed under the [GNU Affero General Public License v3.0](LICENSE).

Copyright (C) 2026 [OneZero Legal](https://onezero.legal) — Oliver Schmidt-Prietz

## Contact

For questions or feedback, reach out at [onezero.legal](https://onezero.legal).
