import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HighlightedEventSection } from "./HighlightedEventSection";
import { CommunitySection } from "./CommunitySection";
import { PartnersSection } from "./PartnersSection";

import { Community } from "@/types/community";
import { Event } from "@/types/event";
import { Partner } from "@/types/partner";
import { Person } from "@/types/person";

type Props = {
  highlightedEvent?: Event;
  ourEventsSection: React.ReactNode;
  community?: Community;
  organizers: Person[];
  partners: Partner[];
};

export const HomePage = ({
  highlightedEvent,
  ourEventsSection,
  organizers,
  partners,
  community,
}: Props) => {
  return (
    <div>
      <Header />
      {highlightedEvent && <HighlightedEventSection event={highlightedEvent} />}
      {ourEventsSection}
      <CommunitySection community={community} organizers={organizers} />
      <PartnersSection partners={partners} />
      <Footer />
    </div>
  );
};
