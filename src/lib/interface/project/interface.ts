export interface ProjectInterface {
  name: string;
  id: string;
  description?: string;
  tags: Array<string | null>;
  userID: string;
  teamID?: string;
  user?: { name: string; id: string };
  team?: { name: string; id: string };
  url?: string;
  pinned?: boolean;
}
