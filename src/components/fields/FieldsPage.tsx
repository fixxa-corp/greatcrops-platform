import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowUpDown } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { PageHeader } from '../ui/PageHeader';
import { SearchInput } from '../ui/SearchInput';
import { StatusBadge } from '../ui/StatusBadge';
import { Button } from '../ui/Button';
import { fields, clients } from '../../data/mock-data';
import { cropTypeLabel, cropTypeColor } from '../../lib/utils';

export function FieldsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterCrop, setFilterCrop] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'score' | 'acreage'>('name');

  const filtered = fields
    .filter(f => {
      const client = clients.find(c => c.id === f.clientId);
      const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
        client?.farmName.toLowerCase().includes(search.toLowerCase()) || false;
      const matchesCrop = filterCrop === 'all' || f.cropType === filterCrop;
      return matchesSearch && matchesCrop;
    })
    .sort((a, b) => {
      if (sortBy === 'score') return b.soilHealthScore - a.soilHealthScore;
      if (sortBy === 'acreage') return b.acreage - a.acreage;
      return a.name.localeCompare(b.name);
    });

  return (
    <div>
      <PageHeader
        title="Fields & Orchards"
        subtitle={`${fields.length} fields across ${fields.reduce((s, f) => s + f.acreage, 0).toLocaleString()} acres`}
        action={<Button><Plus className="w-4 h-4" /> Add Field</Button>}
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 max-w-md">
          <SearchInput value={search} onChange={setSearch} placeholder="Search fields..." />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'avocado', 'almond', 'citrus', 'grape'].map(crop => (
            <button
              key={crop}
              onClick={() => setFilterCrop(crop)}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                filterCrop === crop
                  ? 'bg-green-deep text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {crop === 'all' ? 'All' : cropTypeLabel(crop)}
            </button>
          ))}
          <button
            onClick={() => setSortBy(sortBy === 'score' ? 'name' : sortBy === 'name' ? 'acreage' : 'score')}
            className="px-3 py-1.5 text-sm rounded-lg font-medium bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 flex items-center gap-1.5"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            {sortBy === 'score' ? 'By Score' : sortBy === 'acreage' ? 'By Acreage' : 'By Name'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(field => {
          const client = clients.find(c => c.id === field.clientId);
          return (
            <Card key={field.id} hover onClick={() => navigate(`/app/fields/${field.id}`)}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-charcoal">{field.name}</h3>
                    <p className="text-sm text-gray-500">{client?.farmName}</p>
                  </div>
                  <StatusBadge status={field.healthStatus} />
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${cropTypeColor(field.cropType)}`}>
                    {cropTypeLabel(field.cropType)}
                  </span>
                  <span className="text-xs text-gray-400">{field.variety}</span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-cream rounded-lg p-2">
                    <p className="text-lg font-bold text-charcoal">{field.acreage}</p>
                    <p className="text-xs text-gray-500">Acres</p>
                  </div>
                  <div className="bg-cream rounded-lg p-2">
                    <p className="text-lg font-bold text-charcoal">{field.plantingYear}</p>
                    <p className="text-xs text-gray-500">Planted</p>
                  </div>
                  <div className={`rounded-lg p-2 ${
                    field.soilHealthScore >= 70 ? 'bg-emerald-50' :
                    field.soilHealthScore >= 50 ? 'bg-amber-50' : 'bg-red-50'
                  }`}>
                    <p className={`text-lg font-bold ${
                      field.soilHealthScore >= 70 ? 'text-emerald-700' :
                      field.soilHealthScore >= 50 ? 'text-amber-700' : 'text-red-700'
                    }`}>{field.soilHealthScore}</p>
                    <p className="text-xs text-gray-500">Soil Score</p>
                  </div>
                </div>

                <div className="mt-3 text-xs text-gray-400">
                  {field.irrigationType} &middot; {field.location}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
