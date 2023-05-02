import { getAuthorById } from "@/api/operations/getAuthorById";
import { getEvents } from "@/api/operations/getEvents";
import { getPresentationsByIds } from "@/api/operations/getPresentationsByIds";
import { InferGetStaticPropsType } from "next";

import { HomePage } from "@/components/HomePage";
import { EventOrder } from "../schema";

import { Event } from "@/types/event";

export default function Home({
  nextEvent,
  previousEvents,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <HomePage nextEvent={nextEvent} previousEvents={previousEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const nextEvents = await getEvents({
    order: [EventOrder.StartDateDesc],
    limit: 1,
  });

  const previousEvents = await getEvents({
    order: [EventOrder.StartDateDesc],
    skip: 1,
  });

  const nextEvent = (
    await Promise.all(
      nextEvents.map(async (nextEvent) => {
        const event: Event = {
          ...nextEvent,
        };

        if (event.presentations) {
          const ids = event.presentations?.map(
            (presentation) => presentation.id as string
          );
          event.presentations = await getPresentationsByIds(ids);
        }

        if (event.presentations) {
          Promise.all(
            event.presentations.map(async (presentation) => {
              if (presentation.author?.id) {
                const author = await getAuthorById(presentation.author.id);
                return {
                  ...presentation,
                  author,
                };
              }
              return presentation;
            })
          );
        }

        return event;
      })
    )
  )[0];

  return {
    props: { nextEvent: nextEvent, previousEvents },
  };
}
