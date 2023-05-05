import { Event } from "@/types/event";
import { format, parseISO, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";

import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";
type Props = {
  events: Event[];
};

export const EventsSection = ({ events }: Props) => {
  return (
    <section className="bg-gray-100">
      <div className="px-8 py-16 lg:mx-auto lg:max-w-3xl lg:px-0">
        <h2 className="mb-8 text-center text-2xl text-sky-700">
          Nossos eventos
        </h2>
        {events.length ? (
          <ul className="space-y-2 divide-y-2 divide-gray-200">
            {events.map(({ id, title, resume, startDate }) => {
              return (
                <li key={id} className="space-y-2 py-4">
                  <div>
                    <p className="mb-2 inline-flex items-center space-x-1 text-sm  text-gray-600">
                      {startDate &&
                        format(parseISO(startDate || ""), "dd LLLL, K:mm'h'", {
                          locale: ptBR,
                        })}
                    </p>
                    <h4 className="text-xl text-gray-600">
                      <Link href="#">{title}</Link>
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600">{resume}</p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-center text-sm leading-10 text-gray-300">
            Os eventos aparecerão aqui
          </p>
        )}

        <Link
          href="#"
          className="border-sky-900/10px-12 mt-16 block rounded-md border border-gray-300  py-4 text-center text-gray-600"
        >
          Ver mais eventos
        </Link>
      </div>
    </section>
  );
};
