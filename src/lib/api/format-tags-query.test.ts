import { describe, expect, it } from "vitest";
import { formatTagsQuery } from "./format-tags-query";

describe("formatTagsQuery", () => {
  it("returns empty string for null", () => {
    expect(formatTagsQuery(null)).toBe("");
  });

  it("formats a single string tag", () => {
    expect(formatTagsQuery("ui")).toBe("tag=ui");
  });

  it("joins multiple tags", () => {
    expect(formatTagsQuery(["ui", "brand"])).toBe("tag=ui&tag=brand");
  });
});
