import dbConnect from "@/lib/db/dbConnect";
import { DateRequest } from "@/lib/db/interface";
import Team, { teamSchema } from "@/lib/db/models/Team";
import userAuthentication from "@/lib/db/userAuthentication";
import GetData from "@/lib/db/utils/GetData";
import TryCatch from "@/lib/db/utils/TryCatch";
import { HydratedDocument } from "mongoose";
import { NextResponse } from "next/server";

export const POST = TryCatch(async (req: DateRequest) => {
  await dbConnect();
  await GetData(req);
  await userAuthentication(req);
  const team: HydratedDocument<teamSchema> = new Team({
    name: req.data.name as string,
    hostID: req.data.userID as string,
    userIDs: req.data.userIDs as string[],
  });
  //[ ] await project.save();
  return NextResponse.json({ team: team });
});
