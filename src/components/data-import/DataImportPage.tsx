import { useState, useCallback } from 'react';
import {
  Upload,
  FileText,
  CheckCircle,
  AlertTriangle,
  Download,
  ArrowRight,
  MapPin,
  Database,
  FileBarChart,
  Droplets,
  Bug,
  X,
  Eye,
  Settings
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { PageHeader } from '../ui/PageHeader';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  data: string[][];
  headers: string[];
}

interface FieldMapping {
  sourceField: string;
  targetField: string;
  required: boolean;
  dataType: 'string' | 'number' | 'date' | 'boolean';
}

const DATA_TYPES = [
  {
    id: 'soiltech',
    name: 'SoilTech Sensor Data',
    icon: Database,
    color: 'bg-green-500',
    description: 'Temperature, humidity, CO2, electrical conductivity readings',
    fields: [
      { name: 'timestamp', required: true, type: 'date' as const },
      { name: 'soil_temperature', required: true, type: 'number' as const },
      { name: 'ambient_temperature', required: true, type: 'number' as const },
      { name: 'humidity', required: true, type: 'number' as const },
      { name: 'co2_ppm', required: true, type: 'number' as const },
      { name: 'electrical_conductivity', required: false, type: 'number' as const },
      { name: 'moisture_percent', required: false, type: 'number' as const }
    ]
  },
  {
    id: 'biome_makers',
    name: 'Biome Makers Report',
    icon: Bug,
    color: 'bg-purple-500',
    description: 'Microbial species taxonomy and abundance data',
    fields: [
      { name: 'taxonomy', required: true, type: 'string' as const },
      { name: 'species_name', required: true, type: 'string' as const },
      { name: 'sample_1_percent', required: true, type: 'number' as const },
      { name: 'sample_2_percent', required: false, type: 'number' as const },
      { name: 'sample_3_percent', required: false, type: 'number' as const },
      { name: 'sample_4_percent', required: false, type: 'number' as const }
    ]
  },
  {
    id: 'soil_chemistry',
    name: 'Lab Chemistry Results',
    icon: FileBarChart,
    color: 'bg-blue-500',
    description: 'Soil pH, nutrients, organic matter analysis',
    fields: [
      { name: 'sample_date', required: true, type: 'date' as const },
      { name: 'ph', required: true, type: 'number' as const },
      { name: 'organic_matter', required: true, type: 'number' as const },
      { name: 'nitrogen', required: true, type: 'number' as const },
      { name: 'phosphorus', required: true, type: 'number' as const },
      { name: 'potassium', required: true, type: 'number' as const },
      { name: 'calcium', required: false, type: 'number' as const },
      { name: 'magnesium', required: false, type: 'number' as const }
    ]
  },
  {
    id: 'water_analysis',
    name: 'Water Analysis',
    icon: Droplets,
    color: 'bg-cyan-500',
    description: 'Irrigation water quality and chemical composition',
    fields: [
      { name: 'sample_date', required: true, type: 'date' as const },
      { name: 'ph', required: true, type: 'number' as const },
      { name: 'ec_dsm', required: true, type: 'number' as const },
      { name: 'sodium', required: true, type: 'number' as const },
      { name: 'chloride', required: true, type: 'number' as const },
      { name: 'sar', required: false, type: 'number' as const },
      { name: 'hardness', required: false, type: 'number' as const }
    ]
  }
];

