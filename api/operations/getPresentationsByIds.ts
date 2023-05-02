import { GetPresentationsByIdsQuery } from "../../schema";
import { fetchGraphQL } from "../fetchGraphQL";


import { Presentation } from "../../types/presentation";

export const getPresentationsByIds = async (
  ids: String[]
): Promise<Array<Presentation | undefined>> => {
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
<<<<<<< HEAD
          id: item.author?.sys.id,
=======
          id: item.sys.id,
>>>>>>> aebb3fa (chore: a lot of changes.)
        },
        description: item.description,
        title: item.title,
      };
    }) || []
  );
};
