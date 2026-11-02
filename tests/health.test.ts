import { describe, expect, test } from "bun:test";
import { app } from "@/app";

describe("GET /health", () => {
  test("returns 200 with status success", async () => {
    const response = await app.handle(new Request("http://localhost/health"));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ status: "success", message: "OK" });
  });
});
