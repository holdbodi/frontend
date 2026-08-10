import { InitiativeTypePage } from "@/components/initiatives/InitiativeTypePage";
import crowdNoodles from "@/assets/images/gallery-crowd-noodles.jpg";

export function SaraPage() {
  return (
    <InitiativeTypePage
      initiativeType="sara"
      eyebrow="e-Sàrá — always active"
      headline="Give Food. Every Month."
      paragraphs={[
        "e-Sàrá is our standing digital giving initiative that enables us to provide food support every month, beyond special occasions and commemorative days.",
        "Through e-Sàrá, volunteers go out every 4th Saturday of the month to provide food support to people and communities across Lagos.",
      ]}
      ctaLabel="Support e-Sàrá"
      heroImage={crowdNoodles}
      heroImageAlt="Volunteers distributing food packs to a community through e-Sàrá."
    />
  );
}
