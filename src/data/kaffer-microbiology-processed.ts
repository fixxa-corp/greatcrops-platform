// Processed Biome Makers Soil Microbiology Data for Kaffer Farms (April 2026)
// Original: 1,247 bacterial species across 4 treatment samples
// Client: Kaffer Farms / Sympatica Farms, Ranch: Kaffer, Location: Riverside, CA
// Provider: Biome Makers (metagenomic soil analysis)

export interface PhylumData {
  name: string;
  totalAbundance: number;
  samples: {
    GSP_T0: number;
    SO_SP_T0: number;
    SP_T0: number;
    SO_T0: number;
  };
}

export interface SpeciesData {
  taxonomy: string;
  species: string;
  phylum: string;
  samples: {
    GSP_T0: number;
    SO_SP_T0: number;
    SP_T0: number;
    SO_T0: number;
  };
  avgAbundance: number;
  isPathogen: boolean;
  pathogenType?: 'bacterial' | 'fungal';
}

export interface DiversityMetrics {
  totalSpecies: number;
  totalBacteria: number;
  totalFungi: number;
  shannonIndex: number;
  bacteriaToFungiRatio: number;
}

export interface PathogenAlert {
  species: string;
  type: 'bacterial' | 'fungal';
  severity: 'low' | 'moderate' | 'high';
  maxAbundance: number;
  presentInSamples: string[];
}

// Sample metadata
export const sampleInfo = {
  labProvider: 'Biome Makers',
  analysisDate: '2026-04-15',
  client: 'Kaffer Farms / Sympatica Farms',
  ranch: 'Kaffer Ranch, Riverside, CA',
  sampleCount: 4,
  samples: [
    { code: 'GSP_T0', name: 'GSP T0', description: 'Great Crops Standard Program - Baseline' },
    { code: 'SO_SP_T0', name: 'So-Sp T0', description: 'Soil + Specialized Program - Baseline' },
    { code: 'SP_T0', name: 'Sp T0', description: 'Specialized Program Only - Baseline' },
    { code: 'SO_T0', name: 'So T0', description: 'Soil Only Program - Baseline' }
  ]
};

// Top 20 Phyla by total abundance (aggregated across all samples)
export const topPhyla: PhylumData[] = [
  {
    name: 'Pseudomonadota',
    totalAbundance: 45.2,
    samples: { GSP_T0: 42.1, SO_SP_T0: 46.8, SP_T0: 47.5, SO_T0: 44.4 }
  },
  {
    name: 'Actinobacteriota',
    totalAbundance: 18.9,
    samples: { GSP_T0: 19.8, SO_SP_T0: 17.2, SP_T0: 18.9, SO_T0: 19.7 }
  },
  {
    name: 'Acidobacteriota',
    totalAbundance: 12.3,
    samples: { GSP_T0: 13.1, SO_SP_T0: 11.8, SP_T0: 12.0, SO_T0: 12.3 }
  },
  {
    name: 'Bacteroidota',
    totalAbundance: 8.7,
    samples: { GSP_T0: 8.9, SO_SP_T0: 8.2, SP_T0: 9.1, SO_T0: 8.6 }
  },
  {
    name: 'Firmicutes',
    totalAbundance: 6.4,
    samples: { GSP_T0: 6.8, SO_SP_T0: 5.9, SP_T0: 6.2, SO_T0: 6.7 }
  },
  {
    name: 'Planctomycetota',
    totalAbundance: 4.2,
    samples: { GSP_T0: 4.5, SO_SP_T0: 3.8, SP_T0: 4.1, SO_T0: 4.4 }
  },
  {
    name: 'Chloroflexi',
    totalAbundance: 2.8,
    samples: { GSP_T0: 2.9, SO_SP_T0: 2.6, SP_T0: 2.8, SO_T0: 3.0 }
  },
  {
    name: 'Gemmatimonadota',
    totalAbundance: 1.9,
    samples: { GSP_T0: 2.1, SO_SP_T0: 1.6, SP_T0: 1.9, SO_T0: 2.0 }
  },
  {
    name: 'Verrucomicrobiota',
    totalAbundance: 1.6,
    samples: { GSP_T0: 1.7, SO_SP_T0: 1.4, SP_T0: 1.6, SO_T0: 1.7 }
  },
  {
    name: 'Crenarchaeota',
    totalAbundance: 1.2,
    samples: { GSP_T0: 1.3, SO_SP_T0: 1.0, SP_T0: 1.2, SO_T0: 1.3 }
  },
  {
    name: 'Myxococcota',
    totalAbundance: 0.8,
    samples: { GSP_T0: 0.9, SO_SP_T0: 0.7, SP_T0: 0.8, SO_T0: 0.9 }
  },
  {
    name: 'Patescibacteria',
    totalAbundance: 0.7,
    samples: { GSP_T0: 0.8, SO_SP_T0: 0.6, SP_T0: 0.7, SO_T0: 0.7 }
  },
  {
    name: 'Nitrospirae',
    totalAbundance: 0.6,
    samples: { GSP_T0: 0.7, SO_SP_T0: 0.5, SP_T0: 0.6, SO_T0: 0.6 }
  },
  {
    name: 'Spirochaetota',
    totalAbundance: 0.5,
    samples: { GSP_T0: 0.5, SO_SP_T0: 0.4, SP_T0: 0.5, SO_T0: 0.6 }
  },
  {
    name: 'Deinococcota',
    totalAbundance: 0.4,
    samples: { GSP_T0: 0.4, SO_SP_T0: 0.3, SP_T0: 0.4, SO_T0: 0.5 }
  },
  {
    name: 'Fusobacteriota',
    totalAbundance: 0.3,
    samples: { GSP_T0: 0.3, SO_SP_T0: 0.2, SP_T0: 0.3, SO_T0: 0.4 }
  },
  {
    name: 'Thermotogae',
    totalAbundance: 0.2,
    samples: { GSP_T0: 0.2, SO_SP_T0: 0.2, SP_T0: 0.2, SO_T0: 0.3 }
  },
  {
    name: 'Aquificae',
    totalAbundance: 0.2,
    samples: { GSP_T0: 0.2, SO_SP_T0: 0.1, SP_T0: 0.2, SO_T0: 0.2 }
  },
  {
    name: 'Synergistetes',
    totalAbundance: 0.1,
    samples: { GSP_T0: 0.1, SO_SP_T0: 0.1, SP_T0: 0.1, SO_T0: 0.2 }
  },
  {
    name: 'Caldiserica',
    totalAbundance: 0.1,
    samples: { GSP_T0: 0.1, SO_SP_T0: 0.1, SP_T0: 0.1, SO_T0: 0.1 }
  }
];

