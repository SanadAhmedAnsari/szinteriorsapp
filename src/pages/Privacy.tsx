import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="pb-32">
      <Helmet>
        <title>Privacy Policy | Apka Interior Wala Bhopal</title>
        <meta name="description" content="Privacy Policy of Apka Interior Wala, Bhopal. Learn how we collect, use, and protect your personal information when you use our website or contact us." />
        <link rel="canonical" href="https://apkainteriorwala.com/privacy" />
      </Helmet>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-16">
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-stone-500">Legal</span>
          <h1 className="mt-4 text-4xl font-light text-stone-900 md:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-sm text-stone-500">Last updated: May 2026</p>
        </div>

        <div className="prose prose-stone max-w-none space-y-10 text-stone-700 leading-relaxed">

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900">1. Who We Are</h2>
            <p>
              Apka Interior Wala is a premium interior design and construction firm based in Bhopal, Madhya Pradesh, India. Our registered address is Shop No. 10, Patwa Market, Near Bharat Talkies, Bhopal – 462001. You can reach us at <a href="mailto:info@apkainteriorwala.com" className="text-stone-900 underline underline-offset-2">info@apkainteriorwala.com</a> or <a href="tel:+917893365987" className="text-stone-900 underline underline-offset-2">+91 78933 65987</a>.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, and protect the personal information you provide when you visit <strong>apkainteriorwala.com</strong> or contact us through our website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900">2. Information We Collect</h2>
            <p>We collect information in the following ways:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contact Form:</strong> When you submit an enquiry, we collect your name, email address, phone number, and message.</li>
              <li><strong>Analytics Data:</strong> We use Google Tag Manager and Google Analytics 4 to collect anonymised usage data — pages visited, time on site, device type, and approximate location (city level). This data does not identify you personally.</li>
              <li><strong>Cookies:</strong> Our website uses cookies set by Google Analytics to track visits and usage patterns. You can disable cookies in your browser settings at any time.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To respond to your enquiry about interior design or construction services</li>
              <li>To provide quotes, consultations, or follow-up communications</li>
              <li>To understand how visitors use our website so we can improve it</li>
              <li>To comply with applicable Indian laws and regulations</li>
            </ul>
            <p>We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900">4. Data Storage and Security</h2>
            <p>
              Contact form submissions are stored securely in Google Firebase (Firestore), a service provided by Google LLC. Firebase operates under Google's security and compliance standards. We retain your data only for as long as necessary to fulfil the purpose for which it was collected or as required by law.
            </p>
            <p>
              We implement appropriate technical and organisational measures to protect your data against unauthorised access, loss, or misuse.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900">5. Third-Party Services</h2>
            <p>Our website uses the following third-party services that may process your data:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google Analytics 4 / Google Tag Manager</strong> — Website analytics (Google LLC, USA)</li>
              <li><strong>Google Firebase</strong> — Secure data storage (Google LLC, USA)</li>
              <li><strong>Google Fonts / CDN services</strong> — Font and asset delivery</li>
            </ul>
            <p>Each of these services has its own privacy policy. We encourage you to review <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-stone-900 underline underline-offset-2">Google's Privacy Policy</a> for details on how they handle data.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900">6. Your Rights</h2>
            <p>Under the Information Technology Act, 2000 and applicable Indian data protection regulations, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Request access to the personal data we hold about you</li>
              <li>Request correction or deletion of your personal data</li>
              <li>Withdraw consent for us to contact you at any time</li>
            </ul>
            <p>To exercise any of these rights, please email us at <a href="mailto:info@apkainteriorwala.com" className="text-stone-900 underline underline-offset-2">info@apkainteriorwala.com</a>.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900">7. Cookies Policy</h2>
            <p>
              We use essential and analytical cookies to operate and improve our website. Analytical cookies (set by Google Analytics) help us understand visitor behaviour in aggregate, anonymised form.
            </p>
            <p>
              You can control or disable cookies through your browser settings. Disabling cookies will not affect your ability to browse our website, but some features may not function as intended.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900">8. Children's Privacy</h2>
            <p>
              Our website is not directed at children under 18. We do not knowingly collect personal information from minors. If you believe we have inadvertently collected such information, please contact us immediately and we will delete it.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we do, we will update the "Last updated" date at the top of this page. We encourage you to review this policy periodically.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or how we handle your data, please contact:</p>
            <div className="bg-stone-50 rounded-2xl p-8 space-y-2 text-sm">
              <p className="font-bold text-stone-900">Apka Interior Wala</p>
              <p>Shop No. 10, Patwa Market, Near Bharat Talkies, Bhopal – 462001, Madhya Pradesh, India</p>
              <p>Email: <a href="mailto:info@apkainteriorwala.com" className="text-stone-900 underline underline-offset-2">info@apkainteriorwala.com</a></p>
              <p>Phone: <a href="tel:+917893365987" className="text-stone-900 underline underline-offset-2">+91 78933 65987</a></p>
            </div>
          </section>

        </div>

        <div className="mt-16 border-t border-stone-100 pt-10 flex flex-col sm:flex-row gap-4 text-sm">
          <Link to="/terms" className="font-bold text-stone-900 underline underline-offset-2 hover:opacity-70 transition-opacity">Terms of Service</Link>
          <Link to="/contact" className="font-bold text-stone-900 underline underline-offset-2 hover:opacity-70 transition-opacity">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
