import { Presentation as PresentationType, Sys, Author } from "../schema";

export interface Presentation {
  sys: Pick<Sys, "id">;
  author: Author;
  description: PresentationType["description"];
  title: PresentationType["title"];
}

export interface EnumPresentations extends Array<Presentation> {}
