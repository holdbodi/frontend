import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Field";
import { useCreateDonation, useInitiatives } from "@/hooks/useOutreach";
import { getApiErrorMessage } from "@/lib/api";
import { formatNaira } from "@/lib/format";

const TIERS = [
  { label: "Feed 1 person", amount: 3000 },
  { label: "Feed 5 people", amount: 15000 },
  { label: "Feed 10 people", amount: 30000 },
  { label: "Feed 20 people", amount: 60000 },
  { label: "Feed 50 people", amount: 150000 },
];

const donateSchema = z
  .object({
    initiative: z.string().min(1, "Please choose an initiative."),
    amount: z.coerce.number({ error: "Enter a valid amount." }).min(100, "Minimum donation is ₦100."),
    isAnonymous: z.boolean(),
    donorName: z.string().optional(),
    donorEmail: z.email("Enter a valid email.").optional().or(z.literal("")),
    donorPhone: z.string().optional(),
  })
  .refine((data) => data.isAnonymous || Boolean(data.donorEmail), {
    message: "Email is required unless donating anonymously.",
    path: ["donorEmail"],
  });

type DonateFormInput = z.input<typeof donateSchema>;
type DonateForm = z.output<typeof donateSchema>;

export function DonatePage() {
  const [searchParams] = useSearchParams();
  const preselected = searchParams.get("initiative") ?? "";
  const { data: initiatives, isLoading: loadingInitiatives } = useInitiatives();
  const createDonation = useCreateDonation();
  const [customAmount, setCustomAmount] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DonateFormInput, unknown, DonateForm>({
    resolver: zodResolver(donateSchema),
    defaultValues: {
      initiative: preselected,
      amount: 3000,
      isAnonymous: false,
      donorName: "",
      donorEmail: "",
      donorPhone: "",
    },
  });

  const isAnonymous = watch("isAnonymous");
  const amount = watch("amount");

  const donatableInitiatives = useMemo(
    () => (initiatives ?? []).filter((i) => i.status !== "completed"),
    [initiatives],
  );

  const onSubmit = async (values: DonateForm) => {
    try {
      const response = await createDonation.mutateAsync({
        initiative: values.initiative,
        amount: String(values.amount),
        is_anonymous: values.isAnonymous,
        donor_name: values.isAnonymous ? undefined : values.donorName,
        donor_email: values.donorEmail || undefined,
        donor_phone: values.isAnonymous ? undefined : values.donorPhone,
      });

      if (response.payment_url) {
        window.location.href = response.payment_url;
      } else {
        toast.error("Something went wrong starting your payment. Please try again.");
      }
    } catch (error) {
      toast.error(getApiErrorMessage(error, "We couldn't start your donation. Please try again."));
    }
  };

  return (
    <section className="py-16 sm:py-24">
      <div className="container-page max-w-xl">
        <span className="text-sm font-bold uppercase tracking-wide text-primary">Donate</span>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Every ₦3,000 supports one beneficiary.
        </h1>
        <p className="mt-3 text-ink-soft">
          Choose an initiative, pick an amount, and pay securely via Paystack.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 flex flex-col gap-6">
          <Field label="Select an initiative" htmlFor="initiative" error={errors.initiative?.message} required>
            <Select id="initiative" {...register("initiative")} disabled={loadingInitiatives}>
              <option value="">
                {loadingInitiatives ? "Loading initiatives…" : "Choose an initiative"}
              </option>
              {donatableInitiatives.map((initiative) => (
                <option key={initiative.slug} value={initiative.slug}>
                  {initiative.title}
                </option>
              ))}
            </Select>
          </Field>

          <div>
            <span className="text-sm font-medium text-ink">
              Contribution amount <span className="text-primary">*</span>
            </span>
            <div className="mt-2 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {TIERS.map((tier) => (
                <button
                  type="button"
                  key={tier.amount}
                  onClick={() => {
                    setCustomAmount(false);
                    setValue("amount", tier.amount, { shouldValidate: true });
                  }}
                  className={`rounded-xl border px-3 py-3 text-left text-sm transition-colors ${
                    !customAmount && amount === tier.amount
                      ? "border-primary bg-sage"
                      : "border-line bg-white hover:border-primary/40"
                  }`}
                >
                  <span className="block font-semibold text-ink">{tier.label}</span>
                  <span className="text-xs text-ink-soft">{formatNaira(tier.amount)}</span>
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCustomAmount(true)}
                className={`rounded-xl border px-3 py-3 text-left text-sm transition-colors ${
                  customAmount ? "border-primary bg-sage" : "border-line bg-white hover:border-primary/40"
                }`}
              >
                <span className="block font-semibold text-ink">Custom amount</span>
                <span className="text-xs text-ink-soft">Choose your own</span>
              </button>
            </div>
            {customAmount && (
              <div className="mt-3">
                <Input
                  type="number"
                  min={100}
                  step={100}
                  placeholder="Enter amount in Naira"
                  {...register("amount")}
                />
              </div>
            )}
            {errors.amount && (
              <p className="mt-1.5 text-xs font-medium text-red-700">{errors.amount.message}</p>
            )}
          </div>

          <label className="flex items-center gap-2.5 text-sm text-ink">
            <input type="checkbox" className="h-4 w-4 accent-primary" {...register("isAnonymous")} />
            Donate anonymously
          </label>

          {!isAnonymous && (
            <>
              <Field label="Full name" htmlFor="donorName">
                <Input id="donorName" placeholder="Your name" {...register("donorName")} />
              </Field>
              <Field label="Phone number" htmlFor="donorPhone">
                <Input id="donorPhone" placeholder="080..." {...register("donorPhone")} />
              </Field>
            </>
          )}

          <Field
            label="Email address"
            htmlFor="donorEmail"
            error={errors.donorEmail?.message}
            required={!isAnonymous}
            hint={isAnonymous ? "Optional — only used to send your receipt." : undefined}
          >
            <Input id="donorEmail" type="email" placeholder="you@example.com" {...register("donorEmail")} />
          </Field>

          <Button type="submit" size="lg" isLoading={createDonation.isPending} className="mt-2">
            Continue to payment
          </Button>
        </form>
      </div>
    </section>
  );
}
