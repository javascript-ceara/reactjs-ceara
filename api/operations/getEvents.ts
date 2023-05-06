import { GetEventsQuery, GetEventsQueryVariables } from "../../schema";
import { fetchGraphQL } from "../fetchGraphQL";

import { Event } from "../../types/event";
import { Presentation } from "../../types/presentation";

export const getEvents = async (
  variables?: Partial<GetEventsQueryVariables>
): Promise<{
  skip?: number;
  limit?: number;
  total?: number;
  items: Event[];
}> => {
  const response = await fetchGraphQL<GetEventsQuery>(
    /* GraphQL */ `
      query getEvents(
        $order: [EventOrder]
        $limit: Int
        $skip: Int
        $where: EventFilter
      ) {
        eventCollection(
          order: $order
          limit: $limit
          skip: $skip
          where: $where
        ) {
          skip
          total
          limit
          items {
            sys {
              id
            }
            title
            startDate
            endDate
            resume
            placeName
            placeAddress
            registrationLink
            cfpLink
            presentationCollection {
              items {
                sys {
                  id
                }
              }
            }
          }
        }
      }
    `,
    {
      variables,
    }
  );

  return {
    ...response.data?.eventCollection,
    items:
      response.data?.eventCollection?.items.map<Event>((item) => {
        return {
          id: item?.sys.id,
          title: item?.title,
          startDate: item?.startDate,
          endDate: item?.endDate,
          resume: item?.resume,
          placeName: item?.placeName,
          placeAddress: item?.placeAddress,
          registrationLink: item?.registrationLink,
          cfpLink: item?.cfpLink,
          presentations: item?.presentationCollection?.items.map<Presentation>(
            (item) => ({
              id: item?.sys.id,
            })
          ),
        };
      }) || [],
  };
};
