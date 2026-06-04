import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Scale, Briefcase, DollarSign, Calendar, Wrench, EyeOff, ShieldCheck, Shield, FileText, Mail, Phone, MapPin } from 'lucide-react';

export default function Terms() {
  const sections = [
    { id: 'acceptance', label: '1. Acceptance of Terms' },
    { id: 'about', label: '2. About Apka Interior Wala' },
    { id: 'services', label: '3. Services & Scope' },
    { id: 'payments', label: '4. Payment Milestones' },
    { id: 'timeline', label: '5. Project Timeline' },
    { id: 'materials', label: '6. Materials & Warranties' },
    { id: 'intellectual-property', label: '7. Intellectual Property' },
    { id: 'termination', label: '8. Suspension & Termination' },
    { id: 'website-use', label: '9. Website Use & Conduct' },
    { id: 'liability', label: '10. Limitation of Liability' },
    { id: 'governing-law', label: '11. Governing Law' },
    { id: 'changes', label: '12. Changes to Terms' },
    { id: 'contact', label: '13. Contact Us' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'Terms of Service — Apka Interior Wala',
    'description': 'Terms of Service for Apka Interior Wala, Bhopal. Read the terms governing use of our website and interior design & construction services.',
    'url': 'https://apkainteriorwala.com/terms',
    'publisher': {
      '@type': 'LocalBusiness',
      'name': 'Apka Interior Wala',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Shop No. 10, Patwa Market, Near Bharat Talkies',
        'addressLocality': 'Bhopal',
        'addressRegion': 'Madhya Pradesh',
        'postalCode': '462001',
        'addressCountry': 'IN',
      },
    },
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-32 pt-12">
      <Helmet>
        <title>Terms of Service | Apka Interior Wala Bhopal</title>
        <meta name="robots" content="noindex, follow" />
        <meta name="description" content="Terms of Service for Apka Interior Wala, Bhopal. Read the terms governing use of our website and interior design & construction services." />
        <link rel="canonical" href="https://apkainteriorwala.com/terms" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* Hero Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
        <div className="border-b border-stone-200 pb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[0.3em] text-stone-500 block mb-3"
          >
            Legal
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-light text-stone-900 md:text-6xl tracking-tight"
          >
            Terms of <span className="italic font-serif text-stone-700">Service</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-stone-500"
          >
            <span>LAST UPDATED: MAY 2026</span>
            <span className="hidden sm:inline">•</span>
            <span>GOVERNED UNDER BHOPAL, MP JURISDICTION</span>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900 mb-4 flex items-center gap-2">
                <Briefcase size={14} className="text-stone-500" />
                Table of Contents
              </h3>
              <ul className="space-y-2.5">
                {sections.map((sec) => (
                  <li key={sec.id}>
                    <button
                      onClick={() => scrollToSection(sec.id)}
                      className="text-left w-full text-stone-600 hover:text-stone-950 hover:translate-x-1 duration-200 transition-all font-medium py-1 text-xs"
                    >
                      {sec.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Terms Content */}
          <div className="lg:col-span-3 bg-white p-8 md:p-12 rounded-3xl border border-stone-200/80 shadow-sm space-y-12">

            {/* 1. Acceptance of Terms */}
            <section id="acceptance" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <Scale className="text-stone-800" size={24} />
                <h2 className="text-2xl font-light text-stone-900">1. Acceptance of Terms</h2>
              </div>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                By accessing and using the website <strong>apkainteriorwala.com</strong> ("Website"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Website. These terms apply to all visitors and users of the Website.
              </p>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                These Terms of Service are governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts in Bhopal, Madhya Pradesh.
              </p>
            </section>

            {/* 2. About Apka Interior Wala */}
            <section id="about" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <Briefcase className="text-stone-800" size={24} />
                <h2 className="text-2xl font-light text-stone-900">2. About Apka Interior Wala</h2>
              </div>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                Apka Interior Wala is a premium interior design and construction firm based in Bhopal, Madhya Pradesh. We provide residential interior design, commercial interior design, construction services, turnkey solutions, renovation and remodeling, modular kitchens, false ceilings, and custom furniture across Bhopal, Indore, and Madhya Pradesh.
              </p>
            </section>

            {/* 3. Services & Scope */}
            <section id="services" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <Briefcase className="text-stone-800" size={24} />
                <h2 className="text-2xl font-light text-stone-900">3. Services & Scope</h2>
              </div>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                Submitting an enquiry through our contact form or requesting a consultation does not constitute a binding contract. All projects are subject to a formal written agreement signed by both parties before any work commences.
              </p>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                Any estimates, quotations, or project timelines provided during initial consultations are indicative only and subject to detailed site assessment and formal proposal documentation.
              </p>
            </section>

            {/* 4. Payment Milestones */}
            <section id="payments" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <DollarSign className="text-stone-800" size={24} />
                <h2 className="text-2xl font-light text-stone-900">4. Payment Milestones</h2>
              </div>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                Unless otherwise agreed in writing, active projects follow a milestone-based payment structure:
              </p>
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left text-xs sm:text-sm border-collapse border border-stone-200">
                  <thead>
                    <tr className="bg-stone-100 text-stone-800 font-mono text-[11px]">
                      <th className="border border-stone-200 p-3">MILESTONE</th>
                      <th className="border border-stone-200 p-3">AMOUNT DUE</th>
                      <th className="border border-stone-200 p-3">TRIGGER</th>
                    </tr>
                  </thead>
                  <tbody className="text-stone-600">
                    <tr>
                      <td className="border border-stone-200 p-3 font-medium text-stone-900">1. Booking / Token</td>
                      <td className="border border-stone-200 p-3">10%</td>
                      <td className="border border-stone-200 p-3">On signing agreement; to begin site survey and initial layout drafts.</td>
                    </tr>
                    <tr className="bg-stone-50/50">
                      <td className="border border-stone-200 p-3 font-medium text-stone-900">2. Materials Procurement</td>
                      <td className="border border-stone-200 p-3">40%</td>
                      <td className="border border-stone-200 p-3">Before ordering wood, ply, laminates, hardware, and other materials.</td>
                    </tr>
                    <tr>
                      <td className="border border-stone-200 p-3 font-medium text-stone-900">3. Structural Completion</td>
                      <td className="border border-stone-200 p-3">40%</td>
                      <td className="border border-stone-200 p-3">When framing, false ceiling structure, and primary installations are in place.</td>
                    </tr>
                    <tr className="bg-stone-50/50">
                      <td className="border border-stone-200 p-3 font-medium text-stone-900">4. Final Handover</td>
                      <td className="border border-stone-200 p-3">10%</td>
                      <td className="border border-stone-200 p-3">On site completion, final walkthrough, and key handover to client.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-stone-500 text-xs italic pt-2">
                Delays in milestone payments may result in a pause of site work. The Company is not liable for project delays arising from pending client dues.
              </p>
            </section>

            {/* 5. Project Timeline & Site Access */}
            <section id="timeline" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <Calendar className="text-stone-800" size={24} />
                <h2 className="text-2xl font-light text-stone-900">5. Project Timeline & Site Access</h2>
              </div>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                Project timelines are estimates based on normal working conditions. Delays caused by events beyond our control — including force majeure, civic restrictions, extreme weather, building society rules, or client-initiated design changes — will result in reasonable deadline extensions communicated in writing.
              </p>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                <strong>Site Access:</strong> The client must provide unobstructed access to the property for measurements, construction, and supervision during agreed working hours. Electricity and running water must be available at the site throughout active construction phases.
              </p>
            </section>

            {/* 6. Materials & Warranties */}
            <section id="materials" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <Wrench className="text-stone-800" size={24} />
                <h2 className="text-2xl font-light text-stone-900">6. Materials & Warranties</h2>
              </div>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                We source quality materials — including BWR plywood, premium laminates, and branded hardware — in line with client selections and project specifications.
              </p>
              <ul className="space-y-3 text-sm text-stone-600 pl-4 list-disc">
                <li><strong>Brand Warranties:</strong> Warranties for branded items (hardware fittings, lighting fixtures, appliances, digital locks) are issued directly by their respective manufacturers. We assist in activating these at handover.</li>
                <li><strong>Workmanship Warranty:</strong> We provide a <strong>1-year limited workmanship warranty</strong> covering joint alignments, modular fittings, and false ceiling adjustments arising from construction defects.</li>
              </ul>
              <p className="text-stone-500 text-xs italic pt-2">
                This warranty does not cover damage from misuse, water ingress from pre-existing structural defects, pest infestations, or alterations made by third parties after handover.
              </p>
            </section>

            {/* 7. Intellectual Property */}
            <section id="intellectual-property" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <EyeOff className="text-stone-800" size={24} />
                <h2 className="text-2xl font-light text-stone-900">7. Intellectual Property</h2>
              </div>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                All content on this Website — including project photographs, design renders, written content, logos, brand identity, and graphics — is the exclusive property of Apka Interior Wala and is protected under Indian copyright and intellectual property laws.
              </p>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                You may not reproduce, distribute, modify, or use any content from this Website for commercial purposes without prior written consent from Apka Interior Wala.
              </p>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                <strong>Project Photography:</strong> We reserve the right to photograph completed project spaces for our portfolio, design journal, and social media. Client privacy is respected — personal details and identifying information are not disclosed in any published media.
              </p>
            </section>

            {/* 8. Suspension & Termination */}
            <section id="termination" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <ShieldCheck className="text-stone-800" size={24} />
                <h2 className="text-2xl font-light text-stone-900">8. Project Suspension & Termination</h2>
              </div>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                Either party may terminate an active project contract with a written notice of 7 business days. The following conditions apply:
              </p>
              <ul className="space-y-2 text-sm text-stone-600 pl-4 list-disc">
                <li>Materials already purchased or custom furniture panels in production must be fully compensated by the client upon termination.</li>
                <li>Payments made against milestones where physical site work has commenced are non-refundable.</li>
                <li>Any balance owed for work completed up to the date of termination remains payable.</li>
              </ul>
            </section>

            {/* 9. Website Use & Conduct */}
            <section id="website-use" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <Shield className="text-stone-800" size={24} />
                <h2 className="text-2xl font-light text-stone-900">9. Website Use & Conduct</h2>
              </div>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">You agree to use this Website only for lawful purposes and in a manner that does not infringe the rights of others. You must not:</p>
              <ul className="space-y-2 text-sm text-stone-600 pl-4 list-disc">
                <li>Use the Website in any way that violates applicable Indian or international laws or regulations</li>
                <li>Transmit any unsolicited or unauthorised advertising or promotional material</li>
                <li>Attempt to gain unauthorised access to any part of the Website or its related systems</li>
                <li>Reproduce, duplicate, copy, sell, or exploit any portion of the Website without express written permission</li>
              </ul>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                We make every effort to ensure information on this Website is accurate and up to date. However, we do not warrant that all content is complete, current, or error-free. Cost ranges and timelines shown are indicative estimates and will vary based on project scope, materials, and site conditions. Our Website may contain links to third-party websites for convenience only — we accept no responsibility for their content.
              </p>
            </section>

            {/* 10. Limitation of Liability */}
            <section id="liability" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <Scale className="text-stone-800" size={24} />
                <h2 className="text-2xl font-light text-stone-900">10. Limitation of Liability</h2>
              </div>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                To the fullest extent permitted by applicable law, Apka Interior Wala shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of this Website or the information contained herein.
              </p>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                Our total liability in any matter arising from these Terms or the use of this Website shall not exceed INR 1,000 (One Thousand Rupees).
              </p>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                This Website is provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. We do not warrant that the Website will be uninterrupted, error-free, or free of viruses or other harmful components.
              </p>
            </section>

            {/* 11. Governing Law */}
            <section id="governing-law" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <Scale className="text-stone-800" size={24} />
                <h2 className="text-2xl font-light text-stone-900">11. Governing Law & Jurisdiction</h2>
              </div>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                These Terms of Service are governed by the laws of India, including the Information Technology Act, 2000 and the Consumer Protection Act, 2019. Any dispute arising in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Bhopal, Madhya Pradesh, India.
              </p>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                Your use of this Website is also governed by our{' '}
                <Link to="/privacy" className="text-stone-900 font-medium underline underline-offset-2 hover:opacity-70 transition-opacity">Privacy Policy</Link>,
                which is incorporated into these Terms by reference.
              </p>
            </section>

            {/* 12. Changes to Terms */}
            <section id="changes" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <FileText className="text-stone-800" size={24} />
                <h2 className="text-2xl font-light text-stone-900">12. Changes to Terms</h2>
              </div>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the Website. Your continued use of the Website after any changes constitutes your acceptance of the new terms.
              </p>
            </section>

            {/* 13. Contact Us */}
            <section id="contact" className="scroll-mt-24 space-y-6">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <Mail className="text-stone-800" size={24} />
                <h2 className="text-2xl font-light text-stone-900">13. Contact Us</h2>
              </div>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                For any questions regarding these Terms of Service, please contact:
              </p>
              <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-4 text-sm text-stone-700">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-stone-500 shrink-0 mt-0.5" />
                  <span><strong>Apka Interior Wala</strong>, Shop No. 10, Patwa Market, Near Bharat Talkies, Bhopal – 462001, Madhya Pradesh, India</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-stone-500 shrink-0" />
                  <a href="mailto:info@apkainteriorwala.com" className="text-stone-900 font-medium hover:underline">info@apkainteriorwala.com</a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-stone-500 shrink-0" />
                  <a href="tel:+917893365987" className="text-stone-900 font-medium hover:underline">+91 78933 65987</a>
                </div>
              </div>

              <div className="border-t border-stone-100 pt-8 flex flex-col sm:flex-row gap-4 text-sm">
                <Link to="/privacy" className="font-bold text-stone-900 underline underline-offset-2 hover:opacity-70 transition-opacity">Privacy Policy</Link>
                <Link to="/contact" className="font-bold text-stone-900 underline underline-offset-2 hover:opacity-70 transition-opacity">Contact Us</Link>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
