import boyPortrait from "@/assets/images/gallery-boy-portrait.jpg";
import crowdNoodles from "@/assets/images/gallery-crowd-noodles.jpg";
import boySmiling from "@/assets/images/gallery-boy-smiling.jpg";
import manBoxes from "@/assets/images/gallery-man-boxes.jpg";
import girlPeaceSign from "@/assets/images/gallery-girl-peace-sign.jpg";
import girlPortrait from "@/assets/images/gallery-girl-portrait.jpg";
import teamPhoto from "@/assets/images/team-photo.jpg";

const photos = [
  { src: crowdNoodles, alt: "Children receiving food packs at a holdbodí outreach event.", span: "sm:col-span-2 sm:row-span-2" },
  { src: boyPortrait, alt: "A child at a holdbodí distribution event." },
  { src: teamPhoto, alt: "The holdbodí team and partners at an outreach event." },
  { src: manBoxes, alt: "A volunteer carrying boxes of food items for distribution." },
  { src: boySmiling, alt: "A child smiling while holding up a food pack." },
  { src: girlPortrait, alt: "A young girl at a food distribution outreach." },
  { src: girlPeaceSign, alt: "Children at a community outreach event." },
];

export function Gallery() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="text-sm font-bold uppercase tracking-wide text-primary">
            On the ground
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            Moments from our outreach events.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:[grid-auto-rows:12rem]">
          {photos.map((photo, index) => (
            <div
              key={index}
              className={`overflow-hidden rounded-2xl ${photo.span ?? ""}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
