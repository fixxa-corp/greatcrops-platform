import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MapPin, TreePine, Droplets } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { PageHeader } from '../ui/PageHeader';
import { SearchInput } from '../ui/SearchInput';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  ranches,
  getBlocksByRanch,
  getClientById
} from '../../data/great-crops-data';

export function RanchesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterServices, setFilterServices] = useState<string>('all');

  const filtered = ranches.filter(r => {
    const client = getClientById(r.clientId);
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.location.toLowerCase().includes(search.toLowerCase()) ||
      client?.companyName.toLowerCase().includes(search.toLowerCase());

    const matchesServices = filterServices === 'all' ||
      (filterServices === 'full' && Object.values(r.services).every(s => s)) ||
      (filterServices === 'partial' && Object.values(r.services).some(s => s) && !Object.values(r.services).every(s => s));

    return matchesSearch && matchesServices;
  });

  return (
    <div>
      <PageHeader
        title="Ranches"
        subtitle={`${ranches.length} ranch properties across ${new Set(ranches.map(r => getClientById(r.clientId)?.county)).size} counties`}
        action={<Button><Plus className="w-4 h-4" /> Add Ranch</Button>}
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 max-w-md">
          <SearchInput value={search} onChange={setSearch} placeholder="Search ranches..." />
        </div>
        <div className="flex gap-2">
          {['all', 'full', 'partial'].map(filter => (
            <button
              key={filter}
              onClick={() => setFilterServices(filter)}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                filterServices === filter
                  ? 'bg-green-deep text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {filter === 'all' ? 'All Ranches' :
               filter === 'full' ? 'Full Program' : 'Partial Program'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((ranch) => {
          const client = getClientById(ranch.clientId);
          const ranchBlocks = getBlocksByRanch(ranch.id);
          const uniqueCrops = Array.from(new Set(ranchBlocks.map(block => block.cropType)));
          const activeServices = Object.entries(ranch.services)
            .filter(([_, active]) => active)
            .map(([service, _]) => service);

          return (
            <Card key={ranch.id} hover onClick={() => navigate(`/app/ranches/${ranch.id}`)}>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-medium to-green-deep flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    <TreePine className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-charcoal">{ranch.name}</h3>
                        <p className="text-sm text-gray-500">{client?.companyName}</p>
                      </div>
                      <Badge variant="neutral" size="sm">
                        {activeServices.length}/4 services
                      </Badge>
                    </div>

                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{ranch.location}</span>
                      </div>
                      {ranch.elevation && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="w-3.5 h-3.5 flex items-center justify-center text-xs">⛰️</span>
                          <span>{ranch.elevation}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Droplets className="w-3.5 h-3.5" />
                        <span>{ranch.waterSource}</span>
                      </div>
                    </div>

                    <div className="mt-3 space-y-2">
                      <div className="flex gap-1.5">
                        {uniqueCrops.slice(0, 3).map(crop => (
                          <span key={crop} className="px-2 py-0.5 text-xs rounded-full font-medium bg-green-light text-green-deep">
                            {crop}
                          </span>
                        ))}
                        {uniqueCrops.length > 3 && (
                          <span className="px-2 py-0.5 text-xs rounded-full font-medium bg-gray-100 text-gray-600">
                            +{uniqueCrops.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-1">
                        {activeServices.map(service => (
                          <div key={service} className="w-2 h-2 rounded-full bg-green-500" title={service.replace('_', ' ')} />
                        ))}
                        {Array.from({ length: 4 - activeServices.length }).map((_, i) => (
                          <div key={i} className="w-2 h-2 rounded-full bg-gray-300" />
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <Badge variant="neutral" size="sm">
                        {ranchBlocks.length} blocks
                      </Badge>
                      <span className="text-sm font-medium text-charcoal">{ranch.totalAcreage} ac</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}