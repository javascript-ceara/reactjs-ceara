import { EventsListItem } from "./EventsListItem";

import { Event } from "@/types/event";
import { Presentation } from "@/types/presentation";

type Props = {
  events: Event[];
  presentationsListRender: (
    presentationIds: Array<Presentation["id"]>
  ) => React.ReactNode;
};

export const EventsList = ({ events, presentationsListRender }: Props) => {
  return (
    <div className="min-h-[200px]">
      {events.length ? (
        <ul className="space-y-2">
          {events.map((event) => (
            <EventsListItem
              key={event.id}
              {...event}
              presentationsListRender={presentationsListRender}
            />
          ))}
        </ul>
      ) : null}

      {!events.length ? (
        <p className="text-center text-sm text-gray-600">
          Os eventos aparecerão aqui
        </p>
      ) : null}
    </div>
  );
};
