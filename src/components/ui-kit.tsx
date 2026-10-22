import { useEffect, type ReactNode } from "react";
import { X, ShieldAlert } from "lucide-react";
import { useApp } from "@/lib/app-state";

export function Section({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="px-4 pt-6">
      <div className="mb-3 flex items-end justify-between gap-2">
        <h2 className="text-xl font-bold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function PageTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="px-4 pt-5">
      <h1 className="text-2xl font-bold">{title}</h1>
      {sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function Pills<T extends string>({ value, options, onChange }: { value: T; options: { id: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition ${value === o.id ? "border-primary bg-primary text-primary-foreground" : "bg-card text-foreground"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Badge({ children, tone = "primary" }: { children: ReactNode; tone?: "primary" | "coral" | "warn" | "muted" }) {
  const cls = {
    primary: "bg-primary-soft text-accent-foreground",
    coral: "bg-coral-soft text-coral",
    warn: "bg-warn-soft text-warn",
    muted: "bg-muted text-muted-foreground",
  }[tone];
  return <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${cls}`}>{children}</span>;
}

export function DoctorCallout() {
  const { t } = useApp();
  return (
    <div className="flex gap-2 rounded-xl border border-coral bg-coral-soft p-3 text-sm">
      <ShieldAlert className="h-5 w-5 shrink-0 text-coral" />
      <div>
        <div className="font-semibold">{t("Doctor's guidance required", "يلزم استشارة الطبيب")}</div>
        <div className="text-muted-foreground">{t("Type and dose must be set by your doctor. This is educational information only.", "النوع والجرعة يحددهما الطبيب. هذه معلومات توعوية فقط.")}</div>
      </div>
    </div>
  );
}

export function ComingSoon() {
  const { t } = useApp();
  return <Badge tone="coral">{t("Coming soon", "قريبًا")}</Badge>;
}

/** Bottom sheet modal constrained to the phone frame. */
export function Sheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" role="dialog" aria-modal="true" aria-label={title}>
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-foreground/40 animate-in fade-in" />
      <div className="relative flex max-h-[88vh] w-full max-w-[480px] flex-col rounded-t-3xl bg-background animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
          <h3 className="text-lg font-bold">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="rounded-full bg-muted p-1.5"><X className="h-4 w-4" /></button>
        </div>
        <div className="overflow-y-auto px-4 pt-4 pb-8">{children}</div>
      </div>
    </div>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((p) => (
        <li key={p} className="flex gap-2 text-sm"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />{p}</li>
      ))}
    </ul>
  );
}
