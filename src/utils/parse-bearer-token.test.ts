import { describe, expect, test } from "bun:test";
import { parseBearerToken } from "@/utils/parse-bearer-token";

describe("parseBearerToken", () => {
  test("returns the token from a Bearer header", () => {
    expect(parseBearerToken({ authorization: "Bearer abc123" })).toBe("abc123");
  });

  test("accepts the scheme in any case but keeps the token's case", () => {
    expect(parseBearerToken({ authorization: "bearer AbC123" })).toBe("AbC123");
  });

  test("returns null without an Authorization header", () => {
    expect(parseBearerToken({})).toBeNull();
  });

  test("returns null for another scheme", () => {
    expect(parseBearerToken({ authorization: "Basic abc123" })).toBeNull();
  });

  test("returns null when the token is missing", () => {
    expect(parseBearerToken({ authorization: "Bearer " })).toBeNull();
  });
});
