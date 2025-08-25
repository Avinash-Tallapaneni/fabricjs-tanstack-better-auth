import { defineConfig } from "drizzle-kit";
import { env } from "@/env";

export default defineConfig({
  schema: "./src/schemas/index.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.AUTH_DRIZZLE_URL,
  },
});
