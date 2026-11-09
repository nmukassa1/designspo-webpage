"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Spinner from "@/components/Spinner";
import { requestExtensionToken } from "@/domains/extension/api";
import {
  ExtensionNotInstalledError,
  isExtensionReachable,
  sendToExtension,
} from "@/domains/extension/bridge";

type Status =
  | { kind: "connecting" }
  | { kind: "connected" }
  | { kind: "not-installed" }
  | { kind: "error"; message: string };

export default function ExtensionConnectClient({
  email,
}: {
  email: string | null;
}) {
  const [status, setStatus] = useState<Status>({ kind: "connecting" });
  const started = useRef(false);

  const connect = useCallback(async () => {
    setStatus({ kind: "connecting" });
    if (!isExtensionReachable()) {
      setStatus({ kind: "not-installed" });
      return;
    }
    try {
      const tokenHash = await requestExtensionToken();
      await sendToExtension({ action: "connect", token_hash: tokenHash });
      setStatus({ kind: "connected" });
    } catch (error) {
      if (error instanceof ExtensionNotInstalledError) {
        setStatus({ kind: "not-installed" });
        return;
      }
      console.error("Extension connect failed:", error);
      setStatus({
        kind: "error",
        message: "We couldn't connect the extension. Please try again.",
      });
    }
  }, []);

  // The token hash is single-use, so avoid a second request from Strict Mode's double effect.
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    connect();
  }, [connect]);

  return (
    <div className="px-4 py-8 md:px-6">
      <div className="mx-auto mt-10 flex w-full max-w-xl flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 text-center md:p-8">
        <h1 className="text-3xl font-semibold text-balance">
          Connect the Designspo extension
        </h1>

        {status.kind === "connecting" && (
          <>
            <p className="text-muted-foreground">Connecting your extension…</p>
            <Spinner />
          </>
        )}

        {status.kind === "connected" && (
          <p className="text-muted-foreground">
            Connected{email ? ` as ${email}` : ""}. Click the Designspo icon in
            your browser toolbar to start saving inspiration. You can close this
            tab.
          </p>
        )}

        {status.kind === "not-installed" && (
          <p className="text-muted-foreground">
            The Designspo extension isn&apos;t installed in this browser. Install
            it, then try again.
          </p>
        )}

        {status.kind === "error" && (
          <p className="text-sm text-red-500">{status.message}</p>
        )}

        {(status.kind === "error" || status.kind === "not-installed") && (
          <button
            type="button"
            onClick={connect}
            className="rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-all duration-200 hover:opacity-90 hover:shadow-lg"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
