import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // Initialize Gemini Client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Endpoints
  // Express API route for AI kitchen planning and cost estimation
  app.post("/api/ai-design", async (req, res) => {
    try {
      const { 
        dimensions, // { width: number, length: number, height: number }
        style,      // "Modern European", "Minimalistic Slate", "Industrial Compact", "Classic Luxury"
        cabinetMaterial, // "High-Gloss MDF", "Acrylic Premium", "Compact Laminate", "Natural Veneer"
        countertop,     // "Quartz", "Granite", "Compact Laminate", "Marble"
        appliances,     // "Built-In Standard", "None / Supply Own", "Smart Premium"
        budgetTier,     // "Standard Mid-Range", "Premium High-End", "Luxury Custom"
        additionalNotes  // user custom requirements
      } = req.body;

      if (!dimensions || !dimensions.width || !dimensions.length) {
        return res.status(400).json({ error: "Please provide both kitchen width and length." });
      }

      // Format the prompt for Gemini to consult as a kitchen specialist
      const prompt = `You are a premium kitchen design consultant and cost estimator for MHK CUISINE, a luxury showroom and custom manufacturing center based in Sétif, Algeria.
Analyze the user's custom kitchen specifications:
- Dimensions: Width: ${dimensions.width}m, Length: ${dimensions.length}m, Height: ${dimensions.height || 2.4}m (Total area: ${(dimensions.width * dimensions.length).toFixed(2)} m²)
- Aesthetic Style: ${style}
- Cabinet Material: ${cabinetMaterial}
- Countertop Material: ${countertop}
- Built-in Appliances Selection: ${appliances}
- Budget Tier & Sizing Category: ${budgetTier}
- Additional Custom Requests: "${additionalNotes || 'None'}"

Provide a detailed, highly professional technical proposal and structural design report.
In your response, please address the following aspects:
1. DESIGN RECOMMENDATION: Recommended structural layout (e.g., L-Shape, U-Shape, Linear, or Island Layout) based on dimensions (${dimensions.width}x${dimensions.length}m) to respect the "kitchen golden triangle" (working zones: prep, cook, wash).
2. HARDWARE & OPTIMIZATION: Suggestions for smart space optimization, hidden storage, corner drawers, bottle racks, and soft-close mechanisms (e.g., BLUM or equivalent premium brands used in Algeria).
3. ALGERIAN MARKET & LOCAL ADVICE: Sétif localized advice (addressing temperature adaptation, humidity near storage, selection of acrylic vs. high-gloss MDF for Algerian sun exposure/kitchen use, and sourcing guidelines in Arabic/French terms common in Sétif like "Cuisine Équipée", "MDF High-Gloss", "Électroménager Encastrable").
4. DETAILED ESTIMATION BREAKDOWN: Provide a simulated cost estimation in Algerian Dinars (DZD). Use realistic prices for the Sétif mid-to-high-end kitchen market, separated into:
   - Customized Cabinetry & Sizing (MDF/Acrylic): [DZD Estimate]
   - Premium Countertop (Quartz/Granite/Compact): [DZD Estimate]
   - Functional Soft-Close Hardware & Drawers: [DZD Estimate]
   - Sétif Turnkey Structural Installation & On-Site Measurement: [DZD Estimate]
   - Total Estimated Project Budget: [DZD Estimate]

Please respond in a highly professional, well-formatted, and encouraging tone. Use markdown bullet points, strong tags, and clear section dividers.
Strict constraint: Do not output any notes on your internal AI mechanisms. Just present the beautifully drafted portfolio proposal.`;

      // Call Gemini 3.5 Flash (the recommended model for basic/moderate Q&A and text templates)
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      const responseText = response.text || "Unable to generate kitchen design at this time. Please try again.";
      res.json({ result: responseText });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error?.message || "Internal server error occurred while invoking Gemini." });
    }
  });

  // Showroom Booking API (Mock local save, returned to client state storage)
  app.post("/api/bookings", (req, res) => {
    const { fullName, phone, email, date, time, notes, selectedLayout, dimensions } = req.body;
    if (!fullName || !phone || !date || !time) {
      return res.status(400).json({ error: "Mandatory booking details missing." });
    }
    // Generate a simulated booking ID for Sétif Showroom
    const bookingId = "MHK-SETIF-" + Math.floor(1000 + Math.random() * 9000);
    res.json({
      success: true,
      bookingId,
      message: "Consultation booked successfully with MHK CUISINE.",
      details: {
        fullName,
        phone,
        email,
        date,
        time,
        notes,
        location: "Showroom: Cité Yahiaoui, Les Crêtes, Sétif",
        layout: selectedLayout,
        dimensions
      }
    });
  });

  // Serve static assets in production, otherwise Vite dev server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[MHK Cuisine Server] running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

startServer().catch((err) => {
  console.error("Server startup failed:", err);
});
