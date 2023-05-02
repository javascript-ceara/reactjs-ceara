import { Fragment } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import MapPinIcon from "@heroicons/react/24/outline/MapPinIcon";
import { Event } from "@/types/event";

type Props = Pick<Event, "placeAddress" | "placeName">;

export const EventPlace = ({ placeName, placeAddress }: Props) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="flex items-center space-x-1 text-slate-300">
            <MapPinIcon className="h-5 w-5" />
            <span>{placeName}</span>
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
                    {placeName}
                  </p>
                  <p className="text-slate-600">{placeAddress}</p>
                </address>
                <Link
                  href={`https://www.google.com/maps/search/${placeName}`}
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
  );
};
