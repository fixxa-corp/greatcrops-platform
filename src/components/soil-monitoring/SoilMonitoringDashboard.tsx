import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import {
  Wifi, WifiOff, MapPin, Thermometer, Droplets, Zap, 
  RefreshCw, AlertTriangle, TrendingUp, Calendar,
  Filter, Search, Download
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { SearchInput } from '../ui/SearchInput';
import { PageHeader } from '../ui/PageHeader';
import { useAllSoilSites } from '../../lib/useSoilData';
import { blocks, getClientById, getRanchById } from '../../data/great-crops-data';
import { formatDate } from '../../lib/utils';

export function SoilMonitoringDashboard() {
  const navigate = useNavigate();
  const { sites, loading, error, soilTechSites, agrologySites } = useAllSoilSites();
  const [search, setSearch] = useState('');
  const [filterProvider, setFilterProvider] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = sites.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(search.toLowerCase()) ||
      site.id.includes(search.toLowerCase()) ||
      site.blockId.toLowerCase().includes(search.toLowerCase());
    
    const matchesProvider = filterProvider === 'all' || site.provider === filterProvider;
    const matchesStatus = filterStatus === 'all' || site.status === filterStatus;
    
    return matchesSearch && matchesProvider && matchesStatus;
  });

  // Statistics
  const stats = {
    totalSites: sites.length,
    activeSites: sites.filter(s => s.status === 'active').length,
    soilTechCount: soilTechSites.length,
    agrologyCount: agrologySites.length,
    offlineSites: sites.filter(s => s.status === 'offline').length,
  };

  // Provider distribution for pie chart
  const providerData = [
    { name: 'SoilTech', value: stats.soilTechCount, color: '#2563eb' },
    { name: 'Agrology', value: stats.agrologyCount, color: '#16a34a' },
  ].filter(item => item.value > 0);

  // Status distribution
  const statusData = [
    { name: 'Active', value: stats.activeSites, color: '#16a34a' },
    { name: 'Offline', value: stats.offlineSites, color: '#dc2626' },
    { name: 'Inactive', value: sites.filter(s => s.status === 'inactive').length, color: '#f59e0b' },
  ].filter(item => item.value > 0);

  if (loading) {
    return (
      <div>
        <PageHeader
          title="Soil Monitoring Dashboard"
          subtitle="Loading sensor network data..."
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          {[1, 2, 3, 4].map(i => (
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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Soil Monitoring Dashboard"
        subtitle="Real-time soil sensor data across all Great Crops blocks"
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh All
            </Button>
          </div>
        }
      />

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-800">API Connection Issue</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Wifi className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase">Total Sensors</div>
                <div className="text-2xl font-bold text-charcoal">{stats.totalSites}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase">Active</div>
                <div className="text-2xl font-bold text-charcoal">{stats.activeSites}</div>
                <div className="text-xs text-green-600">
                  {stats.totalSites > 0 ? Math.round((stats.activeSites / stats.totalSites) * 100) : 0}% uptime
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase">SoilTech</div>
                <div className="text-2xl font-bold text-charcoal">{stats.soilTechCount}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase">Agrology</div>
                <div className="text-2xl font-bold text-charcoal">{stats.agrologyCount}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Provider and Status Charts */}
      {sites.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-charcoal">Provider Distribution</h3>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={providerData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {providerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-semibold text-charcoal">Sensor Status</h3>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="flex-1 max-w-md">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search sensors..."
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'soiltech', 'agrology'].map(provider => (
            <button
              key={provider}
              onClick={() => setFilterProvider(provider)}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                filterProvider === provider
                  ? 'bg-green-deep text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {provider === 'all' ? 'All Providers' : provider === 'soiltech' ? 'SoilTech' : 'Agrology'}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'active', 'offline', 'inactive'].map(status => (
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

      {/* Sensor List */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-charcoal">
            Soil Sensors ({filtered.length})
          </h3>
        </CardHeader>
        <CardContent>
          {filtered.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 pr-4 font-medium text-gray-500">Sensor</th>
                    <th className="text-left py-3 pr-4 font-medium text-gray-500">Block</th>
                    <th className="text-left py-3 pr-4 font-medium text-gray-500">Provider</th>
                    <th className="text-left py-3 pr-4 font-medium text-gray-500">Status</th>
                    <th className="text-left py-3 pr-4 font-medium text-gray-500">Location</th>
                    <th className="text-left py-3 pr-4 font-medium text-gray-500">Last Reading</th>
                    <th className="text-left py-3 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((site) => {
                    const block = blocks.find(b => b.id === site.blockId);
                    const ranch = block ? getRanchById(block.ranchId) : null;
                    const client = block ? getClientById(block.clientId) : null;

                    return (
                      <tr key={site.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${
                              site.status === 'active' ? 'bg-green-500' : 
                              site.status === 'offline' ? 'bg-red-500' : 'bg-gray-400'
                            }`} />
                            <div>
                              <span className="font-medium text-charcoal">{site.name}</span>
                              <div className="text-xs text-gray-500">ID: {site.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 pr-4">
                          {block ? (
                            <div>
                              <span className="font-medium text-charcoal">{block.name}</span>
                              <div className="text-xs text-gray-500">{ranch?.name}</div>
                              <div className="text-xs text-gray-400">{client?.companyName}</div>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-xs">Block not found</span>
                          )}
                        </td>
                        <td className="py-3 pr-4">
                          <Badge variant={site.provider === 'soiltech' ? 'info' : 'success'} size="sm">
                            {site.provider === 'soiltech' ? 'SoilTech' : 'Agrology'}
                          </Badge>
                        </td>
                        <td className="py-3 pr-4">
                          <Badge 
                            variant={
                              site.status === 'active' ? 'success' : 
                              site.status === 'offline' ? 'danger' : 'neutral'
                            } 
                            size="sm"
                          >
                            {site.status}
                          </Badge>
                        </td>
                        <td className="py-3 pr-4 text-xs text-gray-500 font-mono">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {site.latitude.toFixed(4)}, {site.longitude.toFixed(4)}
                          </div>
                        </td>
                        <td className="py-3 pr-4 text-xs text-gray-500">
                          {site.lastReading ? (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(site.lastReading)}
                            </div>
                          ) : (
                            <span className="text-gray-400">No data</span>
                          )}
                        </td>
                        <td className="py-3">
                          <div className="flex gap-1">
                            {block && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => navigate(`/app/blocks/${block.id}?tab=remote-sensing`)}
                              >
                                View Block
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              {sites.length === 0 ? (
                <div>
                  <WifiOff className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <h3 className="text-lg font-semibold mb-1">No Sensors Found</h3>
                  <p className="text-sm">No soil monitoring sensors are currently connected.</p>
                </div>
              ) : (
                <div>
                  <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
                  <p className="text-sm">No sensors match your current filters.</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}