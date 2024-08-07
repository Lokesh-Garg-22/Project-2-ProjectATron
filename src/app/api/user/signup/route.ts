import dbConnect from "@/lib/db/dbConnect";
import User, { userSchema } from "@/lib/db/models/User";
import { HydratedDocument } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await dbConnect();
  const data = new URL(req.url).searchParams;
  try {
    if ((await User.find({ username: data.get("username") })).length > 0)
      return NextResponse.json({ error: "User Allready Exists" });
    const user: HydratedDocument<userSchema> = new User({
      username: data.get("username") as string,
      password: data.get("password") as string,
      name: data.get("username") as string,
    });
    //FIX await user.save();
    return NextResponse.json({ msg: "Success", user: user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
