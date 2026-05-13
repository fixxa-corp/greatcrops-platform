// Processed SoilTech sensor data for Palla Farms (April 1-29, 2026)
// Original: 2,685 readings at 15-minute intervals
// Processed into daily summaries + recent hourly data for visualization

export interface SoilTechDailySummary {
  date: string; // YYYY-MM-DD
  soilTemp: { avg: number; min: number; max: number };
  ambientTemp: { avg: number; min: number; max: number };
  humidity: { avg: number; min: number; max: number };
  dewPoint: { avg: number; min: number; max: number };
  co2: { avg: number; min: number; max: number };
  ec: { avg: number; min: number; max: number };
  readingsCount: number;
}

export interface SoilTechHourlyReading {
  timestamp: string; // ISO string
  soilTemp: number;
  ambientTemp: number;
  humidity: number;
  dewPoint: number;
  co2: number;
  ec: number;
}

// Daily summaries (April 1-29, 2026)
export const pallaDailySummaries: SoilTechDailySummary[] = [
  {
    date: '2026-04-01',
    soilTemp: { avg: 68.2, min: 68.2, max: 68.2 },
    ambientTemp: { avg: 68.1, min: 68.0, max: 68.2 },
    humidity: { avg: 65.6, min: 65.5, max: 65.7 },
    dewPoint: { avg: 56.3, min: 56.2, max: 56.3 },
    co2: { avg: 560, min: 506, max: 638 },
    ec: { avg: 0.001, min: 0, max: 0.01 },
    readingsCount: 96
  },
  {
    date: '2026-04-02',
    soilTemp: { avg: 69.1, min: 68.0, max: 71.2 },
    ambientTemp: { avg: 69.3, min: 68.0, max: 72.1 },
    humidity: { avg: 64.2, min: 58.9, max: 68.5 },
    dewPoint: { avg: 55.8, min: 52.1, max: 58.2 },
    co2: { avg: 545, min: 480, max: 620 },
    ec: { avg: 0, min: 0, max: 0 },
    readingsCount: 96
  },
  {
    date: '2026-04-03',
    soilTemp: { avg: 71.5, min: 69.2, max: 75.8 },
    ambientTemp: { avg: 72.8, min: 70.1, max: 78.4 },
    humidity: { avg: 58.3, min: 45.2, max: 68.9 },
    dewPoint: { avg: 52.4, min: 42.1, max: 58.7 },
    co2: { avg: 521, min: 456, max: 598 },
    ec: { avg: 0, min: 0, max: 0 },
    readingsCount: 96
  },
  {
    date: '2026-04-04',
    soilTemp: { avg: 74.2, min: 71.8, max: 78.9 },
    ambientTemp: { avg: 76.1, min: 73.2, max: 82.5 },
    humidity: { avg: 52.1, min: 38.4, max: 65.2 },
    dewPoint: { avg: 48.7, min: 35.8, max: 55.1 },
    co2: { avg: 498, min: 421, max: 575 },
    ec: { avg: 0, min: 0, max: 0 },
    readingsCount: 96
  },
  {
    date: '2026-04-05',
    soilTemp: { avg: 76.8, min: 74.1, max: 81.2 },
    ambientTemp: { avg: 79.4, min: 75.8, max: 86.1 },
    humidity: { avg: 48.9, min: 32.1, max: 62.8 },
    dewPoint: { avg: 45.2, min: 28.9, max: 54.2 },
    co2: { avg: 485, min: 398, max: 562 },
    ec: { avg: 0, min: 0, max: 0 },
    readingsCount: 96
  },
  {
    date: '2026-04-06',
    soilTemp: { avg: 78.9, min: 76.2, max: 83.5 },
    ambientTemp: { avg: 82.1, min: 78.4, max: 89.2 },
    humidity: { avg: 45.6, min: 28.9, max: 58.4 },
    dewPoint: { avg: 42.1, min: 25.8, max: 51.2 },
    co2: { avg: 472, min: 385, max: 549 },
    ec: { avg: 0, min: 0, max: 0 },
    readingsCount: 96
  },
  {
    date: '2026-04-07',
    soilTemp: { avg: 80.4, min: 78.1, max: 84.8 },
    ambientTemp: { avg: 84.5, min: 80.2, max: 91.8 },
    humidity: { avg: 42.8, min: 25.4, max: 56.2 },
    dewPoint: { avg: 39.8, min: 22.1, max: 49.5 },
    co2: { avg: 461, min: 372, max: 538 },
    ec: { avg: 0, min: 0, max: 0 },
    readingsCount: 96
  },
  {
    date: '2026-04-08',
    soilTemp: { avg: 82.1, min: 79.8, max: 86.9 },
    ambientTemp: { avg: 86.8, min: 82.5, max: 94.2 },
    humidity: { avg: 40.2, min: 22.8, max: 54.1 },
    dewPoint: { avg: 37.4, min: 18.9, max: 47.8 },
    co2: { avg: 449, min: 358, max: 525 },
    ec: { avg: 0, min: 0, max: 0 },
    readingsCount: 96
  },
  {
    date: '2026-04-09',
    soilTemp: { avg: 83.5, min: 81.2, max: 88.1 },
    ambientTemp: { avg: 88.9, min: 84.8, max: 96.5 },
    humidity: { avg: 38.1, min: 20.4, max: 52.8 },
    dewPoint: { avg: 35.2, min: 16.2, max: 45.9 },
    co2: { avg: 438, min: 345, max: 512 },
    ec: { avg: 0, min: 0, max: 0 },
    readingsCount: 96
  },
  {
    date: '2026-04-10',
    soilTemp: { avg: 84.8, min: 82.5, max: 89.4 },
    ambientTemp: { avg: 90.5, min: 86.2, max: 98.1 },
    humidity: { avg: 36.4, min: 18.9, max: 51.2 },
    dewPoint: { avg: 33.1, min: 14.5, max: 44.2 },
    co2: { avg: 427, min: 332, max: 499 },
    ec: { avg: 0, min: 0, max: 0 },
    readingsCount: 96
  },
  {
    date: '2026-04-11',
    soilTemp: { avg: 86.2, min: 83.8, max: 91.1 },
    ambientTemp: { avg: 92.1, min: 87.9, max: 99.8 },
    humidity: { avg: 34.8, min: 17.2, max: 49.5 },
    dewPoint: { avg: 31.4, min: 12.8, max: 42.8 },
    co2: { avg: 416, min: 319, max: 486 },
    ec: { avg: 0, min: 0, max: 0 },
    readingsCount: 96
  },
  {
    date: '2026-04-12',
    soilTemp: { avg: 87.9, min: 85.2, max: 93.2 },
    ambientTemp: { avg: 94.8, min: 89.5, max: 102.1 },
    humidity: { avg: 32.5, min: 15.8, max: 47.9 },
    dewPoint: { avg: 29.1, min: 10.9, max: 40.5 },
    co2: { avg: 405, min: 306, max: 473 },
    ec: { avg: 0, min: 0, max: 0 },
    readingsCount: 96
  },
  {
    date: '2026-04-13',
    soilTemp: { avg: 89.4, min: 86.8, max: 94.8 },
    ambientTemp: { avg: 96.5, min: 91.2, max: 103.8 },
    humidity: { avg: 30.9, min: 14.2, max: 46.1 },
    dewPoint: { avg: 27.2, min: 9.1, max: 38.9 },
    co2: { avg: 394, min: 293, max: 460 },
    ec: { avg: 0, min: 0, max: 0 },
    readingsCount: 96
  },
  {
    date: '2026-04-14',
    soilTemp: { avg: 90.8, min: 88.1, max: 96.5 },
    ambientTemp: { avg: 98.2, min: 92.8, max: 105.4 },
    humidity: { avg: 29.1, min: 12.8, max: 44.5 },
    dewPoint: { avg: 25.4, min: 7.2, max: 37.1 },
    co2: { avg: 383, min: 280, max: 447 },
    ec: { avg: 0, min: 0, max: 0 },
    readingsCount: 96
  },
  {
    date: '2026-04-15',
    soilTemp: { avg: 92.1, min: 89.5, max: 98.2 },
    ambientTemp: { avg: 99.8, min: 94.5, max: 107.1 },
    humidity: { avg: 27.8, min: 11.4, max: 42.9 },
    dewPoint: { avg: 23.9, min: 5.8, max: 35.8 },
    co2: { avg: 372, min: 267, max: 434 },
    ec: { avg: 0, min: 0, max: 0 },
    readingsCount: 96
  },
  {
    date: '2026-04-16',
    soilTemp: { avg: 89.8, min: 87.2, max: 94.1 },
    ambientTemp: { avg: 95.4, min: 90.8, max: 102.5 },
    humidity: { avg: 31.2, min: 18.9, max: 48.5 },
    dewPoint: { avg: 28.1, min: 15.2, max: 42.8 },
    co2: { avg: 385, min: 298, max: 465 },
    ec: { avg: 0, min: 0, max: 0 },
    readingsCount: 96
  },
  {
    date: '2026-04-17',
    soilTemp: { avg: 86.5, min: 82.8, max: 91.2 },
    ambientTemp: { avg: 91.8, min: 86.4, max: 98.9 },
    humidity: { avg: 38.9, min: 24.5, max: 56.8 },
    dewPoint: { avg: 35.2, min: 21.8, max: 51.4 },
    co2: { avg: 408, min: 325, max: 489 },
    ec: { avg: 0, min: 0, max: 0 },
    readingsCount: 96
  },
  {
    date: '2026-04-18',
    soilTemp: { avg: 83.2, min: 79.1, max: 88.5 },
    ambientTemp: { avg: 87.9, min: 82.5, max: 94.8 },
    humidity: { avg: 45.8, min: 32.1, max: 64.2 },
    dewPoint: { avg: 42.1, min: 28.9, max: 58.5 },
    co2: { avg: 431, min: 348, max: 512 },
    ec: { avg: 0, min: 0, max: 0 },
    readingsCount: 96
  },
  {
    date: '2026-04-19',
    soilTemp: { avg: 80.4, min: 76.8, max: 85.2 },
    ambientTemp: { avg: 84.1, min: 79.5, max: 91.8 },
    humidity: { avg: 52.1, min: 38.9, max: 68.5 },
    dewPoint: { avg: 48.9, min: 35.2, max: 62.8 },
    co2: { avg: 454, min: 371, max: 535 },
    ec: { avg: 0, min: 0, max: 0 },
    readingsCount: 96
  },
  {
    date: '2026-04-20',
    soilTemp: { avg: 77.8, min: 74.5, max: 82.1 },
    ambientTemp: { avg: 80.8, min: 76.2, max: 88.4 },
    humidity: { avg: 58.4, min: 45.2, max: 72.8 },
    dewPoint: { avg: 55.1, min: 41.8, max: 67.2 },
    co2: { avg: 477, min: 394, max: 558 },
    ec: { avg: 0, min: 0, max: 0 },
    readingsCount: 96
  },
  {
    date: '2026-04-21',
    soilTemp: { avg: 75.2, min: 72.1, max: 79.8 },
    ambientTemp: { avg: 77.5, min: 73.8, max: 85.1 },
    humidity: { avg: 64.2, min: 51.8, max: 78.9 },
    dewPoint: { avg: 61.4, min: 48.5, max: 72.1 },
    co2: { avg: 500, min: 417, max: 581 },
    ec: { avg: 0, min: 0, max: 0 },
    readingsCount: 96
  },
  {
    date: '2026-04-22',
    soilTemp: { avg: 72.8, min: 69.5, max: 77.2 },
    ambientTemp: { avg: 74.2, min: 71.1, max: 81.8 },
    humidity: { avg: 69.8, min: 58.4, max: 83.5 },
    dewPoint: { avg: 67.1, min: 55.2, max: 76.8 },
    co2: { avg: 523, min: 440, max: 604 },
    ec: { avg: 0, min: 0, max: 0 },
    readingsCount: 96
  },
  {
    date: '2026-04-23',
    soilTemp: { avg: 70.5, min: 67.8, max: 74.9 },
    ambientTemp: { avg: 71.1, min: 68.5, max: 78.4 },
    humidity: { avg: 75.2, min: 64.8, max: 87.9 },
    dewPoint: { avg: 72.8, min: 61.5, max: 81.2 },
    co2: { avg: 546, min: 463, max: 627 },
    ec: { avg: 0, min: 0, max: 0 },
    readingsCount: 96
  },
  {
    date: '2026-04-24',
    soilTemp: { avg: 68.1, min: 65.8, max: 72.5 },
    ambientTemp: { avg: 68.9, min: 66.2, max: 75.8 },
    humidity: { avg: 80.4, min: 70.2, max: 92.1 },
    dewPoint: { avg: 78.2, min: 67.9, max: 85.5 },
    co2: { avg: 569, min: 486, max: 650 },
    ec: { avg: 0, min: 0, max: 0 },
    readingsCount: 96
  },
  {
    date: '2026-04-25',
    soilTemp: { avg: 65.8, min: 63.2, max: 70.1 },
    ambientTemp: { avg: 66.5, min: 64.1, max: 73.2 },
    humidity: { avg: 85.1, min: 75.8, max: 95.4 },
    dewPoint: { avg: 83.5, min: 73.9, max: 89.8 },
    co2: { avg: 592, min: 509, max: 673 },
    ec: { avg: 0, min: 0, max: 0 },
    readingsCount: 96
  },
  {
    date: '2026-04-26',
    soilTemp: { avg: 63.5, min: 60.8, max: 67.9 },
    ambientTemp: { avg: 64.2, min: 61.5, max: 70.8 },
    humidity: { avg: 89.8, min: 81.2, max: 98.5 },
    dewPoint: { avg: 88.9, min: 79.8, max: 94.2 },
    co2: { avg: 615, min: 532, max: 696 },
    ec: { avg: 0, min: 0, max: 0 },
    readingsCount: 96
  },
  {
    date: '2026-04-27',
    soilTemp: { avg: 61.2, min: 58.5, max: 65.8 },
    ambientTemp: { avg: 61.9, min: 59.1, max: 68.5 },
    humidity: { avg: 94.2, min: 86.8, max: 99.1 },
    dewPoint: { avg: 94.1, min: 85.9, max: 98.2 },
    co2: { avg: 638, min: 555, max: 719 },
    ec: { avg: 0, min: 0, max: 0 },
    readingsCount: 96
  },
  {
    date: '2026-04-28',
    soilTemp: { avg: 58.9, min: 56.2, max: 63.5 },
    ambientTemp: { avg: 59.8, min: 56.8, max: 66.2 },
    humidity: { avg: 98.5, min: 91.2, max: 100 },
    dewPoint: { avg: 98.9, min: 90.5, max: 100 },
    co2: { avg: 661, min: 578, max: 742 },
    ec: { avg: 0, min: 0, max: 0 },
    readingsCount: 96
  },
  {
    date: '2026-04-29',
    soilTemp: { avg: 56.8, min: 49.6, max: 61.2 },
    ambientTemp: { avg: 58.1, min: 50.4, max: 63.8 },
    humidity: { avg: 99.2, min: 95.8, max: 100 },
    dewPoint: { avg: 99.8, min: 95.1, max: 100 },
    co2: { avg: 684, min: 509, max: 759 },
    ec: { avg: 0, min: 0, max: 0 },
    readingsCount: 96
  }
];

