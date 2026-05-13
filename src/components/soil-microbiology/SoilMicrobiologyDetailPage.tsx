import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Microscope, AlertTriangle, CheckCircle, Leaf, Bug, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  microbiologyReports,
  getBlockById,
  getRanchById,
  getClientById,
} from '../../data/great-crops-data';
import { formatDate } from '../../lib/utils';

export function SoilMicrobiologyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const report = microbiologyReports.find(r => r.id === id);

  if (!report) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Report not found.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/app/soil-microbiology')}>
          Back to Microbiology
        </Button>
      </div>
    );
  }

  const block = getBlockById(report.blockId);
  const ranch = getRanchById(block?.ranchId || '');
  const client = getClientById(block?.clientId || '');

  const getRiskColor = (pressure: string) => {
    switch (pressure) {
      case 'none': return 'text-green-600 bg-green-50 border-green-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getDiversityRating = (diversity: number) => {
    if (diversity >= 80) return { label: 'Excellent', color: 'text-green-600' };
    if (diversity >= 60) return { label: 'Good', color: 'text-green-500' };
    if (diversity >= 40) return { label: 'Moderate', color: 'text-orange-500' };
    return { label: 'Poor', color: 'text-red-500' };
  };

  const getBFRatioRating = (ratio: number) => {
    if (ratio >= 3 && ratio <= 5) return { label: 'Optimal', color: 'text-green-600' };
    if (ratio >= 2 && ratio <= 6) return { label: 'Good', color: 'text-green-500' };
    if (ratio >= 1.5 && ratio <= 8) return { label: 'Moderate', color: 'text-orange-500' };
    return { label: 'Poor', color: 'text-red-500' };
  };

  const diversityRating = getDiversityRating(report.microbialDiversity);
  const bfRatioRating = getBFRatioRating(report.bacteriaFungalRatio);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm">
        <button
          onClick={() => navigate('/app/soil-microbiology')}
          className="text-gray-500 hover:text-charcoal transition-colors"
        >
          <ArrowLeft className="w-4 h-4 inline mr-1" />Soil Microbiology
        </button>
        <span className="text-gray-300">/</span>
        <span className="text-charcoal">{block?.name} Report</span>
      </div>

      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center text-white flex-shrink-0">
            <Microscope className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-2xl font-bold text-charcoal">Soil Microbiology Report</h1>
                <p className="text-lg text-gray-500">{block?.name} • {ranch?.name}</p>
                <p className="text-sm text-gray-400">{client?.companyName}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    report.phytophthoraPressure === 'none' || report.phytophthoraPressure === 'low' ? 'success' :
                    report.phytophthoraPressure === 'moderate' ? 'warning' : 'danger'
                  }
                >
                  {report.phytophthoraPressure} risk
                </Badge>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <span>Report Date: {formatDate(report.date)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Disease Pressure Alert */}
      {report.phytophthoraDetected && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800">Phytophthora Detected</h3>
                <p className="text-red-700 mt-1">
                  Active pathogen presence with <strong>{report.phytophthoraPressure}</strong> pressure level.
                  Immediate intervention recommended to prevent spread and tree damage.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Microbial Diversity</span>
              <TrendingUp className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-charcoal">{report.microbialDiversity}</span>
              <span className={`text-sm font-medium ${diversityRating.color}`}>
                {diversityRating.label}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Bacteria:Fungi Ratio</span>
              <Microscope className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-charcoal">{report.bacteriaFungalRatio}</span>
              <span className={`text-sm font-medium ${bfRatioRating.color}`}>
                {bfRatioRating.label}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Microbial Biomass</span>
              <Bug className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-charcoal">{report.microbialBiomass}</span>
              <span className="text-sm text-gray-500">μg/g</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Organic Carbon</span>
              <Leaf className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-charcoal">{report.organicCarbon}</span>
              <span className="text-sm text-gray-500">%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Beneficial Organisms */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-charcoal">Beneficial Organisms</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                report.mycorrhizaePresent ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <Leaf className={`w-6 h-6 ${
                  report.mycorrhizaePresent ? 'text-green-600' : 'text-red-500'
                }`} />
              </div>
              <div>
                <h3 className="font-semibold text-charcoal">Mycorrhizae</h3>
                <p className={`text-sm ${
                  report.mycorrhizaePresent ? 'text-green-600' : 'text-red-500'
                }`}>
                  {report.mycorrhizaePresent ? 'Present' : 'Not Detected'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {report.mycorrhizaePresent
                    ? 'Enhancing nutrient uptake and plant health'
                    : 'Consider mycorrhizal inoculation'
                  }
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                report.trichodermaPresent ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <Bug className={`w-6 h-6 ${
                  report.trichodermaPresent ? 'text-green-600' : 'text-red-500'
                }`} />
              </div>
              <div>
                <h3 className="font-semibold text-charcoal">Trichoderma</h3>
                <p className={`text-sm ${
                  report.trichodermaPresent ? 'text-green-600' : 'text-red-500'
                }`}>
                  {report.trichodermaPresent ? 'Present' : 'Not Detected'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {report.trichodermaPresent
                    ? 'Natural disease suppression active'
                    : 'Consider biological inoculation'
                  }
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disease Pressure */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-charcoal">Disease Pressure Assessment</h2>
        </CardHeader>
        <CardContent>
          <div className={`p-6 border-2 rounded-lg ${getRiskColor(report.phytophthoraPressure)}`}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {report.phytophthoraDetected ? (
                  <AlertTriangle className="w-8 h-8" />
                ) : (
                  <CheckCircle className="w-8 h-8" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">
                  Phytophthora Risk: {report.phytophthoraPressure.charAt(0).toUpperCase() + report.phytophthoraPressure.slice(1)}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Detection Status:</span>
                    <p className="mt-1">
                      {report.phytophthoraDetected
                        ? 'Pathogen DNA/spores detected in soil sample'
                        : 'No pathogen presence detected'
                      }
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Risk Assessment:</span>
                    <p className="mt-1">
                      {report.phytophthoraPressure === 'none' && 'Excellent - No immediate concern'}
                      {report.phytophthoraPressure === 'low' && 'Good - Monitor conditions'}
                      {report.phytophthoraPressure === 'moderate' && 'Caution - Preventive measures recommended'}
                      {report.phytophthoraPressure === 'high' && 'Critical - Immediate intervention required'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      {report.notes && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-charcoal">Laboratory Notes</h2>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">{report.notes}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}