export interface ProjectInterface {
  name: string;
  id: string;
  tags: Array<string | null>;
  hostID: string;
  teamID?: string;
  host?: { name: string; id: string };
  team?: { name: string; id: string };
  url?: string;
}
