export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  date: string;
  priority: TaskPriority;
  estimatedMinutes: number;
  completed: boolean;
};

export type TaskInput = Omit<Task, "id" | "completed">;