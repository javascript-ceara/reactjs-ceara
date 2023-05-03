import { getAuthorById } from "@/api/operations/getAuthorById";
import { getEvents } from "@/api/operations/getEvents";
import { getPresentationsByIds } from "@/api/operations/getPresentationsByIds";
import { InferGetStaticPropsType } from "next";

import { HomePage } from "@/components/HomePage";
import { EventOrder } from "../schema";

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
        if (nextEvent.presentations?.length) {
          const ids = nextEvent.presentations?.map(
            (presentation) => presentation.id as string
          );

          const presentations = await getPresentationsByIds(ids);
          const presentationsWithAuthors = await Promise.all(
            presentations.map(async (presentation) => {
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

          return {
            ...nextEvent,
            presentations: presentationsWithAuthors,
          };
        }
        return nextEvent;
      })
    )
  )[0];

  return {
    props: { nextEvent: nextEvent, previousEvents },
  };
}
