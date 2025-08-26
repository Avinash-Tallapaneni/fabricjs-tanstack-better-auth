import { defineConfig } from "drizzle-kit";
import { serverEnv } from "@/env/env.server";
import path from "path";

const schemaPath = path.resolve(__dirname, "./src/schemas/index.ts");

export default defineConfig({
  schema: schemaPath,
  out: path.resolve(__dirname, "../../migrations"),
  dialect: "postgresql",
  dbCredentials: {
    url: serverEnv.AUTH_DRIZZLE_URL,
  },
});
