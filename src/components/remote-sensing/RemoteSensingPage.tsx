import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wifi, Battery, Signal, AlertTriangle, CheckCircle, WifiOff, Plus, TrendingUp, Thermometer, Wind } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { PageHeader } from '../ui/PageHeader';
import { SearchInput } from '../ui/SearchInput';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import {
  remoteSensingProbes,
  getBlockById,
  getRanchById,
  getClientById,
} from '../../data/great-crops-data';
import { pallaRecentHourly, pallaDailySummaries } from '../../data/palla-soiltech-processed';
import { formatDate } from '../../lib/utils';

const providerInfo = {
  aquaspy: {
    name: 'AquaSpy',
    logo: '🔵',
    color: 'bg-blue-500',
    description: 'YES! Score soil moisture monitoring'
  },
  soiltech: {
    name: 'SoilTech',
    logo: '🟢',
    color: 'bg-green-500',
    description: 'Redox/ORP soil analysis'
  },
  agrology: {
    name: 'Agrology',
    logo: '🟡',
    color: 'bg-orange-500',
    description: 'CO2 and VWC monitoring'
  }
};

export function RemoteSensingPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterProvider, setFilterProvider] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = remoteSensingProbes.filter(p => {
    const block = getBlockById(p.blockId);
    const ranch = getRanchById(block?.ranchId || '');
    const client = getClientById(block?.clientId || '');

    const matchesSearch = p.probeId.toLowerCase().includes(search.toLowerCase()) ||
      block?.name.toLowerCase().includes(search.toLowerCase()) ||
      ranch?.name.toLowerCase().includes(search.toLowerCase()) ||
      client?.companyName.toLowerCase().includes(search.toLowerCase());

    const matchesProvider = filterProvider === 'all' || p.provider === filterProvider;
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;

    return matchesSearch && matchesProvider && matchesStatus;
  });

  const stats = {
    total: remoteSensingProbes.length,
    online: remoteSensingProbes.filter(p => p.status === 'online').length,
    offline: remoteSensingProbes.filter(p => p.status === 'offline').length,
    lowBattery: remoteSensingProbes.filter(p => p.batteryPercent < 20).length,
  };

  const providerCounts = {
    aquaspy: remoteSensingProbes.filter(p => p.provider === 'aquaspy').length,
    soiltech: remoteSensingProbes.filter(p => p.provider === 'soiltech').length,
    agrology: remoteSensingProbes.filter(p => p.provider === 'agrology').length,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Remote Sensing"
        subtitle="Real-time soil monitoring across AquaSpy, SoilTech, and Agrology platforms"
        action={<Button><Plus className="w-4 h-4" /> Add Probe</Button>}
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Wifi className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-charcoal">{stats.total}</p>
                <p className="text-sm text-gray-500">Total Probes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.online}</p>
                <p className="text-sm text-gray-500">Online</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <WifiOff className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-red-600">{stats.offline}</p>
                <p className="text-sm text-gray-500">Offline</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Battery className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold text-orange-600">{stats.lowBattery}</p>
                <p className="text-sm text-gray-500">Low Battery</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Provider Overview */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-charcoal">Provider Platforms</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(providerInfo).map(([key, info]) => (
              <div key={key} className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-8 h-8 rounded-full ${info.color} flex items-center justify-center text-white font-bold`}>
                    {info.logo}
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal">{info.name}</h3>
                    <p className="text-xs text-gray-500">{info.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-charcoal">
                    {providerCounts[key as keyof typeof providerCounts]}
                  </span>
                  <span className="text-sm text-gray-500">probes</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-3 mb-6">
        <div className="flex-1 max-w-md">
          <SearchInput value={search} onChange={setSearch} placeholder="Search probes..." />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'aquaspy', 'soiltech', 'agrology'].map(provider => (
            <button
              key={provider}
              onClick={() => setFilterProvider(provider)}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                filterProvider === provider
                  ? 'bg-green-deep text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {provider === 'all' ? 'All Providers' : providerInfo[provider as keyof typeof providerInfo]?.name}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {['all', 'online', 'offline'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                filterStatus === status
                  ? 'bg-green-deep text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Probes List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((probe) => {
          const block = getBlockById(probe.blockId);
          const ranch = getRanchById(block?.ranchId || '');
          const client = getClientById(block?.clientId || '');
          const provider = providerInfo[probe.provider];

          return (
            <Card key={probe.id} hover onClick={() => navigate(`/app/remote-sensing/${probe.id}`)}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-charcoal text-lg">{probe.probeId}</span>
                      <div className={`w-4 h-4 rounded-full ${provider.color} flex items-center justify-center`}>
                        <span className="text-xs text-white">{provider.logo}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{block?.name}</p>
                    <p className="text-xs text-gray-500">{ranch?.name} • {client?.companyName}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <StatusBadge status={probe.status} />
                    <Badge variant="neutral" size="sm">{provider.name}</Badge>
                  </div>
                </div>

                {probe.status === 'online' ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Battery className={`w-4 h-4 ${
                          probe.batteryPercent > 50 ? 'text-green-500' :
                          probe.batteryPercent > 20 ? 'text-orange-500' : 'text-red-500'
                        }`} />
                        <span className="font-medium">{probe.batteryPercent}%</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Signal className={`w-4 h-4 ${
                          probe.signalStrength > 70 ? 'text-green-500' :
                          probe.signalStrength > 40 ? 'text-orange-500' : 'text-red-500'
                        }`} />
                        <span className="font-medium">{probe.signalStrength}%</span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500">
                      Last reading: {formatDate(probe.lastReading)}
                    </div>

                    {/* Provider-specific features */}
                    <div className="p-3 bg-gray-50 rounded-lg">
                      {probe.provider === 'aquaspy' && (
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">Under Construction</div>
                          <div className="text-sm text-gray-600">YES! Score API integration pending</div>
                        </div>
                      )}
                      {probe.provider === 'soiltech' && probe.probeId === 'ST-PALLA-001' && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm font-medium text-green-700">
                            <TrendingUp className="w-4 h-4" />
                            <span>Live Data - Palla Farms</span>
                          </div>

                          {/* Current readings from latest hourly data */}
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                              <Thermometer className="w-4 h-4 text-orange-500" />
                              <div>
                                <div className="font-medium">Soil: {pallaRecentHourly[pallaRecentHourly.length - 1]?.soilTemp}°F</div>
                                <div className="text-xs text-gray-500">Ambient: {pallaRecentHourly[pallaRecentHourly.length - 1]?.ambientTemp}°F</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Wind className="w-4 h-4 text-blue-500" />
                              <div>
                                <div className="font-medium">CO₂: {pallaRecentHourly[pallaRecentHourly.length - 1]?.co2} ppm</div>
                                <div className="text-xs text-gray-500">Humidity: {pallaRecentHourly[pallaRecentHourly.length - 1]?.humidity}%</div>
                              </div>
                            </div>
                          </div>

                          <div className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                            ⚠️ Moisture sensors require calibration
                          </div>

                          <div className="text-xs text-center text-gray-500">
                            Click to view detailed charts and analysis
                          </div>
                        </div>
                      )}
                      {probe.provider === 'soiltech' && probe.probeId !== 'ST-PALLA-001' && (
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">Under Construction</div>
                          <div className="text-sm text-gray-600">API integration pending for this probe</div>
                        </div>
                      )}
                      {probe.provider === 'agrology' && (
                        <div className="text-center">
                          <div className="text-lg font-bold text-orange-600">Under Construction</div>
                          <div className="text-sm text-gray-600">CO2/VWC API integration pending</div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center gap-2 text-red-700">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="font-medium">Probe Offline</span>
                    </div>
                    <p className="text-sm text-red-600 mt-1">
                      Last seen: {formatDate(probe.lastReading)}
                    </p>
                    {probe.batteryPercent === 0 && (
                      <p className="text-xs text-red-600 mt-1">Battery depleted - replacement required</p>
                    )}
                    {probe.signalStrength < 10 && probe.batteryPercent > 20 && (
                      <p className="text-xs text-red-600 mt-1">Signal lost - check gateway connection</p>
                    )}
                  </div>
                )}

                <div className="mt-3 text-xs text-gray-500">
                  Installed: {formatDate(probe.installDate)}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Wifi className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-400 mb-2">No probes found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}