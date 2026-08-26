/**
 * Ignition headlines end on an orange full stop or question mark — "Different
 * dreams.", "Where are you today?". Rather than hand-writing that span on
 * every new heading, this splits the trailing punctuation off and colours it,
 * so the device stays consistent as the site grows.
 */
export function AccentText({ children }: { children: string }) {
  const match = children.match(/^(.*?)([.?!]+)$/s);

  if (!match) return <>{children}</>;

  return (
    <>
      {match[1]}
      <span className="text-orange">{match[2]}</span>
    </>
  );
}
