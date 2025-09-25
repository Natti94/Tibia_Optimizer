# Tibia Optimizer

React app to help Tibia players make smarter choices about their character’s stats, equipment, and strategy. Built with Vite + React, ships static, and deploys easily to Netlify.

Live: https://tibiaoptimizer.netlify.app

## Repo layout (updated)

The application lives in the `tibia-optimizer-app/` folder:

```
tibia-optimizer-app/
	.env                      # local env (VITE_*)
	eslint.config.js
	index.html
	package.json
	vite.config.js
	netlify/
		getAssets.js           # Netlify function for prod asset URLs
	public/
		_redirects             # SPA routing for Netlify
		favicon.ico
	src/
		App.jsx
		main.jsx
		index.css
		components/
			nav/
				nav.css
				nav.jsx
				pages.jsx
				pages/
					about.jsx
					contact.jsx
					cooperation.jsx
					donate.jsx
					support.jsx
			optimizer/
				optimizer.jsx
				optimizer.css
				form.jsx
				character/
					skills.jsx
					items/
						equipments.jsx
						weapons.jsx
				encounters/
					creatures.jsx
					players.jsx
					character/
						runes/
							damage.jsx
							healing.jsx
						spells/
							damage.jsx
							healing.jsx
			media/
				media.css
				media.jsx
				content/
					images.jsx
					news.jsx
					video.jsx
			auth/
				auth.css
				auth.jsx
				handlers/
					login.jsx
					register.jsx
		data/
			character/
				spells.js
				items/
					equipments.js
					runes.js
					weapons.js
			encounters/
				creatures.js
				players.js
		services/
			auth/
				login.js
				register.js
			media/
				news.js
```

## Features

- Optimizer UI: Skills, Equipments, Weapons (collapsible sections)
- Encounter helpers: damage/healing Runes and Spells, Creatures, Players
- Navigation with info pages (About, Contact, Cooperation, Donate, Support)
- Media area: Images, News, Video
- Auth scaffolding: Login/Register views with basic service handlers
- Live summary in the Optimizer: armor, resistances, skill totals, attack/damage, effective magic level
- Cloudinary-hosted assets via `.env` (development) and Netlify Function in production
- React + Vite + React Router; SPA-friendly `_redirects` for Netlify

## Local development

From `tibia-optimizer-app/`:

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
VITE...
```

In development the app reads directly from these URLs. In production (Netlify), assets are fetched via the Netlify Function (see `netlify/getAssets.js`).

## Build and deploy (Netlify)

```powershell
cd tibia-optimizer-app
npm run build
```

- Publish directory: `dist`
- Ensure `public/_redirects` is included (Vite copies it to `dist/`)
- Optional: configure a Netlify Function for asset indirection (see `netlify/getAssets.js`)

## Troubleshooting

- Missing images or video: verify your `.env` values point to valid Cloudinary URLs
- SPA 404 on refresh: ensure `_redirects` is present in the built `dist/`
- Dev server port in use: change Vite port in `vite.config.js` or stop the other process
- Windows path casing: keep import paths consistent (e.g., `components/optimizer/...`) to avoid casing-only conflicts

## About

Tribute project to Tibia, made by a fan for the community. Planned integration with the tibia.dev API for live game data.

## License

MIT — free to use, modify, and share.