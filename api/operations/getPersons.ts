import { GetPersonsQuery, GetPersonsQueryVariables } from "@/schema";
import { fetchGraphQL } from "../fetchGraphQL";

import { Person } from "@/types/person";

export const getPersons = async (
  variables?: Partial<GetPersonsQueryVariables>
): Promise<Person[]> => {
  const response = await fetchGraphQL<GetPersonsQuery>(
    /* GraphQL */ `
      query getPersons(
        $order: [PersonOrder]
        $limit: Int
        $skip: Int
        $where: PersonFilter
      ) {
        personCollection(
          order: $order
          limit: $limit
          skip: $skip
          where: $where
        ) {
          items {
            sys {
              id
            }
            name
            jobTitle
            company
            location
            website
            github
            linkedin
            isOrganizer
            bio
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
    `,
    {
      variables,
    }
  );

  return (
    response.data?.personCollection?.items?.map((item) => {
      return {
        id: item?.sys.id,
        name: item?.name,
        bio: item?.bio,
        avatar: item?.avatar,
        company: item?.company,
        location: item?.location,
        linkedin: item?.linkedin,
        github: item?.github,
        jobTitle: item?.jobTitle,
        website: item?.website,
        isOrganizer: item?.isOrganizer,
      };
    }) || []
  );
};
