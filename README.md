# Tibia Optimizer

React app to help Tibia players make smarter choices about their character’s stats, equipment, and strategy. Built with Vite + React, ships static, and is ready for Netlify.

Live: https://tibiaoptimizer.netlify.app

## Repo layout

This repository contains the app inside the `tibia-optimizer-app/` folder:

```
tibia-optimizer-app/
	netlify/
		assets.js            # (optional) Netlify helper for assets
	public/
		_redirects           # SPA routing for Netlify
		favicon.ico
	src/
		App.jsx, main.jsx, index.css
		components/
			nav.jsx
			Optimizer/
				form.jsx
				character/skills.jsx
				...items/equipments.jsx, items/weapons.jsx
				encounters/creatures.jsx, encounters/players.jsx
				encounters/character/runes.jsx, encounters/character/spells.jsx
		data/
			character/spells.js
			character/items/{equipments.js,rune.js,weapons.js}
			encounters/{creatures.js,players.js}
	package.json
	vite.config.js
```

## Features

- Character builder with collapsible sections (Skills, Equipment, Weapons)
- Encounter helpers (Runes, Spells)
- Live summary: armor, resistances, skills, attack/damage
- Cloudinary-hosted assets (background/title/effects) via `.env`
- React + Vite + React Router
- SPA-friendly `_redirects` for Netlify

## Local development

In `tibia-optimizer-app/`:

```powershell
cd tibia-optimizer-app
npm install
npm run dev
```

- App runs at http://localhost:5173/
- Uses Vite; hot reload is on by default

## Environment variables

Create `tibia-optimizer-app/.env` with the Cloudinary URLs you use in the UI (examples):

```
VITE_CLOUDINARY_BACKGROUND=
VITE_CLOUDINARY_TITLE=
VITE_CLOUDINARY_SMOKE_EFFECT=
```

These are referenced in `src/components/Optimizer/form.jsx`.

## Build and deploy (Netlify)

```powershell
cd tibia-optimizer-app
npm run build
```

- Publish directory: `dist`
- Ensure `public/_redirects` is included (Vite copies it to `dist/`)
- Optional helpers under `netlify/`

## Troubleshooting

- Missing images/video: verify your `.env` values point to valid Cloudinary URLs
- SPA 404 on refresh: ensure `_redirects` is present in the built `dist/`
- Dev server port in use: change Vite port in `vite.config.js` or stop the other process

## About

Tribute project to Tibia, made by a fan for the community. Planned integration with the tibia.dev API for live game data.

## License

MIT — free to use, modify, and share.