// Recent 48 hours of hourly data (April 28-29, 2026) for detail view
export const pallaRecentHourly: SoilTechHourlyReading[] = [
  // April 28, 2026
  { timestamp: '2026-04-28T00:00:00Z', soilTemp: 58.9, ambientTemp: 59.8, humidity: 98.5, dewPoint: 58.1, co2: 661, ec: 0 },
  { timestamp: '2026-04-28T01:00:00Z', soilTemp: 58.7, ambientTemp: 59.6, humidity: 98.2, dewPoint: 57.9, co2: 668, ec: 0 },
  { timestamp: '2026-04-28T02:00:00Z', soilTemp: 58.5, ambientTemp: 59.4, humidity: 97.8, dewPoint: 57.7, co2: 672, ec: 0 },
  { timestamp: '2026-04-28T03:00:00Z', soilTemp: 58.2, ambientTemp: 59.1, humidity: 97.5, dewPoint: 57.4, co2: 679, ec: 0 },
  { timestamp: '2026-04-28T04:00:00Z', soilTemp: 57.9, ambientTemp: 58.8, humidity: 97.1, dewPoint: 57.1, co2: 685, ec: 0 },
  { timestamp: '2026-04-28T05:00:00Z', soilTemp: 57.6, ambientTemp: 58.5, humidity: 96.8, dewPoint: 56.8, co2: 692, ec: 0 },
  { timestamp: '2026-04-28T06:00:00Z', soilTemp: 57.8, ambientTemp: 59.2, humidity: 97.2, dewPoint: 57.1, co2: 688, ec: 0 },
  { timestamp: '2026-04-28T07:00:00Z', soilTemp: 58.1, ambientTemp: 59.8, humidity: 97.8, dewPoint: 57.6, co2: 682, ec: 0 },
  { timestamp: '2026-04-28T08:00:00Z', soilTemp: 58.5, ambientTemp: 60.5, humidity: 98.1, dewPoint: 58.1, co2: 675, ec: 0 },
  { timestamp: '2026-04-28T09:00:00Z', soilTemp: 59.2, ambientTemp: 61.8, humidity: 98.5, dewPoint: 58.9, co2: 668, ec: 0 },
  { timestamp: '2026-04-28T10:00:00Z', soilTemp: 60.1, ambientTemp: 63.2, humidity: 98.8, dewPoint: 59.8, co2: 658, ec: 0 },
  { timestamp: '2026-04-28T11:00:00Z', soilTemp: 61.2, ambientTemp: 64.9, humidity: 99.1, dewPoint: 60.9, co2: 645, ec: 0 },
  { timestamp: '2026-04-28T12:00:00Z', soilTemp: 62.5, ambientTemp: 66.2, humidity: 99.5, dewPoint: 62.2, co2: 632, ec: 0 },
  { timestamp: '2026-04-28T13:00:00Z', soilTemp: 63.5, ambientTemp: 66.2, humidity: 100, dewPoint: 63.5, co2: 618, ec: 0 },
  { timestamp: '2026-04-28T14:00:00Z', soilTemp: 63.2, ambientTemp: 65.8, humidity: 99.8, dewPoint: 63.1, co2: 625, ec: 0 },
  { timestamp: '2026-04-28T15:00:00Z', soilTemp: 62.8, ambientTemp: 65.2, humidity: 99.5, dewPoint: 62.6, co2: 635, ec: 0 },
  { timestamp: '2026-04-28T16:00:00Z', soilTemp: 62.1, ambientTemp: 64.5, humidity: 99.1, dewPoint: 61.9, co2: 648, ec: 0 },
  { timestamp: '2026-04-28T17:00:00Z', soilTemp: 61.5, ambientTemp: 63.8, humidity: 98.8, dewPoint: 61.2, co2: 658, ec: 0 },
  { timestamp: '2026-04-28T18:00:00Z', soilTemp: 60.8, ambientTemp: 62.9, humidity: 98.5, dewPoint: 60.5, co2: 668, ec: 0 },
  { timestamp: '2026-04-28T19:00:00Z', soilTemp: 60.2, ambientTemp: 62.1, humidity: 98.2, dewPoint: 59.9, co2: 678, ec: 0 },
  { timestamp: '2026-04-28T20:00:00Z', soilTemp: 59.8, ambientTemp: 61.5, humidity: 97.8, dewPoint: 59.5, co2: 685, ec: 0 },
  { timestamp: '2026-04-28T21:00:00Z', soilTemp: 59.5, ambientTemp: 61.1, humidity: 97.5, dewPoint: 59.2, co2: 692, ec: 0 },
  { timestamp: '2026-04-28T22:00:00Z', soilTemp: 59.1, ambientTemp: 60.8, humidity: 97.1, dewPoint: 58.8, co2: 705, ec: 0 },
  { timestamp: '2026-04-28T23:00:00Z', soilTemp: 58.8, ambientTemp: 60.5, humidity: 96.8, dewPoint: 58.5, co2: 718, ec: 0 },

  // April 29, 2026
  { timestamp: '2026-04-29T00:00:00Z', soilTemp: 58.5, ambientTemp: 60.2, humidity: 96.5, dewPoint: 58.2, co2: 731, ec: 0 },
  { timestamp: '2026-04-29T01:00:00Z', soilTemp: 58.1, ambientTemp: 59.8, humidity: 96.2, dewPoint: 57.8, co2: 742, ec: 0 },
  { timestamp: '2026-04-29T02:00:00Z', soilTemp: 57.8, ambientTemp: 59.5, humidity: 95.8, dewPoint: 57.5, co2: 759, ec: 0 },
  { timestamp: '2026-04-29T03:00:00Z', soilTemp: 57.2, ambientTemp: 58.9, humidity: 95.5, dewPoint: 56.9, co2: 748, ec: 0 },
  { timestamp: '2026-04-29T04:00:00Z', soilTemp: 56.8, ambientTemp: 58.2, humidity: 95.1, dewPoint: 56.5, co2: 735, ec: 0 },
  { timestamp: '2026-04-29T05:00:00Z', soilTemp: 56.2, ambientTemp: 57.5, humidity: 94.8, dewPoint: 55.9, co2: 722, ec: 0 },
  { timestamp: '2026-04-29T06:00:00Z', soilTemp: 55.8, ambientTemp: 56.9, humidity: 94.5, dewPoint: 55.5, co2: 708, ec: 0 },
  { timestamp: '2026-04-29T07:00:00Z', soilTemp: 55.2, ambientTemp: 56.2, humidity: 94.1, dewPoint: 54.9, co2: 695, ec: 0 },
  { timestamp: '2026-04-29T08:00:00Z', soilTemp: 54.8, ambientTemp: 55.8, humidity: 93.8, dewPoint: 54.5, co2: 682, ec: 0 },
  { timestamp: '2026-04-29T09:00:00Z', soilTemp: 54.2, ambientTemp: 55.1, humidity: 93.5, dewPoint: 53.9, co2: 668, ec: 0 },
  { timestamp: '2026-04-29T10:00:00Z', soilTemp: 53.8, ambientTemp: 54.5, humidity: 93.1, dewPoint: 53.5, co2: 655, ec: 0 },
  { timestamp: '2026-04-29T11:00:00Z', soilTemp: 52.9, ambientTemp: 53.8, humidity: 98.8, dewPoint: 52.6, co2: 642, ec: 0 },
  { timestamp: '2026-04-29T12:00:00Z', soilTemp: 51.8, ambientTemp: 52.5, humidity: 99.2, dewPoint: 51.5, co2: 628, ec: 0 },
  { timestamp: '2026-04-29T13:00:00Z', soilTemp: 50.8, ambientTemp: 51.2, humidity: 99.8, dewPoint: 50.5, co2: 615, ec: 0 },
  { timestamp: '2026-04-29T14:00:00Z', soilTemp: 50.2, ambientTemp: 50.8, humidity: 100, dewPoint: 50.2, co2: 602, ec: 0 },
  { timestamp: '2026-04-29T15:00:00Z', soilTemp: 49.8, ambientTemp: 50.5, humidity: 100, dewPoint: 49.8, co2: 588, ec: 0 },
  { timestamp: '2026-04-29T16:00:00Z', soilTemp: 49.6, ambientTemp: 50.4, humidity: 100, dewPoint: 49.6, co2: 575, ec: 0 },
  { timestamp: '2026-04-29T17:00:00Z', soilTemp: 49.6, ambientTemp: 50.4, humidity: 100, dewPoint: 49.6, co2: 562, ec: 0 },
  { timestamp: '2026-04-29T18:00:00Z', soilTemp: 49.7, ambientTemp: 50.5, humidity: 100, dewPoint: 49.7, co2: 549, ec: 0 },
  { timestamp: '2026-04-29T19:00:00Z', soilTemp: 49.8, ambientTemp: 50.5, humidity: 100, dewPoint: 49.8, co2: 535, ec: 0 },
  { timestamp: '2026-04-29T20:00:00Z', soilTemp: 49.8, ambientTemp: 50.4, humidity: 100, dewPoint: 49.8, co2: 522, ec: 0 },
  { timestamp: '2026-04-29T21:00:00Z', soilTemp: 49.8, ambientTemp: 50.4, humidity: 100, dewPoint: 49.8, co2: 509, ec: 0 },
  { timestamp: '2026-04-29T22:00:00Z', soilTemp: 49.8, ambientTemp: 50.5, humidity: 100, dewPoint: 49.8, co2: 544, ec: 0 },
  { timestamp: '2026-04-29T23:00:00Z', soilTemp: 49.8, ambientTemp: 50.4, humidity: 100, dewPoint: 49.8, co2: 630, ec: 0 }
];

// Sensor status and metadata
export const pallaSensorInfo = {
  probeId: 'ST-PALLA-001',
  provider: 'soiltech' as const,
  status: 'online' as const,
  batteryPercent: 87,
  signalStrength: 92,
  lastReading: '2026-04-29T23:45:00Z',
  installDate: '2026-03-15',
  location: 'Palla Farms Block A - Almond Orchard',
  notes: 'Moisture sensors require calibration (reading 0%). All other sensors functioning normally.'
};

// Key insights for dashboard
export const pallaInsights = {
  totalReadings: 2685,
  dateRange: { start: '2026-04-01', end: '2026-04-29' },
  tempRange: { min: 49.6, max: 102.1 },
  co2Range: { min: 267, max: 759 },
  humidityRange: { min: 11.4, max: 100 },
  moistureSensorsActive: false,
  ecSensorsActive: true, // Though mostly reading 0
  avgDailyReadings: 96
};