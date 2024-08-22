import dbConnect from "@/lib/db/dbConnect";
import { DataRequest } from "@/lib/db/interface";
import User, { userSchema } from "@/lib/db/models/User";
import TryCatch from "@/lib/db/utils/TryCatch";
import { HydratedDocument } from "mongoose";
import { NextResponse } from "next/server";

export const GET = TryCatch(async (req: DataRequest) => {
  await dbConnect();

  const users: HydratedDocument<userSchema>[] = await User.find();
  return NextResponse.json(users);
});
