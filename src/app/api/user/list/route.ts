import dbConnect from "@/lib/db/dbConnect";
import { DataRequest } from "@/lib/db/interface";
import Project from "@/lib/db/models/Project";
import User, { userSchema } from "@/lib/db/models/User";
import EscapeRegex from "@/lib/db/utils/EscapeRegex";
import TryCatch from "@/lib/db/utils/TryCatch";
import { HydratedDocument } from "mongoose";
import { NextResponse } from "next/server";

export const GET = TryCatch(async (req: DataRequest) => {
  await dbConnect();
  const data = new URL(req.url).searchParams;
  const regex = new RegExp(EscapeRegex(data.get("search") || ""), "gi");
  const users = await User.find({
    username: regex,
  });
  for (let i in users) {
    users[i]._doc.projects = (
      await Project.find({ userID: users[i]._id })
    ).length;
  }
  return NextResponse.json({ users });
});
