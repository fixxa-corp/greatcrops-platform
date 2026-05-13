import { useAuth } from '../../lib/auth';
import { getTreatmentsByClient, getFieldsByClient, getMaterialById } from '../../data/mock-data';
import { formatDate } from '../../lib/utils';

export function ClientTreatments() {
  const { user } = useAuth();
  const treatments = getTreatmentsByClient(user?.clientId || '');
  const fields = getFieldsByClient(user?.clientId || '');

  const sorted = [...treatments].sort((a, b) => b.scheduledDate.localeCompare(a.scheduledDate));

  return (
    <div>
      <h1 className="text-2xl font-bold text-charcoal mb-6">Treatment Schedule</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-lighter uppercase">Date</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-lighter uppercase">Field</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-lighter uppercase">Material</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-lighter uppercase">Rate</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-lighter uppercase">Stage</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-lighter uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((t) => {
                const field = fields.find((f) => f.id === t.fieldId);
                const material = getMaterialById(t.materialId);
                return (
                  <tr key={t.id} className="border-b border-gray-50 hover:bg-cream/50">
                    <td className="px-6 py-4 text-sm text-charcoal">
                      {formatDate(t.completedDate || t.scheduledDate)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-charcoal">
                      {field?.name || '—'}
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal-light">
                      {material?.name || '—'}
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal-lighter">
                      {t.applicationRate}
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal-lighter">
                      {t.growthStage}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        t.status === 'completed' ? 'bg-emerald-50 text-emerald-700' :
                        t.status === 'scheduled' ? 'bg-blue-50 text-blue-700' :
                        t.status === 'overdue' ? 'bg-red-50 text-red-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {treatments.length > 0 && (
        <p className="text-sm text-charcoal-lighter mt-4">
          Showing {treatments.length} treatments across {fields.length} field{fields.length !== 1 ? 's' : ''}.
        </p>
      )}
    </div>
  );
}
