import { fetchGraphQL } from "../fetchGraphQL";
import {
  GetPresentationsByIdsQuery,
  GetPresentationsByIdsQueryVariables,
} from "../../schema";
import { EnumPresentations } from "@/types/presentation";

export const getPresentationsByIds = async (
  ids: String[]
): Promise<EnumPresentations> => {
  const response = await fetchGraphQL<GetPresentationsByIdsQuery>(
    /* GraphQL */ `
      query getPresentationsByIds($ids: [String]!) {
        presentationCollection(where: { sys: { id_in: $ids } }) {
          items {
            sys {
              id
            }
            title
            description
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

  return response.data.presentationCollection.items;
};
