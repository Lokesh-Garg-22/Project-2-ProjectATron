import dbConnect from "@/lib/db/dbConnect";
import Project from "@/lib/db/models/Project";
import EscapeRegex from "@/lib/db/utils/EscapeRegex";
import TryCatch from "@/lib/db/utils/TryCatch";
import { NextResponse } from "next/server";

export const GET = TryCatch(async (req: Request) => {
  await dbConnect();
  const data = new URL(req.url).searchParams;
  const regex = new RegExp(EscapeRegex(data.get("search") || ""), "gi");
  const projects = await Project.find({
    userID: data.get("id"),
    name: regex,
    ...(data.get("pinned") != null
      ? { pinned: data.get("pinned") == "true" }
      : {}),
  });
  return NextResponse.json({ projects });
});
