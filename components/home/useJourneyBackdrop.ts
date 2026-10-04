"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";

/**
 * The hero backdrop's single animation system.
 *
 * Everything that moves in `UKJourneyVisual` is driven from here: the
 * entrance, the photograph changes, the Ken Burns drift, the autoplay timer,
 * swipe and cursor parallax.
 *
 * EVERY CHANGE IS A DIFFERENT GESTURE. Each photograph arrives its own way:
 *
 *   → 02  vertical slices slide in from alternating top and bottom edges
 *   → 03  horizontal blinds slide in from alternating sides, top to bottom
 *   → 04  a mosaic of tiles grows in, rippling out from the centre
 *   → 01  a zoom-through: the photograph rushes in from a close crop while
 *         the old one pushes past the viewer and dissolves
 *
 * The pieces are one reusable pool of tiles, painted with the incoming
 * photograph at exactly the crop its real image uses, so when the last piece
 * lands the real image is switched in underneath and the hand-off cannot be
 * seen.
 *
 * Only transform and opacity animate — no clip-path, masks or filters change
 * over time — so every frame stays on the compositor even at this size.
 *
 * `gsap.matchMedia` rebuilds the system when the breakpoint, pointer type or
 * motion preference changes, and reverts it on unmount — which also keeps
 * React Strict Mode's double mount from leaving a second timeline running.
 * The active index lives outside the rebuild so a resize never resets it.
 */

type Rect = { left: number; top: number; width: number; height: number };

/** Cuts a W×H plate into a grid, one pixel of overlap so no seam shows. */
const cut = (W: number, H: number, cols: number, rows: number): Rect[] =>
  Array.from({ length: cols * rows }, (_, n) => {
    const c = n % cols;
    const r = Math.floor(n / cols);
    const left = Math.floor((c * W) / cols);
    const top = Math.floor((r * H) / rows);
    return {
      left,
      top,
      width: Math.ceil(((c + 1) * W) / cols) - left + 1,
      height: Math.ceil(((r + 1) * H) / rows) - top + 1,
    };
  });

const KEN_BURNS = { scale: 1.06, xPercent: -1.2, yPercent: -0.8 };

/** How long each photograph holds before the next one arrives. */
const HOLD = 2;

