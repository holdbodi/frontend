import aboutImage from "@/assets/images/about-volunteer-distributing.jpg";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-20 sm:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <span className="text-sm font-bold uppercase tracking-wide text-primary">
            About Community Support
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            A shared table, built by a community.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft">
            Millions of people across Nigeria do not know where their next
            meal will come from. holdbodí Community Support brings together
            individuals, brands, and volunteers to support people and
            communities facing food insecurity — with transparency,
            accessibility, and participation at the core of everything we do.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            More than a donation platform, we're building a place where
            support becomes visible, measurable, and easy to be part of —
            whatever your capacity to give looks like.
          </p>
        </div>
        <div className="order-1 lg:order-2">
          <div className="relative aspect-4/5 overflow-hidden rounded-3xl">
            <img
              src={aboutImage}
              alt="A holdbodí volunteer distributing food support to a community."
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
