import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JourneyRoute } from "@/components/journey/JourneyRoute";
import { JourneyCta } from "@/components/journey/JourneyCta";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Your journey to the UK",
  description:
    "The whole route in three chapters — plan and prepare, apply and secure your CAS, then visa and departure. Open any step to see what it actually involves.",
  path: "/start",
});

/**
 * The route, end to end.
 *
 * WHAT THIS REPLACED. `/start` used to ask "where are you today?" and hand
 * back a list of links for the answer. That worked for a student who could
 * already name their stage, and failed for everyone else — which is most
 * people arriving here, because not knowing what the stages *are* is the
 * reason they came. The selector still exists and still does its job on the
 * homepage, where it sits among other ways in; here the page shows the map
 * first and lets the reader place themselves on it.
 *
 * `JourneyRoute` carries the hero as well as the stepper and the panel. That
 * is not an accident of the client boundary — the stepper overlaps the hero
 * photograph and shares its selection with the panel below, so the three are
 * one component. See its header.
 */
export default function StartPage() {
  return (
    <>
      <Navbar />
      <main>
        <JourneyRoute />
      </main>

      <JourneyCta />
      <Footer />
    </>
  );
}
