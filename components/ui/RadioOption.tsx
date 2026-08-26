type Props = {
  label: string;
  selected: boolean;
  onSelect: () => void;
  name: string;
  /** "quiet" is the /start treatment, where unpicked options recede. */
  tone?: "quiet" | "solid";
  className?: string;
  ringClassName?: string;
};

export function RadioOption({
  label,
  selected,
  onSelect,
  name,
  tone = "solid",
  className = "",
  ringClassName = "size-[27px]",
}: Props) {
  const quiet = tone === "quiet";
  const text = selected
    ? quiet
      ? "text-orange"
      : "text-ink"
    : quiet
      ? "text-faint"
      : "text-ink";
  const ring = selected
    ? quiet
      ? "border-orange"
      : "border-navy"
    : quiet
      ? "border-[#e2e2e7]"
      : "border-[#e0e3eb]";

  return (
    <label
      className={`group flex cursor-pointer items-center transition-colors duration-300 ${text} ${className}`}
    >
      <input
        type="radio"
        name={name}
        checked={selected}
        onChange={onSelect}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className={`relative flex shrink-0 items-center justify-center rounded-full border-[2px] transition-colors duration-300 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-[3px] peer-focus-visible:outline-blue-bright ${ring} ${ringClassName}`}
      >
        <span
          className={`rounded-full transition-all duration-300 ${
            selected
              ? `size-[46%] ${quiet ? "bg-orange" : "bg-navy"}`
              : "size-0 bg-transparent"
          }`}
        />
      </span>
      <span>{label}</span>
    </label>
  );
}
