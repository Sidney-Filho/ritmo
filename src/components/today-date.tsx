"use client";

import { formatLongDate, parseISODate } from "@/lib/dates";
import { useToday } from "@/lib/use-today";

export default function TodayDate() {
  const today = useToday();

  return (
    <p className="min-h-6 text-base font-medium text-accent-soft-ink">
      {today ? formatLongDate(parseISODate(today)) : null}
    </p>
  );
}
