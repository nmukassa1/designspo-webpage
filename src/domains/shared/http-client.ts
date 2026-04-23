import axios from "axios";

// Use same-origin proxy route to avoid browser CORS preflight issues.
// next.config.ts rewrites /api/backend/* -> NEXT_PUBLIC_API_BASENAME/*
const baseURL = "/api/backend";

export const api = axios.create({
  baseURL,
});

