import TaskPlanner from "@/components/task-planner";
import TodayDate from "@/components/today-date";

export default function Home() {
  return (
    <main>
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Today
        </h1>
        <TodayDate />
      </header>

      <TaskPlanner />
    </main>
  );
}
