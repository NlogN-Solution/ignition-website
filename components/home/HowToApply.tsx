"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";

const steps = [
  { image: "1-explore-courses-universitiespng", label: "Explore courses & universities", title: "Find a course that feels like your future.", description: "Search courses and universities by subject and study level. Start with what interests you, then build a shortlist worth exploring.", phase: "Discover your options" },
  { image: "2-check-your-eligibility.png", label: "Check your eligibility", title: "Know where you stand before you apply.", description: "Enter your qualifications and English test results to check course requirements. Turn an interesting option into an informed next step.", phase: "Discover your options" },
  { image: "3-compare-cost-and-value.png", label: "Compare cost & value", title: "Make your budget part of the plan.", description: "Explore tuition and estimated living costs by city. Compare the full picture so your shortlist makes sense for your goals and your budget.", phase: "Discover your options" },
  { image: "4-Create-your-account1.png", label: "Create your account", title: "Give your plans a place to live.", description: "Create your Ignition account to bring your profile, documents and applications into one place. Your journey now has a home.", phase: "Set yourself up" },
  { image: "5-student-onboarding.png", label: "Meet your dashboard", title: "Get your bearings. See what comes next.", description: "Take a guided introduction to your dashboard. Find your application progress, useful tools and next steps without having to work it all out alone.", phase: "Set yourself up" },
  { image: "6-complete-your-profile.png", label: "Complete your profile", title: "Tell your story once. Build from there.", description: "Add your personal details, education and other required information. Your profile shows what is still missing so you can prepare for your applications.", phase: "Set yourself up" },
  { image: "7-Apply-to-courses.png", label: "Apply to your courses", title: "Turn your shortlist into your next move.", description: "Open your chosen course, review your details and documents, and submit your application. Keep the course and university in view as you apply.", phase: "Move towards your offer" },
  { image: "8-Track-your-applications.png", label: "Track your applications", title: "Less guessing. More knowing where you stand.", description: "Follow each application’s progress and see updates, documents and your counsellor in one view. Know what has happened and what needs your attention.", phase: "Move towards your offer" },
  { image: "9-organize-your-documents.png", label: "Organise your documents", title: "Keep your paperwork out of the way.", description: "Use your Paper Vault to upload, organise and review your documents. See which files are ready and which still need attention.", phase: "Move towards your offer" },
  { image: "10-prepare-for-interview.png", label: "Prepare for your interview", title: "Walk into your interview feeling prepared.", description: "Read the preparation guides and practise academic, finance and visa interview questions. Get familiar with the conversations ahead of you.", phase: "Move towards your offer" },
  { image: "11-Receive-your-offer.png", label: "Receive your offer", title: "That moment your plans become an offer.", description: "When your university sends an offer, open the letter in your dashboard. Review the details and any conditions before taking your next step.", phase: "Move towards your offer" },
  { image: "12-Receive-your-caas.png", label: "Receive your CAS", title: "Your next chapter is getting closer.", description: "View your Confirmation of Acceptance for Studies when it arrives. Keep it with your application documents as you prepare for the visa stage.", phase: "Move towards your offer" },
];

const SLIDE_MS = 2000;

