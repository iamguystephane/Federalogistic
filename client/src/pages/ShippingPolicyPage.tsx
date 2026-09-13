import { WaveBanner } from "../components/sections/WaveBanner"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="mb-4 text-[1.15rem] font-extrabold text-slate-900 border-l-4 border-blue-600 pl-4">{title}</h2>
      <div className="space-y-3 text-[0.9rem] leading-relaxed text-slate-600">{children}</div>
    </div>
  )
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full text-[0.85rem]">
        <thead>
          <tr className="bg-slate-50 text-left">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-bold text-slate-700 border-b border-slate-200">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-slate-600 border-b border-slate-100">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ShippingPolicyPage() {
  return (
    <>
      <WaveBanner
        title="Shipping Policy"
        subtitle="Everything you need to know about how we handle, ship, and deliver your packages around the world."
        breadcrumb="Shipping Policy"
      />

      <div className="bg-white py-16">
        <div className="mx-auto max-w-[860px] px-5">

          <div className="mb-10 rounded-2xl border border-green-100 bg-green-50 px-6 py-4 text-[0.85rem] text-green-800">
            <span className="font-bold">Last Updated: May 23, 2026.</span> This Shipping Policy outlines how Federalogistic processes, ships, and delivers your packages. By placing a shipment, you agree to this policy.
          </div>

          <Section title="1. Service Coverage">
            <p>Federalogistic provides logistics services to over 180 countries and territories worldwide. We offer the following service categories:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li><span className="font-semibold text-slate-700">Express Air Freight:</span> Priority air cargo for time-sensitive shipments.</li>
              <li><span className="font-semibold text-slate-700">Standard International:</span> Cost-effective shipping for non-urgent international packages.</li>
              <li><span className="font-semibold text-slate-700">Domestic Courier:</span> Next-day and same-day delivery options within supported regions.</li>
              <li><span className="font-semibold text-slate-700">Ocean Freight:</span> Bulk and containerized cargo for large shipments.</li>
              <li><span className="font-semibold text-slate-700">Diplomatic Services:</span> Secure, priority handling for government and diplomatic parcels.</li>
            </ul>
            <p>Service availability varies by region. Contact our team to confirm coverage for your specific origin and destination.</p>
          </Section>

          <Section title="2. Estimated Transit Times">
            <p>The following are estimated transit times under normal operating conditions. These are not guaranteed and may be affected by customs clearance, holidays, weather, or other external factors.</p>
            <Table
              headers={["Service", "Estimated Transit Time", "Tracking"]}
              rows={[
                ["Express Air Freight", "1 – 3 business days", "Real-time"],
                ["Standard International", "5 – 10 business days", "Real-time"],
                ["Economy International", "10 – 20 business days", "Milestone updates"],
                ["Domestic Express", "Next business day", "Real-time"],
                ["Domestic Standard", "2 – 5 business days", "Real-time"],
                ["Ocean Freight (FCL)", "15 – 45 business days", "Port-to-port updates"],
              ]}
            />
            <p>Transit time begins when your shipment is physically collected or accepted at one of our facilities, not at the time of online booking.</p>
          </Section>

          <Section title="3. Packaging Requirements">
            <p>Proper packaging is your responsibility as the shipper. Inadequately packaged goods that are damaged during transit may not be eligible for compensation. We require that:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>All items are packed securely in a sturdy outer box or packaging appropriate for the contents.</li>
              <li>Fragile items are individually wrapped with sufficient cushioning material (bubble wrap, foam, etc.) and clearly marked "FRAGILE."</li>
              <li>Liquids are double-sealed and placed in leak-proof secondary packaging.</li>
              <li>The shipment label is clearly visible, securely attached, and not placed over seams or openings.</li>
              <li>Any previous shipping labels, barcodes, or markings on reused boxes are removed or completely covered.</li>
            </ul>
            <p>We offer professional packing services at select locations for an additional fee. Contact your nearest Federalogistic service center for availability.</p>
          </Section>

          <Section title="4. Weight and Dimension Limits">
            <p>The following limits apply per individual package:</p>
            <Table
              headers={["Parameter", "Express Air", "Standard International", "Domestic"]}
              rows={[
                ["Maximum Weight", "70 kg", "70 kg", "30 kg"],
                ["Maximum Length", "270 cm", "270 cm", "150 cm"],
                ["Max. L + (2×W) + (2×H)", "400 cm", "400 cm", "300 cm"],
                ["Minimum Weight", "0.1 kg", "0.1 kg", "0.1 kg"],
              ]}
            />
            <p>Packages exceeding these limits must be booked as freight shipments. Contact our freight team for a custom quote. Dimensional (volumetric) weight may apply — we charge based on whichever is greater, actual weight or dimensional weight.</p>
            <p><span className="font-semibold text-slate-700">Dimensional weight formula:</span> (Length × Width × Height in cm) ÷ 5,000 = Dimensional Weight in kg.</p>
          </Section>

          <Section title="5. Customs and Import Duties">
            <p>International shipments are subject to customs inspection and may incur import duties, taxes, and fees assessed by the destination country's customs authority. These charges are separate from our shipping fees and are:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Determined solely by the destination country's customs laws and import regulations.</li>
              <li>The responsibility of the recipient (consignee) unless a Delivery Duty Paid (DDP) arrangement has been established.</li>
              <li>Not refundable by Federalogistic under any circumstances.</li>
              <li>Required to be paid before the package can be released for delivery.</li>
            </ul>
            <p>It is the shipper's responsibility to provide accurate customs declarations, including a truthful description of goods, their value, and the appropriate HS tariff code. Undervaluing shipments to evade customs duties is illegal and may result in seizure, fines, and legal action.</p>
            <p>Customs clearance delays are common and are outside our control. Transit time estimates do not include time spent in customs.</p>
          </Section>

          <Section title="6. Shipment Tracking">
            <p>All shipments processed through Federalogistic include a unique tracking number provided at the time of booking. You can track your shipment:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Online via our <a href="/track-order" className="text-blue-600 hover:underline">Track Shipment</a> page using your tracking number.</li>
              <li>Through the search bar in our website navigation or footer Quick Track form.</li>
              <li>By contacting our customer support team with your tracking number.</li>
            </ul>
            <p>Tracking events are updated in real-time at each transit milestone. For economy international shipments, updates may be less frequent due to carrier limitations.</p>
          </Section>

          <Section title="7. Delivery Attempts and Failed Delivery">
            <p>Our courier partners will make a maximum of three delivery attempts for parcels that cannot be delivered:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li><span className="font-semibold text-slate-700">1st Attempt:</span> Standard delivery to the provided address.</li>
              <li><span className="font-semibold text-slate-700">2nd Attempt:</span> Made the next business day if the recipient was unavailable or premises inaccessible.</li>
              <li><span className="font-semibold text-slate-700">3rd Attempt:</span> Final attempt; a notification is left advising the recipient to arrange collection or re-delivery.</li>
            </ul>
            <p>After three failed delivery attempts, the package will be held at a local depot for up to 5 business days before being returned to the sender. Return shipping costs are the shipper's responsibility. Additional re-delivery attempts may be arranged for a fee.</p>
          </Section>

          <Section title="8. Undeliverable Shipments">
            <p>A shipment may be deemed undeliverable if:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>The delivery address is incomplete, incorrect, or does not exist.</li>
              <li>The recipient has refused the delivery.</li>
              <li>The package contains prohibited or restricted items that are seized by customs.</li>
              <li>Required customs documentation is missing or incorrect.</li>
              <li>Customs duties or fees were not paid by the recipient.</li>
            </ul>
            <p>Federalogistic is not responsible for undeliverable shipments resulting from incorrect address information or recipient refusal. Return shipping costs and any applicable storage fees will be charged to the shipper.</p>
          </Section>

          <Section title="9. Loss and Damage Claims">
            <p>In the event your shipment is lost or arrives damaged, please follow these steps:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li><span className="font-semibold text-slate-700">Report immediately:</span> Notify us within 24 hours of delivery for damaged goods, or within 3 days of the expected delivery date for suspected lost shipments.</li>
              <li><span className="font-semibold text-slate-700">Document everything:</span> Retain all original packaging and take photographs of damaged items and packaging before discarding anything.</li>
              <li><span className="font-semibold text-slate-700">File a formal claim:</span> Submit a written claim to <a href="mailto:claims@federalogistic.com" className="text-blue-600 hover:underline">claims@federalogistic.com</a> within 21 days of the delivery date, including your tracking number, proof of value, and photographic evidence.</li>
            </ul>
            <p>Claims are reviewed within 10 business days of receipt. Compensation is subject to our standard liability limits as outlined in our Terms of Service. We strongly recommend purchasing additional shipment insurance for high-value goods.</p>
          </Section>

          <Section title="10. Shipment Insurance">
            <p>While we take every precaution to handle your shipments safely, we recommend purchasing additional insurance for valuables. Our standard liability coverage is USD 100 per shipment.</p>
            <p>Extended insurance coverage is available at the time of booking, calculated as a percentage of the declared shipment value. Insured shipments receive priority claims processing and full replacement value up to the declared amount. Contact our customer support team to add insurance to your shipment.</p>
          </Section>

          <Section title="11. Special Handling Services">
            <p>We offer the following special handling services for an additional fee:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li><span className="font-semibold text-slate-700">Temperature-Controlled Shipping:</span> For pharmaceutical products, perishable foods, and biological samples requiring specific temperature ranges.</li>
              <li><span className="font-semibold text-slate-700">White Glove Service:</span> Premium handling, assembly, and placement service for high-value or oversized items.</li>
              <li><span className="font-semibold text-slate-700">Hazardous Materials:</span> Certified handling for goods classified under IATA Dangerous Goods Regulations (DGR) with proper documentation.</li>
              <li><span className="font-semibold text-slate-700">Signature Required:</span> Mandatory recipient signature upon delivery for added security.</li>
            </ul>
            <p>All special handling requests must be arranged prior to shipment and confirmed in writing by our operations team.</p>
          </Section>

          <Section title="12. Contact and Support">
            <p>Our customer support team is available 24/7 to assist with any shipping-related questions or concerns.</p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-1">
              <p className="font-semibold text-slate-800">Federalogistic — Customer Support</p>
              <p>Email: <a href="mailto:support@federalogistic.com" className="text-blue-600 hover:underline">support@federalogistic.com</a></p>
              <p>Claims: <a href="mailto:claims@federalogistic.com" className="text-blue-600 hover:underline">claims@federalogistic.com</a></p>
              <p>Track a shipment: <a href="/track-order" className="text-blue-600 hover:underline">federalogistic.com/track-order</a></p>
              <p className="mt-1">Available 24/7 · Global Coverage · 180+ Countries</p>
            </div>
          </Section>

        </div>
      </div>
    </>
  )
}
