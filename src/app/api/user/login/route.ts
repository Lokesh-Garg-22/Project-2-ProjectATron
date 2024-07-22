import dbConnect from "@/lib/db/dbConnect";
import User from "@/lib/db/models/User";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await dbConnect();
  const data = new URL(request.url).searchParams;
  try {
    const users = await User.find({
      username: data.get("username"),
      password: data.get("password"),
    });
    if (users.length > 0) return NextResponse.json({ msg: "Success" });
    return NextResponse.json({ error: "User Not Found!" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
