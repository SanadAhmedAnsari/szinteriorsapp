import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Shield, Eye, Lock, FileText, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';

export default function Privacy() {
  const sections = [
    { id: 'who-we-are', label: '1. Who We Are' },
    { id: 'info-collect', label: '2. Information We Collect' },
    { id: 'info-use', label: '3. How We Use It' },
    { id: 'data-storage', label: '4. Data Storage & Security' },
    { id: 'third-parties', label: '5. Third-Party Services' },
    { id: 'your-rights', label: '6. Your Rights' },
    { id: 'cookies', label: '7. Cookies Policy' },
    { id: 'children', label: "8. Children's Privacy" },
    { id: 'policy-updates', label: '9. Policy Updates' },
    { id: 'contact', label: '10. Contact Us' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'Privacy Policy — Apka Interior Wala',
    'description': 'Privacy Policy of Apka Interior Wala, Bhopal. Learn how we collect, use, and protect your personal information when you use our website or contact us.',
    'url': 'https://apkainteriorwala.com/privacy',
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
        <title>Privacy Policy | Apka Interior Wala Bhopal</title>
        <meta name="robots" content="noindex, follow" />
        <meta name="description" content="Privacy Policy of Apka Interior Wala, Bhopal. Learn how we collect, use, and protect your personal information when you use our website or contact us." />
        <link rel="canonical" href="https://apkainteriorwala.com/privacy" />
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
            Legal Information
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-light text-stone-900 md:text-6xl tracking-tight"
          >
            Privacy <span className="italic font-serif text-stone-700">Policy</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-stone-500"
          >
            <span>LAST UPDATED: MAY 2026</span>
            <span className="hidden sm:inline">•</span>
            <span>IT ACT 2000 &amp; DPDP ACT 2023 (INDIA)</span>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900 mb-4 flex items-center gap-2">
                <FileText size={14} className="text-stone-500" />
                Quick Navigation
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

          {/* Policy Content */}
          <div className="lg:col-span-3 bg-white p-8 md:p-12 rounded-3xl border border-stone-200/80 shadow-sm space-y-12">

            {/* 1. Who We Are */}
            <section id="who-we-are" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <Shield className="text-stone-800" size={24} />
                <h2 className="text-2xl font-light text-stone-900">1. Who We Are</h2>
              </div>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                Apka Interior Wala is a premium interior design and construction firm based in Bhopal, Madhya Pradesh, India. Our registered address is Shop No. 10, Patwa Market, Near Bharat Talkies, Bhopal – 462001. You can reach us at{' '}
                <a href="mailto:info@apkainteriorwala.com" className="text-stone-900 font-medium underline underline-offset-2">info@apkainteriorwala.com</a>{' '}
                or{' '}
                <a href="tel:+917893365987" className="text-stone-900 font-medium underline underline-offset-2">+91 78933 65987</a>.
              </p>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                This Privacy Policy explains how we collect, use, and protect the personal information you provide when you visit <strong>apkainteriorwala.com</strong> or contact us through our website.
              </p>
            </section>

            {/* 2. Information We Collect */}
            <section id="info-collect" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <Eye className="text-stone-800" size={24} />
                <h2 className="text-2xl font-light text-stone-900">2. Information We Collect</h2>
              </div>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">We collect information in the following ways:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="p-5 bg-stone-50 rounded-xl space-y-2.5">
                  <h4 className="font-semibold text-stone-900 text-sm">A. Contact Form</h4>
                  <ul className="space-y-1.5 text-xs text-stone-600 list-disc list-inside">
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Your message or project enquiry</li>
                  </ul>
                </div>
                <div className="p-5 bg-stone-50 rounded-xl space-y-2.5">
                  <h4 className="font-semibold text-stone-900 text-sm">B. Analytics Data</h4>
                  <ul className="space-y-1.5 text-xs text-stone-600 list-disc list-inside">
                    <li>Pages visited and time on site</li>
                    <li>Device type and browser</li>
                    <li>Approximate location (city level only)</li>
                    <li>Anonymised usage patterns via GA4</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. How We Use Your Information */}
            <section id="info-use" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <CheckCircle className="text-stone-800" size={24} />
                <h2 className="text-2xl font-light text-stone-900">3. How We Use Your Information</h2>
              </div>
              <ul className="space-y-3 text-sm text-stone-600 pl-4 list-disc">
                <li><strong>Respond to enquiries:</strong> To reply to your questions about interior design or construction services.</li>
                <li><strong>Provide consultations:</strong> To offer quotes, site visits, and follow-up communications.</li>
                <li><strong>Improve our website:</strong> To understand how visitors use our site so we can make it better.</li>
                <li><strong>Legal compliance:</strong> To comply with applicable Indian laws and regulations.</li>
              </ul>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                We do not sell, rent, or share your personal information with third parties for marketing purposes.
              </p>
            </section>

            {/* 4. Data Storage & Security */}
            <section id="data-storage" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <Lock className="text-stone-800" size={24} />
                <h2 className="text-2xl font-light text-stone-900">4. Data Storage &amp; Security</h2>
              </div>
              <ul className="space-y-3 text-sm text-stone-600 pl-4 list-disc">
                <li><strong>Secure Cloud Storage:</strong> Contact form submissions are stored in Google Firebase (Firestore), operating under Google's security and compliance standards.</li>
                <li><strong>SSL Encryption:</strong> Our entire website uses HTTPS encryption to protect data in transit.</li>
                <li><strong>Access Controls:</strong> Firebase security rules restrict data access to authorised personnel only.</li>
              </ul>
              <p className="text-stone-500 italic text-xs pt-2">
                We retain your data only for as long as necessary to fulfil the purpose for which it was collected or as required by law. While we implement appropriate measures, no internet transmission is 100% secure.
              </p>
            </section>

            {/* 5. Third-Party Services */}
            <section id="third-parties" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <FileText className="text-stone-800" size={24} />
                <h2 className="text-2xl font-light text-stone-900">5. Third-Party Services</h2>
              </div>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">Our website uses the following third-party services that may process your data:</p>
              <ul className="space-y-3 text-sm text-stone-600 pl-4 list-disc">
                <li><strong>Google Analytics 4 / Google Tag Manager</strong> — Website analytics (Google LLC, USA)</li>
                <li><strong>Google Firebase</strong> — Secure data storage (Google LLC, USA)</li>
                <li><strong>Google Fonts / CDN services</strong> — Font and asset delivery</li>
              </ul>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                Each of these services has its own privacy policy. We encourage you to review{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-stone-900 font-medium underline underline-offset-2">Google's Privacy Policy</a>{' '}
                for details on how they handle data.
              </p>
            </section>

            {/* 6. Your Rights */}
            <section id="your-rights" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <CheckCircle className="text-stone-800" size={24} />
                <h2 className="text-2xl font-light text-stone-900">6. Your Rights</h2>
              </div>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                Under the Information Technology Act, 2000 and applicable Indian data protection regulations, you have the following rights:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 border border-stone-200 rounded-xl">
                  <span className="font-bold text-stone-900 text-sm block mb-1">Access &amp; Review</span>
                  <p className="text-xs text-stone-500">Request access to the personal data we hold about you.</p>
                </div>
                <div className="p-4 border border-stone-200 rounded-xl">
                  <span className="font-bold text-stone-900 text-sm block mb-1">Rectification</span>
                  <p className="text-xs text-stone-500">Request correction of any inaccurate information — such as your name, phone number, email address, or project details.</p>
                </div>
                <div className="p-4 border border-stone-200 rounded-xl">
                  <span className="font-bold text-stone-900 text-sm block mb-1">Data Erasure</span>
                  <p className="text-xs text-stone-500">Request deletion of your contact form data and related records from Firebase. We will action this within a reasonable timeframe.</p>
                </div>
                <div className="p-4 border border-stone-200 rounded-xl">
                  <span className="font-bold text-stone-900 text-sm block mb-1">Withdraw Consent</span>
                  <p className="text-xs text-stone-500">Withdraw consent for us to contact you at any time, without affecting prior communications.</p>
                </div>
              </div>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                To exercise any of these rights, please email us at{' '}
                <a href="mailto:info@apkainteriorwala.com" className="text-stone-900 font-medium underline underline-offset-2">info@apkainteriorwala.com</a>.
              </p>
            </section>

            {/* 7. Cookies Policy */}
            <section id="cookies" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <Eye className="text-stone-800" size={24} />
                <h2 className="text-2xl font-light text-stone-900">7. Cookies Policy</h2>
              </div>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                We use essential and analytical cookies to operate and improve our website. Analytical cookies (set by Google Analytics via Google Tag Manager) help us understand visitor behaviour in aggregate, anonymised form.
              </p>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                You can control or disable cookies through your browser settings. Disabling cookies will not affect your ability to browse our website, but some features may not function as intended.
              </p>
            </section>

            {/* 8. Children's Privacy */}
            <section id="children" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <Shield className="text-stone-800" size={24} />
                <h2 className="text-2xl font-light text-stone-900">8. Children's Privacy</h2>
              </div>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                Our website is not directed at children under 18. We do not knowingly collect personal information from minors. If you believe we have inadvertently collected such information, please contact us immediately and we will delete it.
              </p>
            </section>

            {/* 9. Policy Updates */}
            <section id="policy-updates" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <FileText className="text-stone-800" size={24} />
                <h2 className="text-2xl font-light text-stone-900">9. Policy Updates</h2>
              </div>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                We may update this Privacy Policy from time to time — for example, in response to changes in digital privacy legislation, updates to the services we use, or changes in how we collect and process data. When we do, we will update the "Last updated" date at the top of this page. We encourage you to review this policy periodically.
              </p>
            </section>

            {/* 10. Contact Us */}
            <section id="contact" className="scroll-mt-24 space-y-6">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <Shield className="text-stone-800" size={24} />
                <h2 className="text-2xl font-light text-stone-900">10. Contact Us</h2>
              </div>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                If you have any questions about this Privacy Policy or how we handle your data, please contact us:
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
                <Link to="/terms" className="font-bold text-stone-900 underline underline-offset-2 hover:opacity-70 transition-opacity">Terms of Service</Link>
                <Link to="/contact" className="font-bold text-stone-900 underline underline-offset-2 hover:opacity-70 transition-opacity">Contact Us</Link>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
