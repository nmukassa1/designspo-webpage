import { api } from "@/domains/shared/http-client";

/** One-time magic-link token hash the extension exchanges for its own session. */
export async function requestExtensionToken(): Promise<string> {
  const response = await api.post<{ token_hash: string }>("/auth/extension-token");
  return response.data.token_hash;
}
