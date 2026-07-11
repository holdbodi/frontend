import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { useCreateFoodDonation } from "@/hooks/useOutreach";
import { getApiErrorMessage } from "@/lib/api";

const foodDonationSchema = z.object({
  fullName: z.string().min(2, "Enter your full name or organisation name."),
  email: z.email("Enter a valid email."),
  phoneNumber: z.string().min(7, "Enter a valid phone number."),
  foodItem: z.string().min(2, "Enter the food item you're donating."),
  quantity: z.string().min(1, "Enter a quantity, e.g. '50 bags of rice'."),
  deliveryOption: z.enum(["pickup", "delivery"], { error: "Select an option." }),
  preferredDate: z.string().min(1, "Select a preferred date."),
  additionalNotes: z.string().optional(),
});

type FoodDonationForm = z.infer<typeof foodDonationSchema>;

export function FoodDonationPage() {
  const createFoodDonation = useCreateFoodDonation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FoodDonationForm>({ resolver: zodResolver(foodDonationSchema) });

  const onSubmit = async (values: FoodDonationForm) => {
    try {
      await createFoodDonation.mutateAsync({
        full_name: values.fullName,
        email: values.email,
        phone_number: values.phoneNumber,
        food_item: values.foodItem,
        quantity: values.quantity,
        delivery_option: values.deliveryOption,
        preferred_date: values.preferredDate,
        additional_notes: values.additionalNotes,
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "We couldn't submit your pledge. Please try again."));
    }
  };

  if (createFoodDonation.isSuccess) {
    return (
      <section className="flex min-h-[70vh] items-center py-16">
        <div className="container-page max-w-md text-center">
          <CheckCircle2 className="mx-auto text-primary" size={48} />
          <h1 className="mt-4 font-display text-2xl font-bold text-ink">
            Pledge received — thank you!
          </h1>
          <p className="mt-2 text-ink-soft">
            Our team will reach out shortly to coordinate pickup or delivery.
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
          Donate food items
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Give directly — rice, grains, and more.
        </h1>
        <p className="mt-3 text-ink-soft">
          Pledge a food item donation and we'll coordinate pickup or delivery with you.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 flex flex-col gap-5">
          <Field label="Full name / organisation name" htmlFor="fullName" error={errors.fullName?.message} required>
            <Input id="fullName" {...register("fullName")} />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Email address" htmlFor="email" error={errors.email?.message} required>
              <Input id="email" type="email" {...register("email")} />
            </Field>
            <Field label="Phone number" htmlFor="phoneNumber" error={errors.phoneNumber?.message} required>
              <Input id="phoneNumber" {...register("phoneNumber")} />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Food item" htmlFor="foodItem" error={errors.foodItem?.message} required>
              <Input id="foodItem" placeholder="e.g. Rice, Garri" {...register("foodItem")} />
            </Field>
            <Field label="Quantity" htmlFor="quantity" error={errors.quantity?.message} required>
              <Input id="quantity" placeholder="e.g. 50 bags" {...register("quantity")} />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Pickup or delivery"
              htmlFor="deliveryOption"
              error={errors.deliveryOption?.message}
              required
            >
              <Select id="deliveryOption" defaultValue="" {...register("deliveryOption")}>
                <option value="" disabled>
                  Select an option
                </option>
                <option value="pickup">Pickup</option>
                <option value="delivery">Delivery</option>
              </Select>
            </Field>
            <Field label="Preferred date" htmlFor="preferredDate" error={errors.preferredDate?.message} required>
              <Input id="preferredDate" type="date" {...register("preferredDate")} />
            </Field>
          </div>

          <Field label="Additional notes" htmlFor="additionalNotes">
            <Textarea id="additionalNotes" placeholder="Anything else we should know?" {...register("additionalNotes")} />
          </Field>

          <Button type="submit" size="lg" isLoading={createFoodDonation.isPending} className="mt-2">
            Submit pledge
          </Button>
        </form>
      </div>
    </section>
  );
}
