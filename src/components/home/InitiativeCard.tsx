import { Link } from "react-router-dom";

import { ProgressRing } from "@/components/ui/ProgressRing";
import { formatNaira, formatNumber } from "@/lib/format";
import type { Initiative } from "@/types";

const statusStyles: Record<Initiative["status"], string> = {
  active: "bg-primary text-cream",
  upcoming: "bg-secondary text-ink",
  completed: "bg-ink/10 text-ink-soft",
};

const statusLabels: Record<Initiative["status"], string> = {
  active: "Active",
  upcoming: "Upcoming",
  completed: "Completed",
};

export function InitiativeCard({ initiative }: { initiative: Initiative }) {
  const hasBeneficiaryTarget = Boolean(initiative.target_beneficiaries);

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-line bg-white">
      <div className="relative aspect-16/10 overflow-hidden bg-sage">
        {initiative.cover_image ? (
          <img
            src={initiative.cover_image}
            alt={initiative.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-lg font-bold text-primary/30">
            holdbodí
          </div>
        )}
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${statusStyles[initiative.status]}`}
        >
          {statusLabels[initiative.status]}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-bold text-ink">{initiative.title}</h3>
            <p className="mt-1.5 line-clamp-2 text-sm text-ink-soft">
              {initiative.description}
            </p>
          </div>
          <ProgressRing percentage={initiative.progress_percentage} />
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-line pt-4 text-sm">
          <div>
            <span className="block font-display font-bold text-ink">
              {hasBeneficiaryTarget
                ? `${formatNumber(initiative.beneficiaries_funded)} / ${formatNumber(initiative.target_beneficiaries as number)}`
                : formatNaira(initiative.amount_raised)}
            </span>
            <span className="text-xs text-ink-soft">
              {hasBeneficiaryTarget ? "beneficiaries funded" : "raised so far"}
            </span>
          </div>
          <Link
            to={`/donate?initiative=${initiative.slug}`}
            className="rounded-full bg-sage px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-cream"
          >
            Donate
          </Link>
        </div>
      </div>
    </div>
  );
}
