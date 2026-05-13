import { useState } from 'react';
import { User, FlaskConical, Sprout, Bell, Save } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { PageHeader } from '../ui/PageHeader';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { materials, cropConfigs } from '../../data/mock-data';

type TabType = 'profile' | 'materials' | 'crops' | 'notifications';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'materials', label: 'Materials', icon: <FlaskConical className="w-4 h-4" /> },
    { id: 'crops', label: 'Crop Types', icon: <Sprout className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
  ];

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your practice and program configuration" />

      <div className="flex gap-6 flex-col lg:flex-row">
        {/* Sidebar tabs */}
        <div className="lg:w-56 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id ? 'bg-green-deep text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {activeTab === 'profile' && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Profile & Company</h2>
                <p className="text-sm text-gray-500">Your practice information</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-deep to-green-deep-light flex items-center justify-center text-white text-2xl font-bold">
                    TA
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal">Tomas Aguayo</h3>
                    <p className="text-gray-500">CCA-Certified Agronomist</p>
                    <Badge variant="success" size="md">CCA #12847</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'Full Name', value: 'Tomas Aguayo' },
                    { label: 'Email', value: 'tomas@greatcrops.com' },
                    { label: 'Phone', value: '(805) 555-0147' },
                    { label: 'CCA License #', value: '12847' },
                    { label: 'Company', value: 'Great Crops' },
                    { label: 'Location', value: 'Los Osos, CA' },
                    { label: 'Tagline', value: 'From Good Crops to Great Crops' },
                    { label: 'Service Area', value: 'SLO, Santa Barbara, Ventura Counties' },
                  ].map(field => (
                    <div key={field.label}>
                      <label className="block text-xs font-medium text-gray-500 mb-1">{field.label}</label>
                      <input
                        type="text"
                        defaultValue={field.value}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-deep/20 focus:border-green-deep"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button><Save className="w-4 h-4" /> Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'materials' && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Treatment Program Materials</h2>
                <p className="text-sm text-gray-500">The 6 Great Crops proprietary materials</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {materials.map(mat => (
                  <div key={mat.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${mat.color}20` }}>
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: mat.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold">{mat.name}</h3>
                          <Badge variant="neutral" size="sm">{mat.category}</Badge>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">{mat.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Default Rate</label>
                            <input
                              type="text"
                              defaultValue={mat.defaultRate}
                              className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded bg-white focus:outline-none focus:ring-2 focus:ring-green-deep/20"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Unit</label>
                            <input
                              type="text"
                              defaultValue={mat.unit}
                              className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded bg-white focus:outline-none focus:ring-2 focus:ring-green-deep/20"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">On Hand</label>
                            <input
                              type="number"
                              defaultValue={mat.quantityOnHand}
                              className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded bg-white focus:outline-none focus:ring-2 focus:ring-green-deep/20"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Reorder Point</label>
                            <input
                              type="number"
                              defaultValue={mat.reorderPoint}
                              className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded bg-white focus:outline-none focus:ring-2 focus:ring-green-deep/20"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-end">
                  <Button><Save className="w-4 h-4" /> Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'crops' && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Crop Type Configurations</h2>
                <p className="text-sm text-gray-500">Growth stages and treatment windows per crop</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {cropConfigs.map(config => {
                  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                  return (
                    <div key={config.cropType} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-3">{config.icon} {config.label}</h3>
                      <div className="overflow-x-auto">
                        <div className="min-w-[500px]">
                          <div className="flex mb-1">
                            <div className="w-40 flex-shrink-0" />
                            {monthNames.map(m => (
                              <div key={m} className="flex-1 text-center text-[10px] font-medium text-gray-400">{m}</div>
                            ))}
                          </div>
                          {config.growthStages.map((stage, i) => {
                            const colors = ['bg-emerald-300', 'bg-lime-300', 'bg-green-300', 'bg-teal-300', 'bg-amber-300', 'bg-orange-300', 'bg-yellow-300'];
                            return (
                              <div key={stage.name} className="flex items-center mb-0.5">
                                <div className="w-40 flex-shrink-0 text-xs text-gray-600 pr-2">{stage.name}</div>
                                <div className="flex flex-1">
                                  {Array.from({ length: 12 }).map((_, m) => {
                                    const month = m + 1;
                                    const inRange = stage.startMonth <= stage.endMonth
                                      ? month >= stage.startMonth && month <= stage.endMonth
                                      : month >= stage.startMonth || month <= stage.endMonth;
                                    return (
                                      <div key={m} className="flex-1 h-5 mx-px">
                                        {inRange && <div className={`h-full rounded-sm ${colors[i % colors.length]}`} />}
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
                  );
                })}
              </CardContent>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Notification Preferences</h2>
                <p className="text-sm text-gray-500">Configure when and how you receive alerts</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Treatment reminders', desc: 'Get notified 2 days before scheduled treatments', enabled: true },
                  { label: 'Overdue alerts', desc: 'Alert when a treatment becomes overdue', enabled: true },
                  { label: 'Lab results received', desc: 'Notify when new lab results are available', enabled: true },
                  { label: 'Field visit summary', desc: 'Weekly digest of field visit activity', enabled: false },
                  { label: 'Low inventory warnings', desc: 'Alert when material stock hits reorder point', enabled: true },
                  { label: 'Client contract expiration', desc: 'Remind 30 days before contract expires', enabled: true },
                  { label: 'Weather alerts', desc: 'Severe weather warnings for managed fields', enabled: false },
                ].map((pref) => (
                  <div key={pref.label} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-charcoal">{pref.label}</p>
                      <p className="text-xs text-gray-500">{pref.desc}</p>
                    </div>
                    <button
                      className={`relative w-11 h-6 rounded-full transition-colors ${pref.enabled ? 'bg-green-deep' : 'bg-gray-300'}`}
                    >
                      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${pref.enabled ? 'left-5.5' : 'left-0.5'}`} />
                    </button>
                  </div>
                ))}
                <div className="flex justify-end">
                  <Button><Save className="w-4 h-4" /> Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
