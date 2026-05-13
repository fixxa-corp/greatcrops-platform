import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const programs = [
  {
    title: 'Soil Health Assessment & Baseline Analysis',
    description: 'Comprehensive evaluation of current soil conditions including organic carbon content, macro- and micronutrient profiles, microbial biomass indices, pathogen screening, and water quality analysis. Establishes quantitative baselines for program design and outcome measurement.',
    outcomes: [
      'Complete soil composition profile (N-P-K, Ca, Mg, S, micronutrients)',
      'Organic carbon baseline with historical comparison where available',
      'Microbial diversity and biomass index',
      'Phytophthora and soil-borne pathogen screen',
      'Detailed assessment report with program recommendations',
    ],
    data: 'Average program sites show 75% increase in soil organic carbon within 3 years of baseline assessment and program initiation.',
  },
  {
    title: 'Organic Carbon Nutrition Programs',
    description: 'Custom-designed soil nutrition programs utilizing the 6-material water-applied system. Each program is calibrated to specific soil profiles, crop requirements, and phenological timing. Materials are delivered through existing micro-irrigation infrastructure with seasonal adjustments based on ongoing lab analysis.',
    outcomes: [
      'Crop- and site-specific material selection and application rates',
      'Phenologically-aligned application schedule',
      'Integration with existing fertility and pest management programs',
      'Seasonal rate adjustments based on quarterly soil and tissue analysis',
      'Organic-compatible formulations available for certified operations',
    ],
    data: 'Mean yield increase of 40% observed across 3-year program cycles (n=48 sample points, 12 sites).',
  },
  {
    title: 'Phytophthora Suppression Protocol',
    description: 'Integrated biological approach to managing Phytophthora cinnamomi and P. citricola in avocado and citrus root systems. The protocol combines competitive exclusion organisms, root-zone carbon enhancement, and drainage assessment to reduce pathogen pressure through ecological rather than chemical means.',
    outcomes: [
      'Pathogen pressure mapping and quantitative disease assessment',
      'Competitive exclusion organism inoculation program',
      'Root-zone carbon enhancement for biological suppression',
      'Drainage evaluation and remediation recommendations',
      'Quarterly monitoring with disease pressure trend analysis',
    ],
    data: '82% mean reduction in Phytophthora incidence documented across treated avocado sites (Aguayo, 2021).',
  },
  {
    title: 'Orchard Systems Consulting',
    description: 'Holistic management consulting for permanent crop operations, integrating soil health programs with irrigation efficiency, canopy management, crop load optimization, and long-term grove planning. Emphasis on building resilient production systems that sustain high yields over decades.',
    outcomes: [
      'Irrigation system efficiency evaluation and recommendations',
      'Canopy management and light interception optimization',
      'Rootstock and variety selection guidance for new plantings',
      'Long-term grove planning and replant strategies',
      'Harvest timing and crop load management',
    ],
    data: 'Water infiltration rates improved by 163% on average across monitored sites, reducing irrigation requirements.',
  },
  {
    title: 'Field Monitoring & Data Collection',
    description: 'Systematic on-site monitoring program with regular field visits, soil sampling, root health assessments, and photographic documentation. All data is collected using standardized protocols and made available through a secure digital platform for ongoing review.',
    outcomes: [
      'Bi-weekly to monthly on-site monitoring visits',
      'Standardized soil, root, and canopy observation protocols',
      'Photographic documentation with GPS-tagged records',
      'Treatment verification and efficacy assessment',
      'Integrated pest and disease scouting',
    ],
    data: 'Root density scores improved 119% (2.1 to 4.6) across monitored sites over 3-year program cycles.',
  },
  {
    title: 'Laboratory Analysis & Reporting',
    description: 'Quarterly analytical program including soil composition, tissue analysis, and microbiological assays. Results are compiled into trend reports showing soil health trajectory, nutrient availability changes, and correlations with yield and quality outcomes.',
    outcomes: [
      'Quarterly soil and tissue sample collection and analysis',
      'Microbiological assays (fungal:bacterial ratios, biomass indices)',
      'Season-over-season trend analysis with visualizations',
      'Yield and quality correlation reporting',
      'Annual summary with program efficacy assessment',
    ],
    data: 'Microbial biomass increased 124% on average (142 to 318 mg/kg), indicating substantial soil biological recovery.',
  },
];

export function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1457530378978-8bac673b8062?w=1600&q=80"
          alt="Orchard research site"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <p className="text-white/60 text-sm uppercase tracking-[0.2em] mb-4 font-medium">Programs</p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-2 mb-6">
            Research &amp; Consulting Programs
          </h1>
          <p className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            Each program is designed around peer-reviewed principles and validated through
            ongoing field research. Programs are customized to site-specific conditions and
            informed by continuous data collection and analysis.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {programs.map((program, i) => (
              <div key={program.title} className="border-b border-gray-200 pb-16 last:border-b-0 last:pb-0">
                <p className="text-charcoal-lighter text-xs font-mono mb-3">Program {String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal mb-4">{program.title}</h3>
                <p className="text-charcoal-light leading-relaxed mb-6">{program.description}</p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] font-semibold text-charcoal-lighter mb-3">Expected Outcomes</p>
                    <ul className="space-y-2">
                      {program.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-2.5 text-sm text-charcoal-light">
                          <span className="text-green-deep mt-1.5 text-xs">&bull;</span>
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] font-semibold text-charcoal-lighter mb-3">Research Data</p>
                    <div className="bg-gray-50 border border-gray-200 rounded-md p-5">
                      <p className="text-sm text-charcoal-light leading-relaxed italic">{program.data}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-4">
            Program Inquiries
          </h2>
          <p className="text-charcoal-lighter leading-relaxed mb-8 max-w-xl mx-auto">
            Each program begins with a site assessment and consultation. Contact us to discuss
            your operation's specific conditions, objectives, and timeline.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-green-deep text-white font-medium rounded-md hover:bg-green-deep-light transition-colors text-sm"
          >
            Request Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
