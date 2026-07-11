import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

import logo from "@/assets/images/logo.png";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Initiatives", href: "/#initiatives" },
  { label: "Stories", href: "/#stories" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur-sm">
      <div className="container-page flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
          <img src={logo} alt="holdbodí" className="h-8 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
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
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-line bg-cream md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-sage hover:text-primary"
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
    </header>
  );
}
