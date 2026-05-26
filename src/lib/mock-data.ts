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

// ─── Facility / Operations data ─────────────────────────────────────────────

export const facilityKPIs = {
  kwhPerOccupant: 4.28,
  waterPerOccupant: 0.84,
  unionMembers: 2847,
  cafeteriaRating: 4.6,
  occupancyRate: 87,
  totalOffices: 58,
  buildingCount: 23,
  avgHVACEfficiency: 88.4,
  dailyMeals: 6240,
  foodWasteRate: 6.8,
  supplyDamageRate: 15.3,
  monthlySupplySpend: 184200,
  unionSatisfaction: 4.4,
  membershipRate: 91.2,
};

export type EnergyWaterPoint = {
  month: string;
  energy: number;
  water: number;
  anomaly?: boolean;
};

export const energyWaterData: EnergyWaterPoint[] = [
  { month: "Jan", energy: 42.1, water: 18.4 },
  { month: "Feb", energy: 40.8, water: 17.9 },
  { month: "Mar", energy: 38.5, water: 17.2 },
  { month: "Apr", energy: 36.2, water: 16.8 },
  { month: "May", energy: 35.1, water: 16.3 },
  { month: "Jun", energy: 33.8, water: 15.9 },
  { month: "Jul", energy: 51.4, water: 24.7, anomaly: true },
  { month: "Aug", energy: 34.6, water: 16.1 },
  { month: "Sep", energy: 33.1, water: 15.6 },
  { month: "Oct", energy: 32.4, water: 15.2 },
  { month: "Nov", energy: 31.8, water: 14.9 },
  { month: "Dec", energy: 30.9, water: 14.5 },
];

export type SupplyItem = { supply: string; damageRate: number; total: number };
export const supplyDamageData: SupplyItem[] = [
  { supply: "Printers",    damageRate: 31.8, total: 214 },
  { supply: "Mice",        damageRate: 25.3, total: 1860 },
  { supply: "Keyboards",   damageRate: 22.7, total: 1840 },
  { supply: "Desk Chairs", damageRate: 18.4, total: 2480 },
  { supply: "Headsets",    damageRate: 14.6, total: 920 },
  { supply: "Whiteboards", damageRate: 9.4,  total: 380 },
  { supply: "Monitors",    damageRate: 8.2,  total: 1620 },
  { supply: "Laptops",     damageRate: 6.1,  total: 1580 },
];

export type CityRoute = {
  id: string;
  from: string;
  to: string;
  scope: "inter-city" | "intra-city";
  mode: TransportMode;
  status: "On Time" | "Delayed" | "At Risk";
  distanceKm: number;
  carbon: number;
  durationH: number;
};

export const cityRoutes: CityRoute[] = [
  { id: "CR-01", from: "Beijing",  to: "Shanghai",   scope: "inter-city", mode: "Rail",  status: "On Time", distanceKm: 1318, carbon: 38,  durationH: 4.5 },
  { id: "CR-02", from: "Shanghai", to: "Guangzhou",  scope: "inter-city", mode: "Rail",  status: "On Time", distanceKm: 1213, carbon: 35,  durationH: 4.2 },
  { id: "CR-03", from: "Chengdu",  to: "Beijing",    scope: "inter-city", mode: "Air",   status: "Delayed", distanceKm: 1695, carbon: 148, durationH: 2.5 },
  { id: "CR-04", from: "Shenzhen", to: "Guangzhou",  scope: "intra-city", mode: "Truck", status: "On Time", distanceKm: 140,  carbon: 12,  durationH: 2.0 },
  { id: "CR-05", from: "Pudong",   to: "Jing'an",    scope: "intra-city", mode: "Truck", status: "On Time", distanceKm: 28,   carbon: 4,   durationH: 0.7 },
  { id: "CR-06", from: "Haidian",  to: "Chaoyang",   scope: "intra-city", mode: "Truck", status: "At Risk", distanceKm: 15,   carbon: 3,   durationH: 0.5 },
  { id: "CR-07", from: "Tianhe",   to: "Haizhu",     scope: "intra-city", mode: "Truck", status: "On Time", distanceKm: 12,   carbon: 2,   durationH: 0.4 },
];

export type OfficeLocation = {
  lat: number;
  lng: number;
  city: string;
  offices: number;
};

export const officeLocations: OfficeLocation[] = [
  { lat: 39.9042, lng: 116.4074, city: "Beijing",   offices: 8  },
  { lat: 31.2304, lng: 121.4737, city: "Shanghai",  offices: 12 },
  { lat: 23.1291, lng: 113.2644, city: "Guangzhou", offices: 6  },
  { lat: 22.5431, lng: 114.0579, city: "Shenzhen",  offices: 9  },
  { lat: 30.5728, lng: 104.0668, city: "Chengdu",   offices: 4  },
  { lat: 29.5630, lng: 106.5516, city: "Chongqing", offices: 5  },
  { lat: 30.2741, lng: 120.1551, city: "Hangzhou",  offices: 7  },
  { lat: 32.0603, lng: 118.7969, city: "Nanjing",   offices: 3  },
  { lat: 34.3416, lng: 108.9398, city: "Xi'an",     offices: 2  },
  { lat: 30.5928, lng: 114.3055, city: "Wuhan",     offices: 2  },
];

export type BuildingStat = {
  name: string;
  city: string;
  floors: number;
  occupancy: number;
  energyKwh: number;
  hvacScore: number;
  solarPct: number;
};

