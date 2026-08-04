import aboutImage from "@/assets/images/about-volunteer-distributing.jpg";
import girlPeaceSign from "@/assets/images/gallery-girl-peace-sign.jpg";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-page grid items-center gap-16 lg:grid-cols-2">
        <div className="relative h-[380px] sm:h-[480px] lg:h-[529px]">
          <div className="absolute left-0 top-0 h-[85%] w-[70%] -rotate-[2.5deg] overflow-hidden rounded-[22px] border-[1.5px] border-ink">
            <img src={aboutImage} alt="A holdbodí volunteer distributing food support to a community." className="h-full w-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 h-[62%] w-[58%] rotate-2 overflow-hidden rounded-[22px] border-[1.5px] border-ink shadow-[6px_6px_0_var(--color-secondary)]">
            <img src={girlPeaceSign} alt="Children at a holdbodí community outreach event." className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <span className="font-mono text-[13px] uppercase text-ink">
            01 — About Community Support
          </span>
          <h2 className="font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-ink sm:text-5xl">
            A shared table, built by a community.
          </h2>
          <div className="flex flex-col gap-5 font-body text-lg leading-relaxed text-ink sm:text-xl">
            <p>
              Millions of people across Nigeria do not know where their next
              meal will come from. holdbodí Community Support brings together
              individuals, brands, and volunteers to support people and
              communities facing food insecurity, with transparency,
              accessibility, and participation at the core of everything we
              do.
            </p>
            <p>
              More than a donation platform, we're building a place where
              support becomes visible, measurable, and easy to be part of —
              whatever your capacity to give looks like.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
