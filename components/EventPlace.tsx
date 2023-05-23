import { Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { Popover, Transition } from "@headlessui/react";

import MapPinIcon from "@heroicons/react/24/outline/MapPinIcon";

import { Event } from "@/types/event";

type Props = Event & {
  palette: "white" | "gray";
};

export const EventPlace = ({
  placeName,
  placeAddress,
  isAnOnlineEvent,
  palette,
}: Props) => {
  return (
    <Popover className="relative">
      {() => (
        <>
          <Popover.Button
            className={twMerge(
              "flex items-center space-x-1",
              palette === "gray" && "text-gray-600",
              palette === "white" && "text-white"
            )}
          >
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
            <Popover.Panel
              className={twMerge(
                "absolute left-1/2 z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-sm"
              )}
            >
              <div className="space-y-4 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
                <address className="relative">
                  <p className="text-sm text-gray-600">{placeAddress}</p>
                </address>
                {isAnOnlineEvent && (
                  <a
                    href={"https://discord.gg/AxegbMbgD3"}
                    target="_blank"
                    className="inline-block text-sm font-semibold text-sky-700"
                  >
                    Entrar no Discord
                  </a>
                )}
                {!isAnOnlineEvent && (
                  <a
                    href={`https://www.google.com/maps/search/${placeName}`}
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
  );
};
