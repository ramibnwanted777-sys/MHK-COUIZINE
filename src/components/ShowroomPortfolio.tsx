import React from "react";
import { SHOWROOM_PORTFOLIO } from "../data";
import { Compass, MapPin, Layers, Sparkles } from "lucide-react";

export default function ShowroomPortfolio() {
  return (
    <div id="showroom-portfolio" className="mt-12 bg-stone-900 border border-stone-800 rounded-3xl p-6 lg:p-10 shadow-xl text-stone-100">
      
      {/* Header */}
      <div className="mb-8 text-left">
        <span className="text-xs font-mono text-amber-500 uppercase tracking-widest block mb-1">MHK REAL INSTALLATIONS</span>
        <h3 className="text-2xl sm:text-3xl font-sans font-medium text-stone-100">
          Recent Completed Projects in Sétif
        </h3>
        <p className="text-sm text-stone-400 mt-1 max-w-xl">
          Walk through high-quality bespoke fitted cuisines (*Cuisines Équipées*) fabricated in our Sétif workshop and installed across premium Algerian districts.
        </p>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SHOWROOM_PORTFOLIO.map((project) => (
          <div 
            key={project.title}
            className="group relative overflow-hidden rounded-2xl border border-stone-805 bg-stone-950 p-4 hover:border-amber-500/40 transition-all duration-300"
          >
            {/* Project Image Panel */}
            <div className="relative h-56 rounded-xl overflow-hidden mb-4 border border-stone-800">
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent z-10" />
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105 select-none"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-3 left-3 text-white text-xs font-semibold z-20 flex items-center gap-1">
                <MapPin className="h-3 w-3 text-amber-500" /> {project.location}
              </span>
            </div>

            {/* Project Metadata details */}
            <div className="space-y-3 text-left">
              <div className="flex justify-between items-start gap-2">
                <h4 className="text-base font-serif italic text-stone-200 mt-0.5">{project.title}</h4>
                <span className="text-[10px] font-mono tracking-wider bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 uppercase whitespace-nowrap">
                  {project.style}
                </span>
              </div>

              {/* Specs row */}
              <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-stone-400">
                <div className="bg-stone-900/50 p-2 rounded border border-stone-800/60">
                  <span className="text-stone-500 block uppercase">CABINET CORE</span>
                  <span className="text-stone-300 block mt-0.5 font-medium truncate">{project.material}</span>
                </div>
                <div className="bg-stone-900/50 p-2 rounded border border-stone-800/60">
                  <span className="text-stone-500 block uppercase">BENCHTOP STONE</span>
                  <span className="text-stone-300 block mt-0.5 font-medium truncate">{project.countertop}</span>
                </div>
                <div className="bg-stone-900/50 p-2 rounded border border-stone-800/60">
                  <span className="text-stone-500 block uppercase">TOTAL SIZE</span>
                  <span className="text-stone-300 block mt-0.5 font-medium truncate">{project.dimensions}</span>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
