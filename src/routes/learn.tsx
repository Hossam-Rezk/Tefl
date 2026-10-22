import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, ChevronRight } from "lucide-react";
import { useApp } from "@/lib/app-state";
import { articles, learnCategories, symptoms, type Article, type LearnCat } from "@/lib/data";
import { PageTitle, Pills, Section, Sheet, Bullets, DoctorCallout, Badge } from "@/components/ui-kit";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn · Pregnancy & parenting guides — Tefl" },
      { name: "description", content: "Guides on pregnancy, child health, red-flag symptoms, feeding, parenting and nutrition." },
      { property: "og:title", content: "Tefl Learn hub" },
      { property: "og:description", content: "Trusted, stage-based motherhood guides and a symptom checker." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Learn,
});

function Learn() {
  const { stage, stageLabel, t, lang } = useApp();
  const [cat, setCat] = useState<"all" | LearnCat>("all");
  const [open, setOpen] = useState<Article | null>(null);
  const list = articles.filter((a) => a.stages.includes(stage) && (cat === "all" || a.cat === cat));
  const opts = [{ id: "all" as const, label: t("All", "الكل") }, ...learnCategories.map((c) => ({ id: c.id, label: lang === "ar" ? c.ar : c.en }))];

  return (
    <main>
      <PageTitle title={t("Learn", "تعلّمي")} sub={`${t("Guides for", "أدلة لمرحلة")} ${stageLabel(stage)}`} />
      <div className="px-4 pt-4"><Pills value={cat} options={opts} onChange={setCat} /></div>

      {stage !== "pregnancy" && <div className="px-4 pt-5"><SymptomChecker /></div>}

      <Section title={t("Articles", "المقالات")}>
        <div className="space-y-3">
          {list.map((a) => {
            const c = learnCategories.find((x) => x.id === a.cat)!;
            return (
              <button key={a.id} onClick={() => setOpen(a)} className="flex w-full items-center gap-3 rounded-2xl border bg-card p-4 text-start shadow-soft">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={a.cat === "redflag" ? "warn" : "primary"}>{lang === "ar" ? c.ar : c.en}</Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" />{a.read}</span>
                  </div>
                  <div className="mt-1.5 font-semibold">{a.title}</div>
                  <div className="text-sm text-muted-foreground">{a.summary}</div>
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground rtl:rotate-180" />
              </button>
            );
          })}
          {list.length === 0 && <p className="rounded-2xl bg-muted p-6 text-center text-sm text-muted-foreground">{t("No guides in this category for this stage yet.", "لا توجد أدلة في هذا القسم حاليًا.")}</p>}
        </div>
      </Section>

      <Sheet open={!!open} onClose={() => setOpen(null)} title={open?.title ?? ""}>
        {open && (
          <div className="space-y-4">
            <p className="text-muted-foreground">{open.summary}</p>
            <h4 className="font-semibold">{t("Key points", "أهم النقاط")}</h4>
            <Bullets items={open.points} />
            {(open.doctor || open.cat === "nutrition") && <DoctorCallout />}
          </div>
        )}
      </Sheet>
    </main>
  );
}

function SymptomChecker() {
  const { t } = useApp();
  const [picked, setPicked] = useState<string[]>([]);
  const chosen = symptoms.filter((s) => picked.includes(s.s));
  const level = chosen.some((s) => s.level === "urgent") ? "urgent" : chosen.some((s) => s.level === "consult") ? "consult" : chosen.length ? "home" : null;
  const result = {
    urgent: { cls: "bg-warn text-destructive-foreground", text: t("Go to a children's hospital ER now or call 123.", "توجّهي إلى طوارئ الأطفال فورًا أو اتصلي بـ 123.") },
    consult: { cls: "bg-coral text-coral-foreground", text: t("Book a pediatrician visit within 24 hours.", "احجزي عند طبيب الأطفال خلال ٢٤ ساعة.") },
    home: { cls: "bg-primary text-primary-foreground", text: t("Usually manageable at home. Monitor closely.", "غالبًا يمكن التعامل معها في المنزل مع المتابعة.") },
  };
  return (
    <div className="rounded-3xl border-2 border-warn/30 bg-warn-soft p-4">
      <div className="flex items-center gap-2"><span className="text-xl">🩺</span><h2 className="text-lg font-bold">{t("Symptom & warning signs checker", "فاحص الأعراض")}</h2></div>
      <p className="mt-1 text-sm text-muted-foreground">{t("Tap what your child has:", "اختاري الأعراض الموجودة:")}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {symptoms.map((s) => {
          const on = picked.includes(s.s);
          return (
            <button key={s.s} onClick={() => setPicked((p) => (on ? p.filter((x) => x !== s.s) : [...p, s.s]))} className={`rounded-full border px-3 py-1.5 text-xs ${on ? "border-foreground bg-foreground text-background" : "bg-card"}`}>
              {s.s}
            </button>
          );
        })}
      </div>
      {level && <div className={`mt-4 rounded-xl p-3 text-sm font-semibold ${result[level].cls}`}>{result[level].text}</div>}
      <p className="mt-3 text-[11px] text-muted-foreground">{t("Not a diagnosis. When in doubt, call your pediatrician.", "ليس تشخيصًا. عند الشك اتصلي بطبيبك.")}</p>
    </div>
  );
}
