import { GetPartnersQuery, GetPartnersQueryVariables } from "@/schema";
import { fetchGraphQL } from "../fetchGraphQL";

import { Partner } from "@/types/partner";

export const getPartners = async (
  variables?: Partial<GetPartnersQueryVariables>
): Promise<Partner[]> => {
  const response = await fetchGraphQL<GetPartnersQuery>(
    /* GraphQL */ `
      query getPartners(
        $order: [PartnerOrder]
        $limit: Int
        $skip: Int
        $where: PartnerFilter
      ) {
        partnerCollection(
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
            logo {
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
    response.data?.partnerCollection?.items?.map((item) => {
      return {
        id: item?.sys.id,
        name: item?.name,
        logo: item?.logo,
      };
    }) || []
  );
};
