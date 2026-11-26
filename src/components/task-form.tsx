"use client";

import { useState, type FormEvent } from "react";
import { priorityMeta, priorityOrder } from "@/lib/priority";
import { MAX_TASK_MINUTES, MIN_TASK_MINUTES } from "@/lib/task-limits";
import type { TaskInput } from "@/types/task";

type TaskFormProps = {
  onAddTask: (task: TaskInput) => void;
};

type Feedback = {
  tone: "error" | "success";
  text: string;
};

const inputClassName =
  "h-11 w-full rounded-lg border border-control bg-surface px-3 text-base text-ink placeholder:text-muted transition-colors duration-150 hover:border-muted focus-visible:border-ring";

const labelClassName = "block text-sm font-medium";

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const title = String(formData.get("title") ?? "").trim();
    const date = String(formData.get("date") ?? "");
    const priority = formData.get("priority");
    const estimatedMinutes = Number(formData.get("estimatedMinutes"));

    if (!title) {
      setFeedback({ tone: "error", text: "Please enter a task title." });
      return;
    }

    if (!date) {
      setFeedback({ tone: "error", text: "Please select a date." });
      return;
    }

    if (priority !== "low" && priority !== "medium" && priority !== "high") {
      setFeedback({ tone: "error", text: "Please select a valid priority." });
      return;
    }

    if (
      !Number.isInteger(estimatedMinutes) ||
      estimatedMinutes < MIN_TASK_MINUTES ||
      estimatedMinutes > MAX_TASK_MINUTES
    ) {
      setFeedback({
        tone: "error",
        text: `Enter a duration between ${MIN_TASK_MINUTES} and ${MAX_TASK_MINUTES} whole minutes.`,
      });
      return;
    }

    const taskInput: TaskInput = {
      title,
      date,
      priority,
      estimatedMinutes,
    };

    onAddTask(taskInput);
    form.reset();
    setFeedback({ tone: "success", text: "Task added successfully." });
  }

  return (
    <section
      aria-labelledby="task-form-heading"
      className="rounded-xl border border-line bg-surface p-5 shadow-card sm:p-6"
    >
      <h2
        id="task-form-heading"
        className="font-display text-lg font-semibold tracking-tight"
      >
        New task
      </h2>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-5">
        <div>
          <label htmlFor="task-title" className={labelClassName}>
            Title
          </label>
          <input
            id="task-title"
            name="title"
            type="text"
            placeholder="e.g. Finish the portfolio homepage"
            required
            maxLength={120}
            className={`${inputClassName} mt-2`}
          />
        </div>

        <fieldset>
          <legend className={labelClassName}>Priority</legend>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {priorityOrder
              .slice()
              .reverse()
              .map((priority) => {
                const meta = priorityMeta[priority];

                return (
                  <label key={priority} className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="priority"
                      value={priority}
                      defaultChecked={priority === "medium"}
                      className="peer sr-only"
                    />
                    <span className="flex h-11 items-center justify-center rounded-lg border border-control bg-surface text-sm font-medium transition-colors duration-150 hover:bg-surface-2 peer-checked:border-ring peer-checked:bg-accent-soft peer-checked:font-semibold peer-checked:text-accent-soft-ink peer-checked:ring-1 peer-checked:ring-ring peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring">
                      {meta.label}
                    </span>
                  </label>
                );
              })}
          </div>
        </fieldset>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-4">
          <div>
            <label htmlFor="task-date" className={labelClassName}>
              Date
            </label>
            <input
              id="task-date"
              name="date"
              type="date"
              required
              className={`${inputClassName} mt-2`}
            />
          </div>

          <div>
            <label htmlFor="task-duration" className={labelClassName}>
              Duration
            </label>
            <div className="relative mt-2">
              <input
                id="task-duration"
                name="estimatedMinutes"
                type="number"
                min={MIN_TASK_MINUTES}
                max={MAX_TASK_MINUTES}
                step={1}
                defaultValue={30}
                required
                className={`${inputClassName} pr-12`}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-sm text-muted"
              >
                min
              </span>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-4 font-semibold text-accent-ink transition-colors duration-150 hover:bg-accent-hover"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M10 4v12M4 10h12" />
            </svg>
            Add task
          </button>

          <p
            role="status"
            className={`mt-3 min-h-5 text-sm ${
              feedback?.tone === "error"
                ? "text-danger-ink"
                : "text-success-ink"
            }`}
          >
            {feedback?.text}
          </p>
        </div>
      </form>
    </section>
  );
}
