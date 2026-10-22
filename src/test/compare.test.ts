import { describe, expect, it } from "vitest";
import { toggleCompare, canCompare } from "@/lib/compare";

describe("compare selection", () => {
  it("allows at most 3 items", () => {
    expect(toggleCompare(["a", "b", "c"], "d")).toEqual(["a", "b", "c"]);
  });
  it("needs at least 2 items to compare", () => {
    expect(canCompare(["a"])).toBe(false);
    expect(canCompare(["a", "b"])).toBe(true);
  });
});
