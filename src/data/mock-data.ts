import type {
  Client, Field, Treatment, Material, LabResult,
  FieldVisit, Activity, CropConfig, WeatherData, SoilHealthTrend,
} from '../types';

// ─── Materials (The 6 Great Crops Proprietary Products) ───────────────────────

export const materials: Material[] = [
  {
    id: 'mat-1', name: 'GC-Carbon Plus',
    description: 'Liquid humic/fulvic acid concentrate for building soil organic carbon. Enhances CEC and water-holding capacity.',
    category: 'Soil Amendment', defaultRate: '2 gal/acre', unit: 'gallons',
    quantityOnHand: 245, reorderPoint: 50, color: '#4E342E',
  },
  {
    id: 'mat-2', name: 'GC-MicroBio',
    description: 'Proprietary consortium of beneficial soil microorganisms including mycorrhizae, trichoderma, and nitrogen-fixing bacteria.',
    category: 'Biological', defaultRate: '32 oz/acre', unit: 'ounces',
    quantityOnHand: 180, reorderPoint: 40, color: '#2E7D32',
  },
  {
    id: 'mat-3', name: 'GC-RootShield',
    description: 'Biological root protectant targeting Phytophthora and other root pathogens. Contains competitive exclusion organisms.',
    category: 'Biological', defaultRate: '1 gal/acre', unit: 'gallons',
    quantityOnHand: 92, reorderPoint: 30, color: '#1565C0',
  },
  {
    id: 'mat-4', name: 'GC-NutriBlend',
    description: 'Chelated micronutrient blend (Zn, Mn, Fe, B, Cu, Mo) optimized for permanent crops. Foliar or fertigation.',
    category: 'Nutrition', defaultRate: '1 qt/acre', unit: 'quarts',
    quantityOnHand: 156, reorderPoint: 35, color: '#F9A825',
  },
  {
    id: 'mat-5', name: 'GC-PhytoGuard',
    description: 'Plant-derived elicitor that activates systemic acquired resistance (SAR). Preventative disease management.',
    category: 'Plant Health', defaultRate: '16 oz/acre', unit: 'ounces',
    quantityOnHand: 64, reorderPoint: 25, color: '#7B1FA2',
  },
  {
    id: 'mat-6', name: 'GC-SoilRevive',
    description: 'Calcium-based soil conditioner with organic acids. Breaks hardpan, improves infiltration, and corrects pH.',
    category: 'Soil Amendment', defaultRate: '3 gal/acre', unit: 'gallons',
    quantityOnHand: 310, reorderPoint: 60, color: '#BF360C',
  },
];

// ─── Clients ──────────────────────────────────────────────────────────────────

export const clients: Client[] = [
  {
    id: 'cl-1', name: 'Roberto Mendoza', farmName: 'Mendoza Family Ranch',
    phone: '(805) 234-5678', email: 'roberto@mendozaranch.com',
    location: 'Carpinteria, CA', county: 'Santa Barbara',
    totalAcreage: 120, cropsGrown: ['avocado', 'citrus'],
    contractStatus: 'active', enrollmentDate: '2024-09-15',
  },
  {
    id: 'cl-2', name: 'Sarah Chen', farmName: 'Pacific Ridge Orchards',
    phone: '(805) 345-6789', email: 'sarah@pacificridge.com',
    location: 'San Luis Obispo, CA', county: 'San Luis Obispo',
    totalAcreage: 85, cropsGrown: ['almond'],
    contractStatus: 'active', enrollmentDate: '2024-11-01',
  },
  {
    id: 'cl-3', name: 'Miguel Torres', farmName: 'Torres Vineyard & Orchard',
    phone: '(805) 456-7890', email: 'miguel@torresvineyard.com',
    location: 'Paso Robles, CA', county: 'San Luis Obispo',
    totalAcreage: 200, cropsGrown: ['grape', 'almond'],
    contractStatus: 'active', enrollmentDate: '2024-07-20',
  },
  {
    id: 'cl-4', name: 'Linda Nakamura', farmName: 'Nakamura Citrus Co.',
    phone: '(805) 567-8901', email: 'linda@nakamuracitrus.com',
    location: 'Santa Paula, CA', county: 'Ventura',
    totalAcreage: 95, cropsGrown: ['citrus'],
    contractStatus: 'active', enrollmentDate: '2025-01-10',
  },
  {
    id: 'cl-5', name: 'James Whitfield', farmName: 'Whitfield Avocado Group',
    phone: '(805) 678-9012', email: 'james@whitfieldavo.com',
    location: 'Goleta, CA', county: 'Santa Barbara',
    totalAcreage: 160, cropsGrown: ['avocado'],
    contractStatus: 'active', enrollmentDate: '2024-06-01',
  },
  {
    id: 'cl-6', name: 'Patricia Alvarez', farmName: 'Alvarez Organic Farms',
    phone: '(805) 789-0123', email: 'patricia@alvarezorganic.com',
    location: 'Los Alamos, CA', county: 'Santa Barbara',
    totalAcreage: 75, cropsGrown: ['avocado', 'citrus'],
    contractStatus: 'active', enrollmentDate: '2025-02-15',
  },
  {
    id: 'cl-7', name: 'David Kim', farmName: 'Central Coast Almonds',
    phone: '(805) 890-1234', email: 'david@centralcoastalmonds.com',
    location: 'Templeton, CA', county: 'San Luis Obispo',
    totalAcreage: 300, cropsGrown: ['almond'],
    contractStatus: 'active', enrollmentDate: '2024-08-10',
  },
  {
    id: 'cl-8', name: 'Maria Gonzales', farmName: 'Gonzales Heritage Groves',
    phone: '(805) 901-2345', email: 'maria@gonzalesgroves.com',
    location: 'Ojai, CA', county: 'Ventura',
    totalAcreage: 55, cropsGrown: ['avocado', 'citrus'],
    contractStatus: 'pending', enrollmentDate: '2026-03-01',
  },
  {
    id: 'cl-9', name: 'Tom Richardson', farmName: 'Richardson Ranch',
    phone: '(805) 012-3456', email: 'tom@richardsonranch.com',
    location: 'Arroyo Grande, CA', county: 'San Luis Obispo',
    totalAcreage: 140, cropsGrown: ['grape'],
    contractStatus: 'active', enrollmentDate: '2024-10-15',
  },
  {
    id: 'cl-10', name: 'Elena Vargas', farmName: 'Vargas Valley Farms',
    phone: '(805) 123-4567', email: 'elena@vargasvalley.com',
    location: 'Santa Maria, CA', county: 'Santa Barbara',
    totalAcreage: 110, cropsGrown: ['grape', 'citrus'],
    contractStatus: 'expired', enrollmentDate: '2023-05-01',
  },
];

