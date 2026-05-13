import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Beaker, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { PageHeader } from '../ui/PageHeader';
import { SearchInput } from '../ui/SearchInput';
import { Badge } from '../ui/Badge';
import {
  soilChemistryReports,
  getBlockById,
  getRanchById,
  getClientById,
} from '../../data/great-crops-data';
import { formatDate } from '../../lib/utils';

export function SoilChemistryPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterLab, setFilterLab] = useState<string>('all');

  const filtered = soilChemistryReports.filter(r => {
    const block = getBlockById(r.blockId);
    const ranch = getRanchById(block?.ranchId || '');
    const client = getClientById(block?.clientId || '');

    const matchesSearch = block?.name.toLowerCase().includes(search.toLowerCase()) ||
      ranch?.name.toLowerCase().includes(search.toLowerCase()) ||
      client?.companyName.toLowerCase().includes(search.toLowerCase()) ||
      r.labName.toLowerCase().includes(search.toLowerCase());

    const matchesLab = filterLab === 'all' || r.labName === filterLab;

    return matchesSearch && matchesLab;
  });

  const labs = Array.from(new Set(soilChemistryReports.map(r => r.labName)));

  const stats = {
    totalReports: soilChemistryReports.length,
    avgPH: (soilChemistryReports.reduce((sum, r) => sum + r.ph, 0) / soilChemistryReports.length).toFixed(1),
    avgOrganicMatter: (soilChemistryReports.reduce((sum, r) => sum + r.organicMatter, 0) / soilChemistryReports.length).toFixed(1),
    highCEC: soilChemistryReports.filter(r => r.cec > 15).length,
  };

  const getPHStatus = (ph: number) => {
    if (ph >= 6.0 && ph <= 7.0) return { status: 'optimal', color: 'text-green-600' };
    if (ph >= 5.5 && ph <= 7.5) return { status: 'good', color: 'text-green-500' };
    if (ph >= 5.0 && ph <= 8.0) return { status: 'acceptable', color: 'text-orange-500' };
    return { status: 'poor', color: 'text-red-500' };
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Soil Chemistry"
        subtitle="Laboratory analysis of soil nutrients and chemical properties"
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Beaker className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold text-charcoal">{stats.totalReports}</p>
                <p className="text-sm text-gray-500">Lab Reports</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">pH</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-charcoal">{stats.avgPH}</p>
                <p className="text-sm text-gray-500">Avg pH</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-charcoal">{stats.avgOrganicMatter}%</p>
                <p className="text-sm text-gray-500">Avg O.M.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold text-charcoal">{stats.highCEC}</p>
                <p className="text-sm text-gray-500">High CEC</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 max-w-md">
          <SearchInput value={search} onChange={setSearch} placeholder="Search reports..." />
        </div>
        <div className="flex gap-2">
          {['all', ...labs].map(lab => (
            <button
              key={lab}
              onClick={() => setFilterLab(lab)}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                filterLab === lab
                  ? 'bg-green-deep text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {lab === 'all' ? 'All Labs' : lab}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((report) => {
          const block = getBlockById(report.blockId);
          const ranch = getRanchById(block?.ranchId || '');
          const client = getClientById(block?.clientId || '');
          const phStatus = getPHStatus(report.ph);

          return (
            <Card key={report.id} hover onClick={() => navigate(`/app/soil-chemistry/${report.id}`)}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-charcoal">{block?.name}</h3>
                    <p className="text-sm text-gray-500">{ranch?.name} • {client?.companyName}</p>
                    <p className="text-xs text-gray-400">{report.labName} • {formatDate(report.date)}</p>
                  </div>
                  <Badge variant={phStatus.status === 'optimal' ? 'success' : phStatus.status === 'good' ? 'success' : 'warning'} size="sm">
                    pH {report.ph}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div className="text-sm">
                    <span className="text-gray-500">O.M.:</span>
                    <div className="font-semibold text-charcoal">{report.organicMatter}%</div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">CEC:</span>
                    <div className="font-semibold text-charcoal">{report.cec}</div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">EC:</span>
                    <div className="font-semibold text-charcoal">{report.ec} dS/m</div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-3 text-xs">
                  <div>
                    <span className="text-gray-400">N:</span> <span className="font-medium">{report.nitrogen}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">P:</span> <span className="font-medium">{report.phosphorus}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">K:</span> <span className="font-medium">{report.potassium}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Ca:</span> <span className="font-medium">{report.calcium}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    <div className={`w-2 h-2 rounded-full ${report.ph >= 6.0 && report.ph <= 7.0 ? 'bg-green-500' : 'bg-orange-500'}`} />
                    <div className={`w-2 h-2 rounded-full ${report.organicMatter >= 3.0 ? 'bg-green-500' : 'bg-orange-500'}`} />
                    <div className={`w-2 h-2 rounded-full ${report.cec >= 15 ? 'bg-green-500' : 'bg-orange-500'}`} />
                    <div className={`w-2 h-2 rounded-full ${report.ec <= 1.0 ? 'bg-green-500' : 'bg-orange-500'}`} />
                  </div>
                  <span className="text-xs text-gray-500">View Full Report</span>
                </div>

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
          <Beaker className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-400 mb-2">No reports found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}