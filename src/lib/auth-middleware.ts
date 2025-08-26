import { createMiddleware } from "@tanstack/react-start";
import { authClient } from "./auth-client";
import { getHeaders } from "@tanstack/react-start/server";

export const authMiddleware = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const { data: sessionData } = await authClient.getSession({
      fetchOptions: {
        headers: getHeaders() as HeadersInit,
      },
    });

    return await next({
      context: {
        user: sessionData?.user ?? null,
      },
    });
  }
);
