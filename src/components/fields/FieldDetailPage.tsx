import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Droplets, TreePine, Calendar, Camera, Radio } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line, CartesianGrid,
} from 'recharts';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import { Badge } from '../ui/Badge';
import {
  getFieldById, getClientById, getTreatmentsByField, getLabResultsByField,
  getFieldVisitsByField, soilHealthTrends, materials, cropConfigs,
} from '../../data/mock-data';
import { getProbeByField } from '../../data/agspy-mock-data';
import { formatDate, cropTypeLabel, cropTypeColor } from '../../lib/utils';

export function FieldDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const field = getFieldById(id!);

  if (!field) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Field not found.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/app/fields')}>Back to Fields</Button>
      </div>
    );
  }

  const client = getClientById(field.clientId);
  const fieldTreatments = getTreatmentsByField(field.id);
  const fieldLabResults = getLabResultsByField(field.id);
  const fieldVisits = getFieldVisitsByField(field.id);
  const trends = soilHealthTrends[field.id];
  const cropConfig = cropConfigs.find(c => c.cropType === field.cropType);

  const agspyProbe = getProbeByField(field.id);

  const resultTypeLabels: Record<string, string> = {
    soil_composition: 'Soil Composition',
    tissue_analysis: 'Tissue Analysis',
    microbiological: 'Microbiological',
    water_quality: 'Water Quality',
  };

  return (
    <div className="space-y-6">
      <button onClick={() => navigate('/app/fields')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-charcoal transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Fields
      </button>

      {/* Field Header */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-charcoal">{field.name}</h1>
              <StatusBadge status={field.healthStatus} />
            </div>
            <p className="text-gray-500">{client?.farmName} &middot; {client?.location}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${cropTypeColor(field.cropType)}`}>
                  {cropTypeLabel(field.cropType)}
                </span>
                {field.variety}
              </span>
              <span className="flex items-center gap-1.5"><TreePine className="w-4 h-4" />{field.acreage} acres &middot; Planted {field.plantingYear}</span>
              {field.rootstock && <span>Rootstock: {field.rootstock}</span>}
              <span className="flex items-center gap-1.5"><Droplets className="w-4 h-4" />{field.irrigationType}</span>
            </div>
          </div>
          <div className={`text-center p-4 rounded-xl ${
            field.soilHealthScore >= 70 ? 'bg-emerald-50' :
            field.soilHealthScore >= 50 ? 'bg-amber-50' : 'bg-red-50'
          }`}>
            <p className={`text-3xl font-bold ${
              field.soilHealthScore >= 70 ? 'text-emerald-700' :
              field.soilHealthScore >= 50 ? 'text-amber-700' : 'text-red-700'
            }`}>{field.soilHealthScore}</p>
            <p className="text-xs text-gray-500 mt-1">Soil Health Score</p>
          </div>
        </div>
      </div>

      {/* AgSpy Probe Card */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Radio className="w-5 h-5 text-blue-600" />
          <div>
            <h2 className="text-lg font-semibold">AgSpy Soil Monitoring</h2>
            <p className="text-sm text-gray-500">AquaSpy IoT probe data</p>
          </div>
        </CardHeader>
        <CardContent>
          {agspyProbe ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className={`text-center p-3 rounded-xl ${
                  agspyProbe.yesScore >= 80 ? 'bg-emerald-50' :
                  agspyProbe.yesScore >= 60 ? 'bg-amber-50' : 'bg-red-50'
                }`}>
                  <p className={`text-2xl font-bold ${
                    agspyProbe.yesScore >= 80 ? 'text-emerald-700' :
                    agspyProbe.yesScore >= 60 ? 'text-amber-700' : 'text-red-700'
                  }`}>{agspyProbe.yesScore}</p>
                  <p className="text-xs text-gray-500 mt-0.5">YES! Score</p>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="font-medium text-charcoal">Probe {agspyProbe.id}</p>
                  <p className="text-gray-500">
                    <Badge variant={agspyProbe.status === 'online' ? 'success' : 'danger'} size="sm">
                      {agspyProbe.status === 'online' ? 'Online' : 'Offline'}
                    </Badge>
                    <span className="ml-2">Root zone: {agspyProbe.currentLayers.find(l => l.depth === 16)?.moisture ?? '—'}% moisture</span>
                  </p>
                  {agspyProbe.alerts.length > 0 && (
                    <p className="text-red-600 text-xs font-medium">{agspyProbe.alerts.length} active alert{agspyProbe.alerts.length > 1 ? 's' : ''}</p>
                  )}
                </div>
              </div>
              <Link
                to="/app/agspy"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-green-deep hover:text-green-deep-light transition-colors"
              >
                View Full Probe Data →
              </Link>
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-4">No AgSpy probe assigned to this field</p>
          )}
        </CardContent>
      </Card>

      {/* Soil Health Trend Chart */}
      {trends && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Soil Health Trend</h2>
            <p className="text-sm text-gray-500">Quarterly soil health score since enrollment</p>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1B5E20" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#1B5E20" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }} />
                <Area type="monotone" dataKey="score" stroke="#1B5E20" strokeWidth={2.5} fill="url(#scoreGrad)" name="Soil Score" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Organic Carbon & Microbial Diversity */}
      {trends && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Organic Carbon %</h2>
            </CardHeader>
            <CardContent className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }} />
                  <Line type="monotone" dataKey="organicCarbon" stroke="#5D4037" strokeWidth={2} dot={{ fill: '#5D4037', r: 4 }} name="Organic Carbon %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Microbial Diversity Index</h2>
            </CardHeader>
            <CardContent className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }} />
                  <Bar dataKey="microbialDiversity" fill="#2E7D32" radius={[4, 4, 0, 0]} name="Diversity Index" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Treatment Timeline */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Treatment Program Timeline</h2>
          <p className="text-sm text-gray-500">6-material program mapped to {cropTypeLabel(field.cropType)} growth stages</p>
        </CardHeader>
        <CardContent>
          {cropConfig && (
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                {/* Month headers */}
                <div className="flex mb-2">
                  <div className="w-36 flex-shrink-0" />
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                    <div key={m} className="flex-1 text-center text-xs font-medium text-gray-400">{m}</div>
                  ))}
                </div>

                {/* Growth stages */}
                <div className="space-y-1 mb-4">
                  {cropConfig.growthStages.map((stage, i) => {
                    const colors = ['bg-emerald-200', 'bg-lime-200', 'bg-green-200', 'bg-teal-200', 'bg-amber-200', 'bg-orange-200', 'bg-yellow-200'];
                    return (
                      <div key={stage.name} className="flex items-center">
                        <div className="w-36 flex-shrink-0 text-xs text-gray-600 pr-2 truncate">{stage.name}</div>
                        <div className="flex flex-1">
                          {Array.from({ length: 12 }).map((_, m) => {
                            const month = m + 1;
                            const inRange = stage.startMonth <= stage.endMonth
                              ? month >= stage.startMonth && month <= stage.endMonth
                              : month >= stage.startMonth || month <= stage.endMonth;
                            return (
                              <div key={m} className="flex-1 h-6 mx-0.5">
                                {inRange && <div className={`h-full rounded ${colors[i % colors.length]}`} />}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Material application rows */}
                <div className="border-t border-gray-100 pt-3 space-y-1">
                  {materials.map(mat => {
                    const matTreatments = fieldTreatments.filter(t => t.materialId === mat.id);
                    return (
                      <div key={mat.id} className="flex items-center">
                        <div className="w-36 flex-shrink-0 text-xs font-medium pr-2 truncate" style={{ color: mat.color }}>{mat.name}</div>
                        <div className="flex flex-1">
                          {Array.from({ length: 12 }).map((_, m) => {
                            const month = m + 1;
                            const monthStr = `2026-${String(month).padStart(2, '0')}`;
                            const applied = matTreatments.some(t => t.scheduledDate.startsWith(monthStr));
                            return (
                              <div key={m} className="flex-1 h-6 mx-0.5 flex items-center justify-center">
                                {applied && (
                                  <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: mat.color, backgroundColor: `${mat.color}30` }} />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lab Results Table */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Lab Results</h2>
          </CardHeader>
          <CardContent>
            {fieldLabResults.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-6">No lab results for this field yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-2 text-xs font-semibold text-gray-500">Date</th>
                      <th className="text-left py-2 px-2 text-xs font-semibold text-gray-500">Type</th>
                      <th className="text-left py-2 px-2 text-xs font-semibold text-gray-500">OC%</th>
                      <th className="text-left py-2 px-2 text-xs font-semibold text-gray-500">Microb.</th>
                      <th className="text-left py-2 px-2 text-xs font-semibold text-gray-500">pH</th>
                      <th className="text-left py-2 px-2 text-xs font-semibold text-gray-500">Phyto</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {fieldLabResults.map(lr => (
                      <tr key={lr.id}>
                        <td className="py-2 px-2">{formatDate(lr.date)}</td>
                        <td className="py-2 px-2"><Badge variant="info" size="sm">{resultTypeLabels[lr.resultType]?.split(' ')[0]}</Badge></td>
                        <td className="py-2 px-2 font-medium">{lr.organicCarbon > 0 ? `${lr.organicCarbon}%` : '—'}</td>
                        <td className="py-2 px-2">{lr.microbialDiversity > 0 ? lr.microbialDiversity : '—'}</td>
                        <td className="py-2 px-2">{lr.ph > 0 ? lr.ph : '—'}</td>
                        <td className="py-2 px-2"><StatusBadge status={lr.phytophthoraPressure} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Field Visits */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Field Visits</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            {fieldVisits.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-6">No visits recorded for this field</p>
            ) : (
              fieldVisits.map(visit => (
                <div key={visit.id} className="border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium">{formatDate(visit.date)}</span>
                    </div>
                    <Badge variant="neutral" size="sm">{visit.growthStage}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{visit.observations}</p>
                  {visit.photos.length > 0 && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                      <Camera className="w-3.5 h-3.5" /> {visit.photos.length} photos
                    </div>
                  )}
                  {visit.notes && (
                    <p className="text-xs text-gray-400 mt-1 italic">Note: {visit.notes}</p>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
