import { Navbar } from "@/components/Navbar";
import { MatchResult } from "@/components/MatchResult";

export const metadata = { title: "Germany looks like your strongest match — Ignition" };

export default function MatchPage() {
  return (
    <>
      <Navbar />
      <main>
        <MatchResult />
      </main>
    </>
  );
}
