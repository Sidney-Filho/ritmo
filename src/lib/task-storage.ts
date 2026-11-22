import type { Task } from "@/types/task";

const STORAGE_KEY = "ritmo:tasks";

export function readTasks(): Task[] {
  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (stored === null) return [];

  try {
    const parsed: unknown = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeTasks(tasks: Task[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}