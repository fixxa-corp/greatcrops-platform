import { useAuth } from '../../lib/auth';
import { getLabResultsByClient, getFieldsByClient, soilHealthTrends } from '../../data/mock-data';
import { formatDate } from '../../lib/utils';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function ClientLabResults() {
  const { user } = useAuth();
  const labResults = getLabResultsByClient(user?.clientId || '');
  const fields = getFieldsByClient(user?.clientId || '');

  const sorted = [...labResults].sort((a, b) => b.date.localeCompare(a.date));

  // Gather all trend data for this client's fields
  const trendFields = fields.filter((f) => soilHealthTrends[f.id]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-charcoal mb-6">Lab Results & Soil Health</h1>

      {/* Soil Health Trends Chart */}
      {trendFields.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-charcoal mb-4">Soil Health Trends</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart>
                <XAxis
                  dataKey="date"
                  type="category"
                  allowDuplicatedCategory={false}
                  tick={{ fontSize: 11 }}
                />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                {trendFields.map((field, i) => {
                  const colors = ['#1B5E20', '#F9A825', '#5D4037', '#1565C0'];
                  return (
                    <Line
                      key={field.id}
                      data={soilHealthTrends[field.id]}
                      type="monotone"
                      dataKey="score"
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

      {/* Results table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-lighter uppercase">Date</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-lighter uppercase">Field</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-lighter uppercase">Type</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-lighter uppercase">Org. Carbon</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-lighter uppercase">Microbial</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-lighter uppercase">pH</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-lighter uppercase">Phytophthora</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((lr) => {
                const field = fields.find((f) => f.id === lr.fieldId);
                return (
                  <tr key={lr.id} className="border-b border-gray-50 hover:bg-cream/50">
                    <td className="px-6 py-4 text-sm text-charcoal">{formatDate(lr.date)}</td>
                    <td className="px-6 py-4 text-sm font-medium text-charcoal">{field?.name || '—'}</td>
                    <td className="px-6 py-4 text-sm text-charcoal-lighter">
                      {lr.resultType.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal">
                      {lr.organicCarbon > 0 ? `${lr.organicCarbon}%` : '—'}
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal">
                      {lr.microbialDiversity > 0 ? lr.microbialDiversity : '—'}
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal">
                      {lr.ph > 0 ? lr.ph : '—'}
                    </td>
                    <td className="px-6 py-4">
                      {lr.phytophthoraPresent ? (
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          lr.phytophthoraPressure === 'high' ? 'bg-red-50 text-red-700' :
                          lr.phytophthoraPressure === 'moderate' ? 'bg-amber-50 text-amber-700' :
                          'bg-yellow-50 text-yellow-700'
                        }`}>
                          {lr.phytophthoraPressure}
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                          Clear
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
