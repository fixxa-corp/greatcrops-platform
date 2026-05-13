import { useAuth } from '../../lib/auth';
import { getFieldsByClient, getLabResultsByField, soilHealthTrends } from '../../data/mock-data';
import { cropTypeLabel } from '../../lib/utils';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function ClientFields() {
  const { user } = useAuth();
  const fields = getFieldsByClient(user?.clientId || '');

  return (
    <div>
      <h1 className="text-2xl font-bold text-charcoal mb-6">My Fields</h1>

      <div className="space-y-6">
        {fields.map((field) => {
          const trends = soilHealthTrends[field.id];
          const latestLab = getLabResultsByField(field.id)
            .filter((l) => l.resultType === 'soil_composition')
            .sort((a, b) => b.date.localeCompare(a.date))[0];

          return (
            <div key={field.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-charcoal">{field.name}</h2>
                    <p className="text-sm text-charcoal-lighter">
                      {field.acreage} acres — {cropTypeLabel(field.cropType)} — {field.variety}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      field.healthStatus === 'healthy' ? 'bg-emerald-50 text-emerald-700' :
                      field.healthStatus === 'attention' ? 'bg-amber-50 text-amber-700' :
                      'bg-red-50 text-red-700'
                    }`}>
                      {field.healthStatus.charAt(0).toUpperCase() + field.healthStatus.slice(1)}
                    </span>
                    <div className={`text-2xl font-bold ${
                      field.soilHealthScore >= 70 ? 'text-emerald-600' :
                      field.soilHealthScore >= 50 ? 'text-amber-600' : 'text-red-600'
                    }`}>
                      {field.soilHealthScore}
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="text-sm">
                    <span className="text-charcoal-lighter">Location:</span>{' '}
                    <span className="text-charcoal">{field.location}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-charcoal-lighter">Irrigation:</span>{' '}
                    <span className="text-charcoal">{field.irrigationType}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-charcoal-lighter">Planted:</span>{' '}
                    <span className="text-charcoal">{field.plantingYear}</span>
                  </div>
                  {field.rootstock && (
                    <div className="text-sm">
                      <span className="text-charcoal-lighter">Rootstock:</span>{' '}
                      <span className="text-charcoal">{field.rootstock}</span>
                    </div>
                  )}
                </div>

                {latestLab && (
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 p-4 bg-cream rounded-lg">
                    {[
                      { label: 'Organic C', value: `${latestLab.organicCarbon}%` },
                      { label: 'Microbial', value: latestLab.microbialDiversity },
                      { label: 'pH', value: latestLab.ph },
                      { label: 'N (ppm)', value: latestLab.nitrogen },
                      { label: 'P (ppm)', value: latestLab.phosphorus },
                      { label: 'K (ppm)', value: latestLab.potassium },
                    ].map((m) => (
                      <div key={m.label} className="text-center">
                        <div className="text-xs text-charcoal-lighter">{m.label}</div>
                        <div className="text-sm font-semibold text-charcoal">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Soil health trend chart */}
              {trends && (
                <div className="px-6 pb-6">
                  <p className="text-sm font-medium text-charcoal-lighter mb-3">Soil Health Trend</p>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trends}>
                        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="score" stroke="#1B5E20" strokeWidth={2} dot={{ r: 3 }} name="Soil Score" />
                        <Line type="monotone" dataKey="organicCarbon" stroke="#F9A825" strokeWidth={2} dot={{ r: 3 }} name="Organic Carbon %" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
