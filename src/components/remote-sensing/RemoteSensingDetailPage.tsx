import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Battery, Signal, Wifi, AlertTriangle, Thermometer, Wind, Droplets, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { PageHeader } from '../ui/PageHeader';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import {
  remoteSensingProbes,
  getBlockById,
  getRanchById,
  getClientById,
} from '../../data/great-crops-data';
import {
  pallaRecentHourly,
  pallaDailySummaries,
  pallaSensorInfo,
  pallaInsights
} from '../../data/palla-soiltech-processed';
import { formatDate } from '../../lib/utils';

const providerInfo = {
  aquaspy: { name: 'AquaSpy', logo: '🔵', color: 'bg-blue-500' },
  soiltech: { name: 'SoilTech', logo: '🟢', color: 'bg-green-500' },
  agrology: { name: 'Agrology', logo: '🟡', color: 'bg-orange-500' },
  provider3: { name: 'Provider 3', logo: '🟣', color: 'bg-purple-500' }
};

export function RemoteSensingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const probe = remoteSensingProbes.find(p => p.id === id);
  if (!probe) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-400 mb-2">Probe not found</h3>
        <Button onClick={() => navigate('/app/remote-sensing')}>Back to Remote Sensing</Button>
      </div>
    );
  }

  const block = getBlockById(probe.blockId);
  const ranch = getRanchById(block?.ranchId || '');
  const client = getClientById(block?.clientId || '');
  const provider = providerInfo[probe.provider];

  // Check if this is the Palla Farms SoilTech probe with real data
  const hasRealData = probe.probeId === 'ST-PALLA-001';

  // Format daily data for charts
  const dailyTempData = pallaDailySummaries.map(day => ({
    date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    soilTemp: day.soilTemp.avg,
    ambientTemp: day.ambientTemp.avg,
    soilTempMin: day.soilTemp.min,
    soilTempMax: day.soilTemp.max,
    ambientTempMin: day.ambientTemp.min,
    ambientTempMax: day.ambientTemp.max
  }));

  const dailyCO2Data = pallaDailySummaries.map(day => ({
    date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    co2Avg: day.co2.avg,
    co2Min: day.co2.min,
    co2Max: day.co2.max
  }));

  const dailyHumidityData = pallaDailySummaries.map(day => ({
    date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    humidity: day.humidity.avg,
    dewPoint: day.dewPoint.avg
  }));

  // Format recent hourly data for detail charts
  const recentHourlyData = pallaRecentHourly.slice(-24).map(reading => ({
    time: new Date(reading.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    soilTemp: reading.soilTemp,
    ambientTemp: reading.ambientTemp,
    co2: reading.co2,
    humidity: reading.humidity
  }));

  const currentReading = pallaRecentHourly[pallaRecentHourly.length - 1];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/app/remote-sensing')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-charcoal">{probe.probeId}</h1>
            <div className={`w-6 h-6 rounded-full ${provider.color} flex items-center justify-center`}>
              <span className="text-xs text-white">{provider.logo}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1">{block?.name} • {ranch?.name} • {client?.companyName}</p>
        </div>
      </div>

      {/* Probe Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Wifi className={`w-8 h-8 ${probe.status === 'online' ? 'text-green-500' : 'text-red-500'}`} />
              <div>
                <StatusBadge status={probe.status} />
                <p className="text-sm text-gray-500 mt-1">Status</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Battery className={`w-8 h-8 ${
                probe.batteryPercent > 50 ? 'text-green-500' :
                probe.batteryPercent > 20 ? 'text-orange-500' : 'text-red-500'
              }`} />
              <div>
                <p className="text-2xl font-bold text-charcoal">{probe.batteryPercent}%</p>
                <p className="text-sm text-gray-500">Battery</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Signal className={`w-8 h-8 ${
                probe.signalStrength > 70 ? 'text-green-500' :
                probe.signalStrength > 40 ? 'text-orange-500' : 'text-red-500'
              }`} />
              <div>
                <p className="text-2xl font-bold text-charcoal">{probe.signalStrength}%</p>
                <p className="text-sm text-gray-500">Signal</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full ${provider.color} flex items-center justify-center text-white font-bold`}>
                {provider.logo}
              </div>
              <div>
                <p className="font-semibold text-charcoal">{provider.name}</p>
                <p className="text-sm text-gray-500">Provider</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {hasRealData ? (
        <>
          {/* Current Readings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-charcoal">Current Readings</h2>
                <Badge variant="success" size="sm">Live Data</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <Thermometer className="w-6 h-6 text-orange-500" />
                  <div>
                    <p className="text-lg font-bold text-charcoal">{currentReading?.soilTemp}°F</p>
                    <p className="text-sm text-gray-600">Soil Temperature</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <Thermometer className="w-6 h-6 text-red-500" />
                  <div>
                    <p className="text-lg font-bold text-charcoal">{currentReading?.ambientTemp}°F</p>
                    <p className="text-sm text-gray-600">Air Temperature</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Wind className="w-6 h-6 text-blue-500" />
                  <div>
                    <p className="text-lg font-bold text-charcoal">{currentReading?.co2} ppm</p>
                    <p className="text-sm text-gray-600">CO₂ Levels</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-cyan-50 rounded-lg">
                  <Droplets className="w-6 h-6 text-cyan-500" />
                  <div>
                    <p className="text-lg font-bold text-charcoal">{currentReading?.humidity}%</p>
                    <p className="text-sm text-gray-600">Humidity</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center gap-2 text-orange-700">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-medium">Sensor Status Note</span>
                </div>
                <p className="text-sm text-orange-600 mt-1">
                  Moisture sensors are currently reading 0% and require calibration. All other sensors are functioning normally.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Last 24 Hours Detail */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-charcoal">Last 24 Hours - Hourly Readings</h2>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={recentHourlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="time" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="soilTemp" stroke="#f97316" name="Soil Temp (°F)" strokeWidth={2} />
                    <Line type="monotone" dataKey="ambientTemp" stroke="#ef4444" name="Air Temp (°F)" strokeWidth={2} />
                    <Line type="monotone" dataKey="co2" stroke="#3b82f6" yAxisId="right" name="CO₂ (ppm)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Temperature Trends */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-charcoal">Temperature Trends (April 2026)</h2>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dailyTempData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" stroke="#666" fontSize={12} />
                      <YAxis stroke="#666" fontSize={12} />
                      <Tooltip />
                      <Area type="monotone" dataKey="soilTemp" stackId="1" stroke="#f97316" fill="#f97316" fillOpacity={0.3} name="Soil Temp (°F)" />
                      <Area type="monotone" dataKey="ambientTemp" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} name="Air Temp (°F)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* CO2 Levels */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-charcoal">CO₂ Levels (April 2026)</h2>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dailyCO2Data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" stroke="#666" fontSize={12} />
                      <YAxis stroke="#666" fontSize={12} />
                      <Tooltip />
                      <Line type="monotone" dataKey="co2Avg" stroke="#3b82f6" strokeWidth={2} name="Average CO₂ (ppm)" />
                      <Line type="monotone" dataKey="co2Max" stroke="#94a3b8" strokeWidth={1} strokeDasharray="5 5" name="Max CO₂ (ppm)" />
                      <Line type="monotone" dataKey="co2Min" stroke="#94a3b8" strokeWidth={1} strokeDasharray="5 5" name="Min CO₂ (ppm)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Humidity & Environmental */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-charcoal">Humidity & Dew Point (April 2026)</h2>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyHumidityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="humidity" stroke="#06b6d4" strokeWidth={2} name="Humidity (%)" />
                    <Line type="monotone" dataKey="dewPoint" stroke="#8b5cf6" strokeWidth={2} name="Dew Point (°F)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Data Summary */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-charcoal">Data Summary</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-charcoal mb-2">Temperature Range</h3>
                  <p className="text-sm text-gray-600">Soil: {pallaInsights.tempRange.min}°F - {pallaInsights.tempRange.max}°F</p>
                  <p className="text-sm text-gray-600">29 days of readings</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-charcoal mb-2">CO₂ Levels</h3>
                  <p className="text-sm text-gray-600">Range: {pallaInsights.co2Range.min} - {pallaInsights.co2Range.max} ppm</p>
                  <p className="text-sm text-gray-600">Optimal for almond growth</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-charcoal mb-2">Data Coverage</h3>
                  <p className="text-sm text-gray-600">{pallaInsights.totalReadings} total readings</p>
                  <p className="text-sm text-gray-600">15-minute intervals</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        /* No Real Data Available */
        <Card>
          <CardContent className="p-12 text-center">
            <Zap className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Data Integration Pending</h3>
            <p className="text-gray-500 mb-4">
              Real-time data visualization is not yet available for this {provider.name} probe.
            </p>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Probe ID:</strong> {probe.probeId}</p>
              <p><strong>Installed:</strong> {formatDate(probe.installDate)}</p>
              <p><strong>Last Reading:</strong> {formatDate(probe.lastReading)}</p>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                API integration for this probe is scheduled for development.
                Contact your Great Crops representative for estimated timeline.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}