// ─── Fields ───────────────────────────────────────────────────────────────────

export const fields: Field[] = [
  // Mendoza Family Ranch
  { id: 'f-1', clientId: 'cl-1', name: 'Hillside Block A', cropType: 'avocado', acreage: 45, plantingYear: 2015, rootstock: 'Dusa', variety: 'Hass', healthStatus: 'healthy', soilHealthScore: 82, location: 'North slope, well-drained', irrigationType: 'Micro-sprinkler' },
  { id: 'f-2', clientId: 'cl-1', name: 'Valley Grove', cropType: 'avocado', acreage: 35, plantingYear: 2018, rootstock: 'Dusa', variety: 'Hass', healthStatus: 'attention', soilHealthScore: 65, location: 'Valley floor, clay loam', irrigationType: 'Drip' },
  { id: 'f-3', clientId: 'cl-1', name: 'Citrus Row East', cropType: 'citrus', acreage: 40, plantingYear: 2012, variety: 'Washington Navel', healthStatus: 'healthy', soilHealthScore: 78, location: 'East facing, sandy loam', irrigationType: 'Drip' },

  // Pacific Ridge Orchards
  { id: 'f-4', clientId: 'cl-2', name: 'Upper Terrace', cropType: 'almond', acreage: 50, plantingYear: 2016, rootstock: 'Nemaguard', variety: 'Nonpareil', healthStatus: 'healthy', soilHealthScore: 75, location: 'Terraced hillside', irrigationType: 'Micro-sprinkler' },
  { id: 'f-5', clientId: 'cl-2', name: 'Creek Bottom', cropType: 'almond', acreage: 35, plantingYear: 2019, rootstock: 'Lovell', variety: 'Monterey', healthStatus: 'attention', soilHealthScore: 58, location: 'Near seasonal creek', irrigationType: 'Drip' },

  // Torres Vineyard & Orchard
  { id: 'f-6', clientId: 'cl-3', name: 'Estate Vineyard', cropType: 'grape', acreage: 80, plantingYear: 2010, rootstock: '110R', variety: 'Cabernet Sauvignon', healthStatus: 'healthy', soilHealthScore: 88, location: 'Limestone hillside', irrigationType: 'Drip' },
  { id: 'f-7', clientId: 'cl-3', name: 'West Block Vineyard', cropType: 'grape', acreage: 60, plantingYear: 2014, rootstock: '1103P', variety: 'Zinfandel', healthStatus: 'healthy', soilHealthScore: 79, location: 'West-facing slope', irrigationType: 'Drip' },
  { id: 'f-8', clientId: 'cl-3', name: 'Almond Flat', cropType: 'almond', acreage: 60, plantingYear: 2017, rootstock: 'Hansen 536', variety: 'Butte', healthStatus: 'attention', soilHealthScore: 62, location: 'Valley floor, deep soil', irrigationType: 'Flood to drip conversion' },

  // Nakamura Citrus Co.
  { id: 'f-9', clientId: 'cl-4', name: 'Main Grove', cropType: 'citrus', acreage: 55, plantingYear: 2008, variety: 'Valencia', healthStatus: 'attention', soilHealthScore: 61, location: 'Gentle south slope', irrigationType: 'Micro-sprinkler' },
  { id: 'f-10', clientId: 'cl-4', name: 'Meyer Block', cropType: 'citrus', acreage: 40, plantingYear: 2020, variety: 'Meyer Lemon', healthStatus: 'healthy', soilHealthScore: 72, location: 'Protected from wind', irrigationType: 'Drip' },

  // Whitfield Avocado Group
  { id: 'f-11', clientId: 'cl-5', name: 'Ridgetop', cropType: 'avocado', acreage: 60, plantingYear: 2013, rootstock: 'Dusa', variety: 'Hass', healthStatus: 'healthy', soilHealthScore: 85, location: 'Ridgetop, ocean breeze', irrigationType: 'Micro-sprinkler' },
  { id: 'f-12', clientId: 'cl-5', name: 'South Canyon', cropType: 'avocado', acreage: 50, plantingYear: 2016, rootstock: 'Toro Canyon', variety: 'GEM', healthStatus: 'critical', soilHealthScore: 42, location: 'Canyon, poor drainage', irrigationType: 'Drip' },
  { id: 'f-13', clientId: 'cl-5', name: 'Coastal Block', cropType: 'avocado', acreage: 50, plantingYear: 2019, rootstock: 'Dusa', variety: 'Hass', healthStatus: 'healthy', soilHealthScore: 76, location: 'Coastal terrace', irrigationType: 'Micro-sprinkler' },

  // Alvarez Organic Farms
  { id: 'f-14', clientId: 'cl-6', name: 'Organic Avocado Grove', cropType: 'avocado', acreage: 40, plantingYear: 2014, rootstock: 'Dusa', variety: 'Hass', healthStatus: 'healthy', soilHealthScore: 71, location: 'Certified organic block', irrigationType: 'Drip' },
  { id: 'f-15', clientId: 'cl-6', name: 'Lemon Orchard', cropType: 'citrus', acreage: 35, plantingYear: 2017, variety: 'Eureka Lemon', healthStatus: 'healthy', soilHealthScore: 74, location: 'Sheltered valley', irrigationType: 'Drip' },

  // Central Coast Almonds
  { id: 'f-16', clientId: 'cl-7', name: 'Section 12 North', cropType: 'almond', acreage: 100, plantingYear: 2015, rootstock: 'Nemaguard', variety: 'Nonpareil', healthStatus: 'healthy', soilHealthScore: 80, location: 'Flat, deep alluvial soil', irrigationType: 'Micro-sprinkler' },
  { id: 'f-17', clientId: 'cl-7', name: 'Section 12 South', cropType: 'almond', acreage: 100, plantingYear: 2015, rootstock: 'Lovell', variety: 'Carmel', healthStatus: 'healthy', soilHealthScore: 77, location: 'Flat, sandy loam', irrigationType: 'Drip' },
  { id: 'f-18', clientId: 'cl-7', name: 'New Planting', cropType: 'almond', acreage: 100, plantingYear: 2023, rootstock: 'Hansen 536', variety: 'Independence', healthStatus: 'attention', soilHealthScore: 55, location: 'Recently cleared land', irrigationType: 'Drip' },

  // Richardson Ranch
  { id: 'f-19', clientId: 'cl-9', name: 'Pinot Block', cropType: 'grape', acreage: 70, plantingYear: 2011, rootstock: '3309C', variety: 'Pinot Noir', healthStatus: 'healthy', soilHealthScore: 83, location: 'Cool-climate hillside', irrigationType: 'Drip' },
  { id: 'f-20', clientId: 'cl-9', name: 'Chardonnay Flat', cropType: 'grape', acreage: 70, plantingYear: 2013, rootstock: '101-14', variety: 'Chardonnay', healthStatus: 'healthy', soilHealthScore: 81, location: 'Valley floor, morning fog', irrigationType: 'Drip' },
];

