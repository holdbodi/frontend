const items = [
  "Donate",
  "Volunteer",
  "Partner",
  "Donate",
  "Volunteer",
  "Partner",
  "Donate",
  "Volunteer",
  "Partner",
  "Donate",
  "Volunteer",
  "Partner",
];

function TickerContent() {
  return (
    <div className="flex shrink-0 items-center gap-3 pr-3">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-3">
          <span className="whitespace-nowrap font-mono text-[13px] uppercase text-cream">
            {item}
          </span>
          <span aria-hidden className="text-secondary">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="overflow-hidden bg-primary-dark py-3">
      <div className="flex w-max animate-marquee">
        <TickerContent />
        <TickerContent />
      </div>
    </div>
  );
}
