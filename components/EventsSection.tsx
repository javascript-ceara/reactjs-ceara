import { Event } from "@/types/event";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";

import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";
type Props = {
  events: Event[];
};

export const EventsSection = ({ events }: Props) => {
  return (
    <section className="bg-slate-100">
      <div className="space-y-16 px-8 py-16 lg:mx-auto lg:max-w-3xl lg:px-0">
        <h2 className="text-center text-sm uppercase text-cyan-600">
          Eventos anteriores
        </h2>
        <ul className="space-y-2 divide-y-2">
          {events.map(({ id, title, resume, startDate }) => {
            return (
              <li key={id} className="space-y-2 py-4">
                <div>
                  <p className="inline-flex items-center space-x-1 text-xs font-semibold  text-slate-500">
                    <CalendarIcon className="h-5 w-5" />
                    <span>
                      {format(parseISO(startDate || ""), "dd LLLL", {
                        locale: ptBR,
                      })}
                    </span>
                  </p>
                  <h4 className="text-lg text-cyan-600">
                    <Link href="#">{title}</Link>
                  </h4>
                </div>
                <p className="text-sm text-slate-600">{resume}</p>
              </li>
            );
          })}
        </ul>
        <div className="flex">
          <Link
            href="#"
            className="flex-1 rounded-md bg-slate-200 px-12 py-4 text-center font-medium uppercase text-slate-500"
          >
            Ver mais eventos
          </Link>
        </div>
      </div>
    </section>
  );
};
