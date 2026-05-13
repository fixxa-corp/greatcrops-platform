import { useNavigate } from 'react-router-dom';
import {
  Users, Map, FlaskConical, TestTubeDiagonal, Calendar, Sun, Cloud,
  CloudRain, CloudSun, Wind, Droplets, TrendingUp, Sprout, ArrowRight,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { StatCard } from '../ui/StatCard';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { StatusBadge } from '../ui/StatusBadge';
import { clients, fields, treatments, activities, weatherData } from '../../data/mock-data';
import { formatDate, cropTypeLabel, cropTypeColor } from '../../lib/utils';

const overallTrend = [
  { month: 'Oct 24', avg: 54 },
  { month: 'Jan 25', avg: 60 },
  { month: 'Apr 25', avg: 67 },
  { month: 'Jul 25', avg: 72 },
  { month: 'Oct 25', avg: 76 },
  { month: 'Jan 26', avg: 78 },
  { month: 'Apr 26', avg: 80 },
];

const upcomingTreatments = treatments.filter(t => t.status === 'scheduled').slice(0, 5);
const overdueTreatments = treatments.filter(t => t.status === 'overdue');
const activeClients = clients.filter(c => c.contractStatus === 'active');
const totalAcreage = fields.reduce((sum, f) => sum + f.acreage, 0);

const weatherIcons: Record<string, React.ReactNode> = {
  'Sunny': <Sun className="w-5 h-5 text-wheat" />,
  'Partly Cloudy': <CloudSun className="w-5 h-5 text-gray-500" />,
  'Cloudy': <Cloud className="w-5 h-5 text-gray-400" />,
  'Light Rain': <CloudRain className="w-5 h-5 text-blue-500" />,
};

const activityIcons: Record<string, string> = {
  visit: '🌿',
  lab_result: '🔬',
  treatment: '💧',
  note: '📝',
};

export function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-green-deep to-green-deep-light rounded-xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Good morning, Tomas <Sprout className="w-6 h-6" />
            </h1>
            <p className="text-green-100 mt-1">
              {activeClients.length} active clients &middot; {fields.length} fields under management &middot; {totalAcreage.toLocaleString()} total acres
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-2.5">
            <Calendar className="w-5 h-5" />
            <div>
              <p className="text-sm font-medium">{upcomingTreatments.length} upcoming treatments</p>
              {overdueTreatments.length > 0 && (
                <p className="text-xs text-yellow-200">{overdueTreatments.length} overdue — needs attention</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Clients" value={activeClients.length} subtitle="9 active, 1 pending" icon={Users} color="green" trend={{ value: 12, label: 'vs last quarter' }} />
        <StatCard title="Fields Managed" value={fields.length} subtitle={`${totalAcreage.toLocaleString()} total acres`} icon={Map} color="brown" trend={{ value: 8, label: 'vs last quarter' }} />
        <StatCard title="Treatments This Month" value={treatments.filter(t => t.scheduledDate.startsWith('2026-04')).length} subtitle="6 completed, 2 scheduled" icon={FlaskConical} color="wheat" />
        <StatCard title="Lab Results (Q1)" value={5} subtitle="All showing improvement" icon={TestTubeDiagonal} color="blue" trend={{ value: 15, label: 'soil health avg' }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Soil Health Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-charcoal flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-deep" />
                  Average Soil Health Score
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">Across all managed fields</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-deep">80</p>
                <p className="text-xs text-emerald-600">↑ 48% from baseline</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={overallTrend}>
                <defs>
                  <linearGradient id="soilGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1B5E20" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#1B5E20" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis domain={[40, 100]} tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                  formatter={(value) => [`${value}`, 'Score']}
                />
                <Area type="monotone" dataKey="avg" stroke="#1B5E20" strokeWidth={2.5} fill="url(#soilGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weather */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-charcoal">SLO County Weather</h2>
            <p className="text-sm text-gray-500">7-day forecast</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {weatherData.map((day) => (
              <div key={day.date} className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-3">
                  {weatherIcons[day.condition] || <Sun className="w-5 h-5" />}
                  <div>
                    <p className="text-sm font-medium">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                    <p className="text-xs text-gray-400">{day.condition}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{day.high}°<span className="text-gray-400 font-normal">/{day.low}°</span></p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="flex items-center gap-0.5"><Droplets className="w-3 h-3" />{day.humidity}%</span>
                    <span className="flex items-center gap-0.5"><Wind className="w-3 h-3" />{day.wind}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-charcoal">Recent Activity</h2>
              <span className="text-xs text-gray-400">Last 30 days</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {activities.slice(0, 8).map((act) => (
              <div key={act.id} className="flex gap-3">
                <span className="text-lg flex-shrink-0 mt-0.5">{activityIcons[act.type]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-charcoal">{act.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{act.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{formatDate(act.date)}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Treatments + Fields needing attention */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-charcoal">Upcoming Treatments</h2>
                <button onClick={() => navigate('/app/treatments')} className="text-sm text-green-deep hover:text-green-deep-light font-medium flex items-center gap-1">
                  View all <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[...overdueTreatments, ...upcomingTreatments].slice(0, 5).map((t) => {
                const field = fields.find(f => f.id === t.fieldId);
                const client = clients.find(c => c.id === t.clientId);
                return (
                  <div key={t.id} className="flex items-center justify-between py-1">
                    <div>
                      <p className="text-sm font-medium">{field?.name}</p>
                      <p className="text-xs text-gray-400">{client?.farmName} &middot; {formatDate(t.scheduledDate)}</p>
                    </div>
                    <StatusBadge status={t.status} />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-charcoal">Fields Needing Attention</h2>
                <button onClick={() => navigate('/app/fields')} className="text-sm text-green-deep hover:text-green-deep-light font-medium flex items-center gap-1">
                  View all <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {fields.filter(f => f.healthStatus !== 'healthy').map((field) => {
                const client = clients.find(c => c.id === field.clientId);
                return (
                  <div key={field.id} className="flex items-center justify-between py-1" onClick={() => navigate(`/app/fields/${field.id}`)} role="button" tabIndex={0}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center">
                        <span className={`inline-block px-1.5 py-0.5 text-xs rounded font-medium ${cropTypeColor(field.cropType)}`}>
                          {cropTypeLabel(field.cropType).slice(0, 3)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{field.name}</p>
                        <p className="text-xs text-gray-400">{client?.farmName} &middot; {field.acreage} ac</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-charcoal">{field.soilHealthScore}</span>
                      <StatusBadge status={field.healthStatus} />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Season Calendar Preview */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-charcoal">Season Treatment Calendar — April 2026</h2>
          <p className="text-sm text-gray-500">All fields &middot; Showing scheduled & completed treatments</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="text-center text-xs font-medium text-gray-400 py-2">{d}</div>
            ))}
            {/* April 2026 starts on Wednesday (index 3) */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={`empty-${i}`} className="h-16" />
            ))}
            {Array.from({ length: 30 }).map((_, i) => {
              const day = i + 1;
              const dateStr = `2026-04-${String(day).padStart(2, '0')}`;
              const dayTreatments = treatments.filter(t => t.scheduledDate === dateStr || t.completedDate === dateStr);
              const isToday = day === 24;
              return (
                <div
                  key={day}
                  className={`h-16 rounded-lg border text-xs p-1 ${isToday ? 'border-green-deep bg-green-deep/5 ring-1 ring-green-deep' : 'border-gray-100 hover:bg-gray-50'}`}
                >
                  <span className={`font-medium ${isToday ? 'text-green-deep' : 'text-gray-600'}`}>{day}</span>
                  <div className="mt-0.5 space-y-0.5">
                    {dayTreatments.slice(0, 2).map(t => (
                      <div key={t.id} className={`truncate rounded px-1 py-0.5 text-[10px] leading-tight ${t.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : t.status === 'overdue' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                        {fields.find(f => f.id === t.fieldId)?.name?.split(' ')[0]}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
