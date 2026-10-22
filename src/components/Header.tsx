import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, MapPin, ChevronDown } from "lucide-react";
import { useApp } from "@/lib/app-state";
import { areas, stages, type Area, type StageId } from "@/lib/data";

const navLinks = [
  { to: "/", label: "Home", exact: true },
  { to: "/learn", label: "Learn" },
  { to: "/directory", label: "Directory" },
  { to: "/products", label: "Products" },
  { to: "/checklist", label: "Checklist" },
  { to: "/profile", label: "My Profile" },
] as const;

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 shrink-0">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-soft">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
          <circle cx="9" cy="6" r="3" />
          <circle cx="16" cy="11" r="2.2" />
          <path d="M4 21c0-4.5 2.2-8 5-8 1.6 0 2.9 1 3.8 2.7.7-.8 1.8-1.4 3.2-1.4 2.6 0 4 2.6 4 6.7H4z" opacity=".9" />
        </svg>
      </div>
      <div className="leading-tight hidden sm:block">
        <div className="font-display text-lg font-bold leading-none">
          Tefl <span className="text-coral">-</span> <span className="font-arabic">طِفْل</span>
        </div>
        <div className="text-[10px] text-muted-foreground">Motherhood companion · Cairo</div>
      </div>
    </Link>
  );
}

export function SiteNav() {
  const { lang, setLang, stage, setStage, area, setArea, t } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      {/* Main nav row */}
      <div className="site-container flex h-16 items-center gap-4">
        <Logo />

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center" aria-label="Main navigation">
          {navLinks.map(({ to, label, exact }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: exact ?? false }}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              activeProps={{ className: "rounded-lg px-3 py-2 text-sm font-semibold text-primary bg-primary-soft" }}
            >
              {t(label, label)}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Stage select */}
          <div className="hidden sm:flex items-center">
            <NavSelect
              value={stage}
              onChange={(v) => setStage(v as StageId)}
              options={stages.map((s) => ({ value: s.id, label: `${s.emoji} ${lang === "ar" ? s.ar : s.en}` }))}
              aria-label="Motherhood stage"
            />
          </div>

          {/* Area select */}
          <div className="hidden sm:flex items-center">
            <NavSelect
              icon={<MapPin className="h-3.5 w-3.5 text-coral" />}
              value={area}
              onChange={(v) => setArea(v as Area)}
              options={areas.map((a) => ({ value: a.id, label: lang === "ar" ? a.ar : a.id }))}
              aria-label="Cairo area"
            />
          </div>

          {/* Language toggle */}
          <div className="flex rounded-full border bg-card p-0.5 text-xs font-semibold">
            {(["ar", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-full px-2.5 py-1 transition ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen((o) => !o)}
            className="flex md:hidden items-center justify-center rounded-lg border p-2 text-muted-foreground hover:bg-muted"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t bg-background md:hidden animate-slide-up">
          <div className="site-container py-4 space-y-1">
            {navLinks.map(({ to, label, exact }) => (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact: exact ?? false }}
                onClick={() => setMobileOpen(false)}
                className="flex w-full rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                activeProps={{ className: "flex w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-primary bg-primary-soft" }}
              >
                {label}
              </Link>
            ))}
            {/* Mobile stage/area controls */}
            <div className="pt-3 border-t grid grid-cols-2 gap-2">
              <NavSelect
                value={stage}
                onChange={(v) => setStage(v as StageId)}
                options={stages.map((s) => ({ value: s.id, label: `${s.emoji} ${lang === "ar" ? s.ar : s.en}` }))}
              />
              <NavSelect
                icon={<MapPin className="h-3.5 w-3.5 text-coral" />}
                value={area}
                onChange={(v) => setArea(v as Area)}
                options={areas.map((a) => ({ value: a.id, label: lang === "ar" ? a.ar : a.id }))}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavSelect({
  value, onChange, options, icon, "aria-label": ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  icon?: React.ReactNode;
  "aria-label"?: string;
}) {
  return (
    <label className="relative flex items-center gap-1.5 rounded-xl border bg-card px-3 py-1.5 text-sm cursor-pointer hover:bg-muted transition">
      {icon}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        className="appearance-none bg-transparent pe-5 font-medium outline-none min-w-0 truncate max-w-[120px] cursor-pointer"
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute end-2 h-3.5 w-3.5 text-muted-foreground" />
    </label>
  );
}

// Keep old exports so any stale imports don't break during dev
export { SiteNav as Header };
