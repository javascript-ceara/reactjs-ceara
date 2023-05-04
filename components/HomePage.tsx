import Image from "next/image";
import { EventsSection } from "@/components/EventsSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NextEventSection } from "@/components/NextEventSection";
import { Event } from "@/types/event";
import { Community } from "@/types/community";
import { Person } from "@/types/person";

type Props = {
  nextEvent: Event;
  previousEvents: Event[];
  community?: Community;
  organizers: Person[];
};

export const HomePage = ({ nextEvent, previousEvents, organizers }: Props) => {
  return (
    <div>
      <Header />
      <NextEventSection event={nextEvent} />
      <EventsSection events={previousEvents} />
      <section>
        <div className="px-8 py-16 lg:mx-auto lg:max-w-3xl lg:px-0">
          <h2 className="mb-8 text-center text-sm font-semibold uppercase text-cyan-600">
            A comunidade
          </h2>
          <p className="mb-8 text-slate-600">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English.
          </p>
          <h2 className="mb-8 text-center text-sm uppercase text-slate-500">
            Organizadores
          </h2>
          <ul className="flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row sm:items-stretch">
            {organizers.map((item) => (
              <li className="w-52  rounded-md border border-slate-200 p-4">
                <div
                  key={item.id}
                  className="relative mb-4 h-44 w-44 overflow-hidden rounded-md"
                >
                  <Image
                    src={item.avatar?.url || ""}
                    alt={item.name || ""}
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
                <h4 className="text-lg text-slate-600">{item.name}</h4>
                <p className="text-sm text-slate-500">{item.jobTitle}</p>
                <p className="mt-2 text-xs font-semibold  text-slate-500">
                  {item.github}
                </p>
              </li>
            ))}
          </ul>
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
