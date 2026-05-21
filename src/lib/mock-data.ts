export type ESGRating = "AAA" | "AA" | "A" | "BBB" | "BB" | "B";
export type RiskLevel = "Low" | "Medium" | "High" | "Critical";
export type TransportMode = "Sea" | "Air" | "Rail" | "Truck";

export type Supplier = {
  id: string;
  name: string;
  country: string;
  industry: string;
  esgScore: number;
  rating: ESGRating;
  carbon: number; // tCO2e/yr
  compliance: number; // %
  financial: number; // %
  logistics: number; // %
  risk: RiskLevel;
  spendUSD: number;
  contractsActive: number;
  certifications: string[];
};

export type Tender = {
  id: string;
  title: string;
  reference: string;
  budgetUSD: number;
  status: "Open" | "Evaluating" | "Awarded" | "Closed";
  suppliers: number;
  esgRequirement: ESGRating;
  deadline: string;
  region: string;
  category: string;
  progress: number; // 0..100
};

export type EmissionPoint = { month: string; scope1: number; scope2: number; scope3: number };

export type Route = {
  id: string;
  from: string;
  to: string;
  mode: TransportMode;
  status: "On Time" | "Delayed" | "At Risk";
  carbon: number;
  costUSD: number;
  days: number;
};

export const KPIs = {
  esgScore: 86.4,
  esgConfidence: 94.2,
  netZeroProgress: 62,
  carbonReduction: 18.7, // % YoY
  monitoredSuppliers: 1284,
  greenFinanceUSD: 2_840_000_000,
  activeTenders: 47,
  countriesCovered: 64
};

export const ratingDist = [
  { rating: "AAA", value: 12 },
  { rating: "AA", value: 28 },
  { rating: "A", value: 34 },
  { rating: "BBB", value: 18 },
  { rating: "BB", value: 6 },
  { rating: "B", value: 2 }
];

export const emissions: EmissionPoint[] = [
  { month: "Jan", scope1: 142, scope2: 318, scope3: 712 },
  { month: "Feb", scope1: 138, scope2: 305, scope3: 698 },
  { month: "Mar", scope1: 130, scope2: 296, scope3: 670 },
  { month: "Apr", scope1: 124, scope2: 288, scope3: 651 },
  { month: "May", scope1: 119, scope2: 274, scope3: 633 },
  { month: "Jun", scope1: 112, scope2: 261, scope3: 612 },
  { month: "Jul", scope1: 108, scope2: 252, scope3: 596 },
  { month: "Aug", scope1: 104, scope2: 244, scope3: 581 },
  { month: "Sep", scope1: 99, scope2: 232, scope3: 562 },
  { month: "Oct", scope1: 95, scope2: 224, scope3: 545 },
  { month: "Nov", scope1: 91, scope2: 218, scope3: 528 },
  { month: "Dec", scope1: 86, scope2: 209, scope3: 510 }
];

export const suppliers: Supplier[] = [
  {
    id: "SUP-1042",
    name: "Nordic Green Logistics A/S",
    country: "Denmark",
    industry: "Logistics",
    esgScore: 92,
    rating: "AAA",
    carbon: 18420,
    compliance: 98,
    financial: 91,
    logistics: 95,
    risk: "Low",
    spendUSD: 38_400_000,
    contractsActive: 6,
    certifications: ["ISO 14001", "SBTi", "EcoVadis Platinum"]
  },
  {
    id: "SUP-2048",
    name: "Tata Sustainable Steel",
    country: "India",
    industry: "Materials",
    esgScore: 81,
    rating: "AA",
    carbon: 142000,
    compliance: 88,
    financial: 86,
    logistics: 82,
    risk: "Medium",
    spendUSD: 92_700_000,
    contractsActive: 11,
    certifications: ["ISO 14064", "ResponsibleSteel"]
  },
  {
    id: "SUP-3194",
    name: "Pacific Maritime Holdings",
    country: "Singapore",
    industry: "Shipping",
    esgScore: 78,
    rating: "A",
    carbon: 210400,
    compliance: 84,
    financial: 89,
    logistics: 90,
    risk: "Medium",
    spendUSD: 121_000_000,
    contractsActive: 8,
    certifications: ["IMO 2030", "Green Marine"]
  },
  {
    id: "SUP-4521",
    name: "Shenzhen Solar Components",
    country: "China",
    industry: "Electronics",
    esgScore: 74,
    rating: "A",
    carbon: 88600,
    compliance: 79,
    financial: 84,
    logistics: 81,
    risk: "Medium",
    spendUSD: 47_300_000,
    contractsActive: 5,
    certifications: ["ISO 14001"]
  },
  {
    id: "SUP-5732",
    name: "Brazil AgriCarbon Co.",
    country: "Brazil",
    industry: "Agriculture",
    esgScore: 67,
    rating: "BBB",
    carbon: 64200,
    compliance: 72,
    financial: 78,
    logistics: 70,
    risk: "High",
    spendUSD: 22_800_000,
    contractsActive: 4,
    certifications: ["Rainforest Alliance"]
  },
  {
    id: "SUP-6088",
    name: "UK Renewable Textiles",
    country: "United Kingdom",
    industry: "Textiles",
    esgScore: 88,
    rating: "AA",
    carbon: 12100,
    compliance: 95,
    financial: 88,
    logistics: 86,
    risk: "Low",
    spendUSD: 18_500_000,
    contractsActive: 3,
    certifications: ["GOTS", "Fair Trade"]
  }
];

