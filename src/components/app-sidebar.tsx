"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function TodayIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="10" cy="10" r="7.25" />
      <path d="m6.75 10.25 2.25 2.25 4.25-4.5" />
    </svg>
  );
}

function WeekIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="4.5" width="14" height="12.5" rx="2" />
      <path d="M3 8.5h14M7 3v3M13 3v3" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg {...iconProps}>
      {open ? <path d="m5 5 10 10M15 5 5 15" /> : <path d="M3.5 6h13M3.5 10h13M3.5 14h13" />}
    </svg>
  );
}

function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect width="28" height="28" rx="8" className="fill-accent" />
      <rect x="6.5" y="11" width="3.5" height="8" rx="1.75" className="fill-accent-ink" />
      <rect x="12.25" y="6.5" width="3.5" height="15" rx="1.75" className="fill-accent-ink" />
      <rect x="18" y="9.5" width="3.5" height="10" rx="1.75" className="fill-accent-ink" />
    </svg>
  );
}

const navigation: { href: string; label: string; icon: ReactNode }[] = [
  { href: "/", label: "Today", icon: <TodayIcon /> },
  { href: "/week", label: "Week", icon: <WeekIcon /> },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape" && isOpen) {
      setIsOpen(false);
      menuButtonRef.current?.focus();
    }
  }

  return (
    <aside
      onKeyDown={handleKeyDown}
      className="sticky top-0 z-20 border-b border-line bg-surface md:h-dvh md:w-56 md:shrink-0 md:self-start md:border-r md:border-b-0"
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-5 md:py-6">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2.5 rounded-lg"
        >
          <LogoMark />
          <span className="font-display text-xl font-bold tracking-tight">
            Ritmo
          </span>
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={isOpen}
          aria-controls="app-navigation"
          onClick={() => setIsOpen((open) => !open)}
          className="flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-control px-3 text-sm font-medium transition-colors duration-150 hover:bg-surface-2 md:hidden"
        >
          <MenuIcon open={isOpen} />
          {isOpen ? "Close menu" : "Menu"}
        </button>
      </div>

      {/* The grid-rows trick animates height; `invisible` keeps closed links out of the tab order. */}
      <div
        id="app-navigation"
        className={`grid transition-[grid-template-rows,visibility] duration-200 ease-out md:visible md:block ${
          isOpen ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="min-h-0 overflow-hidden md:overflow-visible"
        >
          <ul className="flex flex-col gap-1 px-3 pt-1 pb-4 md:pb-0">
            {navigation.map(({ href, label, icon }) => {
              const isActive = pathname === href;

              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setIsOpen(false)}
                    className={`relative flex h-11 items-center gap-3 rounded-lg px-3 text-sm transition-colors duration-150 ${
                      isActive
                        ? "bg-accent-soft font-semibold text-accent-soft-ink before:absolute before:inset-y-2 before:left-0 before:w-1 before:rounded-r-full before:bg-accent"
                        : "font-medium text-muted hover:bg-surface-2 hover:text-ink"
                    }`}
                  >
                    {icon}
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
