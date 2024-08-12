import Team from "@/lib/db/models/Team";
import TryCatch from "@/lib/db/utils/TryCatch";
import { NextResponse } from "next/server";

export const GET = TryCatch(async (req: Request) => {
  const data = new URL(req.url).searchParams;
  const team = await Team.findById(data.get("id"));
  return NextResponse.json({ team });
});
