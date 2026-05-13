import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Mail, Calendar, Building2, TreePine } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import { Badge } from '../ui/Badge';
import {
  getClientById,
  getRanchesByClient,
  getBlocksByClient,
} from '../../data/great-crops-data';
import { formatDate, getInitials } from '../../lib/utils';

export function ClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const client = getClientById(id!);

  if (!client) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Client not found.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/app/clients')}>Back to Clients</Button>
      </div>
    );
  }

  const clientRanches = getRanchesByClient(client.id);
  const clientBlocks = getBlocksByClient(client.id);
  const totalAcreage = clientRanches.reduce((sum, ranch) => sum + ranch.totalAcreage, 0);
  const uniqueCrops = Array.from(new Set(clientBlocks.map(block => block.cropType)));

  const serviceStats = {
    soil_microbiology: clientRanches.filter(r => r.services.soil_microbiology).length,
    remote_sensing: clientRanches.filter(r => r.services.remote_sensing).length,
    soil_chemistry: clientRanches.filter(r => r.services.soil_chemistry).length,
    irrigation_water: clientRanches.filter(r => r.services.irrigation_water).length,
  };

  return (
    <div className="space-y-6">
      <button onClick={() => navigate('/app/clients')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-charcoal transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Clients
      </button>

      {/* Client Header */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-deep to-green-deep-light flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
            {getInitials(client.companyName)}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-2xl font-bold text-charcoal">{client.companyName}</h1>
                <p className="text-lg text-gray-500">Contact: {client.contactName}</p>
              </div>
              <StatusBadge status={client.contractStatus} />
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{client.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{client.contactPhone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{client.contactEmail}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Enrolled {formatDate(client.enrollmentDate)}</span>
              </div>
            </div>

            {client.notes && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">{client.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-green-deep" />
              <div>
                <p className="text-2xl font-bold text-charcoal">{clientRanches.length}</p>
                <p className="text-sm text-gray-500">Ranches</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TreePine className="w-8 h-8 text-green-medium" />
              <div>
                <p className="text-2xl font-bold text-charcoal">{clientBlocks.length}</p>
                <p className="text-sm text-gray-500">Blocks</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-8 h-8 text-wheat" />
              <div>
                <p className="text-2xl font-bold text-charcoal">{totalAcreage.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Total Acres</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-light flex items-center justify-center text-green-deep font-semibold">
                {uniqueCrops.length}
              </div>
              <div>
                <p className="text-2xl font-bold text-charcoal">{uniqueCrops.join(', ')}</p>
                <p className="text-sm text-gray-500">Crop Types</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Overview */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-charcoal">Great Crops Services</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-green-deep"></div>
                <h3 className="font-medium">Soil Microbiology</h3>
              </div>
              <p className="text-2xl font-bold text-charcoal">{serviceStats.soil_microbiology}</p>
              <p className="text-sm text-gray-500">of {clientRanches.length} ranches</p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <h3 className="font-medium">Remote Sensing</h3>
              </div>
              <p className="text-2xl font-bold text-charcoal">{serviceStats.remote_sensing}</p>
              <p className="text-sm text-gray-500">of {clientRanches.length} ranches</p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <h3 className="font-medium">Soil Chemistry</h3>
              </div>
              <p className="text-2xl font-bold text-charcoal">{serviceStats.soil_chemistry}</p>
              <p className="text-sm text-gray-500">of {clientRanches.length} ranches</p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                <h3 className="font-medium">Water Chemistry</h3>
              </div>
              <p className="text-2xl font-bold text-charcoal">{serviceStats.irrigation_water}</p>
              <p className="text-sm text-gray-500">of {clientRanches.length} ranches</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ranches */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-charcoal">Ranches</h2>
            <Button variant="outline" size="sm">
              <TreePine className="w-4 h-4" /> Add Ranch
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clientRanches.map((ranch) => {
              const ranchBlocks = getBlocksByClient(client.id).filter(b => b.ranchId === ranch.id);
              const activeServices = Object.entries(ranch.services)
                .filter(([_, active]) => active)
                .map(([service, _]) => service);

              return (
                <div key={ranch.id} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                     onClick={() => navigate(`/app/ranches/${ranch.id}`)}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-charcoal">{ranch.name}</h3>
                        <Badge variant="neutral" size="sm">
                          {ranchBlocks.length} blocks &middot; {ranch.totalAcreage} ac
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{ranch.location}</p>
                      <p className="text-xs text-gray-400 mt-1">Water: {ranch.waterSource}</p>

                      <div className="flex gap-2 mt-3">
                        {activeServices.map(service => (
                          <span key={service} className="px-2 py-1 text-xs rounded-full bg-green-light text-green-deep">
                            {service.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-medium text-charcoal">{ranchBlocks.length} blocks</p>
                      <p className="text-xs text-gray-500">
                        {Array.from(new Set(ranchBlocks.map(b => b.cropType))).join(', ')}
                      </p>
                    </div>
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