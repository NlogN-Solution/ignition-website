"use client";

import { useEffect, useState } from "react";
import { readStored, writeStored, type StorageKey } from "./index";

/**
 * State that survives a reload. The first render always uses `fallback` so
 * server and client markup agree; the stored value is adopted in an effect
 * immediately afterwards. `ready` reports when that read has happened, so
 * callers can hold off on decisions such as showing an empty state.
 *
 * The write is gated on `ready` as *state*, deliberately not a ref. React
 * StrictMode invokes effects twice on mount, and a ref set during the first
 * pass is already flipped when the second pass runs — which would write the
 * un-hydrated fallback straight over the stored value. `ready` is captured
 * per render, so it stays false for every effect invocation in the mount
 * pass and only turns true once the read has actually been committed.
 */
export function useStoredState<T>(key: StorageKey, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setValue(readStored<T>(key, fallback));
    setReady(true);
    // The key identifies the slot; re-reading whenever `fallback` changes
    // identity would overwrite the user's edits with the initial value.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!ready) return;
    writeStored(key, value);
  }, [key, value, ready]);

  return [value, setValue, ready] as const;
}
