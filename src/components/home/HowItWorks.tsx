import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const channels = [
  {
    tag: "always active",
    title: "e-Sàrá",
    description:
      "A standing digital giving initiative inspired by Sàrá — the familiar practice of giving alms to people in need. e-Sàrá keeps support active all year round, beyond commemorative days.",
    tagFilled: true,
    href: "/e-sara",
  },
  {
    tag: "Periodic",
    title: "Events",
    description:
      "Campaigns tied to moments and key dates like Children's Day, World Food Day, Christmas, Ramadan, and other community outreach initiatives throughout the year.",
    tagFilled: false,
    href: "/event-initiatives",
  },
];

const steps = [
  {
    number: "step 01",
    title: "Individuals and organisations contribute",
    description: "Through donations, food items, or brand partnerships.",
  },
  {
    number: "step 02",
    title: "Volunteers support implementation",
    description: "Coordinating logistics, packaging, and distribution on the ground.",
  },
  {
    number: "step 03",
    title: "Food reaches communities",
    description: "Delivered intentionally and consistently to those who need it.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-primary-dark py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="flex max-w-xl flex-col gap-5">
            <span className="font-mono text-[13px] uppercase text-secondary">
              02 — How it works
            </span>
            <h2 className="font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-cream/85 sm:text-5xl">
              We operate through two channels, both feeding into the same
              process on the ground.
            </h2>
          </div>
          {/* <p className="max-w-[364px] font-body text-lg leading-relaxed text-cream/75">
            We operate through two channels, both feeding into the same
            process on the ground.
          </p> */}
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {channels.map((channel) => (
            <Link
              key={channel.title}
              to={channel.href}
              className="group rounded-[22px] bg-card p-10 transition-colors hover:bg-cream"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-[40px]">
                  {channel.title}
                </h3>
                <span
                  className={`rounded-none border-[1.5px] border-ink px-3.5 py-1.5 font-mono text-[11px] uppercase text-ink ${channel.tagFilled ? "bg-secondary" : "bg-transparent"}`}
                >
                  {channel.tag}
                </span>
              </div>
              <p className="mt-6 font-body text-base leading-relaxed text-ink sm:text-[17px]">
                {channel.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[12.5px] uppercase text-primary">
                Learn more
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-16 grid gap-8 border-t border-cream/25 pt-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`flex flex-col gap-3.5 ${i > 0 ? "sm:border-l border-cream/25 sm:pl-8" : ""}`}
            >
              <span className="font-mono text-[13px] uppercase text-secondary">
                {step.number}
              </span>
              <h4 className="font-display text-xl font-extrabold tracking-tight text-cream/85 sm:text-2xl">
                {step.title}
              </h4>
              <p className="font-body text-base leading-relaxed text-cream/75">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
