import React from "react";
import { Hammer, Sparkles, MapPin, Phone, Compass, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface ShowroomHeroProps {
  onStartPlanner: () => void;
  onStartBooking: () => void;
}

export default function ShowroomHero({ onStartPlanner, onStartBooking }: ShowroomHeroProps) {
  return (
    <div className="relative overflow-hidden bg-radial from-stone-900 via-neutral-950 to-black text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-800">
      {/* Decorative Gold Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-stone-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 border-b border-stone-800 p-4 rounded-xl bg-stone-900/40 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono tracking-wider text-stone-300 uppercase">Showroom Live in Sétif, Algeria</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-stone-400">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-amber-500" /> Cité Yahiaoui (Les Crêtes)
            </span>
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3 text-amber-500" /> +213 30 75 75 38
            </span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Segment */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-medium uppercase tracking-[0.2em]"
            >
              <Sparkles className="h-3.5 w-3.5" /> Artisanat de Précision • Sétif, Algérie
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-serif font-light tracking-tighter leading-[1.05]"
            >
              Bespoke Kitchens <br />
              <span className="italic font-light opacity-80 text-[#E0D8D0]">
                &amp; Interior Mastery
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-stone-400 max-w-xl text-base sm:text-lg leading-relaxed font-sans font-normal"
            >
              Transforming residential spaces through European design aesthetics and robust, industrial-grade craftsmanship fabricated in our Sétif workshop.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button
                onClick={onStartPlanner}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded-lg shadow-lg hover:shadow-amber-500/10 transition duration-300 transform active:scale-95"
              >
                <Compass className="h-5 w-5" /> Launch 3D Kitchen Configurator
              </button>
              
              <button
                onClick={onStartBooking}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-500/30 font-medium rounded-lg transition duration-300 hover:border-amber-500/50"
              >
                Schedule Sétif Showroom Visit
              </button>
            </motion.div>

            {/* Core Values / Features Icons */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-800 text-stone-400 text-sm font-sans"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-amber-500 flex-shrink-0" />
                <span>100% Bespoke Fabrication</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-amber-500 flex-shrink-0" />
                <span>Acrylic &amp; Polylac High-Gloss</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-amber-500 flex-shrink-0" />
                <span>Premium Quartz Counters</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-amber-500 flex-shrink-0" />
                <span>Soft-Close Turnkey Hardware</span>
              </div>
            </motion.div>
          </div>

          {/* Sétif Showroom Showcase Card */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="overflow-hidden rounded-2xl border border-stone-800 bg-neutral-900/90 shadow-2xl shadow-black/80 p-6 flex flex-col justify-between space-y-6"
            >
              {/* Image simulation or nice layout */}
              <div className="relative h-48 rounded-lg overflow-hidden border border-stone-800">
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=700" 
                  alt="MHK Cuizin Showroom Kitchen" 
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-stone-950/80 text-amber-400 text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded border border-amber-500/20 z-20">
                  Featured Sétif Heights Installation
                </span>
                <span className="absolute bottom-3 right-3 text-[11px] font-mono text-stone-300 z-20 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-amber-400" /> Les Crêtes, Sétif
                </span>
              </div>

              {/* Showroom metadata specs */}
              <div className="space-y-4">
                <h3 className="text-lg font-sans font-medium text-stone-100 flex items-center justify-between">
                  <span>MHK Showroom Specs</span>
                  <span className="text-xs text-amber-500 font-mono">ESTABLISHED</span>
                </h3>
                
                <div className="grid grid-cols-2 gap-4 text-left font-mono text-xs">
                  <div className="bg-stone-950/50 p-3 rounded border border-stone-800">
                    <p className="text-stone-500 text-[10px] uppercase">CABINET CORE</p>
                    <p className="text-stone-200 mt-1 font-medium">European MDF</p>
                  </div>
                  <div className="bg-stone-950/50 p-3 rounded border border-stone-800">
                    <p className="text-stone-500 text-[10px] uppercase">COATING MATERIALS</p>
                    <p className="text-stone-200 mt-1 font-medium">Acrylic &amp; Polylac</p>
                  </div>
                  <div className="bg-stone-950/50 p-3 rounded border border-stone-800">
                    <p className="text-stone-500 text-[10px] uppercase">COUNTERTOPS</p>
                    <p className="text-stone-200 mt-1 font-medium">Quartz &amp; Granite</p>
                  </div>
                  <div className="bg-stone-950/50 p-3 rounded border border-stone-800">
                    <p className="text-stone-500 text-[10px] uppercase">RUNNING HARDWARE</p>
                    <p className="text-stone-200 mt-1 font-medium">BLUM Soft-Close</p>
                  </div>
                </div>
              </div>

              {/* Physical Showroom Coordinates */}
              <div className="pt-4 border-t border-stone-800 text-xs text-stone-400 text-left space-y-1">
                <p className="font-semibold text-stone-300">Visit Offline Showroom:</p>
                <p>Cité Yahiaoui, Les Crêtes (الهضاب), Sétif, Algeria</p>
                <p className="text-[11px] text-amber-500/90 italic">Open Sat-Thu: 09:00 - 19:00</p>
              </div>

            </motion.div>
          </div>

        </div>

        {/* Dynamic Metric Accents - Clean, humble system stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-stone-800/80 font-mono">
          <div className="p-4 rounded-lg bg-stone-900/20 border border-stone-800/40 text-left">
            <span className="text-2xl font-bold text-amber-400">100%</span>
            <p className="text-xs text-stone-400 mt-1">Sétif Custom Sized</p>
          </div>
          <div className="p-4 rounded-lg bg-stone-900/20 border border-stone-800/40 text-left">
            <span className="text-2xl font-bold text-stone-100">&lt; 0.2mm</span>
            <p className="text-xs text-stone-400 mt-1">Laser Edge Sealing</p>
          </div>
          <div className="p-4 rounded-lg bg-stone-900/20 border border-stone-800/40 text-left">
            <span className="text-2xl font-bold text-amber-400">5-Year</span>
            <p className="text-xs text-stone-400 mt-1">Structural Warranty</p>
          </div>
          <div className="p-4 rounded-lg bg-stone-900/20 border border-stone-800/40 text-left">
            <span className="text-2xl font-bold text-stone-100">DZD 0</span>
            <p className="text-xs text-stone-400 mt-1">Initial Design Consultation</p>
          </div>
        </div>

      </div>
    </div>
  );
}
