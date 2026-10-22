import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { useApp } from "@/lib/app-state";
import { pregnancyMonths, milestones, quickCards, products, egp, priceRange, productImage, type QuickCard, type StageId } from "@/lib/data";
import { Section, Badge, Sheet, Bullets, DoctorCallout } from "@/components/ui-kit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tefl - طِفْل · Your motherhood dashboard" },
      { name: "description", content: "Track pregnancy month by month, child milestones, and find Cairo doctors, nurseries, schools and products." },
      { property: "og:title", content: "Tefl - طِفْل · Motherhood companion in Cairo" },
      { property: "og:description", content: "From pregnancy to school enrollment — guides, directories and price comparisons for Cairo mothers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const shortcut: Record<StageId, { en: string; ar: string; tab: "doctors" | "hospitals" | "nurseries" | "schools" }> = {
  pregnancy: { en: "Find OB/GYNs in", ar: "أطباء النساء والتوليد في", tab: "doctors" },
  infant: { en: "Find pediatricians in", ar: "أطباء الأطفال في", tab: "doctors" },
  toddler: { en: "Children's hospitals in", ar: "مستشفيات الأطفال في", tab: "hospitals" },
  preschool: { en: "Compare nurseries in", ar: "قارني الحضانات في", tab: "nurseries" },
  school: { en: "Compare schools in", ar: "قارني المدارس في", tab: "schools" },
};

