const apiBaseName = (process.env.NEXT_PUBLIC_API_BASENAME ?? "")
  .trim()
  .replace(/\/$/, "");

/**
 * Server-only: called from the `deleteAccount` server action with the session's
 * own credentials. Uses the backend's absolute URL because the browser proxy
 * (`/api/backend`) is relative.
 */
export async function deleteAccountRequest(userId: string, accessToken: string) {
  const response = await fetch(
    `${apiBaseName}/auth/delete-account/${encodeURIComponent(userId)}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error || `Account deletion failed (${response.status})`);
  }
}
