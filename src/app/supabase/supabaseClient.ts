import { createBrowserClient } from "@supabase/ssr";

/** Browser Supabase client — session lives in cookies managed by @supabase/ssr */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
  );
}
