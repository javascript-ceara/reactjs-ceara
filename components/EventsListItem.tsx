import { Disclosure } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

import ChevronUpIcon from "@heroicons/react/24/outline/ChevronUpIcon";
import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";

import { EventPlace } from "./EventPlace";
import { EventStartDate } from "./EventStartDate";

import { Event } from "@/types/event";
import { Presentation } from "@/types/presentation";
import { useEffect, useState } from "react";

type Props = Event & {
  presentationsListRender: (
    presentationIds: Array<Presentation["id"]>
  ) => React.ReactNode;
};

export const EventsListItem = ({
  startDate,
  title,
  placeName,
  placeAddress,
  resume,
  cfpLink,
  isAnOnlineEvent,
  presentations,
  registrationLink,
  presentationsListRender,
}: Props) => {
  const [ids, setIds] = useState<Array<Presentation["id"]>>([]);

  useEffect(() => {
    setIds((prev) => {
      if (presentations) {
        return presentations.map((presentation) => presentation.id);
      }
      return prev;
    });
  }, [presentations]);

  return (
    <Disclosure
      as="li"
      className={({ open }) =>
        twMerge(
          "overflow-hidden rounded-md border border-gray-200 transition-all",
          open && "border-gray-300 bg-gray-100"
        )
      }
    >
      {({ open }) => (
        <>
          <div
            className={twMerge(
              "flex items-center justify-between p-4",
              open && "border-b border-b-gray-300 bg-gray-200/50"
            )}
          >
            <div>
              <p className={twMerge("mb-2 text-sm text-gray-600")}>
                <EventStartDate startDate={startDate} />
              </p>
              <h4
                className={twMerge(
                  "text-xl text-gray-600",
                  open && "font-semibold"
                )}
              >
                {title}
              </h4>
            </div>
            <Disclosure.Button className="ml-4 text-gray-600">
              <ChevronUpIcon
                className={twMerge(
                  "h-5 w-5 transition-all",
                  (open && "rotate-180") || "rotate-0"
                )}
              />
            </Disclosure.Button>
          </div>
          <Disclosure.Panel className="space-y-8 py-8" unmount={false}>
            <p
              className={twMerge(
                "mx-auto max-w-2xl text-center text-gray-600 transition-colors"
              )}
            >
              {resume}
            </p>
            <div>
              <p className="mb-8  border-y border-y-gray-300 bg-gray-200/50 p-4 text-center text-sm uppercase">
                Local e data
              </p>
              <div className="mb-4 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-2 sm:space-y-0">
                <EventPlace
                  palette="gray"
                  placeName={placeName}
                  placeAddress={placeAddress}
                  isAnOnlineEvent={isAnOnlineEvent}
                />
                <p className="inline-flex items-center space-x-1 text-sm  font-semibold text-gray-600">
                  <CalendarIcon className="h-5 w-5" />
                  <EventStartDate startDate={startDate} showTime />
                </p>
              </div>
            </div>
            <div>
              <p className="border-y border-y-gray-300 bg-gray-200/50 p-4 text-center text-sm  uppercase">
                Agenda
              </p>
              {open && presentationsListRender(ids)}
            </div>
            <div className="px-8">
              <div className="mb-8 flex items-center justify-center px-12 py-4">
                <a
                  href={cfpLink || "#"}
                  target="_blank"
                  className="text-lg text-gray-600"
                >
                  Envie sua palestra
                </a>
              </div>
              <a
                href={registrationLink || "#"}
                target="_blank"
                className="font block rounded-md bg-sky-700 px-12 py-4 text-center text-lg font-semibold uppercase text-white"
              >
                Inscreva-se
              </a>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
