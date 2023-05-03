import { Popover, Transition } from "@headlessui/react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { Fragment } from "react";

import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";
import MapPinIcon from "@heroicons/react/24/outline/MapPinIcon";
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";

import { Event } from "../types/event";

type Props = {
  event: Event;
};
export const NextEventSection = ({ event }: Props) => {
  return (
    <section className="bg-slate-800">
      <div className="px-8 py-16 md:mx-auto md:max-w-3xl md:px-0">
        <h2 className="mb-16 text-center text-xs font-semibold uppercase text-slate-300">
          <span className="rounded-md border border-slate-600 px-2 py-1">
            Próximo evento
          </span>
        </h2>
        <div className="mb-4 flex items-center justify-center space-x-4">
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button className="flex items-center space-x-1 text-slate-300">
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
                  <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-sm">
                    <div className="space-y-4 overflow-hidden rounded-lg border border-slate-200 bg-white p-4 shadow-lg">
                      <address className="relative space-y-2">
                        <p className="text-sm not-italic text-slate-500">
                          {event.placeName}
                        </p>
                        <p className="text-slate-600">{event.placeAddress}</p>
                      </address>
                      <Link
                        href={`https://www.google.com/maps/search/${event.placeName}`}
                        target="_blank"
                        className="inline-block text-sm font-semibold text-slate-600"
                      >
                        Ver no mapa
                      </Link>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
          <p className="inline-flex items-center space-x-1 text-sm   text-slate-300">
            <CalendarIcon className="h-5 w-5" />
            <span>
              {format(parseISO(event.startDate || ""), "dd LLLL, K:mm'h'", {
                locale: ptBR,
              })}
            </span>
          </p>
        </div>
        <h3 className="mb-4 text-center text-3xl  font-bold text-cyan-400 sm:text-6xl">
          {event.title}
        </h3>
        <p className="mx-auto max-w-xl text-center text-base text-slate-300">
          {event.resume}
        </p>

        <div className="mb-16 mt-16 space-y-4">
          <h2 className="text-center text-xs font-semibold uppercase text-slate-300">
            <span className="rounded-md border border-slate-600 px-2 py-1">
              Agenda
            </span>
          </h2>
          {event.presentations?.length ? (
            <ul className="divide-y-2 divide-slate-700/25 rounded-2xl">
              {event.presentations?.map((presentation) => (
                <li key={presentation.id} className="space-y-2 px-8 py-8">
                  <p className="flex items-center space-x-1 text-slate-300">
                    <UserCircleIcon className="h-10 w-10" />
                    <span>{presentation.author?.name}</span>
                  </p>
                  <div className="space-y-1">
                    <h4 className="text-lg text-cyan-400">
                      {presentation.title}
                    </h4>
                    <p className=" text-sm text-slate-300">
                      {presentation.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-sm leading-10 text-slate-500">
              As palestras aparecerão aqui
            </p>
          )}

          <div className="text-center">
            <Link href="#" className="font-semibold text-cyan-400">
              Envie sua palestra
            </Link>
          </div>
        </div>

        <div className="flex">
          <Link
            href="#"
            className="flex-1 rounded-md bg-cyan-400 px-12 py-4 text-center text-lg font-medium uppercase text-slate-800"
          >
            Inscreva-se
          </Link>
        </div>
      </div>
    </section>
  );
};
