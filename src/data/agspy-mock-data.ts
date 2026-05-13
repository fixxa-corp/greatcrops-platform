import type { AgSpyProbe, SoilLayer, ProbeReading, IrrigationEvent, ProbeAlert } from '../types';

// ─── Helper: generate soil layers for a given profile ────────────────────────

function makeLayers(
  profile: { moisture: number[]; temp: number[]; ec: number[] }
): SoilLayer[] {
  const depths = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48];
  return depths.map((d, i) => ({
    depth: d,
    moisture: profile.moisture[i],
    temperature: profile.temp[i],
    ec: profile.ec[i],
  }));
}

// ─── Helper: generate 24-hour trend ──────────────────────────────────────────

function makeHourlyTrend(
  baseLayers: SoilLayer[],
  baseYes: number,
  irrigationAtHour?: number
): ProbeReading[] {
  const now = new Date('2026-04-29T14:00:00');
  return Array.from({ length: 24 }, (_, i) => {
    const t = new Date(now.getTime() - (23 - i) * 3600000);
    const irrigating = irrigationAtHour !== undefined && i >= irrigationAtHour && i < irrigationAtHour + 3;
    const moistureBump = irrigating ? 4 + Math.random() * 3 : 0;
    const tempShift = (i < 8 ? -2 : i < 16 ? 2 : 0) + (Math.random() - 0.5);
    return {
      timestamp: t.toISOString(),
      layers: baseLayers.map(l => ({
        ...l,
        moisture: Math.round((l.moisture + moistureBump + (Math.random() - 0.5) * 2) * 10) / 10,
        temperature: Math.round((l.temperature + tempShift) * 10) / 10,
        ec: Math.round((l.ec + (Math.random() - 0.5) * 0.1) * 100) / 100,
      })),
      yesScore: Math.min(100, Math.max(0, Math.round(baseYes + (Math.random() - 0.5) * 6))),
    };
  });
}

// ─── Helper: generate 7-day YES! Score trend ─────────────────────────────────

function makeYesTrend(base: number): { date: string; score: number }[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date('2026-04-23');
    d.setDate(d.getDate() + i);
    return {
      date: d.toISOString().slice(0, 10),
      score: Math.min(100, Math.max(0, Math.round(base + (Math.random() - 0.5) * 10))),
    };
  });
}

// ─── Probe Profiles ──────────────────────────────────────────────────────────

// Avocado healthy (well-irrigated, Hass on Dusa)
const avoHealthyMoisture = [32, 30, 28, 26, 25, 24, 22, 20, 18, 16, 14, 12];
const avoHealthyTemp = [68, 66, 64, 63, 62, 61, 60, 59, 58, 57, 57, 56];
const avoHealthyEc = [0.8, 0.9, 1.0, 1.1, 1.2, 1.2, 1.1, 1.0, 0.9, 0.8, 0.7, 0.7];

// Avocado with Phytophthora risk (over-wet root zone)
const avoWetMoisture = [38, 36, 35, 34, 33, 33, 32, 30, 28, 24, 20, 16];
const avoWetTemp = [66, 64, 63, 62, 61, 60, 59, 58, 58, 57, 56, 55];
const avoWetEc = [1.2, 1.4, 1.6, 1.8, 1.9, 2.0, 1.8, 1.5, 1.2, 1.0, 0.8, 0.7];

// Avocado critical (South Canyon — poor drainage, high moisture deep)
const avoCriticalMoisture = [40, 39, 38, 37, 36, 36, 35, 34, 33, 32, 30, 28];
const avoCriticalTemp = [64, 63, 62, 61, 60, 59, 58, 58, 57, 56, 56, 55];
const avoCriticalEc = [1.5, 1.8, 2.1, 2.4, 2.6, 2.8, 2.7, 2.5, 2.2, 1.9, 1.6, 1.4];

// Grape (well-managed vineyard)
const grapeMoisture = [22, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10];
const grapeTemp = [72, 70, 68, 66, 64, 62, 61, 60, 59, 58, 57, 57];
const grapeEc = [0.6, 0.7, 0.8, 0.9, 0.9, 1.0, 0.9, 0.8, 0.7, 0.6, 0.6, 0.5];

// Almond (moderate, healthy)
const almondMoisture = [26, 24, 22, 21, 20, 19, 18, 16, 14, 12, 11, 10];
const almondTemp = [70, 68, 66, 64, 63, 62, 61, 60, 59, 58, 57, 57];
const almondEc = [0.7, 0.8, 0.9, 1.0, 1.0, 1.1, 1.0, 0.9, 0.8, 0.7, 0.7, 0.6];

