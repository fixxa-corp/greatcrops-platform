import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const fieldTrialData = [
  { metric: 'Soil Organic Carbon (%)', baseline: '1.2', year1: '1.5', year2: '1.8', year3: '2.1', change: '+75%' },
  { metric: 'Microbial Biomass (mg/kg)', baseline: '142', year1: '198', year2: '261', year3: '318', change: '+124%' },
  { metric: 'Yield (lbs/acre)', baseline: '4,200', year1: '4,620', year2: '5,250', year3: '5,880', change: '+40%' },
  { metric: 'Phytophthora Incidence (%)', baseline: '34', year1: '22', year2: '12', year3: '6', change: '-82%' },
  { metric: 'Water Infiltration (in/hr)', baseline: '0.8', year1: '1.2', year2: '1.7', year3: '2.1', change: '+163%' },
  { metric: 'Root Density Score (1\u20135)', baseline: '2.1', year1: '2.9', year2: '3.8', year3: '4.6', change: '+119%' },
  { metric: 'Fungal:Bacterial Ratio', baseline: '0.3', year1: '0.5', year2: '0.8', year3: '1.1', change: '+267%' },
  { metric: 'CEC (meq/100g)', baseline: '12.4', year1: '13.8', year2: '15.1', year3: '16.7', change: '+35%' },
];

const publications = [
  {
    year: '2021',
    citation: 'Aguayo, T. (2021). "Nutritional and Microbiological Program Effects on Phytophthora Root Rot in California Avocados." Presented to California Avocado Commission Production Research Committee, Irvine, CA.',
    type: 'Conference Presentation',
  },
  {
    year: '2019',
    citation: 'Aguayo, T. (2019). "From Good Crops to Great Crops: Organic Carbon-Based Soil Programs in Almond Production." Blue Diamond Growers Almond Facts, Mar/Apr 2019, pp. 12\u201318.',
    type: 'Trade Publication',
  },
  {
    year: '2018',
    citation: 'Aguayo, T. (2018). "Multi-Source Carbon Application and Its Effects on Soil Microbial Community Structure in Permanent Crop Systems." Proceedings of the California Chapter, American Society of Agronomy.',
    type: 'Conference Proceedings',
  },
  {
    year: '2016',
    citation: 'Aguayo, T. (2016). "Water-Applied Organic Carbon Programs for Avocado Root Health: A Three-Year Field Study." Presented at California Avocado Society Annual Meeting, Ventura, CA.',
    type: 'Conference Presentation',
  },
  {
    year: '2014',
    citation: 'Aguayo, T. (2014). "Soil Organic Carbon Dynamics Under Multi-Source Amendment Regimes in Southern California Avocado Production." Poster presented at ASA-CSSA-SSSA International Annual Meeting, Long Beach, CA.',
    type: 'Poster Presentation',
  },
];

const researchSites = [
  { location: 'Carpinteria, CA', crop: 'Avocados (Hass)', acres: 85, years: '2016\u2013present' },
  { location: 'Goleta, CA', crop: 'Avocados (Hass, GEM)', acres: 120, years: '2017\u2013present' },
  { location: 'San Luis Obispo, CA', crop: 'Almonds (Nonpareil)', acres: 65, years: '2015\u2013present' },
  { location: 'Paso Robles, CA', crop: 'Wine Grapes (Cabernet)', acres: 40, years: '2018\u2013present' },
  { location: 'Ventura, CA', crop: 'Citrus (Navel)', acres: 55, years: '2019\u2013present' },
  { location: 'Santa Barbara, CA', crop: 'Avocados (Hass)', acres: 95, years: '2017\u2013present' },
];

