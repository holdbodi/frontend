import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

import logo from "@/assets/images/logo.png";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-cream-deep">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <img src={logo} alt="holdbodí" className="h-7 w-auto" />
          <p className="max-w-xs text-sm text-ink-soft">
            Making food access easier — connecting people willing to help with
            communities facing food insecurity across Nigeria.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-display text-sm font-bold uppercase tracking-wide text-ink">
            Get involved
          </h4>
          <Link to="/donate" className="text-sm text-ink-soft hover:text-primary">
            Donate
          </Link>
          <Link to="/volunteer" className="text-sm text-ink-soft hover:text-primary">
            Volunteer
          </Link>
          <Link to="/food-donation" className="text-sm text-ink-soft hover:text-primary">
            Donate food items
          </Link>
          <Link to="/partner" className="text-sm text-ink-soft hover:text-primary">
            Become a partner
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-display text-sm font-bold uppercase tracking-wide text-ink">
            Learn more
          </h4>
          <a href="/#about" className="text-sm text-ink-soft hover:text-primary">
            About Community Support
          </a>
          <a href="/#how-it-works" className="text-sm text-ink-soft hover:text-primary">
            How it works
          </a>
          <a href="/#initiatives" className="text-sm text-ink-soft hover:text-primary">
            Current initiatives
          </a>
          <a href="/#stories" className="text-sm text-ink-soft hover:text-primary">
            Stories
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-display text-sm font-bold uppercase tracking-wide text-ink">
            Contact
          </h4>
          <a
            href="mailto:hello@holdbodi.org"
            className="flex items-center gap-2 text-sm text-ink-soft hover:text-primary"
          >
            <Mail size={16} /> hello@holdbodi.org
          </a>
          <div className="mt-1 flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-sage px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-cream"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-sage px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-cream"
            >
              X (Twitter)
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-line py-5">
        <p className="container-page text-xs text-ink-soft">
          © {year} holdbodí Community Support. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
