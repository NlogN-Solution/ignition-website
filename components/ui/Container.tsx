/**
 * The horizontal rhythm for scrolling content pages. The hero and other
 * full-viewport screens keep their own bespoke padding; everything editorial
 * hangs off this so section edges line up down the page.
 */
export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12 ${className}`}
    >
      {children}
    </div>
  );
}
