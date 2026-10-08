"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CourseDetailsSidebar.module.css";

type CourseSection = { id: string; label: string; panel: React.ReactNode };

/** In-body navigation modelled on the Mastersportal reference. */
export function CourseDetailsSidebar({ sections }: { sections: CourseSection[] }) {
  const [active, setActive] = useState(sections[0].id);
  const navigation = useRef<HTMLDivElement>(null);
  const ids = sections.map((section) => section.id).join(",");

  useEffect(() => {
    function syncHash() {
      const hash = window.location.hash.slice(1);
      if (ids.split(",").includes(hash)) setActive(hash);
    }
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [ids]);

  function select(id: string) {
    setActive(id);
    window.history.replaceState(null, "", `#${id}`);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const current = sections.findIndex((section) => section.id === active);
    const next = event.key === "Home" ? 0
      : event.key === "End" ? sections.length - 1
      : (current + (event.key === "ArrowUp" ? -1 : 1) + sections.length) % sections.length;
    select(sections[next].id);
    navigation.current?.querySelectorAll<HTMLButtonElement>("button")[next]?.focus();
  }

  return (
    <div className={styles.layout}>
      <div ref={navigation} role="tablist" aria-label="Course information" aria-orientation="vertical" onKeyDown={onKeyDown} className={styles.sidebar}>
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            role="tab"
            id={`course-section-${section.id}`}
            aria-selected={active === section.id}
            aria-controls={`course-content-${section.id}`}
            tabIndex={active === section.id ? 0 : -1}
            onClick={() => select(section.id)}
            className={styles.item}
          >
            {section.label}
          </button>
        ))}
      </div>
      <div className={styles.content}>
        {sections.map((section) => (
          <div key={section.id} role="tabpanel" data-section={section.id} id={`course-content-${section.id}`} aria-labelledby={`course-section-${section.id}`} hidden={active !== section.id} tabIndex={0}>
            {section.panel}
          </div>
        ))}
      </div>
    </div>
  );
}
