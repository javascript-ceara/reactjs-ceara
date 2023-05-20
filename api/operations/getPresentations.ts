import {
  GetPresentationsQuery,
  GetPresentationsQueryVariables,
} from "../../schema";
import { fetchGraphQL } from "../fetchGraphQL";

import { Presentation } from "../../types/presentation";

export const getPresentations = async (
  variables?: Partial<GetPresentationsQueryVariables>
): Promise<Presentation[]> => {
  const response = await fetchGraphQL<GetPresentationsQuery>(
    /* GraphQL */ `
      query getPresentations(
        $order: [PresentationOrder]
        $limit: Int
        $skip: Int
        $where: PresentationFilter
      ) {
        presentationCollection(
          order: $order
          limit: $limit
          skip: $skip
          where: $where
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
              name
              jobTitle
              bio
              isOrganizer
              github
              company
              avatar {
                title
                url
                description
                contentType
                fileName
                size
                width
                height
              }
            }
          }
        }
      }
    `,
    { variables }
  );

  return (
    response.data?.presentationCollection?.items.map((item) => {
      return {
        id: item?.sys.id,
        author: {
          id: item?.author?.sys.id,
          name: item?.author?.name,
          jobTitle: item?.author?.jobTitle,
          bio: item?.author?.bio,
          isOrganizer: item?.author?.isOrganizer,
          github: item?.author?.github,
          company: item?.author?.company,
          avatar: item?.author?.avatar,
        },
        description: item?.description,
        title: item?.title,
      };
    }) || []
  );
};
