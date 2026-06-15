import { KitchenLayout, CabinetMaterial, CountertopMaterial, PortedProject } from "./types";

export const LAYOUTS: KitchenLayout[] = [
  {
    id: "l_shape",
    name: "L-Shape Layout",
    nameFr: "Cuisine en L",
    description: "Classic ergonomic flow that maximizes corner storage and creates a seamless work triangle.",
    descriptionFr: "Le grand classique ergonomique qui optimise les angles et offre un triangle d'activité parfait.",
    svgPath: "M 40,40 L 260,40 L 260,260 L 210,260 L 210,90 L 40,90 Z",
    idealFor: "Medium residential spaces, apartments, and open-plan concepts."
  },
  {
    id: "u_shape",
    name: "U-Shape Layout",
    nameFr: "Cuisine en U",
    description: "Immersive layout offering extensive countertop workspace and maximum high/low cabinet storage.",
    descriptionFr: "Layout enveloppant offrant un plan de travail colossal et d'immenses volumes de rangement.",
    svgPath: "M 40,40 L 260,40 L 260,260 L 210,260 L 210,90 L 90,90 L 90,260 L 40,260 Z",
    idealFor: "Broad family homes, closed kitchens, and enthusiastic home cooks."
  },
  {
    id: "island",
    name: "Luxury Island Layout",
    nameFr: "Cuisine avec Îlot",
    description: "L-shape combined with a grand central statement island for dining, prep, and high cabinet configurations.",
    descriptionFr: "Une configuration en L complétée par un îlot central majestueux pour la préparation et les repas.",
    svgPath: "M 40,40 L 260,40 L 260,90 L 40,90 Z M 100,160 L 200,160 L 200,220 L 100,220 Z",
    idealFor: "Spacious modern homes, luxury villas, and multi-functional spaces."
  },
  {
    id: "linear",
    name: "Linear / One-Wall",
    nameFr: "Cuisine Linéaire (I-Shape)",
    description: "Elegant single-wall configuration. Perfect for modern minimalist architecture or narrow studios.",
    descriptionFr: "Concentré d'efficacité sur un seul pan de mur, idéal pour les architectures épurées.",
    svgPath: "M 40,40 L 260,40 L 260,90 L 40,90 Z",
    idealFor: "Compact spaces, minimalist open lofts, and holiday apartments."
  }
];

export const CABINET_MATERIALS: CabinetMaterial[] = [
  {
    name: "Acrylic High-Gloss Premium",
    nameFr: "Acrylique Haute Brillance",
    type: "Acrylic",
    description: "Fabulous glass-like finish with unparalleled reflection depth, high scratch resistance, and robust edge protection.",
    durability: 5,
    heatResistance: 4,
    popularity: "Best-seller among luxury modern projects",
    priceFactor: 1.4,
    colors: [
      { name: "Bianco Gloss", hex: "#fcfcfa" },
      { name: "Nero Gloss", hex: "#121212" },
      { name: "Saphir Grey Gloss", hex: "#4a4e52" },
      { name: "Champagne Metallic", hex: "#d8c3a5" },
      { name: "Smaragd Green", hex: "#1e3d36" }
    ]
  },
  {
    name: "High-Gloss MDF (Sourcing Europe)",
    nameFr: "MDF High-Gloss Polylac",
    type: "MDF",
    description: "Industrial-grade MDF core coated with a highly reflective, wear-proof surface. Best balance of deep color and structural value.",
    durability: 4,
    heatResistance: 3,
    popularity: "Extremely popular in Sétif modern apartments",
    priceFactor: 1.1,
    colors: [
      { name: "Cashmere Grey", hex: "#dfdbd4" },
      { name: "Anthracite Velvet", hex: "#2f353b" },
      { name: "Latte Cream", hex: "#e0d3c0" },
      { name: "Bordeaux Red Reflect", hex: "#5b1e23" },
      { name: "Pure White Reflect", hex: "#ffffff" }
    ]
  },
  {
    name: "Industrial Compact Laminate",
    nameFr: "Laminé Compact Ultra-Résistant",
    type: "Compact",
    description: "Ultra-thin, extremely dense composition that is 100% waterproof, impact-proof, and designed for heavy duty use.",
    durability: 5,
    heatResistance: 5,
    popularity: "Favored by architects for high-stress zones",
    priceFactor: 1.25,
    colors: [
      { name: "Industrial Slate Wood", hex: "#4b443c" },
      { name: "Oxidized Iron", hex: "#56534e" },
      { name: "Carbon Fiber Finish", hex: "#1c1c1c" },
      { name: "Sandstone Matte", hex: "#d5cbb8" }
    ]
  },
  {
    name: "Natural Oak & Walnut Veneer",
    nameFr: "Placage Bois Naturel Haut de Gamme",
    type: "Natural Wood",
    description: "Rich natural wood layers pressed onto durable MDF. Delivers the organic prestige, touch texture, and status of solid timber.",
    durability: 4,
    heatResistance: 4,
    popularity: "Exclusive selection for luxury classic/modern crossover kitchens",
    priceFactor: 1.6,
    colors: [
      { name: "Sétif Golden Oak", hex: "#bfa37c" },
      { name: "Smoked Walnut", hex: "#4f3b2d" },
      { name: "Charred Ash Noir", hex: "#221f20" },
      { name: "Honey Elm", hex: "#caa17b" }
    ]
  }
];

