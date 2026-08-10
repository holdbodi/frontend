import heroPhoto from "@/assets/images/hero-boy-indomie.jpg";

export function HeroPhotoBand() {
  return (
    <section className="container-page pb-16">
      <div className="relative h-[220px] overflow-hidden rounded-[28px] border-[1.5px] border-ink sm:h-[320px] lg:h-[440px]">
        <img
          src={heroPhoto}
          alt="A child at a holdbodí food distribution event, holding up a pack of noodles."
          className="h-full w-full object-cover"
        />
        {/* <span className="absolute left-7 top-7 rounded-full border-[1.5px] border-ink bg-secondary px-4 py-2 font-mono text-[12.5px] uppercase text-ink">
          making food access easier
        </span> */}
      </div>
    </section>
  );
}
