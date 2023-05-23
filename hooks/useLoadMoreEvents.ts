import { useState } from "react";

import { getEvents } from "@/api/operations/getEvents";
import { event } from "@/utils/ga";

import { Event } from "@/types/event";
import { EventOrder } from "@/schema";

export const useLoadMoreEvents = (initialEvents: Event[]) => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasNoMoreEventsToLoad, setHasNoMoreEventsToLoad] = useState(false);

  const onLoadMoreEvents = async () => {
    try {
      event({
        action: "load_more_events",
      });

      setLoading(true);
      const ids = initialEvents.map((event) => event.id || "");
      const { items, total, limit } = await getEvents({
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
      setSkip((prev) => prev + (limit || 0));

      if (total === 0) {
        setHasNoMoreEventsToLoad(true);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return {
    events,
    skip,
    loading,
    hasNoMoreEventsToLoad,
    onLoadMoreEvents,
  };
};
