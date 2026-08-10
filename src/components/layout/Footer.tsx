import { Link } from "react-router-dom";

const year = new Date().getFullYear();

const getInvolvedLinks = [
  { label: "Donate", to: "/donate" },
  { label: "Volunteer", to: "/volunteer" },
  { label: "Donate food items", to: "/food-donation" },
  { label: "Become a partner", to: "/partner" },
];

const learnMoreLinks = [
  { label: "About Community Support", href: "/#about" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Current Initiatives", href: "/#initiatives" },
  { label: "Stories", href: "/#stories" },
];

export function Footer() {
  return (
    <footer className="bg-primary-dark pb-8 pt-20">
      <div className="container-page flex flex-col items-start justify-between gap-12 sm:flex-row sm:gap-8">
        <div className="flex max-w-[307px] flex-col gap-7">
          <p className="font-body text-base leading-relaxed text-cream/75">
            Making food access easier
          </p>
          <div className="flex gap-3.5">
            <a
              href="https://instagram.com/holdbodi"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border-[1.5px] border-cream/85 px-4 py-2 font-mono text-[12.5px] uppercase text-cream/85 transition-colors hover:bg-cream/10"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com/holdbodi"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border-[1.5px] border-cream/85 px-4 py-2 font-mono text-[12.5px] uppercase text-cream/85 transition-colors hover:bg-cream/10"
            >
              X (Twitter)
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3.5">
          <h4 className="font-mono text-[12.5px] uppercase text-secondary">Get involved</h4>
          {getInvolvedLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-body text-base text-cream/60 transition-colors hover:text-cream"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3.5">
          <h4 className="font-mono text-[12.5px] uppercase text-secondary">Learn more</h4>
          {learnMoreLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-base text-cream/60 transition-colors hover:text-cream"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3.5">
          <h4 className="font-mono text-[12.5px] uppercase text-secondary">Contact</h4>
          <a
            href="mailto:hello@holdbodi.org"
            className="font-body text-base text-cream/60 transition-colors hover:text-cream"
          >
            hello@holdbodi.com
          </a>
        </div>
      </div>

      <div className="mt-[70px] border-b border-cream/25">
        <p className="select-none overflow-hidden text-center font-display text-[clamp(4rem,18vw,13.5rem)] font-extrabold leading-[0.78] tracking-tighter text-cream/[0.14]">
          holdbodí
        </p>
      </div>

      <div className="container-page flex flex-col items-center justify-between gap-2 py-[22px] font-mono text-[12.5px] text-cream/75 sm:flex-row">
        <p>© {year} holdbodí Community Support. All rights reserved.</p>
        <p className="uppercase">Making food access easier ✦</p>
      </div>
    </footer>
  );
}
