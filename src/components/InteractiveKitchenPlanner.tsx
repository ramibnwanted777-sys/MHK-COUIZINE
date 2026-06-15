import React, { useState } from "react";
import { CABINET_MATERIALS, COUNTERTOPS, LAYOUTS } from "../data";
import { DesignConfig, KitchenLayout, CabinetMaterial, CountertopMaterial } from "../types";
import { Layers, Palette, Columns, Check, ChevronRight, HelpCircle } from "lucide-react";

interface InteractiveKitchenPlannerProps {
  config: DesignConfig;
  onChangeConfig: (newConfig: DesignConfig) => void;
  onNavigateToAI: () => void;
}

export default function InteractiveKitchenPlanner({ config, onChangeConfig, onNavigateToAI }: InteractiveKitchenPlannerProps) {
  const [activeTab, setActiveTab] = useState<"layout" | "cabinets" | "countertops">("layout");
  
  // Find current objects based on choices
  const currentLayout = LAYOUTS.find(l => l.id === config.layoutId) || LAYOUTS[0];
  const currentMaterial = CABINET_MATERIALS.find(m => m.name === config.cabinetMaterial) || CABINET_MATERIALS[0];
  const currentCountertop = COUNTERTOPS.find(c => c.name === config.countertop) || COUNTERTOPS[0];

  const handleSelectLayout = (layoutId: string) => {
    onChangeConfig({ ...config, layoutId });
  };

  const handleSelectMaterial = (cabinetMaterial: string) => {
    const material = CABINET_MATERIALS.find(m => m.name === cabinetMaterial)!;
    const defaultColor = material.colors[0].hex;
    onChangeConfig({ ...config, cabinetMaterial, selectedColor: defaultColor });
  };

  const handleSelectColor = (selectedColor: string) => {
    onChangeConfig({ ...config, selectedColor });
  };

  const handleSelectCountertop = (countertop: string) => {
    onChangeConfig({ ...config, countertop });
  };

  const handleDimensionChange = (field: "width" | "length" | "height", value: number) => {
    onChangeConfig({
      ...config,
      dimensions: {
        ...config.dimensions,
        [field]: value
      }
    });
  };

  // Helper to calculate raw cost factors
  const computedArea = config.dimensions.width * config.dimensions.length;
  const baseCost = 450000; // Base Sétif cabinetry cost
  const calculatedCostEstimate = Math.round(
    baseCost * 
    (computedArea / 8.0) * 
    currentMaterial.priceFactor * 
    currentCountertop.priceFactor *
    (config.budgetTier === "Luxury Custom" ? 1.4 : config.budgetTier === "Premium High-End" ? 1.15 : 1.0)
  );

  return (
    <div id="quick-configurator" className="bg-stone-900 border border-stone-800 rounded-3xl p-6 lg:p-10 shadow-xl relative overflow-hidden text-stone-100">
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header and description */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <span className="text-xs font-mono text-amber-500 uppercase tracking-widest block mb-1">MHK DIGITAL STUDIO</span>
          <h2 className="text-2xl sm:text-3xl font-sans font-medium text-stone-100">
            Interactive 3D Showroom Configurator
          </h2>
          <p className="text-sm text-stone-400 mt-1 max-w-xl">
            Simulate layout geometries, tweak cabinet surface high-gloss polymers with Sétif regional defaults, and preview materials in real-time.
          </p>
        </div>
        <div className="bg-stone-950/80 px-4 py-2 rounded-xl border border-stone-800 text-right">
          <span className="text-[10px] font-mono text-stone-500 block">ESTIMATED ESTIMATE RANGE</span>
          <span className="text-base font-mono font-semibold text-amber-400">
            {calculatedCostEstimate.toLocaleString()} DZD
          </span>
          <span className="text-[9px] font-mono text-stone-400 block mt-0.5">Sétif Turnkey Included</span>
        </div>
      </div>

      {/* Configurator Core Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Parameters Navigation & Choices */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          {/* Tabs header */}
          <div className="flex bg-stone-950 p-1.5 rounded-xl border border-stone-800/80">
            <button
              onClick={() => setActiveTab("layout")}
              className={`flex-1 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase transition flex items-center justify-center gap-1.5 ${
                activeTab === "layout" ? "bg-amber-500 text-stone-950 font-bold" : "text-stone-400 hover:text-stone-200"
              }`}
            >
              <Columns className="h-3.5 w-3.5" /> 1. Geometry
            </button>
            <button
              onClick={() => setActiveTab("cabinets")}
              className={`flex-1 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase transition flex items-center justify-center gap-1.5 ${
                activeTab === "cabinets" ? "bg-amber-500 text-stone-950 font-bold" : "text-stone-400 hover:text-stone-200"
              }`}
            >
              <Palette className="h-3.5 w-3.5" /> 2. Finishes
            </button>
            <button
              onClick={() => setActiveTab("countertops")}
              className={`flex-1 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase transition flex items-center justify-center gap-1.5 ${
                activeTab === "countertops" ? "bg-amber-500 text-stone-950 font-bold" : "text-stone-400 hover:text-stone-200"
              }`}
            >
              <Layers className="h-3.5 w-3.5" /> 3. Stones
            </button>
          </div>

          {/* Tab Contents: Layout Settings */}
          {activeTab === "layout" && (
            <div className="space-y-6 text-left animate-fadeIn">
              <div>
                <label className="text-xs font-mono text-stone-400 block mb-2 uppercase">A. Choose Structural Arrangement</label>
                <div className="grid grid-cols-2 gap-3">
                  {LAYOUTS.map((layout) => (
                    <button
                      key={layout.id}
                      onClick={() => handleSelectLayout(layout.id)}
                      className={`p-3 rounded-xl border text-left transition relative ${
                        config.layoutId === layout.id
                          ? "bg-stone-800 border-amber-500/80 ring-1 ring-amber-500/40"
                          : "bg-stone-950/60 border-stone-800 hover:border-stone-700 hover:bg-stone-950"
                      }`}
                    >
                      {config.layoutId === layout.id && (
                        <span className="absolute top-2 right-2 bg-amber-500 p-0.5 rounded-full text-stone-950">
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </span>
                      )}
                      <p className="text-sm font-medium text-stone-100">{layout.nameFr}</p>
                      <p className="text-[10px] text-stone-500 font-mono mt-0.5">{layout.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Precise Dimension Sliders */}
              <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800 space-y-4">
                <p className="text-xs font-mono text-stone-400 uppercase">B. Sétif Kitchen Space Dimensions</p>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-stone-400">Width (Largeur du mur):</span>
                      <span className="text-amber-400 font-bold">{config.dimensions.width.toFixed(1)} m</span>
                    </div>
                    <input
                      type="range"
                      min="1.5"
                      max="8.0"
                      step="0.1"
                      value={config.dimensions.width}
                      onChange={(e) => handleDimensionChange("width", parseFloat(e.target.value))}
                      className="w-full accent-amber-500 bg-stone-800"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-stone-400">Length (Longueur):</span>
                      <span className="text-amber-400 font-bold">{config.dimensions.length.toFixed(1)} m</span>
                    </div>
                    <input
                      type="range"
                      min="1.5"
                      max="8.0"
                      step="0.1"
                      value={config.dimensions.length}
                      onChange={(e) => handleDimensionChange("length", parseFloat(e.target.value))}
                      className="w-full accent-amber-500 bg-stone-800"
                    />
                  </div>

                  <div className="pt-2 border-t border-stone-800 flex justify-between items-center text-xs">
                    <span className="text-stone-500">Calculated Linear Footprint:</span>
                    <span className="text-stone-300 font-mono">{(config.dimensions.width + config.dimensions.length).toFixed(1)} meters</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-500/5 rounded-lg border border-amber-500/10 text-[11px] text-amber-200/90 leading-relaxed">
                <strong>Showroom Hint:</strong> Standard ceiling height in Algeria is around 2.7m. Your custom layout allows built-in visual drawers perfectly tailored to standard ceiling structures.
              </div>
            </div>
          )}

          {/* Tab Contents: Cabinet MDF / Acrylic */}
          {activeTab === "cabinets" && (
            <div className="space-y-6 text-left animate-fadeIn">
              <div>
                <label className="text-xs font-mono text-stone-400 block mb-2 uppercase">A. Select Face MDF/Acrylic Core</label>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {CABINET_MATERIALS.map((mat) => (
                    <button
                      key={mat.name}
                      onClick={() => handleSelectMaterial(mat.name)}
                      className={`w-full p-3 rounded-xl border text-left flex items-start justify-between transition ${
                        config.cabinetMaterial === mat.name
                          ? "bg-stone-800 border-amber-500/80"
                          : "bg-stone-950/60 border-stone-800 hover:border-stone-700"
                      }`}
                    >
                      <div className="space-y-0.5 max-w-[85%]">
                        <p className="text-xs font-serif italic text-amber-500">{mat.type}</p>
                        <h4 className="text-sm font-medium text-stone-100">{mat.nameFr}</h4>
                        <p className="text-[10px] text-stone-400 font-normal line-clamp-1">{mat.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] font-mono text-green-400 bg-green-950/60 px-1.5 py-0.5 rounded">
                          x{mat.priceFactor}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-stone-400 block mb-2 uppercase">B. Interactive Color Palette Coating</label>
                <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
                  <p className="text-[11px] text-stone-400 mb-3 uppercase font-mono">Select high-gloss tone for the cabinetry front:</p>
                  <div className="flex flex-wrap gap-3">
                    {currentMaterial.colors.map((color) => {
                      const isSelected = config.selectedColor.toLowerCase() === color.hex.toLowerCase();
                      return (
                        <button
                          key={color.name}
                          onClick={() => handleSelectColor(color.hex)}
                          className={`group relative h-9 w-9 rounded-full border transition-all ${
                            isSelected ? "ring-2 ring-amber-500 ring-offset-2 ring-offset-stone-950 scale-110" : "border-stone-700 hover:scale-105"
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        >
                          {isSelected && (
                            <span className="absolute inset-0 flex items-center justify-center">
                              <Check className={`h-4 w-4 ${color.hex === '#ffffff' || color.hex === '#fcfcfa' || color.hex === '#e0d3c0' ? 'text-stone-900' : 'text-stone-100'}`} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-3 border-t border-stone-800 flex justify-between text-xs text-stone-400">
                    <span>Selected:</span>
                    <span className="font-mono text-stone-200">
                      {currentMaterial.colors.find(c => c.hex.toLowerCase() === config.selectedColor.toLowerCase())?.name || "Premium Tone"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Contents: Countertop selections */}
          {activeTab === "countertops" && (
            <div className="space-y-6 text-left animate-fadeIn">
              <div>
                <label className="text-xs font-mono text-stone-400 block mb-2 uppercase">A. Select Work Countertop Stone / Material</label>
                <div className="space-y-2">
                  {COUNTERTOPS.map((counter) => (
                    <button
                      key={counter.name}
                      onClick={() => handleSelectCountertop(counter.name)}
                      className={`w-full p-3.5 rounded-xl border text-left transition ${
                        config.countertop === counter.name
                          ? "bg-stone-800 border-amber-500/80"
                          : "bg-stone-950/60 border-stone-800 hover:border-stone-700"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-amber-500 uppercase tracking-wide bg-stone-950 px-2 py-0.5 rounded">
                          {counter.priceLevel}
                        </span>
                        <span className="text-[10px] font-mono text-stone-500 text-right">Durability {counter.durability}/5</span>
                      </div>
                      <h4 className="text-sm font-semibold text-stone-100">{counter.nameFr}</h4>
                      <p className="text-[11px] text-stone-400 font-normal mt-0.5">{counter.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 text-left space-y-1">
                <p className="text-[9px] font-mono text-stone-500 uppercase">Selected Stone Special Character:</p>
                <p className="text-xs text-stone-300 font-serif italic">"{currentCountertop.maintenance}"</p>
              </div>
            </div>
          )}

          {/* Bottom Action Indicator */}
          <div className="pt-4 border-t border-stone-800/60 hidden lg:block">
            <button
              onClick={onNavigateToAI}
              className="w-full inline-flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold rounded-xl transition shadow shadow-amber-500/20 group"
            >
              <span>Get AI Blueprint Draft</span>
              <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition" />
            </button>
          </div>

        </div>

        {/* Right Side: Visual SVG Canvas Blueprint Simulator (Interactive "3D-like" Render) */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-stone-950 border border-stone-800 rounded-2xl p-6 relative">
          
          {/* Schematic control and meta */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-mono text-stone-500 tracking-wider">MHK VECTOR ENGINE v2.5</span>
            <div className="flex gap-2 text-[10px] font-mono">
              <span className="px-2 py-0.5 bg-stone-900 border border-stone-800 rounded text-stone-300">
                LAYOUT: {currentLayout.nameFr}
              </span>
              <span className="px-2 py-0.5 bg-stone-900 border border-stone-800 rounded text-amber-400 font-semibold uppercase">
                {currentMaterial.type}
              </span>
            </div>
          </div>

          {/* Interactive Responsive SVG Canvas Container */}
          <div className="flex-1 bg-stone-900/50 border border-stone-800/40 rounded-xl relative overflow-hidden flex items-center justify-center p-4 min-h-[300px]">
            {/* Visual background grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1c1917_1px,transparent_1px),linear-gradient(to_bottom,#1c1917_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
            
            {/* SVG schematic model */}
            <svg 
              className="w-64 h-64 sm:w-80 sm:h-80 relative z-10 transition-all duration-500 transform" 
              viewBox="0 0 300 300"
            >
              <defs>
                {/* Wood/Stone metallic texture fills for extreme luxury */}
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#221f1d" strokeWidth="1"/>
                </pattern>
                
                <radialGradient id="countertopGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#d97706" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
                </radialGradient>
              </defs>

              {/* Countertop shadow glow */}
              <path d={currentLayout.svgPath} fill="url(#countertopGlow)" className="transition-all duration-500" />

              {/* Cabinet MDF Structure with Selected Color Fill */}
              <path 
                d={currentLayout.svgPath} 
                fill={config.selectedColor} 
                stroke="#1c1917" 
                strokeWidth="6" 
                className="transition-colors duration-500 drop-shadow-md"
              />

              {/* Accent Countertop strip on top of cabinet core */}
              <path 
                d={currentLayout.svgPath} 
                fill="none" 
                stroke={config.countertop.includes("Quartz") ? "#e1e0d7" : config.countertop.includes("Granite") ? "#111215" : "#7c2d12"} 
                strokeWidth="2.5" 
                className="transition-colors duration-500"
              />

              {/* Interactive simulated items on top of countertop */}
              {config.layoutId === "l_shape" && (
                <>
                  {/* Built in Cooktop burner */}
                  <rect x="220" y="110" width="30" height="40" rx="3" fill="#121212" stroke="#2c2d30" strokeWidth="1" />
                  <circle cx="230" cy="122" r="4" fill="#ef4444" opacity="0.8" />
                  <circle cx="230" cy="138" r="4" fill="#000000" stroke="#4a5568" />
                  <circle cx="242" cy="122" r="5" fill="#000000" stroke="#4a5568" />
                  <circle cx="242" cy="138" r="5" fill="#ef4444" opacity="0.8" />

                  {/* Sétif standard Double Sink */}
                  <rect x="220" y="190" width="28" height="44" rx="2" fill="#718096" stroke="#4a5568" strokeWidth="1.5" />
                  <rect x="224" y="194" width="10" height="15" rx="1" fill="#4a5568" />
                  <rect x="224" y="214" width="10" height="15" rx="1" fill="#4a5568" />
                  {/* Stainless steel faucet */}
                  <path d="M 238,209 L 246,209 Q 248,209 248,206" fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
                </>
              )}

              {config.layoutId === "u_shape" && (
                <>
                  {/* Stove/Hob */}
                  <rect x="220" y="110" width="30" height="40" rx="3" fill="#151515" stroke="#222" />
                  <circle cx="235" cy="130" r="8" fill="#e0a96d" opacity="0.2" />
                  {/* Double sink */}
                  <rect x="52" y="110" width="28" height="44" rx="2" fill="#4a5568" />
                </>
              )}

              {config.layoutId === "island" && (
                <>
                  {/* Grand central Island Cooktop + prep zone */}
                  <rect x="115" y="175" width="25" height="30" rx="2" fill="#0d0e12" stroke="#2d2f36" strokeWidth="1" />
                  <circle cx="127" cy="190" r="5" fill="#ff7e40" opacity="0.8" />
                  <rect x="155" y="175" width="30" height="30" rx="2" fill="#abb2bf" stroke="#7e8492" strokeWidth="1" />
                </>
              )}

              {/* Labels with dimension lines overlay */}
              <text x="150" y="27" textAnchor="middle" fill="#7c766b" fontSize="8" fontFamily="monospace">
                WIDTH: {config.dimensions.width.toFixed(1)}m
              </text>
              
              <line x1="30" y1="32" x2="270" y2="32" stroke="#443c33" strokeWidth="1" strokeDasharray="2,2" />
              <line x1="30" y1="28" x2="30" y2="36" stroke="#443c33" strokeWidth="1" />
              <line x1="270" y1="28" x2="270" y2="36" stroke="#443c33" strokeWidth="1" />
            </svg>

            {/* Scale indicator legend overlay */}
            <div className="absolute bottom-3 left-3 bg-stone-950/90 text-[10px] p-2 border border-stone-800 rounded flex gap-3 text-stone-400 font-mono">
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-sm" style={{ backgroundColor: config.selectedColor }} /> Cabinets
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-sm bg-stone-700" /> Countertop
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-2.5 w-2.5 bg-neutral-900 border border-amber-500/40 rounded-sm" /> Appliances
              </span>
            </div>
            
            <div className="absolute top-3 right-3 bg-stone-950/80 px-2 py-1 rounded text-[10px] text-amber-500 uppercase font-mono border border-stone-800">
              Interactive Blueprint
            </div>
          </div>

          {/* Quick specs list details */}
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-stone-400 border-t border-stone-800/80 pt-4">
            <div className="bg-stone-900 p-2 rounded">
              <span className="text-stone-500 block uppercase">LAYOUT OPTION</span>
              <span className="text-stone-200 font-medium ">{currentLayout.name}</span>
            </div>
            <div className="bg-stone-900 p-2 rounded">
              <span className="text-stone-500 block uppercase">CABINET COLOR / TEXTURE</span>
              <span className="text-stone-200 font-medium overflow-hidden text-ellipsis block whitespace-nowrap">
                {currentMaterial.colors.find(c => c.hex === config.selectedColor)?.name || "Reflective Finish"}
              </span>
            </div>
            <div className="bg-stone-900 p-2 rounded">
              <span className="text-stone-500 block uppercase">TOP COUNTER STONE</span>
              <span className="text-stone-200 font-medium overflow-hidden text-ellipsis block whitespace-nowrap">
                {currentCountertop.nameFr}
              </span>
            </div>
          </div>

          {/* Mobile Launch AI Button */}
          <div className="mt-4 block lg:hidden">
            <button
              onClick={onNavigateToAI}
              className="w-full inline-flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 text-stone-950 font-semibold rounded-xl"
            >
              <span>Verify &amp; Draft with AI Designer</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
