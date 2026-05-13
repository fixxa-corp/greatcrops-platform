import { useAuth } from '../../lib/auth';
import { getFieldVisitsByClient, getFieldsByClient } from '../../data/mock-data';
import { formatDate } from '../../lib/utils';
import { CheckCircle2, Circle, ThermometerSun, Cloud } from 'lucide-react';

export function ClientVisits() {
  const { user } = useAuth();
  const visits = getFieldVisitsByClient(user?.clientId || '');
  const fields = getFieldsByClient(user?.clientId || '');

  const sorted = [...visits].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div>
      <h1 className="text-2xl font-bold text-charcoal mb-6">Field Visits</h1>

      <div className="space-y-6">
        {sorted.map((visit) => {
          const field = fields.find((f) => f.id === visit.fieldId);
          return (
            <div key={visit.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-charcoal">{field?.name || 'Unknown Field'}</h2>
                    <p className="text-sm text-charcoal-lighter">{formatDate(visit.date)} — {visit.growthStage}</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-charcoal-lighter">
                    <span className="flex items-center gap-1">
                      <ThermometerSun className="w-4 h-4" /> {visit.temperature}°F
                    </span>
                    <span className="flex items-center gap-1">
                      <Cloud className="w-4 h-4" /> {visit.weatherConditions}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-medium text-charcoal mb-2">Observations</h3>
                  <p className="text-sm text-charcoal-lighter leading-relaxed">{visit.observations}</p>
                </div>

                {visit.notes && (
                  <div className="mb-4 p-3 bg-cream rounded-lg">
                    <p className="text-sm text-charcoal-light italic">{visit.notes}</p>
                  </div>
                )}

                {/* Checklist */}
                <div>
                  <h3 className="text-sm font-medium text-charcoal mb-2">Checklist</h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {visit.checklist.map((item) => (
                      <div key={item.id} className="flex items-center gap-2 text-sm">
                        {item.checked ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-gray-300 flex-shrink-0" />
                        )}
                        <span className={item.checked ? 'text-charcoal' : 'text-charcoal-lighter'}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {sorted.length === 0 && (
          <p className="text-charcoal-lighter text-sm">No field visits recorded yet.</p>
        )}
      </div>
    </div>
  );
}
