import crowdNoodles from "@/assets/images/gallery-crowd-noodles.jpg";
import boyPortrait from "@/assets/images/gallery-boy-portrait.jpg";
import teamPhoto from "@/assets/images/team-photo.jpg";
import manCarBoxes from "@/assets/images/gallery-man-car-boxes.jpg";
import boySmiling from "@/assets/images/gallery-boy-smiling.jpg";

const photos = [
  { src: crowdNoodles, alt: "Children receiving food packs at a holdbodí outreach event.", grow: 1.3 },
  { src: boyPortrait, alt: "A child at a holdbodí distribution event.", grow: 1 },
  { src: teamPhoto, alt: "The holdbodí team and partners at an outreach event.", grow: 1.3 },
  { src: manCarBoxes, alt: "A volunteer loading food item boxes for distribution.", grow: 1 },
  { src: boySmiling, alt: "A child smiling while holding up a food pack.", grow: 1.3 },
];

export function Gallery() {
  return (
    <section id="gallery" className="scroll-mt-24 border-y-[1.5px] border-ink py-20 sm:py-28">
      <div className="container-page">
        <div className="flex max-w-2xl flex-col gap-5">
          <span className="font-mono text-[13px] uppercase text-primary">
            04 — on the ground
          </span>
          <h2 className="font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-ink sm:text-5xl">
            Moments from our outreach events.
          </h2>
        </div>

        <div className="mt-14 flex gap-4 overflow-x-auto pb-2">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="h-[250px] shrink-0 overflow-hidden rounded-[20px] border-[1.5px] border-ink"
              style={{ flex: `${photo.grow} 0 260px` }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