export const COUNTERTOPS: CountertopMaterial[] = [
  {
    name: "Premium Quartz (Silestone Class)",
    nameFr: "Quartz Compact Premium",
    description: "Engineered stone combining 93% pure quartz crystals with high-tech resins. Non-porous, stain-proof, and seamless.",
    durability: 5,
    maintenance: "Zero-maintenance. Clean with simple soapy water.",
    priceLevel: "Premium",
    priceFactor: 1.35,
    colors: [
      { name: "Statuario White (Gold Vein)", hex: "#f3eedd", bgClass: "bg-radial from-slate-100 to-amber-50" },
      { name: "Cement Grey Concrete", hex: "#8c8d8f", bgClass: "bg-slate-400" },
      { name: "Calacatta Gold Classic", hex: "#faf9f5", bgClass: "bg-radial from-slate-50 via-zinc-100 to-amber-200" }
    ]
  },
  {
    name: "Nero Marquina Natural Granite",
    nameFr: "Granit Naturel Noir Absolu",
    description: "Ultra-luxurious premium granite imported for MHK Cuisine. Highly resilient, heatproof to 500°C, and deeply unique.",
    durability: 5,
    maintenance: "Requires annual sealing. Highly heat and knife proof.",
    priceLevel: "Luxury",
    priceFactor: 1.5,
    colors: [
      { name: "Nero Marquina Gold", hex: "#151618", bgClass: "bg-radial from-zinc-800 to-neutral-950" },
      { name: "Sétif Silver Grey Speckle", hex: "#3e4247", bgClass: "bg-indigo-950" }
    ]
  },
  {
    name: "Acrylic Solid Stone Surface",
    nameFr: "Pierre Acrylique Translucide",
    description: "Warm-touch polymer based stone that can be thermoformed into any curved joint-free design.",
    durability: 4,
    maintenance: "Can be rebuffed of light scratches on site. Completely seamless.",
    priceLevel: "Premium",
    priceFactor: 1.25,
    colors: [
      { name: "Polar Ice Translucent", hex: "#eaf3f5", bgClass: "bg-cyan-50" },
      { name: "Silt Speckle Velvet", hex: "#9d9385", bgClass: "bg-stone-500" }
    ]
  },
  {
    name: "Postformed Fundermax Wood",
    nameFr: "Aggloméré Postformé Fundermax",
    description: "Heavy-duty laminate core mimicking solid wood planking. Waterproof facing, highly scratch resistant, and wallet-friendly.",
    durability: 3.5,
    maintenance: "Avoid standing water on joints. Highly resistant to tea or coffee stains.",
    priceLevel: "Medium",
    priceFactor: 1.0,
    colors: [
      { name: "Smoked Oak Wood Block", hex: "#7a6249", bgClass: "bg-amber-800" },
      { name: "Brushed Aluminium", hex: "#9ea3a8", bgClass: "bg-zinc-300" }
    ]
  }
];

export const SHOWROOM_PORTFOLIO: PortedProject[] = [
  {
    title: "The Sétif Heights Residence",
    location: "Les Crêtes (الهضاب), Sétif",
    style: "Modern European",
    material: "Acrylique Haute Brillance Black & White",
    countertop: "Quartz Calacatta Gold",
    imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=700",
    dimensions: "3.8m x 4.5m (L-Shape with island)"
  },
  {
    title: "Park Mall Luxury Apartment",
    location: "Downtown Sétif, near Park Mall",
    style: "Minimalistic Slate",
    material: "Placage Chêne Fumé Noir",
    countertop: "Granit Noir Absolu Nero Marquina",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=700",
    dimensions: "5.0m x 2.2m (I-Shape Linear Gallery)"
  },
  {
    title: "Villas des Crêtes Living Kitchen",
    location: "Cité Yahiaoui, Sétif",
    style: "Classic Luxury Crossover",
    material: "MDF High-Gloss Cashmere & Gold Metallic Brass",
    countertop: "Statuario White Quartz",
    imageUrl: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&q=80&w=700",
    dimensions: "4.2m x 4.2m (U-Shape with built-in bar)"
  },
  {
    title: "El-Hidhb Family Villa",
    location: "Sétif East, El-Hidhb",
    style: "Industrial Compact Concept",
    material: "Laminé Compact Slate Grey & Smoked Oak Veneer",
    countertop: "Cement Grey Concrete Solid Stone",
    imageUrl: "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&q=80&w=700",
    dimensions: "3.5m x 5.2m (Island Layout with built-in pantry)"
  }
];
