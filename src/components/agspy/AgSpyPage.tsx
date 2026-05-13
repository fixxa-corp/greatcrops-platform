import { useState } from 'react';
import {
  Radio, Battery, Signal, Clock, AlertTriangle, ArrowLeft,
  Droplets, Thermometer, Zap, TrendingUp, ChevronRight,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, ReferenceLine, Cell,
  ReferenceArea,
} from 'recharts';
import { PageHeader } from '../ui/PageHeader';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { StatCard } from '../ui/StatCard';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { agspyProbes } from '../../data/agspy-mock-data';
import { getFieldById, getClientById } from '../../data/mock-data';
import type { AgSpyProbe } from '../../types';

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function moistureColor(val: number): string {
  if (val >= 35) return '#3B82F6'; // blue — wet
  if (val >= 20) return '#F59E0B'; // amber — optimal
  return '#EF4444'; // red — dry
}

function yesScoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-700';
  if (score >= 60) return 'text-amber-700';
  return 'text-red-700';
}

function yesScoreBg(score: number): string {
  if (score >= 80) return 'bg-emerald-50';
  if (score >= 60) return 'bg-amber-50';
  return 'bg-red-50';
}

// ─── Probe List View ─────────────────────────────────────────────────────────

function ProbeListView({ onSelect }: { onSelect: (probe: AgSpyProbe) => void }) {
  const online = agspyProbes.filter(p => p.status === 'online').length;
  const offline = agspyProbes.length - online;
  const lastSync = agspyProbes
    .filter(p => p.status === 'online')
    .reduce((latest, p) => p.lastReading > latest ? p.lastReading : latest, '');

  return (
    <div className="space-y-6">
      <PageHeader
        title="AgSpy Soil Monitoring"
        subtitle="Real-time probe data from AquaSpy IoT sensors"
      />

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Probes" value={agspyProbes.length} icon={Radio} color="blue" subtitle="Across all fields" />
        <StatCard title="Online" value={online} icon={Signal} color="green" subtitle="Transmitting data" />
        <StatCard title="Offline" value={offline} icon={AlertTriangle} color={offline > 0 ? 'brown' : 'green'} subtitle={offline > 0 ? 'Needs attention' : 'All clear'} />
        <StatCard title="Last Sync" value={timeAgo(lastSync)} icon={Clock} color="purple" subtitle="Most recent reading" />
      </div>

      {/* Probe Table */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">All Probes</h2>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500">Probe ID</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500">Field</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500">Client</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500">Battery</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500">Signal</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500">Last Reading</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500">YES! Score</th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {agspyProbes.map(probe => {
                  const field = getFieldById(probe.fieldId);
                  const client = getClientById(probe.clientId);
                  return (
                    <tr
                      key={probe.id}
                      onClick={() => onSelect(probe)}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4 font-mono font-medium text-charcoal">{probe.id}</td>
                      <td className="py-3 px-4">{field?.name ?? '—'}</td>
                      <td className="py-3 px-4 text-gray-500">{client?.name ?? '—'}</td>
                      <td className="py-3 px-4">
                        <Badge variant={probe.status === 'online' ? 'success' : 'danger'}>
                          <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${probe.status === 'online' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          {probe.status === 'online' ? 'Online' : 'Offline'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <Battery className={`w-4 h-4 ${probe.batteryPercent > 20 ? 'text-gray-400' : 'text-red-500'}`} />
                          <span className={probe.batteryPercent <= 20 ? 'text-red-600 font-medium' : ''}>{probe.batteryPercent}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <div className="flex gap-0.5">
                            {[0, 1, 2, 3].map(i => (
                              <div
                                key={i}
                                className={`w-1 rounded-full ${
                                  probe.signalStrength > i * 25
                                    ? 'bg-emerald-500'
                                    : 'bg-gray-200'
                                }`}
                                style={{ height: `${8 + i * 3}px` }}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-400">{probe.signalStrength}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-500">{timeAgo(probe.lastReading)}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold text-sm ${yesScoreBg(probe.yesScore)} ${yesScoreColor(probe.yesScore)}`}>
                          {probe.yesScore}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <ChevronRight className="w-4 h-4 text-gray-300" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Probe Detail View ───────────────────────────────────────────────────────

function ProbeDetailView({ probe, onBack }: { probe: AgSpyProbe; onBack: () => void }) {
  const field = getFieldById(probe.fieldId);
  const client = getClientById(probe.clientId);

  // Prepare depth chart data (reverse so 0" is at top)
  const depthData = probe.currentLayers.map(l => ({
    depth: `${l.depth}"`,
    depthNum: l.depth,
    moisture: l.moisture,
    temperature: l.temperature,
    ec: l.ec,
  }));

  // 24-hour trend at ARZ midpoint
  const arzMid = Math.floor((probe.activeRootZone.topDepth + probe.activeRootZone.bottomDepth) / 2);
  const arzLayerIndex = probe.currentLayers.findIndex(l => l.depth >= arzMid);
  const trendData = probe.hourlyTrend.map(r => {
    const layer = r.layers[arzLayerIndex >= 0 ? arzLayerIndex : 3];
    const t = new Date(r.timestamp);
    return {
      time: `${t.getHours().toString().padStart(2, '0')}:00`,
      moisture: layer.moisture,
      temperature: layer.temperature,
      ec: layer.ec,
      yesScore: r.yesScore,
    };
  });

  const alertTypeLabels: Record<string, string> = {
    'over-watering': 'Over-watering',
    'under-watering': 'Under-watering',
    'high-salinity': 'High Salinity',
    'frost-risk': 'Frost Risk',
    'battery-low': 'Battery Low',
    'signal-lost': 'Signal Lost',
  };

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-charcoal transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to All Probes
      </button>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-charcoal font-mono">{probe.id}</h1>
              <Badge variant={probe.status === 'online' ? 'success' : 'danger'}>
                <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${probe.status === 'online' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                {probe.status === 'online' ? 'Online' : 'Offline'}
              </Badge>
            </div>
            <p className="text-gray-500">{field?.name} &middot; {client?.farmName}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><Battery className="w-4 h-4" />{probe.batteryPercent}% battery</span>
              <span className="flex items-center gap-1.5"><Signal className="w-4 h-4" />{probe.signalStrength}% signal</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />Last: {timeAgo(probe.lastReading)}</span>
            </div>
          </div>
          <div className={`text-center p-4 rounded-xl ${yesScoreBg(probe.yesScore)}`}>
            <p className={`text-3xl font-bold ${yesScoreColor(probe.yesScore)}`}>{probe.yesScore}</p>
            <p className="text-xs text-gray-500 mt-1">YES! Score</p>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {probe.alerts.length > 0 && (
        <div className="space-y-2">
          {probe.alerts.map(alert => (
            <div
              key={alert.id}
              className={`flex items-start gap-3 p-4 rounded-xl border ${
                alert.severity === 'critical'
                  ? 'bg-red-50 border-red-200'
                  : 'bg-amber-50 border-amber-200'
              }`}
            >
              <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${alert.severity === 'critical' ? 'text-red-600' : 'text-amber-600'}`} />
              <div>
                <p className={`text-sm font-semibold ${alert.severity === 'critical' ? 'text-red-700' : 'text-amber-700'}`}>
                  {alertTypeLabels[alert.type]}
                </p>
                <p className="text-sm text-gray-600 mt-0.5">{alert.message}</p>
                <p className="text-xs text-gray-400 mt-1">{timeAgo(alert.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Depth Profiles: Moisture, Temp, EC */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Soil Moisture Profile */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-600" />
              <h2 className="text-lg font-semibold">Soil Moisture Profile</h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">Volumetric water content (%) by depth</p>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={depthData} layout="vertical" margin={{ top: 5, right: 20, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" domain={[0, 50]} tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} unit="%" />
                <YAxis type="category" dataKey="depth" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={35} reversed />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
                  formatter={(value) => [`${value}%`, 'Moisture']}
                />
                <ReferenceArea
                  y1={`${probe.activeRootZone.topDepth}"`}
                  y2={`${probe.activeRootZone.bottomDepth}"`}
                  fill="#1B5E20"
                  fillOpacity={0.06}
                  label={{ value: 'ARZ', position: 'right', fontSize: 10, fill: '#1B5E20' }}
                />
                <Bar dataKey="moisture" radius={[0, 4, 4, 0]} barSize={16}>
                  {depthData.map((entry, i) => (
                    <Cell key={i} fill={moistureColor(entry.moisture)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Temperature Profile */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-orange-500" />
              <h2 className="text-lg font-semibold">Soil Temperature</h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">Temperature (°F) by depth</p>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={depthData} layout="vertical" margin={{ top: 5, right: 20, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" domain={[50, 80]} tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} unit="°F" />
                <YAxis type="category" dataKey="depth" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={35} reversed />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
                  formatter={(value) => [`${value}°F`, 'Temperature']}
                />
                <ReferenceArea
                  y1={`${probe.activeRootZone.topDepth}"`}
                  y2={`${probe.activeRootZone.bottomDepth}"`}
                  fill="#1B5E20"
                  fillOpacity={0.06}
                />
                <Bar dataKey="temperature" fill="#F97316" radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* EC Profile */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-600" />
              <h2 className="text-lg font-semibold">EC / Salinity</h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">Electrical conductivity (dS/m) by depth</p>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={depthData} layout="vertical" margin={{ top: 5, right: 20, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" domain={[0, 3.5]} tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} unit=" dS/m" />
                <YAxis type="category" dataKey="depth" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={35} reversed />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
                  formatter={(value) => [`${value} dS/m`, 'EC']}
                />
                <ReferenceArea
                  y1={`${probe.activeRootZone.topDepth}"`}
                  y2={`${probe.activeRootZone.bottomDepth}"`}
                  fill="#1B5E20"
                  fillOpacity={0.06}
                />
                <Bar dataKey="ec" fill="#7C3AED" radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 24-Hour Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Moisture Trend */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">24-Hour Moisture Trend</h2>
            <p className="text-xs text-gray-500">At active root zone ({arzMid}" depth)</p>
          </CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} interval={3} />
                <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }} />
                {probe.irrigationEvents.map((evt, i) => {
                  const h = new Date(evt.startTime).getHours();
                  return <ReferenceLine key={i} x={`${h.toString().padStart(2, '0')}:00`} stroke="#3B82F6" strokeDasharray="4 4" label={{ value: '💧', position: 'top', fontSize: 12 }} />;
                })}
                <Line type="monotone" dataKey="moisture" stroke="#3B82F6" strokeWidth={2} dot={false} name="Moisture %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Temperature Trend */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">24-Hour Temperature Trend</h2>
            <p className="text-xs text-gray-500">At active root zone ({arzMid}" depth)</p>
          </CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} interval={3} />
                <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }} />
                <Line type="monotone" dataKey="temperature" stroke="#F97316" strokeWidth={2} dot={false} name="Temp °F" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* EC Trend */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">24-Hour EC Trend</h2>
            <p className="text-xs text-gray-500">At active root zone ({arzMid}" depth)</p>
          </CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} interval={3} />
                <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }} />
                <Line type="monotone" dataKey="ec" stroke="#7C3AED" strokeWidth={2} dot={false} name="EC dS/m" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* YES! Score 7-Day Trend */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-deep" />
              <h2 className="text-lg font-semibold">YES! Score — 7 Day Trend</h2>
            </div>
          </CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={probe.yesScoreTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }} />
                <Line type="monotone" dataKey="score" stroke="#1B5E20" strokeWidth={2.5} dot={{ fill: '#1B5E20', r: 4 }} name="YES! Score" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Irrigation Events */}
      {probe.irrigationEvents.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-600" />
              <h2 className="text-lg font-semibold">Detected Irrigation Events</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-gray-100">
              {probe.irrigationEvents.map((evt, i) => {
                const start = new Date(evt.startTime);
                const end = new Date(evt.endTime);
                const durMins = Math.round((end.getTime() - start.getTime()) / 60000);
                return (
                  <div key={i} className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-medium text-charcoal">
                        {start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} &middot; {start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} – {end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="text-xs text-gray-400">Duration: {Math.floor(durMins / 60)}h {durMins % 60}m</p>
                    </div>
                    {evt.volumeGallons && (
                      <Badge variant="info">{(evt.volumeGallons / 1000).toFixed(1)}k gal</Badge>
                    )}
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

// ─── Main AgSpy Page ─────────────────────────────────────────────────────────

export function AgSpyPage() {
  const [selectedProbe, setSelectedProbe] = useState<AgSpyProbe | null>(null);

  if (selectedProbe) {
    return <ProbeDetailView probe={selectedProbe} onBack={() => setSelectedProbe(null)} />;
  }

  return <ProbeListView onSelect={setSelectedProbe} />;
}
