import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

//https://env.t3.gg/docs/core

export const clientEnv = createEnv({
  clientPrefix: "PUBLIC_BASE_URL",
  client: {
    PUBLIC_BASE_URL: z.url().default("http://localhost:3000"),
  },
  runtimeEnv: import.meta.env,
});
