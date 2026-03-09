# The Coil: Comprehensive Infrastructure & Operations Manifesto

This document serves as the master architectural blueprint and operational philosophy for "The Coil" ecosystem. It details the system as it stands today, its limitations under a bootstrapped solo-operator model, and the roadmap toward fully autonomous revenue generation.

---

## 1. System Processes & Functional Architecture
The ecosystem is divided into specific components, moving from client acquisition to autonomous scheduling. We avoid code dumps; this is the functional reality.

### A. The Frontend Storefront (The "Mirage")
* **What it does:** Replaces the traditional "barber portfolio" with a high-converting, Problem-Agitate-Solution funnel. It segments traffic, captures leads, and proves authority.
* **Current Status: FUNCTIONING.** Currently hosted on Netlify's global edge network. Files include `index.html` (Front Door), `willis.html` (Flagship Sales), and `lead-magnet.html` (Top of Funnel).
* **Process Flow:** A client lands on the page. They are presented with a psychological argument (not just haircuts). They either opt-in for the free audit (captured via form) or move directly to booking.

### B. The Booking Engine (Logistics)
* **What it does:** Handles the physical calendar, payments, and service menus.
* **Current Status: FUNCTIONING (Stand-alone).** Powered by Acuity Scheduling. 
* **Process Flow:** Clients select services and times. Acuity handles the transaction. Currently, this exists in a silo.

### C. The Central Brain (HubSpot CRM)
* **What it does:** The single source of truth. Every email captured, every appointment booked, and every DM sent is logged here against a specific client profile.
* **Current Status: PLANNED (Imminent Migration).** We are transitioning the Netlify frontend into the HubSpot Free CMS. 
* **Process Flow:** The frontend forms feed directly into HubSpot. HubSpot organizes clients into lists (VIPs, Dormant, New Leads) for the Go Engine to act upon.

### D. The Muscle (Go Execution Engine)
* **What it does:** Because we are bootstrapping on HubSpot's Free tier, we do not have native automation. The Go Execution Engine is our custom middleware router that patches the APIs together.
* **Current Status: PLANNED.**
* **Process Flow:** Acuity fires a webhook to the Go Engine upon booking. The Go Engine updates the HubSpot CRM. Alternatively, the operator triggers the Go Engine to pull a list of "Dormant Clients" from HubSpot and commands Twilio to blast them with texts.

### E. The AI Concierge (Gemini / Meta Integration)
* **What it does:** Lives in Instagram DMs. Reads intent, checks the Acuity calendar perfectly, and closes the booking.
* **Current Status: PLANNED (Prototype exists in `demo.html`).**
* **Process Flow:** A client DMs "How much for a fade?". Meta API sends this to the Go Engine. The Go Engine queries Gemini with the Service Menu context. Gemini formulates the response. Go Engine sends the reply back to Instagram.

---

## 2. Aesthetics, Tone, and Code Style

### Visual Identity & Tone
The Coil is not a barbershop; it is an infrastructure agency for the grooming industry.
* **Colors:** Cream (`#FAF7F2`), Ink (`#1A1A1A`), and Red (`#C23616`).
* **Typography:** Premium, brutalist editorial styling. `Playfair Display` for authoritative, massive headers; `Space Mono` for technical, data-driven micro-copy; `DM Sans` for readable body text.
* **Tone:** Uncompromising, exact, and aggressive against industry mediocrity. We do not sell "good haircuts." We sell "Conversion Infrastructure" and the "elimination of erratic revenue." The copy uses the Problem-Agitate-Solution framework brutally.

### Code Style
* **Pure Craftsmanship:** We reject bloated UI frameworks (like Tailwind or React) for the frontend presence. The code is written in raw, vanilla HTML, CSS, and JS. 
* **Why?** Maximum performance, zero reliance on dependencies, and total, pixel-perfect control over the DOM. It loads instantly and acts as a flex of technical superiority. Styles are managed thoughtfully via CSS variables and clean, semantic class names.

---

## 3. System Limits & Hardware Capabilities

### The Bootstrapped Reality (Current Limitations)
As a solo proprietor building this from zero, capital is the bottleneck. The architecture is explicitly designed to sidestep enterprise software costs.
* **Hosting Limit:** Relying on the HubSpot Free tier limits us to 25 CMS pages and enforces a small watermark.
* **Automation Limit:** Free HubSpot lacks complex workflows. This forces the reliance on our custom **Go Execution Engine**.
* **API Limits:** Meta's Instagram API and Acuity's API have strict rate limits. The Go Engine must be designed to queue and batch requests to avoid being blocked.
* **Hardware:** The physical backend (Go Engine) must run on highly efficient, low-cost cloud instances (e.g., a $5/mo VPS) to maintain the bootstrapped ethos until MRR (Monthly Recurring Revenue) is established.

### Future Expansion
The system is built to scale horizontally. Once the first $2,000 module is sold:
1. Upgrade to HubSpot CMS Starter ($20/mo) to unlock brand purity.
2. Upgrade the Go Engine servers.
3. Pay for enterprise-grade Twilio routing for high-volume SMS.

---

## 4. The Solo Prop Dynamic: Operational & Marketing Goals

### The Problem of the "Solo Salon"
A solo barber has a hard ceiling: they only have two hands and 10 hours a day. Time spent answering "Are you open Tuesday?" in DMs is time stolen from cutting hair (generating revenue) or resting. Marketing is usually sporadic and reactive (panic-posting on IG when the chair is empty).

### The Optimization Goals (Amidst Building)
The Coil OS is designed to sever the link between operational tasks and the operator's physical time.
1. **Zero-Touch Acquisition:** The frontend (`willis.html` / `lead-magnet.html`) handles the pitch perfectly every time, disqualifying budget shoppers and converting premium clients without the operator speaking a word.
2. **Autonomous Nurture (Marketing):** The Go + HubSpot integration tracks who hasn't been in the chair for 4 weeks. It automatically texts them to rebook. Marketing shifts from "reactive" to "systematically proactive."
3. **Logistical Mastery:** The AI Concierge handles the friction of the DM-to-Calendar pipeline. 

**The ultimate goal is complete operational leverage.** The Solo Prop steps into the shop, looks at a fully booked Acuity calendar that materialized autonomously overnight, performs the high-value physical craft, and leaves. The HubSpot CRM and Go Engine run the business; the operator just provides the service.
