import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Star, MapPin, Phone, CalendarPlus, Check } from "lucide-react";
import { useApp } from "@/lib/app-state";
import { places, areas, curricula, egp, type Kind, type Place, type Area } from "@/lib/data";
import { toggleCompare, canCompare, MAX_COMPARE } from "@/lib/compare";
import { PageTitle, Badge, Sheet, ComingSoon } from "@/components/ui-kit";

export const Route = createFileRoute("/directory")({
  validateSearch: zodValidator(z.object({ tab: fallback(z.string(), "").default("") })),
  head: () => ({
    meta: [
      { title: "Cairo directory · Doctors, hospitals, nurseries & schools — Tefl" },
      { name: "description", content: "Find and compare OB/GYNs, pediatricians, hospitals, nurseries and schools across Cairo neighborhoods." },
      { property: "og:title", content: "Tefl Cairo directory & comparison" },
      { property: "og:description", content: "Compare Cairo nurseries and schools side by side: fees, curriculum, admission." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Directory,
});

const tabs: { id: Kind; en: string; ar: string }[] = [
  { id: "doctors", en: "Doctors", ar: "الأطباء" },
  { id: "hospitals", en: "Hospitals", ar: "المستشفيات" },
  { id: "nurseries", en: "Nurseries", ar: "الحضانات" },
  { id: "schools", en: "Schools", ar: "المدارس" },
];
const stageTab = { pregnancy: "doctors", infant: "doctors", toddler: "hospitals", preschool: "nurseries", school: "schools" } as const;
const feeBuckets: Record<Kind, [number, number]> = {
  doctors: [600, 900], hospitals: [1000, 30000], nurseries: [5000, 7000], schools: [100000, 190000],
};

function Directory() {
  const { stage, area, t, lang } = useApp();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/directory" });
  const tabParam = (search as { tab?: string }).tab ?? "";
  const kind = (tabs.some((x) => x.id === tabParam) ? tabParam : stageTab[stage]) as Kind;
  const setKind = (k: Kind) => { navigate({ search: { tab: k } }); setSpec("all"); setFee("all"); setSel([]); };

  const [areaF, setAreaF] = useState<"all" | Area>(area);
  useEffect(() => setAreaF(area), [area]);
  const [fee, setFee] = useState<"all" | "low" | "mid" | "high">("all");
  const [spec, setSpec] = useState("all");
  const [sel, setSel] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [booking, setBooking] = useState<Place | null>(null);

  const [b1, b2] = feeBuckets[kind];
  const specOptions = kind === "schools" ? curricula : kind === "doctors" ? ["OB/GYN", "Pediatrician"] : kind === "hospitals" ? ["Maternity", "Children's"] : ["Montessori", "Bilingual", "Play-based", "Reggio Emilia"];
  const list = places.filter((p) => {
    if (p.kind !== kind) return false;
    if (areaF !== "all" && p.area !== areaF) return false;
    if (spec !== "all" && p.sub !== spec) return false;
    if (fee === "low" && p.fee > b1) return false;
    if (fee === "mid" && (p.fee <= b1 || p.fee > b2)) return false;
    if (fee === "high" && p.fee <= b2) return false;
    return true;
  });
  const comparable = kind === "nurseries" || kind === "schools";
  const chosen = places.filter((p) => sel.includes(p.id));

  return (
    <main>
      <PageTitle title={t("Cairo directory", "دليل القاهرة")} sub={t("Doctors, hospitals, nurseries and schools near you", "أطباء ومستشفيات وحضانات ومدارس قريبة منك")} />

      <div className="site-container pt-6">
        <div className="grid grid-cols-4 gap-1 rounded-2xl bg-muted p-1 sm:w-fit">
          {tabs.map((x) => (
            <button key={x.id} onClick={() => setKind(x.id)} className={`relative rounded-xl py-2 text-xs font-semibold ${kind === x.id ? "bg-card text-primary shadow-soft" : "text-muted-foreground"}`}>
              {t(x.en, x.ar)}
              {stageTab[stage] === x.id && <span className="absolute end-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-coral" />}
            </button>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          <Filter value={areaF} onChange={(v) => setAreaF(v as Area | "all")} options={[["all", t("All areas", "كل المناطق")], ...areas.map((a) => [a.id, lang === "ar" ? a.ar : a.id] as [string, string])]} />
          <Filter value={fee} onChange={(v) => setFee(v as typeof fee)} options={[["all", t("Any fee", "أي سعر")], ["low", `≤ ${egp(b1)}`], ["mid", `${egp(b1)}–${egp(b2)}`], ["high", `> ${egp(b2)}`]]} />
          <Filter value={spec} onChange={setSpec} options={[["all", kind === "schools" ? t("Curriculum", "المنهج") : t("Specialty", "التخصص")], ...specOptions.map((s) => [s, s] as [string, string])]} />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{list.length} {t("results", "نتيجة")}{comparable && ` · ${t(`Select up to ${MAX_COMPARE} to compare`, "اختاري حتى ٣ للمقارنة")}`}</p>
      </div>

      <div className="grid gap-3 px-4 pt-3 md:grid-cols-2 xl:grid-cols-3">
        {list.map((p) => {
          const on = sel.includes(p.id);
          return (
            <article key={p.id} className={`rounded-2xl border bg-card p-4 shadow-soft ${on ? "border-primary ring-2 ring-primary/20" : ""}`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <Badge tone="primary">{p.sub}</Badge>
                  <h3 className="mt-1 text-lg font-semibold leading-snug">{p.name}</h3>
                  <div className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{p.area} · {p.address}</div>
                </div>
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-coral-soft px-2 py-0.5 text-sm font-semibold"><Star className="h-3.5 w-3.5 fill-coral text-coral" />{p.rating}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">{p.tags.map((tg) => <Badge key={tg} tone="muted">{tg}</Badge>)}</div>
              <div className="mt-3 flex items-baseline justify-between border-t pt-3">
                <span className="text-xs text-muted-foreground">{p.feeUnit}</span>
                <span className="font-bold text-primary">{egp(p.fee)}</span>
              </div>
              <div className="mt-3 flex gap-2">
                <a href={`tel:${p.phone.replace(/\s/g, "")}`} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-2 text-sm font-semibold"><Phone className="h-4 w-4" />{t("Call", "اتصال")}</a>
                {comparable ? (
                  <button onClick={() => setSel((s) => toggleCompare(s, p.id))} disabled={!on && sel.length >= MAX_COMPARE} className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-sm font-semibold disabled:opacity-40 ${on ? "bg-primary text-primary-foreground" : "bg-primary-soft text-accent-foreground"}`}>
                    {on ? <Check className="h-4 w-4" /> : "+"} {t("Compare", "مقارنة")}
                  </button>
                ) : (
                  <button onClick={() => setBooking(p)} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary-soft py-2 text-sm font-semibold text-accent-foreground"><CalendarPlus className="h-4 w-4" />{t("Book", "احجزي")}</button>
                )}
              </div>
            </article>
          );
        })}
        {list.length === 0 && <p className="rounded-2xl bg-muted p-6 text-center text-sm text-muted-foreground">{t("No matches. Try “All areas”.", "لا نتائج. جرّبي «كل المناطق».")}</p>}
      </div>

      {comparable && sel.length > 0 && (
        <div className="fixed inset-x-0 bottom-20 z-30 mx-auto max-w-[480px] px-4">
          <button onClick={() => canCompare(sel) && setCompareOpen(true)} className={`w-full rounded-2xl py-3.5 font-semibold shadow-phone ${canCompare(sel) ? "bg-coral text-coral-foreground" : "bg-foreground text-background"}`}>
            {canCompare(sel) ? `${t("Compare selected", "قارني المختار")} (${sel.length})` : t("Select one more to compare", "اختاري عنصرًا آخر للمقارنة")}
          </button>
        </div>
      )}

      <Sheet open={compareOpen} onClose={() => setCompareOpen(false)} title={t("Side-by-side comparison", "مقارنة جنبًا إلى جنب")}>
        <CompareTable items={chosen} />
      </Sheet>

      <Sheet open={!!booking} onClose={() => setBooking(null)} title={booking?.name ?? ""}>
        {booking && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-muted p-4 text-sm">
              <div><b>{booking.sub}</b> · {booking.area}</div>
              <div className="text-muted-foreground">{booking.address} · {booking.phone}</div>
            </div>
            {["📅 " + t("Book an appointment", "احجزي موعدًا"), "💬 " + t("Chat with the doctor", "تحدثي مع الطبيب")].map((l) => (
              <div key={l} className="flex items-center justify-between rounded-2xl border border-dashed p-4"><span className="font-semibold">{l}</span><ComingSoon /></div>
            ))}
            <a href={`tel:${booking.phone.replace(/\s/g, "")}`} className="block rounded-xl bg-primary py-3 text-center font-semibold text-primary-foreground">{t("Call now", "اتصلي الآن")}</a>
          </div>
        )}
      </Sheet>
    </main>
  );
}

function Filter({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full min-w-0 truncate rounded-xl border bg-card px-2 py-2 text-xs font-medium outline-none">
      {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
    </select>
  );
}

function CompareTable({ items }: { items: Place[] }) {
  const { t } = useApp();
  const isSchool = items[0]?.kind === "schools";
  const rows: [string, (p: Place) => string][] = [
    [t("Location", "الموقع"), (p) => `${p.area}, ${p.address}`],
    [isSchool ? t("Annual fees", "المصروفات السنوية") : t("Monthly fees", "المصروفات الشهرية"), (p) => egp(p.fee)],
    [isSchool ? t("Curriculum / Language", "المنهج / اللغة") : t("Approach / Language", "المنهج / اللغة"), (p) => `${p.curriculum ?? p.sub} · ${p.language ?? "-"}`],
    [t("Ages", "الأعمار"), (p) => p.ages ?? "-"],
    [t("Facilities", "المرافق"), (p) => p.tags.join(", ")],
    [t("Admission", "القبول"), (p) => p.admission ?? "-"],
    [t("Rating", "التقييم"), (p) => `★ ${p.rating}`],
  ];
  const cheapest = Math.min(...items.map((p) => p.fee));
  return (
    <div className="-mx-4 overflow-x-auto px-4">
      <table className="w-full min-w-[420px] border-separate border-spacing-0 text-sm">
        <thead>
          <tr>
            <th className="w-24" />
            {items.map((p) => <th key={p.id} className="rounded-t-xl bg-primary p-3 text-start align-top font-semibold text-primary-foreground">{p.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, fn], i) => (
            <tr key={label} className={i % 2 ? "" : "bg-muted"}>
              <td className="p-2.5 text-xs font-semibold text-muted-foreground">{label}</td>
              {items.map((p) => (
                <td key={p.id} className={`p-2.5 align-top ${i === 1 && p.fee === cheapest ? "font-bold text-primary" : ""}`}>{fn(p)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
