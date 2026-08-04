import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { Marquee } from "@/components/layout/Marquee";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { label: "about", href: "/#about" },
  { label: "how it works", href: "/#how-it-works" },
  { label: "initiatives", href: "/#initiatives" },
  { label: "gallery", href: "/#gallery" },
  { label: "stories", href: "/#stories" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream">
      <div className="container-page flex h-[102px] items-center justify-between">
        <Link
          to="/"
          className="font-display text-[28px] font-bold tracking-tight text-ink"
          onClick={() => setIsOpen(false)}
        >
          holdbodí
        </Link>

        <nav className="hidden items-center gap-[30px] lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[13px] uppercase text-ink transition-opacity hover:opacity-60"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <NavLink to="/volunteer">
            <Button variant="outline" size="md">
              Volunteer
            </Button>
          </NavLink>
          <NavLink to="/donate">
            <Button variant="primary" size="md">
              Donate
            </Button>
          </NavLink>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t-[1.5px] border-ink bg-cream lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 font-mono text-[13px] uppercase text-ink hover:bg-card"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2 px-3">
              <NavLink to="/volunteer" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">
                  Volunteer
                </Button>
              </NavLink>
              <NavLink to="/donate" onClick={() => setIsOpen(false)}>
                <Button variant="primary" className="w-full">
                  Donate
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      )}

      <Marquee />
    </header>
  );
}
