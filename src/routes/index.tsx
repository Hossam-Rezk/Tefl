import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, MapPin, BookOpen, Stethoscope, ShoppingBag, CheckSquare, ChevronRight } from "lucide-react";
import { useApp } from "@/lib/app-state";
import {
  pregnancyMonths, milestones, quickCards, products, stages,
  egp, priceRange, productImage,
  type QuickCard, type StageId,
} from "@/lib/data";
import { Badge, Sheet, Bullets, DoctorCallout } from "@/components/ui-kit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tefl — طِفْل · Motherhood companion in Cairo" },
      { name: "description", content: "Track pregnancy month by month, child milestones, and find Cairo doctors, nurseries, schools and products." },
      { property: "og:title", content: "Tefl — طِفْل · Motherhood companion in Cairo" },
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

const features = [
  { icon: BookOpen, color: "text-primary bg-primary-soft", title: "Learn", sub: "Guides & symptom checker", to: "/learn" },
  { icon: Stethoscope, color: "text-coral bg-coral-soft", title: "Directory", sub: "Doctors, nurseries & schools", to: "/directory" },
  { icon: ShoppingBag, color: "text-primary bg-primary-soft", title: "Products", sub: "Cairo price comparison", to: "/products" },
  { icon: CheckSquare, color: "text-coral bg-coral-soft", title: "Checklist", sub: "Stage-specific prep lists", to: "/checklist" },
];

