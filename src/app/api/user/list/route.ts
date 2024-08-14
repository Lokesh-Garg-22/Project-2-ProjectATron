import User, { userSchema } from "@/lib/db/models/User";
import { HydratedDocument } from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  const users: HydratedDocument<userSchema>[] = await User.find().catch(
    () => []
  );
  return NextResponse.json(users);
}
