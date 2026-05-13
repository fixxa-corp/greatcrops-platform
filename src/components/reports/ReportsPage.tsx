import { useState } from 'react';
import { Download, TrendingUp, DollarSign, CheckCircle } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Legend, PieChart, Pie, Cell,
} from 'recharts';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { PageHeader } from '../ui/PageHeader';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { clients, fields, treatments, soilHealthTrends } from '../../data/mock-data';

type ReportType = 'roi' | 'season' | 'compliance';

const yieldData = [
  { client: 'Mendoza Ranch', before: 4200, after: 5800, crop: 'Avocado (lbs/ac)' },
  { client: 'Pacific Ridge', before: 2100, after: 2650, crop: 'Almond (lbs/ac)' },
  { client: 'Torres Vineyard', before: 3.8, after: 4.6, crop: 'Grape (tons/ac)' },
  { client: 'Whitfield Avo', before: 3800, after: 5200, crop: 'Avocado (lbs/ac)' },
  { client: 'Central Coast', before: 1950, after: 2400, crop: 'Almond (lbs/ac)' },
];

const costSavings = [
  { category: 'Reduced Fungicide', savings: 12500 },
  { category: 'Lower Fertilizer', savings: 8200 },
  { category: 'Water Efficiency', savings: 6800 },
  { category: 'Yield Increase', savings: 45000 },
];

const complianceData = treatments.reduce((acc, t) => {
  const month = t.scheduledDate.slice(0, 7);
  if (!acc[month]) acc[month] = { month, scheduled: 0, completed: 0, overdue: 0 };
  acc[month].scheduled++;
  if (t.status === 'completed') acc[month].completed++;
  if (t.status === 'overdue') acc[month].overdue++;
  return acc;
}, {} as Record<string, { month: string; scheduled: number; completed: number; overdue: number }>);

const complianceChartData = Object.values(complianceData).sort((a, b) => a.month.localeCompare(b.month));

const PIE_COLORS = ['#1B5E20', '#2E7D32', '#F9A825', '#5D4037'];

