import { InferGetStaticPropsType } from "next";

import { getEvents } from "@/api/operations/getEvents";
import { getPresentations } from "@/api/operations/getPresentations";
import { getCommunity } from "@/api/operations/getCommunity";
import { getPersons } from "@/api/operations/getPersons";
import { getPersonById } from "@/api/operations/getPersonById";
import { getPartners } from "@/api/operations/getPartners";

import { HomePage } from "@/components/HomePage";
import { EventOrder } from "../schema";

import { deleteUndefined } from "@/utils/deleteUndefined";

export default function Home({
  nextEvents,
  highlightedEvent,
  community,
  organizers,
  partners,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <HomePage
        highlightedEvent={highlightedEvent}
        nextEvents={nextEvents}
        community={community}
        organizers={organizers}
        partners={partners}
      />
    </div>
  );
}

export async function getStaticProps() {
  const nextEvents = await getEvents({
    order: [EventOrder.StartDateDesc],
  });

  const highlightedEvent = nextEvents[0];

  if (highlightedEvent) {
    const ids =
      highlightedEvent.presentations?.map((presentation) => presentation.id) ||
      [];

    let presentations = await getPresentations({
      where: {
        sys: {
          id_in: ids,
        },
      },
    });

    presentations = await Promise.all(
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

    highlightedEvent.presentations = presentations;
  }

  const community = await getCommunity();

  const organizers = await getPersons({
    where: {
      isOrganizer: true,
    },
  });

  const partners = await getPartners();

  const props = {
    highlightedEvent,
    nextEvents,
    community,
    organizers,
    partners,
  };

  deleteUndefined(props);

  return {
    props,
  };
}
