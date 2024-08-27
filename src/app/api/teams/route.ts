import dbConnect from "@/lib/db/dbConnect";
import { DataRequest } from "@/lib/db/interface";
import Team, { teamSchema } from "@/lib/db/models/Team";
import userAuthentication from "@/lib/db/userAuthentication";
import EscapeRegex from "@/lib/db/utils/EscapeRegex";
import GetData from "@/lib/db/utils/GetData";
import TryCatch from "@/lib/db/utils/TryCatch";
import { HydratedDocument } from "mongoose";
import { NextResponse } from "next/server";

export const POST = TryCatch(async (req: DataRequest) => {
  await dbConnect();
  await GetData(req);
  await userAuthentication(req);

  const regex = new RegExp(EscapeRegex(req.data.search || ""), "gi");
  const teams: HydratedDocument<teamSchema>[] = await Team.find({
    hostID: req.data.userID,
    name: regex,
  });
  return NextResponse.json(teams);
});
