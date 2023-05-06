import { InferGetStaticPropsType } from "next";

import { getCommunity } from "@/api/operations/getCommunity";
import { getEvents } from "@/api/operations/getEvents";
import { getPartners } from "@/api/operations/getPartners";
import { getPersonById } from "@/api/operations/getPersonById";
import { getPersons } from "@/api/operations/getPersons";
import { getPresentations } from "@/api/operations/getPresentations";

import { HomePage } from "@/components/HomePage";
import { EventOrder } from "../schema";

import { deleteUndefined } from "@/utils/deleteUndefined";

export default function Home({
  events,
  highlightedEvent,
  community,
  organizers,
  partners,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <HomePage
        highlightedEvent={highlightedEvent}
        events={events}
        community={community}
        organizers={organizers}
        partners={partners}
      />
    </div>
  );
}

export async function getStaticProps() {
  const events = await getEvents({
    order: [EventOrder.StartDateDesc],
  });

  const highlightedEvents = await getEvents({
    where: {
      highlighted: true,
    },
  });

  const highlightedEvent = highlightedEvents[0];

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
    events,
    community,
    organizers,
    partners,
  };

  deleteUndefined(props);

  return {
    props,
  };
}
