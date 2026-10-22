import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useApp } from "@/lib/app-state";
import { stages, areas, type Area, type StageId } from "@/lib/data";
import { PageTitle, Section, Sheet, ComingSoon } from "@/components/ui-kit";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile & journey settings — Tefl" },
      { name: "description", content: "Manage your motherhood stage, Cairo area, and preview upcoming Tefl features." },
      { property: "og:title", content: "Tefl profile" },
      { property: "og:description", content: "Your motherhood journey settings and what's coming next in Tefl." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Profile,
});

function Profile() {
  const { stage, setStage, area, t, lang, areaLabel } = useApp();
  const [wizard, setWizard] = useState(false);
  const current = stages.find((s) => s.id === stage)!;

  return (
    <main>
      <PageTitle title={t("My journey", "رحلتي")} />
      <div className="site-container pt-6">
        <div className="flex items-center gap-4 rounded-3xl bg-hero p-6 text-primary-foreground shadow-soft">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-foreground/15 text-5xl">{current.emoji}</div>
          <div className="flex-1">
            <div className="text-sm opacity-80">{t("Current stage", "المرحلة الحالية")}</div>
            <div className="font-display text-2xl font-bold">{lang === "ar" ? current.ar : current.en}</div>
            <div className="text-sm opacity-90 mt-0.5">📍 {areaLabel(area)}, {t("Cairo", "القاهرة")}</div>
          </div>
        </div>
        <button onClick={() => setWizard(true)} className="mt-4 w-full rounded-2xl border-2 border-primary py-3 font-semibold text-primary hover:bg-primary-soft transition sm:w-auto sm:px-8">
          {t("Open onboarding wizard", "افتحي معالج البداية")}
        </button>
      </div>

      <Section title={t("Switch stage", "تغيير المرحلة")}>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {stages.map((s, i) => (
            <button key={s.id} onClick={() => setStage(s.id)} className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-start ${stage === s.id ? "border-primary bg-primary-soft" : "bg-card"}`}>
              <span className="text-2xl">{s.emoji}</span>
              <span className="flex-1"><span className="block font-semibold">{i + 1}. {lang === "ar" ? s.ar : s.en}</span><span className="text-xs text-muted-foreground">{lang === "ar" ? s.ageAr : s.age}</span></span>
              {stage === s.id && <span className="text-primary">●</span>}
            </button>
          ))}
        </div>
      </Section>

      <Section title={t("Future vision", "رؤيتنا القادمة")}>
        <div className="space-y-3">
          <div className="rounded-2xl border bg-card p-4 shadow-soft">
            <div className="flex items-center justify-between"><h3 className="font-semibold">💬 {t("Mothers' Community & Adolescence Hub", "مجتمع الأمهات ومرحلة المراهقة")}</h3><ComingSoon /></div>
            <div className="mt-3 space-y-2 opacity-70">
              {[["Nour, Maadi", "How did you handle screen time with your 13-year-old?", 24], ["Dina, New Cairo", "Tips for talking to teens about friendships?", 18]].map(([n, q, c]) => (
                <div key={n as string} className="rounded-xl bg-muted p-3 text-sm">
                  <div className="text-xs font-semibold text-primary">{n}</div>
                  <div>{q}</div>
                  <div className="mt-1 text-xs text-muted-foreground">💬 {c} {t("replies", "رد")}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between rounded-2xl border bg-card p-4"><span className="font-semibold">📅 {t("Doctor booking & in-app chat", "حجز الأطباء والمحادثة")}</span><ComingSoon /></div>
          <div className="flex items-center justify-between rounded-2xl border bg-card p-4"><span className="font-semibold">🛒 {t("Direct in-app checkout", "الشراء من التطبيق")}</span><ComingSoon /></div>
          <div className="flex items-center justify-between rounded-2xl border bg-card p-4"><span className="font-semibold">🗺️ {t("Beyond Cairo", "خارج القاهرة")}</span><ComingSoon /></div>
        </div>
      </Section>

      <Onboarding open={wizard} onClose={() => setWizard(false)} />
    </main>
  );
}

function Onboarding({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { stage, setStage, area, setArea, t, lang } = useApp();
  const [step, setStep] = useState(0);
  const [s, setS] = useState<StageId>(stage);
  const [a, setA] = useState<Area>(area);
  const close = () => { setStep(0); onClose(); };
  const finish = () => { setStage(s); setArea(a); close(); };

  return (
    <Sheet open={open} onClose={close} title={t(`Step ${step + 1} of 3`, `الخطوة ${step + 1} من ٣`)}>
      <div className="mb-4 flex gap-1">{[0, 1, 2].map((i) => <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />)}</div>
      {step === 0 && (
        <>
          <h3 className="text-xl font-bold">{t("Where are you in your motherhood journey?", "أين أنتِ في رحلة الأمومة؟")}</h3>
          <div className="mt-4 space-y-2">
            {stages.map((x) => (
              <button key={x.id} onClick={() => setS(x.id)} className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-start ${s === x.id ? "border-primary bg-primary-soft" : "bg-card"}`}>
                <span className="text-2xl">{x.emoji}</span><span className="font-semibold">{lang === "ar" ? x.ar : x.en}</span><span className="ms-auto text-xs text-muted-foreground">{lang === "ar" ? x.ageAr : x.age}</span>
              </button>
            ))}
          </div>
        </>
      )}
      {step === 1 && (
        <>
          <h3 className="text-xl font-bold">{t("Which part of Cairo do you live in?", "في أي منطقة بالقاهرة تسكنين؟")}</h3>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {areas.map((x) => (
              <button key={x.id} onClick={() => setA(x.id)} className={`rounded-2xl border p-3 font-semibold ${a === x.id ? "border-primary bg-primary-soft" : "bg-card"}`}>{lang === "ar" ? x.ar : x.id}</button>
            ))}
          </div>
        </>
      )}
      {step === 2 && (
        <div className="py-6 text-center">
          <div className="text-6xl">🌿</div>
          <h3 className="mt-3 text-xl font-bold">{t("You're all set!", "كل شيء جاهز!")}</h3>
          <p className="mt-1 text-muted-foreground">{t("Tefl will now show guides, doctors and products for your stage.", "سيعرض طفل الأدلة والأطباء والمنتجات المناسبة لمرحلتك.")}</p>
        </div>
      )}
      <div className="mt-6 flex gap-2">
        {step > 0 && <button onClick={() => setStep(step - 1)} className="flex-1 rounded-xl border py-3 font-semibold">{t("Back", "رجوع")}</button>}
        <button onClick={() => (step < 2 ? setStep(step + 1) : finish())} className="flex-1 rounded-xl bg-primary py-3 font-semibold text-primary-foreground">{step < 2 ? t("Next", "التالي") : t("Start", "ابدئي")}</button>
      </div>
    </Sheet>
  );
}
