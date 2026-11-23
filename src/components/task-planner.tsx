"use client";

import RhythmStrip from "@/components/rhythm-strip";
import TaskForm from "@/components/task-form";
import { formatMinutes, formatShortDate, parseISODate } from "@/lib/dates";
import { priorityMeta } from "@/lib/priority";
import type { Task, TaskInput } from "@/types/task";
import { useEffect, useState } from "react";
import { readTasks, writeTasks } from "@/lib/task-storage";
import { useToday } from "@/lib/use-today";

export default function TaskPlanner() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const today = useToday();
  const todayTasks = tasks.filter((task) => task.date === today);

  useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect -- Load browser storage after mounting.
  setTasks(readTasks());
  }, []);

  function handleAddTask(taskInput: TaskInput) {
    const newTask: Task = {
      ...taskInput,
      id: crypto.randomUUID(),
      completed: false,
    };

    const nextTasks = [...tasks, newTask];
    writeTasks(nextTasks);
    setTasks(nextTasks);
  }

  function handleToggleTask(taskId: string) {
    const nextTasks = tasks.map((task) =>
    task.id === taskId
      ? { ...task, completed: !task.completed }
      : task,
    );

    writeTasks(nextTasks);
    setTasks(nextTasks);
  }

  return (
    <>
      <RhythmStrip tasks={todayTasks} />

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
        <TaskForm onAddTask={handleAddTask} />

        <section aria-labelledby="tasks-heading">
          <div className="flex items-center gap-3">
            <h2
              id="tasks-heading"
              className="font-display text-2xl font-bold tracking-tight"
            >
              Todays tasks
            </h2>
            {todayTasks.length > 0 ? (
              <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-sm font-medium text-accent-soft-ink">
                {todayTasks.length}
              </span>
            ) : null}
          </div>

          {todayTasks.length === 0 ? (
            <div className="mt-5 rounded-3xl border border-dashed border-line-strong px-6 py-12 text-center">
              <p className="font-medium">No tasks planned for Today.</p>
              <p className="mx-auto mt-1 max-w-xs text-sm text-muted">
                Add your first task to start shaping the day.
              </p>
            </div>
          ) : (
            <ul className="mt-5 space-y-3">
              {todayTasks.map((task) => {
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
                      <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleTask(task.id)}
                        className="mt-1 size-4 shrink-0 accent-accent cursor-pointer rounded border-line-strong text-accent focus:ring-accent"
                      />

                      <span
                        className={`min-w-0 break-words text-lg font-medium leading-snug ${
                          task.completed ? "text-muted line-through" : ""
                        }`}
                      >
                        {task.title}
                      </span>
                    </label>

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