function Home() {
  const { stage, area, t, areaLabel } = useApp();
  const [card, setCard] = useState<QuickCard | null>(null);
  const sc = shortcut[stage];
  const stageProducts = products.filter((p) => p.stages.includes(stage));

  return (
    <main>
      <div className="px-4 pt-4">{stage === "pregnancy" ? <PregnancyTracker /> : <MilestoneTracker stage={stage} />}</div>

      <Section title={t("Health & self-care", "الصحة والعناية")}>
        <div className="grid grid-cols-2 gap-3">
          {quickCards[stage].map((c) => (
            <button key={c.id} onClick={() => setCard(c)} className={`flex flex-col items-start gap-2 rounded-2xl border p-3 text-start shadow-soft ${c.tone === "warn" ? "border-warn/30 bg-warn-soft" : "bg-card"}`}>
              <span className="text-2xl">{c.icon}</span>
              <span className="text-sm font-semibold leading-snug">{c.title}</span>
              {c.disclaimer && <Badge tone="coral">⚕ {t("Ask your doctor", "استشيري طبيبك")}</Badge>}
            </button>
          ))}
        </div>
      </Section>

      <div className="px-4 pt-6">
        <Link to="/directory" search={{ tab: sc.tab }} className="flex items-center gap-3 rounded-2xl bg-coral p-4 text-coral-foreground shadow-soft">
          <MapPin className="h-6 w-6 shrink-0" />
          <div className="flex-1">
            <div className="text-xs opacity-90">{t("Local Cairo guide", "دليل القاهرة")}</div>
            <div className="font-semibold">{t(sc.en, sc.ar)} {areaLabel(area)}</div>
          </div>
          <ArrowRight className="h-5 w-5 rtl:rotate-180" />
        </Link>
      </div>

      <Section title={t("Essentials for this stage", "أساسيات هذه المرحلة")} action={<Link to="/products" className="text-sm font-semibold text-primary">{t("See all", "عرض الكل")}</Link>}>
        <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
          {stageProducts.map((p) => {
            const [lo, hi] = priceRange(p);
            return (
              <div key={p.id} className="w-40 shrink-0 overflow-hidden rounded-2xl border bg-card shadow-soft">
                <img src={productImage(p)} alt={p.name} loading="lazy" width={816} height={816} className="h-28 w-full object-cover" />
                <div className="p-3">
                  <div className="line-clamp-2 h-10 text-sm font-semibold">{p.name}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{t("Avg.", "متوسط")} {egp(Math.round((lo + hi) / 2))}</div>
                  <Link to="/products" search={{ open: p.id }} className="mt-2 block rounded-lg bg-primary-soft py-1.5 text-center text-xs font-semibold text-accent-foreground">
                    {t("Compare prices", "قارني الأسعار")}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Sheet open={!!card} onClose={() => setCard(null)} title={card ? `${card.icon} ${card.title}` : ""}>
        {card && (
          <div className="space-y-4">
            <Bullets items={card.points} />
            {card.disclaimer && <DoctorCallout />}
          </div>
        )}
      </Sheet>
    </main>
  );
}

function PregnancyTracker() {
  const { t } = useApp();
  const [m, setM] = useState(5);
  const d = pregnancyMonths[m - 1]!;
  return (
    <div className="overflow-hidden rounded-3xl bg-hero p-5 text-primary-foreground shadow-soft">
      <div className="text-xs uppercase tracking-wider opacity-80">{t("Pregnancy tracker", "متابعة الحمل")}</div>
      <div className="mt-2 flex items-center gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary-foreground/15 text-5xl">{d.emoji}</div>
        <div>
          <div className="text-sm opacity-90">{t("Month", "الشهر")} {d.m} · ~{d.size}</div>
          <div className="font-display text-xl font-bold leading-snug">{t(`Baby is the size of a ${d.fruit}`, `حجم الجنين مثل ${d.fruit}`)}</div>
        </div>
      </div>
      <div className="no-scrollbar mt-4 flex gap-1.5 overflow-x-auto">
        {pregnancyMonths.map((x) => (
          <button key={x.m} onClick={() => setM(x.m)} className={`h-9 w-9 shrink-0 rounded-full text-sm font-semibold ${x.m === m ? "bg-primary-foreground text-primary" : "bg-primary-foreground/15"}`}>
            {x.m}
          </button>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-primary-foreground/10 p-3">
          <div className="mb-1 font-semibold">👶 {t("Baby", "الجنين")}</div>
          <ul className="space-y-1 opacity-95">{d.baby.map((b) => <li key={b}>• {b}</li>)}</ul>
        </div>
        <div className="rounded-2xl bg-primary-foreground/10 p-3">
          <div className="mb-1 font-semibold">🤍 {t("Your body", "جسمك")}</div>
          <ul className="space-y-1 opacity-95">{d.mom.map((b) => <li key={b}>• {b}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}

function MilestoneTracker({ stage }: { stage: Exclude<StageId, "pregnancy"> }) {
  const { t } = useApp();
  const ms = milestones[stage];
  const [tab, setTab] = useState<"physical" | "psychological" | "behavioral">("physical");
  const [done, setDone] = useState<string[]>([]);
  const tabs = [
    { id: "physical", en: "Physical", ar: "جسدي" },
    { id: "psychological", en: "Emotional", ar: "نفسي" },
    { id: "behavioral", en: "Behavioral", ar: "سلوكي" },
  ] as const;
  const all = [...ms.physical, ...ms.psychological, ...ms.behavioral];
  const pct = Math.round((done.filter((d) => all.includes(d)).length / all.length) * 100);
  return (
    <div className="rounded-3xl bg-hero p-5 text-primary-foreground shadow-soft">
      <div className="text-xs uppercase tracking-wider opacity-80">{t("Milestone tracker", "متابعة النمو")}</div>
      <div className="font-display text-xl font-bold">{ms.title}</div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-primary-foreground/20">
        <div className="h-full rounded-full bg-coral transition-all" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-1 text-xs opacity-90">{pct}% {t("reached", "تم")}</div>
      <div className="mt-4 flex gap-1 rounded-full bg-primary-foreground/10 p-1">
        {tabs.map((x) => (
          <button key={x.id} onClick={() => setTab(x.id)} className={`flex-1 rounded-full py-1.5 text-xs font-semibold ${tab === x.id ? "bg-primary-foreground text-primary" : ""}`}>{t(x.en, x.ar)}</button>
        ))}
      </div>
      <ul className="mt-3 space-y-2">
        {ms[tab].map((m) => {
          const on = done.includes(m);
          return (
            <li key={m}>
              <button onClick={() => setDone((d) => (on ? d.filter((x) => x !== m) : [...d, m]))} className="flex w-full items-center gap-3 rounded-xl bg-primary-foreground/10 p-2.5 text-start text-sm">
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-primary-foreground ${on ? "bg-primary-foreground text-primary" : ""}`}>{on && "✓"}</span>
                <span className={on ? "line-through opacity-80" : ""}>{m}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
