"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { href: "/", label: "Today" },
  { href: "/week", label: "Week" },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="border-b border-line bg-surface md:w-60 md:shrink-0 md:border-r md:border-b-0">
      <div className="flex items-center justify-between px-5 py-4 md:py-6">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="font-display text-2xl font-bold text-accent"
        >
          Ritmo
        </Link>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="app-navigation"
          onClick={() => setIsOpen((open) => !open)}
          className="rounded-lg border border-line px-3 py-2 text-sm font-medium md:hidden"
        >
          {isOpen ? "Close menu" : "Menu"}
        </button>
      </div>

      <nav
        id="app-navigation"
        aria-label="Main navigation"
        className={`${isOpen ? "flex" : "hidden"} flex-col gap-1 px-3 pb-4 md:flex`}
      >
        {navigation.map(({ href, label }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              onClick={() => setIsOpen(false)}
              className={`rounded-xl px-3 py-2.5 text-sm font-medium ${
                isActive
                  ? "bg-accent-soft text-accent-soft-ink"
                  : "text-muted hover:bg-surface-2 hover:text-ink"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}