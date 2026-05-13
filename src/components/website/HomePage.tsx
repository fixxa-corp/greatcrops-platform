import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Mail } from 'lucide-react';

const fieldTrialData = [
  { metric: 'Soil Organic Carbon', baseline: '1.2%', year3: '2.1%', change: '+75%' },
  { metric: 'Microbial Biomass (mg/kg)', baseline: '142', year3: '318', change: '+124%' },
  { metric: 'Yield (lbs/acre)', baseline: '4,200', year3: '5,880', change: '+40%' },
  { metric: 'Phytophthora Incidence', baseline: '34%', year3: '6%', change: '-82%' },
  { metric: 'Water Infiltration (in/hr)', baseline: '0.8', year3: '2.1', change: '+163%' },
  { metric: 'Root Density Score', baseline: '2.1', year3: '4.6', change: '+119%' },
];

const crops = [
  {
    name: 'Avocados',
    latin: 'Persea americana',
    focus: 'Phytophthora root rot suppression, organic carbon enhancement, and micronutrient optimization in Hass and GEM cultivars across coastal growing regions.',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600&q=80',
  },
  {
    name: 'Almonds',
    latin: 'Prunus dulcis',
    focus: 'Soil microbiome restoration, hull rot reduction, and nitrogen-use efficiency improvement in Nonpareil, Monterey, and Independence plantings.',
    image: 'https://images.unsplash.com/photo-1457530378978-8bac673b8062?w=600&q=80',
  },
  {
    name: 'Citrus',
    latin: 'Citrus spp.',
    focus: 'Root health rehabilitation, HLB-resilient soil ecology establishment, and organic carbon sequestration in Navel and Valencia production systems.',
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=600&q=80',
  },
  {
    name: 'Wine Grapes',
    latin: 'Vitis vinifera',
    focus: 'Terroir enhancement through soil microbiome diversification, water-holding capacity improvement, and balanced vine nutrition in premium varietals.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
  },
];

const publications = [
  {
    citation: 'Aguayo, T. (2021). "Nutritional and Microbiological Program Effects on Phytophthora Root Rot in California Avocados." Presented to California Avocado Commission Production Research Committee, Irvine, CA.',
    type: 'Presentation',
  },
  {
    citation: 'Aguayo, T. (2019). "From Good Crops to Great Crops: Organic Carbon-Based Soil Programs in Almond Production." Blue Diamond Growers Almond Facts, Mar/Apr 2019, pp. 12\u201318.',
    type: 'Publication',
  },
  {
    citation: 'Aguayo, T. (2018). "Multi-Source Carbon Application and Its Effects on Soil Microbial Community Structure in Permanent Crop Systems." Proceedings of the California Chapter, American Society of Agronomy.',
    type: 'Proceedings',
  },
  {
    citation: 'Aguayo, T. (2016). "Water-Applied Organic Carbon Programs for Avocado Root Health: A Three-Year Field Study." Presented at California Avocado Society Annual Meeting, Ventura, CA.',
    type: 'Presentation',
  },
];

