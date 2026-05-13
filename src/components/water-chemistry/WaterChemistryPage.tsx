import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplets, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { PageHeader } from '../ui/PageHeader';
import { SearchInput } from '../ui/SearchInput';
import { Badge } from '../ui/Badge';
import {
  waterChemistryReports,
  getRanchById,
  getClientById,
} from '../../data/great-crops-data';
import { formatDate } from '../../lib/utils';

export function WaterChemistryPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = waterChemistryReports.filter(r => {
    const ranch = getRanchById(r.ranchId);
    const client = getClientById(ranch?.clientId || '');

    const matchesSearch = ranch?.name.toLowerCase().includes(search.toLowerCase()) ||
      client?.companyName.toLowerCase().includes(search.toLowerCase()) ||
      r.source.toLowerCase().includes(search.toLowerCase());

    return matchesSearch;
  });

  const stats = {
    totalReports: waterChemistryReports.length,
    avgEC: (waterChemistryReports.reduce((sum, r) => sum + r.ec, 0) / waterChemistryReports.length).toFixed(1),
    highSAR: waterChemistryReports.filter(r => r.sar > 3.0).length,
    avgPH: (waterChemistryReports.reduce((sum, r) => sum + r.ph, 0) / waterChemistryReports.length).toFixed(1),
  };

  const getWaterQuality = (ec: number, sar: number) => {
    if (ec <= 0.7 && sar <= 3.0) return { quality: 'excellent', color: 'text-green-600', bg: 'bg-green-50 border-green-200' };
    if (ec <= 1.0 && sar <= 4.0) return { quality: 'good', color: 'text-green-500', bg: 'bg-green-50 border-green-200' };
    if (ec <= 1.5 && sar <= 6.0) return { quality: 'moderate', color: 'text-orange-500', bg: 'bg-orange-50 border-orange-200' };
    return { quality: 'poor', color: 'text-red-500', bg: 'bg-red-50 border-red-200' };
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Irrigation & Water Chemistry"
        subtitle="Water quality analysis and irrigation source monitoring"
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Droplets className="w-8 h-8 text-cyan-500" />
              <div>
                <p className="text-2xl font-bold text-charcoal">{stats.totalReports}</p>
                <p className="text-sm text-gray-500">Water Reports</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-charcoal">{stats.avgEC}</p>
                <p className="text-sm text-gray-500">Avg EC (dS/m)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold text-orange-600">{stats.highSAR}</p>
                <p className="text-sm text-gray-500">High SAR</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600 font-bold text-sm">pH</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-charcoal">{stats.avgPH}</p>
                <p className="text-sm text-gray-500">Avg pH</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 max-w-md">
          <SearchInput value={search} onChange={setSearch} placeholder="Search water sources..." />
        </div>
      </div>

      {/* Under Construction Banner */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
            <Droplets className="w-8 h-8 text-orange-600" />
          </div>
          <h3 className="text-xl font-bold text-orange-800 mb-2">Water Chemistry Analysis System</h3>
          <p className="text-orange-700 mb-4">
            Comprehensive water quality monitoring and irrigation management system in development
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-white rounded border">
              <h4 className="font-semibold text-orange-800">Real-time Monitoring</h4>
              <p className="text-gray-600">Continuous EC, pH, and SAR tracking</p>
            </div>
            <div className="p-3 bg-white rounded border">
              <h4 className="font-semibold text-orange-800">Quality Alerts</h4>
              <p className="text-gray-600">Automated notifications for water quality issues</p>
            </div>
            <div className="p-3 bg-white rounded border">
              <h4 className="font-semibold text-orange-800">Irrigation Scheduling</h4>
              <p className="text-gray-600">Optimized watering based on water quality</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((report) => {
          const ranch = getRanchById(report.ranchId);
          const client = getClientById(ranch?.clientId || '');
          const quality = getWaterQuality(report.ec, report.sar);

          return (
            <Card key={report.id} hover onClick={() => navigate(`/app/water-chemistry/${report.id}`)}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-charcoal">{ranch?.name}</h3>
                    <p className="text-sm text-gray-500">{client?.companyName}</p>
                    <p className="text-xs text-gray-400">{report.source}</p>
                  </div>
                  <Badge
                    variant={quality.quality === 'excellent' || quality.quality === 'good' ? 'success' : quality.quality === 'moderate' ? 'warning' : 'danger'}
                    size="sm"
                  >
                    {quality.quality}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div className="text-sm">
                    <span className="text-gray-500">EC:</span>
                    <div className="font-semibold text-charcoal">{report.ec} dS/m</div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">SAR:</span>
                    <div className="font-semibold text-charcoal">{report.sar}</div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">pH:</span>
                    <div className="font-semibold text-charcoal">{report.ph}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                  <div>
                    <span className="text-gray-400">TDS:</span> <span className="font-medium">{report.tds}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Na:</span> <span className="font-medium">{report.sodium}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Cl:</span> <span className="font-medium">{report.chloride}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    <div className={`w-2 h-2 rounded-full ${report.ec <= 1.0 ? 'bg-green-500' : 'bg-orange-500'}`} />
                    <div className={`w-2 h-2 rounded-full ${report.sar <= 3.0 ? 'bg-green-500' : 'bg-orange-500'}`} />
                    <div className={`w-2 h-2 rounded-full ${report.boron <= 0.5 ? 'bg-green-500' : 'bg-orange-500'}`} />
                    <div className={`w-2 h-2 rounded-full ${report.chloride <= 100 ? 'bg-green-500' : 'bg-orange-500'}`} />
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDate(report.date)}
                  </div>
                </div>

                {(report.ec > 1.5 || report.sar > 4.0) && (
                  <div className="mt-3 p-2 bg-orange-50 rounded-lg flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-orange-700">Requires monitoring</span>
                  </div>
                )}

                {report.notes && (
                  <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-600 truncate">
                    {report.notes}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Droplets className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-400 mb-2">No water reports found</h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
}