// Citrus (spring flush, moderate irrigation)
const citrusMoisture = [28, 26, 25, 24, 23, 22, 20, 18, 16, 14, 13, 12];
const citrusTemp = [69, 67, 65, 64, 63, 62, 61, 60, 59, 58, 57, 56];
const citrusEc = [1.0, 1.1, 1.2, 1.3, 1.3, 1.2, 1.1, 1.0, 0.9, 0.8, 0.7, 0.7];

// ─── Build the 14 Probes ────────────────────────────────────────────────────

const probe1Layers = makeLayers({ moisture: avoHealthyMoisture, temp: avoHealthyTemp, ec: avoHealthyEc });
const probe2Layers = makeLayers({ moisture: avoWetMoisture, temp: avoWetTemp, ec: avoWetEc });
const probe3Layers = makeLayers({ moisture: grapeMoisture, temp: grapeTemp, ec: grapeEc });
const probe4Layers = makeLayers({ moisture: grapeMoisture.map(m => m + 2), temp: grapeTemp.map(t => t - 1), ec: grapeEc.map(e => e + 0.1) });
const probe5Layers = makeLayers({ moisture: almondMoisture, temp: almondTemp, ec: almondEc });
const probe6Layers = makeLayers({ moisture: citrusMoisture, temp: citrusTemp, ec: citrusEc });
const probe7Layers = makeLayers({ moisture: avoHealthyMoisture.map(m => m - 2), temp: avoHealthyTemp.map(t => t + 1), ec: avoHealthyEc });
const probe8Layers = makeLayers({ moisture: avoCriticalMoisture, temp: avoCriticalTemp, ec: avoCriticalEc });
const probe9Layers = makeLayers({ moisture: avoHealthyMoisture.map(m => m + 1), temp: avoHealthyTemp, ec: avoHealthyEc.map(e => e + 0.1) });
const probe10Layers = makeLayers({ moisture: avoHealthyMoisture.map(m => m - 1), temp: avoHealthyTemp.map(t => t - 1), ec: avoHealthyEc });
const probe11Layers = makeLayers({ moisture: almondMoisture.map(m => m + 3), temp: almondTemp, ec: almondEc });
const probe12Layers = makeLayers({ moisture: grapeMoisture.map(m => m - 1), temp: grapeTemp.map(t => t - 2), ec: grapeEc });

// Offline probes don't need fresh layers but we provide stale ones
const probe13Layers = makeLayers({ moisture: almondMoisture, temp: almondTemp, ec: almondEc });
const probe14Layers = makeLayers({ moisture: almondMoisture, temp: almondTemp, ec: almondEc });

const irrigationSample: IrrigationEvent[] = [
  { startTime: '2026-04-29T04:00:00', endTime: '2026-04-29T06:30:00', volumeGallons: 12000, detected: true },
  { startTime: '2026-04-27T04:00:00', endTime: '2026-04-27T07:00:00', volumeGallons: 14000, detected: true },
  { startTime: '2026-04-25T05:00:00', endTime: '2026-04-25T07:30:00', volumeGallons: 11500, detected: true },
];

const irrigationNone: IrrigationEvent[] = [];

const irrigationRecent: IrrigationEvent[] = [
  { startTime: '2026-04-29T03:00:00', endTime: '2026-04-29T05:00:00', volumeGallons: 8000, detected: true },
  { startTime: '2026-04-28T03:00:00', endTime: '2026-04-28T05:00:00', volumeGallons: 8200, detected: true },
];

