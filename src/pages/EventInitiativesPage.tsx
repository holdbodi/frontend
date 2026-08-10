import { InitiativeTypePage } from "@/components/initiatives/InitiativeTypePage";
import teamPhoto from "@/assets/images/team-photo.jpg";

export function EventInitiativesPage() {
  return (
    <InitiativeTypePage
      initiativeType="event"
      eyebrow="Event Initiatives — time-bound"
      headline="Outreach For Every Season."
      paragraphs={[
        "Event Initiatives are time-bound campaigns tied to outreach moments and key dates — Children's Day, World Food Day, Christmas, Ramadan, and other community outreach moments throughout the year.",
        "Each campaign runs for a set period with a clear goal, so you can see exactly what your support made possible.",
      ]}
      ctaLabel="Support an Event Initiative"
      heroImage={teamPhoto}
      heroImageAlt="The holdbodí team and partners at a community outreach event."
    />
  );
}