export const tenders: Tender[] = [
  {
    id: "T-9821",
    title: "Net-Zero Pacific Shipping Lane Q3",
    reference: "HSBC-NZ-PAC-Q3",
    budgetUSD: 48_500_000,
    status: "Open",
    suppliers: 14,
    esgRequirement: "AA",
    deadline: "2026-07-12",
    region: "APAC",
    category: "Maritime Logistics",
    progress: 64
  },
  {
    id: "T-9772",
    title: "EU Sustainable Packaging Framework",
    reference: "HSBC-EU-PKG-2026",
    budgetUSD: 22_300_000,
    status: "Evaluating",
    suppliers: 22,
    esgRequirement: "A",
    deadline: "2026-06-30",
    region: "EMEA",
    category: "Packaging",
    progress: 81
  },
  {
    id: "T-9645",
    title: "LATAM Green Cold Chain Expansion",
    reference: "HSBC-LATAM-CC",
    budgetUSD: 31_900_000,
    status: "Open",
    suppliers: 9,
    esgRequirement: "BBB",
    deadline: "2026-08-04",
    region: "LATAM",
    category: "Cold Chain",
    progress: 38
  },
  {
    id: "T-9504",
    title: "Renewable Steel Procurement",
    reference: "HSBC-STL-RNW",
    budgetUSD: 110_000_000,
    status: "Awarded",
    suppliers: 6,
    esgRequirement: "AAA",
    deadline: "2026-05-19",
    region: "Global",
    category: "Materials",
    progress: 100
  },
  {
    id: "T-9388",
    title: "Africa Solar Energy Logistics",
    reference: "HSBC-AFR-SOL",
    budgetUSD: 14_200_000,
    status: "Open",
    suppliers: 11,
    esgRequirement: "A",
    deadline: "2026-09-21",
    region: "Africa",
    category: "Energy",
    progress: 22
  }
];

export const routes: Route[] = [
  { id: "R-01", from: "Shanghai", to: "Rotterdam", mode: "Sea", status: "On Time", carbon: 412, costUSD: 280000, days: 32 },
  { id: "R-02", from: "Singapore", to: "Long Beach", mode: "Sea", status: "Delayed", carbon: 388, costUSD: 265000, days: 28 },
  { id: "R-03", from: "Frankfurt", to: "New York", mode: "Air", status: "On Time", carbon: 1240, costUSD: 410000, days: 2 },
  { id: "R-04", from: "Mumbai", to: "London", mode: "Sea", status: "At Risk", carbon: 360, costUSD: 230000, days: 24 },
  { id: "R-05", from: "Chongqing", to: "Duisburg", mode: "Rail", status: "On Time", carbon: 96, costUSD: 180000, days: 16 }
];

// Globe nodes (lat, lng, label, intensity)
export const globeNodes: { lat: number; lng: number; label: string; intensity: number }[] = [
  { lat: 51.5074, lng: -0.1278, label: "London", intensity: 0.95 },
  { lat: 40.7128, lng: -74.006, label: "New York", intensity: 0.9 },
  { lat: 1.3521, lng: 103.8198, label: "Singapore", intensity: 0.92 },
  { lat: 22.3193, lng: 114.1694, label: "Hong Kong", intensity: 0.96 },
  { lat: 31.2304, lng: 121.4737, label: "Shanghai", intensity: 0.88 },
  { lat: 25.2048, lng: 55.2708, label: "Dubai", intensity: 0.78 },
  { lat: -23.5505, lng: -46.6333, label: "São Paulo", intensity: 0.7 },
  { lat: -33.8688, lng: 151.2093, label: "Sydney", intensity: 0.74 },
  { lat: 19.4326, lng: -99.1332, label: "Mexico City", intensity: 0.6 },
  { lat: 35.6762, lng: 139.6503, label: "Tokyo", intensity: 0.86 },
  { lat: 52.52, lng: 13.405, label: "Berlin", intensity: 0.7 },
  { lat: -1.2921, lng: 36.8219, label: "Nairobi", intensity: 0.55 }
];

export const aiInsights: { id: string; tone: "warn" | "info" | "good"; title: string; body: string }[] = [
  {
    id: "ai-1",
    tone: "warn",
    title: "Scope 3 anomaly detected",
    body: "Pacific Maritime Holdings shows a 12% Scope 3 surge in the past 14 days. Consider rebalancing 8% of Q3 volume to Nordic Green Logistics."
  },
  {
    id: "ai-2",
    tone: "info",
    title: "Carbon optimization opportunity",
    body: "Switching the Mumbai → London leg from Sea to Rail+Sea hybrid could save 184 tCO2e and reduce transit by 3 days."
  },
  {
    id: "ai-3",
    tone: "good",
    title: "Supplier upgrade ready",
    body: "UK Renewable Textiles qualifies for AAA. Promotion will unlock 0.35% green-loan rate reduction across 3 contracts."
  }
];