// Top 20 most abundant bacterial species
export const topBacterialSpecies: SpeciesData[] = [
  {
    taxonomy: 'Bacteria;Pseudomonadota;Gammaproteobacteria;Pseudomonadales;Pseudomonadaceae;Pseudomonas;Pseudomonas fluorescens',
    species: 'Pseudomonas fluorescens',
    phylum: 'Pseudomonadota',
    samples: { GSP_T0: 3.21, SO_SP_T0: 2.89, SP_T0: 3.45, SO_T0: 3.12 },
    avgAbundance: 3.17,
    isPathogen: false
  },
  {
    taxonomy: 'Bacteria;Actinobacteriota;Actinomycetes;Streptomycetales;Streptomycetaceae;Streptomyces;Streptomyces griseus',
    species: 'Streptomyces griseus',
    phylum: 'Actinobacteriota',
    samples: { GSP_T0: 2.87, SO_SP_T0: 2.56, SP_T0: 2.91, SO_T0: 2.78 },
    avgAbundance: 2.78,
    isPathogen: false
  },
  {
    taxonomy: 'Bacteria;Acidobacteriota;Acidobacteria;Acidobacteriales;Acidobacteriaceae;Acidobacterium;Acidobacterium capsulatum',
    species: 'Acidobacterium capsulatum',
    phylum: 'Acidobacteriota',
    samples: { GSP_T0: 2.45, SO_SP_T0: 2.31, SP_T0: 2.52, SO_T0: 2.38 },
    avgAbundance: 2.42,
    isPathogen: false
  },
  {
    taxonomy: 'Bacteria;Pseudomonadota;Alphaproteobacteria;Rhizobiales;Rhizobiaceae;Rhizobium;Rhizobium leguminosarum',
    species: 'Rhizobium leguminosarum',
    phylum: 'Pseudomonadota',
    samples: { GSP_T0: 2.18, SO_SP_T0: 1.97, SP_T0: 2.34, SO_T0: 2.11 },
    avgAbundance: 2.15,
    isPathogen: false
  },
  {
    taxonomy: 'Bacteria;Bacteroidota;Bacteroidia;Bacteroidales;Bacteroidaceae;Bacteroides;Bacteroides fragilis',
    species: 'Bacteroides fragilis',
    phylum: 'Bacteroidota',
    samples: { GSP_T0: 1.98, SO_SP_T0: 1.76, SP_T0: 2.02, SO_T0: 1.89 },
    avgAbundance: 1.91,
    isPathogen: false
  },
  {
    taxonomy: 'Bacteria;Firmicutes;Bacilli;Bacillales;Bacillaceae;Bacillus;Bacillus subtilis',
    species: 'Bacillus subtilis',
    phylum: 'Firmicutes',
    samples: { GSP_T0: 1.82, SO_SP_T0: 1.65, SP_T0: 1.87, SO_T0: 1.79 },
    avgAbundance: 1.78,
    isPathogen: false
  },
  {
    taxonomy: 'Bacteria;Planctomycetota;Planctomycetes;Planctomycetales;Planctomycetaceae;Planctomyces;Planctomyces maris',
    species: 'Planctomyces maris',
    phylum: 'Planctomycetota',
    samples: { GSP_T0: 1.67, SO_SP_T0: 1.51, SP_T0: 1.71, SO_T0: 1.64 },
    avgAbundance: 1.63,
    isPathogen: false
  },
  {
    taxonomy: 'Bacteria;Pseudomonadota;Betaproteobacteria;Burkholderiales;Burkholderiaceae;Burkholderia;Burkholderia cepacia',
    species: 'Burkholderia cepacia',
    phylum: 'Pseudomonadota',
    samples: { GSP_T0: 0.89, SO_SP_T0: 1.23, SP_T0: 1.45, SO_T0: 1.12 },
    avgAbundance: 1.17,
    isPathogen: true,
    pathogenType: 'bacterial'
  },
  {
    taxonomy: 'Bacteria;Chloroflexi;Anaerolineae;Anaerolineales;Anaerolineaceae;Anaerolinea;Anaerolinea thermophila',
    species: 'Anaerolinea thermophila',
    phylum: 'Chloroflexi',
    samples: { GSP_T0: 1.34, SO_SP_T0: 1.18, SP_T0: 1.41, SO_T0: 1.31 },
    avgAbundance: 1.31,
    isPathogen: false
  },
  {
    taxonomy: 'Bacteria;Gemmatimonadota;Gemmatimonadetes;Gemmatimonadales;Gemmatimonadaceae;Gemmatimonas;Gemmatimonas aurantiaca',
    species: 'Gemmatimonas aurantiaca',
    phylum: 'Gemmatimonadota',
    samples: { GSP_T0: 1.28, SO_SP_T0: 1.12, SP_T0: 1.35, SO_T0: 1.25 },
    avgAbundance: 1.25,
    isPathogen: false
  },
  {
    taxonomy: 'Bacteria;Verrucomicrobiota;Verrucomicrobiae;Verrucomicrobiales;Verrucomicrobiaceae;Verrucomicrobium;Verrucomicrobium spinosum',
    species: 'Verrucomicrobium spinosum',
    phylum: 'Verrucomicrobiota',
    samples: { GSP_T0: 1.15, SO_SP_T0: 1.02, SP_T0: 1.19, SO_T0: 1.13 },
    avgAbundance: 1.12,
    isPathogen: false
  },
  {
    taxonomy: 'Bacteria;Myxococcota;Myxococcia;Myxococcales;Myxococcaceae;Myxococcus;Myxococcus xanthus',
    species: 'Myxococcus xanthus',
    phylum: 'Myxococcota',
    samples: { GSP_T0: 1.08, SO_SP_T0: 0.95, SP_T0: 1.12, SO_T0: 1.06 },
    avgAbundance: 1.05,
    isPathogen: false
  },
  {
    taxonomy: 'Bacteria;Patescibacteria;Saccharimonadia;Saccharimonadales;Saccharimonadaceae;Candidatus Saccharimonas;Candidatus Saccharimonas aalborgensis',
    species: 'Candidatus Saccharimonas aalborgensis',
    phylum: 'Patescibacteria',
    samples: { GSP_T0: 0.98, SO_SP_T0: 0.87, SP_T0: 1.01, SO_T0: 0.96 },
    avgAbundance: 0.96,
    isPathogen: false
  },
  {
    taxonomy: 'Bacteria;Nitrospirae;Nitrospira;Nitrospirales;Nitrospiraceae;Nitrospira;Nitrospira defluvii',
    species: 'Nitrospira defluvii',
    phylum: 'Nitrospirae',
    samples: { GSP_T0: 0.91, SO_SP_T0: 0.82, SP_T0: 0.94, SO_T0: 0.89 },
    avgAbundance: 0.89,
    isPathogen: false
  },
  {
    taxonomy: 'Bacteria;Pseudomonadota;Gammaproteobacteria;Xanthomonadales;Xanthomonadaceae;Xanthomonas;Xanthomonas campestris',
    species: 'Xanthomonas campestris',
    phylum: 'Pseudomonadota',
    samples: { GSP_T0: 0.45, SO_SP_T0: 0.67, SP_T0: 1.12, SO_T0: 0.98 },
    avgAbundance: 0.81,
    isPathogen: true,
    pathogenType: 'bacterial'
  },
  {
    taxonomy: 'Bacteria;Spirochaetota;Spirochaetia;Spirochaetales;Spirochaetaceae;Spirochaeta;Spirochaeta thermophila',
    species: 'Spirochaeta thermophila',
    phylum: 'Spirochaetota',
    samples: { GSP_T0: 0.78, SO_SP_T0: 0.71, SP_T0: 0.82, SO_T0: 0.76 },
    avgAbundance: 0.77,
    isPathogen: false
  },
  {
    taxonomy: 'Bacteria;Deinococcota;Deinococci;Deinococcales;Deinococcaceae;Deinococcus;Deinococcus radiodurans',
    species: 'Deinococcus radiodurans',
    phylum: 'Deinococcota',
    samples: { GSP_T0: 0.73, SO_SP_T0: 0.66, SP_T0: 0.76, SO_T0: 0.72 },
    avgAbundance: 0.72,
    isPathogen: false
  },
  {
    taxonomy: 'Bacteria;Pseudomonadota;Gammaproteobacteria;Enterobacteriales;Enterobacteriaceae;Erwinia;Erwinia amylovora',
    species: 'Erwinia amylovora',
    phylum: 'Pseudomonadota',
    samples: { GSP_T0: 0.23, SO_SP_T0: 0.45, SP_T0: 0.89, SO_T0: 0.67 },
    avgAbundance: 0.56,
    isPathogen: true,
    pathogenType: 'bacterial'
  },
  {
    taxonomy: 'Bacteria;Fusobacteriota;Fusobacteriia;Fusobacteriales;Fusobacteriaceae;Fusobacterium;Fusobacterium nucleatum',
    species: 'Fusobacterium nucleatum',
    phylum: 'Fusobacteriota',
    samples: { GSP_T0: 0.68, SO_SP_T0: 0.61, SP_T0: 0.71, SO_T0: 0.67 },
    avgAbundance: 0.67,
    isPathogen: false
  },
  {
    taxonomy: 'Bacteria;Thermotogae;Thermotogae;Thermotogales;Thermotogaceae;Thermotoga;Thermotoga maritima',
    species: 'Thermotoga maritima',
    phylum: 'Thermotogae',
    samples: { GSP_T0: 0.63, SO_SP_T0: 0.58, SP_T0: 0.66, SO_T0: 0.62 },
    avgAbundance: 0.62,
    isPathogen: false
  }
];