// ─── Treatments ───────────────────────────────────────────────────────────────

export const treatments: Treatment[] = [
  // February treatments (completed)
  { id: 't-1', fieldId: 'f-1', clientId: 'cl-1', materialId: 'mat-1', scheduledDate: '2026-02-05', completedDate: '2026-02-05', status: 'completed', applicationRate: '2 gal/acre', weatherConditions: 'Clear, 62°F', notes: 'Good soil moisture', growthStage: 'Pre-bloom' },
  { id: 't-2', fieldId: 'f-1', clientId: 'cl-1', materialId: 'mat-2', scheduledDate: '2026-02-05', completedDate: '2026-02-05', status: 'completed', applicationRate: '32 oz/acre', weatherConditions: 'Clear, 62°F', notes: 'Applied with Carbon Plus', growthStage: 'Pre-bloom' },
  { id: 't-3', fieldId: 'f-6', clientId: 'cl-3', materialId: 'mat-1', scheduledDate: '2026-02-10', completedDate: '2026-02-10', status: 'completed', applicationRate: '2 gal/acre', weatherConditions: 'Overcast, 58°F', notes: 'Bud break beginning', growthStage: 'Bud break' },
  { id: 't-4', fieldId: 'f-4', clientId: 'cl-2', materialId: 'mat-6', scheduledDate: '2026-02-12', completedDate: '2026-02-13', status: 'completed', applicationRate: '3 gal/acre', weatherConditions: 'Light rain, 55°F', notes: 'Delayed one day due to rain', growthStage: 'Dormant' },
  { id: 't-5', fieldId: 'f-11', clientId: 'cl-5', materialId: 'mat-3', scheduledDate: '2026-02-15', completedDate: '2026-02-15', status: 'completed', applicationRate: '1 gal/acre', weatherConditions: 'Sunny, 65°F', notes: 'Preventative Phytophthora app', growthStage: 'Pre-bloom' },
  { id: 't-6', fieldId: 'f-12', clientId: 'cl-5', materialId: 'mat-3', scheduledDate: '2026-02-15', completedDate: '2026-02-15', status: 'completed', applicationRate: '1.5 gal/acre', weatherConditions: 'Sunny, 65°F', notes: 'Higher rate due to disease pressure', growthStage: 'Pre-bloom' },
  { id: 't-7', fieldId: 'f-16', clientId: 'cl-7', materialId: 'mat-1', scheduledDate: '2026-02-20', completedDate: '2026-02-20', status: 'completed', applicationRate: '2 gal/acre', weatherConditions: 'Clear, 60°F', notes: 'Pre-bloom carbon build', growthStage: 'Pre-bloom' },

  // March treatments (completed)
  { id: 't-8', fieldId: 'f-1', clientId: 'cl-1', materialId: 'mat-4', scheduledDate: '2026-03-01', completedDate: '2026-03-01', status: 'completed', applicationRate: '1 qt/acre', weatherConditions: 'Clear, 68°F', notes: 'Bloom nutrition support', growthStage: 'Bloom' },
  { id: 't-9', fieldId: 'f-6', clientId: 'cl-3', materialId: 'mat-2', scheduledDate: '2026-03-05', completedDate: '2026-03-05', status: 'completed', applicationRate: '32 oz/acre', weatherConditions: 'Partly cloudy, 64°F', notes: '', growthStage: 'Bloom' },
  { id: 't-10', fieldId: 'f-9', clientId: 'cl-4', materialId: 'mat-1', scheduledDate: '2026-03-10', completedDate: '2026-03-10', status: 'completed', applicationRate: '2 gal/acre', weatherConditions: 'Overcast, 61°F', notes: 'First application for new client', growthStage: 'Spring flush' },
  { id: 't-11', fieldId: 'f-19', clientId: 'cl-9', materialId: 'mat-5', scheduledDate: '2026-03-12', completedDate: '2026-03-12', status: 'completed', applicationRate: '16 oz/acre', weatherConditions: 'Clear, 66°F', notes: 'SAR activation pre-bloom', growthStage: 'Pre-bloom' },
  { id: 't-12', fieldId: 'f-14', clientId: 'cl-6', materialId: 'mat-2', scheduledDate: '2026-03-15', completedDate: '2026-03-15', status: 'completed', applicationRate: '32 oz/acre', weatherConditions: 'Clear, 70°F', notes: 'Organic-approved formulation', growthStage: 'Bloom' },

  // April treatments (mix of completed and scheduled)
  { id: 't-13', fieldId: 'f-1', clientId: 'cl-1', materialId: 'mat-5', scheduledDate: '2026-04-01', completedDate: '2026-04-01', status: 'completed', applicationRate: '16 oz/acre', weatherConditions: 'Clear, 72°F', notes: 'Post-bloom protection', growthStage: 'Fruit set' },
  { id: 't-14', fieldId: 'f-2', clientId: 'cl-1', materialId: 'mat-3', scheduledDate: '2026-04-05', completedDate: '2026-04-05', status: 'completed', applicationRate: '1 gal/acre', weatherConditions: 'Overcast, 65°F', notes: 'Root zone targeted', growthStage: 'Fruit set' },
  { id: 't-15', fieldId: 'f-6', clientId: 'cl-3', materialId: 'mat-4', scheduledDate: '2026-04-10', completedDate: '2026-04-11', status: 'completed', applicationRate: '1 qt/acre', weatherConditions: 'Clear, 75°F', notes: 'Post-bloom nutrition', growthStage: 'Berry set' },
  { id: 't-16', fieldId: 'f-11', clientId: 'cl-5', materialId: 'mat-1', scheduledDate: '2026-04-15', completedDate: '2026-04-15', status: 'completed', applicationRate: '2 gal/acre', weatherConditions: 'Sunny, 74°F', notes: 'Mid-spring carbon boost', growthStage: 'Fruit set' },
  { id: 't-17', fieldId: 'f-12', clientId: 'cl-5', materialId: 'mat-6', scheduledDate: '2026-04-15', status: 'overdue', applicationRate: '3 gal/acre', notes: 'Needs rescheduling — rain delay', growthStage: 'Fruit set' },
  { id: 't-18', fieldId: 'f-4', clientId: 'cl-2', materialId: 'mat-2', scheduledDate: '2026-04-20', status: 'scheduled', applicationRate: '32 oz/acre', notes: '', growthStage: 'Petal fall' },

  // Upcoming (late April / May)
  { id: 't-19', fieldId: 'f-16', clientId: 'cl-7', materialId: 'mat-4', scheduledDate: '2026-04-25', status: 'scheduled', applicationRate: '1 qt/acre', notes: 'Post-bloom micronutrients', growthStage: 'Petal fall' },
  { id: 't-20', fieldId: 'f-9', clientId: 'cl-4', materialId: 'mat-2', scheduledDate: '2026-04-28', status: 'scheduled', applicationRate: '32 oz/acre', notes: '', growthStage: 'Spring flush' },
  { id: 't-21', fieldId: 'f-19', clientId: 'cl-9', materialId: 'mat-1', scheduledDate: '2026-05-01', status: 'scheduled', applicationRate: '2 gal/acre', notes: 'Post-bloom carbon', growthStage: 'Berry set' },
  { id: 't-22', fieldId: 'f-1', clientId: 'cl-1', materialId: 'mat-6', scheduledDate: '2026-05-05', status: 'scheduled', applicationRate: '3 gal/acre', notes: 'Summer soil conditioning', growthStage: 'Fruit development' },
  { id: 't-23', fieldId: 'f-14', clientId: 'cl-6', materialId: 'mat-5', scheduledDate: '2026-05-10', status: 'scheduled', applicationRate: '16 oz/acre', notes: 'Summer disease prevention', growthStage: 'Fruit development' },
  { id: 't-24', fieldId: 'f-6', clientId: 'cl-3', materialId: 'mat-1', scheduledDate: '2026-05-15', status: 'scheduled', applicationRate: '2 gal/acre', notes: '', growthStage: 'Véraison' },
];

