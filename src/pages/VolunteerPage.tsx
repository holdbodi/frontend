import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckCircle2, Upload } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Field";
import { useCreateVolunteer } from "@/hooks/useOutreach";
import { getApiErrorMessage } from "@/lib/api";

const MAX_PHOTO_BYTES = 50 * 1024 * 1024;

const volunteerSchema = z.object({
  fullName: z.string().min(2, "Enter your full name."),
  email: z.email("Enter a valid email."),
  phoneNumber: z.string().min(7, "Enter a valid phone number."),
  location: z.string().min(2, "Enter your location."),
  occupation: z.string().min(2, "Enter your occupation."),
  skills: z.string().optional(),
  availability: z.enum(["weekends", "weekdays", "flexible", "specific_dates"], {
    error: "Select your availability.",
  }),
  specificDates: z.string().optional(),
  profilePhoto: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, "Profile photo is required.")
    .refine((files) => files[0]?.size <= MAX_PHOTO_BYTES, "Photo must be under 15MB."),
});

type VolunteerForm = z.infer<typeof volunteerSchema>;

export function VolunteerPage() {
  const createVolunteer = useCreateVolunteer();
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<VolunteerForm>({
    resolver: zodResolver(volunteerSchema),
  });

  const availability = watch("availability");
  const photoRegister = register("profilePhoto");

  const onSubmit = async (values: VolunteerForm) => {
    try {
      await createVolunteer.mutateAsync({
        full_name: values.fullName,
        email: values.email,
        phone_number: values.phoneNumber,
        location: values.location,
        occupation: values.occupation,
        skills: (values.skills ?? "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        availability: values.availability,
        specific_dates:
          values.availability === "specific_dates"
            ? (values.specificDates ?? "").split(",").map((d) => d.trim()).filter(Boolean)
            : undefined,
        profile_photo: values.profilePhoto[0],
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "We couldn't submit your registration. Please try again."));
    }
  };

  if (createVolunteer.isSuccess) {
    return (
      <section className="flex min-h-[70vh] items-center py-16">
        <div className="container-page max-w-md text-center">
          <CheckCircle2 className="mx-auto text-primary" size={48} />
          <h1 className="mt-4 font-display text-2xl font-bold text-ink">
            Thanks for signing up!
          </h1>
          <p className="mt-2 text-ink-soft">
            We've received your volunteer registration and will reach out with next steps.
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
        <span className="text-sm font-bold uppercase tracking-wide text-primary">Volunteer</span>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Give your time, coordinate real impact.
        </h1>
        <p className="mt-3 text-ink-soft">
          Volunteers support logistics, packaging, and distribution on the ground.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 flex flex-col gap-5">
          <Field label="Full name" htmlFor="fullName" error={errors.fullName?.message} required>
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
            <Field label="Location" htmlFor="location" error={errors.location?.message} required>
              <Input id="location" placeholder="e.g. Lagos" {...register("location")} />
            </Field>
            <Field label="Occupation" htmlFor="occupation" error={errors.occupation?.message} required>
              <Input id="occupation" {...register("occupation")} />
            </Field>
          </div>

          <Field label="Skills" htmlFor="skills" hint="Separate multiple skills with commas.">
            <Input id="skills" placeholder="e.g. Logistics, First Aid" {...register("skills")} />
          </Field>

          <Field label="Availability" htmlFor="availability" error={errors.availability?.message} required>
            <Select id="availability" defaultValue="" {...register("availability")}>
              <option value="" disabled>
                Select availability
              </option>
              <option value="weekends">Weekends only</option>
              <option value="weekdays">Weekdays only</option>
              <option value="flexible">Flexible</option>
              <option value="specific_dates">Specific dates</option>
            </Select>
          </Field>

          {availability === "specific_dates" && (
            <Field
              label="Specific dates"
              htmlFor="specificDates"
              hint="Separate multiple dates with commas, e.g. 2026-08-01, 2026-08-15."
            >
              <Input id="specificDates" placeholder="YYYY-MM-DD, YYYY-MM-DD" {...register("specificDates")} />
            </Field>
          )}

          <Field
            label="Profile photo"
            htmlFor="profilePhoto"
            error={errors.profilePhoto?.message as string | undefined}
            hint="Required for volunteer identification and coordination."
            required
          >
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-ink/25 bg-white p-4 hover:border-primary"
            >
              {preview ? (
                <img src={preview} alt="Preview" className="h-14 w-14 rounded-full object-cover" />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-card text-primary">
                  <Upload size={20} />
                </div>
              )}
              <span className="text-sm text-ink-soft">
                {preview ? "Change photo" : "Click to upload a photo (max 15MB)"}
              </span>
            </div>
            <input
              id="profilePhoto"
              type="file"
              accept="image/*"
              className="hidden"
              {...photoRegister}
              ref={(el) => {
                photoRegister.ref(el);
                fileInputRef.current = el;
              }}
              onChange={(e) => {
                photoRegister.onChange(e);
                const file = e.target.files?.[0];
                if (file) setPreview(URL.createObjectURL(file));
              }}
            />
          </Field>

          <Button type="submit" size="lg" isLoading={createVolunteer.isPending} className="mt-2">
            Submit registration
          </Button>
        </form>
      </div>
    </section>
  );
}
