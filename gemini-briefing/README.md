# The Coil OS — Complete Project Context & README

> **Last Updated:** February 23, 2026  
> **Status:** Frontend Architecture Complete. Backend Phase 2 Pending.  
> **Go-Live Strategy:** Hybrid Path — Netlify frontend + Acuity native backend.

---

## 1. Project Overview

The Coil OS is a modular SaaS conversion infrastructure platform that replaces the broken "Instagram followers + Linktree + native iOS booking app" model used by independent grooming professionals. It provides a turnkey, cross-platform **web engine** that eliminates every friction point between a potential client's Instagram discovery and a confirmed, deposit-secured appointment.

### The Problem
- 90% of independent barbers/stylists build their entire business on Instagram — a platform they don't own.
- Native iOS booking apps (Booksy, Vagaro, Fresha) require app downloads and alienate 45% of potential clients on Android.
- The average independent barber loses **$67,600/year** in recoverable revenue due to no-shows, unmonetized DMs, and zero push marketing infrastructure.

### The Solution
The Coil OS is a suite of 8 interconnected modules that automate booking, payment capture, client communication, and proactive marketing. Every module runs as a cross-platform web application — no app store downloads required.

---

## 2. Revenue Model

### Per-Client Pricing
| Tier | Price |
|---|---|
| Single Module | $2,000/month |
| Full Stack (8 Modules) | $16,000/month |

### The $67,600 Gap (Annual Revenue Recovery)
| Source | Annual Value |
|---|---|
| Recovered No-Shows via Push Blasts | $31,200 |
| AI DM Conversions (Late-Night Leads) | $18,000 |
| Deposit-Secured Bookings | $18,400 |
| **Total** | **$67,600** |

### Target Customer Profile
- Independent barbers/stylists grossing $15k-$50k/month
- Active Instagram presence (5k-500k followers)
- Currently using Linktree + manual DM booking
- Located in major metros (Chicago, Atlanta, Houston, LA, NYC)

---

## 3. The 8 Modules (Master Module List)

### Module 01: The Conversion Front-Door
The high-status, frictionless landing page designed to convert Instagram traffic. Aggressively attacks the "iOS Native App Trap" and proves value before the booking link is ever reached.

### Module 02: Frictionless Booking Engine
Direct, cross-platform web booking integration (Acuity/Square). No App Store downloads. No passwords. Clients select services, view live availability, and lock in slots seamlessly.

### Module 03: Upfront Deposit Capture
Stripe, Apple Pay, and Google Pay integrated directly into the booking flow. Captures deposits instantly, eliminating the friction of chasing CashApp/Zelle transfers.

### Module 04: The AI Concierge
Gemini-powered autonomous chatbot living on the landing page. Intercepts inquiries 24/7, handles objections, quotes pricing, and drives users directly to booking checkout.

### Module 05: Automated SMS/Email Confirmations
Instant dual-sided notifications (client + barber) the second a deposit clears. Includes upfront confirmations, 24-hour reminders, and day-of alerts to eliminate no-shows.

### Module 06: Push Notification Engine (Gap-Fill Blasts)
Proactive outbound marketing tool controlled by the barber. When a slot opens, the barber blasts a segment (VIPs, Dormant, New) and fills the chair in 90 seconds.

### Module 07: Automated DM Interception (Future)
AI integration running inside Instagram DMs via the Meta Custom API. Auto-replies to pricing questions, drops booking links, and closes sales natively in the chat.

### Module 08: B2B Lead Magnet Capture
Squeeze page ("The 47-Business Audit") designed to capture contact info from *other barbers*, fueling the B2B franchise pipeline.

---

## 4. File Inventory (This Folder)

All files in this `gemini-briefing/` folder are the current, production-ready HTML prototypes:

