import { ProfileInterface } from "../profile/interface";

export interface TeamInterface {
  name: string;
  hostID: string;
  host?: ProfileInterface;
  userIDs: string[];
  users?: ProfileInterface[];
  id: string;
}
