import { fetchGraphQL } from "../fetchGraphQL";
import {
  GetPresentationsByIdsQuery,
  GetPresentationsByIdsQueryVariables,
} from "../../schema";

export const getPresentationsByIds = async (ids: String[]) => {
  const response = await fetchGraphQL<GetPresentationsByIdsQuery>(
    /* GraphQL */ `
      query getPresentationsByIds($ids: [String]!) {
        presentationCollection(where: { sys: { id_in: $ids } }) {
          items {
            sys {
              id
            }
            title
            author {
              sys {
                id
              }
            }
          }
        }
      }
    `,
    { variables: { ids } }
  );

  response.data.presentationCollection?.items;
};
