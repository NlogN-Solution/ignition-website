"use client";

import { useMemo } from "react";
import { careers } from "@/data/careers";
import { phaseIds, type PhaseId } from "@/data/journey/pipeline";
import { matchCareers } from "@/lib/quiz/scoring";
import { quizQuestions } from "@/data/quiz/questions";
import type { Profile } from "@/lib/quiz/types";
import { storageKeys } from "@/lib/storage";
import { useStoredValue } from "@/lib/storage/store";
import {
  milestonesFor,
  nextActionFor,
  type EligibilityState,
  type Milestone,
  type NextAction,
  type ProgressSignals,
} from "./progress";

/**
 * Reads every mark the student has left on this browser and hands back the
 * ladder plus the recommended action.
 *
 * Reads only — nothing here writes. It is the sibling of `useResearch`, which
 * gathers the same slots for a different purpose: that one builds the payload
 * that crosses to the portal, this one builds what the student sees. They
 * deliberately share no state beyond the storage keys, because the two answer
 * different questions and the day one of them needs a signal the other does
 * not is the day a shared shape becomes a liability.
 *
 * SERVER SNAPSHOT. Every slot resolves to its fallback during SSR and on the
 * first client paint, so the markup the server sends is the cold state and
 * hydration cannot mismatch. A returning student sees the panel fill in a
 * frame later — the same contract `JourneyClose` runs on.
 */

const EMPTY_ANSWERS: Record<string, string[]> = Object.freeze({});

type CostEstimate = {
  city: string;
  tuition: number;
  accommodation: number;
  food: number;
  transport: number;
  other: number;
};

type EligibilityOutcome = { reference: string; at: string };
type StoredContact = { submittedAt?: string };

function isPhaseId(value: string | null): value is PhaseId {
  return value !== null && (phaseIds as readonly string[]).includes(value);
}

export type JourneyProgress = {
  milestones: Milestone[];
  next: NextAction;
  /** How many milestones are behind them, for the "2 of 4" line. */
  done: number;
  total: number;
  /** Questions answered on the career quiz, when it was started and not finished. */
  quizAnswered: number;
  quizTotal: number;
};

export function useJourneyProgress(): JourneyProgress {
  const answers = useStoredValue<Record<string, string[]>>(
    storageKeys.quizAnswers,
    EMPTY_ANSWERS,
  );
  const profile = useStoredValue<Profile | null>(storageKeys.quizProfile, null);
  const phase = useStoredValue<string | null>(storageKeys.journeyStage, null);
  const estimate = useStoredValue<CostEstimate | null>(storageKeys.costEstimate, null);
  const draft = useStoredValue<unknown>(storageKeys.eligibilityDraft, null);
  const outcome = useStoredValue<EligibilityOutcome | null>(
    storageKeys.eligibilityOutcome,
    null,
  );
  const contact = useStoredValue<StoredContact | null>(storageKeys.leadContact, null);

  return useMemo(() => {
    // Recomputed from the stored profile rather than stored separately, so
    // the career named here and the one the results screen showed can never
    // disagree. Same reasoning as `useResearch`.
    const [top] = profile ? matchCareers(profile, careers) : [];

    const quizAnswered = Object.values(answers).filter((given) => given.length > 0).length;

    const eligibility: EligibilityState = outcome
      ? "submitted"
      : draft
        ? "draft"
        : "none";

    const signals: ProgressSignals = {
      quizStarted: quizAnswered > 0,
      career: top ? { title: top.career.title, match: top.score } : null,
      phase: isPhaseId(phase) ? phase : null,
      budget: estimate
        ? {
            annualTuition: estimate.tuition,
            monthlyLiving:
              estimate.accommodation + estimate.food + estimate.transport + estimate.other,
          }
        : null,
      eligibility,
      adviserRequested: Boolean(contact?.submittedAt),
    };

    const milestones = milestonesFor(signals);

    return {
      milestones,
      next: nextActionFor(signals),
      done: milestones.filter((milestone) => milestone.done).length,
      total: milestones.length,
      quizAnswered,
      quizTotal: quizQuestions.length,
    };
  }, [answers, profile, phase, estimate, draft, outcome, contact]);
}
