import { Quote } from "lucide-react";

import { useTestimonials } from "@/hooks/useOutreach";
import type { Testimonial } from "@/types";

const roleLabels: Record<Testimonial["author_role"], string> = {
  community: "Community member",
  volunteer: "Volunteer",
  partner: "Partner",
};

export function Testimonials() {
  const { data: testimonials, isLoading } = useTestimonials();

  if (!isLoading && (!testimonials || testimonials.length === 0)) {
    return null;
  }

  return (
    <section id="stories" className="scroll-mt-20 py-20 sm:py-28">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="text-sm font-bold uppercase tracking-wide text-primary">
            Stories
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            From the community, volunteers, and partners.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-56 animate-pulse rounded-3xl bg-sage" />
            ))}

          {testimonials?.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="flex flex-col gap-4 rounded-3xl bg-sage p-7"
            >
              <Quote className="text-primary/30" size={28} />
              <blockquote className="flex-1 text-sm leading-relaxed text-ink">
                {testimonial.content}
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-primary/10 pt-4">
                {testimonial.photo ? (
                  <img
                    src={testimonial.photo}
                    alt={testimonial.author_name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-cream">
                    {testimonial.author_name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-ink">{testimonial.author_name}</p>
                  <p className="text-xs text-ink-soft">{roleLabels[testimonial.author_role]}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
