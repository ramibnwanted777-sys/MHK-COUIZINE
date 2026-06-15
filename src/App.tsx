import React, { useState } from "react";
import { Compass, Hammer, Calendar, Layers, MapPin, Landmark, Phone, Sparkles, AlertCircle, Bot } from "lucide-react";
import { DesignConfig } from "./types";
import { CABINET_MATERIALS } from "./data";

// Custom Submodules
import ShowroomHero from "./components/ShowroomHero";
import ShowroomPortfolio from "./components/ShowroomPortfolio";
import InteractiveKitchenPlanner from "./components/InteractiveKitchenPlanner";
import MaterialExplorer from "./components/MaterialExplorer";
import AIDesignConsultant from "./components/AIDesignConsultant";
import ConsultationBooking from "./components/ConsultationBooking";

export default function App() {
  // Global design configuration state
  const [designConfig, setDesignConfig] = useState<DesignConfig>({
    layoutId: "l_shape",
    dimensions: {
      width: 3.5,
      length: 4.0,
      height: 2.7
    },
    style: "Modern European",
    cabinetMaterial: CABINET_MATERIALS[0].name,
    selectedColor: CABINET_MATERIALS[0].colors[0].hex,
    countertop: "Premium Quartz (Silestone Class)",
    appliances: "Built-In Standard",
    budgetTier: "Premium High-End",
    additionalNotes: ""
  });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      
      {/* Brand Navigation Bar */}
      <header className="sticky top-0 z-50 bg-stone-950/90 backdrop-blur-md border-b border-stone-850 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo brand */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-stone-950 shadow-md">
              <span className="font-serif font-extrabold text-lg">MHK</span>
            </div>
            <div className="text-left">
              <span className="font-serif text-lg font-bold tracking-tight text-white block leading-none">
                MHK CUIZIN
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 block mt-1">
                Spécialiste de la cuisine
              </span>
            </div>
          </div>

          {/* Nav quick buttons */}
          <nav className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-xs font-mono">
            <button 
              onClick={() => scrollToSection("showroom-portfolio")} 
              className="px-3 py-1.5 text-stone-300 hover:text-amber-400 transition"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection("quick-configurator")} 
              className="px-3 py-1.5 text-stone-300 hover:text-amber-400 transition"
            >
              3D Constructor
            </button>
            <button 
              onClick={() => scrollToSection("material-board")} 
              className="px-3 py-1.5 text-stone-300 hover:text-amber-400 transition"
            >
              Materials
            </button>
            <button 
              onClick={() => scrollToSection("ai-specialist")} 
              className="px-3 py-1.5 text-amber-400 font-bold hover:text-amber-300 transition flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20"
            >
              <Bot className="h-3.5 w-3.5" /> AI Consultant
            </button>
            <button 
              onClick={() => scrollToSection("booking-manager")} 
              className="px-4 py-2 bg-stone-900 border border-stone-800 text-stone-200 hover:border-amber-500 hover:text-amber-400 rounded-lg transition"
            >
              Schedule Consult
            </button>
          </nav>

        </div>
      </header>

      {/* Hero Module Segment */}
      <ShowroomHero 
        onStartPlanner={() => scrollToSection("quick-configurator")} 
        onStartBooking={() => scrollToSection("booking-manager")} 
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Offline Portfolio Digitization */}
        <ShowroomPortfolio />

        {/* Dynamic Kitchen Canvas Designer */}
        <InteractiveKitchenPlanner 
          config={designConfig}
          onChangeConfig={setDesignConfig}
          onNavigateToAI={() => scrollToSection("ai-specialist")}
        />

        {/* Detailed Sourcing material cards info */}
        <MaterialExplorer 
          config={designConfig}
          onChangeConfig={setDesignConfig}
        />

        {/* Secure AI Draft Blueprint & cost breakdowns DZD */}
        <AIDesignConsultant 
          config={designConfig}
          onChangeConfig={setDesignConfig}
          onNavigateToBooking={() => scrollToSection("booking-manager")}
        />

        {/* Offline physical appointments & CAD structural scan reservation */}
        <ConsultationBooking 
          config={designConfig}
        />

      </main>

      {/* High-End Brand Footer */}
      <footer className="bg-neutral-950 border-t border-stone-850 py-12 px-4 sm:px-6 lg:px-8 text-stone-400 text-sm font-sans mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
          {/* Sétif corporate details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
              <span className="font-serif font-bold text-white text-base">MHK CUIZIN &amp; INTERIOR</span>
            </div>
            <p className="text-xs text-stone-500 leading-normal max-w-sm">
              Premium showroom and custom cabinetry manufacturing located in Sétif, Algeria. Fabricating contemporary fitted kitchens utilizing High-Gloss European MDF cores, glass-like Acrylic polymer sheets, and robust natural stone countertops.
            </p>
            <p className="text-xs font-mono text-stone-600">
              © 2026 MHK Cuizin. All rights preserved. Developed under modern industrial specifications.
            </p>
          </div>

          {/* Showroom Visit Info */}
          <div className="space-y-3 font-sans">
            <h4 className="text-xs font-mono text-white uppercase tracking-wider">Physical Showroom Coordinates</h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-amber-500 flex-shrink-0" />
                <span>Cité Yahiaoui, Les Crêtes (الهضاب), Sétif, Algeria</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-amber-500 flex-shrink-0" />
                <span>+213 30 75 75 38</span>
              </p>
              <p className="text-stone-500 text-[11px] font-mono leading-normal pl-5">
                Visit our offline showroom to inspect physical MDF swatches and quartz slabs.
              </p>
            </div>
          </div>

          {/* Operational Hours */}
          <div className="space-y-3 font-sans">
            <h4 className="text-xs font-mono text-white uppercase tracking-wider">Operational Hours Sétif</h4>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b border-stone-900 pb-1">
                <span>Saturday - Thursday:</span>
                <span className="text-amber-400">09:00 - 19:00</span>
              </div>
              <div className="flex justify-between border-b border-stone-900 pb-1">
                <span>Friday (传统 Weekend):</span>
                <span className="text-red-400">Offline / Closed</span>
              </div>
              <div className="flex justify-between text-stone-500 text-[11px] leading-normal font-sans pt-1">
                <span>*On-site laser scanning and CAD measurements can be scheduled during standard Saturday-Thursday slots.</span>
              </div>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
