import {
  Activity,
  CalendarDays,
  CheckCircle2,
  Clock,
  DollarSign,
  Grid3X3,
  Package,
  Printer,
  Truck,
  Weight,
} from "lucide-react"
import { Button } from "../ui/button"
import type { TrackingResult } from "../../data/trackingResult"
import { getActiveStatus, getActiveBadgeClass } from "../../data/trackingResult"
import { formatDateTime, formatMoney } from "../../lib/utils"

type Props = { data: TrackingResult }

function InfoField({ icon: Icon, label, value, badge }: { icon: React.ElementType; label: string; value: string; badge?: string }) {
  return (
    <div className="border-b border-slate-100 pb-4">
      <div className="flex items-center gap-1.5 text-[0.88rem] font-semibold text-blue-600 mb-1">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      {badge ? (
        <span className={`rounded-full px-2.5 py-0.5 text-[0.83rem] font-bold ${badge}`}>{value}</span>
      ) : (
        <p className="text-[1rem] font-semibold text-slate-800">{value}</p>
      )}
    </div>
  )
}

export function ParcelInformation({ data }: Props) {
  const { parcel } = data
  const activeStatus = getActiveStatus(data)
  const statusBadge = getActiveBadgeClass(activeStatus)
  const dutyBadge = parcel.dutyFees === "Paid" ? "text-green-600 font-bold" : "text-red-600 font-bold"
  const paymentStatus = (parcel.paymentStatus || "").toLowerCase()
  const hasHistory = Array.isArray(parcel.paymentHistory) && parcel.paymentHistory.length > 0

  return (
    <div className="mx-auto max-w-[1200px] px-5 pb-10">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-2 px-6 py-5 border-b border-slate-100">
          <Grid3X3 className="h-5 w-5 text-blue-600" />
          <h2 className="text-[1.2rem] font-extrabold text-slate-900">Parcel Information</h2>
        </div>

        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-[280px_1fr]">
            {parcel.itemImageUrl ? (
              <div className="flex items-start justify-center rounded-xl border border-slate-200 bg-slate-50 p-2">
                <img src={parcel.itemImageUrl} alt="Parcel" className="max-h-105 w-full rounded-lg object-contain" />
              </div>
            ) : (
              <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50">
                <Package className="h-8 w-8 text-slate-300" />
                <p className="text-[0.78rem] font-semibold text-slate-400">No image</p>
              </div>
            )}

            <div className="grid gap-x-8 gap-y-0 sm:grid-cols-3">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-1.5 text-[0.88rem] font-semibold text-blue-600 mb-1">
                  <DollarSign className="h-3.5 w-3.5" />
                  Duty Fees
                </div>
                <p className={`text-[1rem] ${dutyBadge}`}>{parcel.dutyFees}</p>
              </div>
              <InfoField icon={Weight} label="Weight" value={parcel.weight} />
              <InfoField icon={CalendarDays} label="Pickup Date" value={formatDateTime(parcel.pickupDate) || parcel.pickupDate} />
              <InfoField icon={CalendarDays} label="Expected Delivery" value={formatDateTime(parcel.expectedDelivery) || parcel.expectedDelivery} />
              <InfoField icon={Truck} label="Delivery Mode" value={parcel.deliveryMode} />
              {parcel.shippingCost !== undefined && (
                <InfoField icon={DollarSign} label="Shipping Cost" value={formatMoney(parcel.shippingCost, parcel.currency)} />
              )}
              {parcel.totalCost !== undefined && (
                <InfoField icon={DollarSign} label="Total Cost" value={formatMoney(parcel.totalCost, parcel.currency)} />
              )}
              {parcel.paymentStatus && <InfoField icon={DollarSign} label="Payment Status" value={parcel.paymentStatus} />}
              {parcel.packageType && <InfoField icon={Grid3X3} label="Package Type" value={parcel.packageType} />}
              <InfoField icon={Activity} label="Tracking Status" value={activeStatus} badge={statusBadge} />
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              className="h-11 rounded-xl px-6 text-sm font-semibold"
              onClick={() => (window.location.href = `/printnow?tracking=${encodeURIComponent(data.trackingNumber)}`)}
            >
              <Printer className="h-4 w-4" />
              Print Receipt
            </Button>

            {/* Clearance fee — only visible when unpaid and fee is set */}
            {parcel.clearanceFee !== undefined && parcel.clearanceFee > 0 && (
              <Button
                className="h-11 rounded-xl bg-green-600 px-6 text-sm font-semibold hover:bg-green-700"
                onClick={() => (window.location.href = `/deposits?tracking=${encodeURIComponent(data.trackingNumber)}`)}
              >
                <DollarSign className="h-4 w-4" />
                Pay Clearance Fee ({formatMoney(parcel.clearanceFee, parcel.currency)})
              </Button>
            )}
          </div>

          {/* Payment pending notice */}
          {paymentStatus === "pending" && (
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
              <Clock className="h-4 w-4 shrink-0 text-amber-500" />
              <p className="text-[0.95rem] font-semibold text-amber-800">Your payment proof is under review. You will be notified once it is approved.</p>
            </div>
          )}


          {/* Payment history */}
          {hasHistory && (
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-4 w-4 text-blue-600" />
                <h3 className="text-[1.05rem] font-extrabold text-slate-900">Payment History</h3>
              </div>
              <div className="space-y-3">
                {parcel.paymentHistory!.map((entry, i) => (
                  <div key={i} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-green-100 bg-green-50 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
                      <div>
                        <p className="text-[0.95rem] font-bold text-slate-800">
                          {formatMoney(entry.amount, parcel.currency)} via {entry.method}
                        </p>
                        <p className="text-[0.83rem] text-slate-500 mt-0.5">
                          Approved {formatDateTime(entry.approvedAt) || entry.approvedAt}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-green-100 px-3 py-0.5 text-[0.82rem] font-bold text-green-700">Approved</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
