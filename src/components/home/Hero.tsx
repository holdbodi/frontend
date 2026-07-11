import { Link } from "react-router-dom";

import heroImage from "@/assets/images/hero-boy-indomie.jpg";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <img
        src={heroImage}
        alt="A child at a holdbodí food distribution event, holding up a pack of noodles."
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />

      <div className="container-page relative flex min-h-[85vh] flex-col justify-end gap-8 pb-16 pt-40 sm:pb-20">
        <div className="max-w-2xl">
          <span className="mb-5 inline-flex items-center rounded-full bg-secondary px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-ink">
            Making food access easier
          </span>
          <h1 className="font-display text-4xl font-extrabold leading-[1.08] text-cream sm:text-5xl lg:text-6xl">
            Connecting people willing to help with communities facing food
            insecurity.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-cream/85">
            Millions of Nigerians don't know where their next meal is coming
            from. holdbodí brings individuals, brands, and volunteers together
            to change that — one plate at a time.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/donate">
              <Button variant="secondary" size="lg">
                Donate now
              </Button>
            </Link>
            <Link to="/volunteer">
              <Button
                variant="outline"
                size="lg"
                className="border-cream/40 text-cream hover:bg-cream/10"
              >
                Volunteer
              </Button>
            </Link>
            <Link to="/partner">
              <Button
                variant="ghost"
                size="lg"
                className="text-cream hover:bg-cream/10"
              >
                Partner with us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
