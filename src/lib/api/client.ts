import axios from "axios";

const baseURL = (process.env.NEXT_PUBLIC_API_BASENAME ?? "").trim();

export const api = axios.create({
  baseURL: baseURL || undefined,
});
