import "dotenv/config";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { createCorsair } from "corsair";
import { gmail } from "@corsair-dev/gmail";
import { googlecalendar } from "@corsair-dev/googlecalendar";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool);

export const corsair = createCorsair({
  plugins: [
    gmail({
      authType: "oauth_2",
    }),
    googlecalendar({
      authType: "oauth_2",
    }),
  ],
  database: pool,
  kek: process.env.CORSAIR_KEK!,
  multiTenancy: true,
});
