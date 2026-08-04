import { useTestimonials } from "@/hooks/useOutreach";
import type { Testimonial } from "@/types";

const roleLabels: Record<Testimonial["author_role"], string> = {
  community: "community member",
  volunteer: "volunteer",
  partner: "brand partner",
};

export function Testimonials() {
  const { data: testimonials, isLoading } = useTestimonials();

  if (!isLoading && (!testimonials || testimonials.length === 0)) {
    return null;
  }

  return (
    <section id="stories" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <div className="flex max-w-2xl flex-col gap-5">
          <span className="font-mono text-[13px] uppercase text-primary">05 — stories</span>
          <h2 className="font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-ink sm:text-5xl">
            Voices from the community.
          </h2>
        </div>

        <div className="mt-14 flex flex-col border-t-[1.5px] border-ink">
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-32 animate-pulse border-b-[1.5px] border-ink/20" />
            ))}

          {testimonials?.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="flex flex-col gap-6 border-b-[1.5px] border-ink py-10 sm:flex-row sm:items-start sm:justify-between sm:gap-10"
            >
              <span aria-hidden className="font-display text-6xl font-extrabold leading-none text-secondary sm:text-7xl">
                “
              </span>
              <blockquote className="flex-1 font-display text-xl font-bold leading-snug tracking-tight text-ink sm:text-[28px]">
                {testimonial.content}
              </blockquote>
              <figcaption className="flex shrink-0 items-center gap-3.5 sm:flex-row-reverse sm:text-right">
                {testimonial.photo ? (
                  <img
                    src={testimonial.photo}
                    alt={testimonial.author_name}
                    className="h-[52px] w-[52px] rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-card font-display text-lg font-bold text-primary">
                    {testimonial.author_name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-body text-lg font-semibold text-ink">{testimonial.author_name}</p>
                  <p className="font-mono text-[13px] uppercase text-ink-soft">
                    {testimonial.initiative_title
                      ? `${roleLabels[testimonial.author_role]}, ${testimonial.initiative_title}`
                      : roleLabels[testimonial.author_role]}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
