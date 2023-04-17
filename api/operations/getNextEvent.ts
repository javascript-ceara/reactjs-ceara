import { fetchGraphQL } from "../fetchGraphQL";

import { GetNextEventQuery } from "../../schema";

import { Event } from "../../types/event";

export const getNextEvent = async (): Promise<Event> => {
  const response = await fetchGraphQL<GetNextEventQuery>(/* GraphQL */ `
    query getNextEvent {
      eventCollection(order: [startDate_DESC], limit: 1) {
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
  `);
  return response.data.eventCollection.items[0];
};
