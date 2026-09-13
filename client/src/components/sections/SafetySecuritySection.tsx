import { Lock, Shield } from "lucide-react"
import { IconCircle } from "../IconCircle"

export function SafetySecuritySection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-[1200px] gap-14 px-5 lg:grid-cols-2">
        <div>
          <div className="flex items-center gap-4">
            <IconCircle icon={Shield} className="h-14 w-14 bg-green-500" />
            <h2 className="text-[1.65rem] font-extrabold text-slate-950">Safety First</h2>
          </div>
          <div className="mt-5 space-y-4 text-[0.9rem] leading-relaxed text-slate-700">
            <p>
              At Federalogistic, ensuring the safety of our customers, employees and our
              communities is our priority. We understand the importance of continuous training and
              are proud of our safety knowledge, experienced staff and ability to exceed industry
              standards year after year.
            </p>
            <p>
              We have established and continually maintain excellent motor carrier safety ratings
              and low accident frequencies. As a company, we have a solid safety performance history
              and will continue to be a leader in the area of safety and compliance.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-green-50 p-4 text-center">
              <div className="text-[1.35rem] font-extrabold text-green-600">99.9%</div>
              <div className="text-xs text-slate-700">Safety Rating</div>
            </div>
            <div className="rounded-lg bg-green-50 p-4 text-center">
              <div className="text-[1.35rem] font-extrabold text-green-600">24/7</div>
              <div className="text-xs text-slate-700">Monitoring</div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4">
            <IconCircle icon={Lock} className="h-14 w-14" />
            <h2 className="text-[1.65rem] font-extrabold text-slate-950">Advanced Security</h2>
          </div>
          <div className="mt-5 space-y-4 text-[0.9rem] leading-relaxed text-slate-700">
            <p>
              At Federalogistic, we offer industry-leading asset protection and security
              compliance programs. We understand that our customers may have important and unique
              needs related to homeland security regulatory compliance, high-risk products, or brand
              protection.
            </p>
            <p>
              By leveraging modern and proven technologies, we provide for the integrity of customer
              assets while in-transit or at one of our facilities. We offer consultation and
              proactive partnership to ensure that our customers' security needs are met.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-blue-50 p-4 text-center">
              <div className="text-[1.35rem] font-extrabold text-blue-600">256-bit</div>
              <div className="text-xs text-slate-700">Encryption</div>
            </div>
            <div className="rounded-lg bg-blue-50 p-4 text-center">
              <div className="text-[1.35rem] font-extrabold text-blue-600">ISO</div>
              <div className="text-xs text-slate-700">Certified</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
