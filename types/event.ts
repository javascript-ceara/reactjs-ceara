import { Presentation } from "./presentation";

export type Event = Partial<{
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  resume: string;
  placeName: string;
  placeAddress: string;
  presentations: Presentation[];
}>;
