# Arnold Portfolio Frontend

This is the React/Vite frontend for the portfolio. The app uses static JSON
data and prebuilt WebAssembly assets from `frontend/public`.

## Local Development

```sh
npm run dev
```

## Production Build

```sh
npm run build
```

Vite writes the production build to `dist/` and copies files from `public/`,
including `/data/*.json`, `portfolio-loader.js`, `portfolio.js`, and
`portfolio.wasm`.

## Vercel Deployment

The root `vercel.json` deploys this folder by running:

```sh
cd frontend && npm run build
```

The Vercel output directory is `frontend/dist`.

## WebAssembly Assets

The current WASM files are prebuilt assets. Do not regenerate or replace
`public/portfolio.js` or `public/portfolio.wasm` during normal frontend deploys.