export function ReportsPage() {
  const [activeReport, setActiveReport] = useState<ReportType>('roi');

  const reports: { id: ReportType; label: string; icon: React.ReactNode; description: string }[] = [
    { id: 'roi', label: 'Grower ROI Report', icon: <DollarSign className="w-5 h-5" />, description: 'Before/after yield comparison, cost savings, soil health improvement' },
    { id: 'season', label: 'Season Summary', icon: <TrendingUp className="w-5 h-5" />, description: 'Per-client season summary with key metrics and progress' },
    { id: 'compliance', label: 'Treatment Compliance', icon: <CheckCircle className="w-5 h-5" />, description: 'Scheduled vs. actual treatment application rates' },
  ];

  const totalCompleted = treatments.filter(t => t.status === 'completed').length;
  const totalScheduledAll = treatments.length;
  const compliancePct = Math.round((totalCompleted / totalScheduledAll) * 100);

  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle="Analytics and reporting for all clients"
      />

      {/* Report Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {reports.map(r => (
          <Card
            key={r.id}
            hover
            onClick={() => setActiveReport(r.id)}
            className={activeReport === r.id ? 'ring-2 ring-green-deep border-green-deep' : ''}
          >
            <CardContent className="p-4 flex items-start gap-3">
              <div className={`p-2 rounded-lg ${activeReport === r.id ? 'bg-green-deep text-white' : 'bg-cream text-green-deep'}`}>
                {r.icon}
              </div>
              <div>
                <h3 className="font-semibold text-sm">{r.label}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{r.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ROI Report */}
      {activeReport === 'roi' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Grower ROI Report — 2025-2026 Season</h2>
            <Button variant="outline"><Download className="w-4 h-4" /> Export PDF</Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-green-deep">+28%</p>
                <p className="text-sm text-gray-500 mt-1">Avg Yield Increase</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-green-deep">$72,500</p>
                <p className="text-sm text-gray-500 mt-1">Total Cost Savings</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-green-deep">+48%</p>
                <p className="text-sm text-gray-500 mt-1">Avg Soil Health Improvement</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <h3 className="text-base font-semibold">Yield Comparison — Before vs. After Program</h3>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yieldData} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="client" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }} />
                  <Legend />
                  <Bar dataKey="before" fill="#B0BEC5" name="Before Program" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="after" fill="#1B5E20" name="After Program" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-base font-semibold">Cost Savings Breakdown</h3>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={costSavings} dataKey="savings" nameKey="category" cx="50%" cy="50%" outerRadius={90} label={({ name, value }) => `${name}: $${(Number(value) / 1000).toFixed(1)}K`}>
                      {costSavings.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-base font-semibold">Soil Health Improvements by Client</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['cl-1', 'cl-3', 'cl-5', 'cl-7'].map(cId => {
                    const client = clients.find(c => c.id === cId);
                    const clientFields = fields.filter(f => f.clientId === cId);
                    const avgScore = Math.round(clientFields.reduce((s, f) => s + f.soilHealthScore, 0) / clientFields.length);
                    const firstTrend = clientFields.map(f => soilHealthTrends[f.id]).find(Boolean);
                    const baseline = firstTrend?.[0]?.score || 50;
                    const improvement = avgScore - baseline;
                    return (
                      <div key={cId}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{client?.farmName}</span>
                          <span className="text-sm font-bold text-green-deep">+{improvement} pts</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-deep rounded-full transition-all" style={{ width: `${avgScore}%` }} />
                        </div>
                        <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                          <span>Baseline: {baseline}</span>
                          <span>Current: {avgScore}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Season Summary */}
      {activeReport === 'season' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Season Summary — Spring 2026</h2>
            <Button variant="outline"><Download className="w-4 h-4" /> Export PDF</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clients.filter(c => c.contractStatus === 'active').slice(0, 6).map(client => {
              const clientFields = fields.filter(f => f.clientId === client.id);
              const clientTreatments = treatments.filter(t => t.clientId === client.id);
              const completed = clientTreatments.filter(t => t.status === 'completed').length;
              const avgScore = clientFields.length > 0
                ? Math.round(clientFields.reduce((s, f) => s + f.soilHealthScore, 0) / clientFields.length)
                : 0;
              return (
                <Card key={client.id}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{client.farmName}</h3>
                        <p className="text-sm text-gray-500">{client.name} — {client.location}</p>
                      </div>
                      <Badge variant="success" size="sm">{client.contractStatus}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-cream rounded-lg p-2">
                        <p className="text-lg font-bold">{clientFields.length}</p>
                        <p className="text-xs text-gray-500">Fields</p>
                      </div>
                      <div className="bg-cream rounded-lg p-2">
                        <p className="text-lg font-bold">{completed}/{clientTreatments.length}</p>
                        <p className="text-xs text-gray-500">Treatments</p>
                      </div>
                      <div className={`rounded-lg p-2 ${avgScore >= 70 ? 'bg-emerald-50' : avgScore >= 50 ? 'bg-amber-50' : 'bg-red-50'}`}>
                        <p className="text-lg font-bold">{avgScore}</p>
                        <p className="text-xs text-gray-500">Avg Score</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Treatment Compliance */}
      {activeReport === 'compliance' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Treatment Compliance Report</h2>
            <Button variant="outline"><Download className="w-4 h-4" /> Export PDF</Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-green-deep">{compliancePct}%</p>
                <p className="text-sm text-gray-500 mt-1">Overall Compliance</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-charcoal">{totalCompleted}</p>
                <p className="text-sm text-gray-500 mt-1">Treatments Completed</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-red-600">{treatments.filter(t => t.status === 'overdue').length}</p>
                <p className="text-sm text-gray-500 mt-1">Overdue</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <h3 className="text-base font-semibold">Scheduled vs. Completed by Month</h3>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={complianceChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }} />
                  <Legend />
                  <Bar dataKey="scheduled" fill="#B0BEC5" name="Scheduled" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="completed" fill="#1B5E20" name="Completed" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="overdue" fill="#EF4444" name="Overdue" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
