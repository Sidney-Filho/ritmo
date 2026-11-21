"use client";

import { useState } from "react";
import RhythmStrip from "@/components/rhythm-strip";
import TaskForm from "@/components/task-form";
import { formatMinutes, formatShortDate, parseISODate } from "@/lib/dates";
import { priorityMeta } from "@/lib/priority";
import type { Task, TaskInput } from "@/types/task";

export default function TaskPlanner() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(taskInput: TaskInput) {
    const newTask: Task = {
      ...taskInput,
      id: crypto.randomUUID(),
      completed: false,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  }

  return (
    <>
      <RhythmStrip tasks={tasks} />

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
        <TaskForm onAddTask={handleAddTask} />

        <section aria-labelledby="tasks-heading">
          <div className="flex items-center gap-3">
            <h2
              id="tasks-heading"
              className="font-display text-2xl font-bold tracking-tight"
            >
              Your tasks
            </h2>
            {tasks.length > 0 ? (
              <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-sm font-medium text-accent-soft-ink">
                {tasks.length}
              </span>
            ) : null}
          </div>

          {tasks.length === 0 ? (
            <div className="mt-5 rounded-3xl border border-dashed border-line-strong px-6 py-12 text-center">
              <p className="font-medium">No tasks yet</p>
              <p className="mx-auto mt-1 max-w-xs text-sm text-muted">
                Add your first task to start shaping the day.
              </p>
            </div>
          ) : (
            <ul className="mt-5 space-y-3">
              {tasks.map((task) => {
                const meta = priorityMeta[task.priority];

                return (
                  <li
                    key={task.id}
                    className="flex gap-4 rounded-2xl border border-line bg-surface p-4 sm:p-5"
                  >
                    <span
                      aria-hidden="true"
                      className={`w-1.5 shrink-0 rounded-full ${meta.bar}`}
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="break-words text-lg font-medium leading-snug">
                        {task.title}
                      </h3>

                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium">
                        <span
                          className={`rounded-full px-2.5 py-1 ${meta.chip}`}
                        >
                          {meta.label} priority
                        </span>
                        <time
                          dateTime={task.date}
                          className="rounded-full bg-surface-2 px-2.5 py-1 text-muted"
                        >
                          {formatShortDate(parseISODate(task.date))}
                        </time>
                      </div>
                    </div>

                    <p className="shrink-0 self-start font-display text-xl font-bold tracking-tight">
                      {formatMinutes(task.estimatedMinutes)}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
