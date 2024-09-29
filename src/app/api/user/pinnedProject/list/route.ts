import dbConnect from "@/lib/db/dbConnect";
import PinnedProject, {
  pinnedProjectSchema,
} from "@/lib/db/models/PinedProject";
import Project from "@/lib/db/models/Project";
import EscapeRegex from "@/lib/db/utils/EscapeRegex";
import TryCatch from "@/lib/db/utils/TryCatch";
import { HydratedDocument } from "mongoose";
import { NextResponse } from "next/server";

export const GET = TryCatch(async (req: Request) => {
  await dbConnect();
  const data = new URL(req.url).searchParams;
  const pinnedList: HydratedDocument<pinnedProjectSchema>[] =
    await PinnedProject.find({ userId: data.get("userId") });
  if (pinnedList.length == 0) return NextResponse.json({ pinned: [] });
  const regex = new RegExp(EscapeRegex(data.get("search") || ""), "gi");
  const pinned = pinnedList[0];
  pinned.projectIDs = pinned.projectIDs.filter(async (ele) =>
    regex.test((await Project.findById(ele)).name)
  );
  return NextResponse.json({ pinned });
});
