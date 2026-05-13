import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, TreePine, Calendar, Droplets, MapPin, Activity,
  Beaker, Microscope, Wifi, AlertTriangle, CheckCircle, Leaf,
  Bug, TrendingUp, BarChart3, Search, Shield, FileText,
} from 'lucide-react';
import { RemoteSensingTab } from './RemoteSensingTab';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell,
} from 'recharts';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { StatusBadge } from '../ui/StatusBadge';
import { SearchInput } from '../ui/SearchInput';
import {
  getBlockById,
  getRanchById,
  getClientById,
  getProbesByBlock,
  getMicrobiologyByBlock,
  getSoilChemistryByBlock,
} from '../../data/great-crops-data';
import {
  topPhyla,
  topBacterialSpecies,
  pathogenAlerts,
  diversityMetrics,
  sampleInfo,
  reportSummary,
} from '../../data/kaffer-microbiology-processed';
import { formatDate } from '../../lib/utils';

type Tab = 'overview' | 'microbiology' | 'remote-sensing' | 'soil-chemistry' | 'water-chemistry';

const CHART_COLORS = ['#1B5E20', '#2E7D32', '#388E3C', '#43A047', '#4CAF50', '#66BB6A', '#81C784', '#A5D6A7', '#C8E6C9', '#E8F5E9',
  '#5D4037', '#6D4C41', '#795548', '#8D6E63', '#A1887F', '#3E2723', '#4E342E', '#F9A825', '#FDD835', '#FFEE58'];

