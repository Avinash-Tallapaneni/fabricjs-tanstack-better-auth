import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schemas";
import { env } from "@/env";

const sql = neon(env.AUTH_DRIZZLE_URL);
export const db = drizzle(sql, { schema });
