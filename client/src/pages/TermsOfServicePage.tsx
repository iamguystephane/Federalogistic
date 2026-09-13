import { WaveBanner } from "../components/sections/WaveBanner"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="mb-4 text-[1.15rem] font-extrabold text-slate-900 border-l-4 border-blue-600 pl-4">{title}</h2>
      <div className="space-y-3 text-[0.9rem] leading-relaxed text-slate-600">{children}</div>
    </div>
  )
}

export function TermsOfServicePage() {
  return (
    <>
      <WaveBanner
        title="Terms of Service"
        subtitle="Please read these terms carefully before using our services. They govern your use of Federalogistic."
        breadcrumb="Terms of Service"
      />

      <div className="bg-white py-16">
        <div className="mx-auto max-w-[860px] px-5">

          <div className="mb-10 rounded-2xl border border-amber-100 bg-amber-50 px-6 py-4 text-[0.85rem] text-amber-800">
            <span className="font-bold">Effective Date: May 23, 2026.</span> By accessing or using Federalogistic services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
          </div>

          <Section title="1. Acceptance of Terms">
            <p>These Terms of Service ("Terms") constitute a legally binding agreement between you ("Customer," "you," or "your") and Federalogistic ("Company," "we," "us," or "our"). By creating a shipment, using our tracking platform, or accessing our website, you acknowledge that you have read, understood, and agree to be bound by these Terms.</p>
            <p>We reserve the right to modify these Terms at any time. Changes become effective upon posting. Your continued use of our services after modifications constitutes acceptance of the revised Terms.</p>
          </Section>

          <Section title="2. Eligibility and Account Responsibility">
            <p>To use our services, you must be at least 18 years of age and have the legal capacity to enter into binding contracts. By using our services, you represent and warrant that you meet these requirements.</p>
            <p>You are responsible for:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Providing accurate, complete, and current information when creating shipments or accounts.</li>
              <li>Maintaining the confidentiality of any login credentials.</li>
              <li>All activities that occur under your account or shipment records.</li>
              <li>Notifying us immediately of any unauthorized access or security breach.</li>
            </ul>
          </Section>

          <Section title="3. Shipping Services">
            <p>Federalogistic provides domestic and international logistics, freight, and courier services. By placing a shipment, you agree to the following conditions:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>You are the authorized shipper or have been duly authorized by the owner of the goods to enter into a contract for carriage.</li>
              <li>You accept these Terms on behalf of yourself and the consignee (recipient).</li>
              <li>You have complied with all applicable laws, customs regulations, and export/import requirements of the origin and destination countries.</li>
              <li>All information provided regarding the contents, weight, dimensions, and value of the shipment is accurate and complete.</li>
            </ul>
          </Section>

          <Section title="4. Prohibited Items">
            <p>The following items are strictly prohibited from being shipped through Federalogistic under any circumstances:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Illegal drugs, narcotics, and controlled substances</li>
              <li>Firearms, weapons, ammunition, and explosives</li>
              <li>Counterfeit currency, documents, or goods</li>
              <li>Human remains, body parts, or biological specimens (without proper medical authorization)</li>
              <li>Live animals (unless via our specialized veterinary logistics program with prior written approval)</li>
              <li>Hazardous materials, flammable liquids, gases, or radioactive substances not properly declared and packaged per IATA/IMDG regulations</li>
              <li>Pornographic or obscene material</li>
              <li>Items that violate any applicable law or regulation in the origin, transit, or destination country</li>
            </ul>
            <p>Shipments found to contain prohibited items will be seized, and the shipper may be subject to legal action and financial penalties. We reserve the right to open and inspect any shipment for compliance.</p>
          </Section>

          <Section title="5. Restricted Items">
            <p>The following items require special handling, additional documentation, or prior written authorization from Federalogistic before shipping:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Perishable goods (food, plants, flowers)</li>
              <li>High-value items exceeding USD 2,500 (jewelry, artwork, antiques, electronics)</li>
              <li>Pharmaceuticals and medical devices</li>
              <li>Alcohol and tobacco products</li>
              <li>Currency, negotiable instruments, and precious metals</li>
              <li>Lithium batteries (must comply with IATA regulations)</li>
            </ul>
            <p>Contact our customer support team before shipping any restricted items to ensure compliance and proper documentation.</p>
          </Section>

          <Section title="6. Pricing, Fees, and Payment">
            <p>Shipping rates are calculated based on weight, dimensions, origin, destination, and selected service level. All prices are in USD unless otherwise specified.</p>
            <ul className="list-disc space-y-1 pl-5">
              <li><span className="font-semibold text-slate-700">Clearance Fees:</span> International shipments may be subject to customs duties, taxes, and import fees determined by the destination country's authorities. These are the responsibility of the recipient unless a Delivery Duty Paid (DDP) arrangement is agreed upon in writing.</li>
              <li><span className="font-semibold text-slate-700">Surcharges:</span> Additional charges may apply for remote area delivery, address corrections, re-delivery attempts, oversized packages, or special handling requirements.</li>
              <li><span className="font-semibold text-slate-700">Payment:</span> Payment is due at the time of shipment creation unless a credit account has been established. We accept major credit cards, PayPal, and bank transfers.</li>
              <li><span className="font-semibold text-slate-700">Non-Payment:</span> Failure to pay outstanding fees may result in your shipment being held and additional storage charges accruing.</li>
            </ul>
          </Section>

          <Section title="7. Liability and Claims">
            <p>Federalogistic liability for loss, damage, or delay is limited as follows:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Unless additional insurance is purchased, our maximum liability for any lost or damaged shipment is the lesser of the declared value or USD 100 per shipment.</li>
              <li>We are not liable for consequential, indirect, or special damages, including loss of income or business opportunities.</li>
              <li>Claims for loss or damage must be filed in writing within 21 days of the scheduled delivery date. Claims submitted after this period will not be accepted.</li>
              <li>We are not liable for delays or non-delivery caused by circumstances beyond our reasonable control, including natural disasters, government actions, customs delays, or civil unrest.</li>
            </ul>
            <p>We strongly recommend purchasing shipment insurance for high-value goods. Contact our team for insurance options.</p>
          </Section>

          <Section title="8. Delivery and Transit Times">
            <p>Estimated delivery times are provided as a guide only and are not guaranteed. Transit times begin from the moment the shipment is collected or dropped off at a Federalogistic facility, not from the time of booking.</p>
            <p>Delays may occur due to customs clearance, weather conditions, holiday periods, incorrect address information, or other factors outside our control. Federalogistic shall not be liable for any loss or expense arising from such delays.</p>
          </Section>

          <Section title="9. Tracking and Notifications">
            <p>We provide real-time tracking for all shipments via our online portal. You are responsible for monitoring your shipment's status. Delivery notifications are provided as a courtesy and do not constitute a guarantee of delivery at the specified time.</p>
          </Section>

          <Section title="10. Intellectual Property">
            <p>All content on the Federalogistic website and platform — including text, graphics, logos, icons, images, and software — is the exclusive property of Federalogistic and is protected by international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.</p>
          </Section>

          <Section title="11. Governing Law and Disputes">
            <p>These Terms shall be governed by and construed in accordance with applicable international commercial law and the laws of the jurisdiction in which the relevant Federalogistic entity operates.</p>
            <p>Any dispute arising from these Terms or our services shall first be attempted to be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be submitted to binding arbitration before a mutually agreed arbitration body. This does not prevent either party from seeking emergency injunctive relief from a court of competent jurisdiction.</p>
          </Section>

          <Section title="12. Termination">
            <p>We reserve the right to suspend or terminate your access to our services at any time, with or without notice, for conduct that we believe violates these Terms, is harmful to other users, our business partners, or our interests, or for any other reason at our sole discretion.</p>
          </Section>

          <Section title="13. Contact Us">
            <p>For questions about these Terms of Service, please contact our legal team:</p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-800">Federalogistic — Legal & Compliance</p>
              <p>Email: <a href="mailto:legal@federalogistic.com" className="text-blue-600 hover:underline">legal@federalogistic.com</a></p>
              <p>Support: <a href="mailto:support@federalogistic.com" className="text-blue-600 hover:underline">support@federalogistic.com</a></p>
              <p className="mt-1">Available 24/7 for Global Logistics Support</p>
            </div>
          </Section>

        </div>
      </div>
    </>
  )
}
