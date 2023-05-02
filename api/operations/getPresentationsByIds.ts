import { fetchGraphQL } from "../fetchGraphQL";
import { GetPresentationsByIdsQuery } from "../../schema";

import { getAuthorById } from "./getAuthorById";

import { Presentation } from "../../types/presentation";

export const getPresentationsByIds = async (
  ids: String[]
): Promise<Presentation[]> => {
  const response = await fetchGraphQL<GetPresentationsByIdsQuery>(
    /* GraphQL */ `
      query getPresentationsByIds($ids: [String]!) {
        presentationCollection(
          order: [title_ASC]
          where: { sys: { id_in: $ids } }
        ) {
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

  return (
    response.data.presentationCollection?.items.map((item) => {
      return {
        id: item.sys.id,
        author: {
          id: item.author?.sys.id,
        },
        description: item.description,
        title: item.title,
      };
    }) || []
  );
};
