# Tibia Optimizer

React app to help Tibia players make smarter choices about their character’s stats, equipment, and strategy. Built with Vite + React, ships static, and deploys easily to Netlify.

Live: https://tibiaoptimizer.netlify.app

## Repo layout

This repository contains the app inside the `tibia-optimizer-app/` folder:

```
tibia-optimizer-app/
	netlify/
		getAssets.js         
	public/
		_redirects           # SPA routing for Netlify
		favicon.ico
	src/
		App.jsx, main.jsx, index.css
		components/
			nav/
				nav.jsx
				pages/
					about.jsx, support.jsx
			optimizer/
				form.jsx
				character/
					skills.jsx
					items/
						equipments.jsx, weapons.jsx
				encounters/
					creatures.jsx, players.jsx
					character/
						runes/
							damageRunes.jsx, healingRunes.jsx
						spells/
							damageSpells.jsx, healingSpells.jsx
		data/
			character/spells.js
		character/items/{equipments.js,runes.js,weapons.js}
			encounters/{creatures.js,players.js}
	package.json
	vite.config.js
```

## Features

- Side navigation with icons and collapse toggle
- Character builder with collapsible sections (Skills, Equipments, Weapons)
- Encounter helpers (Runes, Spells)
- Live summary: armor, resistances, skills, attack/damage
- Combined weapon + ammunition totals in the Summary
- Cloudinary-hosted assets (background/title/effects/icons) via `.env`
- Netlify function for production asset URLs (`/api/getAsset`)
- Smooth UI animations (title overlay effect, card/section transitions)
- React + Vite + React Router; SPA-friendly `_redirects` for Netlify

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
VITE_CLOUDINARY_TITLE_EFFECT=
VITE_CLOUDINARY_BOOK_GIF=
VITE_CLOUDINARY_TITLE_SMALL=
VITE_CLOUDINARY_ABOUT_ICON=
VITE_CLOUDINARY_GUIDE_ICON=
VITE_CLOUDINARY_CONTACT_ICON=
VITE_CLOUDINARY_COOPERATION_ICON=
VITE_CLOUDINARY_DONATE_ICON=
```
In development the app reads directly from these URLs. In production (Netlify), assets are fetched via the Netlify function endpoint `/api/getAsset` implemented in `netlify/getAssets.js`.

## Build and deploy (Netlify)

```powershell
cd tibia-optimizer-app
npm run build
```

- Publish directory: `dist`
- Ensure `public/_redirects` is included (Vite copies it to `dist/`)
- Optional: configure a Netlify Function for `/api/getAsset` (see `netlify/getAssets.js`)

## Troubleshooting

- Missing images/video: verify your `.env` values point to valid Cloudinary URLs
- SPA 404 on refresh: ensure `_redirects` is present in the built `dist/`
- Dev server port in use: change Vite port in `vite.config.js` or stop the other process
- Windows path casing: keep component import paths consistent (e.g., `components/optimizer/...`) to avoid casing-only conflicts.

## About

Tribute project to Tibia, made by a fan for the community. Planned integration with the tibia.dev API for live game data.

## License

MIT — free to use, modify, and share.