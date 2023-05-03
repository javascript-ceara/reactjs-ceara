import { EventsSection } from "@/components/EventsSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NextEventSection } from "@/components/NextEventSection";
import { Event } from "@/types/event";

type Props = {
  nextEvent: Event;
  previousEvents: Event[];
};

export const HomePage = ({ nextEvent, previousEvents }: Props) => {
  return (
    <div>
      <Header />
      <NextEventSection event={nextEvent} />
      <EventsSection events={previousEvents} />
      <section>
        <div className="space-y-16 px-8 py-16 lg:mx-auto lg:max-w-3xl lg:px-0">
          <h2 className="text-center text-sm uppercase text-cyan-600">
            A comunidade
          </h2>
        </div>
      </section>
      <section>
        <div className="space-y-16 px-8 py-16 lg:mx-auto lg:max-w-3xl lg:px-0">
          <h2 className="text-center">Parceiros</h2>
        </div>
      </section>
      <Footer />
    </div>
  );
};
