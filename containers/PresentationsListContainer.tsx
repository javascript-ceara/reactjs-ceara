import { useEffect, useState } from "react";
import {
  PresentationsList,
  Props as PresentationsListProps,
} from "@/components/PresentationsList";

import { Presentation } from "@/types/presentation";

import { getPresentations } from "@/api/operations/getPresentations";

type Props = Pick<PresentationsListProps, "palette"> & {
  presentationIds: Array<Presentation["id"]>;
};

export const PresentationsListContainer = ({
  palette,
  presentationIds,
}: Props) => {
  const [presentations, setPresentations] = useState<Presentation[]>([]);

  useEffect(() => {
    getPresentations({ where: { sys: { id_in: presentationIds } } })
      .then((data) => {
        setPresentations(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [presentationIds]);

  return <PresentationsList palette={palette} presentations={presentations} />;
};
