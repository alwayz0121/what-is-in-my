import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "../database.types";

export const browserClient = createBrowserClient<Database>(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export const makeSSRClient = (request: Request) => {
  return {
    client: browserClient,
    headers: new Headers(),
  };
};