export const agspyProbes: AgSpyProbe[] = [
  {
    id: 'AGS-001', fieldId: 'f-1', clientId: 'cl-1',
    status: 'online', batteryPercent: 92, signalStrength: 88,
    lastReading: '2026-04-29T13:45:00', yesScore: 88,
    installDate: '2025-06-15',
    currentLayers: probe1Layers,
    activeRootZone: { topDepth: 8, bottomDepth: 24 },
    hourlyTrend: makeHourlyTrend(probe1Layers, 88, 4),
    yesScoreTrend: makeYesTrend(88),
    irrigationEvents: irrigationSample,
    alerts: [],
  },
  {
    id: 'AGS-002', fieldId: 'f-2', clientId: 'cl-1',
    status: 'online', batteryPercent: 78, signalStrength: 72,
    lastReading: '2026-04-29T13:45:00', yesScore: 71,
    installDate: '2025-06-15',
    currentLayers: probe2Layers,
    activeRootZone: { topDepth: 8, bottomDepth: 24 },
    hourlyTrend: makeHourlyTrend(probe2Layers, 71, 3),
    yesScoreTrend: makeYesTrend(71),
    irrigationEvents: irrigationRecent,
    alerts: [
      { id: 'alert-1', probeId: 'AGS-002', type: 'over-watering', severity: 'warning', message: 'Root zone moisture above optimal — risk of Phytophthora. Consider reducing irrigation duration.', timestamp: '2026-04-29T10:00:00', acknowledged: false },
    ],
  },
  {
    id: 'AGS-003', fieldId: 'f-6', clientId: 'cl-3',
    status: 'online', batteryPercent: 95, signalStrength: 91,
    lastReading: '2026-04-29T13:45:00', yesScore: 93,
    installDate: '2025-03-10',
    currentLayers: probe3Layers,
    activeRootZone: { topDepth: 8, bottomDepth: 20 },
    hourlyTrend: makeHourlyTrend(probe3Layers, 93, 5),
    yesScoreTrend: makeYesTrend(93),
    irrigationEvents: irrigationSample,
    alerts: [],
  },
  {
    id: 'AGS-004', fieldId: 'f-7', clientId: 'cl-3',
    status: 'online', batteryPercent: 89, signalStrength: 84,
    lastReading: '2026-04-29T13:45:00', yesScore: 85,
    installDate: '2025-03-10',
    currentLayers: probe4Layers,
    activeRootZone: { topDepth: 8, bottomDepth: 20 },
    hourlyTrend: makeHourlyTrend(probe4Layers, 85),
    yesScoreTrend: makeYesTrend(85),
    irrigationEvents: irrigationNone,
    alerts: [],
  },
  {
    id: 'AGS-005', fieldId: 'f-4', clientId: 'cl-2',
    status: 'online', batteryPercent: 85, signalStrength: 79,
    lastReading: '2026-04-29T13:45:00', yesScore: 82,
    installDate: '2025-07-20',
    currentLayers: probe5Layers,
    activeRootZone: { topDepth: 12, bottomDepth: 28 },
    hourlyTrend: makeHourlyTrend(probe5Layers, 82, 6),
    yesScoreTrend: makeYesTrend(82),
    irrigationEvents: irrigationRecent,
    alerts: [],
  },
  {
    id: 'AGS-006', fieldId: 'f-9', clientId: 'cl-4',
    status: 'online', batteryPercent: 81, signalStrength: 76,
    lastReading: '2026-04-29T13:45:00', yesScore: 74,
    installDate: '2025-08-05',
    currentLayers: probe6Layers,
    activeRootZone: { topDepth: 8, bottomDepth: 24 },
    hourlyTrend: makeHourlyTrend(probe6Layers, 74),
    yesScoreTrend: makeYesTrend(74),
    irrigationEvents: irrigationSample,
    alerts: [
      { id: 'alert-2', probeId: 'AGS-006', type: 'high-salinity', severity: 'warning', message: 'EC levels elevated in root zone (1.3 dS/m). Monitor irrigation water quality.', timestamp: '2026-04-28T16:00:00', acknowledged: false },
    ],
  },
  {
    id: 'AGS-007', fieldId: 'f-11', clientId: 'cl-5',
    status: 'online', batteryPercent: 94, signalStrength: 92,
    lastReading: '2026-04-29T13:45:00', yesScore: 91,
    installDate: '2025-04-01',
    currentLayers: probe7Layers,
    activeRootZone: { topDepth: 8, bottomDepth: 24 },
    hourlyTrend: makeHourlyTrend(probe7Layers, 91, 4),
    yesScoreTrend: makeYesTrend(91),
    irrigationEvents: irrigationSample,
    alerts: [],
  },
  {
    id: 'AGS-008', fieldId: 'f-12', clientId: 'cl-5',
    status: 'online', batteryPercent: 67, signalStrength: 58,
    lastReading: '2026-04-29T13:45:00', yesScore: 52,
    installDate: '2025-04-01',
    currentLayers: probe8Layers,
    activeRootZone: { topDepth: 8, bottomDepth: 24 },
    hourlyTrend: makeHourlyTrend(probe8Layers, 52),
    yesScoreTrend: makeYesTrend(52),
    irrigationEvents: irrigationNone,
    alerts: [
      { id: 'alert-3', probeId: 'AGS-008', type: 'over-watering', severity: 'critical', message: 'Saturated soil throughout profile. Active Phytophthora risk zone. Suspend irrigation immediately.', timestamp: '2026-04-29T08:00:00', acknowledged: false },
      { id: 'alert-4', probeId: 'AGS-008', type: 'high-salinity', severity: 'warning', message: 'EC above 2.5 dS/m in root zone. Salt accumulation detected.', timestamp: '2026-04-29T08:00:00', acknowledged: false },
    ],
  },
  {
    id: 'AGS-009', fieldId: 'f-13', clientId: 'cl-5',
    status: 'online', batteryPercent: 88, signalStrength: 82,
    lastReading: '2026-04-29T13:45:00', yesScore: 83,
    installDate: '2025-05-20',
    currentLayers: probe9Layers,
    activeRootZone: { topDepth: 8, bottomDepth: 24 },
    hourlyTrend: makeHourlyTrend(probe9Layers, 83, 5),
    yesScoreTrend: makeYesTrend(83),
    irrigationEvents: irrigationRecent,
    alerts: [],
  },
  {
    id: 'AGS-010', fieldId: 'f-14', clientId: 'cl-6',
    status: 'online', batteryPercent: 90, signalStrength: 85,
    lastReading: '2026-04-29T13:45:00', yesScore: 79,
    installDate: '2025-09-10',
    currentLayers: probe10Layers,
    activeRootZone: { topDepth: 8, bottomDepth: 24 },
    hourlyTrend: makeHourlyTrend(probe10Layers, 79, 4),
    yesScoreTrend: makeYesTrend(79),
    irrigationEvents: irrigationSample,
    alerts: [],
  },
  {
    id: 'AGS-011', fieldId: 'f-16', clientId: 'cl-7',
    status: 'online', batteryPercent: 83, signalStrength: 77,
    lastReading: '2026-04-29T13:45:00', yesScore: 86,
    installDate: '2025-05-01',
    currentLayers: probe11Layers,
    activeRootZone: { topDepth: 12, bottomDepth: 28 },
    hourlyTrend: makeHourlyTrend(probe11Layers, 86, 6),
    yesScoreTrend: makeYesTrend(86),
    irrigationEvents: irrigationRecent,
    alerts: [],
  },
  {
    id: 'AGS-012', fieldId: 'f-19', clientId: 'cl-9',
    status: 'online', batteryPercent: 91, signalStrength: 89,
    lastReading: '2026-04-29T13:45:00', yesScore: 90,
    installDate: '2025-04-15',
    currentLayers: probe12Layers,
    activeRootZone: { topDepth: 8, bottomDepth: 20 },
    hourlyTrend: makeHourlyTrend(probe12Layers, 90, 5),
    yesScoreTrend: makeYesTrend(90),
    irrigationEvents: irrigationSample,
    alerts: [],
  },
  {
    id: 'AGS-013', fieldId: 'f-18', clientId: 'cl-7',
    status: 'offline', batteryPercent: 0, signalStrength: 0,
    lastReading: '2026-04-22T09:30:00', yesScore: 65,
    installDate: '2025-11-01',
    currentLayers: probe13Layers,
    activeRootZone: { topDepth: 12, bottomDepth: 28 },
    hourlyTrend: makeHourlyTrend(probe13Layers, 65),
    yesScoreTrend: [
      { date: '2026-04-17', score: 68 },
      { date: '2026-04-18', score: 66 },
      { date: '2026-04-19', score: 64 },
      { date: '2026-04-20', score: 67 },
      { date: '2026-04-21', score: 65 },
      { date: '2026-04-22', score: 63 },
      { date: '2026-04-23', score: 0 },
    ],
    irrigationEvents: irrigationNone,
    alerts: [
      { id: 'alert-5', probeId: 'AGS-013', type: 'battery-low', severity: 'critical', message: 'Battery depleted. Probe offline since Apr 22. Replace battery pack.', timestamp: '2026-04-22T09:30:00', acknowledged: false },
    ],
  },
  {
    id: 'AGS-014', fieldId: 'f-5', clientId: 'cl-2',
    status: 'offline', batteryPercent: 45, signalStrength: 3,
    lastReading: '2026-04-26T18:15:00', yesScore: 68,
    installDate: '2025-07-20',
    currentLayers: probe14Layers,
    activeRootZone: { topDepth: 12, bottomDepth: 28 },
    hourlyTrend: makeHourlyTrend(probe14Layers, 68),
    yesScoreTrend: [
      { date: '2026-04-23', score: 70 },
      { date: '2026-04-24', score: 69 },
      { date: '2026-04-25', score: 67 },
      { date: '2026-04-26', score: 68 },
      { date: '2026-04-27', score: 0 },
      { date: '2026-04-28', score: 0 },
      { date: '2026-04-29', score: 0 },
    ],
    irrigationEvents: irrigationNone,
    alerts: [
      { id: 'alert-6', probeId: 'AGS-014', type: 'signal-lost', severity: 'critical', message: 'Signal lost since Apr 26. Possible obstruction or gateway issue. Check antenna and nearby gateway.', timestamp: '2026-04-26T18:15:00', acknowledged: false },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getProbeByField(fieldId: string): AgSpyProbe | undefined {
  return agspyProbes.find(p => p.fieldId === fieldId);
}

export function getProbeById(probeId: string): AgSpyProbe | undefined {
  return agspyProbes.find(p => p.id === probeId);
}
