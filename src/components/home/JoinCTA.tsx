import { Link } from "react-router-dom";

import { Button } from "@/components/ui/Button";

export function JoinCTA() {
  return (
    <section className="bg-secondary py-20 sm:py-28">
      <div className="container-page flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-3xl font-display text-3xl font-extrabold leading-[1.02] tracking-tight text-ink sm:text-5xl lg:text-[64px]">
          Whatever your capacity to give, there's a place for you here.
        </h2>
        <p className="max-w-2xl font-body text-base leading-relaxed text-ink/75 sm:text-lg">
          Donate, volunteer, contribute food items, or bring your brand in as
          a partner — every pathway helps make food access easier.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Link to="/donate">
            <Button variant="primary" size="lg">
              Donate
            </Button>
          </Link>
          <Link to="/volunteer">
            <Button variant="outline" size="lg">
              Volunteer
            </Button>
          </Link>
          <Link to="/food-donation">
            <Button variant="outline" size="lg">
              Donate food items
            </Button>
          </Link>
          <Link to="/partner">
            <Button variant="outline" size="lg">
              Become a brand partner
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
