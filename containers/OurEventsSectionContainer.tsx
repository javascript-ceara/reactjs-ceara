import { OurEventsSection } from "@/components/OurEventsSection";
import { Event } from "@/types/event";

import { PresentationsListContainer } from "./PresentationsListContainer";
import { useLoadMoreEvents } from "@/hooks/useLoadMoreEvents";

type Props = {
  initialEvents: Event[];
};

export const OurEventsSectionContainer = ({ initialEvents }: Props) => {
  const { events, onLoadMoreEvents, loading, hasNoMoreEventsToLoad } =
    useLoadMoreEvents(initialEvents);

  return (
    <OurEventsSection
      events={events}
      onLoadMoreEvents={onLoadMoreEvents}
      presentationsListRender={(ids) => (
        <PresentationsListContainer palette="gray" presentationIds={ids} />
      )}
      isLoadingEvents={loading}
      hasNoMoreEventsToLoad={hasNoMoreEventsToLoad}
    />
  );
};
