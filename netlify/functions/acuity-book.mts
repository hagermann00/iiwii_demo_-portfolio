import type { Context, Config } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "POST required" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  const body = await req.json();
  const { appointmentTypeID, datetime, firstName, lastName, email, phone, notes } = body;

  // Validate required fields
  if (!appointmentTypeID || !datetime || !firstName || !lastName || !email) {
    return new Response(JSON.stringify({
      error: "Missing required fields",
      required: ["appointmentTypeID", "datetime", "firstName", "lastName", "email"]
    }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const userId = Netlify.env.get("ACUITY_USER_ID");
  const apiKey = Netlify.env.get("ACUITY_API_KEY");

  // Demo mode — simulate successful booking
  if (!userId || !apiKey) {
    return new Response(JSON.stringify({
      mode: "demo",
      success: true,
      appointment: {
        id: Math.floor(Math.random() * 100000),
        firstName,
        lastName,
        email,
        phone: phone || "",
        datetime,
        appointmentTypeID,
        type: "Haircut & Shape Up",
        price: "45.00",
        confirmationPage: "https://the-coil.as.me/schedule.php?confirm=demo",
        notes: notes || ""
      },
      message: "Demo mode — booking simulated. Connect Acuity API for real bookings."
    }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Live mode
  try {
    const auth = btoa(`${userId}:${apiKey}`);

    const response = await fetch("https://acuityscheduling.com/api/v1/appointments", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        appointmentTypeID,
        datetime,
        firstName,
        lastName,
        email,
        phone: phone || "",
        notes: notes || ""
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Acuity booking failed: ${response.status} — ${errorBody}`);
    }

    const appointment = await response.json();

    return new Response(JSON.stringify({
      mode: "live",
      success: true,
      appointment
    }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({
      mode: "error",
      success: false,
      message: error.message
    }), {
      status: 502,
      headers: { "Content-Type": "application/json" }
    });
  }
};

export const config: Config = {
  path: "/api/book"
};
