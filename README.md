🐉 Tibia Optimizer

Optimize your Tibia character – A React-based web application built to help players make smarter decisions about their character’s stats, equipment, and strategies in the MMORPG Tibia.

🌐 Live (test deployment): tibiaoptimizer.netlify.app

✨ Features

⚔️ Character optimization logic using custom dataset

🖼️ Asset management via Cloudinary (icons, sprites, media)

📊 Built with React + npm ecosystem

🌍 Planned integration with tibia.dev REST API
 (via Swagger)

🚀 Continuous integration & deployment planned (CI/CD)

🎮 Tribute project to Tibia, made by a fan for the community

🛠️ Tech Stack

Frontend: React, JavaScript, CSS

Package Management: npm

Assets: Cloudinary

API (upcoming): Tibia.dev REST API (Swagger)

Deployment: Netlify (for test purposes, will expand with CI/CD)

📂 Project Structure
Tibia_Optimizer/
 ├── public/              # Static files
 ├── src/                 # React components & logic
 │   ├── components/      # UI components
 │   ├── services/        # Data & API handling (future REST API integration)
 │   ├── assets/          # Images/icons (managed via Cloudinary)
 │   └── App.jsx          # Root component
 ├── package.json         # npm dependencies
 ├── .gitignore           
 └── README.md

🚀 Getting Started
Prerequisites

Node.js
 (v18+ recommended)

npm (comes with Node.js)

Installation

Clone the repo and install dependencies:

git clone https://github.com/Natti94/Tibia_Optimizer.git
cd Tibia_Optimizer
npm install

Run locally
npm run dev


This starts the development server (Vite/React) at http://localhost:5173/.

🔌 API Integration (Planned)

The app will connect to the official tibia.dev
 API to fetch live data (monsters, items, characters).

Docs: Swagger – tibia.dev

Integration will be added in /src/services/api.js.

🧪 Testing (Planned)

Unit and integration testing setup with Vitest + React Testing Library.
To run tests (once added):

npm run test

🛣️ Roadmap

 Complete base UI and optimization logic

 Implement tibia.dev REST API integration

 Expand dataset for items & monsters

 Add tests with Vitest

 Setup CI/CD pipeline (GitHub Actions → Netlify)

 Official launch for the Tibia community

📜 License

MIT License – free to use, modify, and share.

💬 Credits & Acknowledgements

Inspired by Tibia (CipSoft GmbH)

API data powered by tibia.dev

Assets managed via Cloudinary

Built with ❤️ by @Natti94