export function ResearchPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1600&q=80"
          alt="Laboratory research"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <p className="text-white/60 text-sm uppercase tracking-[0.2em] mb-4 font-medium">Research</p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-2 mb-6">
            Field Trial Results &amp; Publications
          </h1>
          <p className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            Data from ongoing applied research across 12+ monitored sites in
            Santa Barbara, San Luis Obispo, and Ventura counties.
          </p>
        </div>
      </section>

      {/* Research Overview */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-green-deep text-xs uppercase tracking-[0.2em] font-semibold mb-3">Overview</p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-8 leading-snug">
            Applied Research in Organic Carbon-Based Soil Management
          </h2>
          <div className="space-y-5 text-charcoal-light leading-relaxed">
            <p>
              Since 2009, Great Crops has maintained a systematic applied research program
              evaluating the effects of multi-source organic carbon applications on soil health
              parameters, microbial community composition, and crop productivity in California
              permanent crop systems. The research is conducted in working commercial orchards
              and vineyards under real-world production conditions.
            </p>
            <p>
              Data is collected through quarterly soil sampling (organic carbon, macro/micronutrient
              panels, microbial biomass assays), tissue analysis, root health assessments, and
              yield monitoring at standardized sample points. All laboratory analyses are performed
              by independent, accredited agricultural laboratories.
            </p>
            <p>
              The following results represent aggregated data across all monitored sites.
              Individual site results vary based on soil type, crop, irrigation management,
              and program duration.
            </p>
          </div>
        </div>
      </section>

      {/* Comprehensive Field Trial Data */}
      <section className="py-20 sm:py-24 bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-green-deep text-xs uppercase tracking-[0.2em] font-semibold mb-3">Results</p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-4 leading-snug">
            Longitudinal Field Trial Data
          </h2>
          <p className="text-charcoal-lighter text-sm mb-10 max-w-3xl">
            Table 1. Mean parameter values by program year across all monitored sites (n=48 sample points,
            12 sites), Central Coast California, 2015\u20132023. All Year 3 vs. Baseline differences
            statistically significant (p &lt; 0.05, paired t-test).
          </p>

          <div className="bg-white border border-gray-200 rounded-md overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b-2 border-charcoal">
                  <th className="text-left py-3.5 px-4 font-semibold text-charcoal">Parameter</th>
                  <th className="text-right py-3.5 px-4 font-semibold text-charcoal">Baseline</th>
                  <th className="text-right py-3.5 px-4 font-semibold text-charcoal">Year 1</th>
                  <th className="text-right py-3.5 px-4 font-semibold text-charcoal">Year 2</th>
                  <th className="text-right py-3.5 px-4 font-semibold text-charcoal">Year 3</th>
                  <th className="text-right py-3.5 px-4 font-semibold text-charcoal">\u0394 Change</th>
                </tr>
              </thead>
              <tbody>
                {fieldTrialData.map((row, i) => (
                  <tr key={row.metric} className={i < fieldTrialData.length - 1 ? 'border-b border-gray-100' : ''}>
                    <td className="py-3 px-4 text-charcoal-light text-xs">{row.metric}</td>
                    <td className="py-3 px-4 text-right text-charcoal-lighter font-mono text-xs">{row.baseline}</td>
                    <td className="py-3 px-4 text-right text-charcoal-lighter font-mono text-xs">{row.year1}</td>
                    <td className="py-3 px-4 text-right text-charcoal-lighter font-mono text-xs">{row.year2}</td>
                    <td className="py-3 px-4 text-right text-charcoal font-mono text-xs font-medium">{row.year3}</td>
                    <td className="py-3 px-4 text-right text-green-deep font-mono text-xs font-semibold">{row.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-charcoal-lighter text-xs mt-4 italic">
            Source: Great Crops Soil Health Monitoring Program. Baseline measurements taken prior to
            program initiation. Annual values represent season-end means. Laboratory analyses performed
            by independent accredited facilities. Phytophthora data from avocado sites only (n=28).
          </p>
        </div>
      </section>

      {/* Research Sites */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-green-deep text-xs uppercase tracking-[0.2em] font-semibold mb-3">Study Sites</p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-4 leading-snug">
            Active Research &amp; Monitoring Sites
          </h2>
          <p className="text-charcoal-lighter text-sm mb-10 max-w-2xl">
            Table 2. Current research and monitoring sites with active soil health programs.
          </p>

          <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-charcoal">
                  <th className="text-left py-3.5 px-5 font-semibold text-charcoal">Location</th>
                  <th className="text-left py-3.5 px-5 font-semibold text-charcoal">Crop System</th>
                  <th className="text-right py-3.5 px-5 font-semibold text-charcoal">Acres</th>
                  <th className="text-left py-3.5 px-5 font-semibold text-charcoal">Duration</th>
                </tr>
              </thead>
              <tbody>
                {researchSites.map((site, i) => (
                  <tr key={site.location} className={i < researchSites.length - 1 ? 'border-b border-gray-100' : ''}>
                    <td className="py-3 px-5 text-charcoal-light">{site.location}</td>
                    <td className="py-3 px-5 text-charcoal-light text-xs">{site.crop}</td>
                    <td className="py-3 px-5 text-right text-charcoal-lighter font-mono text-xs">{site.acres}</td>
                    <td className="py-3 px-5 text-charcoal-lighter text-xs">{site.years}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-charcoal">
                  <td className="py-3 px-5 font-semibold text-charcoal text-xs">Total</td>
                  <td className="py-3 px-5"></td>
                  <td className="py-3 px-5 text-right font-mono text-xs font-semibold text-charcoal">460</td>
                  <td className="py-3 px-5"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      {/* Phytophthora Research Highlight */}
      <section className="py-20 sm:py-24 bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-green-deep text-xs uppercase tracking-[0.2em] font-semibold mb-3">Research Highlight</p>
              <h2 className="font-serif text-2xl font-bold text-charcoal mb-6 leading-snug">
                Phytophthora Suppression Through Integrated Soil Biology Management
              </h2>
              <div className="space-y-4 text-charcoal-light leading-relaxed text-sm">
                <p>
                  <em>Phytophthora cinnamomi</em> and <em>P. citricola</em> remain the most economically
                  significant root pathogens in California avocado production. Conventional management
                  relies primarily on phosphonate-based fungicides, which suppress but do not eliminate
                  the pathogen and may have long-term effects on soil biology.
                </p>
                <p>
                  Our integrated approach combines competitive exclusion organisms, root-zone organic
                  carbon enhancement, and mycorrhizal inoculation to create soil conditions that
                  are unfavorable to Phytophthora proliferation while supporting beneficial root
                  colonizers. The protocol has been evaluated across 28 sample points in avocado
                  orchards with active Phytophthora infection.
                </p>
                <p>
                  Results demonstrate a mean 82% reduction in Phytophthora incidence by Year 3,
                  with concurrent improvements in root density (119% increase), water infiltration
                  rates (163% improvement), and overall tree vigor as assessed by canopy density
                  and fruit set metrics (Aguayo, 2021).
                </p>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80"
                alt="Avocado orchard research site"
                className="w-full rounded-md object-cover aspect-[4/3]"
              />
              <p className="text-charcoal-lighter text-xs mt-3 italic">
                Avocado orchard research site, Central Coast California. Photo shows treated block
                in Year 3 of the integrated soil biology program.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-green-deep text-xs uppercase tracking-[0.2em] font-semibold mb-3">Bibliography</p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-10 leading-snug">
            Publications &amp; Presentations
          </h2>

          <div className="space-y-8">
            {publications.map((pub, i) => (
              <div key={i} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-start gap-4">
                  <span className="text-charcoal-lighter text-xs font-mono mt-0.5 shrink-0 w-10">{pub.year}</span>
                  <div>
                    <p className="text-charcoal-light text-sm leading-relaxed mb-1">{pub.citation}</p>
                    <p className="text-charcoal-lighter text-xs">{pub.type}</p>
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
            Research Collaboration
          </h2>
          <p className="text-charcoal-lighter leading-relaxed mb-8 max-w-xl mx-auto">
            We welcome inquiries from researchers, agricultural organizations, and growers
            interested in collaborating on soil health studies or implementing evidence-based programs.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-green-deep text-white font-medium rounded-md hover:bg-green-deep-light transition-colors text-sm"
          >
            Contact Us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
