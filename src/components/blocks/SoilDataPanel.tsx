import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useSoilData } from '../../lib/useSoilData';
import { 
  Thermometer, Droplets, Zap, Beaker, RefreshCw, 
  Wifi, WifiOff, Calendar, TrendingUp, AlertTriangle 
} from 'lucide-react';
import { formatDate } from '../../lib/utils';

interface SoilDataPanelProps {
  blockId: string;
}

export function SoilDataPanel({ blockId }: SoilDataPanelProps) {
  const [dateRange] = useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Last 7 days
    end: new Date().toISOString().split('T')[0], // Today
  });

  const { sites, data, summary, loading, error, refreshData, getSiteData, getLatestReading, getProviderSites } = useSoilData(blockId, dateRange);

  const [activeMetric, setActiveMetric] = useState<'moisture' | 'temperature' | 'conductivity'>('moisture');

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-5 h-5 animate-spin text-green-600" />
          <span className="text-sm text-gray-600">Loading soil sensor data...</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-8 bg-gray-200 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-orange-800">Soil Data Service Issue</h3>
              <p className="text-sm text-orange-700 mt-1">{error}</p>
              <Button variant="outline" size="sm" className="mt-2" onClick={refreshData}>
                <RefreshCw className="w-4 h-4 mr-1" />
                Try Again
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (sites.length === 0) {
    return (
      <Card className="border-gray-200">
        <CardContent className="p-8 text-center">
          <WifiOff className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-700 mb-1">No Soil Sensors</h3>
          <p className="text-sm text-gray-500">
            No soil monitoring equipment has been deployed to this block yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Prepare chart data
  const chartData = sites.length > 0 ? (() => {
    const siteDataArrays = sites.map(site => getSiteData(site.id));
    const allTimestamps = new Set<string>();
    
    siteDataArrays.forEach(siteData => {
      siteData.forEach(point => allTimestamps.add(point.timestamp));
    });

    const sortedTimestamps = Array.from(allTimestamps).sort();
    
    return sortedTimestamps.map(timestamp => {
      const dataPoint: any = { timestamp: new Date(timestamp).toLocaleDateString() };
      
      sites.forEach((site, index) => {
        const siteData = getSiteData(site.id);
        const point = siteData.find(p => p.timestamp === timestamp);
        
        if (point) {
          dataPoint[`Site ${index + 1} (${site.provider})`] = point[activeMetric];
        }
      });
      
      return dataPoint;
    });
  })() : [];

  const metricConfig = {
    moisture: { label: 'Soil Moisture', unit: '%', icon: Droplets, color: '#2563eb' },
    temperature: { label: 'Soil Temperature', unit: '°C', icon: Thermometer, color: '#dc2626' },
    conductivity: { label: 'Electrical Conductivity', unit: 'dS/m', icon: Zap, color: '#16a34a' },
  };

  const soilTechSites = getProviderSites('soiltech');
  const agrologySites = getProviderSites('agrology');

  return (
    <div className="space-y-6">
      {/* Header with refresh button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-charcoal">Live Soil Monitoring</h2>
          <p className="text-sm text-gray-500">
            {sites.length} sensor{sites.length !== 1 ? 's' : ''} • Last 7 days
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={refreshData} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Provider breakdown */}
      {(soilTechSites.length > 0 || agrologySites.length > 0) && (
        <div className="flex items-center gap-4 text-sm text-gray-600">
          {soilTechSites.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>SoilTech ({soilTechSites.length})</span>
            </div>
          )}
          {agrologySites.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>Agrology ({agrologySites.length})</span>
            </div>
          )}
        </div>
      )}

      {/* Summary metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium text-gray-500 uppercase">Avg Moisture</div>
                <div className="text-xl font-bold text-charcoal">{summary.avgMoisture.toFixed(1)}%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <Thermometer className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium text-gray-500 uppercase">Avg Temperature</div>
                <div className="text-xl font-bold text-charcoal">{summary.avgTemperature.toFixed(1)}°C</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Zap className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium text-gray-500 uppercase">Avg Conductivity</div>
                <div className="text-xl font-bold text-charcoal">{summary.avgConductivity.toFixed(2)} dS/m</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Individual sensors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sites.map((site, index) => {
          const latestReading = getLatestReading(site.id);
          const isOnline = site.status === 'active';

          return (
            <Card key={site.id} className={`${isOnline ? 'border-green-200' : 'border-gray-200 opacity-75'}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-charcoal text-sm">
                      Site {index + 1} ({site.provider})
                    </h4>
                    <p className="text-xs text-gray-500">{site.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <Badge variant={isOnline ? 'success' : 'neutral'} size="sm">
                      {isOnline ? 'online' : 'offline'}
                    </Badge>
                  </div>
                </div>

                {latestReading ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Moisture:</span>
                      <span className="font-medium">{latestReading.moisture.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Temperature:</span>
                      <span className="font-medium">{latestReading.temperature.toFixed(1)}°C</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Conductivity:</span>
                      <span className="font-medium">{latestReading.conductivity.toFixed(2)} dS/m</span>
                    </div>
                    {latestReading.ph && (
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">pH:</span>
                        <span className="font-medium">{latestReading.ph.toFixed(1)}</span>
                      </div>
                    )}
                    <div className="text-xs text-gray-400 pt-1 border-t">
                      <Calendar className="w-3 h-3 inline mr-1" />
                      {formatDate(latestReading.timestamp)}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400">No recent data</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Time series chart */}
      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h3 className="font-semibold text-charcoal">Sensor Trends</h3>
              <div className="flex gap-2">
                {Object.entries(metricConfig).map(([key, config]) => {
                  const Icon = config.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveMetric(key as any)}
                      className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                        activeMetric === key
                          ? 'bg-green-deep text-white'
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {config.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData.slice(-20)}> {/* Last 20 data points */}
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="timestamp" 
                  tick={{ fontSize: 11 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  tick={{ fontSize: 11 }}
                  label={{ 
                    value: `${metricConfig[activeMetric].label} (${metricConfig[activeMetric].unit})`,
                    angle: -90,
                    position: 'insideLeft'
                  }}
                />
                <Tooltip 
                  labelFormatter={(label) => `Date: ${label}`}
                  formatter={(value, name) => [
                    `${(value as number)?.toFixed(2)} ${metricConfig[activeMetric].unit}`,
                    name
                  ]}
                />
                <Legend />
                {sites.map((site, index) => (
                  <Line
                    key={site.id}
                    type="monotone"
                    dataKey={`Site ${index + 1} (${site.provider})`}
                    stroke={site.provider === 'soiltech' ? '#2563eb' : '#16a34a'}
                    strokeWidth={2}
                    dot={{ r: 2 }}
                    connectNulls={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Data points summary */}
      <div className="text-xs text-gray-500 text-center">
        Showing {summary.dataPoints} total data points from {sites.length} sensor{sites.length !== 1 ? 's' : ''} over the last 7 days
      </div>
    </div>
  );
}