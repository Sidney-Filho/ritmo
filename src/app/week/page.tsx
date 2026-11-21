import WeekBoard, { WeekRange } from "@/components/week-board";

export default function WeekPage() {
  return (
    <main>
      <WeekRange />

      <h1 className="mt-1 font-display text-5xl font-bold tracking-tight sm:text-6xl">
        Week
      </h1>

      <p className="mt-3 max-w-prose text-lg text-muted">
        Build a realistic plan for your week.
      </p>

      <WeekBoard />
    </main>
  );
}
