/**
 * Facet counting for the client-side explorers.
 *
 * A filter option that returns nothing is a trap: a student clicks it, the
 * list empties, and the only way back is to remember what they changed. The
 * fix is to count each option against the set that every *other* filter has
 * already narrowed, show that number beside the option, and disable the ones
 * that would land on zero. The count is the affordance — it says what the
 * click is worth before the click happens.
 *
 * Every explorer therefore builds its results in two steps: a `subset(except)`
 * that applies all filters bar one, and this helper over the result. The cost
 * is O(items x options) per facet, which over catalogues of a few dozen is
 * nothing. When the data outgrows that, both move behind a real index.
 */
export function facetCounts<T, V extends string>(
  items: readonly T[],
  options: readonly V[],
  matches: (item: T, option: V) => boolean,
): Record<V, number> {
  const counts = Object.fromEntries(options.map((option) => [option, 0])) as Record<V, number>;

  for (const item of items) {
    for (const option of options) {
      if (matches(item, option)) counts[option] += 1;
    }
  }

  return counts;
}
