import { MapPin, Mail, Phone, Clock } from 'lucide-react';

export function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=1600&q=80"
          alt="California orchard"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <p className="text-white/60 text-sm uppercase tracking-[0.2em] mb-4 font-medium">Contact</p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-2 mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            For program inquiries, research collaboration, or consultation requests.
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-12">
            {/* Info sidebar */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <p className="text-green-deep text-xs uppercase tracking-[0.2em] font-semibold mb-4">Office</p>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-charcoal-lighter mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-charcoal">1175 Calle Cordoniz Rd</p>
                      <p className="text-sm text-charcoal">Los Osos, CA 93402</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-charcoal-lighter mt-1 flex-shrink-0" />
                    <a href="mailto:tomas@greatcrops.com" className="text-sm text-green-deep hover:underline">
                      tomas@greatcrops.com
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-charcoal-lighter mt-1 flex-shrink-0" />
                    <p className="text-sm text-charcoal">(805) 555-CROP</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-charcoal-lighter mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-charcoal">Mon\u2013Fri: 7:00 AM \u2013 5:00 PM</p>
                      <p className="text-sm text-charcoal-lighter">Sat: By appointment</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <p className="text-green-deep text-xs uppercase tracking-[0.2em] font-semibold mb-3">Service Area</p>
                <p className="text-sm text-charcoal-light leading-relaxed">
                  Santa Barbara, San Luis Obispo, and Ventura counties.
                  Central Coast California.
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <p className="text-green-deep text-xs uppercase tracking-[0.2em] font-semibold mb-3">Credentials</p>
                <p className="text-sm text-charcoal-light leading-relaxed">
                  Tomas Aguayo, CCA #345107<br />
                  Certified Crop Adviser<br />
                  American Society of Agronomy
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-3">
              <form
                className="bg-gray-50 border border-gray-200 rounded-md p-8 sm:p-10 space-y-6"
                onSubmit={(e) => e.preventDefault()}
              >
                <div>
                  <p className="font-serif text-xl font-bold text-charcoal mb-1">Inquiry Form</p>
                  <p className="text-sm text-charcoal-lighter">
                    Please provide details about your operation. We will respond within two business days.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-charcoal-lighter uppercase tracking-wider mb-1.5">Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-green-deep/20 focus:border-green-deep outline-none transition-all text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-charcoal-lighter uppercase tracking-wider mb-1.5">Email *</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-green-deep/20 focus:border-green-deep outline-none transition-all text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-charcoal-lighter uppercase tracking-wider mb-1.5">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-green-deep/20 focus:border-green-deep outline-none transition-all text-sm"
                      placeholder="(805) 555-0123"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-charcoal-lighter uppercase tracking-wider mb-1.5">Acreage</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-green-deep/20 focus:border-green-deep outline-none transition-all text-sm"
                      placeholder="e.g., 80 acres"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-charcoal-lighter uppercase tracking-wider mb-1.5">Crop System</label>
                  <select className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-green-deep/20 focus:border-green-deep outline-none transition-all text-sm">
                    <option value="">Select crop type...</option>
                    <option value="avocado">Avocados (Persea americana)</option>
                    <option value="almond">Almonds (Prunus dulcis)</option>
                    <option value="citrus">Citrus (Citrus spp.)</option>
                    <option value="grape">Wine Grapes (Vitis vinifera)</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-charcoal-lighter uppercase tracking-wider mb-1.5">Inquiry Details *</label>
                  <textarea
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-green-deep/20 focus:border-green-deep outline-none transition-all text-sm resize-none"
                    placeholder="Please describe your operation, current soil conditions or challenges, and what you are looking to achieve..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-green-deep text-white font-medium rounded-md hover:bg-green-deep-light transition-colors text-sm"
                >
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
