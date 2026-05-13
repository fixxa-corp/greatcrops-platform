import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, TreePine, Calendar, Droplets } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { PageHeader } from '../ui/PageHeader';
import { SearchInput } from '../ui/SearchInput';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import {
  blocks,
  getClientById,
  getRanchById,
} from '../../data/great-crops-data';

export function BlocksPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCrop, setFilterCrop] = useState<string>('all');

  const filtered = blocks.filter(b => {
    const ranch = getRanchById(b.ranchId);
    const client = getClientById(b.clientId);

    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.variety.toLowerCase().includes(search.toLowerCase()) ||
      ranch?.name.toLowerCase().includes(search.toLowerCase()) ||
      client?.companyName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = filterStatus === 'all' || b.healthStatus === filterStatus;
    const matchesCrop = filterCrop === 'all' || b.cropType === filterCrop;

    return matchesSearch && matchesStatus && matchesCrop;
  });

  const uniqueCrops = Array.from(new Set(blocks.map(b => b.cropType))).sort();

  return (
    <div>
      <PageHeader
        title="Blocks"
        subtitle={`${blocks.length} production blocks across ${new Set(blocks.map(b => b.ranchId)).size} ranches`}
        action={<Button><Plus className="w-4 h-4" /> Add Block</Button>}
      />

      <div className="flex flex-col lg:flex-row gap-3 mb-6">
        <div className="flex-1 max-w-md">
          <SearchInput value={search} onChange={setSearch} placeholder="Search blocks..." />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'healthy', 'attention', 'critical'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                filterStatus === status
                  ? 'bg-green-deep text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', ...uniqueCrops].map(crop => (
            <button
              key={crop}
              onClick={() => setFilterCrop(crop)}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                filterCrop === crop
                  ? 'bg-green-deep text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {crop === 'all' ? 'All Crops' : crop}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((block) => {
          const ranch = getRanchById(block.ranchId);
          const client = getClientById(block.clientId);
          const age = new Date().getFullYear() - block.plantingYear;

          return (
            <Card key={block.id} hover onClick={() => navigate(`/app/blocks/${block.id}`)}>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-light to-green-medium flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    <TreePine className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-charcoal">{block.name}</h3>
                        <p className="text-sm text-gray-500">{ranch?.name}</p>
                        <p className="text-xs text-gray-400">{client?.companyName}</p>
                      </div>
                      <StatusBadge status={block.healthStatus} />
                    </div>

                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium">{block.cropType}</span>
                        <span>•</span>
                        <span>{block.variety}</span>
                      </div>
                      {block.rootstock && (
                        <div className="text-xs text-gray-500">
                          Rootstock: {block.rootstock}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Planted {block.plantingYear} ({age} yrs old)</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Droplets className="w-3.5 h-3.5" />
                        <span>{block.irrigationType}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Soil: {block.soilType}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <Badge variant="neutral" size="sm">
                        {block.acreage} acres
                      </Badge>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${
                          block.soilHealthScore >= 80 ? 'text-green-600' :
                          block.soilHealthScore >= 60 ? 'text-orange-500' : 'text-red-500'
                        }`}>
                          {block.soilHealthScore}
                        </div>
                        <div className="text-xs text-gray-500">soil health</div>
                      </div>
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