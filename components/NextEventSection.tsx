import Link from "next/link";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import MapPinIcon from "@heroicons/react/24/outline/MapPinIcon";
import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";

export const NextEventSection = ({ event }) => {
  return (
    <section className="bg-gray-50">
      <div className="space-y-8 px-8 py-16 md:mx-auto md:max-w-3xl md:px-0">
        <div className="flex flex-col items-center space-y-6">
          <p className="inline rounded-md border border-slate-500 px-2 py-1 text-xs uppercase">
            Próximo evento
          </p>
          <div className="flex items-center space-x-4">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button className="flex items-center space-x-1  text-slate-600">
                    <MapPinIcon className="h-5 w-5" />
                    <span>Digital College Sul</span>
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
                          <p className="font-semibold not-italic text-slate-500">
                            Digital College Sul
                          </p>
                          <p className="text-slate-600">
                            Av. Washington Soares, 3663 - Torre 2 - 4º andar -
                            Edson Queiroz, Fortaleza - CE
                          </p>
                        </address>
                        <Link
                          href="#"
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
            <p className="inline-flex items-center space-x-1 text-sm font-semibold  text-cyan-600">
              <CalendarIcon className="h-5 w-5" />
              <span>22 Abril, 09:00h - 12:00h</span>
            </p>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-center text-3xl font-bold text-cyan-600 sm:text-5xl">
            {event.title}
          </h2>
          <p className="text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-center">
            <span className="rounded-md border border-slate-500 px-2 py-1 text-center text-xs uppercase">
              Agenda
            </span>
          </h3>
          <ul className="divide-y-2">
            <li className="space-y-2 py-4">
              <p className="flex items-center space-x-1 text-slate-600">
                <UserCircleIcon className="h-10 w-10" />
                <span>Cicero Viana</span>
              </p>
              <div className="space-y-1">
                <h4 className="lg text-lg text-cyan-600">
                  Fundamentos de ReactJS
                </h4>
                <p className="text-sm text-slate-600">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </li>
            <li className="space-y-2 py-4">
              <p className="flex items-center space-x-1 text-slate-600">
                <UserCircleIcon className="h-10 w-10" />
                <span>Cicero Viana</span>
              </p>
              <div className="space-y-1">
                <h4 className="text-lg text-cyan-600">
                  Fundamentos de ReactJS
                </h4>
                <p className="text-sm text-slate-600">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </li>
          </ul>
          <div className="space-x-4 text-center">
            <Link href="#" className="font-semibold text-cyan-600">
              Envie sua palestra
            </Link>
            <Link href="#" className="text-slate-600">
              Ver agenda completa
            </Link>
          </div>
        </div>
        <div className="flex">
          <Link
            href="#"
            className="flex-1  rounded-md bg-cyan-600 px-12 py-4 text-center text-lg uppercase text-white"
          >
            Inscreva-se
          </Link>
        </div>
      </div>
    </section>
  );
};