export function BlockDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [speciesSearch, setSpeciesSearch] = useState('');


  const block = getBlockById(id!);

  if (!block) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Block not found.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/app/blocks')}>Back to Blocks</Button>
      </div>
    );
  }

  const ranch = getRanchById(block.ranchId);
  const client = getClientById(block.clientId);
  const blockProbes = getProbesByBlock(block.id);
  const microbiologyReports = getMicrobiologyByBlock(block.id);
  const soilChemistryReports = getSoilChemistryByBlock(block.id);

  const age = new Date().getFullYear() - block.plantingYear;
  const latestMicro = microbiologyReports[microbiologyReports.length - 1];
  const latestChem = soilChemistryReports[soilChemistryReports.length - 1];

  // Check if this is the Kaffer Farms block (has real Biome Makers data)
  const hasRealMicroData = client?.companyName?.includes('Kaffer') || client?.companyName?.includes('Sympatica');

  const tabs: { key: Tab; label: string; icon: React.ReactNode; enabled: boolean }[] = [
    { key: 'overview', label: 'Overview', icon: <Activity className="w-4 h-4" />, enabled: true },
    { key: 'microbiology', label: 'Soil Microbiology', icon: <Microscope className="w-4 h-4" />, enabled: ranch?.services.soil_microbiology ?? false },
    { key: 'remote-sensing', label: 'Remote Sensing', icon: <Wifi className="w-4 h-4" />, enabled: ranch?.services.remote_sensing ?? false },
    { key: 'soil-chemistry', label: 'Soil Chemistry', icon: <Beaker className="w-4 h-4" />, enabled: ranch?.services.soil_chemistry ?? false },
    { key: 'water-chemistry', label: 'Water Chemistry', icon: <Droplets className="w-4 h-4" />, enabled: ranch?.services.irrigation_water ?? false },
  ];

  const getDiversityRating = (diversity: number) => {
    if (diversity >= 80) return { label: 'Excellent', color: 'text-green-600' };
    if (diversity >= 60) return { label: 'Good', color: 'text-green-500' };
    if (diversity >= 40) return { label: 'Moderate', color: 'text-orange-500' };
    return { label: 'Poor', color: 'text-red-500' };
  };

  const getBFRatioRating = (ratio: number) => {
    if (ratio >= 3 && ratio <= 5) return { label: 'Optimal', color: 'text-green-600' };
    if (ratio >= 2 && ratio <= 6) return { label: 'Good', color: 'text-green-500' };
    if (ratio >= 1.5 && ratio <= 8) return { label: 'Moderate', color: 'text-orange-500' };
    return { label: 'Poor', color: 'text-red-500' };
  };

  const filteredSpecies = topBacterialSpecies.filter(s =>
    s.species.toLowerCase().includes(speciesSearch.toLowerCase()) ||
    s.phylum.toLowerCase().includes(speciesSearch.toLowerCase())
  );

  // Phylum chart data for treatment comparison
  const treatmentComparisonData = topPhyla.slice(0, 8).map(p => ({
    name: p.name.length > 15 ? p.name.slice(0, 14) + '…' : p.name,
    'GSP T0': +(p.samples.GSP_T0 ?? 0).toFixed(2),
    'So-Sp T0': +(p.samples.SO_SP_T0 ?? 0).toFixed(2),
    'Sp T0': +(p.samples.SP_T0 ?? 0).toFixed(2),
    'So T0': +(p.samples.SO_T0 ?? 0).toFixed(2),
  }));

  // Pie chart data for phylum distribution
  const phylumPieData = topPhyla.slice(0, 10).map(p => ({
    name: p.name,
    value: +p.totalAbundance.toFixed(2),
  }));

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <button onClick={() => navigate('/app/clients')} className="text-gray-500 hover:text-charcoal transition-colors">
          <ArrowLeft className="w-4 h-4 inline mr-1" />Clients
        </button>
        <span className="text-gray-300">/</span>
        <button onClick={() => navigate(`/app/clients/${client?.id}`)} className="text-gray-500 hover:text-charcoal transition-colors">
          {client?.companyName}
        </button>
        <span className="text-gray-300">/</span>
        <button onClick={() => navigate(`/app/ranches/${ranch?.id}`)} className="text-gray-500 hover:text-charcoal transition-colors">
          {ranch?.name}
        </button>
        <span className="text-gray-300">/</span>
        <span className="text-charcoal">{block.name}</span>
      </div>

      {/* Block Header */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-light to-green-deep flex items-center justify-center text-white flex-shrink-0">
            <TreePine className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-2xl font-bold text-charcoal">{block.name}</h1>
                <p className="text-lg text-gray-500">{ranch?.name} • {client?.companyName}</p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={block.healthStatus} />
                <Badge variant="neutral">{block.acreage} acres</Badge>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TreePine className="w-4 h-4" />
                <span>{block.cropType} • {block.variety}</span>
              </div>
              {block.rootstock && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">Rootstock:</span> <span>{block.rootstock}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Planted {block.plantingYear} ({age} years)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Droplets className="w-4 h-4" />
                <span>{block.irrigationType}</span>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              <MapPin className="w-4 h-4 inline mr-1" />
              Soil Type: {block.soilType}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto" aria-label="Tabs">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => tab.enabled && setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.key
                    ? 'border-green-deep text-green-deep'
                    : tab.enabled
                      ? 'border-transparent text-gray-500 hover:text-charcoal hover:border-gray-300'
                      : 'border-transparent text-gray-300 cursor-not-allowed'
                }`}
                disabled={!tab.enabled}
              >
                {tab.icon}
                {tab.label}
                {!tab.enabled && <span className="text-xs text-gray-400">(off)</span>}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* ─── OVERVIEW TAB ─── */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Health Score */}
              <div className="flex items-center gap-6">
                <div className={`text-6xl font-bold ${
                  block.soilHealthScore >= 80 ? 'text-green-600' :
                  block.soilHealthScore >= 60 ? 'text-orange-500' : 'text-red-500'
                }`}>
                  {block.soilHealthScore}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Soil Health Score</h3>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full transition-all ${
                        block.soilHealthScore >= 80 ? 'bg-green-500' :
                        block.soilHealthScore >= 60 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${block.soilHealthScore}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {block.soilHealthScore >= 80 ? 'Excellent soil health' :
                     block.soilHealthScore >= 60 ? 'Moderate — improvements needed' :
                     'Poor — immediate attention required'}
                  </p>
                </div>
              </div>

              {/* Quick Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Microbiology Summary */}
                <Card className={ranch?.services.soil_microbiology ? 'cursor-pointer hover:shadow-md transition-shadow' : 'opacity-60'} onClick={() => ranch?.services.soil_microbiology && setActiveTab('microbiology')}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Microscope className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-semibold text-charcoal">Microbiology</span>
                    </div>
                    {latestMicro ? (
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between"><span className="text-gray-500">Biomass:</span><span className="font-medium">{latestMicro.microbialBiomass}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Diversity:</span><span className="font-medium">{latestMicro.microbialDiversity}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Mycorrhizae:</span><span className={`font-medium ${latestMicro.mycorrhizaePresent ? 'text-green-600' : 'text-red-500'}`}>{latestMicro.mycorrhizaePresent ? 'Present' : 'Absent'}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Phytophthora:</span><span className={`font-medium ${latestMicro.phytophthoraPressure === 'none' ? 'text-green-600' : 'text-red-500'}`}>{latestMicro.phytophthoraPressure}</span></div>
                        <div className="text-xs text-gray-400 pt-1">Report: {formatDate(latestMicro.date)}</div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">No data yet</p>
                    )}
                  </CardContent>
                </Card>

                {/* Remote Sensing Summary */}
                <Card className={ranch?.services.remote_sensing ? 'cursor-pointer hover:shadow-md transition-shadow' : 'opacity-60'} onClick={() => ranch?.services.remote_sensing && setActiveTab('remote-sensing')}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Wifi className="w-5 h-5 text-blue-500" />
                      <span className="text-sm font-semibold text-charcoal">Remote Sensing</span>
                    </div>
                    {blockProbes.length > 0 ? (
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between"><span className="text-gray-500">Probes:</span><span className="font-medium">{blockProbes.length}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Online:</span><span className="font-medium text-green-600">{blockProbes.filter(p => p.status === 'online').length}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Provider:</span><span className="font-medium">{blockProbes[0].provider}</span></div>
                        <div className="text-xs text-gray-400 pt-1">Last: {formatDate(blockProbes[0].lastReading)}</div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">No probes assigned</p>
                    )}
                  </CardContent>
                </Card>

                {/* Soil Chemistry Summary */}
                <Card className={ranch?.services.soil_chemistry ? 'cursor-pointer hover:shadow-md transition-shadow' : 'opacity-60'} onClick={() => ranch?.services.soil_chemistry && setActiveTab('soil-chemistry')}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Beaker className="w-5 h-5 text-orange-500" />
                      <span className="text-sm font-semibold text-charcoal">Soil Chemistry</span>
                    </div>
                    {latestChem ? (
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between"><span className="text-gray-500">pH:</span><span className="font-medium">{latestChem.ph}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">EC:</span><span className="font-medium">{latestChem.ec} dS/m</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">OM:</span><span className="font-medium">{latestChem.organicMatter}%</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">CEC:</span><span className="font-medium">{latestChem.cec}</span></div>
                        <div className="text-xs text-gray-400 pt-1">Lab: {latestChem.labName}</div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">No data yet</p>
                    )}
                  </CardContent>
                </Card>

                {/* Water Chemistry Summary */}
                <Card className={ranch?.services.irrigation_water ? 'cursor-pointer hover:shadow-md transition-shadow' : 'opacity-60'} onClick={() => ranch?.services.irrigation_water && setActiveTab('water-chemistry')}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Droplets className="w-5 h-5 text-cyan-500" />
                      <span className="text-sm font-semibold text-charcoal">Water Chemistry</span>
                    </div>
                    <p className="text-sm text-gray-400">{ranch?.services.irrigation_water ? 'Under Construction' : 'Not enabled'}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* ─── SOIL MICROBIOLOGY TAB (Full Report) ─── */}
          {activeTab === 'microbiology' && (
            <div className="space-y-6">
              {/* Report Header */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white flex-shrink-0">
                    <Microscope className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl font-bold text-charcoal">Soil Microbiology Report</h2>
                      {hasRealMicroData && <Badge variant="success" size="sm">Live Biome Makers Data</Badge>}
                    </div>
                    {hasRealMicroData ? (
                      <p className="text-sm text-gray-600 mt-1">
                        Biome Makers Metagenomic Analysis • {sampleInfo.client} • {sampleInfo.ranch} • {sampleInfo.analysisDate}
                      </p>
                    ) : latestMicro ? (
                      <p className="text-sm text-gray-600 mt-1">
                        Report Date: {formatDate(latestMicro.date)} • {block.name} • {ranch?.name}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* If this block has real Biome Makers data, show the full report */}
              {hasRealMicroData ? (
                <>
                  {/* Diversity Metrics Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Species</span>
                          <Bug className="w-4 h-4 text-gray-400" />
                        </div>
                        <span className="text-3xl font-bold text-charcoal">{diversityMetrics.totalSpecies.toLocaleString()}</span>
                        <p className="text-xs text-gray-400 mt-1">{diversityMetrics.totalBacteria} bacteria · {diversityMetrics.totalFungi} fungi</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Shannon Index</span>
                          <BarChart3 className="w-4 h-4 text-gray-400" />
                        </div>
                        <span className="text-3xl font-bold text-charcoal">{diversityMetrics.shannonIndex.toFixed(2)}</span>
                        <p className="text-xs text-gray-400 mt-1">
                          {diversityMetrics.shannonIndex > 4 ? 'Very high diversity' :
                           diversityMetrics.shannonIndex > 3 ? 'High diversity' :
                           diversityMetrics.shannonIndex > 2 ? 'Moderate diversity' : 'Low diversity'}
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Dominant Phylum</span>
                          <Leaf className="w-4 h-4 text-gray-400" />
                        </div>
                        <span className="text-lg font-bold text-charcoal">{topPhyla[0]?.name}</span>
                        <p className="text-xs text-gray-400 mt-1">{topPhyla[0]?.totalAbundance.toFixed(1)}% total abundance</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Sample Points</span>
                          <FileText className="w-4 h-4 text-gray-400" />
                        </div>
                        <span className="text-3xl font-bold text-charcoal">{sampleInfo.samples.length}</span>
                        <p className="text-xs text-gray-400 mt-1">Treatment programs compared</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Pathogen Watch */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-red-500" />
                        <h3 className="font-semibold text-charcoal">Pathogen Watch</h3>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {pathogenAlerts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {pathogenAlerts.map((alert, i) => (
                            <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${
                              alert.severity === 'low' ? 'bg-yellow-50 border-yellow-200' :
                              alert.severity === 'moderate' ? 'bg-orange-50 border-orange-200' :
                              'bg-red-50 border-red-200'
                            }`}>
                              <AlertTriangle className={`w-5 h-5 flex-shrink-0 ${
                                alert.severity === 'low' ? 'text-yellow-600' :
                                alert.severity === 'moderate' ? 'text-orange-600' : 'text-red-600'
                              }`} />
                              <div>
                                <span className="font-medium text-sm text-charcoal">{alert.species}</span>
                                <p className="text-xs text-gray-500">
                                  {alert.severity} — {alert.maxAbundance.toFixed(3)}% • {alert.type}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                          <div>
                            <span className="font-medium text-green-800">No pathogens detected</span>
                            <p className="text-sm text-green-600">Soil pathogen screening clear</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Treatment Comparison Chart */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-green-600" />
                        <h3 className="font-semibold text-charcoal">Treatment Program Comparison — Top Phyla</h3>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Relative abundance (%) across 4 treatment sample points</p>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={treatmentComparisonData} layout="vertical" margin={{ left: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis type="number" tick={{ fontSize: 11 }} />
                          <YAxis dataKey="name" type="category" width={130} tick={{ fontSize: 11 }} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="GSP T0" fill="#1B5E20" />
                          <Bar dataKey="So-Sp T0" fill="#F9A825" />
                          <Bar dataKey="Sp T0" fill="#5D4037" />
                          <Bar dataKey="So T0" fill="#1565C0" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Phylum Distribution Pie */}
                  <Card>
                    <CardHeader>
                      <h3 className="font-semibold text-charcoal">Phylum Distribution</h3>
                      <p className="text-sm text-gray-500">Top 10 phyla by total abundance</p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ResponsiveContainer width="100%" height={350}>
                          <RechartsPieChart>
                            <Pie data={phylumPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={130} label={({ name, value }) => `${name}: ${value}%`} labelLine={{ strokeWidth: 1 }}>
                              {phylumPieData.map((_, i) => (
                                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                        <div className="space-y-2">
                          {topPhyla.slice(0, 10).map((p, i) => (
                            <div key={p.name} className="flex items-center gap-3">
                              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
                              <span className="text-sm text-charcoal flex-1 truncate">{p.name}</span>
                              <span className="text-sm font-medium text-gray-600">{p.totalAbundance.toFixed(2)}%</span>
                              <span className="text-xs text-gray-400"></span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Species Table */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <h3 className="font-semibold text-charcoal">Species Detail</h3>
                          <p className="text-sm text-gray-500">Top species by abundance</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="neutral" size="sm">Bacteria</Badge>
                          <SearchInput value={speciesSearch} onChange={setSpeciesSearch} placeholder="Search species..." />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-2 pr-4 font-medium text-gray-500">Species</th>
                              <th className="text-left py-2 pr-4 font-medium text-gray-500">Phylum</th>
                              <th className="text-right py-2 pr-4 font-medium text-gray-500">GSP T0</th>
                              <th className="text-right py-2 pr-4 font-medium text-gray-500">So-Sp T0</th>
                              <th className="text-right py-2 pr-4 font-medium text-gray-500">Sp T0</th>
                              <th className="text-right py-2 font-medium text-gray-500">So T0</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredSpecies.slice(0, 25).map((sp, i) => (
                              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-2 pr-4 font-medium text-charcoal italic">{sp.species}</td>
                                <td className="py-2 pr-4 text-gray-500">{sp.phylum}</td>
                                <td className="py-2 pr-4 text-right font-mono text-gray-700">{sp.samples.GSP_T0?.toFixed(3) ?? '—'}</td>
                                <td className="py-2 pr-4 text-right font-mono text-gray-700">{sp.samples.SO_SP_T0?.toFixed(3) ?? '—'}</td>
                                <td className="py-2 pr-4 text-right font-mono text-gray-700">{sp.samples.SP_T0?.toFixed(3) ?? '—'}</td>
                                <td className="py-2 text-right font-mono text-gray-700">{sp.samples.SO_T0?.toFixed(3) ?? '—'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {filteredSpecies.length > 25 && (
                          <p className="text-sm text-gray-400 mt-3 text-center">Showing 25 of {filteredSpecies.length} species</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : latestMicro ? (
                /* Standard microbiology report for blocks with mock data */
                <>
                  {/* Disease Pressure Alert */}
                  {latestMicro.phytophthoraDetected && (
                    <Card className="border-red-200 bg-red-50">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-semibold text-red-800">Phytophthora Detected</h3>
                            <p className="text-red-700 mt-1">
                              Active pathogen presence with <strong>{latestMicro.phytophthoraPressure}</strong> pressure.
                              Immediate intervention recommended.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <span className="text-xs font-medium text-gray-500 uppercase">Microbial Diversity</span>
                        <div className="flex items-end gap-2 mt-1">
                          <span className="text-2xl font-bold text-charcoal">{latestMicro.microbialDiversity}</span>
                          <span className={`text-sm font-medium ${getDiversityRating(latestMicro.microbialDiversity).color}`}>
                            {getDiversityRating(latestMicro.microbialDiversity).label}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <span className="text-xs font-medium text-gray-500 uppercase">Bacteria:Fungi</span>
                        <div className="flex items-end gap-2 mt-1">
                          <span className="text-2xl font-bold text-charcoal">{latestMicro.bacteriaFungalRatio}</span>
                          <span className={`text-sm font-medium ${getBFRatioRating(latestMicro.bacteriaFungalRatio).color}`}>
                            {getBFRatioRating(latestMicro.bacteriaFungalRatio).label}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <span className="text-xs font-medium text-gray-500 uppercase">Microbial Biomass</span>
                        <div className="flex items-end gap-2 mt-1">
                          <span className="text-2xl font-bold text-charcoal">{latestMicro.microbialBiomass}</span>
                          <span className="text-sm text-gray-500">μg/g</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <span className="text-xs font-medium text-gray-500 uppercase">Organic Carbon</span>
                        <div className="flex items-end gap-2 mt-1">
                          <span className="text-2xl font-bold text-charcoal">{latestMicro.organicCarbon}</span>
                          <span className="text-sm text-gray-500">%</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Beneficial Organisms */}
                  <Card>
                    <CardHeader><h3 className="font-semibold text-charcoal">Beneficial Organisms</h3></CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-4 p-4 border rounded-lg">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${latestMicro.mycorrhizaePresent ? 'bg-green-100' : 'bg-red-100'}`}>
                            <Leaf className={`w-6 h-6 ${latestMicro.mycorrhizaePresent ? 'text-green-600' : 'text-red-500'}`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-charcoal">Mycorrhizae</h4>
                            <p className={`text-sm ${latestMicro.mycorrhizaePresent ? 'text-green-600' : 'text-red-500'}`}>
                              {latestMicro.mycorrhizaePresent ? 'Present — enhancing nutrient uptake' : 'Not Detected — consider inoculation'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 border rounded-lg">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${latestMicro.trichodermaPresent ? 'bg-green-100' : 'bg-red-100'}`}>
                            <Bug className={`w-6 h-6 ${latestMicro.trichodermaPresent ? 'text-green-600' : 'text-red-500'}`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-charcoal">Trichoderma</h4>
                            <p className={`text-sm ${latestMicro.trichodermaPresent ? 'text-green-600' : 'text-red-500'}`}>
                              {latestMicro.trichodermaPresent ? 'Present — natural disease suppression' : 'Not Detected — consider biological inoculation'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Disease Pressure */}
                  <Card>
                    <CardHeader><h3 className="font-semibold text-charcoal">Disease Pressure Assessment</h3></CardHeader>
                    <CardContent>
                      <div className={`p-6 border-2 rounded-lg ${
                        latestMicro.phytophthoraPressure === 'none' ? 'text-green-600 bg-green-50 border-green-200' :
                        latestMicro.phytophthoraPressure === 'low' ? 'text-green-600 bg-green-50 border-green-200' :
                        latestMicro.phytophthoraPressure === 'moderate' ? 'text-orange-600 bg-orange-50 border-orange-200' :
                        'text-red-600 bg-red-50 border-red-200'
                      }`}>
                        <div className="flex items-start gap-4">
                          {latestMicro.phytophthoraDetected
                            ? <AlertTriangle className="w-8 h-8 flex-shrink-0" />
                            : <CheckCircle className="w-8 h-8 flex-shrink-0" />
                          }
                          <div>
                            <h4 className="text-xl font-bold mb-1">
                              Phytophthora Risk: {latestMicro.phytophthoraPressure.charAt(0).toUpperCase() + latestMicro.phytophthoraPressure.slice(1)}
                            </h4>
                            <p>
                              {latestMicro.phytophthoraDetected
                                ? 'Pathogen DNA/spores detected in soil sample'
                                : 'No pathogen presence detected'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <div className="text-center py-16 text-gray-500">
                  <Microscope className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <h3 className="text-lg font-semibold mb-1">Under Construction</h3>
                  <p className="text-sm">Sample collection in progress. Data will appear here once lab analysis is complete.</p>
                </div>
              )}
            </div>
          )}

          {/* ─── REMOTE SENSING TAB ─── */}
          {activeTab === 'remote-sensing' && (
            <RemoteSensingTab block={block} ranch={ranch} probes={blockProbes} />
          )}

          {/* ─── SOIL CHEMISTRY TAB ─── */}
          {activeTab === 'soil-chemistry' && (
            <div className="space-y-6">
              {latestChem ? (
                <>
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <p className="text-sm text-orange-800">
                      <strong>Latest Analysis:</strong> {formatDate(latestChem.date)} — {latestChem.labName}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'pH', value: latestChem.ph, ideal: '6.0–7.0' },
                      { label: 'EC', value: `${latestChem.ec} dS/m`, ideal: '<2.0' },
                      { label: 'Organic Matter', value: `${latestChem.organicMatter}%`, ideal: '>3%' },
                      { label: 'CEC', value: latestChem.cec, ideal: '15–30' },
                      { label: 'Nitrogen (N)', value: `${latestChem.nitrogen} ppm`, ideal: '20–40' },
                      { label: 'Phosphorus (P)', value: `${latestChem.phosphorus} ppm`, ideal: '25–50' },
                      { label: 'Potassium (K)', value: `${latestChem.potassium} ppm`, ideal: '150–250' },
                      { label: 'Calcium (Ca)', value: `${latestChem.calcium} ppm`, ideal: '1000–3000' },
                    ].map(item => (
                      <Card key={item.label}>
                        <CardContent className="p-4">
                          <span className="text-xs font-medium text-gray-500 uppercase">{item.label}</span>
                          <div className="text-xl font-bold text-charcoal mt-1">{item.value}</div>
                          <span className="text-xs text-gray-400">Ideal: {item.ideal}</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <Card>
                    <CardHeader><h3 className="font-semibold">Micronutrients</h3></CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                        {[
                          { label: 'Zinc', value: latestChem.zinc },
                          { label: 'Manganese', value: latestChem.manganese },
                          { label: 'Iron', value: latestChem.iron },
                          { label: 'Boron', value: latestChem.boron },
                          { label: 'Copper', value: latestChem.copper },
                        ].map(item => (
                          <div key={item.label} className="text-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-xs text-gray-500">{item.label}</span>
                            <div className="text-lg font-bold text-charcoal">{item.value}</div>
                            <span className="text-xs text-gray-400">ppm</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <div className="text-center py-16 text-gray-500">
                  <Beaker className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <h3 className="text-lg font-semibold mb-1">Under Construction</h3>
                  <p className="text-sm">Lab analysis pending. Data will appear here once results are received.</p>
                </div>
              )}
            </div>
          )}

          {/* ─── WATER CHEMISTRY TAB ─── */}
          {activeTab === 'water-chemistry' && (
            <div className="text-center py-16 text-gray-500">
              <Droplets className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <h3 className="text-lg font-semibold mb-1">Under Construction</h3>
              <p className="text-sm">Water chemistry analysis setup in progress. Data will appear here once samples are processed.</p>
              <p className="text-xs text-gray-400 mt-2">Water source analysis is tracked at the ranch level.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
