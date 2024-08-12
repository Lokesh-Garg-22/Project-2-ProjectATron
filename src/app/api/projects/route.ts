import dbConnect from "@/lib/db/dbConnect";
import Project, { projectSchema } from "@/lib/db/models/Project";
import TryCatch from "@/lib/db/utils/TryCatch";
import { HydratedDocument } from "mongoose";
import { NextResponse } from "next/server";

export const GET = TryCatch(async (req: Request) => {
  await dbConnect();
  const data = new URL(req.url).searchParams;
  const projects: HydratedDocument<projectSchema>[] = await Project.find({
    name: data.get("search"),
  });
  return NextResponse.json(projects);
});
