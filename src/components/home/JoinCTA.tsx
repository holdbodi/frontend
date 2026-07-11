import { Link } from "react-router-dom";

import { Button } from "@/components/ui/Button";

export function JoinCTA() {
  return (
    <section className="bg-primary py-20">
      <div className="container-page flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-xl font-display text-3xl font-extrabold leading-tight text-cream sm:text-4xl">
          Whatever your capacity to give, there's a place for you here.
        </h2>
        <p className="max-w-lg text-cream/80">
          Donate, volunteer, contribute food items, or bring your brand in as
          a partner — every pathway helps make food access easier.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Link to="/donate">
            <Button variant="secondary" size="lg">
              Donate
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
              variant="outline"
              size="lg"
              className="border-cream/40 text-cream hover:bg-cream/10"
            >
              Become a brand partner
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
