"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The several ways into one thing, without ever leaving the thing.
 *
 * The problem this solves is stated plainly: a student researching six
 * institutions was losing their place. Every question — what is this place,
 * how do I apply, what will it cost me from Kathmandu, what do I need to
 * produce, what will they ask me — lived on a different page, and switching
 * university meant rebuilding all of that context from scratch. So the
 * university is the fixed point and the question is what changes.
 *
 * Courses have the same shape and the same problem: the modules, the entry
 * requirements, the fees and the careers were one long scroll with a sidebar,
 * so a student checking whether they met the requirements scrolled past three
 * sections they had not asked for. Both pages use this.
 *
 * WHY IT LOOKS LIKE THIS. The first version was five labels in a row with a
 * rule under the selected one, and it did not read as a control at all — with
 * no container and no edges, the bar looked like a line of links that happened
 * to have a coloured underline. Now the group sits in its own track and the
 * selected tab is a filled pill inside it: the shape says "one of these is
 * on", which is the entire job of a tab bar, before anyone reads a word. The
 * icons do the same work at a glance, and the hint for whichever tab is open
 * moves to the end of the bar rather than being crammed under all five.
 *
 * Panels are rendered on the server and passed in as props, then kept mounted
 * and hidden rather than swapped. Three reasons: the content of all five tabs
 * is in the HTML for search engines, the page is readable before hydration,
 * and switching costs nothing because nothing is fetched or re-rendered.
 *
 * The active tab is written to the URL hash, so a student can send someone
 * "the fees tab of this university" and an adviser can link straight to the
 * documents. `replaceState` rather than a router push: this is not a
 * navigation and should not stack up in the back button.
 */
export type DetailTab = {
  id: string;
  label: string;
  /** Shown beside the bar on wide screens — says what the open tab answers. */
  hint: string;
  /** Rendered inside the tab. Sized by the caller at 15px. */
  icon: React.ReactNode;
  panel: React.ReactNode;
};

export function DetailTabs({
  tabs,
  label,
}: {
  tabs: DetailTab[];
  /** Names the tablist for screen readers, e.g. "University information". */
  label: string;
}) {
  const [active, setActive] = useState(tabs[0].id);
  const listRef = useRef<HTMLDivElement>(null);

  /**
   * The hash is the source of truth for which tab is open, synced in both
   * directions. Reading it only once on mount was not enough: the state and
   * the URL then disagree the moment the hash changes any other way — the
   * back button, a link to #financials from elsewhere on the page, or a
   * remount that resets state while the old hash is still in the bar. So the
   * component adopts the hash on mount *and* listens for it changing.
   *
   * The valid ids are held in a ref so this effect depends on nothing that
   * changes per render. With `tabs` in the dependency array it re-ran on every
   * new array identity and could overwrite a selection the student had just
   * made with whatever the hash last said.
   */
  const idsRef = useRef(tabs.map((tab) => tab.id));
  idsRef.current = tabs.map((tab) => tab.id);

  useEffect(() => {
    function adopt() {
      const fromHash = window.location.hash.replace("#", "");
      if (fromHash && idsRef.current.includes(fromHash)) setActive(fromHash);
    }

    adopt();
    window.addEventListener("hashchange", adopt);
    return () => window.removeEventListener("hashchange", adopt);
  }, []);

  function select(id: string) {
    setActive(id);
    // Not a navigation, so it must not stack up in the back button — a student
    // switching between five tabs should not have to press back five times to
    // get out of the university.
    window.history.replaceState(null, "", `#${id}`);
  }

  /** Left/right move between tabs, home/end jump to the ends. */
  function onKeyDown(event: React.KeyboardEvent) {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    const i = tabs.findIndex((tab) => tab.id === active);
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? tabs.length - 1
          : event.key === "ArrowLeft"
            ? (i - 1 + tabs.length) % tabs.length
            : (i + 1) % tabs.length;

    select(tabs[next].id);
    listRef.current
      ?.querySelectorAll<HTMLButtonElement>("[role='tab']")
      [next]?.focus();
  }

  const openTab = tabs.find((tab) => tab.id === active) ?? tabs[0];

  return (
    <>
      {/* Sticky under the header, so a student six screens into the fees
          table can still switch to documents without scrolling back up. */}
      <div className="sticky top-[68px] z-30 border-b border-hairline bg-canvas/95 backdrop-blur-md xl:top-[90px]">
        <div className="mx-auto flex w-full max-w-[1240px] items-center gap-6 px-5 py-[11px] sm:px-8 lg:px-12">
          <div
            ref={listRef}
            role="tablist"
            aria-label={label}
            onKeyDown={onKeyDown}
            /* The track scrolls horizontally on narrow screens rather than
               wrapping to two rows, which would push the content down on
               every phone. The negative margins let it bleed to the screen
               edge while the pills keep their inset. */
            className="-mx-1 flex min-w-0 flex-1 snap-x gap-1 overflow-x-auto rounded-[13px] border border-hairline bg-white p-[5px] shadow-[0_10px_30px_-24px_rgba(1,22,111,0.5)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {tabs.map((tab) => {
              const selected = tab.id === active;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(tab.id)}
                  className={`inline-flex shrink-0 snap-start items-center gap-[9px] whitespace-nowrap rounded-[9px] px-[15px] py-[9px] text-[14px] font-semibold transition-colors duration-200 ${
                    selected
                      ? "bg-navy text-white shadow-[0_8px_18px_-10px_rgba(1,22,111,0.8)]"
                      : "text-muted hover:bg-canvas hover:text-navy"
                  }`}
                >
                  <span
                    aria-hidden
                    className={
                      selected
                        ? "text-white"
                        : "text-muted-light transition-colors group-hover:text-navy"
                    }
                  >
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* One hint, for the tab that is open. Five hints under five tabs
              made the bar two lines tall and asked the student to read the
              four answers they had not chosen. */}
          <p className="hidden shrink-0 text-[13px] font-medium text-muted-light xl:block">
            {openTab.hint}
          </p>
        </div>
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={tab.id !== active}
          tabIndex={0}
        >
          {tab.panel}
        </div>
      ))}
    </>
  );
}