export function HowToApply() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const root = useRef<HTMLElement>(null);
  const elapsed = useRef(0);
  const progress = useMotionValue(0);
  const reduce = useReducedMotion();
  const playing = !paused && !reduce;
  const step = steps[active];

  useEffect(() => {
    if (!root.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(root.current);
    const visibility = () => setPageVisible(!document.hidden);
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  useEffect(() => {
    elapsed.current = 0;
    progress.set(0);
  }, [active, progress]);

  useEffect(() => {
    if (!playing || !visible || !pageVisible || !loaded[active]) return;
    let frame = 0;
    let last = performance.now();
    function tick(now: number) {
      elapsed.current += now - last;
      last = now;
      progress.set(Math.min(1, elapsed.current / SLIDE_MS));
      if (elapsed.current >= SLIDE_MS) {
        setActive((current) => (current + 1) % steps.length);
      } else {
        frame = requestAnimationFrame(tick);
      }
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, playing, visible, pageVisible, loaded, progress]);

  function select(index: number) {
    elapsed.current = 0;
    progress.set(0);
    setActive((index + steps.length) % steps.length);
  }

  return (
    <section ref={root} id="how-it-works" aria-labelledby="self-apply-title" className="relative isolate scroll-mt-24 overflow-hidden bg-navy px-5 py-16 sm:px-8 sm:py-20 lg:px-16">
      <div aria-hidden className="pointer-events-none absolute -left-32 top-20 -z-10 size-[600px] rounded-full bg-orange/10 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 -z-10 size-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 lg:mb-12">
          <div>
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-orange"><span aria-hidden className="h-px w-8 bg-orange" />Your self-apply journey</p>
            <h2 id="self-apply-title" className="mt-4 max-w-[22ch] font-display text-[clamp(2rem,3.8vw,3.5rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-white">Your future. <span className="text-orange">See how it happens.</span></h2>
          </div>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] lg:gap-12">
          <div className="min-w-0">
            <div className="overflow-hidden rounded-2xl border border-white/20 bg-white shadow-[0_30px_90px_-25px_rgba(0,0,0,0.65)] sm:rounded-[22px]">
              <div className="flex items-center justify-between border-b border-hairline bg-[#f7f8fc] px-4 py-3 text-[11px] sm:px-5">
                <span className="flex items-center gap-2 font-semibold text-navy"><span className="size-2 rounded-full bg-orange" />Inside Ignition</span>
                <span className="font-medium text-muted">Your journey, in one place</span>
              </div>
              <div className="relative aspect-[2/1] bg-[#f7f8fc]">
                {steps.map((item, index) => (
                  <motion.div key={item.image} aria-hidden={index !== active} className="absolute inset-0" initial={false} animate={{ opacity: index === active ? 1 : 0 }} transition={{ duration: reduce ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }} style={{ pointerEvents: index === active ? "auto" : "none", zIndex: index === active ? 1 : 0 }}>
                    <Image src={`/images/how-it-works/${item.image}`} alt={`Ignition platform: ${item.label}`} fill sizes="(min-width: 1024px) 62vw, 100vw" className="object-contain" loading={index === active || index === (active + 1) % steps.length ? "eager" : "lazy"} onLoad={() => setLoaded((current) => current[index] ? current : { ...current, [index]: true })} />
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-hairline bg-[#f7f8fc] px-4 py-3 sm:px-5">
                <span className="text-xs font-semibold text-navy"><span className="mr-2 text-orange">{String(active + 1).padStart(2, "0")}</span>{step.label}</span>
                <span className="hidden text-[10px] font-semibold uppercase tracking-wider text-muted sm:block">Real platform walkthrough</span>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => select(active - 1)} aria-label="Previous journey step" className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-orange"><ArrowLeft size={17} /></button>
                <button type="button" onClick={() => setPaused((value) => !value)} disabled={Boolean(reduce)} aria-label={playing ? "Pause journey autoplay" : "Play journey autoplay"} className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-orange">{playing ? <Pause size={16} /> : <Play size={16} />}</button>
                <button type="button" onClick={() => select(active + 1)} aria-label="Next journey step" className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-orange"><ArrowRight size={17} /></button>
                <span className="ml-2 hidden text-xs text-white/45 sm:block">{reduce ? "Explore at your pace" : paused ? "Take your time" : "Playing the journey"}</span>
              </div>
              <span className="text-xs font-semibold tabular-nums text-white/45"><span className="text-white">{String(active + 1).padStart(2, "0")}</span> / 12</span>
            </div>
          </div>

          <div className="min-w-0 lg:min-h-[340px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange">{step.phase}</p>
            <div className="mt-4 flex items-center gap-3"><span className="font-display text-5xl font-extrabold tracking-tight text-white/15">{String(active + 1).padStart(2, "0")}</span><span className="h-px flex-1 bg-white/15" /></div>
            <motion.div key={active} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }} className="mt-5 min-h-[190px] sm:min-h-[170px] lg:min-h-[210px]">
              <h3 className="font-display text-[clamp(1.5rem,2.4vw,2.25rem)] font-bold leading-[1.15] tracking-[-0.025em] text-white">{step.title}</h3>
              <p className="mt-5 text-[15px] leading-[1.75] text-white/65">{step.description}</p>
            </motion.div>
            <Link href="/apply" className="mt-6 inline-flex items-center gap-2 border-b border-orange/50 pb-2 text-sm font-bold text-white transition-colors hover:text-orange">Start your own journey <ArrowUpRight size={17} aria-hidden /></Link>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 sm:mt-12">
          <div className="mb-4 flex items-center justify-between gap-3"><p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">12 steps. One connected journey.</p><span className="text-xs text-white/45">Pick any step</span></div>
          <ol className="grid grid-cols-6 gap-2 sm:grid-cols-12 sm:gap-3">
            {steps.map((item, index) => (
              <li key={item.image}>
                <button type="button" onClick={() => select(index)} aria-label={`Step ${index + 1}: ${item.label}`} aria-current={index === active ? "step" : undefined} title={item.label} className={`group w-full rounded-lg px-2 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${index === active ? "bg-white/10 text-white" : "text-white/40 hover:bg-white/5 hover:text-white"}`}>
                  <span className="text-xs font-bold tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                  <span className="relative mt-3 block h-[3px] overflow-hidden rounded-full bg-white/15"><motion.span className="absolute inset-0 origin-left bg-orange" style={{ scaleX: index === active ? progress : index < active ? 1 : 0 }} /></span>
                </button>
              </li>
            ))}
          </ol>
          <div aria-hidden className="mt-3 hidden grid-cols-12 text-[10px] font-medium uppercase tracking-wider text-white/35 sm:grid"><span className="col-span-3">01–03 · Discover</span><span className="col-span-3">04–06 · Get ready</span><span className="col-span-6">07–12 · Apply & move forward</span></div>
        </div>
      </div>
    </section>
  );
}
