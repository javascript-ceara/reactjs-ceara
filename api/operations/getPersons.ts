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
            bio
            avatar {
              title
              url
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
      };
    }) || []
  );
};