// ─── Lab Results ──────────────────────────────────────────────────────────────

export const labResults: LabResult[] = [
  // Field f-1 (Hillside Block A) - showing improvement over time
  { id: 'lr-1', fieldId: 'f-1', clientId: 'cl-1', date: '2024-10-15', labName: 'Fruit Growers Lab', resultType: 'soil_composition', organicCarbon: 1.8, microbialDiversity: 42, ph: 6.2, ec: 1.1, nitrogen: 28, phosphorus: 35, potassium: 180, calcium: 1200, magnesium: 280, phytophthoraPresent: true, phytophthoraPressure: 'moderate', notes: 'Baseline before GC program' },
  { id: 'lr-2', fieldId: 'f-1', clientId: 'cl-1', date: '2025-04-10', labName: 'Fruit Growers Lab', resultType: 'soil_composition', organicCarbon: 2.2, microbialDiversity: 55, ph: 6.4, ec: 1.0, nitrogen: 35, phosphorus: 38, potassium: 195, calcium: 1350, magnesium: 290, phytophthoraPresent: true, phytophthoraPressure: 'low', notes: '6 months into program — good improvement' },
  { id: 'lr-3', fieldId: 'f-1', clientId: 'cl-1', date: '2025-10-08', labName: 'Fruit Growers Lab', resultType: 'soil_composition', organicCarbon: 2.7, microbialDiversity: 68, ph: 6.5, ec: 0.9, nitrogen: 42, phosphorus: 42, potassium: 210, calcium: 1500, magnesium: 300, phytophthoraPresent: false, phytophthoraPressure: 'none', notes: '12 months — significant soil health gains' },
  { id: 'lr-4', fieldId: 'f-1', clientId: 'cl-1', date: '2026-04-05', labName: 'Fruit Growers Lab', resultType: 'soil_composition', organicCarbon: 3.1, microbialDiversity: 76, ph: 6.5, ec: 0.9, nitrogen: 48, phosphorus: 45, potassium: 225, calcium: 1580, magnesium: 310, phytophthoraPresent: false, phytophthoraPressure: 'none', notes: '18 months — excellent results' },

  // Tissue analysis
  { id: 'lr-5', fieldId: 'f-1', clientId: 'cl-1', date: '2026-03-20', labName: 'Fruit Growers Lab', resultType: 'tissue_analysis', organicCarbon: 0, microbialDiversity: 0, ph: 0, ec: 0, nitrogen: 2.4, phosphorus: 0.18, potassium: 1.2, calcium: 2.8, magnesium: 0.45, phytophthoraPresent: false, phytophthoraPressure: 'none', notes: 'Leaf tissue — all nutrients in optimal range' },

  // Field f-6 (Estate Vineyard)
  { id: 'lr-6', fieldId: 'f-6', clientId: 'cl-3', date: '2024-08-15', labName: 'A&L Western Labs', resultType: 'soil_composition', organicCarbon: 2.5, microbialDiversity: 58, ph: 7.1, ec: 0.8, nitrogen: 38, phosphorus: 30, potassium: 250, calcium: 2200, magnesium: 350, phytophthoraPresent: false, phytophthoraPressure: 'none', notes: 'Baseline — already decent soil' },
  { id: 'lr-7', fieldId: 'f-6', clientId: 'cl-3', date: '2025-08-20', labName: 'A&L Western Labs', resultType: 'soil_composition', organicCarbon: 3.2, microbialDiversity: 72, ph: 7.0, ec: 0.7, nitrogen: 45, phosphorus: 35, potassium: 270, calcium: 2350, magnesium: 360, phytophthoraPresent: false, phytophthoraPressure: 'none', notes: '12 months — strong gains in carbon and biology' },
  { id: 'lr-8', fieldId: 'f-6', clientId: 'cl-3', date: '2026-03-10', labName: 'A&L Western Labs', resultType: 'soil_composition', organicCarbon: 3.6, microbialDiversity: 81, ph: 6.9, ec: 0.7, nitrogen: 50, phosphorus: 38, potassium: 285, calcium: 2400, magnesium: 370, phytophthoraPresent: false, phytophthoraPressure: 'none', notes: 'Continuing improvement' },

  // Field f-12 (South Canyon - critical)
  { id: 'lr-9', fieldId: 'f-12', clientId: 'cl-5', date: '2024-06-20', labName: 'Fruit Growers Lab', resultType: 'soil_composition', organicCarbon: 1.0, microbialDiversity: 22, ph: 5.8, ec: 1.8, nitrogen: 15, phosphorus: 18, potassium: 120, calcium: 800, magnesium: 200, phytophthoraPresent: true, phytophthoraPressure: 'high', notes: 'Baseline — poor soil health, high disease pressure' },
  { id: 'lr-10', fieldId: 'f-12', clientId: 'cl-5', date: '2025-06-15', labName: 'Fruit Growers Lab', resultType: 'soil_composition', organicCarbon: 1.4, microbialDiversity: 35, ph: 6.0, ec: 1.5, nitrogen: 22, phosphorus: 25, potassium: 145, calcium: 950, magnesium: 230, phytophthoraPresent: true, phytophthoraPressure: 'moderate', notes: '12 months — slow but measurable improvement' },
  { id: 'lr-11', fieldId: 'f-12', clientId: 'cl-5', date: '2026-03-25', labName: 'Fruit Growers Lab', resultType: 'soil_composition', organicCarbon: 1.8, microbialDiversity: 44, ph: 6.1, ec: 1.3, nitrogen: 28, phosphorus: 30, potassium: 160, calcium: 1050, magnesium: 250, phytophthoraPresent: true, phytophthoraPressure: 'low', notes: 'Trending right direction — Phytophthora receding' },

  // Microbiological assays
  { id: 'lr-12', fieldId: 'f-11', clientId: 'cl-5', date: '2026-04-01', labName: 'Earthfort Labs', resultType: 'microbiological', organicCarbon: 3.0, microbialDiversity: 82, ph: 6.6, ec: 0.8, nitrogen: 45, phosphorus: 40, potassium: 220, calcium: 1600, magnesium: 310, phytophthoraPresent: false, phytophthoraPressure: 'none', notes: 'Excellent fungal:bacterial ratio' },
  { id: 'lr-13', fieldId: 'f-16', clientId: 'cl-7', date: '2026-03-15', labName: 'A&L Western Labs', resultType: 'soil_composition', organicCarbon: 2.8, microbialDiversity: 70, ph: 6.8, ec: 0.9, nitrogen: 40, phosphorus: 36, potassium: 200, calcium: 1800, magnesium: 320, phytophthoraPresent: false, phytophthoraPressure: 'none', notes: 'Almonds responding well to program' },

  // Water quality
  { id: 'lr-14', fieldId: 'f-9', clientId: 'cl-4', date: '2026-02-28', labName: 'Fruit Growers Lab', resultType: 'water_quality', organicCarbon: 0, microbialDiversity: 0, ph: 7.4, ec: 1.2, nitrogen: 12, phosphorus: 2, potassium: 8, calcium: 80, magnesium: 35, phytophthoraPresent: false, phytophthoraPressure: 'none', notes: 'Irrigation water — acceptable quality, slightly high EC' },
];

