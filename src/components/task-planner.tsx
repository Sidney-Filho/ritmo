"use client";

import { useState } from "react";
import TaskForm from "@/components/task-form";
import type { Task, TaskInput } from "@/types/task";

export default function TaskPlanner() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(taskInput: TaskInput) {
    const newTask: Task = {
      ...taskInput,
      id: crypto.randomUUID(),
      completed: false,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  }

  return (
    <>
      <TaskForm onAddTask={handleAddTask} />

      <section
        aria-labelledby="tasks-heading"
        className="mt-8 rounded-2xl border border-slate-200 bg-white p-6"
      >
        <h2 id="tasks-heading" className="text-lg font-semibold">
          Your tasks
        </h2>

        {tasks.length === 0 ? (
          <p className="mt-2 text-slate-500">
            No tasks added yet.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="rounded-lg border border-slate-200 p-4"
              >
                <h3 className="break-words font-medium">
                  {task.title}
                </h3>

                <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-600">
                  <span>Date: {task.date}</span>
                  <span className="capitalize">
                    Priority: {task.priority}
                  </span>
                  <span>{task.estimatedMinutes} min</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}