"use client";

import { useSyncExternalStore } from "react";
import { toISODate } from "@/lib/dates";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return toISODate(new Date());
}

function getServerSnapshot() {
  return "";
}

/**
 * Today's date as "YYYY-MM-DD", read on the client only.
 * Returns an empty string during server rendering so the server never
 * depends on the current time (and hydration stays consistent).
 */
export function useToday(): string {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
