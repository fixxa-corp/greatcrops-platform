import { useState } from 'react';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, BarChart, Bar,
} from 'recharts';
import {
  Wifi, WifiOff, Thermometer, Droplets, Zap, Beaker, RefreshCw,
  Calendar, TrendingUp, AlertTriangle, Radio, Satellite, Eye,
  Activity, Gauge, Wind, Sun, CloudRain, Waves,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatDate } from '../../lib/utils';
import type { RemoteSensingProbe, Block, Ranch } from '../../types';

interface RemoteSensingTabProps {
  block: Block;
  ranch: Ranch | undefined;
  probes: RemoteSensingProbe[];
}

// ─── Provider branding ───────────────────────────────────────────────────────

const providerConfig = {
  aquaspy: {
    name: 'AquaSpy',
    tagline: 'YES! Score soil moisture monitoring',
    color: 'bg-blue-500',
    lightBg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    accent: 'text-blue-600',
    icon: Waves,
    gradient: 'from-blue-500 to-blue-600',
    chartColor: '#2563eb',
  },
  soiltech: {
    name: 'SoilTech',
    tagline: 'Real-time Redox/ORP soil analysis',
    color: 'bg-green-500',
    lightBg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-700',
    accent: 'text-green-600',
    icon: Beaker,
    gradient: 'from-green-500 to-green-600',
    chartColor: '#16a34a',
  },
  agrology: {
    name: 'Agrology',
    tagline: 'AI-powered soil & crop intelligence',
    color: 'bg-amber-500',
    lightBg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    accent: 'text-amber-600',
    icon: Satellite,
    gradient: 'from-amber-500 to-amber-600',
    chartColor: '#d97706',
  },
};

// ─── Mock time-series data for each provider ─────────────────────────────────
// In production, these would come from the actual APIs

function generateTimeSeries(days: number, baseValue: number, variance: number, trend: number = 0) {
  const data = [];
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const noise = (Math.random() - 0.5) * variance;
    const trendValue = trend * (days - i) / days;
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: +(baseValue + noise + trendValue).toFixed(2),
    });
  }
  return data;
}

// AquaSpy moisture data per probe
function getAquaSpyData() {
  return {
    moisture: [
      { date: 'May 1', '8"': 32.1, '16"': 28.4, '24"': 25.2, '36"': 22.8 },
      { date: 'May 3', '8"': 34.5, '16"': 29.1, '24"': 25.8, '36"': 23.1 },
      { date: 'May 5', '8"': 31.2, '16"': 27.8, '24"': 25.0, '36"': 22.5 },
      { date: 'May 7', '8"': 36.8, '16"': 30.2, '24"': 26.4, '36"': 23.4 },
      { date: 'May 9', '8"': 33.4, '16"': 29.5, '24"': 25.9, '36"': 23.0 },
      { date: 'May 11', '8"': 30.1, '16"': 27.2, '24"': 24.6, '36"': 22.2 },
      { date: 'May 13', '8"': 35.2, '16"': 29.8, '24"': 26.1, '36"': 23.2 },
    ],
    yesScore: 78,
    irrigationEfficiency: 82,
    rootZoneStatus: 'optimal',
    lastIrrigation: '2026-05-12T06:00:00',
    nextRecommended: '2026-05-14T06:00:00',
  };
}

// SoilTech data
function getSoilTechData() {
  return {
    redox: generateTimeSeries(14, 420, 60, 30),
    temperature: generateTimeSeries(14, 18.5, 3, 1.5),
    ec: generateTimeSeries(14, 1.8, 0.4, -0.1),
    metrics: {
      currentRedox: 448,
      redoxTrend: 'improving',
      avgTemp: 19.2,
      tempTrend: 'rising',
      currentEC: 1.72,
      ecTrend: 'stable',
      oxygenDiffusion: 'adequate',
      soilRespiration: 14.2,
    },
  };
}

// Agrology data
function getAgrologyData() {
  return {
    co2Flux: generateTimeSeries(14, 12.5, 3, 1.2),
    vwc: generateTimeSeries(14, 28.5, 4, 0),
    metrics: {
      co2Current: 14.8,
      co2Trend: 'increasing',
      vwcCurrent: 29.1,
      vwcTrend: 'stable',
      soilHealth: 76,
      carbonSequestration: 2.4,
      nitrogenAvailability: 'moderate',
      microbialActivity: 'high',
      stressIndex: 0.18,
      growthPotential: 82,
    },
  };
}

