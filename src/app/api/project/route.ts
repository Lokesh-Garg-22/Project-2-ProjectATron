import Project from "@/lib/db/models/Project";
import TryCatch from "@/lib/db/utils/TryCatch";
import { NextResponse } from "next/server";

export const GET = TryCatch(async (req: Request) => {
  const data = new URL(req.url).searchParams;
  const project = await Project.findById(data.get("id"));
  return NextResponse.json({ project });
});
