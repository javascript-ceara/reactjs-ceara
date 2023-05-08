import { Event } from "@/types/event";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";

import { SpinIcon } from "./SpinIcon";

type Props = {
  events: Event[];
  onLoadMoreEvents: () => void;
  isLoadingEvents: boolean;
  hasNoMoreEventsToLoad: boolean;
};

export const OurEventsSection = ({
  events,
  onLoadMoreEvents,
  isLoadingEvents,
  hasNoMoreEventsToLoad,
}: Props) => {
  return (
    <section id="events" className="bg-gray-100">
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
                        format(
                          parseISO(startDate || ""),
                          "dd LLLL 'de' yyyy 'às' K:mm'h'",
                          {
                            locale: ptBR,
                          }
                        )}
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

        <button
          disabled={isLoadingEvents || hasNoMoreEventsToLoad}
          className="border-sky-900/10px-12  mt-16 flex w-full items-center justify-center rounded-md border border-gray-300 py-4  text-center text-gray-700 disabled:cursor-default disabled:border-gray-200 disabled:text-gray-400"
          onClick={onLoadMoreEvents}
        >
          {isLoadingEvents && (
            <SpinIcon className=" mr-2 h-5 w-5 animate-spin fill-gray-600 delay-0" />
          )}
          <span>Ver mais eventos</span>
        </button>
      </div>
    </section>
  );
};
