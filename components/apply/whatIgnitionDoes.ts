/**
 * What applying through Ignition actually gets a student.
 *
 * Every line here maps to something that exists in the portal today — a
 * screen, an endpoint and a staff-side counterpart in the admin console. This
 * list is the one place the promise is written down, so a claim cannot drift
 * into marketing copy on one page and be absent from the product on another.
 *
 * If a capability is removed from the portal, delete its line here. Do not
 * add a line for something a student cannot yet do.
 */
export const whatIgnitionDoes = [
  {
    title: "A guided application profile",
    body: "Your personal, academic and English details in one place, filled in once and reused for every application.",
  },
  {
    title: "A document checklist that is actually checked",
    body: "You are told which documents each application needs. You upload them, and an Ignition advisor reviews each one and tells you if something has to be replaced.",
  },
  {
    title: "An advisor you can message",
    body: "Questions go to a real person on the Ignition team, in the portal, with the whole thread kept alongside your application.",
  },
  {
    title: "Application tracking end to end",
    body: "Every status change is recorded and dated, from documents required through to the university's decision.",
  },
  {
    title: "Interview practice",
    body: "Work through the questions courses actually ask, and keep your answers to come back to.",
  },
  {
    title: "Visa and pre-departure",
    body: "Once you have an offer, the same dashboard carries you through CAS, the visa application and the checklist for arriving in the UK.",
  },
] as const;
