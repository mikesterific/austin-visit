# The Austin Weekend — A Reunion in Three Acts

A theatrical, interactive itinerary site for Matt & Julie's visit to Austin, July 17–19, 2026.

Pure static HTML/CSS/JS — no build step, no dependencies. Perfect for GitHub Pages.

## What's inside

- **Velvet curtain intro** that raises on click
- **Live countdown** to the 6:15 PM Friday curtain (the Lamberts reservation)
- **Three-act structure**: Friday arrival, Saturday full production, Sunday improvisation
- **The Nightcap Menu**: a deliberately gentle Friday — five venues as flippable playbill cards,
  with an "energy dial" that spotlights whatever matches the group's remaining energy
- **The Sixth Street Double Feature**: Saturday's finale covers both Sixths — the historic neon
  strip first, then a migration east across I-35 for patios, live bands, and The White Horse
- **Stage manager's checklists** that persist in `localStorage`
- Weather and transportation program notes, plus the guest-facing summary

## Run locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a repo (e.g. `austin-visit`) and push:

   ```bash
   git init
   git add .
   git commit -m "The Austin Weekend playbill"
   git branch -M main
   git remote add origin git@github.com:<your-username>/austin-visit.git
   git push -u origin main
   ```

2. On GitHub: **Settings → Pages → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**

3. The site goes live at `https://<your-username>.github.io/austin-visit/` within a minute or two.

No build configuration needed — `index.html` at the repo root is all Pages requires.
