import { Navbar } from "@/components/layout/Navbar";
import { CareerQuiz } from "@/components/careers/CareerQuiz";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Career quiz",
  description:
    "An eight-step quiz across personality, interests, ways of working, values and subjects — building a career profile and the UK degrees that lead there.",
  path: "/careers/quiz",
});

export default function CareerQuizPage() {
  return (
    <>
      <Navbar />
      <main>
        <CareerQuiz />
      </main>
    </>
  );
}
