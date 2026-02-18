# The Coil AI System — Service Delivery Structure

## Overview

This document structures the full rollout of The Coil AI Barbershop System as a **productized service offering** — from pitch to handoff — with milestone pricing, infrastructure responsibility, and best practices.

---

## Delivery Model: Build + Retain

**Industry standard for small-business digital services:**

| Phase | You Get Paid | Client Sees |
|-------|-------------|-------------|
| **Build** | Milestone payments during development | The product taking shape |
| **Launch** | Final milestone payment | Live system, everything works |
| **Retain** | Monthly retainer | Ongoing support, updates, hosting |

> [!IMPORTANT]
> **Best practice: YOU own all infrastructure accounts and bill the client a flat monthly fee.** The client should never log into Netlify, Twilio, or SendGrid. They get a polished product — not a pile of logins. This protects your work and guarantees recurring revenue.

---

## Phase Breakdown & Milestones

### Phase 1 — Discovery & Brand Lock (DONE ✅)
**What:** Audit existing brand, services, Acuity setup. Establish color palette, typography, monogram.
**Deliverable:** Brand guidelines, color palette, design direction
**Timeline:** 1 week
**Price:** `$500`

---

### Phase 2 — Custom Booking Page (DONE ✅)
**What:** Design and build the premium branded booking page with full service menu, Acuity integration, mobile-first layout.
**Deliverable:** Live booking page on custom URL
**Timeline:** 1 week
**Price:** `$1,000`

---

### Phase 3 — AI Feature Suite (IN PROGRESS 🔄)
**What:** DM auto-responder, smart schedule view, push notification engine, feature demo page.
**Deliverable:** Working demo of all AI features
**Timeline:** 1–2 weeks
**Price:** `$1,500`

---

### Phase 4 — Dashboard & Analytics
**What:** Client dashboard showing bookings, revenue, retention metrics, popular services. Pulls real data from Acuity API.
**Deliverable:** Live analytics dashboard
**Timeline:** 1 week
**Price:** `$1,000`

---

### Phase 5 — CRM & Marketing Engine
**What:** Client database view, segmentation (VIP, dormant, new), SMS/email campaign builder, bulk discount/promo pushes.
**Deliverable:** Working CRM + marketing tools
**Timeline:** 1–2 weeks
**Price:** `$1,500`

---

### Phase 6 — Go-Live & Handoff
**What:** Connect to Willis's Acuity API key, point custom domain, final QA, training session (30 min video call or recorded walkthrough).
**Deliverable:** Everything live, client trained
**Timeline:** 3–5 days
**Price:** `$500`

---

## Pricing Summary

| Phase | Deliverable | Price |
|-------|-------------|-------|
| 1. Discovery & Brand | Brand guidelines, design direction | $500 |
| 2. Booking Page | Live custom booking page | $1,000 |
| 3. AI Features | DM bot, scheduling, push engine | $1,500 |
| 4. Dashboard | Analytics & revenue tracking | $1,000 |
| 5. CRM & Marketing | Client management + campaigns | $1,500 |
| 6. Go-Live | Domain, API hookup, training | $500 |
| **Total Build** | | **$6,000** |

### Monthly Retainer (after launch)

| What's Included | Monthly |
|----------------|---------|
| Hosting (Netlify) | Bundled |
| SMS/Email service (Twilio/SendGrid) | Bundled |
| Acuity API proxy server | Bundled |
| Bug fixes & minor updates | Bundled |
| 2 hours/month design or feature changes | Bundled |
| **Total** | **$200/month** |

> [!TIP]
> **Your actual infrastructure cost is ~$5–15/month.** The retainer margin is your profit for ongoing support and availability. This is standard practice.

---

## Who Pays for What — Best Practices

### ❌ DON'T: Make the client pay for infrastructure directly
- They don't understand Netlify, Twilio, or serverless
- Separate bills confuse them and make the service feel fragmented
- They could accidentally break things
- If they stop paying you, they still have your infrastructure

### ✅ DO: Bundle everything into a monthly retainer
- **You** own the Netlify account, Twilio account, domain DNS
- **You** pay ~$5–15/month in actual costs
- **Client** pays you $150–250/month flat
- Client gets: "it works, and if something breaks, I text you"
- You get: recurring revenue + full control

### What the Client Owns
- Their **Acuity** account (they already have this and pay for it)
- Their **domain name** (if they have one — you point it)
- Their **content** (service names, prices, photos)
- Their **brand** (you designed it but they own it)

### What You Own
- All **code** (until fully paid, then transfer or license)
- All **infrastructure accounts** (Netlify, Twilio, SendGrid)
- All **deployment pipelines**
- All **API integrations**

---

## Payment Structure Options

### Option A: Milestone (Recommended)
Pay at the completion of each phase. Client sees progress, you get paid incrementally.
```
Phase 1: $500 (upon brand lock)
Phase 2: $1,000 (upon booking page delivery)
Phase 3: $1,500 (upon AI feature demo)
Phase 4: $1,000 (upon dashboard delivery)
Phase 5: $1,500 (upon CRM/marketing delivery)
Phase 6: $500 (upon go-live)
Then: $200/month retainer
```

### Option B: 50/50 Split
```
$3,000 upfront (to start)
$3,000 on go-live (Phase 6)
Then: $200/month retainer
```

### Option C: Package Deal
```
$5,000 all-in (discounted from $6K)
Then: $250/month retainer (slightly higher to offset discount)
```

---

## What Willis Already Pays For (Don't Duplicate)

| Service | His Cost | Our Overlap |
|---------|----------|-------------|
| Acuity Scheduling | ~$20/month | We USE it, don't replace it |
| Stripe/Square | Per-transaction fees | We don't touch payments |
| Instagram | Free | We automate DMs, don't replace IG |
| Google Calendar | Free | Acuity syncs to it |

> [!CAUTION]
> **Never build what Acuity already does.** We're not building a booking engine or payment processor — we're building a premium front-end and AI automation layer on top of what he already pays for.

---

## Competitive Comparison

| Solution | What They Get | Monthly Cost |
|----------|--------------|-------------|
| **Acuity alone** | Generic booking page, basic emails | $20/mo |
| **GlossGenius** | Salon-specific, better UI | $30–50/mo |
| **Vagaro/Booksy** | Marketplace listing + booking | $25–85/mo |
| **Custom agency build** | Fully custom, but basic | $5K–15K + $500/mo |
| **The Coil System (us)** | Premium brand + AI + custom everything | **$6K + $200/mo** |

Our value prop: **agency-quality custom build at freelancer prices, with AI features nobody else offers.**
