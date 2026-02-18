# The Coil — AI Barbershop System

> Premium grooming brand + AI automation for **Antonio "BarberGawd" Willis** · South Loop, Chicago

---

## What Is This?

A custom-built digital platform for The Coil barbershop that combines a **premium branded website** with **AI-powered business automation** — all running on Netlify with zero infrastructure cost to the client.

## Tech Stack

| Layer | Tech |
|-------|------|
| **Frontend** | Static HTML, Tailwind CSS (CDN), vanilla JS |
| **Typography** | Newsreader (display) + Inter (body) via Google Fonts |
| **Hosting** | Netlify (static deploy) |
| **API Layer** | Netlify Functions (TypeScript `.mts`) |
| **Booking Engine** | Acuity Scheduling (external — proxied via serverless) |
| **Design System** | Black `#0A0A0A` / Gold `#C9A96E` / Crimson / White |
| **PWA** | Service Worker + manifest.json |

## Project Structure

```
prestige-grooming/
├── index.html              # Landing page — hero, services, about, gallery, CTA
├── about.html              # Antonio Willis biography & story
├── booking.html            # Premium branded booking page (Acuity integration)
├── gallery.html            # Work portfolio / photo gallery
├── dashboard.html          # Admin analytics dashboard (Phase 4)
├── demo.html               # AI feature demo page
├── 3d-scene.html           # Three.js 3D showcase scene
├── thecoil-os.html         # The Coil OS concept interface
├── sw.js                   # Service worker for offline/PWA
├── manifest.json           # PWA manifest
├── netlify.toml            # Netlify build + redirect config
├── package.json            # Dependencies (netlify-cli, @netlify/functions)
├── .env                    # API keys (not committed)
│
├── netlify/functions/      # Serverless API layer
│   ├── acuity-appointments.mts   # GET/manage appointments
│   ├── acuity-availability.mts   # Check open time slots
│   ├── acuity-book.mts           # Create new bookings
│   ├── acuity-clients.mts        # Client lookup & management
│   └── acuity-webhooks.mts       # Webhook receiver
│
├── stitch-output/          # Google Stitch AI design exports
│   ├── hero.html / hero.png
│   ├── pricing.html / pricing.png
│   ├── sched.html / sched.png
│   ├── stats.html / stats.png
│   └── dm.html / dm.png
│
├── pitch*.html             # Various pitch deck versions
├── SERVICE_DELIVERY.md     # Delivery model & milestone pricing
└── VALUE_PACKAGE.md        # Client-facing value proposition
```

## Development Phases

| # | Phase | Status | Price |
|---|-------|--------|-------|
| 1 | Discovery & Brand Lock | ✅ Done | $500 |
| 2 | Custom Booking Page | ✅ Done | $1,000 |
| 3 | AI Feature Suite | 🔄 In Progress | $1,500 |
| 4 | Dashboard & Analytics | ⬜ Pending | $1,000 |
| 5 | CRM & Marketing Engine | ⬜ Pending | $1,500 |
| 6 | Go-Live & Handoff | ⬜ Pending | $500 |
| | **Total Build** | | **$6,000** |
| | **Monthly Retainer** | | **$200/mo** |

## Phase 3 Scope (Current)

- **DM Auto-Responder** — AI-powered Instagram DM template engine
- **Smart Schedule View** — Real-time availability pulled from Acuity API
- **Push Notification Engine** — Audience segmentation + blast scheduling
- **Feature Demo Page** — Interactive showcase of all AI capabilities

## Local Development

```bash
npm install
npm run dev          # starts netlify dev on :8888
```

Requires `.env`:
```
ACUITY_USER_ID=<acuity_user_id>
ACUITY_API_KEY=<acuity_api_key>
```

## Infrastructure

- **Netlify** — hosting + serverless functions + redirects
- **Acuity Scheduling** — booking engine (client-owned account)
- All `/api/*` requests proxy to `/.netlify/functions/:splat`

## Brand Identity

- **Name:** The Coil
- **Monogram:** "W" watermark
- **Palette:** Black (#0A0A0A), Gold (#C9A96E), Crimson, Off-white (#F5F5F5)
- **Typography:** Newsreader (serif headings) + Inter (body text)
- **Aesthetic:** Editorial magazine layout, dark premium feel

---

*Built with precision. Powered by AI. Styled with intent.*
