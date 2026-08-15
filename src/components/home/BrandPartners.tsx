import brandTwo from "@/assets/images/srs-logo.png";
import brandThree from "@/assets/images/leadway-logo.png";
import brandFour from "@/assets/images/indomie-logo.jpg";
import brandFive from "@/assets/images/konkere-logo.jpg";

const partnerLogos = [
  {
    name: "SRS",
    src: brandTwo,
  },
  {
    name: "Leadway",
    src: brandThree,
  },
  {
    name: "Indomie",
    src: brandFour,
  },
  {
    name: "Konkere",
    src: brandFive,
  },
];

function LogoRow() {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {partnerLogos.map((logo, index) => (
        <div
          key={`${logo.name}-${index}`}
          className="flex h-24 w-36 shrink-0 items-center justify-center"
        >
          <img
            src={logo.src}
            alt={logo.name}
            className="max-h-20 max-w-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}

export function BrandPartners() {
  return (
    <section className="bg-card py-16">
      <div className="container-page">
        <div className="mb-10">
          <p className="font-body text-sm font-medium uppercase tracking-[0.12em] text-meta">
            Our brand partners
          </p>
        </div>

        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee">
            <LogoRow />
            <LogoRow />
            <LogoRow />
            <LogoRow />
          </div>
        </div>
      </div>
    </section>
  );
}