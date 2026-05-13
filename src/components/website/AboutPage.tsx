import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const timeline = [
  { year: '2009', event: 'Founded Great Crops Agricultural Consulting in Los Osos, CA. Began initial field trials with organic carbon applications in avocado orchards.' },
  { year: '2012', event: 'Expanded research program to include almond and citrus systems. Developed the multi-source carbon delivery methodology.' },
  { year: '2015', event: 'Formalized the 6-material water-applied system. Initiated collaboration with Blue Diamond Growers on almond soil health trials.' },
  { year: '2016', event: 'Presented three-year field study results at the California Avocado Society Annual Meeting.' },
  { year: '2018', event: 'Published findings on soil microbial community structure in Proceedings of the California Chapter, American Society of Agronomy.' },
  { year: '2019', event: 'Featured in Blue Diamond Growers Almond Facts: "From Good Crops to Great Crops: Organic Carbon-Based Soil Programs in Almond Production."' },
  { year: '2021', event: 'Presented Phytophthora root rot research to California Avocado Commission Production Research Committee. Documented 82% disease reduction.' },
  { year: '2023', event: 'Program expanded to over 500 managed acres across three counties. Ongoing monitoring across 12+ research sites.' },
];

export function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80"
          alt="California agricultural landscape"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <p className="text-white/60 text-sm uppercase tracking-[0.2em] mb-4 font-medium">About</p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-2 mb-6">
            Our Approach to Soil Science
          </h1>
          <p className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            Over 15 years of applied research and field observation have shaped a
            methodology grounded in evidence, refined through practice, and validated
            by measurable outcomes.
          </p>
        </div>
      </section>

      {/* Principal Investigator Bio */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 items-start">
            <div>
              <img
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80"
                alt="Field soil research"
                className="w-full rounded-md object-cover aspect-[3/4]"
              />
              <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
                <p className="font-serif font-bold text-charcoal text-sm">Tomas Aguayo, CCA</p>
                <p className="text-charcoal-lighter text-xs mt-1">Certified Crop Adviser #345107</p>
                <p className="text-charcoal-lighter text-xs">American Society of Agronomy</p>
                <p className="text-charcoal-lighter text-xs mt-2">Los Osos, California</p>
              </div>
            </div>

            <div className="md:col-span-2">
              <p className="text-green-deep text-xs uppercase tracking-[0.2em] font-semibold mb-3">Biography</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-8 leading-snug">
                Tomas Aguayo
              </h2>
              <div className="space-y-5 text-charcoal-light leading-relaxed">
                <p>
                  Tomas Aguayo is a Certified Crop Adviser (CCA #345107, American Society of Agronomy)
                  with over 15 years of experience in applied soil science and agronomic consulting.
                  Based on California's Central Coast, he specializes in soil health rehabilitation
                  and nutrition management for permanent crop systems, with particular expertise in
                  avocado, almond, citrus, and wine grape production.
                </p>
                <p>
                  After completing his education in soil science, Tomas spent several years working
                  with leading agricultural operations in Southern and Central California. During this
                  period, he became increasingly focused on the role of soil organic carbon and microbial
                  community structure in determining long-term crop productivity and disease resilience.
                  This interest led him to found Great Crops in 2009 with a clear research objective:
                  develop practical, scalable soil health programs based on organic carbon management
                  and biological soil amendments.
                </p>
                <p>
                  The resulting methodology — a 6-material, water-applied system delivering five distinct
                  carbon sources at varying decomposition rates — has been refined through continuous
                  field trials across hundreds of acres. His work has demonstrated consistent, measurable
                  improvements in soil organic carbon content, microbial biomass, root health indices,
                  and marketable yield across multiple crop systems and soil types.
                </p>
                <p>
                  Tomas maintains active research relationships with the California Avocado Commission
                  Production Research Committee and Blue Diamond Growers. His findings have been
                  presented at industry conferences and published in trade publications including
                  Blue Diamond Growers' <em>Almond Facts</em>. He currently manages soil health programs
                  on over 500 acres across Santa Barbara, San Luis Obispo, and Ventura counties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Methodology */}
      <section className="py-20 sm:py-24 bg-gray-50 border-y border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-green-deep text-xs uppercase tracking-[0.2em] font-semibold mb-3">Methodology</p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-8 leading-snug">
            Our Approach: Organic Carbon-Based Soil Management
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="font-serif text-lg font-bold text-charcoal mb-3">Theoretical Framework</h3>
              <p className="text-charcoal-light leading-relaxed">
                The Great Crops methodology is predicated on the principle that soil organic carbon
                is the primary driver of soil health in permanent crop systems. Organic carbon fuels
                microbial activity, improves soil structure and water-holding capacity, enhances
                cation exchange capacity, and supports the complex biological interactions that
                underpin nutrient cycling and disease suppression. Our approach targets systematic
                increases in soil organic carbon through multi-source applications calibrated to
                support the full range of soil biological processes.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-bold text-charcoal mb-3">The Five Carbon Sources</h3>
              <p className="text-charcoal-light leading-relaxed mb-4">
                Central to the methodology is the delivery of five functionally distinct carbon
                sources, each operating at a different decomposition rate and serving a specific
                role within the soil ecosystem:
              </p>
              <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-charcoal">
                      <th className="text-left py-3 px-5 font-semibold text-charcoal">Carbon Source</th>
                      <th className="text-left py-3 px-5 font-semibold text-charcoal">Decomposition Rate</th>
                      <th className="text-left py-3 px-5 font-semibold text-charcoal">Primary Function</th>
                    </tr>
                  </thead>
                  <tbody className="text-charcoal-light">
                    <tr className="border-b border-gray-100">
                      <td className="py-2.5 px-5">Humic acid complex</td>
                      <td className="py-2.5 px-5 text-xs">Slow</td>
                      <td className="py-2.5 px-5 text-xs">Soil structure, CEC enhancement</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2.5 px-5">Fulvic acid fraction</td>
                      <td className="py-2.5 px-5 text-xs">Rapid</td>
                      <td className="py-2.5 px-5 text-xs">Nutrient chelation, microbial activation</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2.5 px-5">Biochar suspension</td>
                      <td className="py-2.5 px-5 text-xs">Recalcitrant</td>
                      <td className="py-2.5 px-5 text-xs">Permanent microbial habitat</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2.5 px-5">Compost extract</td>
                      <td className="py-2.5 px-5 text-xs">Moderate</td>
                      <td className="py-2.5 px-5 text-xs">Biological community inoculation</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-5">Root exudate stimulant</td>
                      <td className="py-2.5 px-5 text-xs">Variable</td>
                      <td className="py-2.5 px-5 text-xs">Plant-soil carbon pump amplification</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-lg font-bold text-charcoal mb-3">Application Protocol</h3>
              <p className="text-charcoal-light leading-relaxed">
                Materials are delivered through existing micro-irrigation systems on a
                phenologically-driven schedule. Application timing is aligned with key developmental
                stages — root flush initiation, bloom, fruit set, cell division, and post-harvest
                recovery — to maximize biological uptake and integration. A sixth component,
                a mycorrhizal and beneficial organism inoculant, is applied at targeted intervals
                to reinforce the soil biological community.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-bold text-charcoal mb-3">Monitoring & Assessment</h3>
              <p className="text-charcoal-light leading-relaxed">
                Each program site is monitored through quarterly soil sampling (organic carbon,
                macro- and micronutrients, microbial biomass), tissue analysis, root health
                assessments, and yield tracking. This data-driven approach enables continuous
                refinement of application rates, timing, and material selection based on
                observed soil and crop response.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Partnerships */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-green-deep text-xs uppercase tracking-[0.2em] font-semibold mb-3">Collaborations</p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-10 leading-snug">
            Research Partnerships
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-gray-50 border border-gray-200 rounded-md">
              <h3 className="font-serif text-lg font-bold text-charcoal mb-3">California Avocado Commission</h3>
              <p className="text-charcoal-lighter text-xs uppercase tracking-wider mb-3">Production Research Committee</p>
              <p className="text-charcoal-light text-sm leading-relaxed">
                Collaborative research on the effects of integrated nutritional and microbiological
                programs on <em>Phytophthora cinnamomi</em> suppression in California avocado production.
                Results presented to the Production Research Committee demonstrated an 82% reduction
                in Phytophthora incidence across treated sites (Aguayo, 2021).
              </p>
            </div>

            <div className="p-8 bg-gray-50 border border-gray-200 rounded-md">
              <h3 className="font-serif text-lg font-bold text-charcoal mb-3">Blue Diamond Growers</h3>
              <p className="text-charcoal-lighter text-xs uppercase tracking-wider mb-3">Almond Facts Publication</p>
              <p className="text-charcoal-light text-sm leading-relaxed">
                Field trials studying the relationship between soil microbiome health, organic carbon
                content, and almond kernel quality in Central Coast orchards. Research findings
                published in <em>Almond Facts</em> (Mar/Apr 2019), documenting yield improvements
                and soil health gains in Nonpareil and Monterey plantings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 sm:py-24 bg-gray-50 border-y border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-green-deep text-xs uppercase tracking-[0.2em] font-semibold mb-3">History</p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-10 leading-snug">
            Research Timeline
          </h2>

          <div className="space-y-6">
            {timeline.map((item) => (
              <div key={item.year} className="flex gap-6">
                <span className="font-mono text-sm text-green-deep font-semibold shrink-0 w-12 pt-0.5">
                  {item.year}
                </span>
                <div className="pb-6 border-b border-gray-200 flex-1">
                  <p className="text-charcoal-light text-sm leading-relaxed">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-4">
            Consultation &amp; Collaboration
          </h2>
          <p className="text-charcoal-lighter leading-relaxed mb-8 max-w-xl mx-auto">
            We welcome inquiries from growers, researchers, and agricultural organizations
            interested in soil health improvement programs or collaborative research.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-green-deep text-white font-medium rounded-md hover:bg-green-deep-light transition-colors text-sm"
          >
            Get in Touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
