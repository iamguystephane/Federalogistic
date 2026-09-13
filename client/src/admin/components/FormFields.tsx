export function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  error,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
  placeholder?: string
  error?: string
}) {
  return (
    <label className="block">
      <span className="text-[0.72rem] font-bold uppercase tracking-wider text-slate-500">
        {label} {required && <span className="text-red-400">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || label}
        className={`mt-1.5 h-10 w-full rounded-lg border bg-slate-50 px-3 text-sm font-medium text-slate-800 outline-none transition focus:bg-white focus:ring-3 ${error ? "border-red-400 focus:border-red-400 focus:ring-red-400/10" : "border-slate-200 focus:border-[#2459d8] focus:ring-[#2459d8]/10"}`}
      />
      {error && <p className="mt-1 text-xs font-semibold text-red-500">{error}</p>}
    </label>
  )
}

export function TextArea({
  label,
  value,
  onChange,
  required,
  error,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  error?: string
}) {
  return (
    <label className="block">
      <span className="text-[0.72rem] font-bold uppercase tracking-wider text-slate-500">
        {label} {required && <span className="text-red-400">*</span>}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1.5 min-h-20 w-full rounded-lg border bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-800 outline-none transition focus:bg-white focus:ring-3 ${error ? "border-red-400 focus:border-red-400 focus:ring-red-400/10" : "border-slate-200 focus:border-[#2459d8] focus:ring-[#2459d8]/10"}`}
      />
      {error && <p className="mt-1 text-xs font-semibold text-red-500">{error}</p>}
    </label>
  )
}

export function SelectField({
  label,
  value,
  options,
  onChange,
  error,
}: {
  label: string
  value: string
  options: string[]
  onChange: (v: string) => void
  required?: boolean
  error?: string
}) {
  return (
    <label className="block">
      <span className="text-[0.72rem] font-bold uppercase tracking-wider text-slate-500">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1.5 h-10 w-full rounded-lg border bg-slate-50 px-3 text-sm font-medium text-slate-800 outline-none transition focus:bg-white focus:ring-3 ${error ? "border-red-400 focus:border-red-400 focus:ring-red-400/10" : "border-slate-200 focus:border-[#2459d8] focus:ring-[#2459d8]/10"}`}
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs font-semibold text-red-500">{error}</p>}
    </label>
  )
}

export function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-extrabold text-slate-800 flex items-center gap-2">
        <span className="h-4 w-1 rounded-full bg-[#2459d8] inline-block" />
        {title}
      </h3>
      {children}
    </div>
  )
}
