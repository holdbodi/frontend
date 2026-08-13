import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { ShareButtons } from "@/components/ui/ShareButtons";
import { useInitiative } from "@/hooks/useOutreach";
import { formatNaira, formatNumber } from "@/lib/format";
import type { Initiative } from "@/types";

const badgeStyles: Record<Initiative["status"], string> = {
  active: "bg-secondary border-ink text-ink",
  upcoming: "bg-transparent border-ink text-ink",
  completed: "border-cream/85 bg-primary-dark text-cream/85",
};

const badgeLabels: Record<Initiative["status"], string> = {
  active: "in progress",
  upcoming: "upcoming",
  completed: "completed",
};

const progressFill: Record<Initiative["status"], string> = {
  active: "bg-secondary",
  upcoming: "bg-ink/30",
  completed: "bg-primary",
};

function formatDate(value: string | null): string | null {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function InitiativeDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: initiative, isLoading, isError } = useInitiative(slug);

  if (isLoading) {
    return (
      <section className="py-16 sm:py-24">
        <div className="container-page max-w-4xl">
          <div className="h-6 w-40 animate-pulse rounded-full bg-card" />
          <div className="mt-8 h-72 animate-pulse rounded-[28px] bg-card sm:h-[420px]" />
          <div className="mt-8 h-10 w-2/3 animate-pulse rounded-full bg-card" />
          <div className="mt-4 h-24 animate-pulse rounded-2xl bg-card" />
        </div>
      </section>
    );
  }

  if (isError || !initiative) {
    return (
      <section className="flex min-h-[60vh] items-center py-16">
        <div className="container-page max-w-md text-center">
          <h1 className="font-display text-2xl font-bold text-ink">
            We couldn't find that initiative.
          </h1>
          <p className="mt-2 text-ink-soft">
            It may have been removed, or the link might be incorrect.
          </p>
          <Link
            to="/#initiatives"
            className="mt-8 inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink px-6 py-3 font-body text-sm font-semibold text-ink hover:bg-ink/5"
          >
            <ArrowLeft size={16} />
            Back to initiatives
          </Link>
        </div>
      </section>
    );
  }

  const hasTarget = Boolean(initiative.target_amount);
  const metaLabel = initiative.event_tag
    ? initiative.event_tag.replace(/_/g, " ")
    : initiative.initiative_type === "sara"
      ? "nationwide"
      : "outreach";
  const startDate = formatDate(initiative.start_date);
  const endDate = formatDate(initiative.end_date);

  const stats = [
    {
      label: hasTarget ? "raised" : "beneficiaries funded",
      value: hasTarget
        ? formatNaira(initiative.amount_raised)
        : formatNumber(initiative.beneficiaries_funded),
    },
    {
      label: hasTarget ? "target" : "target beneficiaries",
      value: hasTarget
        ? formatNaira(initiative.target_amount as string)
        : initiative.target_beneficiaries
          ? formatNumber(initiative.target_beneficiaries)
          : "—",
    },
    {
      label: "total donations",
      value: formatNumber(initiative.donations_count),
    },
    {
      label: "funded",
      value: `${Math.round(initiative.progress_percentage)}%`,
    },
  ];

  return (
    <section className="py-12 sm:py-20">
      <div className="container-page max-w-4xl">
        <Link
          to="/#initiatives"
          className="inline-flex items-center gap-2 font-mono text-[13px] uppercase text-ink-soft transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} />
          Back to initiatives
        </Link>

        <div className="relative mt-8 h-72 overflow-hidden rounded-[28px] border-[1.5px] border-ink bg-ink/10 sm:h-[420px]">
          {initiative.cover_image ? (
            <img
              src={initiative.cover_image}
              alt={initiative.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-display text-2xl font-bold text-ink/20">
              holdbodí
            </div>
          )}
          <span
            className={`absolute left-7 top-7 rounded-full border-[1.5px] px-4 py-2 font-mono text-[12.5px] uppercase ${badgeStyles[initiative.status]}`}
          >
            {badgeLabels[initiative.status]}
          </span>
        </div>

        <div className="mt-8 flex flex-col gap-2.5">
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-[13px] uppercase text-meta">
            <span>{metaLabel}</span>
            {startDate && (
              <>
                <span className="text-secondary">•</span>
                <span>
                  {startDate}
                  {endDate && endDate !== startDate ? ` – ${endDate}` : ""}
                </span>
              </>
            )}
          </div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {initiative.title}
          </h1>
        </div>

        <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
          {initiative.detailed_description || initiative.description}
        </p>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-y-[1.5px] border-ink py-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border-l-[1.5px] border-ink pl-5">
              <p className="font-display text-2xl font-extrabold leading-none text-ink sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-2 font-mono text-[12px] uppercase text-ink-soft">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3.5">
          <div className="h-3 w-full overflow-hidden rounded-full border border-ink bg-card">
            <div
              className={`h-full rounded-full ${progressFill[initiative.status]}`}
              style={{ width: `${Math.max(initiative.progress_percentage, 2)}%` }}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
          {initiative.status !== "completed" && (
            <Link
              to={`/donate?initiative=${initiative.slug}`}
              className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full border-[1.5px] border-ink bg-secondary px-8 py-4 font-body text-base font-semibold text-ink shadow-[4px_4px_0_var(--color-ink)] transition-colors hover:bg-secondary-dark"
            >
              Donate to this initiative
            </Link>
          )}

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <p className="font-mono text-xs uppercase text-ink-soft">
              Share this initiative
            </p>

            <ShareButtons
              url={`${window.location.origin}/initiatives/${initiative.slug}`}
              text={`Support ${initiative.title} on holdbodí — help make food access easier across Nigeria.`}
              className="justify-start sm:justify-end"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