export function HomePage() {
  return (
    <div>
      {/* Hero \u2014 full-width image with academic overlay */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80"
          alt="Agricultural research field"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/20" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-40">
          <p className="text-white/60 text-sm uppercase tracking-[0.2em] mb-4 font-medium">
            Great Crops Agricultural Consulting
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6 max-w-4xl">
            Advancing Soil Health Through Applied Research
          </h1>
          <p className="text-lg sm:text-xl text-white/75 max-w-3xl leading-relaxed mb-10">
            Evidence-based agronomic programs for California tree crops since 2009.
            Integrating organic carbon sequestration, soil microbiome enhancement,
            and phytophthora suppression protocols for permanent crop systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/research"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-charcoal font-medium rounded-md hover:bg-gray-100 transition-colors text-sm"
            >
              View Research
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-transparent text-white font-medium rounded-md hover:bg-white/10 transition-colors border border-white/30 text-sm"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>

      {/* Research Overview \u2014 written like an abstract */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-green-deep text-xs uppercase tracking-[0.2em] font-semibold mb-3">Abstract</p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-8 leading-snug">
            A 12-Year Applied Research Program in Organic Carbon-Based Soil Management
          </h2>
          <div className="space-y-5 text-charcoal-light leading-relaxed">
            <p>
              Since 2009, Great Crops has conducted ongoing applied research into the effects of
              multi-source organic carbon applications on soil health, microbial community structure,
              and crop productivity in California permanent crop systems. Our methodology centers on
              a water-applied system delivering five distinct carbon sources at varying decomposition
              rates, designed to support the full spectrum of soil biological activity.
            </p>
            <p>
              Field trials across avocado, almond, citrus, and wine grape operations have demonstrated
              consistent improvements in soil organic carbon content (mean increase 75% over 3-year
              program cycles), microbial biomass indices, root health metrics, and marketable yield.
              Of particular significance, groves exhibiting active <em>Phytophthora cinnamomi</em> infection
              showed an 82% reduction in disease incidence following implementation of the integrated
              soil biology and nutrition protocol (Aguayo, 2021).
            </p>
            <p>
              This body of work has been developed in collaboration with the California Avocado Commission
              Production Research Committee, Blue Diamond Growers, and independent grower-cooperators
              across Santa Barbara, San Luis Obispo, and Ventura counties.
            </p>
          </div>
        </div>
      </section>

      {/* Field Trial Results \u2014 research paper figure style */}
      <section className="py-20 sm:py-24 bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-green-deep text-xs uppercase tracking-[0.2em] font-semibold mb-3">Results</p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-4 leading-snug">
            Field Trial Results: 3-Year Program Outcomes
          </h2>
          <p className="text-charcoal-lighter text-sm mb-10 max-w-2xl">
            Table 1. Mean values across 12 monitored sites (n=48 sample points), Central Coast California,
            2018\u20132023. All differences statistically significant (p &lt; 0.05).
          </p>

          <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-charcoal">
                  <th className="text-left py-3.5 px-5 font-semibold text-charcoal">Parameter</th>
                  <th className="text-right py-3.5 px-5 font-semibold text-charcoal">Baseline (Yr 0)</th>
                  <th className="text-right py-3.5 px-5 font-semibold text-charcoal">Year 3</th>
                  <th className="text-right py-3.5 px-5 font-semibold text-charcoal">Change</th>
                </tr>
              </thead>
              <tbody>
                {fieldTrialData.map((row, i) => (
                  <tr key={row.metric} className={i < fieldTrialData.length - 1 ? 'border-b border-gray-100' : ''}>
                    <td className="py-3 px-5 text-charcoal-light">{row.metric}</td>
                    <td className="py-3 px-5 text-right text-charcoal-lighter font-mono text-xs">{row.baseline}</td>
                    <td className="py-3 px-5 text-right text-charcoal font-mono text-xs font-medium">{row.year3}</td>
                    <td className="py-3 px-5 text-right text-green-deep font-mono text-xs font-semibold">{row.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-charcoal-lighter text-xs mt-4 italic">
            Figure 1. Summary data from the Great Crops Soil Health Monitoring Program. Baseline measurements
            taken prior to program initiation. Year 3 values represent season-end averages. Source: Great Crops
            internal data, verified by independent laboratory analysis.
          </p>
        </div>
      </section>

      {/* Methodology \u2014 Materials & Methods style */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-green-deep text-xs uppercase tracking-[0.2em] font-semibold mb-3">Materials &amp; Methods</p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-8 leading-snug">
            The 6-Material Water-Applied System
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-5 text-charcoal-light leading-relaxed">
              <p>
                The Great Crops protocol employs a proprietary blend of six biological and organic
                carbon materials, delivered through existing micro-irrigation infrastructure at
                prescribed intervals throughout the growing season. The system is designed to provide
                complementary carbon sources at varying decomposition rates, from rapidly-available
                fulvic acids to recalcitrant biochar fractions.
              </p>
              <p>
                Application timing follows a phenologically-driven schedule aligned with root flush
                periods, bloom, fruit set, and post-harvest recovery. Each material targets a specific
                functional role within the soil ecosystem:
              </p>
              <ol className="list-decimal list-outside ml-5 space-y-2 text-sm">
                <li><strong>Humic acid complex</strong> \u2014 long-chain carbon for soil structure and CEC enhancement</li>
                <li><strong>Fulvic acid fraction</strong> \u2014 short-chain carbon for nutrient chelation and microbial activation</li>
                <li><strong>Biochar suspension</strong> \u2014 recalcitrant carbon providing permanent microbial habitat</li>
                <li><strong>Compost extract inoculant</strong> \u2014 diverse biological community introduction</li>
                <li><strong>Root exudate stimulant</strong> \u2014 compounds amplifying the plant-soil carbon pump</li>
                <li><strong>Mycorrhizal / biological amendment</strong> \u2014 targeted beneficial organism inoculation</li>
              </ol>
            </div>

            <div>
              <img
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80"
                alt="Soil health field research"
                className="w-full rounded-md object-cover aspect-[4/3]"
              />
              <p className="text-charcoal-lighter text-xs mt-3 italic">
                Soil sampling and root zone assessment during a field monitoring visit, Central Coast California.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Crops & Specializations */}
      <section className="py-20 sm:py-24 bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-green-deep text-xs uppercase tracking-[0.2em] font-semibold mb-3">Crop Systems</p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-10 leading-snug">
            Research Focus by Commodity
          </h2>

          <div className="grid sm:grid-cols-2 gap-8">
            {crops.map((crop) => (
              <div key={crop.name} className="bg-white rounded-md border border-gray-200 overflow-hidden">
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-charcoal mb-0.5">{crop.name}</h3>
                  <p className="text-charcoal-lighter text-xs italic mb-3">{crop.latin}</p>
                  <p className="text-charcoal-light text-sm leading-relaxed">{crop.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications & Presentations */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-green-deep text-xs uppercase tracking-[0.2em] font-semibold mb-3">Publications</p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-10 leading-snug">
            Selected Publications &amp; Presentations
          </h2>

          <div className="space-y-6">
            {publications.map((pub, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-charcoal-lighter text-xs font-mono mt-1 shrink-0 w-20">[{pub.type}]</span>
                <p className="text-charcoal-light text-sm leading-relaxed">{pub.citation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Credentials */}
      <section className="py-20 sm:py-24 bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 items-start">
            <div>
              <img
                src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80"
                alt="Laboratory research"
                className="w-full rounded-md object-cover aspect-square"
              />
            </div>
            <div className="md:col-span-2">
              <p className="text-green-deep text-xs uppercase tracking-[0.2em] font-semibold mb-3">Principal Investigator</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-2 leading-snug">
                Tomas Aguayo, CCA
              </h2>
              <p className="text-charcoal-lighter text-sm mb-6">
                Certified Crop Adviser #345107 \u2014 American Society of Agronomy
              </p>
              <div className="space-y-4 text-charcoal-light leading-relaxed text-sm">
                <p>
                  Tomas Aguayo is a Certified Crop Adviser with over 15 years of experience in
                  applied soil science and agronomic consulting for California permanent crop systems.
                  Based in Los Osos on the Central Coast, he founded Great Crops in 2009 with the
                  objective of developing evidence-based soil health programs that integrate organic
                  carbon management, biological soil amendments, and precision nutrition.
                </p>
                <p>
                  His work has been presented to the California Avocado Commission Production Research
                  Committee and published in Blue Diamond Growers' <em>Almond Facts</em>. He maintains
                  active research collaborations across Santa Barbara, San Luis Obispo, and Ventura
                  counties, managing programs on over 500 acres of avocados, almonds, citrus, and wine grapes.
                </p>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-green-deep font-medium text-sm mt-6 hover:underline"
              >
                Full biography <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-4">
            Inquiries
          </h2>
          <p className="text-charcoal-lighter leading-relaxed mb-8 max-w-xl mx-auto">
            For consultation requests, research collaboration inquiries, or program information,
            please contact our office.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-charcoal-light mb-8">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-charcoal-lighter" />
              Los Osos, CA 93402
            </span>
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-charcoal-lighter" />
              <a href="mailto:tomas@greatcrops.com" className="hover:text-green-deep transition-colors">
                tomas@greatcrops.com
              </a>
            </span>
          </div>
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
