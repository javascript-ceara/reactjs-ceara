import { EventsList } from "./EventsList";
import { SpinIcon } from "./SpinIcon";

import { Event } from "@/types/event";
import { Presentation } from "@/types/presentation";

type Props = {
  events: Event[];
  onLoadMoreEvents: () => void;
  isLoadingEvents: boolean;
  hasNoMoreEventsToLoad: boolean;
  presentationsListRender: (
    presentationIds: Array<Presentation["id"]>
  ) => React.ReactNode;
};

export const OurEventsSection = ({
  events,
  onLoadMoreEvents,
  isLoadingEvents,
  hasNoMoreEventsToLoad,
  presentationsListRender,
}: Props) => {
  return (
    <section id="events" className="bg-gray-100">
      <div className="px-8 py-16 lg:mx-auto lg:max-w-3xl lg:px-0">
        <h2 className="mb-8 text-center text-2xl text-sky-700">
          Nossos eventos
        </h2>
        <EventsList
          events={events}
          presentationsListRender={presentationsListRender}
        />
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
