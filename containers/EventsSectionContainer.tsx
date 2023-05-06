import { useState } from "react";

import { EventsSection } from "@/components/EventsSection";
import { getEvents } from "@/api/operations/getEvents";
import { Event } from "@/types/event";
import { EventOrder } from "@/schema";

type Props = {
  initialEvents: Event[];
};

export const EventsSectionContainer = ({ initialEvents }: Props) => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasNoMoreEventsToLoad, setHasNoMoreEventsToLoad] = useState(false);

  const onLoadMoreEvents = async () => {
    try {
      setLoading(true);
      const ids = initialEvents.map((event) => event.id || "");
      const { items, total } = await getEvents({
        order: [EventOrder.StartDateDesc],
        limit: 2,
        where: {
          sys: {
            id_not_in: ids,
          },
        },
        skip,
      });
      setEvents((prev) => {
        return [...prev, ...items];
      });
      setSkip((prev) => prev + (total || 0));

      if (total === 0) {
        setHasNoMoreEventsToLoad(true);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <EventsSection
      events={events}
      onLoadMoreEvents={onLoadMoreEvents}
      isLoadingEvents={loading}
      hasNoMoreEventsToLoad={hasNoMoreEventsToLoad}
    />
  );
};
