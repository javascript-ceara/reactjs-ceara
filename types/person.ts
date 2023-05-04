import { Avatar } from "./avatar";

export type Person = Partial<{
  id: string;
  name: string;
  bio: string;
  jobTitle: string;
  company: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  isOrganizer: boolean;
  avatar: Avatar;
}>;
