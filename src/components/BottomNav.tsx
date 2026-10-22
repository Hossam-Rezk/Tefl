import { Link } from "@tanstack/react-router";
import { Home, BookOpen, Stethoscope, ShoppingBag, User } from "lucide-react";
import { useApp } from "@/lib/app-state";

const items = [
  { to: "/", en: "Home", ar: "الرئيسية", icon: Home },
  { to: "/learn", en: "Learn", ar: "تعلّمي", icon: BookOpen },
  { to: "/directory", en: "Directory", ar: "الدليل", icon: Stethoscope },
  { to: "/products", en: "Products", ar: "المنتجات", icon: ShoppingBag },
  { to: "/profile", en: "Profile", ar: "حسابي", icon: User },
] as const;

export function BottomNav() {
  const { t } = useApp();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[480px] border-t bg-card/95 backdrop-blur">
      <div className="flex justify-around px-1 pt-2 pb-3">
        {items.map(({ to, en, ar, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            className="group flex flex-1 flex-col items-center gap-1 text-[11px] text-muted-foreground"
            activeProps={{ className: "text-primary font-semibold" }}
          >
            <Icon className="h-5 w-5" />
            {t(en, ar)}
          </Link>
        ))}
      </div>
    </nav>
  );
}
