import { useAuth } from '../../lib/auth';
import {
  getClientById, getFieldsByClient, getTreatmentsByClient,
  getLabResultsByClient, getFieldVisitsByClient,
} from '../../data/mock-data';
import { Map, FlaskConical, TestTubeDiagonal, ClipboardList, TrendingUp, Leaf } from 'lucide-react';
import { formatDate } from '../../lib/utils';

export function ClientDashboard() {
  const { user } = useAuth();
  const client = getClientById(user?.clientId || '');
  const fields = getFieldsByClient(user?.clientId || '');
  const treatments = getTreatmentsByClient(user?.clientId || '');
  const labResults = getLabResultsByClient(user?.clientId || '');
  const visits = getFieldVisitsByClient(user?.clientId || '');

  const upcomingTreatments = treatments
    .filter((t) => t.status === 'scheduled')
    .sort((a, b) => a.scheduledDate.localeCompare(b.scheduledDate));

  const recentVisits = visits
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  const avgSoilScore = fields.length
    ? Math.round(fields.reduce((sum, f) => sum + f.soilHealthScore, 0) / fields.length)
    : 0;

  if (!client) return <div className="text-charcoal-lighter">Client not found.</div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-charcoal">
          Welcome, {client.name}
        </h1>
        <p className="text-charcoal-lighter text-sm mt-1">{client.farmName} — {client.location}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Fields', value: fields.length, icon: Map, color: 'bg-green-deep/10 text-green-deep' },
          { label: 'Upcoming Treatments', value: upcomingTreatments.length, icon: FlaskConical, color: 'bg-wheat/20 text-wheat-dark' },
          { label: 'Lab Results', value: labResults.length, icon: TestTubeDiagonal, color: 'bg-blue-50 text-blue-600' },
          { label: 'Avg Soil Score', value: avgSoilScore, icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-charcoal">{stat.value}</div>
            <div className="text-sm text-charcoal-lighter">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Fields */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-deep" /> Your Fields
          </h2>
          <div className="space-y-3">
            {fields.map((field) => (
              <div key={field.id} className="flex items-center justify-between p-3 bg-cream rounded-lg">
                <div>
                  <p className="font-medium text-charcoal text-sm">{field.name}</p>
                  <p className="text-xs text-charcoal-lighter">{field.acreage} acres — {field.variety}</p>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-semibold ${
                    field.soilHealthScore >= 70 ? 'text-emerald-600' :
                    field.soilHealthScore >= 50 ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    {field.soilHealthScore}
                  </div>
                  <div className="text-xs text-charcoal-lighter">Soil Score</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Treatments */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-wheat-dark" /> Upcoming Treatments
          </h2>
          {upcomingTreatments.length === 0 ? (
            <p className="text-sm text-charcoal-lighter">No upcoming treatments scheduled.</p>
          ) : (
            <div className="space-y-3">
              {upcomingTreatments.map((t) => {
                const field = fields.find((f) => f.id === t.fieldId);
                return (
                  <div key={t.id} className="flex items-center justify-between p-3 bg-cream rounded-lg">
                    <div>
                      <p className="font-medium text-charcoal text-sm">{field?.name || 'Unknown Field'}</p>
                      <p className="text-xs text-charcoal-lighter">{t.applicationRate} — {t.growthStage}</p>
                    </div>
                    <div className="text-sm text-charcoal-lighter">{formatDate(t.scheduledDate)}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Visits */}
        <div className="bg-white rounded-xl p-6 shadow-sm md:col-span-2">
          <h2 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-brown-warm" /> Recent Field Visits
          </h2>
          {recentVisits.length === 0 ? (
            <p className="text-sm text-charcoal-lighter">No field visits yet.</p>
          ) : (
            <div className="space-y-4">
              {recentVisits.map((v) => {
                const field = fields.find((f) => f.id === v.fieldId);
                return (
                  <div key={v.id} className="p-4 bg-cream rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-charcoal text-sm">{field?.name || 'Unknown Field'}</p>
                      <span className="text-xs text-charcoal-lighter">{formatDate(v.date)}</span>
                    </div>
                    <p className="text-sm text-charcoal-lighter leading-relaxed">{v.observations}</p>
                    {v.notes && (
                      <p className="text-sm text-charcoal-light mt-2 italic">Note: {v.notes}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
