import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { InitiativeCard } from "@/components/home/InitiativeCard";
import { useInitiatives } from "@/hooks/useOutreach";
import { cx } from "@/lib/format";
import type { Initiative, InitiativeType } from "@/types";

type Filter = "all" | "in_progress" | "completed";

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "in_progress", label: "in progress" },
  { key: "completed", label: "completed" },
];

interface InitiativeTypePageProps {
  initiativeType: InitiativeType;
  eyebrow: string;
  headline: string;
  paragraphs: string[];
  ctaLabel: string;
  heroImage: string;
  heroImageAlt: string;
}

export function InitiativeTypePage({
  initiativeType,
  eyebrow,
  headline,
  paragraphs,
  ctaLabel,
  heroImage,
  heroImageAlt,
}: InitiativeTypePageProps) {
  const { data: initiatives, isLoading, isError } = useInitiatives();
  const [filter, setFilter] = useState<Filter>("all");

  const ofType = useMemo(
    () => (initiatives ?? []).filter((i) => i.initiative_type === initiativeType),
    [initiatives, initiativeType],
  );

  const runningNow = useMemo(
    () => ofType.filter((i) => i.status === "active" || i.status === "upcoming"),
    [ofType],
  );

  const filtered = useMemo(() => {
    if (filter === "all") return ofType;
    if (filter === "completed") return ofType.filter((i) => i.status === "completed");
    return ofType.filter((i) => i.status === "active" || i.status === "upcoming");
  }, [ofType, filter]);

  const [featured, ...rest] = filtered;

  // If there's exactly one initiative currently running, send the CTA straight
  // to its donate flow instead of the generic picker.
  const ctaHref =
    runningNow.length === 1 ? `/donate?initiative=${runningNow[0].slug}` : "/donate";

  return (
    <>
      <section className="relative overflow-hidden bg-primary-dark py-20 sm:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <span className="font-mono text-[13px] uppercase text-secondary">{eyebrow}</span>
            <h1 className="font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-cream/85 sm:text-5xl lg:text-[56px]">
              {headline}
            </h1>
            <div className="flex flex-col gap-4 font-body text-lg leading-relaxed text-cream/75">
              {paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <div>
              <Link
                to={ctaHref}
                className="mt-2 inline-flex items-center justify-center whitespace-nowrap rounded-full border-[1.5px] border-ink bg-secondary px-8 py-4 font-body text-base font-semibold text-ink shadow-[4px_4px_0_var(--color-ink)] transition-colors hover:bg-secondary-dark"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>

          <div className="relative h-64 overflow-hidden rounded-[28px] border-[1.5px] border-ink sm:h-80 lg:h-[420px]">
            <img src={heroImage} alt={heroImageAlt} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div className="flex max-w-xl flex-col gap-5">
              <span className="font-mono text-[13px] uppercase text-primary">
                currently running
              </span>
              <h2 className="font-display text-3xl font-extrabold leading-[1.04] tracking-tight text-ink sm:text-4xl">
                Where your support goes.
              </h2>
            </div>

            {ofType.length > 0 && (
              <div className="flex gap-2">
                {filters.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={cx(
                      "rounded-full border-[1.5px] border-ink px-5 py-2.5 font-mono text-[12.5px] uppercase transition-colors",
                      filter === f.key
                        ? "bg-primary text-cream/85"
                        : "bg-transparent text-ink hover:bg-ink/5",
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-14 flex flex-col gap-6">
            {isLoading &&
              Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 animate-pulse rounded-[22px] border-[1.5px] border-ink/20 bg-card"
                />
              ))}

            {isError && (
              <p className="rounded-2xl bg-card p-6 font-body text-sm text-ink-soft">
                We couldn't load initiatives right now. Please refresh the page.
              </p>
            )}

            {!isLoading && !isError && ofType.length === 0 && (
              <p className="rounded-2xl bg-card p-6 font-body text-sm text-ink-soft">
                Nothing running under this initiative right now — check back soon.
              </p>
            )}

            {!isLoading && ofType.length > 0 && filtered.length === 0 && (
              <p className="rounded-2xl bg-card p-6 font-body text-sm text-ink-soft">
                No initiatives match this filter right now.
              </p>
            )}

            {featured && <InitiativeCard initiative={featured} featured />}

            {rest.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((initiative: Initiative) => (
                  <InitiativeCard key={initiative.id} initiative={initiative} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