// ─── Field Visits ─────────────────────────────────────────────────────────────

export const fieldVisits: FieldVisit[] = [
  {
    id: 'fv-1', fieldId: 'f-1', clientId: 'cl-1', date: '2026-04-18',
    observations: 'Excellent fruit set across the block. Trees showing vigorous spring flush with deep green foliage. Root zone looks active — white root tips visible at dig sites. No signs of Phytophthora.',
    weatherConditions: 'Sunny', temperature: 72, growthStage: 'Fruit set',
    checklist: [
      { id: 'ck-1', label: 'Canopy condition assessed', checked: true },
      { id: 'ck-2', label: 'Root zone inspected', checked: true },
      { id: 'ck-3', label: 'Irrigation system checked', checked: true },
      { id: 'ck-4', label: 'Soil moisture verified', checked: true },
      { id: 'ck-5', label: 'Pest/disease scouting completed', checked: true },
      { id: 'ck-6', label: 'Photos taken', checked: true },
    ],
    photos: ['hillside-block-a-canopy.jpg', 'hillside-block-a-roots.jpg'],
    notes: 'Roberto very pleased with results. Trees noticeably more vigorous than same time last year. Scheduling tissue sample for next visit.',
  },
  {
    id: 'fv-2', fieldId: 'f-12', clientId: 'cl-5', date: '2026-04-17',
    observations: 'Some improvement in tree vigor but still lagging behind other blocks. Drainage continues to be an issue in the lower third. Phytophthora symptoms reduced but not eliminated — recommend increasing RootShield rate.',
    weatherConditions: 'Overcast', temperature: 64, growthStage: 'Fruit set',
    checklist: [
      { id: 'ck-7', label: 'Canopy condition assessed', checked: true },
      { id: 'ck-8', label: 'Root zone inspected', checked: true },
      { id: 'ck-9', label: 'Irrigation system checked', checked: true },
      { id: 'ck-10', label: 'Soil moisture verified', checked: true },
      { id: 'ck-11', label: 'Pest/disease scouting completed', checked: true },
      { id: 'ck-12', label: 'Photos taken', checked: true },
    ],
    photos: ['south-canyon-tree-decline.jpg', 'south-canyon-drainage.jpg'],
    notes: 'Discussed French drain installation with James. He\'s getting quotes. This is the long-term fix for this block.',
  },
  {
    id: 'fv-3', fieldId: 'f-6', clientId: 'cl-3', date: '2026-04-15',
    observations: 'Vines look outstanding. Even bud break across the block. Soil is friable and well-structured — the carbon program is clearly working. Cover crop between rows is thriving.',
    weatherConditions: 'Clear', temperature: 76, growthStage: 'Shoot growth',
    checklist: [
      { id: 'ck-13', label: 'Vine condition assessed', checked: true },
      { id: 'ck-14', label: 'Soil structure evaluated', checked: true },
      { id: 'ck-15', label: 'Cover crop status checked', checked: true },
      { id: 'ck-16', label: 'Irrigation system checked', checked: true },
      { id: 'ck-17', label: 'Pest/disease scouting completed', checked: true },
      { id: 'ck-18', label: 'Photos taken', checked: true },
    ],
    photos: ['estate-vineyard-shoots.jpg', 'estate-vineyard-soil.jpg'],
    notes: 'Miguel wants to expand the program to West Block. Scheduling walk-through for next week.',
  },
  {
    id: 'fv-4', fieldId: 'f-4', clientId: 'cl-2', date: '2026-04-12',
    observations: 'Bloom complete, good nut set visible. Some chlorosis in the southeast corner — possible iron deficiency. Recommend tissue analysis and adjusted NutriBlend rate.',
    weatherConditions: 'Partly cloudy', temperature: 68, growthStage: 'Petal fall',
    checklist: [
      { id: 'ck-19', label: 'Canopy condition assessed', checked: true },
      { id: 'ck-20', label: 'Nut set evaluation', checked: true },
      { id: 'ck-21', label: 'Irrigation uniformity check', checked: true },
      { id: 'ck-22', label: 'Soil moisture verified', checked: true },
      { id: 'ck-23', label: 'Pest/disease scouting completed', checked: true },
      { id: 'ck-24', label: 'Photos taken', checked: false },
    ],
    photos: [],
    notes: 'Need to schedule tissue sample ASAP for the chlorotic area. Sarah mentioned she\'s interested in expanding to Creek Bottom once she sees this season\'s results.',
  },
  {
    id: 'fv-5', fieldId: 'f-9', clientId: 'cl-4', date: '2026-04-10',
    observations: 'Spring flush looking good for first season on program. Trees had been declining for 2-3 years prior. Early signs of recovery in the canopy density. Soil still quite compacted in some areas.',
    weatherConditions: 'Sunny', temperature: 70, growthStage: 'Spring flush',
    checklist: [
      { id: 'ck-25', label: 'Canopy condition assessed', checked: true },
      { id: 'ck-26', label: 'Root zone inspected', checked: true },
      { id: 'ck-27', label: 'Irrigation system checked', checked: true },
      { id: 'ck-28', label: 'Soil moisture verified', checked: true },
      { id: 'ck-29', label: 'Pest/disease scouting completed', checked: true },
      { id: 'ck-30', label: 'Photos taken', checked: true },
    ],
    photos: ['main-grove-recovery.jpg'],
    notes: 'Linda is cautiously optimistic. Recommend SoilRevive application to address compaction before summer.',
  },
  {
    id: 'fv-6', fieldId: 'f-16', clientId: 'cl-7', date: '2026-04-08',
    observations: 'Strong bloom across the block. Pollinators active — good bee activity observed. Soil biology probe shows excellent mycorrhizal colonization. This is a showcase field.',
    weatherConditions: 'Clear', temperature: 73, growthStage: 'Bloom',
    checklist: [
      { id: 'ck-31', label: 'Canopy condition assessed', checked: true },
      { id: 'ck-32', label: 'Bloom/pollination assessment', checked: true },
      { id: 'ck-33', label: 'Soil biology evaluation', checked: true },
      { id: 'ck-34', label: 'Irrigation system checked', checked: true },
      { id: 'ck-35', label: 'Pest/disease scouting completed', checked: true },
      { id: 'ck-36', label: 'Photos taken', checked: true },
    ],
    photos: ['section12-bloom.jpg', 'section12-pollinators.jpg', 'section12-mycorrhizae.jpg'],
    notes: 'David wants to use this block as a reference for the new planting. Great candidate for case study.',
  },
  {
    id: 'fv-7', fieldId: 'f-19', clientId: 'cl-9', date: '2026-04-05',
    observations: 'Shoot growth is even and vigorous. No disease symptoms observed. Soil is showing great improvement in water infiltration rates. Tom noted less runoff during last irrigation.',
    weatherConditions: 'Foggy morning, clear afternoon', temperature: 62, growthStage: 'Shoot growth',
    checklist: [
      { id: 'ck-37', label: 'Vine condition assessed', checked: true },
      { id: 'ck-38', label: 'Soil structure evaluated', checked: true },
      { id: 'ck-39', label: 'Cover crop status checked', checked: true },
      { id: 'ck-40', label: 'Irrigation system checked', checked: true },
      { id: 'ck-41', label: 'Pest/disease scouting completed', checked: true },
      { id: 'ck-42', label: 'Photos taken', checked: true },
    ],
    photos: ['pinot-shoots.jpg', 'pinot-soil-structure.jpg'],
    notes: 'Excellent progress. This vineyard is responding beautifully to the program.',
  },
  {
    id: 'fv-8', fieldId: 'f-14', clientId: 'cl-6', date: '2026-04-02',
    observations: 'Organic grove looking healthy. New flush is strong and uniform. Patricia has noticed significantly fewer pest issues since starting the MicroBio applications.',
    weatherConditions: 'Sunny', temperature: 71, growthStage: 'Bloom',
    checklist: [
      { id: 'ck-43', label: 'Canopy condition assessed', checked: true },
      { id: 'ck-44', label: 'Root zone inspected', checked: true },
      { id: 'ck-45', label: 'Organic compliance check', checked: true },
      { id: 'ck-46', label: 'Soil moisture verified', checked: true },
      { id: 'ck-47', label: 'Pest/disease scouting completed', checked: true },
      { id: 'ck-48', label: 'Photos taken', checked: true },
    ],
    photos: ['organic-avo-bloom.jpg'],
    notes: 'All materials OMRI-listed and compliant. Patricia very happy with the organic-compatible program.',
  },
  {
    id: 'fv-9', fieldId: 'f-11', clientId: 'cl-5', date: '2026-03-28',
    observations: 'Premium block continues to perform. Fruit set looks heavy — may need to discuss crop load management. Soil health score has been consistently high.',
    weatherConditions: 'Clear', temperature: 69, growthStage: 'Fruit set',
    checklist: [
      { id: 'ck-49', label: 'Canopy condition assessed', checked: true },
      { id: 'ck-50', label: 'Fruit set evaluation', checked: true },
      { id: 'ck-51', label: 'Root zone inspected', checked: true },
      { id: 'ck-52', label: 'Irrigation system checked', checked: true },
      { id: 'ck-53', label: 'Pest/disease scouting completed', checked: true },
      { id: 'ck-54', label: 'Photos taken', checked: true },
    ],
    photos: ['ridgetop-fruitset.jpg', 'ridgetop-canopy.jpg'],
    notes: 'This is our best-performing avocado block. James is thrilled.',
  },
  {
    id: 'fv-10', fieldId: 'f-2', clientId: 'cl-1', date: '2026-03-25',
    observations: 'Valley grove showing slower response to program than Hillside. Clay soil is holding more moisture — adjusted irrigation schedule. Some yellowing in lower canopy.',
    weatherConditions: 'Partly cloudy', temperature: 65, growthStage: 'Pre-bloom',
    checklist: [
      { id: 'ck-55', label: 'Canopy condition assessed', checked: true },
      { id: 'ck-56', label: 'Root zone inspected', checked: true },
      { id: 'ck-57', label: 'Irrigation system checked', checked: true },
      { id: 'ck-58', label: 'Soil moisture verified', checked: true },
      { id: 'ck-59', label: 'Pest/disease scouting completed', checked: true },
      { id: 'ck-60', label: 'Photos taken', checked: true },
    ],
    photos: ['valley-grove-canopy.jpg'],
    notes: 'Recommend increasing SoilRevive rate to break up clay. Also schedule drainage assessment.',
  },
  {
    id: 'fv-11', fieldId: 'f-5', clientId: 'cl-2', date: '2026-03-20',
    observations: 'Creek Bottom almonds showing stress from waterlogged conditions after recent rain. Root tips browning in low spots. Need to address drainage before next season.',
    weatherConditions: 'Clear after rain', temperature: 60, growthStage: 'Bloom',
    checklist: [
      { id: 'ck-61', label: 'Canopy condition assessed', checked: true },
      { id: 'ck-62', label: 'Root zone inspected', checked: true },
      { id: 'ck-63', label: 'Drainage assessment', checked: true },
      { id: 'ck-64', label: 'Soil moisture verified', checked: true },
      { id: 'ck-65', label: 'Pest/disease scouting completed', checked: true },
      { id: 'ck-66', label: 'Photos taken', checked: true },
    ],
    photos: ['creek-bottom-waterlog.jpg', 'creek-bottom-roots.jpg'],
    notes: 'This field needs infrastructure work. Treatment program alone won\'t solve the drainage issue. Discussed with Sarah.',
  },
  {
    id: 'fv-12', fieldId: 'f-20', clientId: 'cl-9', date: '2026-03-15',
    observations: 'Chardonnay block waking up nicely. Bud break is even. Soil smells healthy — earthy, no anaerobic odors. Tom\'s cover crop mix is filling in well between rows.',
    weatherConditions: 'Morning fog, afternoon sun', temperature: 63, growthStage: 'Bud break',
    checklist: [
      { id: 'ck-67', label: 'Vine condition assessed', checked: true },
      { id: 'ck-68', label: 'Bud break assessment', checked: true },
      { id: 'ck-69', label: 'Soil evaluation', checked: true },
      { id: 'ck-70', label: 'Cover crop inspection', checked: true },
      { id: 'ck-71', label: 'Irrigation pre-season check', checked: true },
      { id: 'ck-72', label: 'Photos taken', checked: true },
    ],
    photos: ['chard-budbreak.jpg'],
    notes: 'Great start to the season. Plan MicroBio application for next cycle.',
  },
];

