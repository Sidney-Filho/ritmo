import type { TaskPriority } from "@/types/task";

type PriorityMeta = {
  label: string;
  /** Solid fill, used for bars and dots. */
  bar: string;
  /** Soft tinted chip. */
  chip: string;
  /** Selected state for the priority picker in the form. */
  selected: string;
};

export const priorityOrder: TaskPriority[] = ["high", "medium", "low"];

export const priorityMeta: Record<TaskPriority, PriorityMeta> = {
  high: {
    label: "High",
    bar: "bg-p-high",
    chip: "bg-p-high-soft text-p-high-ink",
    selected:
      "peer-checked:border-p-high peer-checked:bg-p-high-soft peer-checked:text-p-high-ink",
  },
  medium: {
    label: "Medium",
    bar: "bg-p-medium",
    chip: "bg-p-medium-soft text-p-medium-ink",
    selected:
      "peer-checked:border-p-medium peer-checked:bg-p-medium-soft peer-checked:text-p-medium-ink",
  },
  low: {
    label: "Low",
    bar: "bg-p-low",
    chip: "bg-p-low-soft text-p-low-ink",
    selected:
      "peer-checked:border-p-low peer-checked:bg-p-low-soft peer-checked:text-p-low-ink",
  },
};
