import { describe, expect, it } from "vitest";
import { isTask, parseTasks } from "@/lib/task-storage";

const validTask = {
  id: "a1",
  title: "Write the brief",
  date: "2026-11-26",
  priority: "high",
  estimatedMinutes: 30,
  completed: false,
};

describe("isTask", () => {
  it("accepts a well-formed task", () => {
    expect(isTask(validTask)).toBe(true);
  });

  it.each([
    ["null", null],
    ["a number", 42],
    ["a string", "task"],
    ["an array", [validTask]],
    ["a missing id", { ...validTask, id: undefined }],
    ["an empty id", { ...validTask, id: "" }],
    ["a blank title", { ...validTask, title: "   " }],
    ["an unknown priority", { ...validTask, priority: "urgent" }],
    ["minutes as a string", { ...validTask, estimatedMinutes: "30" }],
    ["zero minutes", { ...validTask, estimatedMinutes: 0 }],
    ["more than a day", { ...validTask, estimatedMinutes: 1441 }],
    ["fractional minutes", { ...validTask, estimatedMinutes: 1.5 }],
    ["NaN minutes", { ...validTask, estimatedMinutes: Number.NaN }],
    ["a non-ISO date", { ...validTask, date: "26/11/2026" }],
    ["a date without padding", { ...validTask, date: "2026-2-3" }],
    ["a date that does not exist", { ...validTask, date: "2026-02-30" }],
    ["completed as a string", { ...validTask, completed: "false" }],
  ])("rejects %s", (_label, value) => {
    expect(isTask(value)).toBe(false);
  });
});

describe("parseTasks", () => {
  it("returns an empty list when nothing is stored", () => {
    expect(parseTasks(null)).toEqual([]);
  });

  it("returns an empty list for invalid JSON", () => {
    expect(parseTasks("{not json")).toEqual([]);
  });

  it("returns an empty list when the stored value is not an array", () => {
    expect(parseTasks(JSON.stringify({ foo: 1 }))).toEqual([]);
  });

  it("keeps valid tasks in their original order", () => {
    const second = { ...validTask, id: "b2", title: "Second" };

    expect(parseTasks(JSON.stringify([validTask, second]))).toEqual([
      validTask,
      second,
    ]);
  });

  it("drops invalid items but keeps the valid ones", () => {
    const raw = JSON.stringify([
      null,
      { ...validTask, id: "bad-priority", priority: "urgent" },
      validTask,
      { ...validTask, id: "bad-minutes", estimatedMinutes: "30" },
    ]);

    expect(parseTasks(raw)).toEqual([validTask]);
  });

  it("keeps only the first task when ids repeat", () => {
    const duplicate = { ...validTask, title: "Same id, other title" };

    expect(parseTasks(JSON.stringify([validTask, duplicate]))).toEqual([
      validTask,
    ]);
  });
});
