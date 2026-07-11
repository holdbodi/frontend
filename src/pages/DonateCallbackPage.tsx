import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { useVerifyDonation } from "@/hooks/useOutreach";
import { formatNaira } from "@/lib/format";

export function DonateCallbackPage() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference") ?? searchParams.get("trxref") ?? undefined;
  const { data, isLoading, isError } = useVerifyDonation(reference);

  return (
    <section className="flex min-h-[70vh] items-center py-16">
      <div className="container-page max-w-md text-center">
        {!reference && (
          <>
            <XCircle className="mx-auto text-ink-soft" size={48} />
            <h1 className="mt-4 font-display text-2xl font-bold text-ink">
              No donation reference found.
            </h1>
            <p className="mt-2 text-ink-soft">
              If you completed a payment, check your email for a receipt.
            </p>
          </>
        )}

        {reference && isLoading && (
          <>
            <Loader2 className="mx-auto animate-spin text-primary" size={48} />
            <h1 className="mt-4 font-display text-2xl font-bold text-ink">
              Confirming your donation…
            </h1>
            <p className="mt-2 text-ink-soft">This should only take a moment.</p>
          </>
        )}

        {reference && !isLoading && isError && (
          <>
            <XCircle className="mx-auto text-red-600" size={48} />
            <h1 className="mt-4 font-display text-2xl font-bold text-ink">
              We couldn't confirm this donation.
            </h1>
            <p className="mt-2 text-ink-soft">
              If you were charged, please contact us with reference{" "}
              <span className="font-mono">{reference}</span>.
            </p>
          </>
        )}

        {reference && !isLoading && data && (
          <>
            {data.status === "successful" ? (
              <>
                <CheckCircle2 className="mx-auto text-primary" size={48} />
                <h1 className="mt-4 font-display text-2xl font-bold text-ink">
                  Thank you, {data.display_name}!
                </h1>
                <p className="mt-2 text-ink-soft">
                  Your donation of {formatNaira(data.amount)} will support{" "}
                  {data.beneficiaries_supported} beneficiar
                  {data.beneficiaries_supported === 1 ? "y" : "ies"}.
                </p>
              </>
            ) : (
              <>
                <XCircle className="mx-auto text-secondary-dark" size={48} />
                <h1 className="mt-4 font-display text-2xl font-bold text-ink">
                  Payment {data.status}.
                </h1>
                <p className="mt-2 text-ink-soft">
                  Your donation wasn't completed. No charge should have been made.
                </p>
              </>
            )}
          </>
        )}

        <Link to="/" className="mt-8 inline-block">
          <Button variant="outline">Back to home</Button>
        </Link>
      </div>
    </section>
  );
}
