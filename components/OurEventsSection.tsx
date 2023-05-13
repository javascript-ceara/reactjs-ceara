import { Event } from "@/types/event";
import { Presentation } from "@/types/presentation";

import { getPersonById } from "@/api/operations/getPersonById";
import { getPresentations } from "@/api/operations/getPresentations";
import { Disclosure } from "@headlessui/react";
import { useState } from "react";
import { PresentationItem } from "./PresentationItem";
import { SpinIcon } from "./SpinIcon";
import { StartDate } from "./StartDate";

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
  const [eventPresentations, setEventPresentations] = useState<{
    [eventId: string]: Presentation[];
  }>({});
  const [isLoadingPresentations, setIsLoadingPresentations] = useState(false);

  const loadEventPresentations = async (
    eventId: string,
    presentationIds: (string | undefined)[]
  ) => {
    try {
      let presentations = await getPresentations({
        where: {
          sys: {
            id_in: presentationIds.filter(Boolean),
          },
        },
      });

      setIsLoadingPresentations(true);
      presentations = await Promise.all(
        presentations.map(async (presentation) => {
          if (presentation.author?.id) {
            const author = await getPersonById(presentation.author.id);
            return {
              ...presentation,
              author,
            };
          }
          return presentation;
        })
      );

      setEventPresentations((prevEventPresentations) => ({
        ...prevEventPresentations,
        [eventId]: presentations,
      }));
      setIsLoadingPresentations(false);
    } catch (error) {
      console.error("Erro ao carregar apresentações do evento:", error);
    } finally {
      setIsLoadingPresentations(false);
    }
  };
  return (
    <section id="events" className="bg-gray-100">
      <div className="px-8 py-16 lg:mx-auto lg:max-w-3xl lg:px-0">
        <h2 className="mb-8 text-center text-2xl text-sky-700">
          Nossos eventos
        </h2>
        {events.length ? (
          <ul className="space-y-2 divide-y-2 divide-gray-200">
            {events.map(({ id, title, resume, startDate, presentations }) => {
              const presentationsForEvent = eventPresentations[id ?? ""] || [];
              return (
                <Disclosure key={id}>
                  <li className="space-y-2 py-4">
                    <div>
                      <p className="mb-2 inline-flex items-center space-x-1 text-sm  text-gray-600">
                        <StartDate startDate={startDate} />
                      </p>
                      <Disclosure.Button
                        onClick={() =>
                          presentations &&
                          loadEventPresentations(
                            id ?? "",
                            presentations?.map(
                              (presentation) => presentation.id
                            )
                          )
                        }
                        className="flex w-fit text-start"
                      >
                        <h4 className="text-xl text-gray-600">{title}</h4>
                      </Disclosure.Button>
                    </div>
                    <p className="text-sm text-gray-600">{resume}</p>
                    <Disclosure.Panel>
                      {presentationsForEvent.length !== 0 && (
                        <p className="mt-4 text-center text-sky-700">
                          Apresentações
                        </p>
                      )}
                      <ul className="text-gray-500">
                        {isLoadingPresentations ? (
                          <span>Carregando apresentações...</span>
                        ) : (
                          <>
                            {presentationsForEvent.length ? (
                              <PresentationItem
                                eventsPresentation={presentationsForEvent}
                              />
                            ) : (
                              <span>Sem apresentações</span>
                            )}
                          </>
                        )}
                      </ul>
                    </Disclosure.Panel>
                  </li>
                </Disclosure>
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
