import { DataRequest } from "../interface";

export default async function GetData(req: DataRequest) {
  req.data = await req.json();
}
