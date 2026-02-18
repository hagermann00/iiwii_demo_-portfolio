import type { Context, Config } from "@netlify/functions";

// Mock data for demo mode (no API key configured)
function getMockAppointments(date: string) {
  const today = new Date().toISOString().split('T')[0];
  const isToday = date === today || !date;
  
  return [
    {
      id: 1001,
      firstName: "Marcus",
      lastName: "Johnson",
      datetime: `${isToday ? today : date}T10:00:00-0600`,
      endTime: `${isToday ? today : date}T10:45:00-0600`,
      type: "Haircut & Shape Up",
      price: "45.00",
      paid: "yes",
      status: "booked",
      phone: "312-555-0147",
      email: "marcus.j@email.com",
      labels: [{ name: "VIP", color: "#d4af37" }],
      notes: "Recurring weekly — low fade with part"
    },
    {
      id: 1002,
      firstName: "Darius",
      lastName: "Williams",
      datetime: `${isToday ? today : date}T11:00:00-0600`,
      endTime: `${isToday ? today : date}T12:00:00-0600`,
      type: "Full Service (Cut + Beard)",
      price: "75.00",
      paid: "yes",
      status: "booked",
      phone: "312-555-0283",
      email: "dwilliams@email.com",
      labels: [],
      notes: "First timer — found us on IG"
    },
    {
      id: 1003,
      firstName: "Terrence",
      lastName: "Davis",
      datetime: `${isToday ? today : date}T13:00:00-0600`,
      endTime: `${isToday ? today : date}T13:30:00-0600`,
      type: "Beard Trim & Shape",
      price: "35.00",
      paid: "no",
      status: "booked",
      phone: "312-555-0419",
      email: "tdavis@email.com",
      labels: [],
      notes: ""
    },
    {
      id: 1004,
      firstName: "Leon",
      lastName: "Carter",
      datetime: `${isToday ? today : date}T14:30:00-0600`,
      endTime: `${isToday ? today : date}T15:30:00-0600`,
      type: "Unit Install + Style",
      price: "150.00",
      paid: "yes",
      status: "booked",
      phone: "773-555-0672",
      email: "leon.c@email.com",
      labels: [{ name: "VIP", color: "#d4af37" }],
      notes: "Bring unit — lace front 13x4"
    },
    {
      id: 1005,
      firstName: "Jamal",
      lastName: "Robinson",
      datetime: `${isToday ? today : date}T16:00:00-0600`,
      endTime: `${isToday ? today : date}T16:45:00-0600`,
      type: "Haircut & Shape Up",
      price: "45.00",
      paid: "no",
      status: "booked",
      phone: "312-555-0831",
      email: "jrob@email.com",
      labels: [],
      notes: "Walk-in request via DM"
    }
  ];
}

export default async (req: Request, context: Context) => {
  const url = new URL(req.url);
  const date = url.searchParams.get("date") || new Date().toISOString().split('T')[0];

  const userId = Netlify.env.get("ACUITY_USER_ID");
  const apiKey = Netlify.env.get("ACUITY_API_KEY");

  // Demo mode — return mock data
  if (!userId || !apiKey) {
    return new Response(JSON.stringify({
      mode: "demo",
      date,
      appointments: getMockAppointments(date),
      message: "Running in demo mode. Set ACUITY_USER_ID and ACUITY_API_KEY to connect."
    }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  // Live mode — proxy to Acuity API
  try {
    const acuityUrl = `https://acuityscheduling.com/api/v1/appointments?minDate=${date}T00:00&maxDate=${date}T23:59&canceled=false`;
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

    const appointments = await response.json();

    return new Response(JSON.stringify({
      mode: "live",
      date,
      appointments,
      count: appointments.length
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({
      mode: "error",
      message: error.message,
      fallback: getMockAppointments(date)
    }), {
      status: 502,
      headers: { "Content-Type": "application/json" }
    });
  }
};

export const config: Config = {
  path: "/api/appointments"
};
