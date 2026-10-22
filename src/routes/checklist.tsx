import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { CheckCircle2, Circle, RotateCcw, PartyPopper } from "lucide-react";
import { useApp } from "@/lib/app-state";
import { type StageId } from "@/lib/data";
import { PageTitle, Badge } from "@/components/ui-kit";

export const Route = createFileRoute("/checklist")({
  head: () => ({
    meta: [
      { title: "Checklist · Stage prep — Tefl" },
      { name: "description", content: "Stage-specific interactive checklists: hospital bag, nursery setup, school enrollment and more — for Cairo mothers." },
      { property: "og:title", content: "Tefl Checklist" },
      { property: "og:description", content: "Interactive prep checklists tailored to your motherhood stage." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ChecklistPage,
});

type CheckItem = { id: string; en: string; ar: string; note?: string };
type Section = { id: string; en: string; ar: string; emoji: string; items: CheckItem[] };
type ChecklistData = Record<StageId, Section[]>;

const data: ChecklistData = {
  pregnancy: [
    {
      id: "hospital-bag",
      en: "Hospital Bag",
      ar: "حقيبة المستشفى",
      emoji: "🎒",
      items: [
        { id: "docs", en: "ID & insurance documents", ar: "بطاقة الهوية ووثائق التأمين" },
        { id: "nightgown", en: "2–3 loose nightgowns", ar: "٢–٣ قمصان نوم فضفاضة" },
        { id: "slippers", en: "Comfortable slippers", ar: "شبشب مريح" },
        { id: "toiletries", en: "Toiletries & wet wipes", ar: "أدوات النظافة والمناديل المبللة" },
        { id: "phone-charger", en: "Phone charger + power bank", ar: "شاحن الهاتف وبطارية احتياطية" },
        { id: "snacks", en: "Light snacks for labour", ar: "وجبات خفيفة للمخاض" },
        { id: "baby-clothes", en: "Baby coming-home outfit", ar: "ملابس استقبال المولود" },
        { id: "baby-blanket", en: "Soft baby blanket", ar: "بطانية ناعمة للطفل" },
        { id: "car-seat", en: "Car seat installed & ready", ar: "كرسي السيارة مثبّت وجاهز" },
        { id: "birth-plan", en: "Printed birth plan (if any)", ar: "خطة الولادة مطبوعة (إن وُجدت)" },
      ],
    },
    {
      id: "nursery",
      en: "Nursery Setup",
      ar: "تجهيز غرفة الطفل",
      emoji: "🛏️",
      items: [
        { id: "crib", en: "Safe crib / bassinet set up", ar: "سرير آمن أو سرير صغير مُجهَّز" },
        { id: "mattress", en: "Firm, flat crib mattress", ar: "مرتبة صلبة ومستوية للسرير" },
        { id: "monitor", en: "Baby monitor installed", ar: "جهاز مراقبة الطفل مثبَّت" },
        { id: "diaper-station", en: "Changing station stocked", ar: "محطة تغيير الحفاض مُجهَّزة" },
        { id: "nappies", en: "Newborn nappies × 60+", ar: "٦٠+ حفاضة مولود جديد" },
        { id: "onesies", en: "6–8 newborn onesies", ar: "٦–٨ بدلة للمولود" },
        { id: "feeding", en: "Feeding supplies ready", ar: "أدوات الرضاعة جاهزة" },
        { id: "first-aid", en: "First-aid kit (thermometer, nasal aspirator)", ar: "حقيبة إسعافات أولية (ترمومتر وشافطة الأنف)" },
      ],
    },
    {
      id: "self-care",
      en: "Your Self-care",
      ar: "العناية بنفسك",
      emoji: "🌿",
      items: [
        { id: "ob-appt", en: "Final OB/GYN appointment booked", ar: "حجز آخر موعد مع طبيبة النساء" },
        { id: "pediatrician", en: "Pediatrician selected & contacted", ar: "اختيار طبيب الأطفال والتواصل معه" },
        { id: "cord-blood", en: "Cord-blood banking decision made", ar: "اتخاذ قرار بنك الدم من الحبل السري" },
        { id: "birth-registered", en: "Birth registration plan ready", ar: "خطة تسجيل الميلاد جاهزة" },
        { id: "support-network", en: "Support network arranged", ar: "شبكة الدعم مُنظَّمة" },
      ],
    },
  ],
  infant: [
    {
      id: "health",
      en: "Health & Vaccines",
      ar: "الصحة والتطعيمات",
      emoji: "💉",
      items: [
        { id: "hep-b", en: "Hepatitis B (birth dose)", ar: "تطعيم التهاب الكبد B (جرعة الميلاد)" },
        { id: "bcg", en: "BCG vaccine", ar: "تطعيم BCG" },
        { id: "4w-checkup", en: "4-week well-baby checkup", ar: "فحص الطفل في الأسبوع الرابع" },
        { id: "6w-vaccine", en: "6-week vaccines (DTaP, Hib, IPV, Rotavirus)", ar: "تطعيمات الأسبوع السادس" },
        { id: "hearing", en: "Newborn hearing screening done", ar: "فحص السمع للمولود الجديد" },
        { id: "hip-screen", en: "Hip ultrasound screening", ar: "سونار مفصل الورك" },
      ],
    },
    {
      id: "feeding",
      en: "Feeding",
      ar: "الرضاعة والتغذية",
      emoji: "🍼",
      items: [
        { id: "bf-ok", en: "Breastfeeding established (or formula chosen)", ar: "الرضاعة الطبيعية مستقرة أو الحليب الصناعي مُختار" },
        { id: "latch", en: "Latch checked by nurse/lactation consultant", ar: "التحقق من الالتقام من ممرضة أو مستشارة رضاعة" },
        { id: "vit-d", en: "Vitamin D drops started", ar: "بدء قطرات فيتامين D" },
        { id: "growth-chart", en: "Weight & height recorded monthly", ar: "تسجيل الوزن والطول شهريًا" },
      ],
    },
    {
      id: "admin",
      en: "Admin & Safety",
      ar: "الإجراءات والسلامة",
      emoji: "📋",
      items: [
        { id: "birth-cert", en: "Birth certificate obtained", ar: "الحصول على شهادة الميلاد" },
        { id: "national-id", en: "National ID number issued", ar: "إصدار رقم الهوية الوطنية" },
        { id: "insurance", en: "Child added to health insurance", ar: "إضافة الطفل للتأمين الصحي" },
        { id: "smoke-alarm", en: "Smoke & CO detectors working", ar: "أجهزة إنذار الدخان وأول أكسيد الكربون تعمل" },
      ],
    },
  ],
  toddler: [
    {
      id: "safety",
      en: "Home Safety",
      ar: "سلامة المنزل",
      emoji: "🔒",
      items: [
        { id: "outlet-covers", en: "Outlet covers installed", ar: "أغطية مآخذ الكهرباء مثبَّتة" },
        { id: "cabinet-locks", en: "Cabinet & drawer locks fitted", ar: "أقفال الخزائن والأدراج مثبَّتة" },
        { id: "stair-gate", en: "Stair gates at top & bottom", ar: "بوابات السلالم من الأعلى والأسفل" },
        { id: "hot-liquids", en: "Hot liquids kept out of reach", ar: "السوائل الساخنة بعيدة عن متناول اليد" },
        { id: "sharp-objects", en: "Sharp objects stored safely", ar: "الأشياء الحادة مُخزَّنة بأمان" },
        { id: "pool-fence", en: "Pool / water areas secured", ar: "حمام السباحة ومناطق المياه مُؤمَّنة" },
      ],
    },
    {
      id: "dev",
      en: "Development Milestones",
      ar: "مراحل النمو",
      emoji: "🌱",
      items: [
        { id: "18m-checkup", en: "18-month developmental check", ar: "فحص النمو في ١٨ شهرًا" },
        { id: "2y-checkup", en: "2-year well-child visit", ar: "زيارة طفل الـ ٢ سنوات" },
        { id: "speech", en: "Speech therapy assessed if needed", ar: "تقييم علاج النطق إذا لزم" },
        { id: "dental", en: "First dental visit completed", ar: "إتمام أول زيارة لطبيب الأسنان" },
        { id: "potty-training", en: "Potty training started", ar: "بدء تدريب الحمام" },
      ],
    },
    {
      id: "nursery-prep",
      en: "Nursery Preparation",
      ar: "التحضير للحضانة",
      emoji: "🏫",
      items: [
        { id: "nursery-research", en: "Nurseries shortlisted & visited", ar: "الحضانات في القائمة القصيرة وزارتها" },
        { id: "nursery-docs", en: "Documents prepared (birth cert, vaccine record)", ar: "المستندات جاهزة (شهادة الميلاد، سجل التطعيمات)" },
        { id: "nursery-applied", en: "Application submitted", ar: "تقديم الطلب" },
        { id: "separation", en: "Practiced separation anxiety steps", ar: "ممارسة خطوات التعامل مع قلق الانفصال" },
      ],
    },
  ],
  preschool: [
    {
      id: "nursery-life",
      en: "Nursery Life",
      ar: "الحياة في الحضانة",
      emoji: "🎨",
      items: [
        { id: "routine", en: "Daily routine established with nursery", ar: "روتين يومي محدد مع الحضانة" },
        { id: "lunchbox", en: "Healthy lunchbox ideas ready", ar: "أفكار وجبات صحية جاهزة" },
        { id: "uniform", en: "Uniform / branded bag purchased", ar: "الزي/الحقيبة الرسمية مشتراة" },
        { id: "allergy-form", en: "Allergy / medical form submitted", ar: "نموذج الحساسية/الطبي مُقدَّم" },
        { id: "emergency-contact", en: "Emergency contacts updated at nursery", ar: "جهات الاتصال الطارئة مُحدَّثة في الحضانة" },
      ],
    },
    {
      id: "school-research",
      en: "School Research",
      ar: "البحث عن المدرسة",
      emoji: "📚",
      items: [
        { id: "school-list", en: "Schools shortlisted by area & curriculum", ar: "المدارس في القائمة القصيرة حسب المنطقة والمنهج" },
        { id: "open-days", en: "Open days / tours attended", ar: "حضور أيام مفتوحة أو جولات في المدارس" },
        { id: "fees-compared", en: "Fees compared side-by-side", ar: "المصروفات مُقارَنة جنبًا إلى جنب" },
        { id: "application-dates", en: "Application deadlines noted", ar: "مواعيد التقديم مُسجَّلة" },
        { id: "references", en: "References / recommendations gathered", ar: "المراجع/التوصيات جُمِعت" },
      ],
    },
    {
      id: "child-skills",
      en: "Child Readiness",
      ar: "استعداد الطفل",
      emoji: "⭐",
      items: [
        { id: "toilet-trained", en: "Fully toilet-trained", ar: "تدريب الحمام مكتمل" },
        { id: "name-writes", en: "Recognises / writes own name", ar: "يتعرف على اسمه / يكتبه" },
        { id: "scissors", en: "Can use scissors safely", ar: "يستخدم المقص بأمان" },
        { id: "social", en: "Comfortable playing with peers", ar: "مرتاح للعب مع الأقران" },
      ],
    },
  ],
  school: [
    {
      id: "enrollment",
      en: "School Enrollment",
      ar: "التسجيل المدرسي",
      emoji: "📝",
      items: [
        { id: "acceptance", en: "Acceptance letter received", ar: "رسالة القبول مُستلَمة" },
        { id: "fees-paid", en: "Fees paid / payment plan set", ar: "المصروفات مدفوعة / خطة الدفع محددة" },
        { id: "uniform-school", en: "School uniform purchased", ar: "الزي المدرسي مشتري" },
        { id: "stationery", en: "Stationery & schoolbag ready", ar: "القرطاسية والحقيبة المدرسية جاهزة" },
        { id: "transport", en: "School transport arranged", ar: "المواصلات المدرسية مُنظَّمة" },
        { id: "after-school", en: "After-school care / activities decided", ar: "رعاية ما بعد المدرسة / الأنشطة مُقرَّرة" },
      ],
    },
    {
      id: "health-school",
      en: "Health & Wellbeing",
      ar: "الصحة والرفاهية",
      emoji: "🏃",
      items: [
        { id: "vaccines-school", en: "School-entry vaccines up to date", ar: "تطعيمات دخول المدرسة محدَّثة" },
        { id: "vision", en: "Vision & hearing checked", ar: "البصر والسمع مفحوصان" },
        { id: "dentist-school", en: "Dental check-up done", ar: "فحص الأسنان مُنجز" },
        { id: "medical-form-school", en: "School medical form submitted", ar: "النموذج الطبي المدرسي مُقدَّم" },
        { id: "allergy-school", en: "Allergy action plan shared with school", ar: "خطة التعامل مع الحساسية مشاركة مع المدرسة" },
      ],
    },
    {
      id: "home-routine",
      en: "Home Routine",
      ar: "الروتين المنزلي",
      emoji: "🕐",
      items: [
        { id: "bedtime", en: "Consistent bedtime established (8–9 PM)", ar: "وقت نوم ثابت (٨–٩ مساءً)" },
        { id: "homework-spot", en: "Quiet homework area set up", ar: "مكان هادئ للواجبات جاهز" },
        { id: "reading", en: "Daily reading habit started (20 min)", ar: "عادة القراءة اليومية بدأت (٢٠ دقيقة)" },
        { id: "screen-time", en: "Screen-time rules agreed", ar: "قواعد وقت الشاشة مُتَّفق عليها" },
        { id: "lunch-prep", en: "School lunch prepped the night before", ar: "وجبة المدرسة مُحضَّرة مساء اليوم السابق" },
      ],
    },
  ],
};

function ProgressRing({ pct }: { pct: number }) {
  const r = 22;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width="56" height="56" className="-rotate-90">
      <circle cx="28" cy="28" r={r} fill="none" stroke="currentColor" strokeWidth="4" className="text-muted" />
      <circle
        cx="28"
        cy="28"
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeLinecap="round"
        className="text-primary transition-all duration-500"
      />
    </svg>
  );
}

function ChecklistPage() {
  const { stage, t, lang } = useApp();
  const sections = data[stage];
  const allIds = useMemo(() => sections.flatMap((s) => s.items.map((i) => i.id)), [sections]);
  const [done, setDone] = useState<string[]>([]);

  const toggle = (id: string) =>
    setDone((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const reset = () => setDone([]);

  const totalDone = done.filter((id) => allIds.includes(id)).length;
  const totalAll = allIds.length;
  const pct = totalAll === 0 ? 0 : Math.round((totalDone / totalAll) * 100);
  const isComplete = pct === 100;

  return (
    <main>
      <div className="px-4 pt-5 pb-2">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{t("My Checklist", "قائمتي")}</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {t("Stage-specific prep items", "بنود التحضير لمرحلتك")}
            </p>
          </div>
          <button
            id="checklist-reset-btn"
            onClick={reset}
            disabled={done.length === 0}
            className="flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold text-muted-foreground disabled:opacity-40"
            aria-label={t("Reset all", "إعادة تعيين الكل")}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            {t("Reset", "إعادة")}
          </button>
        </div>

        {/* Progress summary */}
        <div className={`mt-4 flex items-center gap-4 rounded-3xl p-4 shadow-soft ${isComplete ? "bg-hero text-primary-foreground" : "bg-card"}`}>
          <div className="relative flex shrink-0 items-center justify-center">
            <ProgressRing pct={pct} />
            <span className={`absolute text-sm font-bold ${isComplete ? "text-primary-foreground" : "text-foreground"}`}>
              {pct}%
            </span>
          </div>
          <div>
            {isComplete ? (
              <div className="animate-slide-up">
                <div className="flex items-center gap-1.5 font-bold text-lg">
                  <PartyPopper className="h-5 w-5" />
                  {t("All done!", "أتممتِ الكل!")}
                </div>
                <p className="mt-0.5 text-sm opacity-90">{t("You're fully prepared. Great job! 🌿", "أنتِ مستعدة تمامًا. عمل رائع! 🌿")}</p>
              </div>
            ) : (
              <>
                <div className="font-semibold">
                  {totalDone} / {totalAll} {t("items done", "بند مكتمل")}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {totalAll - totalDone} {t("remaining", "متبقٍّ")}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6 px-4 pt-4 pb-4">
        {sections.map((section) => {
          const secDone = section.items.filter((i) => done.includes(i.id)).length;
          const secTotal = section.items.length;
          const secPct = Math.round((secDone / secTotal) * 100);
          return (
            <section key={section.id} className="animate-slide-up">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{section.emoji}</span>
                  <h2 className="text-lg font-bold">{lang === "ar" ? section.ar : section.en}</h2>
                </div>
                <Badge tone={secDone === secTotal ? "primary" : "muted"}>
                  {secDone}/{secTotal}
                </Badge>
              </div>

              {/* Section progress bar */}
              <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${secPct}%` }}
                />
              </div>

              <div className="space-y-2">
                {section.items.map((item) => {
                  const checked = done.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      id={`checklist-item-${item.id}`}
                      onClick={() => toggle(item.id)}
                      className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-start transition-all duration-200 ${checked
                          ? "border-primary/30 bg-primary-soft"
                          : "bg-card shadow-soft hover:shadow-md hover:-translate-y-px"
                        }`}
                    >
                      <span className="shrink-0">
                        {checked ? (
                          <CheckCircle2 className="h-5 w-5 text-primary animate-check" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </span>
                      <span className={`flex-1 text-sm font-medium leading-snug ${checked ? "line-through opacity-60" : ""}`}>
                        {lang === "ar" ? item.ar : item.en}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
