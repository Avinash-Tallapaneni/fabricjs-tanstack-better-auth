import { clientEnv } from "@/env/env.client";
import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";

// https://www.better-auth.com/docs/installation#create-client-instance
// if backend is on a diff domain then change the baseUrl to that. since this is a tanstack same origin

export const authClient = createAuthClient({
  baseURL: clientEnv.VITE_BASE_URL,
  fetchOptions: {
    onError(e) {
      if (e.error.status === 429) {
        toast.error("Too many requests. Please try again later.");
      }
    },
  },
});
