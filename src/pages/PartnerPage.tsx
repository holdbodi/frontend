import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Field";
import { useCreatePartner, useInitiatives } from "@/hooks/useOutreach";
import { getApiErrorMessage } from "@/lib/api";

const partnerSchema = z.object({
  companyName: z.string().min(2, "Enter your company name."),
  contactPerson: z.string().min(2, "Enter a contact person."),
  email: z.email("Enter a valid email."),
  phoneNumber: z.string().min(7, "Enter a valid phone number."),
  supportType: z.enum(["funding", "food_items", "product_support", "other"], {
    error: "Select a support type.",
  }),
  estimatedContribution: z.string().optional(),
  initiative: z.string().optional(),
});

type PartnerForm = z.infer<typeof partnerSchema>;

export function PartnerPage() {
  const createPartner = useCreatePartner();
  const { data: initiatives } = useInitiatives();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PartnerForm>({ resolver: zodResolver(partnerSchema) });

  const onSubmit = async (values: PartnerForm) => {
    try {
      await createPartner.mutateAsync({
        company_name: values.companyName,
        contact_person: values.contactPerson,
        email: values.email,
        phone_number: values.phoneNumber,
        support_type: values.supportType,
        estimated_contribution: values.estimatedContribution,
        initiatives: values.initiative ? [values.initiative] : undefined,
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "We couldn't submit your application. Please try again."));
    }
  };

  if (createPartner.isSuccess) {
    return (
      <section className="flex min-h-[70vh] items-center py-16">
        <div className="container-page max-w-md text-center">
          <CheckCircle2 className="mx-auto text-primary" size={48} />
          <h1 className="mt-4 font-display text-2xl font-bold text-ink">
            Thanks for reaching out!
          </h1>
          <p className="mt-2 text-ink-soft">
            Our partnerships team will be in touch shortly to discuss next steps.
          </p>
          <Link to="/" className="mt-8 inline-block">
            <Button variant="outline">Back to home</Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24">
      <div className="container-page max-w-xl">
        <span className="text-sm font-bold uppercase tracking-wide text-primary">
          Partner with us
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Bring your brand into the fold.
        </h1>
        <p className="mt-3 text-ink-soft">
          Support through funding, food items, product support, or another
          arrangement that fits your brand.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 flex flex-col gap-5">
          <Field label="Company name" htmlFor="companyName" error={errors.companyName?.message} required>
            <Input id="companyName" {...register("companyName")} />
          </Field>

          <Field label="Contact person" htmlFor="contactPerson" error={errors.contactPerson?.message} required>
            <Input id="contactPerson" {...register("contactPerson")} />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Email address" htmlFor="email" error={errors.email?.message} required>
              <Input id="email" type="email" {...register("email")} />
            </Field>
            <Field label="Phone number" htmlFor="phoneNumber" error={errors.phoneNumber?.message} required>
              <Input id="phoneNumber" {...register("phoneNumber")} />
            </Field>
          </div>

          <Field label="Support type" htmlFor="supportType" error={errors.supportType?.message} required>
            <Select id="supportType" defaultValue="" {...register("supportType")}>
              <option value="" disabled>
                Select a support type
              </option>
              <option value="funding">Funding</option>
              <option value="food_items">Food items</option>
              <option value="product_support">Product support</option>
              <option value="other">Other</option>
            </Select>
          </Field>

          <Field label="Estimated contribution" htmlFor="estimatedContribution" hint="e.g. ₦2,000,000 or 500 bags of rice.">
            <Input id="estimatedContribution" {...register("estimatedContribution")} />
          </Field>

          <Field label="Initiative you'd like to support" htmlFor="initiative" hint="Optional.">
            <Select id="initiative" defaultValue="" {...register("initiative")}>
              <option value="">No preference</option>
              {initiatives?.map((initiative) => (
                <option key={initiative.slug} value={initiative.slug}>
                  {initiative.title}
                </option>
              ))}
            </Select>
          </Field>

          <Button type="submit" size="lg" isLoading={createPartner.isPending} className="mt-2">
            Submit application
          </Button>
        </form>
      </div>
    </section>
  );
}
