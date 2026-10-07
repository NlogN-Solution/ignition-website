"use client";
import { useSyncExternalStore } from "react";
const subscribe = () => () => {};
const client = () => true;
const server = () => false;
/** Avoid accepting input before React has attached search/navigation handlers. */
export function useHydrated() {
  return useSyncExternalStore(subscribe, client, server);
}
