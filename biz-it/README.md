# BIZ-IT: Autonomous Business AI Infrastructure

## Overview

**BIZ-IT** is a complete subscription service platform for autonomous business operations. Built from live production infrastructure used at The Coil grooming studio, BIZ-IT provides small business owners with AI-powered tools to handle customer engagement, scheduling, triage, payments, analytics, and team collaboration.

## Core Features (7 Modules)

### 1. **Smart Triage** (`/features/triage.html`)
- AI reads all incoming messages (SMS, email, chat, calls)
- Automatically categorizes by intent and urgency
- Routes to appropriate action: auto-response, human handoff, or self-service
- Prevents customers from falling through cracks

### 2. **Auto-Scheduling** (`/features/scheduling.html`)
- Real-time calendar management across multiple channels
- Automatic availability suggestions to customers
- Handles confirmations, reminders, reschedules, and cancellations
- Syncs across SMS, phone, web, and social media

### 3. **Multi-Channel Engagement** (`/features/engagement.html`)
- Orchestrated messaging: SMS, push notifications, email, chat
- Personalized, context-aware communications
- Optimal timing and frequency management
- Customer preference tracking

### 4. **Real-Time Analytics** (`/features/analytics.html`)
- Live revenue tracking and customer health metrics
- Churn prediction and re-engagement prompts
- Custom report builder
- AI-generated business insights and recommendations

### 5. **Payment Integration** (`/features/payments.html`)
- Multiple payment methods: card, ACH, digital wallets
- Automated invoicing and deposit collection
- PCI-compliant payment processing
- Automatic payment reminders for overdue invoices

### 6. **Customer Portal** (`/features/portal.html`)
- White-label self-service booking
- Account management and preferences
- Loyalty rewards and points tracking
- Mobile-first responsive design

### 7. **Custom Workflows** (`/features/workflows.html`)
- No-code workflow builder
- If/then automation rules
- Multi-step sequences and nurture flows
- Built-in analytics for workflow optimization

### 8. **Team Collaboration** (`/features/collaboration.html`)
- Multi-user workspace with role-based permissions
- Activity logs and audit trails
- Internal notes and customer coordination
- Real-time team updates and notifications

## Service Tiers

### Pricing Pages
- **Main**: `/landing.html` - Product showcase and service overview
- **Pricing Calculator**: `/pricing.html` - Dynamic pricing with add-ons selection

### Tiers
1. **Starter** - $299/month (solo operators)
   - Smart Triage, Auto-Scheduling, SMS + Email, Basic Analytics, 1 Team Member

2. **Professional** - $799/month (growing teams) **[MOST POPULAR]**
   - Everything in Starter + Push Notifications, Payment Integration, Custom Workflows, Advanced Analytics, 5 Team Members, Priority Support

3. **Enterprise** - Custom pricing
   - Everything in Professional + Unlimited Team Members, Custom Integrations, Dedicated Account Manager, 24/7 Support, SLA Guarantee

### À La Carte Add-ons
- Extra Team Members - $29/user/month
- Advanced Analytics - $199/month
- Custom Integrations - $249/month
- AI Behavior Training - $149/month
- Dedicated Support - $99/month
- White-Label Portal - $299/month
- Full API Access - $179/month

## Architecture

### Pages & Navigation
```
/biz-it/
├── landing.html          # Main product landing page
├── pricing.html          # Interactive pricing calculator
├── dashboard.html        # Original dashboard (legacy)
├── catalog.json         # Product catalog data
├── manifesto.md         # Brand manifesto
├── pricing-engine.js    # Pricing calculation logic
└── /features/           # Service feature detail pages
    ├── triage.html
    ├── scheduling.html
    ├── engagement.html
    ├── analytics.html
    ├── payments.html
    ├── portal.html
    ├── workflows.html
    └── collaboration.html
```

### Linked to The Coil
All features are documented with **live examples from The Coil OS** (thecoil-os.html), showing real-world use cases and results. This differentiates BIZ-IT from theoretical SaaS platforms—customers see working infrastructure they can replicate.

## Design System

### Colors
- **Primary**: #2DD4BF (Cyan/Teal)
- **Primary Dark**: #06B6D4
- **Background**: #08080d (Dark)
- **Glass**: rgba(255, 255, 255, 0.02) with blur filter

### Typography
- **Display**: Playfair Display (serif)
- **Body**: Plus Jakarta Sans (sans-serif)
- **Mono**: JetBrains Mono (code/data)

### Components
- Glass-morphism cards with backdrop blur
- Smooth transitions and hover states
- Gradient accents for CTAs
- Real-time interactive pricing calculator

## Key Selling Points

1. **Proven**: Built from The Coil's live $100k+ annual AI-driven revenue system
2. **Complete**: 7 integrated modules, no patchwork integrations
3. **Managed**: No DevOps, hosting, or technical overhead—fully managed service
4. **Scalable**: Works for solo operators and teams alike
5. **Transparent**: Simple, honest pricing with no hidden fees
6. **Fast**: 30-day free trial, no credit card, fully featured Professional tier access

## Customer Journey

1. **Entry**: Landing page explains value proposition and proof from The Coil
2. **Exploration**: Feature pages detail each module with real examples
3. **Decision**: Pricing calculator lets customers build custom plan
4. **Conversion**: Free trial CTA on every page, multiple sign-up flows
5. **Onboarding**: Feature pages link back to Coil demo for inspiration

## Analytics & Metrics to Track

- Page views: landing → pricing → features
- Feature page clicks to understand buyer interests
- Pricing calculator interactions: tier selection, add-on selections
- CTA button conversions: free trial sign-ups
- Time spent on pricing page (indicator of consideration)

## Future Enhancements

- [ ] 3D visualization of automation workflows
- [ ] Embedded demo video on landing page
- [ ] Testimonial carousel from The Coil customers
- [ ] Live chat with AI sales assistant
- [ ] ROI calculator showing revenue impact
- [ ] Comparison table (BIZ-IT vs. hiring humans)
- [ ] Integration partner showcase
- [ ] API documentation for developers

## Related Systems

- **The Coil OS** (`../thecoil-os.html`) - Live demo and proof of concept
- **Main Index** (`../index.html`) - Platform hub linking to theory, product, and demo

---

**Built**: 2026 | **Last Updated**: March 9, 2026 | **Status**: Live Product Launch
