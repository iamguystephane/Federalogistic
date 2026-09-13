import { ArrowLeft, Home, Radar } from "lucide-react"
import { Button } from "../ui/button"

export function TrackingPageHeader() {
  return (
    <div className="mx-auto max-w-[1200px] px-5 pb-6 pt-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <Radar className="h-5 w-5 text-blue-600" />
            </div>
            <h1 className="text-[1.85rem] font-extrabold text-slate-900">Shipment Tracking</h1>
          </div>
          <div className="mt-2 flex items-center gap-2 pl-1 text-[0.95rem] text-slate-500">
            <Home className="h-3.5 w-3.5" />
            <a href="/" className="hover:text-blue-600">Home</a>
            <span>/</span>
            <span className="text-slate-700 font-medium">Tracking</span>
          </div>
        </div>

        <Button
          variant="outline"
          size="nav"
          onClick={() => (window.location.href = "/")}
          className="shrink-0 rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </div>
    </div>
  )
}
