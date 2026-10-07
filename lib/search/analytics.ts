"use client";
import { sendGAEvent } from "@next/third-parties/google";

type SearchEvent = "hero_search_focus" | "hero_search_query" | "hero_search_suggestion_clicked" | "hero_search_popular_clicked" | "search_filter_changed";
export function trackSearch(event: SearchEvent, properties: Record<string, string | number | boolean> = {}) {
  if (process.env.NODE_ENV !== "production") return;
  try { sendGAEvent("event", event, properties); } catch { /* Analytics never blocks navigation. */ }
}