export function RemoteSensingTab({ block, ranch, probes }: RemoteSensingTabProps) {
  const [activeProvider, setActiveProvider] = useState<'all' | 'aquaspy' | 'soiltech' | 'agrology'>('all');

  const aquaSpyData = getAquaSpyData();
  const soilTechData = getSoilTechData();
  const agrologyData = getAgrologyData();

  const aquaSpyProbes = probes.filter(p => p.provider === 'aquaspy');
  const onlineCount = probes.filter(p => p.status === 'online').length;

  const providers = ['aquaspy', 'soiltech', 'agrology'] as const;

  return (
    <div className="space-y-6">
      {/* ─── Header ─── */}
      <div className="bg-gradient-to-r from-charcoal to-gray-700 rounded-xl p-6 text-white">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Radio className="w-6 h-6" />
              <h2 className="text-xl font-bold">Remote Sensing & Soil Monitoring</h2>
            </div>
            <p className="text-gray-300 text-sm">
              3 integrated data providers • {aquaSpyProbes.length} field sensors •
              Real-time soil intelligence for {block.name}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-2xl font-bold">{onlineCount}/{probes.length}</div>
              <div className="text-xs text-gray-400">sensors online</div>
            </div>
            <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync All
            </Button>
          </div>
        </div>

        {/* Provider pills */}
        <div className="flex gap-2 mt-4 flex-wrap">
          <button
            onClick={() => setActiveProvider('all')}
            className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
              activeProvider === 'all'
                ? 'bg-white text-charcoal'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            All Providers
          </button>
          {providers.map(key => {
            const cfg = providerConfig[key];
            return (
              <button
                key={key}
                onClick={() => setActiveProvider(key)}
                className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  activeProvider === key
                    ? 'bg-white text-charcoal'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <div className={`w-2.5 h-2.5 rounded-full ${cfg.color}`} />
                {cfg.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Provider Summary Cards ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {providers.map(key => {
          const cfg = providerConfig[key];
          const Icon = cfg.icon;
          const isActive = activeProvider === 'all' || activeProvider === key;

          return (
            <Card
              key={key}
              className={`transition-all cursor-pointer ${
                isActive ? `${cfg.border} shadow-md` : 'opacity-50 grayscale'
              }`}
              onClick={() => setActiveProvider(activeProvider === key ? 'all' : key)}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cfg.gradient} flex items-center justify-center text-white flex-shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-charcoal">{cfg.name}</h3>
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{cfg.tagline}</p>

                    {key === 'aquaspy' && (
                      <div className="mt-3 space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">YES! Score:</span>
                          <span className={`font-bold ${aquaSpyData.yesScore >= 70 ? 'text-green-600' : 'text-orange-500'}`}>
                            {aquaSpyData.yesScore}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Probes:</span>
                          <span className="font-medium">{aquaSpyProbes.length} active</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Irrigation Eff:</span>
                          <span className="font-medium">{aquaSpyData.irrigationEfficiency}%</span>
                        </div>
                      </div>
                    )}

                    {key === 'soiltech' && (
                      <div className="mt-3 space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Redox (ORP):</span>
                          <span className="font-bold text-green-600">{soilTechData.metrics.currentRedox} mV</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Soil Temp:</span>
                          <span className="font-medium">{soilTechData.metrics.avgTemp}°C</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">EC:</span>
                          <span className="font-medium">{soilTechData.metrics.currentEC} dS/m</span>
                        </div>
                      </div>
                    )}

                    {key === 'agrology' && (
                      <div className="mt-3 space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">CO₂ Flux:</span>
                          <span className="font-bold text-amber-600">{agrologyData.metrics.co2Current} µmol/m²s</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">VWC:</span>
                          <span className="font-medium">{agrologyData.metrics.vwcCurrent}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Growth Index:</span>
                          <span className="font-medium">{agrologyData.metrics.growthPotential}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ─── AQUASPY Section ─── */}
      {(activeProvider === 'all' || activeProvider === 'aquaspy') && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${providerConfig.aquaspy.gradient} flex items-center justify-center text-white`}>
              <Waves className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-charcoal">AquaSpy — Soil Moisture Profile</h3>
              <p className="text-xs text-gray-500">Multi-depth moisture monitoring • Site IDs: {aquaSpyProbes.map(p => p.probeId.replace('AGS-', '')).join(', ')}</p>
            </div>
          </div>

          {/* AquaSpy key metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card className="border-blue-100">
              <CardContent className="p-4 text-center">
                <Droplets className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                <div className="text-2xl font-bold text-blue-600">{aquaSpyData.yesScore}</div>
                <div className="text-xs text-gray-500">YES! Score</div>
              </CardContent>
            </Card>
            <Card className="border-blue-100">
              <CardContent className="p-4 text-center">
                <Gauge className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                <div className="text-2xl font-bold text-charcoal">{aquaSpyData.irrigationEfficiency}%</div>
                <div className="text-xs text-gray-500">Irrigation Eff.</div>
              </CardContent>
            </Card>
            <Card className="border-blue-100">
              <CardContent className="p-4 text-center">
                <Activity className="w-5 h-5 text-green-500 mx-auto mb-1" />
                <div className="text-sm font-bold text-green-600 capitalize">{aquaSpyData.rootZoneStatus}</div>
                <div className="text-xs text-gray-500">Root Zone</div>
              </CardContent>
            </Card>
            <Card className="border-blue-100">
              <CardContent className="p-4 text-center">
                <Calendar className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                <div className="text-sm font-bold text-charcoal">{formatDate(aquaSpyData.nextRecommended)}</div>
                <div className="text-xs text-gray-500">Next Irrigation</div>
              </CardContent>
            </Card>
          </div>

          {/* AquaSpy moisture chart */}
          <Card>
            <CardHeader>
              <h4 className="font-semibold text-charcoal">Multi-Depth Soil Moisture</h4>
              <p className="text-xs text-gray-500">Volumetric water content (%) at 4 depth levels</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={aquaSpyData.moisture}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} label={{ value: 'VWC %', angle: -90, position: 'insideLeft', style: { fontSize: 11 } }} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey='8"' stroke="#1d4ed8" fill="#1d4ed8" fillOpacity={0.15} strokeWidth={2} />
                  <Area type="monotone" dataKey='16"' stroke="#2563eb" fill="#2563eb" fillOpacity={0.1} strokeWidth={2} />
                  <Area type="monotone" dataKey='24"' stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.08} strokeWidth={2} />
                  <Area type="monotone" dataKey='36"' stroke="#93c5fd" fill="#93c5fd" fillOpacity={0.05} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* AquaSpy probe grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {aquaSpyProbes.map(probe => (
              <Card key={probe.id} className="border-blue-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="font-semibold text-sm text-charcoal">{probe.probeId}</span>
                    </div>
                    <Badge variant="success" size="sm">{probe.status}</Badge>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex justify-between">
                      <span>Site ID:</span>
                      <span className="font-mono font-medium text-charcoal">{probe.probeId.replace('AGS-', '')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Battery:</span>
                      <span className={`font-medium ${probe.batteryPercent > 50 ? 'text-green-600' : 'text-orange-500'}`}>{probe.batteryPercent}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Signal:</span>
                      <span className="font-medium">{probe.signalStrength}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last reading:</span>
                      <span className="font-medium">{formatDate(probe.lastReading)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ─── SOILTECH Section ─── */}
      {(activeProvider === 'all' || activeProvider === 'soiltech') && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${providerConfig.soiltech.gradient} flex items-center justify-center text-white`}>
              <Beaker className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-charcoal">SoilTech — Redox & Electrochemical Analysis</h3>
              <p className="text-xs text-gray-500">Real-time ORP monitoring • API integration active</p>
            </div>
          </div>

          {/* SoilTech key metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card className="border-green-100">
              <CardContent className="p-4 text-center">
                <Zap className="w-5 h-5 text-green-500 mx-auto mb-1" />
                <div className="text-2xl font-bold text-green-600">{soilTechData.metrics.currentRedox}</div>
                <div className="text-xs text-gray-500">Redox (mV)</div>
                <div className="text-xs text-green-500 mt-1">↑ {soilTechData.metrics.redoxTrend}</div>
              </CardContent>
            </Card>
            <Card className="border-green-100">
              <CardContent className="p-4 text-center">
                <Thermometer className="w-5 h-5 text-red-400 mx-auto mb-1" />
                <div className="text-2xl font-bold text-charcoal">{soilTechData.metrics.avgTemp}°C</div>
                <div className="text-xs text-gray-500">Soil Temp</div>
                <div className="text-xs text-orange-500 mt-1">↑ {soilTechData.metrics.tempTrend}</div>
              </CardContent>
            </Card>
            <Card className="border-green-100">
              <CardContent className="p-4 text-center">
                <Zap className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                <div className="text-2xl font-bold text-charcoal">{soilTechData.metrics.currentEC}</div>
                <div className="text-xs text-gray-500">EC (dS/m)</div>
                <div className="text-xs text-gray-400 mt-1">→ {soilTechData.metrics.ecTrend}</div>
              </CardContent>
            </Card>
            <Card className="border-green-100">
              <CardContent className="p-4 text-center">
                <Wind className="w-5 h-5 text-green-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-charcoal">{soilTechData.metrics.soilRespiration}</div>
                <div className="text-xs text-gray-500">Respiration (µg CO₂/g/hr)</div>
              </CardContent>
            </Card>
          </div>

          {/* SoilTech Redox chart */}
          <Card>
            <CardHeader>
              <h4 className="font-semibold text-charcoal">Redox Potential (ORP) Trend</h4>
              <p className="text-xs text-gray-500">Oxidation-reduction potential — higher values indicate better aerobic conditions</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={soilTechData.redox}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} label={{ value: 'mV', angle: -90, position: 'insideLeft', style: { fontSize: 11 } }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 2 }} name="Redox (mV)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* SoilTech Temp + EC side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <h4 className="font-semibold text-charcoal text-sm">Soil Temperature</h4>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={soilTechData.temperature}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#dc2626" strokeWidth={2} dot={{ r: 1.5 }} name="Temp (°C)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h4 className="font-semibold text-charcoal text-sm">Electrical Conductivity</h4>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={soilTechData.ec}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#eab308" strokeWidth={2} dot={{ r: 1.5 }} name="EC (dS/m)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ─── AGROLOGY Section ─── */}
      {(activeProvider === 'all' || activeProvider === 'agrology') && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${providerConfig.agrology.gradient} flex items-center justify-center text-white`}>
              <Satellite className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-charcoal">Agrology — AI Soil & Crop Intelligence</h3>
              <p className="text-xs text-gray-500">CO₂ flux, VWC, and predictive analytics • API integration active</p>
            </div>
          </div>

          {/* Agrology key metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card className="border-amber-100">
              <CardContent className="p-4 text-center">
                <CloudRain className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                <div className="text-2xl font-bold text-amber-600">{agrologyData.metrics.co2Current}</div>
                <div className="text-xs text-gray-500">CO₂ Flux (µmol/m²s)</div>
                <div className="text-xs text-amber-500 mt-1">↑ {agrologyData.metrics.co2Trend}</div>
              </CardContent>
            </Card>
            <Card className="border-amber-100">
              <CardContent className="p-4 text-center">
                <Droplets className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                <div className="text-2xl font-bold text-charcoal">{agrologyData.metrics.vwcCurrent}%</div>
                <div className="text-xs text-gray-500">Vol. Water Content</div>
                <div className="text-xs text-gray-400 mt-1">→ {agrologyData.metrics.vwcTrend}</div>
              </CardContent>
            </Card>
            <Card className="border-amber-100">
              <CardContent className="p-4 text-center">
                <Sun className="w-5 h-5 text-green-500 mx-auto mb-1" />
                <div className="text-2xl font-bold text-green-600">{agrologyData.metrics.growthPotential}</div>
                <div className="text-xs text-gray-500">Growth Index</div>
              </CardContent>
            </Card>
            <Card className="border-amber-100">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-5 h-5 text-green-500 mx-auto mb-1" />
                <div className="text-2xl font-bold text-charcoal">{agrologyData.metrics.carbonSequestration}</div>
                <div className="text-xs text-gray-500">C Seq. (t/ha/yr)</div>
              </CardContent>
            </Card>
          </div>

          {/* Agrology advanced insights */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { label: 'Soil Health', value: agrologyData.metrics.soilHealth, suffix: '/100', color: agrologyData.metrics.soilHealth >= 70 ? 'text-green-600' : 'text-orange-500' },
              { label: 'N Availability', value: agrologyData.metrics.nitrogenAvailability, suffix: '', color: 'text-charcoal' },
              { label: 'Microbial Act.', value: agrologyData.metrics.microbialActivity, suffix: '', color: 'text-green-600' },
              { label: 'Stress Index', value: agrologyData.metrics.stressIndex, suffix: '', color: agrologyData.metrics.stressIndex <= 0.3 ? 'text-green-600' : 'text-red-500' },
              { label: 'C Sequestration', value: `${agrologyData.metrics.carbonSequestration} t`, suffix: '/ha/yr', color: 'text-charcoal' },
            ].map(item => (
              <div key={item.label} className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-center">
                <div className={`text-lg font-bold ${item.color} capitalize`}>{item.value}{item.suffix}</div>
                <div className="text-xs text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Agrology charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <h4 className="font-semibold text-charcoal text-sm">CO₂ Soil Flux</h4>
                <p className="text-xs text-gray-500">Indicator of microbial activity and soil respiration</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={agrologyData.co2Flux}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#d97706" fill="#d97706" fillOpacity={0.15} strokeWidth={2} name="CO₂ Flux" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h4 className="font-semibold text-charcoal text-sm">Volumetric Water Content</h4>
                <p className="text-xs text-gray-500">Soil moisture tracked via capacitance sensors</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={agrologyData.vwc}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#2563eb" fill="#2563eb" fillOpacity={0.15} strokeWidth={2} name="VWC %" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ─── Footer ─── */}
      <div className="text-xs text-gray-400 text-center pt-2 border-t border-gray-100">
        Data sourced from AquaSpy (site IDs), SoilTech (API), and Agrology (API) • Last sync: {formatDate(new Date().toISOString())}
      </div>
    </div>
  );
}