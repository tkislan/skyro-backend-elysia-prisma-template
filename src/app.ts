import { Elysia } from "elysia";

export const app = new Elysia().get("/health", () => ({ status: "success", message: "OK" }));
