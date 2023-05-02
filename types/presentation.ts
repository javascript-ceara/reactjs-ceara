import { Author } from "./author";

export type Presentation = Partial<{
  id: string;
  author: Author;
  description: string;
  title: string;
}>;
