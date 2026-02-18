import type { Context, Config } from "@netlify/functions";

// Mock client list for demo mode
function getMockClients(search?: string) {
  const clients = [
    { id: 2001, firstName: "Marcus", lastName: "Johnson", email: "marcus.j@email.com", phone: "312-555-0147", appointments: 24, lastVisit: "2026-02-14", tags: ["VIP", "Weekly"], revenue: 1080 },
    { id: 2002, firstName: "Darius", lastName: "Williams", email: "dwilliams@email.com", phone: "312-555-0283", appointments: 1, lastVisit: "2026-02-16", tags: ["New"], revenue: 75 },
    { id: 2003, firstName: "Terrence", lastName: "Davis", email: "tdavis@email.com", phone: "312-555-0419", appointments: 8, lastVisit: "2026-02-10", tags: [], revenue: 280 },
    { id: 2004, firstName: "Leon", lastName: "Carter", email: "leon.c@email.com", phone: "773-555-0672", appointments: 12, lastVisit: "2026-02-16", tags: ["VIP", "Units"], revenue: 1800 },
    { id: 2005, firstName: "Jamal", lastName: "Robinson", email: "jrob@email.com", phone: "312-555-0831", appointments: 3, lastVisit: "2026-02-09", tags: [], revenue: 135 },
    { id: 2006, firstName: "DeAndre", lastName: "Washington", email: "dwash@email.com", phone: "773-555-1024", appointments: 15, lastVisit: "2026-01-28", tags: ["Dormant"], revenue: 675 },
    { id: 2007, firstName: "Travis", lastName: "Moore", email: "tmoore@email.com", phone: "312-555-1337", appointments: 31, lastVisit: "2026-02-15", tags: ["VIP", "Weekly"], revenue: 1395 },
    { id: 2008, firstName: "Khalil", lastName: "Brown", email: "kbrown@email.com", phone: "312-555-1502", appointments: 6, lastVisit: "2026-02-03", tags: [], revenue: 270 },
    { id: 2009, firstName: "Andre", lastName: "Thomas", email: "athomas@email.com", phone: "773-555-1688", appointments: 19, lastVisit: "2026-02-13", tags: ["Bi-Weekly"], revenue: 855 },
    { id: 2010, firstName: "Cameron", lastName: "Harris", email: "charris@email.com", phone: "312-555-1843", appointments: 2, lastVisit: "2026-01-15", tags: ["Dormant"], revenue: 90 },
  ];

  if (search) {
    const q = search.toLowerCase();
    return clients.filter(c =>
      c.firstName.toLowerCase().includes(q) ||
      c.lastName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  }

  return clients;
}

export default async (req: Request, context: Context) => {
  const url = new URL(req.url);
  const search = url.searchParams.get("search") || "";

  const userId = Netlify.env.get("ACUITY_USER_ID");
  const apiKey = Netlify.env.get("ACUITY_API_KEY");

  // Demo mode
  if (!userId || !apiKey) {
    const clients = getMockClients(search || undefined);
    
    // Compute CRM stats
    const totalClients = clients.length;
    const vipCount = clients.filter(c => c.tags.includes("VIP")).length;
    const dormantCount = clients.filter(c => c.tags.includes("Dormant")).length;
    const newCount = clients.filter(c => c.tags.includes("New")).length;
    const totalRevenue = clients.reduce((sum, c) => sum + c.revenue, 0);

    return new Response(JSON.stringify({
      mode: "demo",
      clients,
      stats: {
        total: totalClients,
        vip: vipCount,
        dormant: dormantCount,
        new: newCount,
        totalRevenue
      },
      message: "Demo mode — set ACUITY_USER_ID and ACUITY_API_KEY to connect."
    }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  // Live mode
  try {
    let acuityUrl = "https://acuityscheduling.com/api/v1/clients";
    if (search) acuityUrl += `?search=${encodeURIComponent(search)}`;

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

    const clients = await response.json();

    return new Response(JSON.stringify({
      mode: "live",
      clients,
      count: clients.length
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({
      mode: "error",
      message: error.message,
      fallback: getMockClients(search || undefined)
    }), {
      status: 502,
      headers: { "Content-Type": "application/json" }
    });
  }
};

export const config: Config = {
  path: "/api/clients"
};
