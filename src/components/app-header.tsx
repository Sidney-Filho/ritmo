"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/", label: "Today" },
  { href: "/week", label: "Week" },
];

function LogoMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
    >
      <rect width="28" height="28" rx="9" className="fill-accent" />
      <rect x="6.5" y="11" width="3.5" height="8" rx="1.75" className="fill-accent-ink" />
      <rect x="12.25" y="6.5" width="3.5" height="15" rx="1.75" className="fill-accent-ink" />
      <rect x="18" y="9.5" width="3.5" height="10" rx="1.75" className="fill-accent-ink" />
    </svg>
  );
}

export default function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-surface/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          aria-label="Ritmo, go to Today"
          className="flex items-center gap-2.5 rounded-lg"
        >
          <LogoMark />
          <span className="font-display text-xl font-bold tracking-tight">
            Ritmo
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex gap-1 rounded-full bg-surface-2 p-1"
        >
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-ink text-canvas"
                    : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
