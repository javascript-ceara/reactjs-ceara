import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NextEventSection } from "@/components/NextEventSection";
import { Event } from "@/types/event";
import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";
import Link from "next/link";

type Props = {
  nextEvent: Event;
  previousEvents: Event[];
};

export const HomePage = ({ nextEvent, previousEvents }: Props) => {
  return (
    <div>
      <Header />
      <NextEventSection event={nextEvent} />
      <section className="bg-slate-100">
        <div className="space-y-16 px-8 py-16 lg:mx-auto lg:max-w-3xl lg:px-0">
          <h2 className="text-center text-sm uppercase text-cyan-600">
            Eventos anteriores
          </h2>
          <ul className="space-y-2 divide-y-2">
            <li className="space-y-2 py-4">
              <div>
                <p className="inline-flex items-center space-x-1 text-xs font-semibold  text-slate-500">
                  <CalendarIcon className="h-5 w-5" />
                  <span>22 Abril</span>
                </p>
                <h4 className="text-lg text-cyan-600">
                  <Link href="#">6º Meetup ReactJS Ceará</Link>
                </h4>
              </div>
              <p className="text-sm text-slate-600">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book
              </p>
            </li>
            <li className="space-y-2 py-4">
              <div>
                <p className="inline-flex items-center space-x-1 text-xs font-semibold  text-slate-500">
                  <CalendarIcon className="h-5 w-5" />
                  <span>22 Abril</span>
                </p>
                <h4 className="text-lg text-cyan-600">
                  <Link href="#">6º Meetup ReactJS Ceará</Link>
                </h4>
              </div>
              <p className="text-sm text-slate-600">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book
              </p>
            </li>
            <li className="space-y-2 py-4">
              <div>
                <p className="inline-flex items-center space-x-1 text-xs font-semibold  text-slate-500">
                  <CalendarIcon className="h-5 w-5" />
                  <span>22 Abril</span>
                </p>
                <h4 className="text-lg text-cyan-600">
                  <Link href="#">6º Meetup ReactJS Ceará</Link>
                </h4>
              </div>
              <p className="text-sm text-slate-600">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book
              </p>
            </li>
          </ul>
        </div>
      </section>
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