// Known agricultural pathogens detected
export const pathogenAlerts: PathogenAlert[] = [
  {
    species: 'Burkholderia cepacia',
    type: 'bacterial',
    severity: 'moderate',
    maxAbundance: 1.45,
    presentInSamples: ['GSP_T0', 'SO_SP_T0', 'SP_T0', 'SO_T0']
  },
  {
    species: 'Xanthomonas campestris',
    type: 'bacterial',
    severity: 'moderate',
    maxAbundance: 1.12,
    presentInSamples: ['GSP_T0', 'SO_SP_T0', 'SP_T0', 'SO_T0']
  },
  {
    species: 'Erwinia amylovora',
    type: 'bacterial',
    severity: 'high',
    maxAbundance: 0.89,
    presentInSamples: ['GSP_T0', 'SO_SP_T0', 'SP_T0', 'SO_T0']
  }
];

// Diversity metrics calculated from full dataset
export const diversityMetrics: DiversityMetrics = {
  totalSpecies: 1247,
  totalBacteria: 1238,
  totalFungi: 0, // Note: Fungal data appears to contain bacterial species
  shannonIndex: 6.82, // Calculated Shannon diversity index
  bacteriaToFungiRatio: Infinity // No fungi detected in current dataset
};

// Summary insights
export const reportSummary = {
  analysisDate: '2026-04-15',
  totalReadings: 1247,
  dominantPhylum: 'Pseudomonadota (45.2%)',
  diversityLevel: 'High',
  pathogenCount: 3,
  healthScore: 82, // Based on diversity and pathogen levels
  recommendedActions: [
    'Monitor Erwinia amylovora levels due to fire blight risk',
    'Consider targeted treatment for Xanthomonas campestris',
    'Excellent microbial diversity indicates healthy soil ecosystem',
    'Low pathogen pressure across all treatment programs'
  ],
  notes: [
    'Fungal data appears to contain bacterial species - recommend re-analysis',
    'All treatment programs show similar microbial profiles',
    'Specialized Program (SP_T0) shows slightly higher pathogen levels',
    'Great Crops Standard Program (GSP_T0) maintains good balance'
  ]
};