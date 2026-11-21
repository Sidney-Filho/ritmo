"use client";

import { useState, type FormEvent } from "react";
import { priorityMeta, priorityOrder } from "@/lib/priority";
import type { TaskInput } from "@/types/task";

type TaskFormProps = {
  onAddTask: (task: TaskInput) => void;
};

type Feedback = {
  tone: "error" | "success";
  text: string;
};

const inputClassName =
  "w-full rounded-xl border border-line bg-surface-2 px-3.5 py-2.5 text-ink placeholder:text-muted/70 transition-colors hover:border-line-strong focus-visible:border-accent";

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
      estimatedMinutes < 1 ||
      estimatedMinutes > 1440
    ) {
      setFeedback({
        tone: "error",
        text: "Enter a duration between 1 and 1440 whole minutes.",
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
      className="rounded-3xl border border-line bg-surface p-6 sm:p-7"
    >
      <h2
        id="task-form-heading"
        className="font-display text-2xl font-bold tracking-tight"
      >
        New task
      </h2>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
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
                    <span
                      className={`flex items-center justify-center gap-2 rounded-xl border border-line bg-surface-2 px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:border-line-strong peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent ${meta.selected}`}
                    >
                      <span
                        aria-hidden="true"
                        className={`size-2 rounded-full ${meta.bar}`}
                      />
                      {meta.label}
                    </span>
                  </label>
                );
              })}
          </div>
        </fieldset>

        <div className="grid grid-cols-2 gap-4">
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
                min={1}
                max={1440}
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
            className="w-full cursor-pointer rounded-xl bg-accent px-4 py-3 font-semibold text-accent-ink transition-[filter] hover:brightness-110 active:brightness-95"
          >
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
