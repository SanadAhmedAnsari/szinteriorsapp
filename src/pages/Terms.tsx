import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="pb-32">
      <Helmet>
        <title>Terms of Service | Apka Interior Wala Bhopal</title>
        <meta name="description" content="Terms of Service for Apka Interior Wala, Bhopal. Read the terms governing use of our website and interior design & construction services." />
        <link rel="canonical" href="https://apkainteriorwala.com/terms" />
      </Helmet>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-16">
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-stone-500">Legal</span>
          <h1 className="mt-4 text-4xl font-light text-stone-900 md:text-5xl">Terms of Service</h1>
          <p className="mt-4 text-sm text-stone-500">Last updated: May 2026</p>
        </div>

        <div className="prose prose-stone max-w-none space-y-10 text-stone-700 leading-relaxed">

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the website <strong>apkainteriorwala.com</strong> ("Website"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Website. These terms apply to all visitors and users of the Website.
            </p>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts in Bhopal, Madhya Pradesh.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900">2. About Apka Interior Wala</h2>
            <p>
              Apka Interior Wala is a premium interior design and construction firm based in Bhopal, Madhya Pradesh. We provide residential interior design, commercial interior design, construction services, turnkey solutions, renovation and remodeling, modular kitchens, false ceilings, and custom furniture across Bhopal, Indore, and Madhya Pradesh.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900">3. Use of Website</h2>
            <p>You agree to use this Website only for lawful purposes and in a manner that does not infringe the rights of others. You must not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the Website in any way that violates applicable Indian or international laws or regulations</li>
              <li>Transmit any unsolicited or unauthorised advertising or promotional material</li>
              <li>Attempt to gain unauthorised access to any part of the Website or its related systems</li>
              <li>Reproduce, duplicate, copy, sell, or exploit any portion of the Website without express written permission from Apka Interior Wala</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900">4. Intellectual Property</h2>
            <p>
              All content on this Website — including but not limited to project photographs, design renders, written content, logos, brand identity, and graphics — is the exclusive property of Apka Interior Wala and is protected under Indian copyright and intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, or use any content from this Website for commercial purposes without prior written consent from Apka Interior Wala.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900">5. Project Enquiries and Consultations</h2>
            <p>
              Submitting an enquiry through our contact form or requesting a consultation does not constitute a binding contract. All projects are subject to a formal written agreement signed by both parties before any work commences.
            </p>
            <p>
              Any estimates, quotations, or project timelines provided during initial consultations are indicative only and subject to detailed site assessment and formal proposal documentation.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900">6. Accuracy of Information</h2>
            <p>
              We make every effort to ensure that the information on this Website is accurate and up to date, including project portfolios, service descriptions, and pricing guidance. However, we do not warrant that all content is complete, current, or error-free.
            </p>
            <p>
              Cost ranges and timelines shown on this Website are indicative estimates based on typical projects. Actual costs and timelines will vary based on the specific scope of work, materials selected, and site conditions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900">7. Third-Party Links</h2>
            <p>
              Our Website may contain links to third-party websites (such as social media profiles, supplier websites, or Google Maps). These links are provided for convenience only. Apka Interior Wala has no control over the content of those sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900">8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, Apka Interior Wala shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of this Website or the information contained herein.
            </p>
            <p>
              Our total liability in any matter arising from these Terms or the use of this Website shall not exceed INR 1,000 (One Thousand Rupees).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900">9. Disclaimer of Warranties</h2>
            <p>
              This Website is provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. We do not warrant that the Website will be uninterrupted, error-free, or free of viruses or other harmful components.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900">10. Privacy</h2>
            <p>
              Your use of this Website is also governed by our <Link to="/privacy" className="text-stone-900 underline underline-offset-2 hover:opacity-70 transition-opacity">Privacy Policy</Link>, which is incorporated into these Terms by reference. Please review it carefully to understand our practices.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900">11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the Website. Your continued use of the Website after any changes constitutes your acceptance of the new terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900">12. Governing Law and Jurisdiction</h2>
            <p>
              These Terms of Service are governed by the laws of India, including the Information Technology Act, 2000 and the Consumer Protection Act, 2019. Any dispute arising in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Bhopal, Madhya Pradesh, India.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900">13. Contact Us</h2>
            <p>For any questions regarding these Terms of Service, please contact:</p>
            <div className="bg-stone-50 rounded-2xl p-8 space-y-2 text-sm">
              <p className="font-bold text-stone-900">Apka Interior Wala</p>
              <p>Shop No. 10, Patwa Market, Near Bharat Talkies, Bhopal – 462001, Madhya Pradesh, India</p>
              <p>Email: <a href="mailto:info@apkainteriorwala.com" className="text-stone-900 underline underline-offset-2">info@apkainteriorwala.com</a></p>
              <p>Phone: <a href="tel:+917893365987" className="text-stone-900 underline underline-offset-2">+91 78933 65987</a></p>
            </div>
          </section>

        </div>

        <div className="mt-16 border-t border-stone-100 pt-10 flex flex-col sm:flex-row gap-4 text-sm">
          <Link to="/privacy" className="font-bold text-stone-900 underline underline-offset-2 hover:opacity-70 transition-opacity">Privacy Policy</Link>
          <Link to="/contact" className="font-bold text-stone-900 underline underline-offset-2 hover:opacity-70 transition-opacity">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
