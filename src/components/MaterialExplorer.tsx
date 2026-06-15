import React, { useState } from "react";
import { CABINET_MATERIALS, COUNTERTOPS } from "../data";
import { CabinetMaterial, CountertopMaterial, DesignConfig } from "../types";
import { Sparkles, Star, ThumbsUp, Scale, Check } from "lucide-react";

interface MaterialExplorerProps {
  config: DesignConfig;
  onChangeConfig: (newConfig: DesignConfig) => void;
}

export default function MaterialExplorer({ config, onChangeConfig }: MaterialExplorerProps) {
  const [boardType, setBoardType] = useState<"cabinets" | "countertops">("cabinets");

  const selectCabinet = (cabinetMaterial: string) => {
    const mat = CABINET_MATERIALS.find(m => m.name === cabinetMaterial)!;
    onChangeConfig({
      ...config,
      cabinetMaterial,
      selectedColor: mat.colors[0].hex
    });
  };

  const selectCountertop = (countertop: string) => {
    onChangeConfig({
      ...config,
      countertop
    });
  };

  const currentCabinet = CABINET_MATERIALS.find(m => m.name === config.cabinetMaterial) || CABINET_MATERIALS[0];
  const currentCountertop = COUNTERTOPS.find(c => c.name === config.countertop) || COUNTERTOPS[0];

  return (
    <div id="material-board" className="mt-12 bg-stone-900 border border-stone-800 rounded-3xl p-6 lg:p-10 shadow-xl text-stone-100">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-mono text-amber-500 uppercase tracking-widest block mb-1">MHK MATERIAUX</span>
          <h3 className="text-2xl sm:text-3xl font-sans font-medium text-stone-100">
            Showroom Material Board &amp; Specs
          </h3>
          <p className="text-sm text-stone-400 mt-1 max-w-xl">
            Inspect our industrial-grade materials sourced from Europe and handcrafted locally in Sétif. Tap any card to load it directly into your planner.
          </p>
        </div>

        {/* Board Toggle buttons */}
        <div className="flex bg-stone-950 p-1 rounded-xl border border-stone-800">
          <button
            onClick={() => setBoardType("cabinets")}
            className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition ${
              boardType === "cabinets" ? "bg-amber-500 text-stone-950 font-bold" : "text-stone-400 hover:text-stone-200"
            }`}
          >
            Cabinetry cores
          </button>
          <button
            onClick={() => setBoardType("countertops")}
            className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition ${
              boardType === "countertops" ? "bg-amber-500 text-stone-950 font-bold" : "text-stone-400 hover:text-stone-200"
            }`}
          >
            Countertop stones
          </button>
        </div>
      </div>

      {/* Material Grid list */}
      {boardType === "cabinets" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {CABINET_MATERIALS.map((mat) => {
            const isSelected = config.cabinetMaterial === mat.name;
            return (
              <div
                key={mat.name}
                onClick={() => selectCabinet(mat.name)}
                className={`p-6 rounded-2xl border transition duration-300 cursor-pointer relative flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? "bg-stone-950 border-amber-500 shadow-xl shadow-amber-500/[0.02]"
                    : "bg-stone-950/40 border-stone-800 hover:border-stone-700 hover:bg-stone-950/60"
                }`}
              >
                {/* Active check indicator */}
                {isSelected && (
                  <span className="absolute top-4 right-4 bg-amber-500 text-stone-950 text-xs px-2.5 py-1 rounded-full font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                    <Check className="h-3 w-3 stroke-[3]" /> Active Finish
                  </span>
                )}

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-amber-500 uppercase tracking-wider block">{mat.type} core</span>
                  <h4 className="text-lg font-sans font-medium text-stone-200">{mat.nameFr}</h4>
                  <p className="text-xs text-stone-500 font-mono leading-none">{mat.name}</p>
                  <p className="text-xs text-stone-400 leading-relaxed font-light">{mat.description}</p>
                </div>

                {/* Performance specs */}
                <div className="grid grid-cols-2 gap-4 border-t border-stone-850 pt-4 text-xs font-mono text-stone-400">
                  <div>
                    <span className="text-stone-500 block text-[9px] uppercase">DURABILITY RATING</span>
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < mat.durability ? "text-amber-500 fill-amber-500" : "text-stone-800"}`} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[9px] uppercase">SÉTIF POPULARITY</span>
                    <span className="text-stone-300 font-medium text-[11px] block mt-1 overflow-hidden text-ellipsis whitespace-nowrap">{mat.popularity}</span>
                  </div>
                </div>

                {/* Color swatches nested */}
                <div className="pt-2">
                  <span className="text-stone-500 block text-[9px] font-mono uppercase mb-2">FACTORY COLOR SWATCHES</span>
                  <div className="flex flex-wrap gap-2">
                    {mat.colors.map((c) => (
                      <span
                        key={c.name}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-[10px] font-mono"
                      >
                        <span className="h-2 w-2 rounded-full border border-stone-700" style={{ backgroundColor: c.hex }} />
                        <span>{c.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {COUNTERTOPS.map((stone) => {
            const isSelected = config.countertop === stone.name;
            return (
              <div
                key={stone.name}
                onClick={() => selectCountertop(stone.name)}
                className={`p-6 rounded-2xl border transition duration-300 cursor-pointer relative flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? "bg-stone-950 border-amber-500 shadow-xl"
                    : "bg-stone-950/40 border-stone-800 hover:border-stone-700 hover:bg-stone-950/60"
                }`}
              >
                {isSelected && (
                  <span className="absolute top-4 right-4 bg-amber-500 text-stone-950 text-xs px-2.5 py-1 rounded-full font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                    <Check className="h-3 w-3 stroke-[3]" /> Selected Stone
                  </span>
                )}

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-amber-500 uppercase tracking-wider block">{stone.priceLevel} stone</span>
                  <h4 className="text-lg font-sans font-medium text-stone-200">{stone.nameFr}</h4>
                  <p className="text-xs text-stone-500 font-mono leading-none">{stone.name}</p>
                  <p className="text-xs text-stone-400 leading-relaxed font-light">{stone.description}</p>
                </div>

                {/* Maintenance specifications */}
                <div className="p-3 bg-stone-900/50 border border-stone-850 rounded-xl text-xs flex items-start gap-2.5 text-stone-300 italic font-serif">
                  <Sparkles className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>"{stone.maintenance}"</span>
                </div>

                {/* Performance metrics */}
                <div className="grid grid-cols-2 gap-4 border-t border-stone-850 pt-4 text-xs font-mono text-stone-400">
                  <div>
                    <span className="text-stone-500 block text-[9px] uppercase">DURABILITY RATING</span>
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(stone.durability) ? "text-amber-500 fill-amber-500" : "text-stone-800"}`} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[9px] uppercase">PRICE TIER</span>
                    <span className="text-stone-300 font-bold block mt-1 uppercase text-xs">{stone.priceLevel} (x{stone.priceFactor})</span>
                  </div>
                </div>

                {/* Available details */}
                <div className="pt-2">
                  <span className="text-stone-500 block text-[9px] font-mono uppercase mb-2">PROMINENT STONE DESIGNS</span>
                  <div className="flex flex-wrap gap-2">
                    {stone.colors.map((col) => (
                      <span
                        key={col.name}
                        className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-[10px]"
                      >
                        <span className={`h-3.5 w-3.5 rounded border border-stone-850 ${col.bgClass}`} style={{ backgroundColor: col.hex }} />
                        <span className="font-mono text-stone-300">{col.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Sétif localized sourcing badge */}
      <div className="mt-8 p-4 bg-stone-950/80 border border-stone-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-400 text-left">
        <div className="flex items-center gap-2">
          <Scale className="h-5 w-5 text-amber-500 flex-shrink-0" />
          <span>Sourcing and processing values conform fully to European laser edge standard ISO 9001 regulations.</span>
        </div>
        <span className="text-[10px] text-amber-500 uppercase font-semibold flex-shrink-0">MHK SÉTIF INDUSTRIAL FABRIC</span>
      </div>

    </div>
  );
}
