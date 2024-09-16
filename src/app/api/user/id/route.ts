import dbConnect from "@/lib/db/dbConnect";
import { DataRequest } from "@/lib/db/interface";
import userAuthentication from "@/lib/db/userAuthentication";
import GetData from "@/lib/db/utils/GetData";
import TryCatch from "@/lib/db/utils/TryCatch";
import { NextResponse } from "next/server";

export const POST = TryCatch(async (req: DataRequest) => {
  await dbConnect();
  await GetData(req);
  await userAuthentication(req);
  return NextResponse.json({ userId: req.data.userId });
});
