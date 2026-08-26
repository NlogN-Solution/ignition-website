import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { QuizResults } from "@/components/careers/QuizResults";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Your career profile",
    description:
      "Your career profile, the careers that suit it, and the UK degree subjects that lead to each one.",
    path: "/careers/quiz/results",
  }),
  // Personal to one browser, and empty without stored answers.
  robots: { index: false, follow: true },
};

export default function QuizResultsPage() {
  return (
    <>
      <Navbar />
      <main>
        <QuizResults />
      </main>
      <Footer />
    </>
  );
}