export const buildingStats: BuildingStat[] = [
  { name: "HQ Tower A",       city: "Beijing",   floors: 28, occupancy: 94, energyKwh: 2840, hvacScore: 88, solarPct: 34 },
  { name: "Shanghai Plaza",   city: "Shanghai",  floors: 32, occupancy: 91, energyKwh: 3210, hvacScore: 85, solarPct: 28 },
  { name: "Guangzhou Center", city: "Guangzhou", floors: 22, occupancy: 87, energyKwh: 2100, hvacScore: 91, solarPct: 42 },
  { name: "Shenzhen Tech Hub",city: "Shenzhen",  floors: 18, occupancy: 89, energyKwh: 1870, hvacScore: 87, solarPct: 38 },
  { name: "Chengdu Park",     city: "Chengdu",   floors: 12, occupancy: 82, energyKwh: 1240, hvacScore: 92, solarPct: 51 },
  { name: "Wuhan Office",     city: "Wuhan",     floors: 8,  occupancy: 78, energyKwh: 860,  hvacScore: 80, solarPct: 22 },
];

export type CafeteriaMonth = {
  month: string;
  meals: number;
  wasteKg: number;
  score: number;
};

export const cafeteriaMonthly: CafeteriaMonth[] = [
  { month: "Jan", meals: 58400, wasteKg: 4120, score: 4.3 },
  { month: "Feb", meals: 52100, wasteKg: 3840, score: 4.4 },
  { month: "Mar", meals: 61200, wasteKg: 4050, score: 4.5 },
  { month: "Apr", meals: 63800, wasteKg: 3920, score: 4.5 },
  { month: "May", meals: 65100, wasteKg: 3780, score: 4.6 },
  { month: "Jun", meals: 62400, wasteKg: 3640, score: 4.6 },
  { month: "Jul", meals: 59200, wasteKg: 3510, score: 4.7 },
  { month: "Aug", meals: 57800, wasteKg: 3420, score: 4.7 },
  { month: "Sep", meals: 63100, wasteKg: 3380, score: 4.6 },
  { month: "Oct", meals: 66400, wasteKg: 3290, score: 4.8 },
  { month: "Nov", meals: 64900, wasteKg: 3240, score: 4.7 },
  { month: "Dec", meals: 60200, wasteKg: 3180, score: 4.8 },
];

export type MenuCategory = { category: string; items: number; avgCal: number; vegan: boolean };
export const cafeteriaMenu: MenuCategory[] = [
  { category: "Staple",    items: 4, avgCal: 320, vegan: true  },
  { category: "Main",      items: 8, avgCal: 580, vegan: false },
  { category: "Vegetable", items: 6, avgCal: 180, vegan: true  },
  { category: "Soup",      items: 3, avgCal: 120, vegan: true  },
  { category: "Dessert",   items: 4, avgCal: 240, vegan: false },
];

export type UnionDept = { dept: string; members: number; satisfaction: number };
export const unionDepts: UnionDept[] = [
  { dept: "Technology",  members: 482, satisfaction: 4.8 },
  { dept: "Operations",  members: 634, satisfaction: 4.3 },
  { dept: "Finance",     members: 318, satisfaction: 4.6 },
  { dept: "HR",          members: 142, satisfaction: 4.7 },
  { dept: "Facilities",  members: 256, satisfaction: 4.1 },
  { dept: "Marketing",   members: 198, satisfaction: 4.5 },
  { dept: "Legal",       members: 89,  satisfaction: 4.9 },
  { dept: "Other",       members: 728, satisfaction: 4.2 },
];

export const unionSatisfactionTrend = [
  { month: "Jan", score: 4.1 },
  { month: "Feb", score: 4.2 },
  { month: "Mar", score: 4.1 },
  { month: "Apr", score: 4.3 },
  { month: "May", score: 4.4 },
  { month: "Jun", score: 4.3 },
  { month: "Jul", score: 4.5 },
  { month: "Aug", score: 4.4 },
  { month: "Sep", score: 4.5 },
  { month: "Oct", score: 4.6 },
  { month: "Nov", score: 4.5 },
  { month: "Dec", score: 4.6 },
];

export type UnionEvent = {
  id: string;
  title: string;
  date: string;
  type: "Assembly" | "Activity" | "Wellness" | "Legal" | "Training";
  attendees: number;
};

export const unionEvents: UnionEvent[] = [
  { id: "UE-01", title: "Q2 Member Assembly",        date: "2026-06-08", type: "Assembly", attendees: 1200 },
  { id: "UE-02", title: "Annual Sports Day",          date: "2026-06-15", type: "Activity", attendees: 800  },
  { id: "UE-03", title: "Mental Health Workshop",     date: "2026-06-22", type: "Wellness", attendees: 150  },
  { id: "UE-04", title: "Labor Contract Review",      date: "2026-07-05", type: "Legal",    attendees: 45   },
  { id: "UE-05", title: "New Employee Orientation",   date: "2026-07-12", type: "Training", attendees: 240  },
];

export const facilityInsights: { id: string; tone: "warn" | "info" | "good"; title: string; body: string }[] = [
  {
    id: "fi-1",
    tone: "warn",
    title: "Energy anomaly detected",
    body: "July HVAC consumption was 52% above baseline across Floors 18–24. Likely chiller fault — maintenance ticket raised."
  },
  {
    id: "fi-2",
    tone: "info",
    title: "Supply reorder recommended",
    body: "Printer cartridge stock across 3 buildings is below 10%. Suggested reorder quantity: 480 units (¥28,800 est.)."
  },
  {
    id: "fi-3",
    tone: "good",
    title: "Cafeteria waste target met",
    body: "Food waste in Shanghai Plaza canteen dropped 22% after portion-size optimization. Projected annual saving: ¥184,000."
  },
];
