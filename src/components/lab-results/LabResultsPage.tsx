import { useState } from 'react';
import { TestTubeDiagonal, TrendingUp, AlertTriangle } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, BarChart, Bar, Legend,
} from 'recharts';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { PageHeader } from '../ui/PageHeader';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import { Badge } from '../ui/Badge';
import { labResults, fields, clients, soilHealthTrends } from '../../data/mock-data';
import { formatDate } from '../../lib/utils';

const resultTypeLabels: Record<string, string> = {
  soil_composition: 'Soil Composition',
  tissue_analysis: 'Tissue Analysis',
  microbiological: 'Microbiological Assay',
  water_quality: 'Water Quality',
};

const resultTypeVariants: Record<string, 'info' | 'success' | 'warning' | 'neutral'> = {
  soil_composition: 'info',
  tissue_analysis: 'success',
  microbiological: 'warning',
  water_quality: 'neutral',
};

export function LabResultsPage() {
  const [selectedField, setSelectedField] = useState<string>('f-1');
  const [filterType, setFilterType] = useState<string>('all');

  const fieldResults = labResults
    .filter(lr => filterType === 'all' || lr.resultType === filterType)
    .sort((a, b) => b.date.localeCompare(a.date));

  const selectedFieldTrends = soilHealthTrends[selectedField];
  const selectedFieldInfo = fields.find(f => f.id === selectedField);

  // Before/after comparison data
  const comparisonFields = ['f-1', 'f-6', 'f-12', 'f-11'].map(fId => {
    const f = fields.find(ff => ff.id === fId);
    const trends = soilHealthTrends[fId];
    if (!f || !trends) return null;
    return {
      name: f.name.length > 15 ? f.name.slice(0, 15) + '…' : f.name,
      before: trends[0].score,
      after: trends[trends.length - 1].score,
    };
  }).filter(Boolean);

  return (
    <div>
      <PageHeader
        title="Lab Results & Soil Analysis"
        subtitle={`${labResults.length} results across all fields`}
        action={<Button><TestTubeDiagonal className="w-4 h-4" /> Log Results</Button>}
      />

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-50">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg Organic Carbon</p>
                <p className="text-xl font-bold text-charcoal">2.6%</p>
                <p className="text-xs text-emerald-600">↑ 44% from baseline</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-50">
                <TestTubeDiagonal className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg Microbial Index</p>
                <p className="text-xl font-bold text-charcoal">68</p>
                <p className="text-xs text-emerald-600">↑ 62% from baseline</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-50">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phytophthora Detections</p>
                <p className="text-xl font-bold text-charcoal">2</p>
                <p className="text-xs text-emerald-600">↓ from 5 baseline</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-50">
                <TestTubeDiagonal className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg pH</p>
                <p className="text-xl font-bold text-charcoal">6.5</p>
                <p className="text-xs text-gray-400">Optimal range</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Before/After Comparison */}
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-lg font-semibold">Before / After Treatment Program</h2>
          <p className="text-sm text-gray-500">Soil health score comparison: enrollment vs. latest</p>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonFields} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }} />
              <Legend />
              <Bar dataKey="before" fill="#B0BEC5" name="Before (Enrollment)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="after" fill="#1B5E20" name="After (Latest)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Per-Field Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <h2 className="text-base font-semibold">Select Field</h2>
            </CardHeader>
            <CardContent className="space-y-1">
              {Object.keys(soilHealthTrends).map(fId => {
                const f = fields.find(ff => ff.id === fId);
                const c = f ? clients.find(cc => cc.id === f.clientId) : null;
                return (
                  <button
                    key={fId}
                    onClick={() => setSelectedField(fId)}
                    className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                      selectedField === fId ? 'bg-green-deep text-white' : 'hover:bg-gray-50'
                    }`}
                  >
                    <p className="font-medium">{f?.name}</p>
                    <p className={`text-xs ${selectedField === fId ? 'text-green-100' : 'text-gray-400'}`}>{c?.farmName}</p>
                  </button>
                );
              })}
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 space-y-6">
          {selectedFieldTrends && (
            <>
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">{selectedFieldInfo?.name} — Key Metrics Over Time</h2>
                </CardHeader>
                <CardContent className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedFieldTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }} />
                      <Legend />
                      <Line type="monotone" dataKey="score" stroke="#1B5E20" strokeWidth={2} dot={{ r: 3 }} name="Soil Score" />
                      <Line type="monotone" dataKey="microbialDiversity" stroke="#2196F3" strokeWidth={2} dot={{ r: 3 }} name="Microbial Index" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">{selectedFieldInfo?.name} — Organic Carbon Trend</h2>
                </CardHeader>
                <CardContent className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedFieldTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }} />
                      <Line type="monotone" dataKey="organicCarbon" stroke="#5D4037" strokeWidth={2.5} dot={{ fill: '#5D4037', r: 4 }} name="Organic Carbon %" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* All Results Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-lg font-semibold">All Lab Results</h2>
            <div className="flex gap-2">
              {['all', 'soil_composition', 'tissue_analysis', 'microbiological', 'water_quality'].map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
                    filterType === type ? 'bg-green-deep text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {type === 'all' ? 'All' : resultTypeLabels[type]?.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Field</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Lab</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">OC%</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Microb.</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">pH</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">EC</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Phyto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {fieldResults.map(lr => {
                  const field = fields.find(f => f.id === lr.fieldId);
                  return (
                    <tr key={lr.id} className="hover:bg-cream-dark/30">
                      <td className="py-3 px-3">{formatDate(lr.date)}</td>
                      <td className="py-3 px-3 font-medium">{field?.name}</td>
                      <td className="py-3 px-3 text-gray-500">{lr.labName}</td>
                      <td className="py-3 px-3"><Badge variant={resultTypeVariants[lr.resultType]} size="sm">{resultTypeLabels[lr.resultType]?.split(' ')[0]}</Badge></td>
                      <td className="py-3 px-3">{lr.organicCarbon > 0 ? `${lr.organicCarbon}%` : '—'}</td>
                      <td className="py-3 px-3">{lr.microbialDiversity > 0 ? lr.microbialDiversity : '—'}</td>
                      <td className="py-3 px-3">{lr.ph > 0 ? lr.ph : '—'}</td>
                      <td className="py-3 px-3">{lr.ec > 0 ? lr.ec : '—'}</td>
                      <td className="py-3 px-3"><StatusBadge status={lr.phytophthoraPressure} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
