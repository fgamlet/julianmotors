# Julian Motors Website

## Overview
Serves a pre-scraped Julian Motors website (Ukrainian auto-selection service in Poland) via Flask on port 5000. The site is available in 3 languages: Russian, Ukrainian, Polish.

## Tech Stack
- **Backend**: Python 3.12 / Flask
- **Frontend**: Static HTML/CSS/JS (originally scraped from Wix, being migrated to clean HTML)
- **Fonts**: Google Fonts (Jost, Jura, Nunito)
- **Contact Form**: Formspree (https://formspree.io/f/mvzwnblv)
- **Deployment target**: GitHub (fgamlet/julianmotors) → Hostinger (mkrvmotors.com)

## Project Structure
- `serve.py` — Flask app serving static files from `fgamlet.wixsite.com/`
- `fgamlet.wixsite.com/` — Site root directory
  - `ru/`, `uk/`, `pl/` — Language versions
  - `general-9/` — "What's needed for purchase" page (REWRITTEN to clean HTML)
  - `css/mobile.css` — Mobile-specific styles (hamburger menu, drawer, layout)
  - `js/mobile.js` — Mobile JS (hamburger, drawer, language switcher, page fixes)
  - `images/` — Background videos, images (local files)

## Key Pages
- `/ru/`, `/uk/`, `/pl/` — Main page (still Wix HTML)
- `/ru/general-9/`, `/uk/general-9/`, `/pl/general-9/` — Purchase info page (**clean HTML, no Wix**)

## general-9 Page (Clean Rewrite)
- Fully semantic HTML5, responsive CSS grid/flexbox
- Background video: `/images/11062b_ec4cd4bcad4544fb8dbf01931ccc37da_1080p.mp4`
- Desktop: 2-column layout (hero left, content right)
- Mobile: single column, hamburger menu via mobile.js
- Nav element `id="g9-nav"` used as fallback by mobile.js for drawer links
- mobile.js skips Wix-specific fixes when `g9-nav` is detected

## Mobile System
- `mobile.js` runs only on `window.innerWidth <= 768`
- Creates hamburger, side drawer, overlay, language switcher dynamically
- Nav source: `comp-ifgtula7itemsContainer` (Wix pages) or `#g9-nav a` (clean pages)
- `fixGeneral9Page()` skips clean pages (checks for `g9-nav`)

## Buttons
- Order button: links to `/{lang}/#comp-ifqtfs8k` (contact section on main page)
- Contact button: same anchor link
- Style: blue bg `rgb(85,113,161)`, white text, green hover `rgb(186,218,85)`

## Environment
- `GMAIL_ADDRESS` / `GMAIL_APP_PASSWORD` — for contact form email notifications
- `GITHUB_PERSONAL_ACCESS_TOKEN` — for GitHub deployment
