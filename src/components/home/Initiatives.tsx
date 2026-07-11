import { InitiativeCard } from "@/components/home/InitiativeCard";
import { useInitiatives } from "@/hooks/useOutreach";

export function Initiatives() {
  const { data: initiatives, isLoading, isError } = useInitiatives();

  return (
    <section id="initiatives" className="scroll-mt-20 py-20 sm:py-28">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="text-sm font-bold uppercase tracking-wide text-primary">
            Current initiatives
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            See exactly where your support goes.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-96 animate-pulse rounded-3xl border border-line bg-white"
              />
            ))}

          {isError && (
            <p className="col-span-full rounded-2xl bg-sage p-6 text-sm text-ink-soft">
              We couldn't load initiatives right now. Please refresh the page.
            </p>
          )}

          {initiatives?.length === 0 && (
            <p className="col-span-full rounded-2xl bg-sage p-6 text-sm text-ink-soft">
              No initiatives are open right now — check back soon.
            </p>
          )}

          {initiatives?.map((initiative) => (
            <InitiativeCard key={initiative.id} initiative={initiative} />
          ))}
        </div>
      </div>
    </section>
  );
}
