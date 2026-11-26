import { describe, expect, it } from "vitest";
import { formatMinutes } from "@/lib/dates";

describe("formatMinutes", () => {
  it.each([
    [0, "0 min"],
    [45, "45 min"],
    [59, "59 min"],
    [60, "1 h"],
    [61, "1 h 1 min"],
    [90, "1 h 30 min"],
    [120, "2 h"],
    [1440, "24 h"],
  ])("formats %d minutes as %s", (minutes, expected) => {
    expect(formatMinutes(minutes)).toBe(expected);
  });
});