import { WaveBanner } from "../components/sections/WaveBanner"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="mb-4 text-[1.15rem] font-extrabold text-slate-900 border-l-4 border-blue-600 pl-4">{title}</h2>
      <div className="space-y-3 text-[0.9rem] leading-relaxed text-slate-600">{children}</div>
    </div>
  )
}

export function PrivacyPolicyPage() {
  return (
    <>
      <WaveBanner
        title="Privacy Policy"
        subtitle="Your privacy matters to us. Learn how we collect, use, and protect your personal information."
        breadcrumb="Privacy Policy"
      />

      <div className="bg-white py-16">
        <div className="mx-auto max-w-215 px-5">

          <div className="mb-10 rounded-2xl border border-blue-100 bg-blue-50 px-6 py-4 text-[0.85rem] text-blue-700">
            <span className="font-bold">Last Updated: May 23, 2026.</span> This Privacy Policy describes how Federalogistic collects, uses, and shares information about you when you use our services.
          </div>

          <Section title="1. Information We Collect">
            <p>We collect information you provide directly to us when you create a shipment, track a package, submit a contact form, or otherwise interact with our platform. This includes:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li><span className="font-semibold text-slate-700">Personal Identification:</span> Full name, email address, phone number, and government-issued identification where required for customs.</li>
              <li><span className="font-semibold text-slate-700">Shipping Information:</span> Sender and recipient names, delivery addresses, package weight, contents description, and declared value.</li>
              <li><span className="font-semibold text-slate-700">Payment Information:</span> Billing address and payment details (processed securely via PCI-compliant providers — we do not store full card numbers).</li>
              <li><span className="font-semibold text-slate-700">Device & Usage Data:</span> IP address, browser type, pages visited, time on site, and referring URLs, collected automatically via cookies and similar technologies.</li>
            </ul>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use the information we collect to operate and improve our services, including:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Processing and tracking your shipments and providing real-time status updates.</li>
              <li>Communicating with you about your orders, account activity, and support requests.</li>
              <li>Complying with legal obligations, including customs declarations, export regulations, and anti-fraud requirements.</li>
              <li>Sending transactional emails such as receipts, shipping confirmations, and delivery notifications.</li>
              <li>Improving our website, services, and customer support through analytics and feedback.</li>
              <li>Detecting and preventing fraud, unauthorized access, and other illegal activity.</li>
            </ul>
            <p>We will not use your personal information for marketing communications without your explicit consent.</p>
          </Section>

          <Section title="3. How We Share Your Information">
            <p>We do not sell, rent, or trade your personal information to third parties. We may share your information only in the following circumstances:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li><span className="font-semibold text-slate-700">Logistics Partners:</span> With courier networks, airlines, customs brokers, and last-mile delivery agents necessary to complete your shipment.</li>
              <li><span className="font-semibold text-slate-700">Customs & Government Authorities:</span> As required by law for international shipments, export controls, and import regulations in the origin and destination countries.</li>
              <li><span className="font-semibold text-slate-700">Service Providers:</span> With trusted third-party vendors (payment processors, cloud storage, analytics) who process data on our behalf under strict confidentiality agreements.</li>
              <li><span className="font-semibold text-slate-700">Legal Requirements:</span> When required by a court order, subpoena, or applicable law, or to protect the rights, property, or safety of Federalogistic, our customers, or the public.</li>
            </ul>
          </Section>

          <Section title="4. Cookies and Tracking Technologies">
            <p>Our website uses cookies and similar technologies to enhance your browsing experience. We use:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li><span className="font-semibold text-slate-700">Essential Cookies:</span> Required for the website to function properly (session management, security).</li>
              <li><span className="font-semibold text-slate-700">Analytics Cookies:</span> Help us understand how visitors use our site so we can improve it (e.g., page views, traffic sources).</li>
              <li><span className="font-semibold text-slate-700">Preference Cookies:</span> Remember your settings and preferences for a better experience.</li>
            </ul>
            <p>You can control or disable cookies through your browser settings. Note that disabling essential cookies may affect the functionality of our services.</p>
          </Section>

          <Section title="5. Data Retention">
            <p>We retain your personal information for as long as necessary to fulfill the purposes described in this policy, including:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Shipment records are retained for a minimum of 7 years to comply with customs, tax, and audit requirements.</li>
              <li>Account information is retained for the duration of your account and up to 3 years after closure.</li>
              <li>Payment records are retained as required by financial regulations in applicable jurisdictions.</li>
            </ul>
            <p>When data is no longer needed, it is securely deleted or anonymized.</p>
          </Section>

          <Section title="6. Data Security">
            <p>We implement industry-standard security measures to protect your personal information, including:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>SSL/TLS encryption for all data transmitted between your browser and our servers.</li>
              <li>Secure, access-controlled servers with regular security audits.</li>
              <li>PCI-DSS compliant payment processing through certified third-party providers.</li>
              <li>Employee training on data privacy and security best practices.</li>
            </ul>
            <p>No method of electronic transmission or storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.</p>
          </Section>

          <Section title="7. Your Rights">
            <p>Depending on your location, you may have the following rights regarding your personal data:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li><span className="font-semibold text-slate-700">Access:</span> Request a copy of the personal information we hold about you.</li>
              <li><span className="font-semibold text-slate-700">Correction:</span> Request correction of inaccurate or incomplete information.</li>
              <li><span className="font-semibold text-slate-700">Deletion:</span> Request deletion of your personal data where permitted by law.</li>
              <li><span className="font-semibold text-slate-700">Restriction:</span> Request that we restrict processing of your data in certain circumstances.</li>
              <li><span className="font-semibold text-slate-700">Portability:</span> Receive your personal data in a structured, machine-readable format.</li>
              <li><span className="font-semibold text-slate-700">Objection:</span> Object to our processing of your data for direct marketing or other legitimate interests.</li>
            </ul>
            <p>To exercise any of these rights, please contact us at <a href="mailto:support@federalogistic.com" className="text-blue-600 hover:underline">support@federalogistic.com</a>. We will respond within 30 days.</p>
          </Section>

          <Section title="8. International Data Transfers">
            <p>Given the global nature of our logistics services, your information may be transferred to and processed in countries other than your country of residence. We ensure that such transfers comply with applicable data protection laws, including the use of standard contractual clauses and other appropriate safeguards.</p>
          </Section>

          <Section title="9. Children's Privacy">
            <p>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately and we will take steps to delete it.</p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of significant changes by posting the new policy on this page with an updated "Last Updated" date. Your continued use of our services after such changes constitutes your acceptance of the revised policy.</p>
          </Section>

          <Section title="11. Contact Us">
            <p>If you have questions, concerns, or complaints about this Privacy Policy or our data practices, please contact our Data Privacy Team:</p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-800">Federalogistic — Data Privacy Team</p>
              <p>Email: <a href="mailto:privacy@federalogistic.com" className="text-blue-600 hover:underline">privacy@federalogistic.com</a></p>
              <p>Support: <a href="mailto:support@federalogistic.com" className="text-blue-600 hover:underline">support@federalogistic.com</a></p>
              <p className="mt-1">Available 24/7 for Global Logistics Support</p>
            </div>
          </Section>

        </div>
      </div>
    </>
  )
}
