import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import dotenv from "dotenv";

dotenv.config();

//https://env.t3.gg/docs/core

export const serverEnv = createEnv({
  server: {
    BETTER_AUTH_SECRET: z.string().min(32),
    BASE_URL: z.string(),
    AUTH_DRIZZLE_URL: z.string(),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
  },
  runtimeEnv: process.env,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
