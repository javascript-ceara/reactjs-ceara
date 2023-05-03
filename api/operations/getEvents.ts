import { GetEventsQuery, GetEventsQueryVariables } from "../../schema";
import { fetchGraphQL } from "../fetchGraphQL";

import { Event } from "../../types/event";
import { Presentation } from "../../types/presentation";

export const getEvents = async (
  variables: Partial<GetEventsQueryVariables>
): Promise<Event[]> => {
  const response = await fetchGraphQL<GetEventsQuery>(
    /* GraphQL */ `
      query getEvents($order: [EventOrder], $limit: Int, $skip: Int) {
        eventCollection(order: $order, limit: $limit, skip: $skip) {
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

  return (
    response.data.eventCollection?.items.map<Event>((item) => {
      return {
        id: item?.sys.id,
        title: item?.title,
        startDate: item?.startDate,
        endDate: item?.endDate,
        resume: item?.resume,
        placeName: item?.placeName,
        placeAddress: item?.placeAddress,
        presentations: item?.presentationCollection?.items.map<Presentation>(
          (item) => ({
            id: item.sys.id,
          })
        ),
      };
    }) || []
  );
};
