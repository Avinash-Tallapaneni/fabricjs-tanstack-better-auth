import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

console.log("env client loaded", import.meta.env.VITE_BASE_URL);

//https://env.t3.gg/docs/core

export const clientEnv = createEnv({
  clientPrefix: "VITE_BASE_URL",
  client: {
    VITE_BASE_URL: z.url(),
  },
  runtimeEnv: import.meta.env,
});
