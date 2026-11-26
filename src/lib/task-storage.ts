import { parseISODate, toISODate } from "@/lib/dates";
import { MAX_TASK_MINUTES, MIN_TASK_MINUTES } from "@/lib/task-limits";
import type { Task, TaskPriority } from "@/types/task";

const STORAGE_KEY = "ritmo:tasks";

const priorities: readonly string[] = [
  "low",
  "medium",
  "high",
] satisfies TaskPriority[];

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** "2026-02-30" matches the pattern but is not a real date, so round-trip it. */
function isRealISODate(value: string): boolean {
  return ISO_DATE.test(value) && toISODate(parseISODate(value)) === value;
}

/**
 * Checks that an unknown value has exactly the shape the app relies on.
 * Anything else (hand-edited storage, old formats, corruption) is rejected
 * instead of crashing the UI later.
 */
export function isTask(value: unknown): value is Task {
  if (typeof value !== "object" || value === null) return false;

  const task = value as Record<string, unknown>;

  return (
    typeof task.id === "string" &&
    task.id !== "" &&
    typeof task.title === "string" &&
    task.title.trim() !== "" &&
    typeof task.date === "string" &&
    isRealISODate(task.date) &&
    typeof task.priority === "string" &&
    priorities.includes(task.priority) &&
    typeof task.estimatedMinutes === "number" &&
    Number.isInteger(task.estimatedMinutes) &&
    task.estimatedMinutes >= MIN_TASK_MINUTES &&
    task.estimatedMinutes <= MAX_TASK_MINUTES &&
    typeof task.completed === "boolean"
  );
}

/**
 * Turns the raw stored string into a list of valid tasks.
 * Invalid items are dropped, and so are repeated ids (the first one wins),
 * because the UI uses the id as a key and to toggle a single task.
 */
export function parseTasks(raw: string | null): Task[] {
  if (raw === null) return [];

  try {
    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    const seenIds = new Set<string>();

    return parsed.filter((item): item is Task => {
      if (!isTask(item) || seenIds.has(item.id)) return false;

      seenIds.add(item.id);
      return true;
    });
  } catch {
    return [];
  }
}

export function readTasks(): Task[] {
  try {
    return parseTasks(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    // Storage can be blocked (privacy settings); behave as if it were empty.
    return [];
  }
}

/** Returns false when the browser refused the write (quota, private mode). */
export function writeTasks(tasks: Task[]): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return true;
  } catch {
    return false;
  }
}
