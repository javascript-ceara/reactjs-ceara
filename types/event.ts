import { Presentation } from "./presentation";

export type Event = Partial<{
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  resume: string;
  placeName: string;
  registrationLink: string;
  cfpLink: string;
  placeAddress: string;
  presentations: Array<Presentation>;
}>;
