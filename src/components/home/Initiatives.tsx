import { useMemo, useState } from "react";

import { InitiativeCard } from "@/components/home/InitiativeCard";
import { useInitiatives } from "@/hooks/useOutreach";
import { cx } from "@/lib/format";

type Filter = "all" | "in_progress" | "completed";

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "in_progress", label: "in progress" },
  { key: "completed", label: "completed" },
];

export function Initiatives() {
  const { data: initiatives, isLoading, isError } = useInitiatives();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (!initiatives) return [];
    if (filter === "all") return initiatives;
    if (filter === "completed") return initiatives.filter((i) => i.status === "completed");
    return initiatives.filter((i) => i.status === "active" || i.status === "upcoming");
  }, [initiatives, filter]);

  const [featured, ...rest] = filtered;

  return (
    <section id="initiatives" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="flex max-w-xl flex-col gap-5">
            <span className="font-mono text-[13px] uppercase text-primary">
              03 — initiatives
            </span>
            <h2 className="font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-ink sm:text-5xl">
              See exactly where your support goes.
            </h2>
          </div>

          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={cx(
                  "rounded-full border-[1.5px] border-ink px-5 py-2.5 font-mono text-[12.5px] uppercase transition-colors",
                  filter === f.key ? "bg-primary text-cream/85" : "bg-transparent text-ink hover:bg-ink/5",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6">
          {isLoading &&
            Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-[22px] border-[1.5px] border-ink/20 bg-card" />
            ))}

          {isError && (
            <p className="rounded-2xl bg-card p-6 font-body text-sm text-ink-soft">
              We couldn't load initiatives right now. Please refresh the page.
            </p>
          )}

          {!isLoading && filtered.length === 0 && (
            <p className="rounded-2xl bg-card p-6 font-body text-sm text-ink-soft">
              No initiatives match this filter right now.
            </p>
          )}

          {featured && <InitiativeCard initiative={featured} featured />}

          {rest.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((initiative) => (
                <InitiativeCard key={initiative.id} initiative={initiative} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
