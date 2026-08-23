import { Navbar } from "@/components/Navbar";
import { StartQuestion } from "@/components/StartQuestion";

export const metadata = { title: "Where are you today? — Ignition" };

export default function StartPage() {
  return (
    <>
      <Navbar dimmed />
      <main>
        <StartQuestion />
      </main>
    </>
  );
}
