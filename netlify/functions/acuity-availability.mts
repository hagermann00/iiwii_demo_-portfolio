import type { Context, Config } from "@netlify/functions";

// Mock availability for demo mode
function getMockAvailability(date: string) {
  const slots = [];
  const baseHour = 9; // Shop opens at 9 AM
  const closeHour = 18; // Closes at 6 PM
  
  // Generate slots every 45 minutes
  for (let h = baseHour; h < closeHour; h++) {
    for (let m = 0; m < 60; m += 45) {
      if (h + m / 60 >= closeHour) break;
      
      const hour = String(h).padStart(2, '0');
      const min = String(m).padStart(2, '0');
      
      // Randomly mark some as taken (60% booked for realism)
      const available = Math.random() > 0.6;
      
      if (available) {
        slots.push({
          time: `${date}T${hour}:${min}:00-0600`,
          display: `${h > 12 ? h - 12 : h}:${min} ${h >= 12 ? 'PM' : 'AM'}`
        });
      }
    }
  }
  
  return slots;
}

export default async (req: Request, context: Context) => {
  const url = new URL(req.url);
  const date = url.searchParams.get("date");
  const appointmentTypeID = url.searchParams.get("type") || "";
  const calendarID = url.searchParams.get("calendar") || "";

  if (!date) {
    return new Response(JSON.stringify({
      error: "Missing required parameter: date (YYYY-MM-DD)"
    }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const userId = Netlify.env.get("ACUITY_USER_ID");
  const apiKey = Netlify.env.get("ACUITY_API_KEY");

  // Demo mode
  if (!userId || !apiKey) {
    return new Response(JSON.stringify({
      mode: "demo",
      date,
      slots: getMockAvailability(date),
      message: "Demo mode — set ACUITY_USER_ID and ACUITY_API_KEY to connect."
    }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  // Live mode
  try {
    let acuityUrl = `https://acuityscheduling.com/api/v1/availability/times?date=${date}`;
    if (appointmentTypeID) acuityUrl += `&appointmentTypeID=${appointmentTypeID}`;
    if (calendarID) acuityUrl += `&calendarID=${calendarID}`;

    const auth = btoa(`${userId}:${apiKey}`);

    const response = await fetch(acuityUrl, {
      headers: {
        "Authorization": `Basic ${auth}`,
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Acuity API error: ${response.status}`);
    }

    const slots = await response.json();

    return new Response(JSON.stringify({
      mode: "live",
      date,
      slots,
      count: slots.length
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({
      mode: "error",
      message: error.message,
      fallback: getMockAvailability(date)
    }), {
      status: 502,
      headers: { "Content-Type": "application/json" }
    });
  }
};

export const config: Config = {
  path: "/api/availability"
};
