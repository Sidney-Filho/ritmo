import WeekBoard, { WeekRange } from "@/components/week-board";

export default function WeekPage() {
  return (
    <main>
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Week
        </h1>
        <WeekRange />
      </header>

      <WeekBoard />
    </main>
  );
}
