import dbConnect from "@/lib/db/dbConnect";
import Project from "@/lib/db/models/Project";
import TryCatch from "@/lib/db/utils/TryCatch";
import { NextResponse } from "next/server";

export const GET = TryCatch(async (req: Request) => {
  await dbConnect();
  const data = new URL(req.url).searchParams;
  const projects = await Project.find({
    userID: data.get("id"),
  });
  return NextResponse.json({ projects });
});
