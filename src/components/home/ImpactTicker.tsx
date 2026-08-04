import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { useImpactMetrics } from "@/hooks/useOutreach";

const stats = [
  { key: "people_supported" as const, label: "people supported" },
  { key: "volunteers" as const, label: "volunteers" },
  { key: "brands" as const, label: "brand partners" },
  { key: "communities_reached" as const, label: "communities reached" },
];

export function ImpactTicker() {
  const { data, isLoading } = useImpactMetrics();

  return (
    <section className="container-page">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 sm:grid-cols-4 sm:gap-x-0">
        {stats.map(({ key, label }) => (
          <div key={key} className="border-l-[1.5px] border-ink px-6">
            <p className="font-display text-4xl font-extrabold leading-none tracking-tight text-ink sm:text-5xl lg:text-[72px]">
              {isLoading || !data ? "—" : <AnimatedNumber value={data[key]} />}
            </p>
            <p className="mt-2 font-mono text-[13px] uppercase text-ink-soft">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
