import { createBrowserClient } from "@supabase/ssr";

export const browserClient = createBrowserClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export const makeSSRClient = (request: Request) => {
  return {
    client: browserClient,
    headers: new Headers(),
  };
};