// ─── Activities ───────────────────────────────────────────────────────────────

export const activities: Activity[] = [
  { id: 'act-1', type: 'visit', title: 'Field visit — Hillside Block A', description: 'Excellent fruit set. Trees vigorous. No Phytophthora.', date: '2026-04-18', fieldId: 'f-1', clientId: 'cl-1' },
  { id: 'act-2', type: 'visit', title: 'Field visit — South Canyon', description: 'Some improvement but drainage remains an issue.', date: '2026-04-17', fieldId: 'f-12', clientId: 'cl-5' },
  { id: 'act-3', type: 'treatment', title: 'Treatment applied — Ridgetop', description: 'GC-Carbon Plus applied at 2 gal/acre. Sunny, 74°F.', date: '2026-04-15', fieldId: 'f-11', clientId: 'cl-5' },
  { id: 'act-4', type: 'visit', title: 'Field visit — Estate Vineyard', description: 'Vines outstanding. Carbon program clearly working.', date: '2026-04-15', fieldId: 'f-6', clientId: 'cl-3' },
  { id: 'act-5', type: 'lab_result', title: 'Lab results — Hillside Block A', description: 'Organic carbon up to 3.1%. Microbial diversity index 76.', date: '2026-04-05', fieldId: 'f-1', clientId: 'cl-1' },
  { id: 'act-6', type: 'treatment', title: 'Treatment applied — Hillside Block A', description: 'GC-PhytoGuard applied at 16 oz/acre. Post-bloom protection.', date: '2026-04-01', fieldId: 'f-1', clientId: 'cl-1' },
  { id: 'act-7', type: 'lab_result', title: 'Lab results — Microbiological assay', description: 'Ridgetop: Excellent fungal:bacterial ratio.', date: '2026-04-01', fieldId: 'f-11', clientId: 'cl-5' },
  { id: 'act-8', type: 'visit', title: 'Field visit — Ridgetop', description: 'Premium block performing excellently. Heavy fruit set.', date: '2026-03-28', fieldId: 'f-11', clientId: 'cl-5' },
  { id: 'act-9', type: 'lab_result', title: 'Lab results — South Canyon', description: 'Organic carbon 1.8%. Phytophthora pressure declining.', date: '2026-03-25', fieldId: 'f-12', clientId: 'cl-5' },
  { id: 'act-10', type: 'treatment', title: 'Treatment applied — Main Grove', description: 'GC-Carbon Plus — first application for Nakamura Citrus.', date: '2026-03-10', fieldId: 'f-9', clientId: 'cl-4' },
];

