"use client";

import { useCallback, useSyncExternalStore } from "react";
import { readStored, writeStored, type StorageKey } from "./index";

/**
 * A shared, subscribable view of one storage slot.
 *
 * `useStoredState` gives each component its own copy of a value, which is
 * correct when a key has a single consumer but wrong the moment several do:
 * a page listing eighteen courses renders eighteen save buttons against one
 * key, and whichever was clicked last would write its stale snapshot over
 * every earlier change.
 *
 * Here there is one source of truth. Every subscriber re-reads on change, so
 * a save made in one card is immediately visible to the header count and to
 * every other card. Cross-tab updates arrive through the `storage` event for
 * free.
 */

const listeners = new Map<string, Set<() => void>>();

/**
 * `useSyncExternalStore` compares snapshots by identity and will loop if a
 * fresh object is returned each call, so parsed values are memoised against
 * the raw string they came from.
 */
const snapshots = new Map<string, { raw: string | null; value: unknown }>();

function rawValue(key: StorageKey): string | null {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function getSnapshot<T>(key: StorageKey, fallback: T): T {
  const raw = rawValue(key);
  const cached = snapshots.get(key);
  if (cached && cached.raw === raw) return cached.value as T;

  const value = readStored<T>(key, fallback);
  snapshots.set(key, { raw, value });
  return value;
}

function subscribe(key: StorageKey, onChange: () => void) {
  let set = listeners.get(key);
  if (!set) {
    set = new Set();
    listeners.set(key, set);
  }
  set.add(onChange);

  // Another tab writing the same key.
  const onStorage = (event: StorageEvent) => {
    if (event.key === key) {
      snapshots.delete(key);
      onChange();
    }
  };
  window.addEventListener("storage", onStorage);

  return () => {
    set?.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function setStored<T>(key: StorageKey, value: T) {
  writeStored(key, value);
  snapshots.delete(key);
  listeners.get(key)?.forEach((listener) => listener());
}

/**
 * `fallback` must be a stable reference — a module-level constant, not a
 * literal created during render — because it is the server snapshot and is
 * compared by identity.
 */
export function useStoredValue<T>(key: StorageKey, fallback: T): T {
  return useSyncExternalStore(
    useCallback((onChange: () => void) => subscribe(key, onChange), [key]),
    useCallback(() => getSnapshot(key, fallback), [key, fallback]),
    useCallback(() => fallback, [fallback]),
  );
}

const EMPTY: readonly string[] = Object.freeze([]);

/** A saved-items list, with the toggle semantics every caller needs. */
export function useStoredList(key: StorageKey) {
  const items = useStoredValue<readonly string[]>(key, EMPTY);

  const toggle = useCallback(
    (id: string) => {
      const next = items.includes(id)
        ? items.filter((item) => item !== id)
        : [...items, id];
      setStored(key, next);
    },
    [key, items],
  );

  const remove = useCallback(
    (id: string) => setStored(key, items.filter((item) => item !== id)),
    [key, items],
  );

  const clear = useCallback(() => setStored(key, []), [key]);

  return { items, toggle, remove, clear, has: (id: string) => items.includes(id) };
}
