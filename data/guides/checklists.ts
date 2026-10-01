import { applicationChecklist } from "./apply";
import { requirementsChecklist } from "./entry-requirements";
import { visaDocuments } from "./visa";
import { arrivalChecklist, firstWeekChecklist } from "./life-in-uk";

/**
 * Every checklist on the site, in journey order. Progress tracking reads this
 * rather than hard-coding ids and totals, so adding a checklist to a guide
 * automatically adds it to the student's progress view.
 */
export const checklistRegistry = [
  { id: "entry-requirements", label: "Check entry requirements", href: "/apply/entry-requirements", total: requirementsChecklist.length },
  { id: "apply", label: "Apply to your courses", href: "/apply", total: applicationChecklist.length },
  { id: "visa-documents", label: "Gather visa documents", href: "/apply/entry-requirements#visa-journey", total: visaDocuments.length },
  { id: "arrival", label: "Prepare to travel", href: "/life-in-uk", total: arrivalChecklist.length },
  { id: "first-week", label: "Your first week", href: "/life-in-uk", total: firstWeekChecklist.length },
] as const;
