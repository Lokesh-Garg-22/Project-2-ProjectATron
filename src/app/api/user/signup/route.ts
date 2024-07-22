import dbConnect from "@/lib/db/dbConnect";
import User from "@/lib/db/models/User";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await dbConnect();
  const data = new URL(request.url).searchParams;
  try {
    const user = new User({
      username: data.get("username"),
      password: data.get("password"),
    });
    // TODO: Check if allready exists.
    await user.save();
    return NextResponse.json({ msg: "Success" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
