"use client";

import RhythmStrip from "@/components/rhythm-strip";
import TaskForm from "@/components/task-form";
import { formatMinutes } from "@/lib/dates";
import { priorityMeta } from "@/lib/priority";
import type { Task, TaskInput } from "@/types/task";
import { useEffect, useState } from "react";
import { createId } from "@/lib/id";
import { readTasks, writeTasks } from "@/lib/task-storage";
import { useToday } from "@/lib/use-today";

export default function TaskPlanner() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [saveFailed, setSaveFailed] = useState(false);
  const today = useToday();
  const todayTasks = tasks.filter((task) => task.date === today);

  useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect -- Load browser storage after mounting.
  setTasks(readTasks());
  }, []);

  /** Keeps the task in memory even if the browser refuses to store it, and says so. */
  function commitTasks(nextTasks: Task[]) {
    setSaveFailed(!writeTasks(nextTasks));
    setTasks(nextTasks);
  }

  function handleAddTask(taskInput: TaskInput) {
    const newTask: Task = {
      ...taskInput,
      id: createId(),
      completed: false,
    };

    commitTasks([...tasks, newTask]);
  }

  function handleToggleTask(taskId: string) {
    const nextTasks = tasks.map((task) =>
    task.id === taskId
      ? { ...task, completed: !task.completed }
      : task,
    );

    commitTasks(nextTasks);
  }

  return (
    <>
      {saveFailed ? (
        <p
          role="alert"
          className="mt-6 rounded-xl border border-danger-ink bg-surface px-4 py-3 text-sm font-medium text-danger-ink"
        >
          Your tasks could not be saved in this browser. They will be lost when
          you close or reload this page.
        </p>
      ) : null}

      <RhythmStrip tasks={todayTasks} />

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-10">
          <TaskForm onAddTask={handleAddTask} />
        </div>

        <section aria-labelledby="tasks-heading">
          <div className="flex items-center gap-3">
            <h2
              id="tasks-heading"
              className="font-display text-lg font-semibold tracking-tight"
            >
              Today&apos;s tasks
            </h2>
            {todayTasks.length > 0 ? (
              <span className="rounded-md bg-surface-2 px-2 py-0.5 text-sm font-medium text-muted">
                {todayTasks.length}
                <span className="sr-only"> tasks</span>
              </span>
            ) : null}
          </div>

          {todayTasks.length === 0 ? (
            <div className="mt-4 rounded-xl border border-dashed border-line-strong bg-surface px-6 py-10 text-center">
              <p className="font-medium">Add a task to plan your day.</p>
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {todayTasks.map((task) => {
                const meta = priorityMeta[task.priority];

                return (
                  <li
                    key={task.id}
                    className="rounded-xl border border-line bg-surface p-4 shadow-card"
                  >
                    <div className="flex items-start gap-3">
                      <label className="flex min-w-0 flex-1 cursor-pointer items-start gap-3">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleToggleTask(task.id)}
                          className="mt-0.5 size-5 shrink-0 cursor-pointer accent-accent"
                        />

                        <span
                          className={`min-w-0 break-words text-base font-medium leading-snug transition-colors duration-150 ${
                            task.completed ? "text-muted line-through" : ""
                          }`}
                        >
                          {task.title}
                        </span>
                      </label>

                      <p className="shrink-0 whitespace-nowrap text-base font-semibold tabular-nums">
                        {formatMinutes(task.estimatedMinutes)}
                      </p>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2 pl-8">
                      <span
                        className={`rounded-md px-2 py-0.5 text-xs font-semibold ${meta.chip}`}
                      >
                        {meta.label}
                        <span className="sr-only"> priority</span>
                      </span>

                      {task.completed ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-surface-2 px-2 py-0.5 text-xs font-semibold text-muted">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="m2.5 6.25 2.25 2.25 4.75-5" />
                          </svg>
                          Done
                        </span>
                      ) : null}
                    </div>
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
