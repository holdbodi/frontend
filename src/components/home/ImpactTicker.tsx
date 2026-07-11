import { HandHeart, MapPin, Store, Users } from "lucide-react";

import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { useImpactMetrics } from "@/hooks/useOutreach";

const stats = [
  { key: "people_supported" as const, label: "People supported", icon: HandHeart },
  { key: "volunteers" as const, label: "Volunteers", icon: Users },
  { key: "brands" as const, label: "Brand partners", icon: Store },
  { key: "communities_reached" as const, label: "Communities reached", icon: MapPin },
];

export function ImpactTicker() {
  const { data, isLoading } = useImpactMetrics();

  return (
    <section className="relative bg-primary-dark">
      <div className="container-page grid grid-cols-2 divide-x divide-cream/15 py-8 lg:grid-cols-4">
        {stats.map(({ key, label, icon: Icon }) => (
          <div key={key} className="flex flex-col items-center gap-1.5 px-4 text-center">
            <Icon className="mb-1 text-secondary" size={22} />
            <span className="font-display text-2xl font-extrabold text-cream sm:text-3xl">
              {isLoading || !data ? "—" : <AnimatedNumber value={data[key]} />}
            </span>
            <span className="text-xs font-medium text-cream/70 sm:text-sm">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
