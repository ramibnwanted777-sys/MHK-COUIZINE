import React, { useState } from "react";
import { DesignConfig } from "../types";
import { Sparkles, Bot, RefreshCw, Send, CheckSquare, Layers, Landmark, Printer, Copy, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AIDesignConsultantProps {
  config: DesignConfig;
  onChangeConfig: (newConfig: DesignConfig) => void;
  onNavigateToBooking: () => void;
}

export default function AIDesignConsultant({ config, onChangeConfig, onNavigateToBooking }: AIDesignConsultantProps) {
  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingSteps = [
    "Analyzing floor plan geometry against standard work triangle...",
    "Auditing wood density & high-gloss polymer thermal factor...",
    "Formulating precision hardware load-tolerances (e.g. BLUM Aventos)...",
    "Mapping quartz stone slab contours against local Sétif source costs...",
    "Assembling tailor-made MHK Cuisine cost prospectus (DZD)..."
  ];

  const handleConsult = async () => {
    setLoading(true);
    setError(null);
    setProposal(null);
    setLoadingStep(0);

    // Simulate drafting phases
    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1800);

    try {
      const res = await fetch("/api/ai-design", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dimensions: config.dimensions,
          style: config.style,
          cabinetMaterial: config.cabinetMaterial,
          countertop: config.countertop,
          appliances: config.appliances,
          budgetTier: config.budgetTier,
          additionalNotes: config.additionalNotes,
        }),
      });

      const data = await res.json();
      clearInterval(interval);
      if (res.ok) {
        setProposal(data.result);
      } else {
        setError(data.error || "Failed to compile AI prospectus. Please double check backend connections.");
      }
    } catch (err: any) {
      clearInterval(interval);
      console.error(err);
      setError("Unable to connect to MHK Cuisine backend. Please ensure server is running smoothly.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (proposal) {
      navigator.clipboard.writeText(proposal);
      alert("MHK Custom AI proposal copied to clipboard!");
    }
  };

  // Turn markdown content into beautifully custom-styled HTML structures safely
  const parseMarkdownCustom = (text: string) => {
    if (!text) return null;
    return text.split("\n").map((line, idx) => {
      const trimmed = line.trim();
      
      // Major headings (e.g., 1. Name or ### Name)
      if (trimmed.startsWith("###") || trimmed.match(/^[0-9]\.\s[A-Z\s]/)) {
        return (
          <h3 key={idx} className="text-base font-sans font-semibold text-amber-400 mt-6 mb-2 tracking-wide uppercase border-b border-stone-800 pb-1 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 bg-amber-500 rounded-full" /> {trimmed.replace(/^###\s*/, "").replace(/^[0-9]\.\s*/, "")}
          </h3>
        );
      }

      // Strong bullet entries
      if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
        const withStrong = trimmed.replace(/^[\-\*]\s*/, "");
        const parts = withStrong.split(":");
        if (parts.length > 1) {
          return (
            <li key={idx} className="list-none pl-4 relative my-2 text-xs text-stone-300">
              <span className="absolute left-0 top-1.5 h-1.5 w-1.5 bg-stone-600 rounded-full" />
              <strong className="text-stone-100">{parts[0]}:</strong>
              <span>{parts.slice(1).join(":")}</span>
            </li>
          );
        }
        return (
          <li key={idx} className="list-none pl-4 relative my-2 text-xs text-stone-300">
            <span className="absolute left-0 top-1.5 h-1.5 w-1.5 bg-stone-600 rounded-full" />
            <span>{withStrong}</span>
          </li>
        );
      }

      // Cost highlight line matching DZD terms
      if (trimmed.includes("Estimated") || trimmed.includes("DZD") || trimmed.includes("Dinar")) {
        return (
          <div key={idx} className="bg-stone-900 border-l-2 border-amber-500 p-2.5 my-3 rounded-r font-mono text-xs text-amber-200">
            {trimmed.replace(/\*\*/g, "")}
          </div>
        );
      }

      // Empty spacing
      if (!trimmed) {
        return <div key={idx} className="h-2" />;
      }

      // Standard paragraphs
      return (
        <p key={idx} className="text-xs sm:text-sm text-stone-300 leading-relaxed my-2 font-light">
          {trimmed.split("**").map((chunk, cIdx) => (
            cIdx % 2 === 1 ? <strong key={cIdx} className="text-stone-100 font-semibold">{chunk}</strong> : chunk
          ))}
        </p>
      );
    });
  };

  return (
    <div id="ai-specialist" className="mt-12 bg-stone-950 border border-stone-800 rounded-3xl p-6 lg:p-10 shadow-2xl relative overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-left">
        
        {/* Banner */}
        <div className="flex items-center gap-3 mb-6 bg-stone-900/60 p-4 rounded-2xl border border-stone-800">
          <div className="p-2.5 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl text-stone-950 shadow-md">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-sans font-semibold text-stone-100 flex items-center gap-2">
              Bespoke AI Kitchen Specialist <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">SÉTIF SPECIAL EDITION</span>
            </h3>
            <p className="text-xs text-stone-400">
              Co-design layout aesthetics and extract cost assessments customized to Sétif, Algeria.
            </p>
          </div>
        </div>

        {/* Current Config Specs Overlay - Shows the AI is active with the live choices */}
        <div className="bg-stone-900/20 rounded-xl border border-stone-800/80 p-4 mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <span className="text-stone-500 block text-[9.5px] uppercase">A. Current Geometry</span>
            <span className="text-stone-200 mt-1 block font-medium">
              {config.dimensions.width}m × {config.dimensions.length}m
            </span>
          </div>
          <div>
            <span className="text-stone-500 block text-[9.5px] uppercase">B. Cabinet Material</span>
            <span className="text-stone-200 mt-1 block font-medium overflow-hidden text-ellipsis whitespace-nowrap">
              {config.cabinetMaterial}
            </span>
          </div>
          <div>
            <span className="text-stone-500 block text-[9.5px] uppercase">C. Countertop Stone</span>
            <span className="text-stone-200 mt-1 block font-medium overflow-hidden text-ellipsis whitespace-nowrap">
              {config.countertop}
            </span>
          </div>
          <div>
            <span className="text-stone-500 block text-[9.5px] uppercase">D. Visual Theme</span>
            <span className="text-stone-200 mt-1 block font-medium">
              {config.style}
            </span>
          </div>
        </div>

        {/* Extra Questionnaire Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <div className="space-y-2">
            <label className="text-xs font-mono text-stone-400 block uppercase">1. Built-In Appliances Package</label>
            <select
              value={config.appliances}
              onChange={(e: any) => onChangeConfig({ ...config, appliances: e.target.value })}
              className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-stone-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 font-medium"
            >
              <option value="None / Supply Own">Supply Own / Standard Hood Only</option>
              <option value="Built-In Standard">Basic Built-In Hob, Oven &amp; Microwave</option>
              <option value="Smart Premium">Luxury Integrated Multi-Zone Smart Tier</option>
            </select>
            <p className="text-[10px] text-stone-500">MHK customizes slots for premium built-in brands.</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-stone-400 block uppercase">2. Budget Classification</label>
            <select
              value={config.budgetTier}
              onChange={(e: any) => onChangeConfig({ ...config, budgetTier: e.target.value })}
              className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-stone-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 font-medium"
            >
              <option value="Standard Mid-Range">Standard Mid-tier MDF (Polylac)</option>
              <option value="Premium High-End">Premium Acrylic / Quartz Top (Silestone)</option>
              <option value="Luxury Custom">Luxury bespoke Oak / Nero Marquina Marble</option>
            </select>
            <p className="text-[10px] text-stone-500">Guides estimated pricing factors and material choices.</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-stone-400 block uppercase">3. Custom Layout Style</label>
            <select
              value={config.style}
              onChange={(e: any) => onChangeConfig({ ...config, style: e.target.value as any })}
              className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-stone-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 font-medium"
            >
              <option value="Modern European">Modern European Gloss (Sleek handles)</option>
              <option value="Minimalistic Slate">Minimalist Slate Flat-Panel (Handleless/Profile)</option>
              <option value="Industrial Compact">Industrial Compact Concrete &amp; Timber</option>
              <option value="Classic Luxury">Classic Luxury Crossover (Trim framing)</option>
            </select>
            <p className="text-[10px] text-stone-500">Determines edge design, handle grooves, and aesthetics.</p>
          </div>

        </div>

        {/* Custom text requests */}
        <div className="space-y-2 mb-8">
          <label className="text-xs font-mono text-stone-400 block uppercase">4. Sétif Kitchen Space Description &amp; Custom Sourcing Requests</label>
          <textarea
            value={config.additionalNotes}
            onChange={(e) => onChangeConfig({ ...config, additionalNotes: e.target.value })}
            placeholder="E.g., I'd like an integrated vertical space for an American double door fridge, soft-close LED light strips under upper shelves, and custom pull-out bottle racks/pantries..."
            className="w-full min-h-[90px] bg-stone-900 border border-stone-800 rounded-xl p-4 text-xs text-stone-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 font-normal leading-relaxed"
          />
        </div>

        {/* Compile Trigger Button */}
        <div className="flex justify-center mb-10">
          <button
            onClick={handleConsult}
            disabled={loading}
            className={`px-8 py-3.5 bg-amber-500 font-semibold rounded-xl text-stone-950 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 transition-all active:scale-95 ${
              loading ? "opacity-90 cursor-wait bg-amber-500/80" : "hover:bg-amber-400 hover:shadow-amber-500/20"
            }`}
          >
            {loading ? (
              <>
                <RefreshCw className="h-5 w-5 animate-spin text-stone-950" />
                <span>Generating Structural Quote...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                <span>Compile AI Sétif Quote &amp; Prospectus</span>
              </>
            )}
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-4 bg-red-950/40 border border-red-800/60 rounded-xl flex items-start gap-3 text-red-200 text-xs mb-8">
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Generation Stalled</p>
              <p className="mt-1 opacity-90">{error}</p>
            </div>
          </div>
        )}

        {/* Loading / Compilation Experience Screen */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-10 mb-8 text-center space-y-6"
            >
              <div className="relative h-1 w-full bg-stone-950 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-amber-500 transition-all duration-300"
                  style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-amber-500 block uppercase tracking-widest animate-pulse">
                  ARCHITECTURAL PLOTTING ACTIVE
                </span>
                <p className="text-sm font-sans text-stone-200 font-medium">
                  {loadingSteps[loadingStep]}
                </p>
                <p className="text-[11px] text-stone-500">
                  MHK AI is comparing dimensions against 40+ Algeria material profiles...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Calculated Interactive Result Prospectus card */}
        <AnimatePresence>
          {proposal && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl relative"
            >
              {/* Gold Top Border Accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-300 rounded-t-2xl" />
              
              {/* Prospectus Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-stone-950/80 p-5 rounded-t-2xl border-b border-stone-800/80">
                <div>
                  <span className="text-[10px] font-mono text-amber-500 block">MHK TECHNICAL ARCHIVES</span>
                  <h4 className="text-base sm:text-lg font-sans font-semibold text-stone-100 uppercase">
                    Bespoke Layout Proposal &amp; Quote
                  </h4>
                  <p className="text-[11px] text-stone-400 mt-0.5">Sétif Showroom Specification Sheet</p>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="inline-flex items-center gap-1 bg-stone-900 hover:bg-stone-800 border border-stone-800 px-3 py-1.5 rounded-lg text-xs hover:border-stone-700 transition"
                  >
                    <Copy className="h-3.5 w-3.5 text-amber-500" /> <span>Copy</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1 bg-stone-900 hover:bg-stone-800 border border-stone-800 px-3 py-1.5 rounded-lg text-xs hover:border-stone-700 transition"
                  >
                    <Printer className="h-3.5 w-3.5 text-stone-400" /> <span>Print</span>
                  </button>
                </div>
              </div>

              {/* Prospectus Content */}
              <div className="p-6 sm:p-10 text-stone-100 font-sans space-y-4">
                
                {/* Meta details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-stone-950/60 p-4 border border-stone-800/60 rounded-xl text-xs font-mono mb-6">
                  <div>
                    <span className="text-stone-500 block uppercase">Project ID</span>
                    <span className="text-stone-200 mt-1 block font-medium">MHK-QUOTE-{Math.floor(1000 + Math.random() * 9000)}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block uppercase">Total Area</span>
                    <span className="text-stone-200 mt-1 block font-medium font-serif">{(config.dimensions.width * config.dimensions.length).toFixed(2)} m²</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block uppercase">Cabinet Material</span>
                    <span className="text-stone-200 mt-1 block font-medium overflow-hidden text-ellipsis whitespace-nowrap">{config.cabinetMaterial}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block uppercase">Stone Benchtop</span>
                    <span className="text-stone-200 mt-1 block font-medium overflow-hidden text-ellipsis whitespace-nowrap">{config.countertop}</span>
                  </div>
                </div>

                {/* Main dynamic HTML parsed from Markdown markdown */}
                <div className="space-y-2 border-stone-800 leading-relaxed text-sm">
                  {parseMarkdownCustom(proposal)}
                </div>

                {/* Sétif Offline Conversion Call-to-action */}
                <div className="mt-8 pt-6 border-t border-stone-850 p-6 bg-amber-500/5 border border-amber-500/15 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <h5 className="text-sm font-sans font-bold text-amber-400">Lock in your design details &amp; schedule measurements</h5>
                    <p className="text-xs text-stone-300 mt-1">
                      Our structural team handles precision laser scanning directly in Sétif. We'll load this AI quote automatically block-by-block.
                    </p>
                  </div>
                  <button
                    onClick={onNavigateToBooking}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-amber-500 text-stone-950 font-bold rounded-xl text-xs flex-shrink-0 hover:bg-amber-400 transition"
                  >
                    <Landmark className="h-4 w-4" /> Book Measurement Now
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
