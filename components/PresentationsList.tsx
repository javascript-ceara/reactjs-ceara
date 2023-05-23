import Image from "next/image";
import { twMerge } from "tailwind-merge";

import { Presentation } from "@/types/presentation";

export type Props = {
  presentations: Presentation[];
  palette: "white" | "gray";
};
export const PresentationsList = ({ presentations, palette }: Props) => {
  return (
    <div className="relative min-h-[200px]">
      {presentations.length ? (
        <ul
          className={twMerge(
            "px-8",
            palette === "gray" && "divide-y divide-gray-300",
            palette === "white" && "divide-y divide-gray-100"
          )}
        >
          {presentations.map((presentation) => {
            return (
              <li key={presentation.id} className="py-8">
                <p
                  className={twMerge(
                    "mb-4 flex items-center space-x-2",
                    palette === "gray" && "text-gray-600",
                    palette === "white" && "text-white"
                  )}
                >
                  <span className="relative h-10 w-10 overflow-x-hidden rounded-full">
                    <Image
                      src={presentation.author?.avatar?.url || ""}
                      alt={presentation.author?.name || ""}
                      className="object-cover"
                      fill
                    />
                  </span>
                  <span>{presentation.author?.name}</span>
                </p>
                <h5
                  className={twMerge(
                    "mb-2 text-xl",
                    palette === "gray" && "text-gray-600",
                    palette === "white" && "text-white"
                  )}
                >
                  {presentation.title}
                </h5>
                <p
                  className={twMerge(
                    "text-sm",
                    palette === "gray" && "text-gray-600",
                    palette === "white" && "text-white"
                  )}
                >
                  {presentation.description}
                </p>
              </li>
            );
          })}
        </ul>
      ) : null}
      {!presentations.length ? (
        <p
          className={twMerge(
            "flex h-52 items-center justify-center text-center",
            palette === "gray" && "text-gray-600",
            palette === "white" && "text-white"
          )}
        >
          <span>As palestras aparecerão aqui</span>
        </p>
      ) : null}
    </div>
  );
};
