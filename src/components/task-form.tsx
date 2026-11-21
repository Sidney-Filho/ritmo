"use client";
import { useState, type FormEvent } from "react";
import type { TaskInput } from "@/types/task";
type TaskFormProps = {
  onAddTask: (task: TaskInput) => void;
};

export default function TaskForm({ onAddTask }: TaskFormProps) {
    const [message, setMessage] = useState("");

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const title = String(formData.get("title") ?? "").trim();
  const date = String(formData.get("date") ?? "");
  const priority = formData.get("priority");
  const estimatedMinutes = Number(formData.get("estimatedMinutes"));

  if (!title) {
    setMessage("Please enter a task title.");
    return;
  }

  if (!date) {
    setMessage("Please select a date.");
    return;
  }

  if (
    priority !== "low" &&
    priority !== "medium" &&
    priority !== "high"
  ) {
    setMessage("Please select a valid priority.");
    return;
  }

  if (
    !Number.isInteger(estimatedMinutes) ||
    estimatedMinutes < 1 ||
    estimatedMinutes > 1440
  ) {
    setMessage("Enter a duration between 1 and 1440 whole minutes.");
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
  setMessage("Task added successfully.");
}
  const inputClassName =
    "mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

  return (
    <section
      aria-labelledby="task-form-heading"
      className="mt-8 rounded-2xl border border-slate-200 bg-white p-6"
    >
      <h2 id="task-form-heading" className="text-lg font-semibold">
        Create a task
      </h2>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="task-title" className="text-sm font-medium">
            Title
          </label>
          <input
            id="task-title"
            name="title"
            type="text"
            placeholder="e.g. Finish the portfolio homepage"
            required
            maxLength={120}
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="task-date" className="text-sm font-medium">
            Date
          </label>
          <input
            id="task-date"
            name="date"
            type="date"
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="task-priority" className="text-sm font-medium">
            Priority
          </label>
          <select
            id="task-priority"
            name="priority"
            defaultValue="medium"
            className={inputClassName}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label htmlFor="task-duration" className="text-sm font-medium">
            Estimated duration (minutes)
          </label>
          <input
            id="task-duration"
            name="estimatedMinutes"
            type="number"
            min={1}
            max={1440}
            step={1}
            defaultValue={30}
            required
            className={inputClassName}
          />
        </div>

        <div className="sm:col-span-2">
          <div className="sm:col-span-2">
        <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 cursor-pointer"
        >
            Add task
        </button>

            <p role="status" className="mt-2 text-sm text-slate-600">
                {message}
            </p>
        </div>

          <p className="mt-2 text-sm text-slate-500">
            Task creation will be available in the next step.
          </p>
        </div>
      </form>
    </section>
  );
}