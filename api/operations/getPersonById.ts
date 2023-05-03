import { GetPersonByIdQuery } from "@/schema";
import { fetchGraphQL } from "../fetchGraphQL";

import { Person } from "../../types/person";

export const getPersonById = async (
  id: string
): Promise<Person | undefined> => {
  const response = await fetchGraphQL<GetPersonByIdQuery>(
    /* GraphQL */ `
      query getPersonById($id: String!) {
        person(id: $id) {
          sys {
            id
          }
          name
          bio
          avatar {
            url
          }
        }
      }
    `,
    { variables: { id } }
  );

  if (response.data?.person) {
    return {
      id: response.data.person.sys.id,
      name: response.data.person.name,
      bio: response.data.person.bio,
      avatar: response.data.person.avatar,
    };
  }
};
