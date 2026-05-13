import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, TreePine, Droplets, Building2, ToggleLeft, ToggleRight, Plus } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  getRanchById,
  getClientById,
  getBlocksByRanch,
  getProbesByRanch,
  getWaterChemistryByRanch,
} from '../../data/great-crops-data';

export function RanchDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const ranch = getRanchById(id!);

  if (!ranch) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Ranch not found.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/app/ranches')}>Back to Ranches</Button>
      </div>
    );
  }

  const client = getClientById(ranch.clientId);
  const ranchBlocks = getBlocksByRanch(ranch.id);
  const ranchProbes = getProbesByRanch(ranch.id);
  const waterReports = getWaterChemistryByRanch(ranch.id);

  const uniqueCrops = Array.from(new Set(ranchBlocks.map(block => block.cropType)));
  const healthyBlocks = ranchBlocks.filter(b => b.healthStatus === 'healthy').length;
  const attentionBlocks = ranchBlocks.filter(b => b.healthStatus === 'attention').length;
  const criticalBlocks = ranchBlocks.filter(b => b.healthStatus === 'critical').length;

  const serviceNames = {
    soil_microbiology: 'Soil Microbiology & Disease Pressure',
    remote_sensing: 'Remote Sensing (AgSpy/SoilTech/Agrology)',
    soil_chemistry: 'Soil Chemistry',
    irrigation_water: 'Irrigation & Water Chemistry'
  };

  const serviceColors = {
    soil_microbiology: 'bg-green-500',
    remote_sensing: 'bg-blue-500',
    soil_chemistry: 'bg-orange-500',
    irrigation_water: 'bg-cyan-500'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/app/clients')}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-charcoal transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Clients
        </button>
        <span className="text-gray-300">/</span>
        <button
          onClick={() => navigate(`/app/clients/${client?.id}`)}
          className="text-sm text-gray-500 hover:text-charcoal transition-colors"
        >
          {client?.companyName}
        </button>
        <span className="text-gray-300">/</span>
        <span className="text-sm text-charcoal">{ranch.name}</span>
      </div>

      {/* Ranch Header */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-medium to-green-deep flex items-center justify-center text-white flex-shrink-0">
            <TreePine className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-2xl font-bold text-charcoal">{ranch.name}</h1>
                <p className="text-lg text-gray-500">{client?.companyName}</p>
              </div>
              <Badge variant="neutral">
                {Object.values(ranch.services).filter(Boolean).length}/4 services
              </Badge>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{ranch.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Droplets className="w-4 h-4" />
                <span>{ranch.waterSource}</span>
              </div>
              {ranch.elevation && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>⛰️</span>
                  <span>{ranch.elevation}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">{ranch.totalAcreage} acres</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Toggles */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-charcoal">Great Crops Services</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(ranch.services).map(([service, enabled]) => (
              <div key={service} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${enabled ? serviceColors[service as keyof typeof serviceColors] : 'bg-gray-300'}`} />
                  <div>
                    <h3 className="font-medium text-charcoal">
                      {serviceNames[service as keyof typeof serviceNames]}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {enabled ? 'Active service' : 'Not enabled'}
                    </p>
                  </div>
                </div>
                {enabled ? (
                  <ToggleRight className="w-8 h-8 text-green-500" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TreePine className="w-8 h-8 text-green-deep" />
              <div>
                <p className="text-2xl font-bold text-charcoal">{ranchBlocks.length}</p>
                <p className="text-sm text-gray-500">Blocks</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">✓</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{healthyBlocks}</p>
                <p className="text-sm text-gray-500">Healthy</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="text-orange-600 font-bold text-sm">!</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">{attentionBlocks}</p>
                <p className="text-sm text-gray-500">Attention</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-red-600 font-bold text-sm">⚠</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{criticalBlocks}</p>
                <p className="text-sm text-gray-500">Critical</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Blocks */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-charcoal">Blocks</h2>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4" /> Add Block
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ranchBlocks.map((block) => (
              <div key={block.id}
                   className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                   onClick={() => navigate(`/app/blocks/${block.id}`)}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-charcoal">{block.name}</h3>
                      <Badge
                        variant={
                          block.healthStatus === 'healthy' ? 'success' :
                          block.healthStatus === 'attention' ? 'warning' : 'danger'
                        }
                        size="sm"
                      >
                        {block.healthStatus}
                      </Badge>
                    </div>

                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                      <span>{block.cropType} • {block.variety}</span>
                      <span>{block.acreage} ac</span>
                      <span>Planted {block.plantingYear}</span>
                      <span>{block.soilType}</span>
                    </div>

                    {block.rootstock && (
                      <div className="mt-1 text-xs text-gray-500">
                        Rootstock: {block.rootstock}
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold text-charcoal">{block.soilHealthScore}</div>
                    <div className="text-xs text-gray-500">soil health</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}