"use client";

type ExtensionResponse = { success: boolean; error?: string };

interface ExternalChromeRuntime {
  sendMessage(
    extensionId: string,
    message: unknown,
    callback: (response: ExtensionResponse | undefined) => void,
  ): void;
  lastError?: { message?: string };
}

declare global {
  interface Window {
    /** Only present when an installed extension lists this origin in `externally_connectable`. */
    chrome?: { runtime?: ExternalChromeRuntime };
  }
}

export class ExtensionNotInstalledError extends Error {
  constructor() {
    super("The Designspo extension is not installed in this browser");
    this.name = "ExtensionNotInstalledError";
  }
}

export const EXTENSION_ID = process.env.NEXT_PUBLIC_EXTENSION_ID ?? "";

function getRuntime(): ExternalChromeRuntime | null {
  if (typeof window === "undefined") return null;
  return window.chrome?.runtime?.sendMessage ? window.chrome.runtime : null;
}

export function isExtensionReachable(): boolean {
  return !!EXTENSION_ID && !!getRuntime();
}

/** Sends a message to the Designspo extension's `onMessageExternal` handler. */
export function sendToExtension(message: {
  action: "connect" | "sign_out";
  token_hash?: string;
}): Promise<void> {
  const runtime = getRuntime();
  if (!EXTENSION_ID || !runtime) {
    return Promise.reject(new ExtensionNotInstalledError());
  }

  return new Promise((resolve, reject) => {
    runtime.sendMessage(EXTENSION_ID, message, (response) => {
      // Set when no extension with this ID is listening.
      if (runtime.lastError) {
        reject(new ExtensionNotInstalledError());
        return;
      }
      if (!response?.success) {
        reject(new Error(response?.error || "The extension rejected the request"));
        return;
      }
      resolve();
    });
  });
}
