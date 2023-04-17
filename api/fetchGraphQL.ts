import { GetNextEventQuery } from "../schema";

type Data = {};

type Options = Partial<{
  preview: boolean;
  variables: Record<string, unknown>;
}>;

export const fetchGraphQL = async <D extends Data>(
  query: string,
  options?: Options,
  headers?: HeadersInit
): Promise<{ data: D }> => {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
        Authorization: `Bearer ${
          options?.preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query, variables: options?.variables }),
    }
  ).then((response) => response.json());
};
