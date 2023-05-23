import { useEffect, useState } from "react";
import { format, parseISO, isSameYear } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Event } from "@/types/event";

type Props = {
  startDate: Event["startDate"];
  showTime?: boolean;
};

export const EventStartDate = ({ startDate, showTime }: Props) => {
  const [date, setDate] = useState("");

  useEffect(() => {
    try {
      const parsed = parseISO(startDate as string);
      const isNotSame = !isSameYear(parsed, new Date());

      setDate(
        format(
          parsed,
          `dd LLLL ${isNotSame ? "yyyy" : ""} 
          ${showTime ? "' - ' k:mm'h'" : ""}`,
          {
            locale: ptBR,
          }
        )
      );
    } catch (_) {}
  }, [startDate, showTime]);

  return <span>{date}</span>;
};
