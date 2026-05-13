// ─── New Hierarchical Data Architecture ───────────────────────────────────────

export interface GreatCropsClient {
  id: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  county: string;
  contractStatus: 'active' | 'pending' | 'expired';
  enrollmentDate: string;
  notes?: string;
}

export interface Ranch {
  id: string;
  clientId: string;
  name: string;
  location: string;
  totalAcreage: number;
  elevation?: string;
  waterSource: string;
  // Service toggles - which products does this ranch use?
  services: {
    soil_microbiology: boolean;
    remote_sensing: boolean;
    soil_chemistry: boolean;
    irrigation_water: boolean;
  };
}

export interface Block {
  id: string;
  ranchId: string;
  clientId: string;
  name: string; // e.g. 'Block A', 'Block 7', 'Hillside North'
  cropType: CropType;
  variety: string;
  rootstock?: string;
  acreage: number;
  plantingYear: number; // This determines the AGE
  soilType: string; // 'Sandy Loam', 'Clay Loam', etc.
  irrigationType: string;
  healthStatus: 'healthy' | 'attention' | 'critical';
  soilHealthScore: number;
}

// Remote Sensing types
export type RemoteSensingProvider = 'aquaspy' | 'soiltech' | 'agrology';

export interface RemoteSensingProbe {
  id: string;
  blockId: string;
  ranchId: string;
  provider: RemoteSensingProvider;
  probeId: string; // e.g. 'AGS-001', 'ST-012', 'AGL-005'
  status: 'online' | 'offline';
  batteryPercent: number;
  signalStrength: number; // 0-100
  lastReading: string; // ISO timestamp
  installDate: string;
}

export interface RemoteSensingReading {
  probeId: string;
  timestamp: string;
  depth_inches: number;
  moisture_percent: number;
  temperature_f: number;
  ec_dsm: number; // electrical conductivity dS/m
  // Provider-specific
  yes_score?: number; // AquaSpy only
  redox_mv?: number; // SoilTech only
  co2_ppm?: number; // Agrology only
  vwc?: number; // Agrology volumetric water content
}

// Soil Microbiology types
export interface MicrobiologyReport {
  id: string;
  blockId: string;
  date: string;
  microbialBiomass: number;
  microbialDiversity: number;
  mycorrhizaePresent: boolean;
  trichodermaPresent: boolean;
  phytophthoraDetected: boolean;
  phytophthoraPressure: 'none' | 'low' | 'moderate' | 'high';
  bacteriaFungalRatio: number;
  organicCarbon: number;
  notes?: string;
}

// Soil Chemistry types
export interface SoilChemistryReport {
  id: string;
  blockId: string;
  date: string;
  labName: string;
  ph: number;
  ec: number;
  organicMatter: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  calcium: number;
  magnesium: number;
  sulfur: number;
  zinc: number;
  manganese: number;
  iron: number;
  boron: number;
  copper: number;
  cec: number; // cation exchange capacity
  notes?: string;
}

// Irrigation/Water Chemistry types
export interface WaterChemistryReport {
  id: string;
  ranchId: string; // water chemistry is per ranch (same source)
  date: string;
  source: string;
  ph: number;
  ec: number;
  tds: number; // total dissolved solids
  sodium: number;
  chloride: number;
  boron: number;
  bicarbonate: number;
  sar: number; // sodium adsorption ratio
  hardness: number;
  notes?: string;
}

// ─── Legacy Types (to be migrated) ────────────────────────────────────────────

export interface Client {
  id: string;
  name: string;
  farmName: string;
  phone: string;
  email: string;
  location: string;
  county: string;
  totalAcreage: number;
  cropsGrown: string[];
  contractStatus: 'active' | 'pending' | 'expired';
  enrollmentDate: string;
  avatar?: string;
}

