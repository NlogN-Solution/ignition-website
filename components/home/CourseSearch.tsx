"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  CornerDownLeft,
  GraduationCap,
  Search,
} from "lucide-react";
import { useReveal } from "../ui/motion";
import { Container } from "../ui/Container";
import { studyRoute, studyRoutes, type CourseLevel, type StudyRouteId } from "@/data/courses";

/**
 * One search line, not a section.
 *
 * This used to be a full band: an eyebrow, a heading, a row of level chips, a
 * 58px field and a paragraph of explanation, all stacked. It answered one
 * question — "do you have my course?" — and took most of a screen doing it,
 * pushing everything below the hero a scroll further down.
 *
 * Now it is one row, and it answers as you type. What you are looking for is a
 * two-way switch, the level is a dropdown that only applies to courses, and
 * the field suggests actual courses and universities under the cursor — a
 * student who knows what they want reaches the page in one keystroke and a
 * Return, without loading a results list to click through.
 *
 * The suggestions are navigation, not results: at most six, no filters, no
 * saving, and a last row that hands the whole query over to /courses or
 * /universities where the full facet set, the example-data notice and the
 * saving controls live. A second results list here would fork the one place
 * allowed to present the catalogue.
 */

type Target = "courses" | "universities";

type Suggestion = {
  id: string;
  href: string;
  title: string;
  meta: string;
};

/**
 * Just enough of each record to suggest it.
 *
 * The homepage is the heaviest page on the site to hydrate and this field sits
 * in the hero, so it is handed the four or five fields it matches on rather
 * than the full catalogue — a `University` carries several paragraphs of prose
 * that this component would ship to the browser and never read.
 */
export type UniversitySuggestion = {
  id: string;
  name: string;
  city: string;
  region: string;
};

export type CourseSuggestion = {
  id: string;
  title: string;
  qualification: string;
  subject: string;
  level: CourseLevel;
  outcomes: string[];
};

const MAX_SUGGESTIONS = 6;

/** The subjects students actually arrive typing. */
const popular = ["Computer Science", "Business", "Nursing", "Engineering"];

const fieldBase =
  "h-[52px] w-full appearance-none rounded-[10px] border border-hairline bg-white pl-[15px] pr-10 text-[15px] font-semibold text-navy transition-colors duration-200 hover:border-ring-idle focus:border-ring-idle";

function SelectShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-w-0">
      {children}
      <ChevronDown
        size={16}
        strokeWidth={2.4}
        aria-hidden
        className="pointer-events-none absolute right-[13px] top-1/2 -translate-y-1/2 text-muted-light"
      />
    </div>
  );
}

/** The matched run, bolded, so a student can see why a row is being offered. */
function Highlight({ text, needle }: { text: string; needle: string }) {
  const at = needle ? text.toLowerCase().indexOf(needle) : -1;
  if (at < 0) return <>{text}</>;

  return (
    <>
      {text.slice(0, at)}
      <mark className="bg-transparent font-bold text-navy">
        {text.slice(at, at + needle.length)}
      </mark>
      {text.slice(at + needle.length)}
    </>
  );
}

