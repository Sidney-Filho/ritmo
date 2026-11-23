"use client";

import { useEffect, useState } from "react";
import { readTasks } from "@/lib/task-storage";
import type { Task } from "@/types/task";
import { formatMinutes } from "@/lib/dates";

import {
  addDays,
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
    <p className="min-h-6 text-base font-medium text-accent-soft-ink">
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
    <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-7">
      {weekdays.map((day, index) => {
        const date = monday ? addDays(monday, index) : null;
        const dateKey = date ? toISODate(date) : null;
        const dayTasks = tasks.filter((task) => task.date === dateKey);
        const plannedMinutes = dayTasks.reduce(
          (total, task) => total + task.estimatedMinutes,
          0,
        );
        const isToday = date !== null && toISODate(date) === today;
        const isWeekend = index >= 5;

        return (
          <section
            key={day}
            aria-label={day}
            aria-current={isToday ? "date" : undefined}
            className={`flex min-h-56 min-w-0 flex-col rounded-3xl border p-4 ${
              isToday
                ? "border-accent bg-accent-soft"
                : isWeekend
                  ? "border-line bg-transparent"
                  : "border-line bg-surface"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <h2
                className={`font-display text-xl font-bold tracking-tight ${
                  isToday ? "text-accent-soft-ink" : ""
                }`}
              >
                {day}
              </h2>
              {isToday ? (
                <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-ink">
                  Todays tasks
                </span>
              ) : null}
            </div>

            <p className="mt-0.5 min-h-5 text-sm text-muted">
              {date ? (
                <time dateTime={toISODate(date)}>{formatShortDate(date)}</time>
              ) : null}
            </p>

            {dayTasks.length === 0 ? (
              <p className="mt-6 flex-1 text-sm text-muted">No tasks planned for this day.</p>
            ) : (
              <ul className="mt-6 flex-1 space-y-2 text-sm">
                {dayTasks.map((task) => (
                  <li key={task.id} className="break-words">
                    {task.title} · {formatMinutes(task.estimatedMinutes)}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4">
              <div
                aria-hidden="true"
                className={`h-1.5 rounded-full ${
                  isToday ? "bg-accent/20" : "bg-surface-2"
                }`}
              />
              <p className="mt-2 text-xs text-muted">{formatMinutes(plannedMinutes)} planned</p>
            </div>
          </section>
        );
      })}
    </div>
  );
}
