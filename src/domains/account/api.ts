import { api } from "@/domains/shared/http-client";

export async function deleteAccountRequest(userId: string, accessToken: string) {
  return api.delete(`/auth/delete-account/${userId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

