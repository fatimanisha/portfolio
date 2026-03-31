# Fatima Nisha — Portfolio

A React + Vite personal portfolio with dark editorial design.

## Project Structure

```
portfolio/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    └── App.jsx
```

## Run Locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Deploy to Vercel (Free Shareable Link)

### Step 1 — Push to GitHub
1. Go to github.com and create a new repository called `portfolio`
2. In your terminal (inside this project folder):

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/fatimanisha/portfolio.git
git push -u origin main
```

### Step 2 — Deploy on Vercel
1. Go to https://vercel.com and sign up with your GitHub account
2. Click **"Add New Project"**
3. Select your `portfolio` repository
4. Leave all settings as default — Vercel auto-detects Vite
5. Click **Deploy**

Your live link will be: `https://portfolio-fatimanisha.vercel.app`

You can customize the URL in Vercel's project settings.

## Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder.
