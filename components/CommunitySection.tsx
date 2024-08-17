import Image from "next/image";
import { CommunityText } from "./CommunityText";
import { Community } from "@/types/community";
import { GithubIcon } from "@/components/GithubIcon";
import { Person } from "@/types/person";

type Props = {
  community?: Community;
  organizers: Person[];
};

export const CommunitySection = ({ community, organizers }: Props) => {
  return (
    <section id="community">
      <div className="px-8 py-16 lg:mx-auto lg:max-w-3xl lg:px-0">
        <h2 className="mb-8 text-center text-2xl">A comunidade</h2>
        {community && <CommunityText text={community.text?.json} />}
        <h3 className="mb-8 text-center text-sm uppercase text-slate-500">
          Organizadores
        </h3>
        <ul className=" flex flex-col flex-wrap gap-4 sm:flex-row sm:items-stretch sm:justify-center">
          {organizers.map((organizer) => (
            <li
              key={organizer.id}
              className="flex  items-center space-x-2 rounded-2xl border border-gray-200 p-4 sm:w-40 sm:flex-col sm:space-x-0 sm:space-y-2"
            >
              {organizer.avatar?.url && (
                <div className="relative h-20 w-20 overflow-hidden rounded-full sm:h-24 sm:w-24">
                  <Image
                    src={organizer.avatar?.url || ""}
                    alt={organizer.name || ""}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h5 className="text-lg text-gray-700 sm:text-center">
                  {organizer.name}
                </h5>
                <p className="text-center text-xs text-gray-500">
                  {organizer.jobTitle}
                </p>
                {organizer.github && (
                  <p className="mt-2 flex items-center text-sm text-slate-500  sm:justify-center">
                    <GithubIcon className="mr-1 h-4 w-4 fill-gray-500" />
                    <a
                      href={`https://github.com/${organizer.github}`}
                      target="_blank"
                    >
                      {organizer.github}
                    </a>
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center  text-gray-700">
          Quer contribuir com a comunidade?
        </p>
        <p className="text-center text-gray-700">
          <a href="https://www.instagram.com/javascriptceara/" target="_blank">
            Envie um direct para{" "}
            <span className="text-pink-700">instagram.com/javascriptceara</span>
          </a>
        </p>
      </div>
    </section>
  );
};
