import { fetchGraphQL } from "../fetchGraphQL";
import { GetAuthorsByIdQuery } from "@/schema";

export const getAuthorsById = async (id: string) => {
  const response = await fetchGraphQL<GetAuthorsByIdQuery>(
    /* GraphQL */ `
      query getAuthorsById($id: String!) {
        author(id: $id) {
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
  return response.data.author;
};
