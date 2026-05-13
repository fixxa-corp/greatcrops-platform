import { useState } from 'react';
import { FlaskConical, Calendar, ClipboardList, Package, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { PageHeader } from '../ui/PageHeader';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import { Badge } from '../ui/Badge';
import { treatments, fields, clients, materials, getMaterialById, cropConfigs } from '../../data/mock-data';
import { formatDate } from '../../lib/utils';

type TabType = 'calendar' | 'log' | 'schedule' | 'inventory';

export function TreatmentsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('calendar');
  const [selectedCrop, setSelectedCrop] = useState<string>('avocado');
  const [expandedStage, setExpandedStage] = useState<string | null>(null);

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'calendar', label: 'Treatment Calendar', icon: <Calendar className="w-4 h-4" /> },
    { id: 'log', label: 'Treatment Log', icon: <ClipboardList className="w-4 h-4" /> },
    { id: 'schedule', label: 'Program Builder', icon: <FlaskConical className="w-4 h-4" /> },
    { id: 'inventory', label: 'Inventory', icon: <Package className="w-4 h-4" /> },
  ];

  const completedTreatments = treatments.filter(t => t.status === 'completed');
  const scheduledTreatments = treatments.filter(t => t.status === 'scheduled');
  const overdueTreatments = treatments.filter(t => t.status === 'overdue');

  return (
    <div>
      <PageHeader
        title="Treatment Program"
        subtitle="Great Crops 6-material water-applied program"
        action={<Button><FlaskConical className="w-4 h-4" /> Log Treatment</Button>}
      />

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-lg border border-gray-200 p-1 mb-6 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id ? 'bg-green-deep text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Treatment Calendar */}
      {activeTab === 'calendar' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-emerald-600">{completedTreatments.length}</p>
                <p className="text-sm text-gray-500">Completed</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">{scheduledTreatments.length}</p>
                <p className="text-sm text-gray-500">Scheduled</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-red-600">{overdueTreatments.length}</p>
                <p className="text-sm text-gray-500">Overdue</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">All Treatments — Spring 2026</h2>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Field</th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Client</th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Material</th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Rate</th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Stage</th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[...treatments].sort((a, b) => b.scheduledDate.localeCompare(a.scheduledDate)).map(t => {
                      const field = fields.find(f => f.id === t.fieldId);
                      const client = clients.find(c => c.id === t.clientId);
                      const material = getMaterialById(t.materialId);
                      return (
                        <tr key={t.id} className="hover:bg-cream-dark/30">
                          <td className="py-3 px-3">{formatDate(t.completedDate || t.scheduledDate)}</td>
                          <td className="py-3 px-3 font-medium">{field?.name}</td>
                          <td className="py-3 px-3 text-gray-500">{client?.farmName}</td>
                          <td className="py-3 px-3">
                            <span className="inline-flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: material?.color }} />
                              {material?.name}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-gray-500">{t.applicationRate}</td>
                          <td className="py-3 px-3"><Badge variant="neutral" size="sm">{t.growthStage}</Badge></td>
                          <td className="py-3 px-3"><StatusBadge status={t.status} /></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Treatment Log */}
      {activeTab === 'log' && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Completed Treatments</h2>
            <p className="text-sm text-gray-500">Detailed record of all applied treatments</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {completedTreatments.map(t => {
              const field = fields.find(f => f.id === t.fieldId);
              const client = clients.find(c => c.id === t.clientId);
              const material = getMaterialById(t.materialId);
              return (
                <div key={t.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-charcoal">{material?.name}</h3>
                      <p className="text-sm text-gray-500">{field?.name} — {client?.farmName}</p>
                    </div>
                    <StatusBadge status={t.status} />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-gray-400">Applied</p>
                      <p className="font-medium">{formatDate(t.completedDate!)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Rate</p>
                      <p className="font-medium">{t.applicationRate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Weather</p>
                      <p className="font-medium">{t.weatherConditions || '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Growth Stage</p>
                      <p className="font-medium">{t.growthStage}</p>
                    </div>
                  </div>
                  {t.notes && <p className="text-sm text-gray-500 mt-2 italic">{t.notes}</p>}
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Program Builder */}
      {activeTab === 'schedule' && (
        <div className="space-y-6">
          <div className="flex gap-2">
            {cropConfigs.map(c => (
              <button
                key={c.cropType}
                onClick={() => setSelectedCrop(c.cropType)}
                className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
                  selectedCrop === c.cropType ? 'bg-green-deep text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {c.icon} {c.label}
              </button>
            ))}
          </div>

          {(() => {
            const config = cropConfigs.find(c => c.cropType === selectedCrop);
            if (!config) return null;
            return (
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">{config.icon} {config.label} — 6-Material Program</h2>
                  <p className="text-sm text-gray-500">Recommended application schedule by growth stage</p>
                </CardHeader>
                <CardContent className="space-y-2">
                  {config.growthStages.map(stage => {
                    const isExpanded = expandedStage === stage.name;
                    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    const startName = monthNames[stage.startMonth - 1];
                    const endName = monthNames[stage.endMonth - 1];
                    return (
                      <div key={stage.name} className="border border-gray-100 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setExpandedStage(isExpanded ? null : stage.name)}
                          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-green-deep/10 flex items-center justify-center">
                              <FlaskConical className="w-5 h-5 text-green-deep" />
                            </div>
                            <div className="text-left">
                              <p className="font-medium text-charcoal">{stage.name}</p>
                              <p className="text-xs text-gray-400">{startName} — {endName}</p>
                            </div>
                          </div>
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                        </button>
                        {isExpanded && (
                          <div className="px-4 pb-4 space-y-2 border-t border-gray-100 pt-3">
                            {materials.map(mat => (
                              <div key={mat.id} className="flex items-center justify-between p-3 bg-cream rounded-lg">
                                <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: mat.color }} />
                                  <div>
                                    <p className="text-sm font-medium">{mat.name}</p>
                                    <p className="text-xs text-gray-400">{mat.category}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-medium">{mat.defaultRate}</p>
                                  <p className="text-xs text-gray-400">Default rate</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            );
          })()}
        </div>
      )}

      {/* Inventory */}
      {activeTab === 'inventory' && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Material Inventory</h2>
            <p className="text-sm text-gray-500">Current stock levels for all Great Crops materials</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {materials.map(mat => {
                const stockPct = (mat.quantityOnHand / (mat.reorderPoint * 5)) * 100;
                const isLow = mat.quantityOnHand <= mat.reorderPoint * 1.5;
                return (
                  <div key={mat.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: mat.color }} />
                        <h3 className="font-semibold text-sm">{mat.name}</h3>
                      </div>
                      {isLow && <Badge variant="warning" size="sm">Low Stock</Badge>}
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{mat.description}</p>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-2xl font-bold text-charcoal">{mat.quantityOnHand}</p>
                        <p className="text-xs text-gray-400">{mat.unit} on hand</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Reorder at</p>
                        <p className="text-sm font-medium">{mat.reorderPoint} {mat.unit}</p>
                      </div>
                    </div>
                    <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isLow ? 'bg-amber-400' : 'bg-green-deep'}`}
                        style={{ width: `${Math.min(stockPct, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