function Home() {
  const { stage, area, t, areaLabel, stageLabel } = useApp();
  const [card, setCard] = useState<QuickCard | null>(null);
  const sc = shortcut[stage];
  const stageProducts = products.filter((p) => p.stages.includes(stage));
  const currentStage = stages.find((s) => s.id === stage)!;

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="bg-hero text-primary-foreground">
        <div className="site-container page-section">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1.5 text-sm font-medium mb-4">
                <span className="text-base">{currentStage.emoji}</span>
                {t("Your stage:", "مرحلتك:")} <strong>{stageLabel(stage)}</strong>
              </div>
              <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                {t("Your motherhood companion in Cairo", "رفيقتك في رحلة الأمومة بالقاهرة")}
              </h1>
              <p className="mt-5 text-lg opacity-90 prose-container">
                {t(
                  "From your first trimester to school enrollment — guides, local directories and price comparisons, personalised for your stage.",
                  "من الشهر الأول حتى التسجيل المدرسي — أدلة ودليل محلي ومقارنة أسعار، مخصصة لمرحلتك.",
                )}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/directory"
                  search={{ tab: sc.tab }}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary-foreground px-5 py-3 font-semibold text-primary transition hover:opacity-90"
                >
                  <MapPin className="h-4 w-4" />
                  {t(sc.en, sc.ar)} {areaLabel(area)}
                </Link>
                <Link
                  to="/learn"
                  className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/30 bg-primary-foreground/10 px-5 py-3 font-semibold transition hover:bg-primary-foreground/20"
                >
                  {t("Explore guides", "استكشفي الأدلة")}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </div>
            </div>

            {/* Tracker card on the right */}
            <div className="rounded-3xl bg-primary-foreground/10 p-6 backdrop-blur">
              {stage === "pregnancy" ? <PregnancyTracker compact /> : <MilestoneTracker stage={stage} compact />}
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature tiles ──────────────────────────────────────── */}
      <section className="site-container page-section">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold">
            {t("Everything you need", "كل ما تحتاجينه")}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {t("Four tools, one companion.", "أربعة أدوات، رفيقة واحدة.")}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, color, title, sub, to }) => (
            <Link
              key={to}
              to={to as never}
              className="group flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="font-semibold text-lg">{t(title, title)}</div>
                <div className="text-sm text-muted-foreground mt-0.5">{t(sub, sub)}</div>
              </div>
              <span className="mt-auto flex items-center gap-1 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition">
                {t("Go", "انتقلي")} <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Health & self-care quick cards ─────────────────────── */}
      <section className="bg-muted/50">
        <div className="site-container page-section">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-bold">{t("Health & self-care", "الصحة والعناية")}</h2>
              <p className="mt-1 text-muted-foreground">{t("Quick guides for your stage", "أدلة سريعة لمرحلتك")}</p>
            </div>
            <Link to="/learn" className="shrink-0 text-sm font-semibold text-primary hover:underline">
              {t("See all guides →", "كل الأدلة ←")}
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {quickCards[stage].map((c) => (
              <button
                key={c.id}
                onClick={() => setCard(c)}
                className={`flex flex-col items-start gap-3 rounded-2xl border p-4 text-start shadow-soft transition hover:-translate-y-0.5 hover:shadow-md ${c.tone === "warn" ? "border-warn/30 bg-warn-soft" : "bg-card"}`}
              >
                <span className="text-3xl">{c.icon}</span>
                <span className="font-semibold leading-snug">{c.title}</span>
                {c.disclaimer && <Badge tone="coral">⚕ {t("Ask your doctor", "استشيري طبيبك")}</Badge>}
                <span className="mt-auto flex items-center gap-1 text-xs text-muted-foreground">
                  <ChevronRight className="h-3 w-3" /> {t("Read more", "اقرأ أكثر")}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Local directory CTA ────────────────────────────────── */}
      <section className="site-container page-section">
        <div className="rounded-3xl bg-coral p-8 text-coral-foreground shadow-soft sm:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-coral-foreground/15">
                <MapPin className="h-7 w-7" />
              </div>
              <div>
                <div className="text-sm opacity-80">{t("Cairo local guide", "دليل القاهرة المحلي")}</div>
                <div className="mt-0.5 text-xl font-bold">
                  {t(sc.en, sc.ar)} <span className="opacity-80">{areaLabel(area)}</span>
                </div>
                <div className="mt-1 text-sm opacity-75">
                  {t("Doctors, hospitals, nurseries & schools", "أطباء ومستشفيات وحضانات ومدارس")}
                </div>
              </div>
            </div>
            <Link
              to="/directory"
              search={{ tab: sc.tab }}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-coral-foreground px-6 py-3 font-semibold text-coral transition hover:opacity-90"
            >
              {t("Browse directory", "استعرضي الدليل")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stage products ─────────────────────────────────────── */}
      <section className="bg-muted/50">
        <div className="site-container page-section">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-bold">{t("Essentials for this stage", "أساسيات هذه المرحلة")}</h2>
              <p className="mt-1 text-muted-foreground">{t("Cairo store price comparison", "مقارنة أسعار المتاجر في القاهرة")}</p>
            </div>
            <Link to="/products" className="shrink-0 text-sm font-semibold text-primary hover:underline">
              {t("See all →", "عرض الكل ←")}
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {stageProducts.map((p) => {
              const [lo, hi] = priceRange(p);
              return (
                <Link
                  key={p.id}
                  to="/products"
                  search={{ open: p.id }}
                  className="group overflow-hidden rounded-2xl border bg-card shadow-soft transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <img src={productImage(p)} alt={p.name} loading="lazy" width={816} height={816} className="aspect-square w-full object-cover" />
                  <div className="p-3">
                    <div className="line-clamp-2 text-sm font-semibold">{p.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{t("Avg.", "متوسط")} {egp(Math.round((lo + hi) / 2))}</div>
                    <div className="mt-2 rounded-lg bg-primary-soft py-1.5 text-center text-xs font-semibold text-accent-foreground transition group-hover:bg-primary group-hover:text-primary-foreground">
                      {t("Compare prices", "قارني الأسعار")}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Sheet open={!!card} onClose={() => setCard(null)} title={card ? `${card.icon} ${card.title}` : ""}>
        {card && (
          <div className="space-y-4">
            <Bullets items={card.points} />
            {card.disclaimer && <DoctorCallout />}
          </div>
        )}
      </Sheet>
    </>
  );
}

function PregnancyTracker({ compact }: { compact?: boolean }) {
  const { t } = useApp();
  const [m, setM] = useState(5);
  const d = pregnancyMonths[m - 1]!;
  return (
    <div className={compact ? "" : "rounded-3xl bg-hero p-5 text-primary-foreground shadow-soft"}>
      <div className="text-xs uppercase tracking-wider opacity-80">{t("Pregnancy tracker", "متابعة الحمل")}</div>
      <div className="mt-3 flex items-center gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary-foreground/15 text-5xl">{d.emoji}</div>
        <div>
          <div className="text-sm opacity-90">{t("Month", "الشهر")} {d.m} · ~{d.size}</div>
          <div className="font-display text-xl font-bold leading-snug">
            {t(`Baby is the size of a ${d.fruit}`, `حجم الجنين مثل ${d.fruit}`)}
          </div>
        </div>
      </div>
      <div className="no-scrollbar mt-4 flex gap-1.5 overflow-x-auto">
        {pregnancyMonths.map((x) => (
          <button key={x.m} onClick={() => setM(x.m)} className={`h-9 w-9 shrink-0 rounded-full text-sm font-semibold ${x.m === m ? "bg-primary-foreground text-primary" : "bg-primary-foreground/15 hover:bg-primary-foreground/25"}`}>
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

function MilestoneTracker({ stage, compact }: { stage: Exclude<StageId, "pregnancy">; compact?: boolean }) {
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
    <div className={compact ? "" : "rounded-3xl bg-hero p-5 text-primary-foreground shadow-soft"}>
      <div className="text-xs uppercase tracking-wider opacity-80">{t("Milestone tracker", "متابعة النمو")}</div>
      <div className="font-display text-xl font-bold">{ms.title}</div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-primary-foreground/20">
        <div className="h-full rounded-full bg-coral transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-1 text-xs opacity-90">{pct}% {t("reached", "تم")}</div>
      <div className="mt-4 flex gap-1 rounded-full bg-primary-foreground/10 p-1">
        {tabs.map((x) => (
          <button key={x.id} onClick={() => setTab(x.id)} className={`flex-1 rounded-full py-1.5 text-xs font-semibold transition ${tab === x.id ? "bg-primary-foreground text-primary" : "hover:bg-primary-foreground/10"}`}>
            {t(x.en, x.ar)}
          </button>
        ))}
      </div>
      <ul className="mt-3 space-y-2 max-h-48 overflow-y-auto">
        {ms[tab].map((m) => {
          const on = done.includes(m);
          return (
            <li key={m}>
              <button onClick={() => setDone((d) => (on ? d.filter((x) => x !== m) : [...d, m]))} className="flex w-full items-center gap-3 rounded-xl bg-primary-foreground/10 p-2.5 text-start text-sm hover:bg-primary-foreground/20">
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-primary-foreground transition ${on ? "bg-primary-foreground text-primary" : ""}`}>{on && "✓"}</span>
                <span className={on ? "line-through opacity-80" : ""}>{m}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
