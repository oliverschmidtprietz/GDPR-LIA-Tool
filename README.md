# GDPR LIA Assessment Tool

A professional tool for documenting Legitimate Interest Assessments (LIA) under Art. 6(1)(f) GDPR, following EDPB Guidelines 1/2024 with AI-powered guidance.

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

## Deployment on Hostinger

1. **Environment Variables** (Hostinger panel):
   - `GEMINI_API_KEY` - Your Gemini API key
   - `NODE_ENV` - Set to `production`

2. **Build Command:**
   ```
   npm install && npm run build
   ```

3. **Start Command:**
   ```
   npm start
   ```

4. **Entry Point:** `dist-server/server.js`

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
