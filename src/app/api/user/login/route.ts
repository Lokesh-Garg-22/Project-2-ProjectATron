import dbConnect from "@/lib/db/dbConnect";
import User, { userSchema } from "@/lib/db/models/User";
import TryCatch from "@/lib/db/utils/TryCatch";
import { HydratedDocument } from "mongoose";
import { NextResponse } from "next/server";

export const GET = TryCatch(async (req: Request) => {
  await dbConnect();
  const data = new URL(req.url).searchParams;
  const users: HydratedDocument<userSchema>[] = await User.find({
    username: data.get("username")?.toLowerCase(),
  });
  if (users.length == 0) return NextResponse.json({ error: "User Not Found" });
  if (users[0].password != data.get("password"))
    return NextResponse.json({ error: "Wrong Password!!" });
  return NextResponse.json({ user: users[0] });
});
