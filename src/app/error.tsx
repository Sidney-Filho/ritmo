"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main>
      <div
        role="alert"
        className="mx-auto max-w-md rounded-xl border border-line bg-surface p-6 text-center shadow-card"
      >
        <h1 className="font-display text-xl font-semibold tracking-tight">
          Something went wrong
        </h1>
        <p className="mt-2 text-muted">
          This page could not be displayed. Try again, and if it keeps
          happening, reload the page.
        </p>
        <button
          type="button"
          onClick={() => retry()}
          className="mt-5 h-11 cursor-pointer rounded-lg bg-accent px-5 font-semibold text-accent-ink transition-colors duration-150 hover:bg-accent-hover"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
