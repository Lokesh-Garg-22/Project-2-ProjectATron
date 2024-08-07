import dbConnect from "@/lib/db/dbConnect";
import User, { userSchema } from "@/lib/db/models/User";
import { HydratedDocument } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await dbConnect();
  const data = new URL(req.url).searchParams;
  try {
    const users: HydratedDocument<userSchema>[] = await User.find({
      username: data.get("username"),
    });
    if (users.length == 0)
      return NextResponse.json({ error: "User Not Found" });
    if (users[0].password != data.get("password"))
      return NextResponse.json({ error: "Wrong Password!!" });
    return NextResponse.json({ user: users[0] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
