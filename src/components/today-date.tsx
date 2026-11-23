"use client";

import { formatLongDate, parseISODate } from "@/lib/dates";
import { useToday } from "@/lib/use-today";

export default function TodayDate() {
  const today = useToday();

  return (
    <p className="mt-1 min-h-6 text-base text-muted">
      {today ? formatLongDate(parseISODate(today)) : null}
    </p>
  );
}
