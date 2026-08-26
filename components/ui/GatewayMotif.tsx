/**
 * The gateway, reduced to line work.
 *
 * The hero's photographic arch is the brand's central image — a student on a
 * path, walking through an opening toward an orange arrow. It carries the
 * whole product's argument, and then the page below it drops the idea
 * entirely. This is that arch as a watermark: nested openings receding to a
 * vanishing point, a path running out toward the viewer, and the arrow at the
 * centre.
 *
 * Drawn rather than photographed, because at watermark opacity a photograph is
 * just noise — and because this costs about a kilobyte instead of the two
 * megabytes the hero plate weighs. Purely decorative: `aria-hidden`, and it
 * never carries meaning that is not also in the text beside it.
 */
export function GatewayMotif({ className = "" }: { className?: string }) {
  // Four openings, receding. Each is inset from the last and drawn fainter, so
  // the eye reads depth rather than four concentric outlines.
  const arches = [
    { inset: 0, y: 34, opacity: 0.5 },
    { inset: 34, y: 62, opacity: 0.36 },
    { inset: 66, y: 88, opacity: 0.24 },
    { inset: 96, y: 112, opacity: 0.14 },
  ];

  return (
    <svg
      viewBox="0 0 420 320"
      fill="none"
      aria-hidden
      focusable="false"
      className={className}
    >
      {arches.map(({ inset, y, opacity }) => {
        const left = 40 + inset;
        const right = 380 - inset;
        const radius = (right - left) / 2;

        return (
          <path
            key={inset}
            d={`M ${left} 300 V ${y + radius} A ${radius} ${radius} 0 0 1 ${right} ${y + radius} V 300`}
            stroke="currentColor"
            strokeOpacity={opacity}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        );
      })}

      {/* The path, widening as it comes forward out of the opening. */}
      <path
        d="M 196 214 L 150 300 M 224 214 L 270 300"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M 205 214 L 186 300 M 215 214 L 234 300"
        stroke="currentColor"
        strokeOpacity="0.16"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* The arrow at the centre — the one place the motif is not monochrome,
          matching the orange terminus used everywhere else on the page. */}
      <path
        d="M 210 196 V 132 M 210 126 l -13 15 M 210 126 l 13 15"
        stroke="var(--color-orange)"
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
