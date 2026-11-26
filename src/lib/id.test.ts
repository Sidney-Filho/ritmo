import { afterEach, describe, expect, it, vi } from "vitest";
import { createId } from "@/lib/id";

const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("createId", () => {
  it("uses crypto.randomUUID when it is available", () => {
    vi.stubGlobal("crypto", { randomUUID: () => "from-random-uuid" });

    expect(createId()).toBe("from-random-uuid");
  });

  it("builds a v4 UUID from getRandomValues in insecure contexts", () => {
    // Insecure contexts expose getRandomValues but not randomUUID.
    vi.stubGlobal("crypto", {
      getRandomValues: (bytes: Uint8Array) => {
        bytes.fill(0xff);
        return bytes;
      },
    });

    expect(createId()).toMatch(UUID_V4);
  });

  it("still returns unique v4 UUIDs when crypto is missing entirely", () => {
    vi.stubGlobal("crypto", undefined);

    const ids = Array.from({ length: 500 }, () => createId());

    expect(ids.every((id) => UUID_V4.test(id))).toBe(true);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
