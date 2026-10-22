import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Area, StageId } from "./data";
import { stages, areas } from "./data";

type Lang = "en" | "ar";
type State = {
  stage: StageId; setStage: (s: StageId) => void;
  area: Area; setArea: (a: Area) => void;
  lang: Lang; setLang: (l: Lang) => void;
  t: (en: string, ar: string) => string;
  stageLabel: (id: StageId) => string;
  areaLabel: (a: Area) => string;
};

const Ctx = createContext<State | null>(null);
const KEY = "tefl-state";

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<StageId>("pregnancy");
  const [area, setArea] = useState<Area>("Maadi");
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || "{}");
      if (s.stage) setStage(s.stage);
      if (s.area) setArea(s.area);
      if (s.lang) setLang(s.lang);
    } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify({ stage, area, lang }));
  }, [stage, area, lang]);

  const t = (en: string, ar: string) => (lang === "ar" ? ar : en);
  const stageLabel = (id: StageId) => {
    const s = stages.find((x) => x.id === id)!;
    return lang === "ar" ? s.ar : s.en;
  };
  const areaLabel = (a: Area) => (lang === "ar" ? areas.find((x) => x.id === a)!.ar : a);

  return (
    <Ctx.Provider value={{ stage, setStage, area, setArea, lang, setLang, t, stageLabel, areaLabel }}>
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useApp outside provider");
  return c;
}
