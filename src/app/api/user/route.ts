import dbConnect from "@/lib/db/dbConnect";
import Project from "@/lib/db/models/Project";
import User from "@/lib/db/models/User";
import TryCatch from "@/lib/db/utils/TryCatch";
import { NextResponse } from "next/server";

export const GET = TryCatch(async (req: Request) => {
  await dbConnect();
  const data = new URL(req.url).searchParams;
  const user = await User.findById(data.get("id"));
  user._doc.projects = (await Project.find({ userID: user._id })).length;
  user._doc.password = "";
  return NextResponse.json({ user });
});
