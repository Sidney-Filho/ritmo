import TaskPlanner from "@/components/task-planner";

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl font-bold tracking-tight">
        Today
      </h1>

      <p className="mt-2 text-slate-600">
        Focus on what matters today.
      </p>

      <TaskPlanner />
    </main>
  );
}