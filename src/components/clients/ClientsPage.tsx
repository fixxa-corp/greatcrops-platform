import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MapPin, Phone, Mail } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { PageHeader } from '../ui/PageHeader';
import { SearchInput } from '../ui/SearchInput';
import { Badge } from '../ui/Badge';
import { StatusBadge } from '../ui/StatusBadge';
import { Button } from '../ui/Button';
import { clients, getRanchesByClient, getBlocksByClient } from '../../data/great-crops-data';
import { getInitials } from '../../lib/utils';

export function ClientsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = clients.filter(c => {
    const matchesSearch = c.companyName.toLowerCase().includes(search.toLowerCase()) ||
      c.contactName.toLowerCase().includes(search.toLowerCase()) ||
      c.county.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || c.contractStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <PageHeader
        title="Clients"
        subtitle={`${clients.length} agricultural enterprises across the Central Coast`}
        action={<Button><Plus className="w-4 h-4" /> Add Client</Button>}
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 max-w-md">
          <SearchInput value={search} onChange={setSearch} placeholder="Search clients..." />
        </div>
        <div className="flex gap-2">
          {['all', 'active', 'pending', 'expired'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                filterStatus === status
                  ? 'bg-green-deep text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {status === 'all' ? 'All Clients' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((client) => {
          const clientRanches = getRanchesByClient(client.id);
          const clientBlocks = getBlocksByClient(client.id);
          const totalAcreage = clientRanches.reduce((sum, ranch) => sum + ranch.totalAcreage, 0);
          const uniqueCrops = Array.from(new Set(clientBlocks.map(block => block.cropType)));

          return (
            <Card key={client.id} hover onClick={() => navigate(`/app/clients/${client.id}`)}>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-deep to-green-deep-light flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {getInitials(client.companyName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-charcoal">{client.companyName}</h3>
                        <p className="text-sm text-gray-500">{client.contactName}</p>
                      </div>
                      <StatusBadge status={client.contractStatus} />
                    </div>

                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{client.county} County</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Phone className="w-3.5 h-3.5" />
                        <span>{client.contactPhone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Mail className="w-3.5 h-3.5" />
                        <span>{client.contactEmail}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
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
                      <Badge variant="neutral" size="sm">
                        {clientRanches.length} ranches &middot; {totalAcreage} ac
                      </Badge>
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
