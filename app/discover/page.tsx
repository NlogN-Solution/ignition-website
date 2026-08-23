import { Navbar } from "@/components/Navbar";
import { DiscoverQuiz } from "@/components/DiscoverQuiz";

export const metadata = { title: "Let's discover where you belong — Ignition" };

export default function DiscoverPage() {
  return (
    <>
      <Navbar />
      <main>
        <DiscoverQuiz />
      </main>
    </>
  );
}
