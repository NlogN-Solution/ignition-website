/**
 * Sticky section index for the long guidance pages — the "where am I" half of
 * the navigation problem. Hidden below `xl`, where a sticky column would eat
 * the reading width; the headings themselves carry the structure there.
 */
export function OnThisPage({
  sections,
}: {
  sections: { id: string; label: string }[];
}) {
  return (
    <nav aria-label="On this page" className="hidden xl:block">
      <div className="sticky top-[calc(var(--nav-h)_+_2rem)]">
        <p className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-muted-light">
          On this page
        </p>
        <ul className="mt-4 space-y-[3px] border-l border-hairline">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="-ml-px block border-l-2 border-transparent py-[7px] pl-4 text-[14px] font-medium leading-[1.4] text-muted transition-colors duration-200 hover:border-orange hover:text-navy"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/** Standard two-column shell for a guide: index left, content right. */
export function GuideLayout({
  sections,
  children,
}: {
  sections: { id: string; label: string }[];
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-12 xl:grid-cols-[220px_minmax(0,1fr)] xl:gap-16">
      <OnThisPage sections={sections} />
      <div className="min-w-0 space-y-14">{children}</div>
    </div>
  );
}
