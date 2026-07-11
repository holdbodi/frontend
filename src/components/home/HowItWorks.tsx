import { Gift, PartyPopper } from "lucide-react";

const channels = [
  {
    icon: Gift,
    tag: "Always active",
    title: "e-Sàrá",
    description:
      "A standing digital giving initiative inspired by Sàrá — the familiar practice of giving alms to people in need. e-Sàrá keeps support active all year round, beyond commemorative days.",
  },
  {
    icon: PartyPopper,
    tag: "Time-bound",
    title: "Event Initiatives",
    description:
      "Campaigns tied to outreach moments and key dates — Children's Day, World Food Day, Christmas, Ramadan, and other community outreach initiatives throughout the year.",
  },
];

const steps = [
  {
    number: "01",
    title: "Individuals and organisations contribute",
    description: "Through donations, food items, or brand partnerships.",
  },
  {
    number: "02",
    title: "Volunteers support implementation",
    description: "Coordinating logistics, packaging, and distribution on the ground.",
  },
  {
    number: "03",
    title: "Food reaches communities",
    description: "Delivered intentionally and consistently to those who need it.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-sage py-20 sm:py-28">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="text-sm font-bold uppercase tracking-wide text-primary">
            How it works
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            Together, we deliver food support intentionally and consistently.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            We operate through two channels, both feeding into the same
            process on the ground.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {channels.map(({ icon: Icon, tag, title, description }) => (
            <div
              key={title}
              className="rounded-3xl border border-primary/10 bg-cream p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-cream">
                <Icon size={22} />
              </div>
              <span className="mt-5 inline-block text-xs font-bold uppercase tracking-wide text-secondary-dark">
                {tag}
              </span>
              <h3 className="mt-1 font-display text-xl font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="relative pl-4">
              <span className="font-display text-4xl font-extrabold text-primary/20">
                {step.number}
              </span>
              <h4 className="mt-2 font-display text-lg font-bold text-ink">
                {step.title}
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
