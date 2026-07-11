import { Link } from "react-router-dom";

import { Button } from "@/components/ui/Button";

export function NotFoundPage() {
  return (
    <section className="flex min-h-[70vh] items-center py-16">
      <div className="container-page text-center">
        <h1 className="font-display text-6xl font-extrabold text-primary">404</h1>
        <p className="mt-3 text-ink-soft">This page doesn't exist.</p>
        <Link to="/" className="mt-8 inline-block">
          <Button variant="primary">Back to home</Button>
        </Link>
      </div>
    </section>
  );
}
