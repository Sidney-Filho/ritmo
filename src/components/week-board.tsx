"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readTasks } from "@/lib/task-storage";
import type { Task } from "@/types/task";

import {
  addDays,
  formatMinutes,
  formatShortDate,
  formatWeekRange,
  parseISODate,
  startOfWeek,
  toISODate,
} from "@/lib/dates";
import { useToday } from "@/lib/use-today";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function WeekRange() {
  const today = useToday();

  return (
    <p className="mt-1 min-h-6 text-base text-muted">
      {today ? formatWeekRange(startOfWeek(parseISODate(today))) : null}
    </p>
  );
}

export default function WeekBoard() {
  const today = useToday();
  const monday = today ? startOfWeek(parseISODate(today)) : null;
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Load browser storage after mounting.
    setTasks(readTasks());
  }, []);

  return (
    <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(min(100%,15rem),1fr))] gap-4">
      {weekdays.map((day, index) => {
        const date = monday ? addDays(monday, index) : null;
        const dateKey = date ? toISODate(date) : null;
        const dayTasks = tasks.filter((task) => task.date === dateKey);
        const plannedMinutes = dayTasks.reduce(
          (total, task) => total + task.estimatedMinutes,
          0,
        );
        const isToday = dateKey !== null && dateKey === today;
        const isPast = dateKey !== null && dateKey < today;

        return (
          <section
            key={day}
            aria-label={day}
            aria-current={isToday ? "date" : undefined}
            className={`flex min-h-44 min-w-0 flex-col rounded-xl border bg-surface p-4 shadow-card ${
              isToday ? "border-ring ring-1 ring-ring" : "border-line"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-lg font-semibold tracking-tight">
                {day}
              </h2>
              {isToday ? (
                <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-ink">
                  Today
                </span>
              ) : null}
            </div>

            <p className="min-h-5 text-sm text-muted">
              {date ? (
                <time dateTime={toISODate(date)}>{formatShortDate(date)}</time>
              ) : null}
            </p>

            {dayTasks.length === 0 ? (
            <p className="mt-6 flex-1 text-sm text-muted">No tasks planned.</p>
            ) : (
              <ul className="mt-6 flex-1 space-y-2 text-sm">
                {dayTasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-start justify-between gap-3 py-2 first:pt-0 last:pb-0"
                  >
                    <span
                      className={`min-w-0 break-words ${
                        task.completed ? "text-muted line-through" : ""
                      }`}
                    >
                      {task.completed ? (
                        <>
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
                            className="mr-1.5 inline-block align-baseline"
                          >
                            <path d="m2.5 6.25 2.25 2.25 4.75-5" />
                          </svg>
                          <span className="sr-only">Done: </span>
                        </>
                      ) : null}
                      {task.title}
                    </span>
                    <span className="shrink-0 whitespace-nowrap tabular-nums text-muted">
                      {formatMinutes(task.estimatedMinutes)}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 flex items-baseline justify-between gap-2 border-t border-line pt-3">
              <span className="text-sm text-muted">Planned</span>
              <span className="font-display text-lg font-bold tabular-nums">
                {formatMinutes(plannedMinutes)}
              </span>
            </div>
          </section>
        );
      })}
    </div>
  );
}