export function CourseSearch({
  universities,
  courses,
}: {
  universities: UniversitySuggestion[];
  courses: CourseSuggestion[];
}) {
  const router = useRouter();
  const { container, item } = useReveal(0.09);
  const listId = useId();

  const [target, setTarget] = useState<Target>("courses");
  const [route, setRoute] = useState<StudyRouteId>("undergraduate");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);

  const needle = query.trim().toLowerCase();

  const suggestions = useMemo<Suggestion[]>(() => {
    if (needle.length < 2) return [];

    if (target === "universities") {
      return universities
        .filter(
          (university) =>
            university.name.toLowerCase().includes(needle) ||
            university.city.toLowerCase().includes(needle),
        )
        .slice(0, MAX_SUGGESTIONS)
        .map((university) => ({
          id: university.id,
          href: `/universities/${university.id}`,
          title: university.name,
          meta: `${university.city} · ${university.region}`,
        }));
    }

    const levels = studyRoute(route)?.levels ?? null;

    return courses
      .filter((course) => {
        if (levels && !levels.includes(course.level)) return false;

        return (
          course.title.toLowerCase().includes(needle) ||
          course.subject.toLowerCase().includes(needle) ||
          course.qualification.toLowerCase().includes(needle) ||
          course.outcomes.some((outcome) => outcome.toLowerCase().includes(needle))
        );
      })
      .slice(0, MAX_SUGGESTIONS)
      .map((course) => ({
        id: course.id,
        href: `/courses/${course.id}`,
        title: `${course.title} ${course.qualification}`,
        meta: `${course.subject} · ${course.level}`,
      }));
  }, [needle, target, route, universities, courses]);

  /* A stale highlight would send Return to the wrong row after the list under
     it changed, so it resets whenever the list is rebuilt. */
  useEffect(() => {
    setActive(-1);
  }, [needle, target, route]);

  const listHref = useMemo(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());

    if (target === "universities") {
      return `/universities${params.size ? `?${params}` : ""}`;
    }

    params.set("route", route);
    return `/courses?${params}`;
  }, [query, target, route]);

  /** The final row, and what plain Return does: the full filtered list. */
  const showList = needle.length > 0;
  const rows = showList ? [...suggestions, null] : suggestions;
  const panelOpen = open && rows.length > 0;

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    go(listHref);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      setActive(-1);
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (rows.length === 0) return;
      event.preventDefault();
      setOpen(true);

      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((current) => {
        const next = current + step;
        if (next < 0) return rows.length - 1;
        if (next >= rows.length) return 0;
        return next;
      });
      return;
    }

    if (event.key === "Enter" && panelOpen && active >= 0) {
      event.preventDefault();
      const row = rows[active];
      go(row ? row.href : listHref);
    }
  }

  const count = target === "courses" ? courses.length : universities.length;

  return (
    <section
      aria-labelledby="course-search-heading"
      className="border-y border-hairline bg-white/55"
    >
      <Container className="py-[clamp(1.25rem,2.2vw,1.75rem)]">
        <motion.form {...container} onSubmit={submit} role="search">
          <h2 id="course-search-heading" className="sr-only">
            Search courses and universities
          </h2>

          <motion.div
            {...item}
            /* A switch, an optional dropdown, the field and a button. From
               `lg` they sit on one line, with the field taking whatever is
               left; below that they stack into full-width controls rather
               than shrinking to unusable widths. */
            className="grid gap-3 lg:grid-cols-[auto_auto_minmax(0,1fr)_auto] lg:items-center lg:gap-3"
          >
            {/* Two options, so a switch rather than a dropdown: the choice and
                its current state are both readable without opening anything,
                and it is one tap instead of three. */}
            <div
              role="radiogroup"
              aria-label="What are you looking for"
              className="inline-flex h-[52px] shrink-0 items-center rounded-[10px] border border-hairline bg-white p-[3px]"
            >
              {(["courses", "universities"] as const).map((option) => {
                const selected = target === option;

                return (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => {
                      setTarget(option);
                      setActive(-1);
                    }}
                    className={`inline-flex h-full flex-1 items-center justify-center gap-[7px] rounded-[7px] px-[15px] text-[14.5px] font-semibold transition-colors duration-200 lg:flex-none ${
                      selected
                        ? "bg-navy text-white"
                        : "text-muted hover:text-navy"
                    }`}
                  >
                    {option === "courses" ? (
                      <GraduationCap size={16} strokeWidth={2.2} aria-hidden />
                    ) : (
                      <Building2 size={16} strokeWidth={2.2} aria-hidden />
                    )}
                    {option === "courses" ? "Courses" : "Universities"}
                  </button>
                );
              })}
            </div>

            {/* Level changes what the same words should return — "business" as
                a bachelor's, a master's and a top-up are three different
                products. It has no meaning for universities, so it is not
                rendered when the target is universities rather than being
                shown disabled. */}
            {target === "courses" ? (
              <SelectShell>
                <label className="sr-only" htmlFor="search-level">
                  Study level
                </label>
                <select
                  id="search-level"
                  value={route}
                  onChange={(event) => setRoute(event.target.value as StudyRouteId)}
                  className={fieldBase}
                >
                  {studyRoutes.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </SelectShell>
            ) : null}

            <div
              className="relative min-w-0"
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                  setOpen(false);
                }
              }}
            >
              <label className="block">
                <span className="sr-only">
                  Search {target === "courses" ? "courses" : "universities"}
                </span>
                <Search
                  size={18}
                  strokeWidth={2.1}
                  aria-hidden
                  className="pointer-events-none absolute left-[16px] top-[26px] -translate-y-1/2 text-muted-light"
                />
                <input
                  ref={inputRef}
                  type="search"
                  role="combobox"
                  aria-expanded={panelOpen}
                  aria-controls={listId}
                  aria-autocomplete="list"
                  aria-activedescendant={
                    panelOpen && active >= 0 ? `${listId}-${active}` : undefined
                  }
                  autoComplete="off"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setOpen(true);
                  }}
                  onFocus={() => setOpen(true)}
                  onKeyDown={onKeyDown}
                  placeholder={
                    target === "courses"
                      ? `Search ${count} courses — try “computer science”`
                      : `Search ${count} universities — try “Manchester”`
                  }
                  className="h-[52px] w-full appearance-none rounded-[10px] border border-hairline bg-white pl-[45px] pr-4 text-[15px] font-medium text-ink transition-colors duration-200 placeholder:text-muted-light hover:border-ring-idle focus:border-ring-idle [&::-webkit-search-cancel-button]:hidden"
                />
              </label>

              {panelOpen ? (
                <ul
                  id={listId}
                  role="listbox"
                  aria-label="Suggestions"
                  className="absolute left-0 right-0 top-[calc(100%+6px)] z-40 max-h-[336px] overflow-y-auto rounded-xl border border-hairline bg-white p-[6px] shadow-[0_24px_48px_-24px_rgba(1,22,111,0.35)]"
                >
                  {suggestions.map((suggestion, index) => (
                    <li key={suggestion.id}>
                      <button
                        id={`${listId}-${index}`}
                        type="button"
                        role="option"
                        aria-selected={active === index}
                        onMouseEnter={() => setActive(index)}
                        onClick={() => go(suggestion.href)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-[9px] text-left transition-colors duration-150 ${
                          active === index ? "bg-canvas" : ""
                        }`}
                      >
                        {target === "courses" ? (
                          <GraduationCap
                            size={16}
                            strokeWidth={2.2}
                            aria-hidden
                            className="shrink-0 text-blue-link"
                          />
                        ) : (
                          <Building2
                            size={16}
                            strokeWidth={2.2}
                            aria-hidden
                            className="shrink-0 text-blue-link"
                          />
                        )}
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[14.5px] font-semibold text-ink">
                            <Highlight text={suggestion.title} needle={needle} />
                          </span>
                          <span className="block truncate text-[13px] font-medium text-muted-light">
                            {suggestion.meta}
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}

                  {showList ? (
                    <li>
                      <button
                        id={`${listId}-${suggestions.length}`}
                        type="button"
                        role="option"
                        aria-selected={active === suggestions.length}
                        onMouseEnter={() => setActive(suggestions.length)}
                        onClick={() => go(listHref)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-[9px] text-left transition-colors duration-150 ${
                          suggestions.length > 0 ? "mt-[2px] border-t border-hairline pt-[11px]" : ""
                        } ${active === suggestions.length ? "bg-canvas" : ""}`}
                      >
                        <Search
                          size={16}
                          strokeWidth={2.2}
                          aria-hidden
                          className="shrink-0 text-muted-light"
                        />
                        <span className="min-w-0 flex-1 truncate text-[14px] font-semibold text-blue-link">
                          {suggestions.length > 0
                            ? `See all ${target === "courses" ? "courses" : "universities"} matching “${query.trim()}”`
                            : `Search all ${target === "courses" ? "courses" : "universities"} for “${query.trim()}”`}
                        </span>
                        <CornerDownLeft
                          size={14}
                          strokeWidth={2.2}
                          aria-hidden
                          className="hidden shrink-0 text-faint sm:block"
                        />
                      </button>
                    </li>
                  ) : null}
                </ul>
              ) : null}
            </div>

            <button
              type="submit"
              className="group inline-flex h-[52px] shrink-0 items-center justify-center gap-[12px] rounded-[10px] bg-orange px-7 text-[15.5px] font-semibold text-white transition-[transform,background-color,box-shadow] duration-200 hover:bg-[#e04f04] hover:shadow-[0_12px_30px_-12px_rgba(252,90,7,0.7)] active:scale-[0.985]"
            >
              Search
              <ArrowRight
                size={17}
                strokeWidth={2.4}
                aria-hidden
                className="shrink-0 transition-transform duration-200 group-hover:translate-x-[3px]"
              />
            </button>
          </motion.div>

          {/* A cold field is the hardest thing to start from. These are the
              four subjects students arrive typing, and they fill the field
              rather than navigating, so the level and the switch still apply. */}
          <motion.div
            {...item}
            className="mt-[10px] hidden flex-wrap items-center gap-x-2 gap-y-1 sm:flex"
          >
            <span className="text-[13px] font-semibold text-muted-light">
              Popular:
            </span>
            {popular.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => {
                  setQuery(term);
                  setOpen(true);
                  inputRef.current?.focus();
                }}
                className="rounded-md px-[6px] py-[2px] text-[13px] font-semibold text-blue-link transition-colors duration-200 hover:bg-white hover:text-navy"
              >
                {term}
              </button>
            ))}
          </motion.div>
        </motion.form>
      </Container>
    </section>
  );
}
