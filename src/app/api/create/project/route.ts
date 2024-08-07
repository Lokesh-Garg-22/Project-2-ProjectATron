import dbConnect from "@/lib/db/dbConnect";
import Project, { projectSchema } from "@/lib/db/models/Project";
import { HydratedDocument } from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnect();
  const data = new URL(req.url).searchParams;
  console.log(await req.body;
  try {
    const project: HydratedDocument<projectSchema> = new Project({
      name: data.get("name") as string,
      userID: "", //TODO userID
      tags: data.get("tags"),
      discription: data.get("discription") as String,
      url: data.get("url") as String,
      teamID: data.get("teamID") as String, //TODO teamID
    });
    // FIX await project.save();
    return NextResponse.json({ project: project });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
