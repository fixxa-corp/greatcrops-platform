import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Microscope,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Bug,
  Leaf,
  FileText,
  Search,
  BarChart3,
  PieChart,
  Shield
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { PageHeader } from '../ui/PageHeader';
import { SearchInput } from '../ui/SearchInput';
import { Badge } from '../ui/Badge';
import { DataTable } from '../ui/DataTable';
import {
  topPhyla,
  topBacterialSpecies,
  pathogenAlerts,
  diversityMetrics,
  sampleInfo,
  reportSummary
} from '../../data/kaffer-microbiology-processed';

// Colors for charts
const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#F97316', '#84CC16'];

export function SoilMicrobiologyPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedView, setSelectedView] = useState<'overview' | 'phyla' | 'species' | 'pathogens'>('overview');

  // Filter species based on search
  const filteredSpecies = topBacterialSpecies.filter(species =>
    species.species.toLowerCase().includes(search.toLowerCase()) ||
    species.phylum.toLowerCase().includes(search.toLowerCase())
  );

  // Prepare data for treatment comparison chart
  const treatmentData = sampleInfo.samples.map(sample => ({
    treatment: sample.name,
    ...topPhyla.slice(0, 5).reduce((acc, phylum) => ({
      ...acc,
      [phylum.name]: phylum.samples[sample.code as keyof typeof phylum.samples]
    }), {})
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Microscope className="w-8 h-8 text-green-600" />
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-charcoal">Soil Microbiology Analysis</h1>
            <Badge variant="success" size="sm">Live Data</Badge>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            <span>Biome Makers Report • {sampleInfo.client} • {sampleInfo.ranch} • Analysis Date: {sampleInfo.analysisDate}</span>
          </div>
        </div>
      </div>

      {/* Report Header */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">BM</span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-charcoal">Biome Makers Soil Analysis</h2>
                  <p className="text-sm text-gray-500">Metagenomic sequencing report</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sample Count:</span>
                  <span className="font-medium">{sampleInfo.sampleCount} treatment programs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Species Identified:</span>
                  <span className="font-medium">{diversityMetrics.totalSpecies}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shannon Index:</span>
                  <span className="font-medium">{diversityMetrics.shannonIndex}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Health Score:</span>
                  <span className="font-medium text-green-600">{reportSummary.healthScore}/100</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="font-medium text-charcoal mb-3">Treatment Programs</h3>
              <div className="grid grid-cols-2 gap-2">
                {sampleInfo.samples.map(sample => (
                  <div key={sample.code} className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-sm text-charcoal">{sample.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{sample.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Bug className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-charcoal">{diversityMetrics.totalSpecies}</p>
                <p className="text-sm text-gray-500">Total Species</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-charcoal">{diversityMetrics.shannonIndex}</p>
                <p className="text-sm text-gray-500">Shannon Index</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <PieChart className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold text-charcoal">{topPhyla.length}</p>
                <p className="text-sm text-gray-500">Phyla</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold text-charcoal">{pathogenAlerts.length}</p>
                <p className="text-sm text-gray-500">Pathogens</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">{reportSummary.healthScore}</p>
                <p className="text-sm text-gray-500">Health Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2 flex-wrap">
            {[
              { key: 'overview', label: 'Overview', icon: BarChart3 },
              { key: 'phyla', label: 'Phyla Analysis', icon: PieChart },
              { key: 'species', label: 'Species Detail', icon: Search },
              { key: 'pathogens', label: 'Pathogen Watch', icon: AlertTriangle }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setSelectedView(key as any)}
                className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
                  selectedView === key
                    ? 'bg-green-deep text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content based on selected view */}
      {selectedView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Phyla Distribution */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-charcoal">Top 15 Phyla by Abundance</h2>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topPhyla.slice(0, 15)} layout="horizontal" margin={{ left: 120 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} fontSize={11} />
                    <Tooltip />
                    <Bar dataKey="totalAbundance" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Treatment Comparison */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-charcoal">Treatment Program Comparison</h2>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={treatmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="treatment" fontSize={11} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {topPhyla.slice(0, 5).map((phylum, index) => (
                      <Bar
                        key={phylum.name}
                        dataKey={phylum.name}
                        stackId="a"
                        fill={COLORS[index]}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedView === 'phyla' && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-charcoal">Phyla Breakdown & Sample Comparison</h2>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3">Phylum</th>
                    <th className="text-center py-2 px-3">Total %</th>
                    <th className="text-center py-2 px-3">GSP T0</th>
                    <th className="text-center py-2 px-3">So-Sp T0</th>
                    <th className="text-center py-2 px-3">Sp T0</th>
                    <th className="text-center py-2 px-3">So T0</th>
                  </tr>
                </thead>
                <tbody>
                  {topPhyla.map((phylum, index) => (
                    <tr key={phylum.name} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3 font-medium">{phylum.name}</td>
                      <td className="text-center py-2 px-3 font-semibold">{phylum.totalAbundance.toFixed(1)}%</td>
                      <td className="text-center py-2 px-3">{phylum.samples.GSP_T0.toFixed(1)}%</td>
                      <td className="text-center py-2 px-3">{phylum.samples.SO_SP_T0.toFixed(1)}%</td>
                      <td className="text-center py-2 px-3">{phylum.samples.SP_T0.toFixed(1)}%</td>
                      <td className="text-center py-2 px-3">{phylum.samples.SO_T0.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedView === 'species' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-charcoal">Top Bacterial Species</h2>
              <div className="w-64">
                <SearchInput
                  value={search}
                  onChange={setSearch}
                  placeholder="Search species..."
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3">Species</th>
                    <th className="text-left py-2 px-3">Phylum</th>
                    <th className="text-center py-2 px-3">Avg %</th>
                    <th className="text-center py-2 px-3">GSP T0</th>
                    <th className="text-center py-2 px-3">So-Sp T0</th>
                    <th className="text-center py-2 px-3">Sp T0</th>
                    <th className="text-center py-2 px-3">So T0</th>
                    <th className="text-center py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSpecies.map((species) => (
                    <tr key={species.species} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3 font-medium">{species.species}</td>
                      <td className="py-2 px-3 text-gray-600">{species.phylum}</td>
                      <td className="text-center py-2 px-3 font-semibold">{species.avgAbundance.toFixed(2)}%</td>
                      <td className="text-center py-2 px-3">{species.samples.GSP_T0.toFixed(2)}%</td>
                      <td className="text-center py-2 px-3">{species.samples.SO_SP_T0.toFixed(2)}%</td>
                      <td className="text-center py-2 px-3">{species.samples.SP_T0.toFixed(2)}%</td>
                      <td className="text-center py-2 px-3">{species.samples.SO_T0.toFixed(2)}%</td>
                      <td className="text-center py-2 px-3">
                        {species.isPathogen ? (
                          <Badge variant="danger" size="sm">Pathogen</Badge>
                        ) : (
                          <Badge variant="success" size="sm">Beneficial</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedView === 'pathogens' && (
        <div className="space-y-6">
          {/* Pathogen Alerts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pathogenAlerts.map((pathogen) => (
              <Card key={pathogen.species}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-charcoal">{pathogen.species}</h3>
                      <p className="text-sm text-gray-600 capitalize">{pathogen.type} pathogen</p>
                    </div>
                    <Badge
                      variant={
                        pathogen.severity === 'low' ? 'warning' :
                        pathogen.severity === 'moderate' ? 'warning' : 'danger'
                      }
                      size="sm"
                    >
                      {pathogen.severity}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Max Abundance:</span>
                      <span className="font-medium">{pathogen.maxAbundance.toFixed(2)}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Present in:</span>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {pathogen.presentInSamples.map(sample => (
                          <Badge key={sample} variant="neutral" size="sm">{sample}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-charcoal">Recommendations & Actions</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reportSummary.recommendedActions.map((action, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-green-800">{action}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Report Notes */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-charcoal">Analysis Notes</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {reportSummary.notes.map((note, index) => (
                  <div key={index} className="flex items-start gap-3 p-2">
                    <FileText className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{note}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}