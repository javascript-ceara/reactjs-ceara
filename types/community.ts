import { Person } from "./person";

export type Community = Partial<{
  id: string;
  title: string;
  text: {
    json: any;
  };
  organizers: Array<Person>;
}>;
