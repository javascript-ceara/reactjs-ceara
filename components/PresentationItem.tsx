import { Presentation } from "@/types/presentation";
import Image from "next/image";
type PresentationsProp = {
  eventsPresentation: Array<Presentation>;
};

export const PresentationItem = ({ eventsPresentation }: PresentationsProp) => {
  return (
    <>
      {eventsPresentation?.map((presentation) => {
        return (
          <li key={presentation.id} className="flex flex-col gap-3 pt-8">
            <div className="flex items-center gap-2">
              {presentation?.author?.avatar?.url && (
                <div className="relative h-10 w-10  overflow-x-hidden rounded-full">
                  <Image
                    src={presentation.author.avatar.url}
                    alt={presentation.author.name || ""}
                    fill
                  />
                </div>
              )}
              <span>{presentation.author?.name}</span>
            </div>
            <span className="font-semibold">{presentation.title}</span>
            <p>{presentation.description}</p>
          </li>
        );
      })}
    </>
  );
};