// ─── Crop Configurations ──────────────────────────────────────────────────────

export const cropConfigs: CropConfig[] = [
  {
    cropType: 'avocado', label: 'Avocado', icon: '🥑',
    growthStages: [
      { name: 'Dormant / Winter rest', startMonth: 12, endMonth: 1 },
      { name: 'Pre-bloom', startMonth: 2, endMonth: 2 },
      { name: 'Bloom', startMonth: 3, endMonth: 4 },
      { name: 'Fruit set', startMonth: 4, endMonth: 5 },
      { name: 'Fruit development', startMonth: 6, endMonth: 9 },
      { name: 'Maturation', startMonth: 10, endMonth: 11 },
    ],
  },
  {
    cropType: 'almond', label: 'Almond', icon: '🌰',
    growthStages: [
      { name: 'Dormant', startMonth: 11, endMonth: 1 },
      { name: 'Bloom', startMonth: 2, endMonth: 3 },
      { name: 'Petal fall', startMonth: 3, endMonth: 4 },
      { name: 'Hull development', startMonth: 5, endMonth: 6 },
      { name: 'Hull split', startMonth: 7, endMonth: 8 },
      { name: 'Harvest', startMonth: 8, endMonth: 9 },
      { name: 'Post-harvest', startMonth: 10, endMonth: 10 },
    ],
  },
  {
    cropType: 'citrus', label: 'Citrus', icon: '🍊',
    growthStages: [
      { name: 'Winter rest', startMonth: 12, endMonth: 1 },
      { name: 'Spring flush', startMonth: 2, endMonth: 3 },
      { name: 'Bloom', startMonth: 3, endMonth: 4 },
      { name: 'Fruit set', startMonth: 5, endMonth: 6 },
      { name: 'Fruit enlargement', startMonth: 7, endMonth: 9 },
      { name: 'Color break / Harvest', startMonth: 10, endMonth: 11 },
    ],
  },
  {
    cropType: 'grape', label: 'Wine Grapes', icon: '🍇',
    growthStages: [
      { name: 'Dormant', startMonth: 12, endMonth: 1 },
      { name: 'Bud break', startMonth: 2, endMonth: 3 },
      { name: 'Shoot growth', startMonth: 3, endMonth: 4 },
      { name: 'Bloom / Berry set', startMonth: 5, endMonth: 5 },
      { name: 'Véraison', startMonth: 6, endMonth: 7 },
      { name: 'Harvest', startMonth: 8, endMonth: 10 },
      { name: 'Post-harvest', startMonth: 10, endMonth: 11 },
    ],
  },
];

