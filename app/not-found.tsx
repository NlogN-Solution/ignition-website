import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { ArrowButton, GhostButton } from "@/components/ui/ArrowButton";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <Container className="py-28 text-center">
          <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-blue-link">
            404
          </p>
          <h1 className="mx-auto mt-4 max-w-[16ch] text-[clamp(2.25rem,4.4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.022em] text-navy">
            That page isn&rsquo;t here<span className="text-orange">.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[48ch] text-[17px] font-medium leading-[1.6] text-muted">
            The link may be out of date. Pick up your journey from wherever you
            left it, or start from the beginning.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <ArrowButton
              href="/start"
              iconSize={18}
              className="h-[52px] gap-[16px] px-7 text-[16px]"
            >
              Your UK journey
            </ArrowButton>
            <GhostButton href="/" className="h-[52px] px-7 text-[16px]">
              Back home
            </GhostButton>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
