import { formatMinutes } from "@/lib/dates";
import type { Task } from "@/types/task";

type RhythmStripProps = {
  tasks: Task[];
};

function sumMinutes(tasks: Task[]) {
  return tasks.reduce((sum, task) => sum + task.estimatedMinutes, 0);
}

export default function RhythmStrip({ tasks }: RhythmStripProps) {
  const plannedMinutes = sumMinutes(tasks);
  const remainingMinutes = sumMinutes(tasks.filter((task) => !task.completed));
  const doneCount = tasks.filter((task) => task.completed).length;

  return (
    <section
      aria-label="Time summary for today"
      className="mt-6 rounded-xl border border-line bg-surface p-5 shadow-card sm:p-6"
    >
      <dl className="grid grid-cols-2 gap-4">
        <div>
          <dt className="text-sm font-medium text-muted">Planned time</dt>
          <dd className="mt-1 font-display text-xl font-bold whitespace-nowrap tabular-nums sm:text-3xl">
            {formatMinutes(plannedMinutes)}
          </dd>
        </div>

        <div>
          <dt className="text-sm font-medium text-muted">Remaining time</dt>
          <dd className="mt-1 font-display text-xl font-bold whitespace-nowrap tabular-nums sm:text-3xl">
            {formatMinutes(remainingMinutes)}
          </dd>
        </div>
      </dl>

      <ul
        aria-label="Tasks sized by estimated duration"
        className="mt-5 flex h-2.5 gap-0.5 overflow-hidden rounded-full bg-surface-2"
      >
        {tasks.map((task) => (
          <li
            key={task.id}
            title={`${task.title} · ${formatMinutes(task.estimatedMinutes)} · ${
              task.completed ? "Done" : "Remaining"
            }`}
            style={{ flexGrow: task.estimatedMinutes, flexBasis: 0 }}
            className={`min-w-1 transition-[flex-grow,background-color] duration-200 ease-out ${
              task.completed ? "bg-line-strong" : "bg-accent"
            }`}
          >
            <span className="sr-only">
              {task.title}, {formatMinutes(task.estimatedMinutes)},{" "}
              {task.completed ? "done" : "remaining"}
            </span>
          </li>
        ))}
      </ul>

      {tasks.length > 0 ? (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm text-muted">
          <p>
            {doneCount} of {tasks.length}{" "}
            {tasks.length === 1 ? "task" : "tasks"} done
          </p>

          <p className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true" className="size-2.5 rounded-full bg-accent" />
              Remaining
            </span>
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true" className="size-2.5 rounded-full bg-line-strong" />
              Done
            </span>
          </p>
        </div>
      ) : null}
    </section>
  );
}
