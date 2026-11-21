import { formatMinutes } from "@/lib/dates";
import { priorityMeta, priorityOrder } from "@/lib/priority";
import type { Task } from "@/types/task";

type RhythmStripProps = {
  tasks: Task[];
};

export default function RhythmStrip({ tasks }: RhythmStripProps) {
  const totalMinutes = tasks.reduce(
    (sum, task) => sum + task.estimatedMinutes,
    0,
  );

  const minutesByPriority = priorityOrder.map((priority) => ({
    priority,
    minutes: tasks
      .filter((task) => task.priority === priority)
      .reduce((sum, task) => sum + task.estimatedMinutes, 0),
  }));

  return (
    <section
      aria-labelledby="rhythm-heading"
      className="mt-10 rounded-[2rem] bg-hero p-6 text-hero-ink sm:p-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
        <div>
          <h2
            id="rhythm-heading"
            className="text-sm font-medium text-hero-muted"
          >
            Planned time
          </h2>
          <p className="mt-1 font-display text-5xl font-bold tracking-tight sm:text-6xl">
            {formatMinutes(totalMinutes)}
          </p>
        </div>

        <p className="pb-1.5 text-base text-hero-muted">
          {tasks.length === 0
            ? "No tasks yet"
            : `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"}`}
        </p>
      </div>

      {tasks.length === 0 ? (
        <div className="mt-6 flex h-16 items-center justify-center rounded-2xl border border-dashed border-hero-line px-4 text-center text-sm text-hero-muted">
          Add a task and your day will take shape here.
        </div>
      ) : (
        <ul
          aria-label="Tasks sized by estimated duration"
          className="mt-6 flex h-16 gap-1"
        >
          {tasks.map((task) => (
            <li
              key={task.id}
              title={`${task.title} · ${formatMinutes(task.estimatedMinutes)}`}
              style={{ flexGrow: task.estimatedMinutes, flexBasis: 0 }}
              className={`min-w-2 rounded-lg ${priorityMeta[task.priority].bar}`}
            >
              <span className="sr-only">
                {task.title}, {formatMinutes(task.estimatedMinutes)},{" "}
                {priorityMeta[task.priority].label} priority
              </span>
            </li>
          ))}
        </ul>
      )}

      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-hero-muted">
        {minutesByPriority.map(({ priority, minutes }) => (
          <li key={priority} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className={`size-2.5 rounded-full ${priorityMeta[priority].bar}`}
            />
            <span>
              {priorityMeta[priority].label}{" "}
              <span className="font-medium text-hero-ink">
                {formatMinutes(minutes)}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
