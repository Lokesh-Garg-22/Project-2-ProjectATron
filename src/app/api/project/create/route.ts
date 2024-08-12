import dbConnect from "@/lib/db/dbConnect";
import { DateRequest } from "@/lib/db/interface";
import Project, { projectSchema } from "@/lib/db/models/Project";
import userAuthentication from "@/lib/db/userAuthentication";
import GetData from "@/lib/db/utils/GetData";
import TryCatch from "@/lib/db/utils/TryCatch";
import { HydratedDocument } from "mongoose";
import { NextResponse } from "next/server";

export const POST = TryCatch(async (req: DateRequest) => {
  await dbConnect();
  await GetData(req);
  await userAuthentication(req);
  const project: HydratedDocument<projectSchema> = new Project({
    name: req.data.name as string,
    userID: req.data.userID as string,
    tags: req.data.tags as string[],
    description: req.data.discription as String,
    url: req.data.url as String,
    teamID: req.data.teamID as String,
  });
  //[ ]
  await project.save();
  return NextResponse.json({ project: project });
});
