import type { TaskPriority } from "@/types/task";

type PriorityMeta = {
  label: string;
  /** Small tinted tag. Priority colour is only used for these tags. */
  chip: string;
};

export const priorityOrder: TaskPriority[] = ["high", "medium", "low"];

export const priorityMeta: Record<TaskPriority, PriorityMeta> = {
  high: {
    label: "High",
    chip: "bg-p-high-soft text-p-high-ink",
  },
  medium: {
    label: "Medium",
    chip: "bg-p-medium-soft text-p-medium-ink",
  },
  low: {
    label: "Low",
    chip: "bg-p-low-soft text-p-low-ink",
  },
};
