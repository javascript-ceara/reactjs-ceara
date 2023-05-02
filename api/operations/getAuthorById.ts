import { GetAuthorsByIdQuery } from "@/schema";
import { fetchGraphQL } from "../fetchGraphQL";

import { Author } from "../../types/author";

export const getAuthorById = async (id: string): Promise<Author> => {
  const response = await fetchGraphQL<GetAuthorsByIdQuery>(
    /* GraphQL */ `
      query getAuthorsById($id: String!) {
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
  return {
    id: response.data.author?.sys.id,
    name: response.data.author?.name,
    bio: response.data.author?.bio,
    avatar: response.data.author?.avatar,
  };
};
