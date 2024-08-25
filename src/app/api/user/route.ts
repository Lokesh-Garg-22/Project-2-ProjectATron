import dbConnect from "@/lib/db/dbConnect";
import User from "@/lib/db/models/User";
import TryCatch from "@/lib/db/utils/TryCatch";
import { NextResponse } from "next/server";

export const GET = TryCatch(async (req: Request) => {
  await dbConnect();
  const data = new URL(req.url).searchParams;
  const user = await User.findById(data.get("id"));
  return NextResponse.json({ user });
});
