import Image from "next/image";

import { EventStartDate } from "./EventStartDate";
import { EventPlace } from "./EventPlace";
import { PresentationsList } from "./PresentationsList";
import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";

import { Event } from "../types/event";

type Props = {
  event: Event;
};

export const HighlightedEventSection = ({ event }: Props) => {
  return (
    <section className="bg-sky-800">
      <div className="px-8 py-16 md:mx-auto md:max-w-3xl">
        <div className="mb-8 flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <EventPlace
            palette="white"
            placeName={event.placeName}
            placeAddress={event.placeAddress}
            isAnOnlineEvent={event.isAnOnlineEvent}
          />
          <p className="inline-flex items-center space-x-1 text-sm  text-white">
            <CalendarIcon className="h-5 w-5" />
            <EventStartDate startDate={event.startDate} showTime />
          </p>
        </div>
        <h2 className="mb-2 text-center text-2xl font-semibold text-white sm:text-5xl md:text-6xl ">
          {event.title}
        </h2>
        <p className="mx-auto max-w-xl text-center text-white">
          {event.resume}
        </p>

        <h2 className="uppercas mt-16 text-center text-xs font-semibold">
          <span className="rounded-md border border-white px-2 py-1 text-white">
            Agenda
          </span>
        </h2>

        {event.presentations ? (
          <PresentationsList
            palette="white"
            presentations={event.presentations}
          />
        ) : null}

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
