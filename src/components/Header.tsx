import { MapPin, ChevronDown } from "lucide-react";
import { useApp } from "@/lib/app-state";
import { areas, stages, type Area, type StageId } from "@/lib/data";

export function Logo() {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <circle cx="9" cy="6" r="3" />
        <circle cx="16" cy="11" r="2.2" />
        <path d="M4 21c0-4.5 2.2-8 5-8 1.6 0 2.9 1 3.8 2.7.7-.8 1.8-1.4 3.2-1.4 2.6 0 4 2.6 4 6.7H4z" opacity=".9" />
      </svg>
    </div>
  );
}

export function Header() {
  const { lang, setLang, stage, setStage, area, setArea, t } = useApp();
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 px-4 pt-3 pb-3 backdrop-blur">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          <div className="leading-tight">
            <div className="font-display text-lg font-bold">Tefl <span className="text-coral">-</span> <span className="font-arabic">طِفْل</span></div>
            <div className="text-[11px] text-muted-foreground">{t("Motherhood companion · Cairo", "رفيقة الأمومة · القاهرة")}</div>
          </div>
        </div>
        <div className="flex rounded-full border bg-card p-0.5 text-xs font-semibold">
          {(["ar", "en"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`rounded-full px-2.5 py-1 ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
        <Select
          label={t("Stage", "المرحلة")}
          value={stage}
          onChange={(v) => setStage(v as StageId)}
          options={stages.map((s) => ({ value: s.id, label: `${s.emoji} ${lang === "ar" ? s.ar : s.en} (${lang === "ar" ? s.ageAr : s.age})` }))}
        />
        <Select
          label={t("Area", "المنطقة")}
          icon
          value={area}
          onChange={(v) => setArea(v as Area)}
          options={areas.map((a) => ({ value: a.id, label: lang === "ar" ? a.ar : a.id }))}
        />
      </div>
    </header>
  );
}

function Select({ label, value, onChange, options, icon }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; icon?: boolean }) {
  return (
    <label className="relative flex items-center gap-1.5 rounded-xl border bg-card px-3 py-2 text-sm">
      {icon && <MapPin className="h-4 w-4 shrink-0 text-coral" />}
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full min-w-0 appearance-none truncate bg-transparent pe-5 font-medium outline-none">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute end-2 h-4 w-4 text-muted-foreground" />
    </label>
  );
}
