import { useState } from 'react';
import { ClipboardList, Calendar, MapPin, Thermometer, Cloud, Camera, CheckCircle2, Circle, Plus } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { PageHeader } from '../ui/PageHeader';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { SearchInput } from '../ui/SearchInput';
import { fieldVisits, fields, clients } from '../../data/mock-data';
import { formatDate, cropTypeLabel, cropTypeColor } from '../../lib/utils';

export function FieldVisitsPage() {
  const [search, setSearch] = useState('');
  const [selectedVisit, setSelectedVisit] = useState<string | null>(fieldVisits[0]?.id || null);

  const filtered = fieldVisits.filter(v => {
    const field = fields.find(f => f.id === v.fieldId);
    const client = clients.find(c => c.id === v.clientId);
    return field?.name.toLowerCase().includes(search.toLowerCase()) ||
      client?.farmName.toLowerCase().includes(search.toLowerCase()) ||
      v.observations.toLowerCase().includes(search.toLowerCase());
  });

  const selected = fieldVisits.find(v => v.id === selectedVisit);
  const selectedField = selected ? fields.find(f => f.id === selected.fieldId) : null;
  const selectedClient = selected ? clients.find(c => c.id === selected.clientId) : null;

  return (
    <div>
      <PageHeader
        title="Field Visits"
        subtitle={`${fieldVisits.length} visits logged`}
        action={<Button><Plus className="w-4 h-4" /> Log Visit</Button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visit List */}
        <div className="lg:col-span-1 space-y-4">
          <SearchInput value={search} onChange={setSearch} placeholder="Search visits..." />

          <div className="space-y-2 max-h-[calc(100vh-240px)] overflow-y-auto pr-1">
            {filtered.map(visit => {
              const field = fields.find(f => f.id === visit.fieldId);
              const client = clients.find(c => c.id === visit.clientId);
              const isSelected = visit.id === selectedVisit;
              return (
                <Card
                  key={visit.id}
                  hover
                  onClick={() => setSelectedVisit(visit.id)}
                  className={isSelected ? 'ring-2 ring-green-deep border-green-deep' : ''}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-medium text-sm">{field?.name}</h3>
                      <span className="text-xs text-gray-400">{formatDate(visit.date)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{client?.farmName}</p>
                    <p className="text-xs text-gray-600 line-clamp-2">{visit.observations}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {field && (
                        <span className={`px-1.5 py-0.5 text-[10px] rounded font-medium ${cropTypeColor(field.cropType)}`}>
                          {cropTypeLabel(field.cropType)}
                        </span>
                      )}
                      <Badge variant="neutral" size="sm">{visit.growthStage}</Badge>
                      {visit.photos.length > 0 && (
                        <span className="flex items-center gap-0.5 text-[10px] text-gray-400">
                          <Camera className="w-3 h-3" />{visit.photos.length}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Visit Detail */}
        <div className="lg:col-span-2">
          {selected && selectedField && selectedClient ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold">{selectedField.name}</h2>
                    <p className="text-sm text-gray-500">{selectedClient.farmName} &middot; {selectedClient.location}</p>
                  </div>
                  <Badge variant="info" size="md">{selected.growthStage}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Visit metadata */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-400">Date</p>
                      <p className="text-sm font-medium">{formatDate(selected.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cloud className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-400">Weather</p>
                      <p className="text-sm font-medium">{selected.weatherConditions}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-400">Temperature</p>
                      <p className="text-sm font-medium">{selected.temperature}°F</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-400">Location</p>
                      <p className="text-sm font-medium">{selectedField.location}</p>
                    </div>
                  </div>
                </div>

                {/* Observations */}
                <div>
                  <h3 className="text-sm font-semibold text-charcoal mb-2">Observations</h3>
                  <p className="text-sm text-gray-600 leading-relaxed bg-cream rounded-lg p-4">{selected.observations}</p>
                </div>

                {/* Checklist */}
                <div>
                  <h3 className="text-sm font-semibold text-charcoal mb-3">Visit Checklist</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selected.checklist.map(item => (
                      <div key={item.id} className="flex items-center gap-2 text-sm">
                        {item.checked ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-gray-300 flex-shrink-0" />
                        )}
                        <span className={item.checked ? 'text-charcoal' : 'text-gray-400'}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Photos */}
                {selected.photos.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-charcoal mb-3">Photos ({selected.photos.length})</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {selected.photos.map((photo, i) => (
                        <div key={i} className="aspect-video bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                          <div className="text-center">
                            <Camera className="w-6 h-6 text-gray-300 mx-auto mb-1" />
                            <p className="text-[10px] text-gray-400 px-2 truncate max-w-full">{photo}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {selected.notes && (
                  <div>
                    <h3 className="text-sm font-semibold text-charcoal mb-2">Notes</h3>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
                      {selected.notes}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-16 text-center">
                <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Select a visit to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
