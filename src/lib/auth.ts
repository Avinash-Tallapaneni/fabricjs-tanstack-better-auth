import { db } from "@/db/src";
import {} from "@/db/src/schemas";
import { clientEnv } from "@/env/env.client";
import { serverEnv } from "@/env/env.server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { reactStartCookies } from "better-auth/react-start";

// https://www.better-auth.com/docs/installation#create-client-instance

export const auth = betterAuth({
  baseURL: clientEnv.VITE_BASE_URL,
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),

  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: serverEnv.GOOGLE_CLIENT_ID,
      clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 24 * 60,
    },
  },

  //https://www.better-auth.com/docs/integrations/tanstack#usage-tips

  plugins: [reactStartCookies()], // make sure this is the last plugin in the array
});
