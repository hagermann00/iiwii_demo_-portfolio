import type { Context } from "@netlify/functions";

// Twilio credentials from environment variables
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER; // e.g. +13125551234
const SHOP_BOOKING_URL = process.env.SHOP_BOOKING_URL || "https://thecoilgrooming.com/booking";

interface AppointmentData {
  clientName: string;
  clientPhone: string;
  service: string;
  datetime: string; // ISO string
  type: "confirmation" | "reminder_24h" | "reminder_2h" | "cancellation";
  acuityId?: string;
}

export default async function handler(req: Request, context: Context) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Webhook-Secret",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  let data: AppointmentData;
  try {
    data = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  const { clientName, clientPhone, service, datetime, type } = data;

  if (!clientName || !clientPhone || !service || !datetime || !type) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
  }

  // Format appointment time for display
  const apptDate = new Date(datetime);
  const dateStr = apptDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const timeStr = apptDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const firstName = clientName.split(" ")[0];

  // Build message based on type
  let message = "";
  switch (type) {
    case "confirmation":
      message = `✂️ The Coil — You're booked, ${firstName}!\n\n${service}\n📅 ${dateStr} at ${timeStr}\n📍 558 W Roosevelt Rd, Suite 2, Chicago\n\nNeed to reschedule? DM @barbergawd on IG or reply CANCEL.\n\nSee you in the chair. 💈`;
      break;

    case "reminder_24h":
      message = `⏰ Reminder from The Coil — Tomorrow!\n\n${firstName}, your ${service} is tomorrow at ${timeStr}.\n📍 558 W Roosevelt Rd, Suite 2, Chicago\n\nNeed to reschedule? Do it now → ${SHOP_BOOKING_URL}\n\nBarberGawd is ready for you. 🔥`;
      break;

    case "reminder_2h":
      message = `🔔 The Coil — See you soon, ${firstName}!\n\nYour ${service} is in 2 hours at ${timeStr}.\n📍 558 W Roosevelt Rd, Suite 2, Chicago\n\nFree parking available. Come fresh. 💈`;
      break;

    case "cancellation":
      message = `The Coil — Your appointment has been cancelled, ${firstName}.\n\nWant to rebook? We'd love to have you back → ${SHOP_BOOKING_URL}\n\nOr DM @barbergawd on IG. 🤝`;
      break;

    default:
      return new Response(JSON.stringify({ error: "Invalid reminder type" }), { status: 400 });
  }

  // If no Twilio configured, return demo mode
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
    console.log(`[DEMO MODE] Would send SMS to ${clientPhone}:\n${message}`);
    return new Response(
      JSON.stringify({
        success: true,
        mode: "demo",
        message: "SMS would be sent (Twilio not configured)",
        preview: message,
        to: clientPhone,
      }),
      { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  }

  // Send via Twilio
  try {
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;

    const formData = new URLSearchParams({
      From: TWILIO_PHONE_NUMBER,
      To: clientPhone,
      Body: message,
    });

    const twilioRes = await fetch(twilioUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (!twilioRes.ok) {
      const errData = await twilioRes.json();
      throw new Error(`Twilio error: ${errData.message || twilioRes.status}`);
    }

    const twilioData = await twilioRes.json();

    return new Response(
      JSON.stringify({
        success: true,
        mode: "live",
        sid: twilioData.sid,
        to: clientPhone,
        type,
      }),
      { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  } catch (err) {
    console.error("Twilio send error:", err);
    return new Response(
      JSON.stringify({ success: false, error: String(err) }),
      { status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  }
}
