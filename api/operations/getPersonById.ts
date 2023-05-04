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
          jobTitle
          company
          location
          website
          github
          linkedin
          isOrganizer
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
      company: response.data.person.company,
      location: response.data.person.location,
      linkedin: response.data.person.linkedin,
      github: response.data.person.github,
      jobTitle: response.data.person.jobTitle,
      website: response.data.person.website,
      isOrganizer: response.data.person.isOrganizer,
    };
  }
};
