import TaskPlanner from "@/components/task-planner";
import TodayDate from "@/components/today-date";

export default function Home() {
  return (
    <main>
      <TodayDate />

      <h1 className="mt-1 font-display text-5xl font-bold tracking-tight sm:text-6xl">
        Today
      </h1>

      <p className="mt-3 max-w-prose text-lg text-muted">
        Focus on what matters today.
      </p>

      <TaskPlanner />
    </main>
  );
}
