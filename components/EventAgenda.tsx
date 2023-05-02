import Link from "next/link";
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";
import { Presentation } from "@/types/presentation";

type Props = {
  presentations: Presentation[];
};

export const EventAgenda = ({ presentations }: Props) => {
  return (
    <div className="mb-16 mt-16 space-y-4">
      <h2 className="text-center text-xs font-semibold uppercase text-slate-300">
        <span className="rounded-md border border-slate-600 px-2 py-1">
          Agenda
        </span>
      </h2>
      {!presentations.length ? (
        <ul className="divide-y-2 divide-slate-700/25 rounded-2xl">
          {presentations?.map((presentation) => (
            <li key={presentation.id} className="space-y-2 px-8 py-8">
              <p className="flex items-center space-x-1 text-slate-300">
                <UserCircleIcon className="h-10 w-10" />
                <span>{presentation.author?.name}</span>
              </p>
              <div className="space-y-1">
                <h4 className="text-lg text-cyan-400">{presentation.title}</h4>
                <p className=" text-sm text-slate-300">
                  {presentation.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-sm leading-10 text-slate-500">
          As palestras aparecerão aqui
        </p>
      )}

      <div className="text-center">
        <Link href="#" className="font-semibold text-cyan-400">
          Envie sua palestra
        </Link>
      </div>
    </div>
  );
};
