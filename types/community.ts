import { Person } from "./person";

export type Community = Partial<{
  id: string;
  title: string;
  text: any;
  organizers: Array<Person>;
}>;
