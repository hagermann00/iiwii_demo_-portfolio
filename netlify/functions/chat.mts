import type { Context } from "@netlify/functions";

const SYSTEM_PROMPT = `You are the AI assistant for The Coil, a premium barbershop in South Loop Chicago run by Antonio "BarberGawd" Willis. You speak with confidence, warmth, and a touch of swagger — like a trusted insider, not a corporate bot.

Your job:
- Help clients book appointments (direct them to the booking page or Acuity link)
- Answer questions about services and pricing
- Share hours and location info
- Handle rescheduling and cancellation questions
- Represent the BarberGawd brand with pride

Services & Pricing:
- Haircut & Shape Up: $45
- Beard Shape & Line Up: $35
- Hair Unit Install: $150
- Unit Maintenance: $75
- Late Night Cut (after 7pm): +$20 premium
- VIP Package (cut + beard + hot towel): $90

Hours: Tuesday–Saturday 10am–8pm. Closed Sunday & Monday.
Location: 558 W Roosevelt Rd, Suite 2, Chicago IL 60607 (Sola Salon Studios, South Loop)
Instagram: @barbergawd
Booking: Direct clients to book at /booking or say "tap Book Now above"

Rules:
- Keep responses SHORT — 2-4 sentences max unless listing services
- Never say "I cannot" — always offer an alternative
- If asked something you don't know, say "Hit Antonio up on IG @barbergawd for that one"
- Always end with a soft CTA when relevant ("Want me to check availability?" or "Ready to book?")
- Do NOT make up appointment times — tell them to use the booking page for real-time availability`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default async function handler(req: Request, context: Context) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  let body: { message: string; history?: Message[] };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  const { message, history = [] } = body;

  if (!message?.trim()) {
    return new Response(JSON.stringify({ error: "No message provided" }), {
      status: 400,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  // Fallback scripted responses if no Gemini key
  if (!GEMINI_API_KEY) {
    const reply = getScriptedResponse(message);
    return new Response(JSON.stringify({ reply, mode: "scripted" }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  // Build Gemini conversation history
  const contents = [
    ...history.map((m: Message) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
    { role: "user", parts: [{ text: message }] },
  ];

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 300,
            topP: 0.9,
          },
        }),
      }
    );

    if (!geminiRes.ok) {
      throw new Error(`Gemini API error: ${geminiRes.status}`);
    }

    const geminiData = await geminiRes.json();
    const reply =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Let me connect you with Antonio directly — hit him on IG @barbergawd.";

    return new Response(JSON.stringify({ reply, mode: "ai" }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  } catch (err) {
    console.error("Gemini error:", err);
    const reply = getScriptedResponse(message);
    return new Response(JSON.stringify({ reply, mode: "fallback" }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
}

function getScriptedResponse(text: string): string {
  const lower = text.toLowerCase();

  if (lower.match(/\b(book|appointment|schedule|available|availability|slot)\b/)) {
    return "I'd love to get you in the chair! 💈 Check real-time availability and book directly at our booking page — tap **Book Now** above. Want me to walk you through our services first?";
  }
  if (lower.match(/\b(price|cost|how much|rate|charge|fee)\b/)) {
    return "Here's the menu:\n\n✂️ Haircut & Shape Up — $45\n🧔 Beard Shape & Line Up — $35\n💈 Hair Unit Install — $150\n🔧 Unit Maintenance — $75\n👑 VIP Package (cut + beard + hot towel) — $90\n\nReady to book one?";
  }
  if (lower.match(/\b(hour|open|close|when|time|day)\b/)) {
    return "The Coil is open **Tuesday–Saturday, 10am–8pm**. Closed Sunday and Monday. Late night cuts available after 7pm with a $20 premium. 🔥";
  }
  if (lower.match(/\b(where|location|address|park|find)\b/)) {
    return "We're at **558 W Roosevelt Rd, Suite 2, Chicago IL 60607** — right in the heart of South Loop. Free parking available. 📍";
  }
  if (lower.match(/\b(cancel|reschedule|change|move)\b/)) {
    return "To reschedule or cancel, just DM Antonio on Instagram **@barbergawd** or use the link in your confirmation email. He'll get you sorted. 🤝";
  }
  if (lower.match(/\b(unit|hair unit|wig|piece|install|replacement)\b/)) {
    return "Antonio is one of Chicago's top hair unit specialists. 💎 Installs start at $150, maintenance at $75. These slots go fast — tap **Book Now** to lock yours in.";
  }
  if (lower.match(/\b(hi|hello|hey|what'?s up|sup|yo)\b/)) {
    return "Hey! Welcome to The Coil. 👋 I'm the AI assistant for Antonio \"BarberGawd\" Willis. Ask me about services, pricing, hours, or booking — what can I help you with?";
  }
  if (lower.match(/\b(instagram|ig|social|follow)\b/)) {
    return "Follow the Gawd on Instagram **@barbergawd** for fresh cuts, behind-the-scenes content, and last-minute availability drops. 📸";
  }

  return "Good question — for anything specific, hit Antonio on IG **@barbergawd** and he'll get back to you. Or tap **Book Now** above to grab a slot. Anything else I can help with? 💈";
}
