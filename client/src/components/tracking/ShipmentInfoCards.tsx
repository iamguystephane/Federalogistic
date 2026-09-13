import { Mail, MapPin, Package, Phone, User, Weight, CalendarDays, Activity } from "lucide-react"
import type { TrackingResult } from "../../data/trackingResult"
import { getActiveStatus, getActiveBadgeClass } from "../../data/trackingResult"
import { formatDateTime } from "../../lib/utils"

type Props = { data: TrackingResult }

function InfoCard({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 shadow-sm">
      <div className="flex items-center gap-2 text-[0.95rem] font-bold text-blue-600">
        <Icon className="h-4 w-4" />
        {title}
      </div>
      <div className="mt-4 space-y-2.5 text-[0.975rem]">
        {children}
      </div>
    </div>
  )
}

function Row({ icon: Icon, label, value, badge }: { icon: React.ElementType; label?: string; value: string; badge?: string }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
      <div>
        {label && <span className="text-slate-500">{label} </span>}
        {badge ? (
          <span className={`rounded-full px-2 py-0.5 text-[0.83rem] font-bold ${badge}`}>{value}</span>
        ) : (
          <span className="font-semibold text-slate-800">{value}</span>
        )}
      </div>
    </div>
  )
}

export function ShipmentInfoCards({ data }: Props) {
  const activeStatus = getActiveStatus(data)
  const badgeClass = getActiveBadgeClass(activeStatus)

  return (
    <div className="mx-auto max-w-[1200px] px-5 pb-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Sender Information" icon={User}>
          <Row icon={User} value={data.sender.name} />
          <Row icon={MapPin} value={data.sender.address} />
          <Row icon={Phone} value={data.sender.phone} />
          {data.sender.email && <Row icon={Mail} value={data.sender.email} />}
        </InfoCard>

        <InfoCard title="Receiver Information" icon={User}>
          <Row icon={User} value={data.receiver.name} />
          <Row icon={MapPin} value={data.receiver.address} />
          <Row icon={Phone} value={data.receiver.phone} />
          <Row icon={Mail} value={data.receiver.email} />
        </InfoCard>

        <InfoCard title="Shipment Details" icon={Package}>
          <Row icon={Weight} label="Weight:" value={data.shipment.weight} />
          <Row icon={Activity} label="Type:" value={data.shipment.type} />
          <Row icon={CalendarDays} label="Shipped:" value={formatDateTime(data.shipment.shippedDate) || data.shipment.shippedDate} />
        </InfoCard>

        <InfoCard title="Status Information" icon={Activity}>
          <Row icon={Activity} label="Status:" value={activeStatus} badge={badgeClass} />
          <Row icon={MapPin} label="Location:" value={data.statusInfo.location} />
        </InfoCard>
      </div>
    </div>
  )
}