export function useJourneyBackdrop(rootRef: RefObject<HTMLDivElement | null>) {
  const persisted = useRef({ active: 0, entered: false });

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia(root);

    mm.add(
      {
        // matchMedia only runs the setup while at least one condition holds,
        // and a phone matches none of the others.
        any: "all",
        wide: "(min-width: 1024px)",
        reduce: "(prefers-reduced-motion: reduce)",
        fine: "(hover: hover) and (pointer: fine)",
      },
      (context) => {
        const { wide, reduce, fine } = context.conditions as Record<string, boolean>;
        const saved = persisted.current;

        const all = (selector: string, scope: ParentNode = root) =>
          Array.from(scope.querySelectorAll<HTMLElement>(selector));
        const one = (selector: string, scope: ParentNode = root) =>
          scope.querySelector<HTMLElement>(selector)!;

        // From `lg` the backdrop sits behind the hero copy, so gestures are
        // read from the whole hero rather than the (covered) backdrop.
        const surface = (wide ? root.parentElement : root) ?? root;
        const drift = one("[data-j=drift]");
        const stripLayer = one("[data-j=strips]");
        const tiles = all("[data-j=tile]", stripLayer);
        const slides = all("[data-j=slide]");
        const medias = slides.map((slide) => one("[data-j=media]", slide));
        const count = slides.length;

        let active = saved.active;
        let busy = false;
        let pending: number | null = null;
        let dead = false;
        let transition: gsap.core.Timeline | null = null;
        let entrance: gsap.core.Timeline | null = null;
        /** The autoplay timer — a delayed call, so it pauses like a tween. */
        let timer: gsap.core.Tween | null = null;
        let kenBurns: gsap.core.Tween | null = null;
        const holds = new Set<string>();

        // ── Resting state ────────────────────────────────────────────────
        slides.forEach((slide, i) =>
          gsap.set(slide, { opacity: i === active ? 1 : 0, zIndex: i === active ? 2 : 1, force3D: true }),
        );

        // ── Autoplay, Ken Burns and pausing ──────────────────────────────
        const syncHolds = (instant: boolean) => {
          const scale = holds.size ? 0 : 1;
          for (const tween of [timer, kenBurns]) {
            if (!tween) continue;
            if (instant) tween.timeScale(scale);
            else gsap.to(tween, { timeScale: scale, duration: scale ? 0.5 : 0.35, overwrite: true });
          }
        };

        const hold = (reason: string, on: boolean) => {
          if (on === holds.has(reason)) return;
          if (on) holds.add(reason);
          else holds.delete(reason);
          syncHolds(false);
        };

        const startSlide = () => {
          timer?.kill();
          kenBurns?.kill();
          timer = kenBurns = null;
          // No autoplay under reduced motion; swipe still moves it on.
          if (reduce) return;
          kenBurns = gsap.to(medias[active], { ...KEN_BURNS, duration: HOLD + 1.6, ease: "none" });
          timer = gsap.delayedCall(HOLD, () => go(active + 1));
          syncHolds(true);
        };

        // ── Transitions ──────────────────────────────────────────────────
        /**
         * Paints the first `rects.length` tiles of the pool with the
         * photograph in slide `index`, cropped exactly as its <img> is:
         * object-fit cover at its object-position, on a media box that bleeds
         * 4% past the plate on every side. The rest of the pool is hidden.
         */
        const paint = (index: number, rects: Rect[]) => {
          const img = slides[index].querySelector("img");
          if (!img || !img.naturalWidth) return null;
          const W = stripLayer.offsetWidth;
          const H = stripLayer.offsetHeight;
          const mW = W * 1.08;
          const mH = H * 1.08;
          const cover = Math.max(mW / img.naturalWidth, mH / img.naturalHeight);
          const bw = img.naturalWidth * cover;
          const bh = img.naturalHeight * cover;
          const [fx, fy] = (img.style.objectPosition || "50% 50%")
            .split(" ")
            .map((v) => parseFloat(v) / 100);
          const bx = -0.04 * W + (mW - bw) * fx;
          const by = -0.04 * H + (mH - bh) * fy;
          tiles.forEach((tile, i) => {
            const rect = rects[i];
            if (!rect) return gsap.set(tile, { autoAlpha: 0 });
            gsap.set(tile, {
              ...rect,
              autoAlpha: 1,
              backgroundImage: `url("${img.currentSrc || img.src}")`,
              backgroundSize: `${bw}px ${bh}px`,
              backgroundPosition: `${bx - rect.left}px ${by - rect.top}px`,
            });
          });
          return tiles.slice(0, rects.length);
        };

        /** When every technique has finished and the real image takes over. */
        const LAND = 1.3;

        const choreograph = (from: number, to: number) => {
          const tl = gsap.timeline();
          const W = stripLayer.offsetWidth;
          const H = stripLayer.offsetHeight;
          const technique = to % 4;

          let pieces: HTMLElement[] | null = null;
          if (technique === 1) pieces = paint(to, cut(W, H, 7, 1));
          else if (technique === 2) pieces = paint(to, cut(W, H, 1, 6));
          else if (technique === 3) pieces = paint(to, cut(W, H, 4, 3));

          tl.set(medias[to], { scale: 1, xPercent: 0, yPercent: 0 }, 0);

          if (technique === 0 || !pieces) {
            // Zoom-through (also the fallback if the image never decoded).
            tl.set(slides[to], { zIndex: 3 }, 0)
              .fromTo(
                slides[to],
                { opacity: 0, scale: 1.24 },
                { opacity: 1, scale: 1, duration: 1.2, ease: "expo.out" },
                0,
              )
              .to(medias[from], { scale: "+=0.14", duration: 0.9, ease: "power2.in" }, 0);
          } else {
            tl.set(stripLayer, { autoAlpha: 1 }, 0);
            if (technique === 1) {
              // Vertical slices from alternating top and bottom edges.
              tl.fromTo(
                pieces,
                { yPercent: (i: number) => (i % 2 ? 101 : -101) },
                { yPercent: 0, duration: 0.85, ease: "power4.out", stagger: 0.07 },
                0,
              );
            } else if (technique === 2) {
              // Horizontal blinds from alternating sides, cascading down.
              tl.fromTo(
                pieces,
                { xPercent: (i: number) => (i % 2 ? 101 : -101) },
                { xPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.075 },
                0,
              );
            } else {
              // Mosaic: tiles grow in, rippling out from the centre.
              tl.fromTo(
                pieces,
                { scale: 0, opacity: 0 },
                {
                  scale: 1,
                  opacity: 1,
                  duration: 0.7,
                  ease: "power3.out",
                  stagger: { grid: [3, 4], from: "center", amount: 0.5 },
                },
                0,
              );
            }
            // The outgoing photograph leans back as it is covered.
            tl.to(medias[from], { scale: "+=0.05", duration: LAND, ease: "power2.out" }, 0)
              .set(slides[to], { opacity: 1, zIndex: 3 }, LAND)
              .set(stripLayer, { autoAlpha: 0 }, LAND)
              .set(pieces, { clearProps: "transform,opacity" }, LAND);
          }

          tl.set(slides[from], { opacity: 0, zIndex: 1 }, LAND)
            .set(medias[from], { scale: 1, xPercent: 0, yPercent: 0 }, LAND)
            .set(slides[to], { zIndex: 2, scale: 1 }, LAND);
          return tl;
        };

        /** Reduced motion: a short dissolve and nothing else. */
        const dissolve = (from: number, to: number) =>
          gsap
            .timeline()
            .set(slides[to], { zIndex: 3 }, 0)
            .to(slides[to], { opacity: 1, duration: 0.4, ease: "power1.out" }, 0)
            .set(slides[from], { opacity: 0, zIndex: 1 }, 0.4)
            .set(slides[to], { zIndex: 2 }, 0.4);

        /** Never start moving a photograph that has not arrived yet. */
        const ready = (index: number) => {
          const img = slides[index].querySelector("img");
          if (!img || img.complete) return Promise.resolve();
          return Promise.race([
            img.decode().catch(() => undefined),
            new Promise((resolve) => setTimeout(resolve, 1200)),
          ]);
        };

        const finish = () => {
          busy = false;
          transition = null;
          const next = pending;
          pending = null;
          if (next !== null && next !== active) go(next);
          else startSlide();
        };

        const go = (target: number) => {
          const to = ((target % count) + count) % count;
          if (busy) {
            // Swipes during a change queue the latest one rather than
            // cutting the timeline.
            pending = to;
            return;
          }
          if (to === active || !saved.entered) return;

          busy = true;
          timer?.kill();
          kenBurns?.kill();
          timer = kenBurns = null;

          const from = active;
          active = saved.active = to;

          ready(to).then(() => {
            if (dead) return;
            transition = reduce ? dissolve(from, to) : choreograph(from, to);
            transition.eventCallback("onComplete", finish);
          });
        };

        // ── Entrance ─────────────────────────────────────────────────────
        if (saved.entered) {
          startSlide();
        } else {
          entrance = gsap.timeline({
            delay: reduce ? 0.2 : 0.3,
            onComplete: () => {
              saved.entered = true;
              startSlide();
            },
          });
          if (reduce) {
            entrance.from(slides[active], { opacity: 0, duration: 0.4 });
          } else {
            entrance.fromTo(
              slides[active],
              { opacity: 0, scale: 1.1, xPercent: 3 },
              { opacity: 1, scale: 1, xPercent: 0, duration: 1.5, ease: "expo.out" },
              0,
            );
          }
          // Below `lg` the band sits under the calls to action, often below
          // the fold — so its entrance waits until it is scrolled to.
          if (!wide) entrance.pause();
        }

        // ── Interaction ──────────────────────────────────────────────────
        const cleanups: (() => void)[] = [];
        const listen = <K extends keyof HTMLElementEventMap>(
          target: HTMLElement,
          type: K,
          handler: (event: HTMLElementEventMap[K]) => void,
          options?: AddEventListenerOptions,
        ) => {
          target.addEventListener(type, handler as EventListener, options);
          cleanups.push(() => target.removeEventListener(type, handler as EventListener, options));
        };

        // Swipe — touch only, so a mouse selecting the headline never counts.
        let startX = 0;
        let startY = 0;
        let tracking = false;
        listen(surface, "pointerdown", (event) => {
          if (event.pointerType !== "touch") return;
          tracking = true;
          startX = event.clientX;
          startY = event.clientY;
        });
        listen(surface, "pointerup", (event) => {
          if (!tracking) return;
          tracking = false;
          const dx = event.clientX - startX;
          const dy = event.clientY - startY;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(active + (dx < 0 ? 1 : -1));
        });
        listen(surface, "pointercancel", () => {
          tracking = false;
        });

        // Nothing runs while the hero is off screen or the tab is hidden.
        const observer = new IntersectionObserver(
          ([entry]) => {
            hold("offscreen", !entry.isIntersecting);
            if (entry.isIntersecting && entrance?.paused() && !saved.entered) entrance.play();
          },
          { threshold: 0.15 },
        );
        observer.observe(root);
        cleanups.push(() => observer.disconnect());
        const onVisibility = () => hold("hidden", document.hidden);
        document.addEventListener("visibilitychange", onVisibility);
        cleanups.push(() => document.removeEventListener("visibilitychange", onVisibility));

        // Parallax — the backdrop leans gently against the cursor. The
        // pointer sets a target; the layer eases toward it every frame.
        if (wide && fine && !reduce) {
          const target = { x: 0, y: 0 };
          const current = { x: 0, y: 0 };
          const driftX = gsap.quickSetter(drift, "x", "px");
          const driftY = gsap.quickSetter(drift, "y", "px");
          gsap.set(drift, { scale: 1.03 });

          listen(surface, "pointermove", (event) => {
            if (event.pointerType !== "mouse") return;
            const rect = surface.getBoundingClientRect();
            target.x = gsap.utils.clamp(-1, 1, ((event.clientX - rect.left) / rect.width) * 2 - 1);
            target.y = gsap.utils.clamp(-1, 1, ((event.clientY - rect.top) / rect.height) * 2 - 1);
          });
          listen(surface, "pointerleave", () => {
            target.x = target.y = 0;
          });

          const tick = () => {
            if (Math.abs(target.x - current.x) + Math.abs(target.y - current.y) < 0.0005) return;
            const k = 1 - Math.pow(1 - 0.06, gsap.ticker.deltaRatio());
            current.x += (target.x - current.x) * k;
            current.y += (target.y - current.y) * k;
            driftX(current.x * -14);
            driftY(current.y * -9);
          };
          gsap.ticker.add(tick);
          cleanups.push(() => gsap.ticker.remove(tick));
        }

        return () => {
          dead = true;
          cleanups.forEach((cleanup) => cleanup());
          transition?.kill();
          entrance?.kill();
          timer?.kill();
          kenBurns?.kill();
          gsap.killTweensOf([...slides, ...medias, ...tiles, stripLayer, drift]);
          gsap.set(
            [
              ...slides,
              ...medias,
              ...tiles,
              stripLayer,
              drift,
            ],
            { clearProps: "all" },
          );
        };
      },
    );

    return () => mm.revert();
  }, [rootRef]);

}