export function DataImportPage() {
  const [step, setStep] = useState<'upload' | 'preview' | 'mapping' | 'confirm'>('upload');
  const [selectedDataType, setSelectedDataType] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [fieldMappings, setFieldMappings] = useState<FieldMapping[]>([]);
  const [importSuccess, setImportSuccess] = useState(false);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      const data = lines.slice(1).map(line => line.split(',').map(cell => cell.trim().replace(/"/g, '')));

      setUploadedFile({
        name: file.name,
        size: file.size,
        type: file.type,
        data,
        headers
      });
      setStep('preview');
    };
    reader.readAsText(file);
  }, []);

  const handleDataTypeSelect = (dataType: string) => {
    setSelectedDataType(dataType);
    if (uploadedFile) {
      const type = DATA_TYPES.find(dt => dt.id === dataType);
      if (type) {
        // Auto-map fields where possible
        const mappings: FieldMapping[] = type.fields.map(field => {
          const possibleMatches = uploadedFile.headers.filter(header =>
            header.toLowerCase().includes(field.name.toLowerCase()) ||
            field.name.toLowerCase().includes(header.toLowerCase())
          );
          return {
            sourceField: possibleMatches[0] || '',
            targetField: field.name,
            required: field.required,
            dataType: field.type
          };
        });
        setFieldMappings(mappings);
        setStep('mapping');
      }
    }
  };

  const handleMappingChange = (index: number, sourceField: string) => {
    const newMappings = [...fieldMappings];
    newMappings[index].sourceField = sourceField;
    setFieldMappings(newMappings);
  };

  const handleImport = () => {
    // Simulate import process
    setTimeout(() => {
      setImportSuccess(true);
    }, 2000);
  };

  const selectedType = DATA_TYPES.find(dt => dt.id === selectedDataType);
  const mappedFields = fieldMappings.filter(m => m.sourceField);
  const requiredFieldsMapped = fieldMappings.filter(m => m.required && m.sourceField).length;
  const totalRequiredFields = fieldMappings.filter(m => m.required).length;
  const canProceed = requiredFieldsMapped === totalRequiredFields;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Data Import"
        subtitle="Upload and import CSV/Excel files into the Great Crops platform"
      />

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {[
              { key: 'upload', label: 'Upload File', icon: Upload },
              { key: 'preview', label: 'Preview & Type', icon: Eye },
              { key: 'mapping', label: 'Field Mapping', icon: MapPin },
              { key: 'confirm', label: 'Import', icon: CheckCircle }
            ].map((s, index) => {
              const Icon = s.icon;
              const isActive = step === s.key;
              const isCompleted = ['upload', 'preview', 'mapping', 'confirm'].indexOf(step) > index;

              return (
                <div key={s.key} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted ? 'bg-green-500 text-white' :
                    isActive ? 'bg-green-deep text-white' :
                    'bg-gray-200 text-gray-500'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`ml-3 text-sm font-medium ${
                    isActive ? 'text-charcoal' : 'text-gray-500'
                  }`}>
                    {s.label}
                  </span>
                  {index < 3 && <ArrowRight className="w-5 h-5 text-gray-300 mx-4" />}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      {step === 'upload' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Area */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-charcoal">Upload CSV File</h2>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-charcoal mb-2">Choose a file to upload</h3>
                <p className="text-gray-500 mb-4">Support for CSV and Excel files up to 50MB</p>
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Select File
                </label>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 text-blue-700 mb-2">
                  <Settings className="w-4 h-4" />
                  <span className="font-medium">Under Construction</span>
                </div>
                <p className="text-sm text-blue-600">
                  Full automated import via API integration coming soon.
                  This demo shows the user interface and workflow.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Sample Files */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-charcoal">Sample Files</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Download sample files to test the import process:</p>
              <div className="space-y-3">
                {DATA_TYPES.map(type => {
                  const Icon = type.icon;
                  return (
                    <div key={type.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded ${type.color} flex items-center justify-center`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-charcoal">{type.name}</div>
                          <div className="text-sm text-gray-500">{type.description}</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        CSV
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {step === 'preview' && uploadedFile && (
        <div className="space-y-6">
          {/* File Info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-green-500" />
                  <div>
                    <h3 className="font-semibold text-charcoal">{uploadedFile.name}</h3>
                    <p className="text-sm text-gray-500">
                      {(uploadedFile.size / 1024).toFixed(1)} KB • {uploadedFile.data.length} rows • {uploadedFile.headers.length} columns
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setUploadedFile(null);
                    setStep('upload');
                  }}
                >
                  <X className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Data Type Selection */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-charcoal">Select Data Type</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {DATA_TYPES.map(type => {
                  const Icon = type.icon;
                  return (
                    <div
                      key={type.id}
                      onClick={() => handleDataTypeSelect(type.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedDataType === type.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded ${type.color} flex items-center justify-center mb-3`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-medium text-charcoal mb-1">{type.name}</h3>
                      <p className="text-sm text-gray-500">{type.description}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Data Preview */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-charcoal">Data Preview</h2>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b">
                      {uploadedFile.headers.map((header, index) => (
                        <th key={index} className="text-left py-2 px-3 font-medium text-charcoal bg-gray-50">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {uploadedFile.data.slice(0, 5).map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-b">
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="py-2 px-3 text-gray-700">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Showing first 5 rows of {uploadedFile.data.length} total rows
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {step === 'mapping' && uploadedFile && selectedType && (
        <div className="space-y-6">
          {/* Mapping Progress */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-charcoal">Field Mapping Progress</h2>
                <div className="flex items-center gap-2">
                  <Badge variant={canProceed ? 'success' : 'warning'}>
                    {requiredFieldsMapped}/{totalRequiredFields} required fields mapped
                  </Badge>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${(requiredFieldsMapped / totalRequiredFields) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Field Mappings */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-charcoal">Map Fields</h2>
              <p className="text-sm text-gray-600">
                Match your file's columns to the Great Crops data fields
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fieldMappings.map((mapping, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-charcoal">{mapping.targetField}</span>
                        {mapping.required && <Badge variant="danger" size="sm">Required</Badge>}
                      </div>
                      <div className="text-sm text-gray-500 capitalize">{mapping.dataType} field</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                      <select
                        value={mapping.sourceField}
                        onChange={(e) => handleMappingChange(index, e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">Select source field...</option>
                        {uploadedFile.headers.map(header => (
                          <option key={header} value={header}>{header}</option>
                        ))}
                      </select>
                    </div>
                    <div className="w-8">
                      {mapping.sourceField && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                      {!mapping.sourceField && mapping.required && (
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep('preview')}
                >
                  Back to Preview
                </Button>
                <Button
                  onClick={() => setStep('confirm')}
                  disabled={!canProceed}
                  className={`${!canProceed ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Continue to Import
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {step === 'confirm' && (
        <div className="space-y-6">
          {!importSuccess ? (
            <>
              {/* Import Summary */}
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold text-charcoal">Import Summary</h2>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-medium text-charcoal mb-2">File Details</h3>
                      <div className="text-sm space-y-1">
                        <div>Name: {uploadedFile?.name}</div>
                        <div>Rows: {uploadedFile?.data.length}</div>
                        <div>Type: {selectedType?.name}</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-charcoal mb-2">Field Mappings</h3>
                      <div className="text-sm space-y-1">
                        <div>Mapped: {mappedFields.length} fields</div>
                        <div>Required: {requiredFieldsMapped}/{totalRequiredFields}</div>
                        <div>Ready: <span className="text-green-600">Yes</span></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-charcoal mb-2">Import Action</h3>
                      <div className="text-sm space-y-1">
                        <div>Records to process: {uploadedFile?.data.length}</div>
                        <div>Estimated time: &lt; 1 minute</div>
                        <div>Validation: Enabled</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Database className="w-16 h-16 mx-auto text-green-500 mb-4" />
                  <h3 className="text-lg font-semibold text-charcoal mb-2">Ready to Import</h3>
                  <p className="text-gray-600 mb-6">
                    Your data has been validated and is ready to import into the Great Crops platform.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button variant="outline" onClick={() => setStep('mapping')}>
                      Back to Mapping
                    </Button>
                    <Button onClick={handleImport}>
                      <Database className="w-4 h-4 mr-2" />
                      Start Import
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            /* Import Success */
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-20 h-20 mx-auto text-green-500 mb-4" />
                <h3 className="text-xl font-semibold text-charcoal mb-2">Import Successful!</h3>
                <p className="text-gray-600 mb-6">
                  Your data has been successfully imported into the Great Crops platform.
                  {uploadedFile?.data.length} rows processed.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setStep('upload');
                      setUploadedFile(null);
                      setSelectedDataType('');
                      setFieldMappings([]);
                      setImportSuccess(false);
                    }}
                  >
                    Import Another File
                  </Button>
                  <Button onClick={() => window.location.href = '/app'}>
                    View Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}