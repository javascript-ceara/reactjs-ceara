import { GetAuthorsByIdQuery } from "@/schema";
import { fetchGraphQL } from "../fetchGraphQL";

import { Author } from "../../types/author";

export const getAuthorById = async (
  id: string
): Promise<Author | undefined> => {
  const response = await fetchGraphQL<GetAuthorsByIdQuery>(
    /* GraphQL */ `
      query getAuthorById($id: String!) {
        author(id: $id) {
          name
          bio
          sys {
            id
          }
          avatar {
            url
          }
        }
      }
    `,
    { variables: { id } }
  );

  if (response.data.author) {
    return {
      id: response.data.author.sys.id,
      name: response.data.author.name,
      bio: response.data.author.bio,
      avatar: response.data.author.avatar,
    };
  }
};
