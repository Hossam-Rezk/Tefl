import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { ShoppingCart, Store } from "lucide-react";
import { useApp } from "@/lib/app-state";
import { products, productCats, stages, egp, priceRange, productImage, type ProductCat } from "@/lib/data";
import { PageTitle, Pills, Badge, Sheet, ComingSoon } from "@/components/ui-kit";

export const Route = createFileRoute("/products")({
  validateSearch: zodValidator(z.object({ open: fallback(z.string(), "").default("") })),
  head: () => ({
    meta: [
      { title: "Products & price comparison in Cairo — Tefl" },
      { name: "description", content: "Compare pregnancy, baby, toy and school product prices across Cairo pharmacies and stores in EGP." },
      { property: "og:title", content: "Tefl product price comparison" },
      { property: "og:description", content: "Where to buy baby and pregnancy essentials in Cairo — at the best price." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Products,
});

function Products() {
  const { stage, stageLabel, t, lang } = useApp();
  const { open } = Route.useSearch();
  const navigate = useNavigate({ from: "/products" });
  const [cat, setCat] = useState<"stage" | ProductCat>("stage");
  const list = products.filter((p) => (cat === "stage" ? p.stages.includes(stage) : p.cat === cat));
  const current = products.find((p) => p.id === open);
  const opts = [{ id: "stage" as const, label: `✨ ${t("For my stage", "لمرحلتي")}` }, ...productCats.map((c) => ({ id: c.id, label: lang === "ar" ? c.ar : c.en }))];

  return (
    <main>
      <PageTitle title={t("Products & prices", "المنتجات والأسعار")} sub={t("Compare brands and Cairo stores in EGP", "قارني الماركات والمتاجر بالجنيه")} />
      <div className="px-4 pt-4"><Pills value={cat} options={opts} onChange={setCat} /></div>

      <div className="grid grid-cols-2 gap-3 px-4 pt-4">
        {list.map((p) => {
          const [lo, hi] = priceRange(p);
          return (
            <button key={p.id} onClick={() => navigate({ search: { open: p.id } })} className="overflow-hidden rounded-2xl border bg-card text-start shadow-soft">
              <img src={productImage(p)} alt={p.name} loading="lazy" width={816} height={816} className="aspect-[4/3] w-full object-cover" />
              <div className="space-y-1.5 p-3">
                <Badge tone="coral">{stages.find((s) => s.id === p.stages[0])!.emoji} {stageLabel(p.stages[0]!)}</Badge>
                <div className="text-sm font-semibold leading-snug">{p.name}</div>
                <div className="line-clamp-2 text-xs text-muted-foreground">{p.purpose}</div>
                <div className="text-sm font-bold text-primary">{lo === hi ? egp(lo) : `${egp(lo)} – ${hi.toLocaleString("en-US")}`}</div>
              </div>
            </button>
          );
        })}
      </div>

      <Sheet open={!!current} onClose={() => navigate({ search: { open: "" } })} title={current?.name ?? ""}>
        {current && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{current.purpose}</p>
            {current.variants.map((v) => {
              const best = Math.min(...v.offers.map((o) => o.price));
              return (
                <div key={v.brand} className="rounded-2xl border bg-card">
                  <div className="flex items-center justify-between border-b p-3">
                    <div className="font-semibold">{v.brand}</div>
                    <Badge tone="muted">{v.note}</Badge>
                  </div>
                  <div className="text-xs font-semibold text-muted-foreground px-3 pt-2">{t("Where to buy in Cairo", "أين تشترين في القاهرة")}</div>
                  <ul className="divide-y px-3">
                    {[...v.offers].sort((a, b) => a.price - b.price).map((o) => (
                      <li key={o.store} className="flex items-center justify-between py-2.5 text-sm">
                        <span className="flex items-center gap-2"><Store className="h-4 w-4 text-muted-foreground" /><span>{o.store}<span className="block text-xs text-muted-foreground">{o.branch}</span></span></span>
                        <span className={o.price === best ? "rounded-full bg-primary px-2.5 py-0.5 font-bold text-primary-foreground" : "font-semibold"}>{egp(o.price)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            <div className="flex items-center justify-between rounded-2xl border border-dashed p-4">
              <span className="flex items-center gap-2 font-semibold"><ShoppingCart className="h-4 w-4" />{t("Buy in-app", "اشتري من التطبيق")}</span>
              <ComingSoon />
            </div>
          </div>
        )}
      </Sheet>
    </main>
  );
}
