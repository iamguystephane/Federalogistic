export type PaymentStatus = "pending" | "approved" | "declined"

const statusKey = (tn: string) => `pmt_status_${tn}`
const txKey = (tn: string) => `pmt_txid_${tn}`
const dateKey = (tn: string) => `pmt_date_${tn}`
const methodKey = (tn: string) => `pmt_method_${tn}`

export function getPaymentStatus(trackingNumber: string): PaymentStatus | null {
  try {
    return (localStorage.getItem(statusKey(trackingNumber)) as PaymentStatus) || null
  } catch { return null }
}

export function setPaymentStatus(trackingNumber: string, status: PaymentStatus | null) {
  try {
    if (status === null) {
      localStorage.removeItem(statusKey(trackingNumber))
      localStorage.removeItem(txKey(trackingNumber))
      localStorage.removeItem(dateKey(trackingNumber))
      localStorage.removeItem(methodKey(trackingNumber))
    } else {
      localStorage.setItem(statusKey(trackingNumber), status)
    }
  } catch { /* ignore */ }
}

export function initPaymentRecord(trackingNumber: string, method: string) {
  try {
    if (!localStorage.getItem(txKey(trackingNumber))) {
      localStorage.setItem(txKey(trackingNumber), "TX-" + Math.floor(Math.random() * 90000 + 10000))
      localStorage.setItem(dateKey(trackingNumber), new Date().toISOString())
      localStorage.setItem(methodKey(trackingNumber), method)
    }
  } catch { /* ignore */ }
}

export function getPaymentRecord(trackingNumber: string) {
  try {
    const iso = localStorage.getItem(dateKey(trackingNumber))
    const date = iso ? new Date(iso) : new Date()
    return {
      txId: localStorage.getItem(txKey(trackingNumber)) ?? "TX-00000",
      method: localStorage.getItem(methodKey(trackingNumber)) ?? "Bitcoin",
      dateStr: date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      timeStr: date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    }
  } catch {
    return { txId: "TX-00000", method: "Bitcoin", dateStr: "—", timeStr: "—" }
  }
}
