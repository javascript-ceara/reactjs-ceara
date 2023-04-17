import { Event as EventType, Sys } from "../schema";

export type Event = {
  sys: Pick<Sys, "id">;
  title: EventType["title"];
  startDate: EventType["startDate"];
  endDate: EventType["endDate"];
  resume: EventType["resume"];
  placeName: EventType["placeName"];
  placeAddress: EventType["placeAddress"];
  presentationCollection: EventType["presentationCollection"];
};
