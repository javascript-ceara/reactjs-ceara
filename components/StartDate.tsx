import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Event } from "@/types/event";

type Props = {
  startDate: Event["startDate"];
};

export const StartDate = ({ startDate }: Props) => {
  const [date, setDate] = useState("");
  useEffect(() => {
    if (startDate) {
      setDate(
        format(parseISO(startDate), "dd LLLL 'de' yyyy 'às' K:mm'h'", {
          locale: ptBR,
        })
      );
    }
  }, [startDate]);
  return <span>{date}</span>;
};
