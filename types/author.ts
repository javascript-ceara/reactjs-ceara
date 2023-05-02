import { Avatar } from "./avatar";

export type Author = Partial<{
  id: string;
  name: string;
  bio: string;
  avatar: Avatar;
}>;
