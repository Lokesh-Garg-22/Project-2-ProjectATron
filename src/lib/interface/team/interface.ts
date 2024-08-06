export interface TeamInterface {
  name: string;
  hostID: string;
  host?: { name: string; id: string };
  userIDs: Array<string>;
  users?: Array<{ name: string; id: string }>;
  id: string;
}
