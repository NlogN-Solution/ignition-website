"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { FilterChips } from "../ui/FilterChips";
import { EmptyResults, ResultCount } from "../ui/ResultCount";
import { Badge } from "../ui/Badge";
import {
  interviewQuestions,
  questionCategories,
  type QuestionCategory,
} from "@/data/universities/interview";

/**
 * The question library, filtered by category and searchable by wording.
 *
 * Each question opens onto the same four parts in the same order — what they
 * are assessing, how to build an answer, an example of the shape, and the
 * specific way this question is failed. The order is the point: a student who
 * reads the sample answer first will copy it, and a copied answer is the
 * thing every interviewer in this process is trained to detect. Putting the
 * reasoning above the example makes the example read as an illustration
 * rather than a script, which is the only way it is any use.
 *
 * Built on <details> like the site's other Accordion so it is keyboard
 * accessible and works before hydration. Filtering is the only part that
 * needs JavaScript, and the questions are all present without it.
 */
export function InterviewLibrary() {
  const [category, setCategory] = useState<QuestionCategory | null>(null);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return interviewQuestions.filter((q) => {
      if (category && q.category !== category) return false;
      if (!needle) return true;
      return (
        q.question.toLowerCase().includes(needle) ||
        q.looking.toLowerCase().includes(needle) ||
        q.how.toLowerCase().includes(needle)
      );
    });
  }, [category, query]);

  return (
    <div>
      <div className="rounded-xl border border-hairline bg-white p-5 sm:p-6">
        <label className="relative block">
          <span className="sr-only">Search interview questions</span>
          <Search
            size={18}
            strokeWidth={2.1}
            aria-hidden
            className="pointer-events-none absolute left-[17px] top-1/2 -translate-y-1/2 text-muted-light"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search questions — try &ldquo;funding&rdquo;"
            className="h-[52px] w-full rounded-[10px] border border-hairline bg-canvas pl-[47px] pr-4 text-[15px] font-medium text-ink placeholder:text-muted-light focus:border-ring-idle"
          />
        </label>

        <div className="mt-5">
          <FilterChips
            label="Category"
            options={questionCategories}
            value={category}
            onChange={setCategory}
          />
        </div>
      </div>

      <div className="mt-5">
        <ResultCount
          count={results.length}
          noun={["question", "questions"]}
          onClear={
            category || query
              ? () => {
                  setCategory(null);
                  setQuery("");
                }
              : undefined
          }
        />
      </div>

      {results.length === 0 ? (
        <div className="mt-4">
          <EmptyResults>
            No question matches that. Clear the search or pick a different
            category to see the full list.
          </EmptyResults>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {results.map((q) => (
            <li key={q.id}>
              <details className="group overflow-hidden rounded-xl border border-hairline bg-white">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 px-5 py-[18px] transition-colors duration-200 hover:bg-canvas sm:px-6 [&::-webkit-details-marker]:hidden">
                  <div className="min-w-0">
                    <h3 className="text-[16px] font-bold leading-[1.4] tracking-[-0.01em] text-navy sm:text-[17px]">
                      {q.question}
                    </h3>
                    <div className="mt-[9px]">
                      <Badge tone="muted">{q.category}</Badge>
                    </div>
                  </div>
                  <ChevronDown
                    size={18}
                    strokeWidth={2.4}
                    aria-hidden
                    className="mt-[3px] shrink-0 text-blue-link transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>

                <div className="space-y-5 border-t border-hairline px-5 py-5 sm:px-6 sm:py-6">
                  <Part title="What they're looking for">{q.looking}</Part>
                  <Part title="How to answer">{q.how}</Part>

                  <div>
                    <h4 className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-muted-light">
                      Sample answer
                    </h4>
                    <blockquote className="mt-[10px] border-l-2 border-blue-link/40 pl-4 text-[15px] font-medium italic leading-[1.7] text-ink-soft">
                      {q.sample}
                    </blockquote>
                    <p className="mt-[10px] text-[13px] font-medium leading-[1.55] text-muted-light">
                      An illustration of the shape of a good answer, not a
                      script. Interviewers recognise a memorised answer
                      immediately — use your own examples.
                    </p>
                  </div>

                  <div className="rounded-lg border border-orange/20 bg-orange/[0.05] p-4">
                    <h4 className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-orange">
                      Avoid
                    </h4>
                    <p className="mt-[7px] text-[14.5px] font-medium leading-[1.6] text-ink-soft">
                      {q.avoid}
                    </p>
                  </div>
                </div>
              </details>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Part({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-muted-light">
        {title}
      </h4>
      <p className="mt-[7px] max-w-[68ch] text-[15px] font-medium leading-[1.65] text-ink-soft">
        {children}
      </p>
    </div>
  );
}
