import type { Context, Config } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "POST required" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const payload = await req.json();
    
    // Log the webhook event
    const event = {
      timestamp: new Date().toISOString(),
      action: payload.action || "unknown",
      id: payload.id || null,
      calendarID: payload.calendarID || null,
      appointmentTypeID: payload.appointmentTypeID || null
    };

    console.log("[WEBHOOK]", JSON.stringify(event));

    // In future: store in Netlify Blobs for analytics
    // In future: trigger push notifications for new bookings
    // In future: update CRM client record

    // Acknowledge receipt
    return new Response(JSON.stringify({
      received: true,
      event: event.action,
      timestamp: event.timestamp
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    console.error("[WEBHOOK ERROR]", error.message);
    
    return new Response(JSON.stringify({
      received: false,
      error: error.message
    }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
};

export const config: Config = {
  path: "/api/webhooks"
};
