import { GetCommunityQuery } from "@/schema";
import { fetchGraphQL } from "../fetchGraphQL";

import { Community } from "../../types/community";

export const getCommunity = async (): Promise<Community | undefined> => {
  const response = await fetchGraphQL<GetCommunityQuery>(/* GraphQL */ `
    query getCommunity {
      communityCollection {
        items {
          sys {
            id
          }
          title
          text {
            json
          }
        }
      }
    }
  `);

  const community = response.data?.communityCollection?.items[0];

  if (community) {
    return {
      id: community.sys.id,
      title: community.title,
      text: community.text,
    };
  }
};
