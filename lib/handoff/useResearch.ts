"use client";

import { useMemo } from "react";
import { careers } from "@/data/careers";
import { matchCareers } from "@/lib/quiz/scoring";
import type { Profile } from "@/lib/quiz/types";
import { storageKeys } from "@/lib/storage";
import { useStoredValue } from "@/lib/storage/store";
import { buildHandoff, hasResearch, type ResearchDraft, type ResearchHandoff } from "./payload";

/**
 * Gathers everything the student has done anonymously into one object.
 *
 * Reads only — nothing here mutates storage. The same hook backs the CTA
 * buttons and the summary shown on the conversion block, so the two always
 * agree about what is being carried across.
 *
 * Saving is gone from the public site, so what travels now is the quiz
 * result, where the student said they were on /start, anything they put side
 * by side on /compare, and whatever they modelled on the cost calculator.
 */

const EMPTY: readonly string[] = Object.freeze([]);

type CostEstimate = {
  city: string;
  tuition: number;
  accommodation: number;
  food: number;
  transport: number;
  other: number;
};

export type Research = {
  draft: ResearchDraft;
  /** Null when there is nothing worth carrying, so callers can link plainly. */
  handoff: ResearchHandoff | null;
  /** Universities put side by side on /compare. */
  comparedCount: number;
  hasAnything: boolean;
};

export function useResearch(): Research {
  const compared = useStoredValue<readonly string[]>(storageKeys.compareSelection, EMPTY);
  const stage = useStoredValue<string | null>(storageKeys.journeyStage, null);
  const profile = useStoredValue<Profile | null>(storageKeys.quizProfile, null);
  const estimate = useStoredValue<CostEstimate | null>(storageKeys.costEstimate, null);

  return useMemo(() => {
    // The same ranking the results screen showed them, recomputed from the
    // stored profile rather than stored separately — one source of truth for
    // "your top career", so the two screens can never disagree.
    const matches = profile ? matchCareers(profile, careers) : [];
    const [top, ...rest] = matches;

    const draft: ResearchDraft = {
      stage: stage ?? undefined,
      career: top
        ? { id: top.career.id, title: top.career.title, match: top.score }
        : undefined,
      alsoMatched: rest
        .slice(0, 3)
        .map((m) => ({ id: m.career.id, title: m.career.title, match: m.score })),
      compared: [...compared],
      // Only carried once the student has actually opened the calculator —
      // the default preset is not a statement of their budget.
      budget: estimate
        ? {
            annualTuition: estimate.tuition,
            monthlyLiving:
              estimate.accommodation + estimate.food + estimate.transport + estimate.other,
            currency: "GBP" as const,
          }
        : undefined,
    };

    const anything = hasResearch(draft);

    return {
      draft,
      handoff: anything ? buildHandoff(draft) : null,
      comparedCount: draft.compared.length,
      hasAnything: anything,
    };
  }, [compared, stage, profile, estimate]);
}
