import { Popover, Transition } from "@headlessui/react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import { Fragment } from "react";

import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";
import MapPinIcon from "@heroicons/react/24/outline/MapPinIcon";

import { Event } from "../types/event";

type Props = {
  event: Event;
};

export const HighlightedEventSection = ({ event }: Props) => {
  return (
    <section className="bg-sky-800">
      <div className="px-8 py-16 md:mx-auto md:max-w-3xl">
        <div className="mb-8 flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Popover className="relative">
            {() => (
              <>
                <Popover.Button className="flex items-center space-x-1 text-white">
                  <MapPinIcon className="h-5 w-5" />
                  <span>{event.placeName}</span>
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute left-3/4 z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-sm">
                    <div className="space-y-4 overflow-hidden rounded-lg border border-slate-200 bg-white p-4 shadow-lg">
                      <address className="relative">
                        <p className="mb-2 text-sm font-medium not-italic text-gray-500">
                          {event.placeName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {event.placeAddress}
                        </p>
                      </address>
                      {!event.isAnOnlineEvent && (
                        <a
                          href={`https://www.google.com/maps/search/${event.placeName}`}
                          target="_blank"
                          className="inline-block text-sm text-gray-600"
                        >
                          Ver no mapa
                        </a>
                      )}
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
          <p className="inline-flex items-center space-x-1 text-sm  text-white">
            <CalendarIcon className="h-5 w-5" />
            <span>
              {event.startDate &&
                format(
                  parseISO(event.startDate || ""),
                  "dd LLLL 'de' yyyy 'às' K:mm'h'",
                  {
                    locale: ptBR,
                  }
                )}
            </span>
          </p>
        </div>
        <h2 className="mb-2 text-center text-2xl font-semibold text-white sm:text-5xl md:text-6xl ">
          {event.title}
        </h2>
        <p className="mx-auto max-w-xl text-center text-white">
          {event.resume}
        </p>

        <h2 className="mt-16 text-center text-xs font-semibold uppercase text-slate-300">
          <span className="rounded-md border border-white px-2 py-1 text-white">
            Agenda
          </span>
        </h2>

        {event.presentations?.length ? (
          <ul className="divide-y-2 divide-sky-700 rounded-2xl">
            {event.presentations?.map((presentation) => (
              <li key={presentation.id} className="py-8">
                <p className="mb-4 flex items-center space-x-2 text-white">
                  {presentation.author?.avatar?.url && (
                    <span className="relative h-10 w-10  overflow-x-hidden rounded-full">
                      <Image
                        src={presentation.author?.avatar?.url}
                        alt={presentation.author.name || ""}
                        className="object-cover"
                        fill
                      />
                    </span>
                  )}
                  <span>{presentation.author?.name}</span>
                </p>
                <h3 className="mb-2 text-xl text-white">
                  {presentation.title}
                </h3>
                <p className="text-sm text-white">{presentation.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-center text-sm leading-10 text-white">
            As palestras aparecerão aqui
          </p>
        )}

        <div className="mb-8 flex items-center justify-center px-12 py-4">
          <a
            href={event.cfpLink}
            target="_blank"
            className="text-lg text-white"
          >
            Envie sua palestra
          </a>
        </div>

        <a
          href={event.registrationLink}
          target="_blank"
          className="font block rounded-md bg-sky-700 px-12 py-4 text-center text-lg font-semibold uppercase text-white"
        >
          Inscreva-se
        </a>
      </div>
    </section>
  );
};