// ─── Weather Data (SLO County) ────────────────────────────────────────────────

export const weatherData: WeatherData[] = [
  { date: '2026-04-24', high: 72, low: 52, condition: 'Sunny', humidity: 45, wind: 8 },
  { date: '2026-04-25', high: 74, low: 53, condition: 'Sunny', humidity: 42, wind: 6 },
  { date: '2026-04-26', high: 70, low: 51, condition: 'Partly Cloudy', humidity: 50, wind: 10 },
  { date: '2026-04-27', high: 68, low: 50, condition: 'Cloudy', humidity: 58, wind: 12 },
  { date: '2026-04-28', high: 65, low: 48, condition: 'Light Rain', humidity: 72, wind: 15 },
  { date: '2026-04-29', high: 67, low: 49, condition: 'Partly Cloudy', humidity: 55, wind: 8 },
  { date: '2026-04-30', high: 73, low: 54, condition: 'Sunny', humidity: 40, wind: 5 },
];

// ─── Soil Health Trends (for charts) ──────────────────────────────────────────

export const soilHealthTrends: Record<string, SoilHealthTrend[]> = {
  'f-1': [
    { date: '2024-10', score: 55, organicCarbon: 1.8, microbialDiversity: 42, ph: 6.2 },
    { date: '2025-01', score: 62, organicCarbon: 2.0, microbialDiversity: 48, ph: 6.3 },
    { date: '2025-04', score: 70, organicCarbon: 2.2, microbialDiversity: 55, ph: 6.4 },
    { date: '2025-07', score: 74, organicCarbon: 2.5, microbialDiversity: 62, ph: 6.5 },
    { date: '2025-10', score: 78, organicCarbon: 2.7, microbialDiversity: 68, ph: 6.5 },
    { date: '2026-01', score: 80, organicCarbon: 2.9, microbialDiversity: 72, ph: 6.5 },
    { date: '2026-04', score: 82, organicCarbon: 3.1, microbialDiversity: 76, ph: 6.5 },
  ],
  'f-6': [
    { date: '2024-08', score: 72, organicCarbon: 2.5, microbialDiversity: 58, ph: 7.1 },
    { date: '2024-11', score: 76, organicCarbon: 2.7, microbialDiversity: 62, ph: 7.0 },
    { date: '2025-02', score: 79, organicCarbon: 2.9, microbialDiversity: 66, ph: 7.0 },
    { date: '2025-05', score: 82, organicCarbon: 3.0, microbialDiversity: 68, ph: 7.0 },
    { date: '2025-08', score: 85, organicCarbon: 3.2, microbialDiversity: 72, ph: 7.0 },
    { date: '2025-11', score: 86, organicCarbon: 3.4, microbialDiversity: 76, ph: 6.9 },
    { date: '2026-03', score: 88, organicCarbon: 3.6, microbialDiversity: 81, ph: 6.9 },
  ],
  'f-12': [
    { date: '2024-06', score: 25, organicCarbon: 1.0, microbialDiversity: 22, ph: 5.8 },
    { date: '2024-09', score: 28, organicCarbon: 1.1, microbialDiversity: 25, ph: 5.9 },
    { date: '2024-12', score: 32, organicCarbon: 1.2, microbialDiversity: 28, ph: 5.9 },
    { date: '2025-03', score: 35, organicCarbon: 1.3, microbialDiversity: 32, ph: 6.0 },
    { date: '2025-06', score: 38, organicCarbon: 1.4, microbialDiversity: 35, ph: 6.0 },
    { date: '2025-09', score: 40, organicCarbon: 1.5, microbialDiversity: 38, ph: 6.0 },
    { date: '2026-03', score: 42, organicCarbon: 1.8, microbialDiversity: 44, ph: 6.1 },
  ],
  'f-11': [
    { date: '2024-06', score: 70, organicCarbon: 2.3, microbialDiversity: 55, ph: 6.5 },
    { date: '2024-09', score: 73, organicCarbon: 2.5, microbialDiversity: 60, ph: 6.5 },
    { date: '2024-12', score: 76, organicCarbon: 2.6, microbialDiversity: 65, ph: 6.5 },
    { date: '2025-03', score: 79, organicCarbon: 2.7, microbialDiversity: 70, ph: 6.6 },
    { date: '2025-06', score: 81, organicCarbon: 2.8, microbialDiversity: 74, ph: 6.6 },
    { date: '2025-09', score: 83, organicCarbon: 2.9, microbialDiversity: 78, ph: 6.6 },
    { date: '2026-04', score: 85, organicCarbon: 3.0, microbialDiversity: 82, ph: 6.6 },
  ],
  'f-16': [
    { date: '2024-08', score: 60, organicCarbon: 2.0, microbialDiversity: 45, ph: 6.8 },
    { date: '2024-11', score: 64, organicCarbon: 2.2, microbialDiversity: 50, ph: 6.8 },
    { date: '2025-02', score: 68, organicCarbon: 2.3, microbialDiversity: 55, ph: 6.8 },
    { date: '2025-05', score: 72, organicCarbon: 2.5, microbialDiversity: 60, ph: 6.8 },
    { date: '2025-08', score: 75, organicCarbon: 2.6, microbialDiversity: 64, ph: 6.8 },
    { date: '2025-11', score: 78, organicCarbon: 2.7, microbialDiversity: 68, ph: 6.8 },
    { date: '2026-03', score: 80, organicCarbon: 2.8, microbialDiversity: 70, ph: 6.8 },
  ],
};

// ─── Helper functions ─────────────────────────────────────────────────────────

export function getClientById(id: string) { return clients.find(c => c.id === id); }
export function getFieldById(id: string) { return fields.find(f => f.id === id); }
export function getFieldsByClient(clientId: string) { return fields.filter(f => f.clientId === clientId); }
export function getTreatmentsByField(fieldId: string) { return treatments.filter(t => t.fieldId === fieldId); }
export function getTreatmentsByClient(clientId: string) { return treatments.filter(t => t.clientId === clientId); }
export function getLabResultsByField(fieldId: string) { return labResults.filter(l => l.fieldId === fieldId); }
export function getLabResultsByClient(clientId: string) { return labResults.filter(l => l.clientId === clientId); }
export function getFieldVisitsByField(fieldId: string) { return fieldVisits.filter(v => v.fieldId === fieldId); }
export function getFieldVisitsByClient(clientId: string) { return fieldVisits.filter(v => v.clientId === clientId); }
export function getMaterialById(id: string) { return materials.find(m => m.id === id); }
