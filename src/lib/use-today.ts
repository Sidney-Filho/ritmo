"use client";

import { useSyncExternalStore } from "react";
import { toISODate } from "@/lib/dates";

const CHECK_INTERVAL_MS = 60_000;

/**
 * Tells React to re-read the date now and then. React compares the new value
 * with the old one and only re-renders when the day actually changed, so
 * checking is cheap. A timer aimed exactly at midnight would be more precise,
 * but browsers can pause timers while a laptop sleeps; checking regularly
 * (and whenever the tab becomes visible again) recovers from that.
 */
function subscribe(onChange: () => void) {
  const intervalId = window.setInterval(onChange, CHECK_INTERVAL_MS);

  function handleVisibilityChange() {
    if (document.visibilityState === "visible") onChange();
  }

  document.addEventListener("visibilitychange", handleVisibilityChange);

  return () => {
    window.clearInterval(intervalId);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
  };
}

function getSnapshot() {
  return toISODate(new Date());
}

function getServerSnapshot() {
  return "";
}

/**
 * Today's date as "YYYY-MM-DD", read on the client only, and kept up to date
 * when the page stays open past midnight.
 * Returns an empty string during server rendering so the server never
 * depends on the current time (and hydration stays consistent).
 */
export function useToday(): string {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
