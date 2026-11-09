import axios from "axios";
import { createClient } from "@/app/supabase/supabaseClient";

// Use same-origin proxy route to avoid browser CORS preflight issues.
// next.config.ts rewrites /api/backend/* -> NEXT_PUBLIC_API_BASENAME/*
const baseURL = "/api/backend";

/** Browser-only client: the base URL is relative and the token comes from the browser session. */
export const api = axios.create({
  baseURL,
});

// getSession() refreshes an expired access token before returning it.
api.interceptors.request.use(async (config) => {
  const {
    data: { session },
  } = await createClient().auth.getSession();

  if (session?.access_token) {
    config.headers.set("Authorization", `Bearer ${session.access_token}`);
  }
  return config;
});