export interface Field {
  id: string;
  clientId: string;
  name: string;
  cropType: CropType;
  acreage: number;
  plantingYear: number;
  rootstock?: string;
  variety: string;
  healthStatus: 'healthy' | 'attention' | 'critical';
  soilHealthScore: number;
  location: string;
  irrigationType: string;
}

export type CropType = 'avocado' | 'almond' | 'citrus' | 'grape';

export interface Treatment {
  id: string;
  fieldId: string;
  clientId: string;
  materialId: string;
  scheduledDate: string;
  completedDate?: string;
  status: 'scheduled' | 'completed' | 'overdue' | 'skipped';
  applicationRate: string;
  weatherConditions?: string;
  notes?: string;
  growthStage: string;
}

export interface Material {
  id: string;
  name: string;
  description: string;
  category: string;
  defaultRate: string;
  unit: string;
  quantityOnHand: number;
  reorderPoint: number;
  color: string;
}

export interface LabResult {
  id: string;
  fieldId: string;
  clientId: string;
  date: string;
  labName: string;
  resultType: 'soil_composition' | 'tissue_analysis' | 'microbiological' | 'water_quality';
  organicCarbon: number;
  microbialDiversity: number;
  ph: number;
  ec: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  calcium: number;
  magnesium: number;
  phytophthoraPresent: boolean;
  phytophthoraPressure: 'none' | 'low' | 'moderate' | 'high';
  notes?: string;
}

export interface FieldVisit {
  id: string;
  fieldId: string;
  clientId: string;
  date: string;
  observations: string;
  weatherConditions: string;
  temperature: number;
  growthStage: string;
  checklist: ChecklistItem[];
  photos: string[];
  notes: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface Activity {
  id: string;
  type: 'visit' | 'lab_result' | 'treatment' | 'note';
  title: string;
  description: string;
  date: string;
  fieldId?: string;
  clientId?: string;
}

export interface GrowthStage {
  name: string;
  startMonth: number;
  endMonth: number;
}

export interface CropConfig {
  cropType: CropType;
  label: string;
  growthStages: GrowthStage[];
  icon: string;
}

export interface WeatherData {
  date: string;
  high: number;
  low: number;
  condition: string;
  humidity: number;
  wind: number;
}

export interface SoilHealthTrend {
  date: string;
  score: number;
  organicCarbon: number;
  microbialDiversity: number;
  ph: number;
}

export interface ReportData {
  clientId: string;
  beforeYield: number;
  afterYield: number;
  costSavings: number;
  soilHealthBefore: number;
  soilHealthAfter: number;
}

// ─── AgSpy (AquaSpy) Integration ─────────────────────────────────────────────

export interface SoilLayer {
  depth: number; // inches from surface
  moisture: number; // volumetric water content %
  temperature: number; // °F
  ec: number; // electrical conductivity dS/m
}

export interface ProbeReading {
  timestamp: string;
  layers: SoilLayer[];
  yesScore: number;
}

export interface IrrigationEvent {
  startTime: string;
  endTime: string;
  volumeGallons?: number;
  detected: boolean;
}

export interface ProbeAlert {
  id: string;
  probeId: string;
  type: 'over-watering' | 'under-watering' | 'high-salinity' | 'frost-risk' | 'battery-low' | 'signal-lost';
  severity: 'warning' | 'critical';
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

export interface AgSpyProbe {
  id: string; // e.g. 'AGS-001'
  fieldId: string;
  clientId: string;
  status: 'online' | 'offline';
  batteryPercent: number;
  signalStrength: number; // 0-100
  lastReading: string; // ISO timestamp
  yesScore: number; // 0-100, AquaSpy proprietary metric
  installDate: string;
  currentLayers: SoilLayer[];
  activeRootZone: { topDepth: number; bottomDepth: number }; // inches
  hourlyTrend: ProbeReading[]; // 24 data points
  yesScoreTrend: { date: string; score: number }[]; // 7 days
  irrigationEvents: IrrigationEvent[];
  alerts: ProbeAlert[];
}
