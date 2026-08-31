/**
 * Where the two halves of Ignition live.
 *
 * The public platform and the student portal are separate deployments, so
 * every link between them is an absolute URL rather than a route. Both are
 * overridable per environment: `next dev` on this machine talks to the CRA
 * portal on :3000, production points at the hosted dashboard.
 */

const trimSlash = (url: string) => url.replace(/\/+$/, "");

export const portalUrl = trimSlash(
  process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://ignition-studentdashboard.onrender.com",
);

/**
 * The Ignition API, which serves the catalogue and every word of editorial
 * copy on this site.
 *
 * `NEXT_PUBLIC_` because the value is baked into the build: reads happen at
 * build and revalidation time from the server, but the variable has to be
 * readable wherever a module that calls the API is imported. It carries no
 * secret — everything under `/public` is unauthenticated by design.
 */
export const apiBaseUrl = trimSlash(
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8001/api/v1",
);

export const portalRoutes = {
  login: `${portalUrl}/login`,
  register: `${portalUrl}/registration`,
  dashboard: `${portalUrl}/`,
  applications: `${portalUrl}/applications`,
} as const;

/**
 * Name of the hint cookie the portal sets on login and clears on logout.
 *
 * It carries no identity and grants nothing — it exists only so the public
 * site can say "Dashboard" instead of "Login". Real authorisation is the
 * portal's JWT, checked server-side; this is chrome.
 *
 * Cookies are shared across ports on the same host, so this works in
 * development (both halves on `localhost`) and in any production setup where
 * the two are subdomains of one registrable domain. It does NOT cross two
 * unrelated hosts — with the landing site and the dashboard on separate
 * `onrender.com` subdomains the cookie cannot be shared, because
 * `onrender.com` is a public suffix. The nav then simply keeps showing
 * "Login", which is the correct degraded state rather than a broken one.
 */
export const sessionHintCookie = "ignition_session";

/**
 * How a student reaches a human.
 *
 * Both numbers are configured per environment because they differ by office
 * and because a placeholder number reaching a real person is worse than no
 * number at all. `whatsapp` is digits only with the country code and no
 * leading `+` — that is the form wa.me requires; `phone` keeps the `+` so
 * `tel:` dials correctly from every country.
 */
export const contact = {
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+442080000000",
  whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP ?? "442080000000",
  /** Shown next to the number so a student knows when calling is pointless. */
  hours: process.env.NEXT_PUBLIC_CONTACT_HOURS ?? "Mon–Fri, 9am–6pm UK time",
} as const;

/**
 * The message a student's WhatsApp opens pre-filled.
 *
 * Pre-filling is the whole point of the widget: a blank thread asks the
 * student to compose an opening line, which is exactly the friction that stops
 * them writing at all. `context` is the page they were on, so the adviser
 * picking it up knows whether they were reading about visas or comparing
 * courses before the first reply is typed.
 */
export function whatsappMessage(context?: string) {
  const base = "Hi Ignition, I'd like some help with studying in the UK.";
  return context ? `${base} (I was reading: ${context})` : base;
}

export function whatsappUrl(context?: string) {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(whatsappMessage(context))}`;
}

export const telUrl = `tel:${contact.phone.replace(/[^\d+]/g, "")}`;
