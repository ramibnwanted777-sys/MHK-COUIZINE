export interface DimensionRange {
  width: number;  // in meters
  length: number; // in meters
  height: number; // in meters
}

export interface KitchenLayout {
  id: string;
  name: string;
  nameFr: string;
  description: string;
  descriptionFr: string;
  svgPath: string; // for interactive illustration
  idealFor: string;
}

export interface CabinetMaterial {
  name: string;
  nameFr: string;
  type: string;
  description: string;
  durability: number; // 1-5 rating
  heatResistance: number; // 1-5 rating
  popularity: string;
  colors: { name: string; hex: string }[];
  priceFactor: number; // 1.0 standard, 1.5 premium...
}

export interface CountertopMaterial {
  name: string;
  nameFr: string;
  description: string;
  durability: number;
  maintenance: string;
  colors: { name: string; hex: string; bgClass: string }[];
  priceLevel: "Medium" | "Premium" | "Luxury";
  priceFactor: number;
}

export interface PortedProject {
  title: string;
  location: string;
  style: string;
  material: string;
  countertop: string;
  imageUrl: string;
  dimensions: string;
}

export interface BookingState {
  fullName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  notes: string;
}

export interface DesignConfig {
  layoutId: string;
  dimensions: DimensionRange;
  style: "Modern European" | "Minimalistic Slate" | "Industrial Compact" | "Classic Luxury";
  cabinetMaterial: string;
  selectedColor: string;
  countertop: string;
  appliances: "Built-In Standard" | "None / Supply Own" | "Smart Premium";
  budgetTier: "Standard Mid-Range" | "Premium High-End" | "Luxury Custom";
  additionalNotes: string;
}
