import { useAuth } from '../../lib/auth';
import {
  getClientById, getFieldsByClient, getLabResultsByClient,
  getTreatmentsByClient, soilHealthTrends,
} from '../../data/mock-data';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { TrendingUp, DollarSign, Leaf } from 'lucide-react';

export function ClientReports() {
  const { user } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const client = getClientById(user?.clientId || '');
  const fields = getFieldsByClient(user?.clientId || '');
  const labResults = getLabResultsByClient(user?.clientId || '');
  const treatments = getTreatmentsByClient(user?.clientId || '');

  const completedTreatments = treatments.filter((t) => t.status === 'completed').length;
  const totalTreatments = treatments.length;
  const complianceRate = totalTreatments > 0 ? Math.round((completedTreatments / totalTreatments) * 100) : 0;

  // Compute soil score improvement per field
  const fieldImprovements = fields
    .filter((f) => soilHealthTrends[f.id])
    .map((f) => {
      const trends = soilHealthTrends[f.id];
      const first = trends[0];
      const last = trends[trends.length - 1];
      return {
        name: f.name,
        before: first.score,
        after: last.score,
        improvement: last.score - first.score,
      };
    });

  // Latest vs earliest organic carbon across all soil results
  const soilResults = labResults.filter((l) => l.resultType === 'soil_composition' && l.organicCarbon > 0);
  const avgOCFirst = soilResults.length >= 2
    ? soilResults.sort((a, b) => a.date.localeCompare(b.date))[0].organicCarbon
    : 0;
  const avgOCLast = soilResults.length >= 2
    ? soilResults.sort((a, b) => b.date.localeCompare(a.date))[0].organicCarbon
    : 0;

  return (
    <div>
      <h1 className="text-2xl font-bold text-charcoal mb-6">Reports & ROI</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-charcoal">{complianceRate}%</div>
              <div className="text-sm text-charcoal-lighter">Treatment Compliance</div>
            </div>
          </div>
          <p className="text-xs text-charcoal-lighter">
            {completedTreatments} of {totalTreatments} treatments completed
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-deep/10 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-green-deep" />
            </div>
            <div>
              <div className="text-2xl font-bold text-charcoal">
                {avgOCLast > 0 ? `${avgOCFirst}% → ${avgOCLast}%` : '—'}
              </div>
              <div className="text-sm text-charcoal-lighter">Organic Carbon Trend</div>
            </div>
          </div>
          <p className="text-xs text-charcoal-lighter">
            {avgOCLast > avgOCFirst ? `+${(avgOCLast - avgOCFirst).toFixed(1)}% improvement` : 'Tracking'}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-wheat/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-wheat-dark" />
            </div>
            <div>
              <div className="text-2xl font-bold text-charcoal">{labResults.length}</div>
              <div className="text-sm text-charcoal-lighter">Lab Analyses</div>
            </div>
          </div>
          <p className="text-xs text-charcoal-lighter">
            Data-driven program management
          </p>
        </div>
      </div>

      {/* Field Improvement Chart */}
      {fieldImprovements.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-charcoal mb-4">Soil Health Score Improvement by Field</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fieldImprovements} layout="vertical">
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="before" fill="#b0bec5" name="Start" radius={[0, 4, 4, 0]} />
                <Bar dataKey="after" fill="#1B5E20" name="Current" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Organic Carbon Trends */}
      {fields.filter((f) => soilHealthTrends[f.id]).length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-charcoal mb-4">Organic Carbon Over Time</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart>
                <XAxis dataKey="date" type="category" allowDuplicatedCategory={false} tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                {fields
                  .filter((f) => soilHealthTrends[f.id])
                  .map((field, i) => {
                    const colors = ['#1B5E20', '#F9A825', '#5D4037', '#1565C0'];
                    return (
                      <Line
                        key={field.id}
                        data={soilHealthTrends[field.id]}
                        type="monotone"
                        dataKey="organicCarbon"
                        stroke={colors[i % colors.length]}
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        name={field.name}
                      />
                    );
                  })}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
