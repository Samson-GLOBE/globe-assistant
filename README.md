# GLOBE Assistant

**Your complete guide to GLOBE Erasmus Mundus mobility**

Spain 🇪🇸 · UK 🇬🇧 · Mexico 🇲🇽 · Portugal 🇵🇹

---

## Quick Start

```bash
npm install
npm run dev        # → http://localhost:3000
```

## Add your images

Drop these into `public/images/` (app works without them — gradients show as fallback):

| File | Content |
|------|---------|
| `globe-hero-bg.jpg` | Biodiversity/nature hero image |
| `spain-urjc.jpg` | URJC Madrid campus |
| `uk-bangor.jpg` | Bangor University |
| `mexico-uatx.jpg` | UATx Tlaxcala |
| `portugal.jpg` | Portuguese landscape |

Drop `logo.png` in `public/`.

## Deploy to Vercel (free, 2 minutes)

```bash
git init && git add . && git commit -m "Initial commit: GLOBE Assistant"
git remote add origin https://github.com/YOUR_USERNAME/globe-assistant.git
git branch -M main && git push -u origin main
# Then: vercel.com → New Project → Import from GitHub → Deploy
```

## Update visa data

Edit `data/visa-requirements.json` — each nationality entry has `ES`, `GB`, `MX`, `PT` keys.
Push to GitHub → Vercel redeploys automatically.

## Tech stack

Next.js 14 · TypeScript · Tailwind CSS · Lucide React · Static JSON data
