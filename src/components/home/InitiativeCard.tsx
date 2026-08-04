import { Link } from "react-router-dom";

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

interface InitiativeCardProps {
  initiative: Initiative;
  featured?: boolean;
}

export function InitiativeCard({ initiative, featured = false }: InitiativeCardProps) {
  const hasTarget = Boolean(initiative.target_amount);
  const metaLabel = initiative.event_tag
    ? initiative.event_tag.replace(/_/g, " ")
    : initiative.initiative_type === "sara"
      ? "nationwide"
      : "outreach";

  return (
    <div
      className={`flex overflow-hidden rounded-[22px] border-[1.5px] border-ink bg-card ${
        featured ? "flex-col lg:flex-row" : "flex-col"
      }`}
    >
      <div
        className={`relative shrink-0 bg-ink/10 ${
          featured ? "h-56 lg:h-auto lg:w-[60%]" : "h-56"
        }`}
      >
        {initiative.cover_image ? (
          <img
            src={initiative.cover_image}
            alt={initiative.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-lg font-bold text-ink/20">
            holdbodí
          </div>
        )}
        <span
          className={`absolute left-6 top-6 rounded-full border-[1.5px] px-4 py-2 font-mono text-[12.5px] uppercase ${badgeStyles[initiative.status]}`}
        >
          {badgeLabels[initiative.status]}
        </span>
      </div>

      <div className={`flex flex-1 flex-col gap-7 p-6 ${featured ? "lg:p-11" : ""}`}>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5 font-mono text-[13px] uppercase text-meta">
            {featured && (
              <>
                <span>featured</span>
                <span className="text-secondary">•</span>
              </>
            )}
            <span>{metaLabel}</span>
          </div>
          <h3
            className={`font-display font-extrabold tracking-tight text-ink ${
              featured ? "text-3xl sm:text-4xl" : "text-xl"
            }`}
          >
            {initiative.title}
          </h3>
          {featured && (
            <p className="mt-1 font-body text-base leading-relaxed text-ink-soft">
              {initiative.description}
            </p>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-3.5">
          <div className="h-3 w-full overflow-hidden rounded-full border border-ink bg-cream">
            <div
              className={`h-full rounded-full ${progressFill[initiative.status]}`}
              style={{ width: `${Math.max(initiative.progress_percentage, 2)}%` }}
            />
          </div>
          <div className="flex items-end justify-between">
            <div className="flex items-end gap-2">
              <span className={`font-display font-bold text-primary ${featured ? "text-2xl" : "text-lg"}`}>
                {hasTarget
                  ? formatNaira(initiative.amount_raised)
                  : formatNumber(initiative.beneficiaries_funded)}
              </span>
              <span className="pb-0.5 font-body text-sm text-meta">
                {hasTarget
                  ? `of ${formatNaira(initiative.target_amount as string)}`
                  : initiative.target_beneficiaries
                    ? `of ${formatNumber(initiative.target_beneficiaries)} beneficiaries`
                    : "beneficiaries funded"}
              </span>
            </div>
            <span className="font-mono text-xs uppercase text-ink-soft">
              {Math.round(initiative.progress_percentage)}% funded
            </span>
          </div>
        </div>

        <Link
          to={`/donate?initiative=${initiative.slug}`}
          className="inline-flex items-center justify-center rounded-full border-[1.5px] border-ink bg-primary px-6 py-3 font-body text-sm font-semibold text-cream/85 transition-colors hover:bg-primary-dark"
        >
          Donate to this initiative
        </Link>
      </div>
    </div>
  );
}
