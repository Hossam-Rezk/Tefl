import { Link } from "@tanstack/react-router";
import { Home, BookOpen, Stethoscope, ShoppingBag, User, CheckSquare } from "lucide-react";
import { useApp } from "@/lib/app-state";

const items = [
  { to: "/", en: "Home", ar: "الرئيسية", icon: Home },
  { to: "/learn", en: "Learn", ar: "تعلّمي", icon: BookOpen },
  { to: "/directory", en: "Directory", ar: "الدليل", icon: Stethoscope },
  { to: "/products", en: "Products", ar: "المنتجات", icon: ShoppingBag },
  { to: "/checklist", en: "Checklist", ar: "قائمتي", icon: CheckSquare },
  { to: "/profile", en: "Profile", ar: "حسابي", icon: User },
] as const;

export function BottomNav() {
  const { t } = useApp();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[480px] border-t bg-card/95 backdrop-blur">
      <div className="flex justify-around px-1 pt-1.5 pb-safe-area-inset-bottom pb-3">
        {items.map(({ to, en, ar, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            className="group relative flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[10px] font-medium text-muted-foreground transition-colors duration-150"
            activeProps={{ className: "text-primary font-semibold" }}
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-200 ${
                    isActive ? "bg-primary-soft scale-105" : "group-hover:bg-muted"
                  }`}
                >
                  <Icon className={`h-4.5 w-4.5 transition-transform duration-200 ${isActive ? "scale-110" : ""}`} />
                </span>
                <span className={`transition-colors duration-150 ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {t(en, ar)}
                </span>
                {isActive && (
                  <span className="absolute top-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-primary animate-slide-up" />
                )}
              </>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}