| File | Module | Description |
|---|---|---|
| `willis.html` | 01, 02, 03 | Flagship landing page for BarberGawd Willis. Dark mode. Revenue math section, iOS app trap takedown, frictionless checkout visualization, Acuity booking integration. (~1200 lines) |
| `lead-magnet.html` | 08 | B2B email capture squeeze page. Dark mode (Obsidian/Gold/Crimson). "Steal the Architecture" hook. Redirects to `blueprint.html` on submit. |
| `ig-booking-simulator.html` | 04, 05 | Standalone interactive simulator. 5-stage flow: Instagram post → AI Chatbot → Service selection → Mock Apple Pay deposit → Dual push notifications (Client SMS + Barber OS alert). |
| `blueprint.html` | ALL | Master interactive demo. Embeds all 5 core prototypes as playable iframes in a narrative sequence. This is the pitch deck destination after lead capture. |
| `thecoil-os.html` | 06 | OS Dashboard prototype. Push blast controls with audience segmentation (VIP/Dormant/New/Custom), revenue analytics, client lifecycle tracking. |
| `demo.html` | 07 | AI DM Simulator. Interactive typing simulation proving the concept of automated Instagram DM interception and calendar-aware booking. |
| `index.html` | — | Master front door / routing hub. Routes visitors to the appropriate component. |
| `pitch-mirage.html` | — | "The Instagram Mirage" — Long-form editorial pitch deconstructing why Instagram followers ≠ revenue. |
| `pitch-presentation.html` | — | Product presentation slide deck. Contains the $67k vs $2.4k case study and module breakdowns. |

---

## 5. Tech Stack

### Current (Phase 1 — Live)
| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML5 / CSS3 / JavaScript (ES6+) |
| Typography | Google Fonts: Newsreader (serif), Inter (sans-serif), Space Mono (monospace) |
| Design System | Custom CSS Variables: Obsidian (#050505), Gold (#D4AF37), Crimson (#8B1A1A), Oxblood (#5A0A0A) |
| Hosting | Netlify (static CDN deploy) |
| Booking | Acuity Scheduling (external redirect) |
| Payments | Stripe (via Acuity native integration) |
| SMS/Email | Acuity native confirmations (Phase 1) |

### Future (Phase 2 — Backend Build)
| Layer | Technology |
|---|---|
| Backend | Go 1.26 (API routing, webhook handlers, LLM inference proxy) |
| SMS | Twilio Programmable Messaging |
| Email | SendGrid Transactional API |
| AI | Google Gemini API (chatbot inference, DM interception) |
| CRM | HubSpot (paused — evaluating necessity vs. Acuity CRM features) |
| Voice | Twilio Voice + 11Labs TTS (Voice Reflex module) |

---

## 6. Architectural Dependencies

```
Instagram Post (Discovery)
    └── willis.html (Front Door)
            ├── Acuity Scheduling (Booking Engine)
            │       └── Stripe (Deposit Capture)
            │               └── Acuity Native SMS/Email (Confirmations)
            └── thecoil-os.html (Push Engine)
                    └── Twilio SMS API [Phase 2]
                            └── Segmented Client Lists
                                    └── Gap-Fill Revenue Tracking

lead-magnet.html (B2B Capture)
    └── blueprint.html (Master Demo)
            └── [All Prototypes Embedded]

ig-booking-simulator.html (Standalone Sales Tool)
    └── Used in pitch meetings to demonstrate the full flow
```

---

## 7. Competitive Landscape

| Competitor | Model | Coil Advantage |
|---|---|---|
| Booksy | Native iOS app, subscription | Cross-platform web (no download), higher-touch AI |
| Vagaro | Native app, freemium | No app-store dependency, proactive push marketing |
| Fresha | Free tier + commission | No commission model, flat SaaS pricing |
| Square Appointments | POS-first, booking secondary | Booking-first, revenue optimization focus |
| Linktree | Link aggregator only | Full conversion funnel, not just links |

---

## 8. Current Status & Next Steps

### ✅ Completed
- All 9 frontend HTML prototypes built and verified
- Dark mode aesthetic unified across all pages
- Revenue calculation copy validated ($67,600 gap)
- Master Module List codified (8 modules)
- Go-live strategy approved (Hybrid Path: Netlify + Acuity)
- Interactive IG-to-Booking Simulator built as standalone demo

### 🔲 Pending
- Buy domains and deploy to production URLs
- Fix Netlify CLI authentication for push deployment
- Build Go backend API for Phase 2 (Twilio/SendGrid/Gemini)
- Integrate HubSpot CRM (paused, evaluating necessity)
- Voice Reflex module (Twilio Voice + 11Labs)

---

## 9. How to Use This Briefing Package

1. **Open Google AI Studio** (or any Gemini 3.2 chat interface)
2. **Paste the contents of `SYSTEM_INSTRUCTION.md`** into the System Instruction field
3. **Upload all `.html` files** from this folder as attachments
4. **Paste the contents of `CATCH_UP_PROMPT.md`** as your first message
5. **Start brainstorming.** The LLM will have full architectural context and can reference specific files, sections, and code.
