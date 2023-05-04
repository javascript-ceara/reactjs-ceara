import { InferGetStaticPropsType } from "next";

import { getEvents } from "@/api/operations/getEvents";
import { getPresentations } from "@/api/operations/getPresentations";
import { getCommunity } from "@/api/operations/getCommunity";
import { getPersons } from "@/api/operations/getPersons";
import { getPersonById } from "@/api/operations/getPersonById";

import { HomePage } from "@/components/HomePage";
import { EventOrder } from "../schema";

import { deleteUndefined } from "@/utils/deleteUndefined";

export default function Home({
  nextEvent,
  previousEvents,
  community,
  organizers,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <HomePage
        nextEvent={nextEvent}
        previousEvents={previousEvents}
        community={community}
        organizers={organizers}
      />
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

          const presentations = await getPresentations({
            where: {
              sys: {
                id_in: ids,
              },
            },
          });
          const presentationsWithAuthors = await Promise.all(
            presentations.map(async (presentation) => {
              if (presentation.author?.id) {
                const author = await getPersonById(presentation.author.id);
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

  const community = await getCommunity();

  const organizers = await getPersons({
    where: {
      isOrganizer: true,
    },
  });

  const props = {
    nextEvent: nextEvent,
    previousEvents,
    community,
    organizers,
  };

  deleteUndefined(props);

  return {
    props,
  };
}
