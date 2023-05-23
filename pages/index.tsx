import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { getCommunity } from "@/api/operations/getCommunity";
import { getEvents } from "@/api/operations/getEvents";
import { getPartners } from "@/api/operations/getPartners";
import { getPersonById } from "@/api/operations/getPersonById";
import { getPersons } from "@/api/operations/getPersons";
import { getPresentations } from "@/api/operations/getPresentations";

import { HomePage } from "@/components/HomePage";
import { OurEventsSectionContainer } from "@/containers/OurEventsSectionContainer";

import { deleteUndefined } from "@/utils/deleteUndefined";
import { pageview } from "@/utils/ga";

import { EventOrder, PersonOrder } from "@/schema";

export default function Home({
  events,
  highlightedEvent,
  community,
  organizers,
  partners,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", (url) => {
      pageview(url);
    });

    return () => {
      router.events.off("routeChangeComplete", (url) => {
        pageview(url);
      });
    };
  }, [router.events]);

  return (
    <div>
      <HomePage
        highlightedEvent={highlightedEvent}
        ourEventsSection={<OurEventsSectionContainer initialEvents={events} />}
        community={community}
        organizers={organizers}
        partners={partners}
      />
    </div>
  );
}

export async function getStaticProps() {
  const { items } = await getEvents({
    order: [EventOrder.StartDateDesc],
    limit: 2,
  });

  const { items: highlightedEvents } = await getEvents({
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
    order: [PersonOrder.NameAsc],
    where: {
      isOrganizer: true,
    },
  });

  const partners = await getPartners();

  const props = {
    highlightedEvent,
    events: items,
    community,
    organizers,
    partners,
  };

  deleteUndefined(props);

  return {
    props,
    revalidate: 7200,
  };
}
