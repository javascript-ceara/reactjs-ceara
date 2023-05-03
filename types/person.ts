import { Avatar } from "./avatar";

export type Person = Partial<{
  id: string;
  name: string;
  bio: string;
  avatar: Avatar;
}>;
