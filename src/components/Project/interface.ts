export interface ProjectInterface {
  name: string;
  id: string;
  tags: Array<string | null>;
  hostID: string;
  host?: { name: string; id: string };
  url?: string;
}
