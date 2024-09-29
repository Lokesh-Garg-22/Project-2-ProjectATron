import dbConnect from "@/lib/db/dbConnect";
import { DataRequest } from "@/lib/db/interface";
import PinnedProject, {
  pinnedProjectSchema,
} from "@/lib/db/models/PinedProject";
import userAuthentication from "@/lib/db/userAuthentication";
import GetData from "@/lib/db/utils/GetData";
import TryCatch from "@/lib/db/utils/TryCatch";
import { HydratedDocument } from "mongoose";
import { NextResponse } from "next/server";

export const POST = TryCatch(
  async (req: DataRequest & { data: { pinId: string } }) => {
    await dbConnect();
    await GetData(req);
    await userAuthentication(req);
    const pinnedList: HydratedDocument<pinnedProjectSchema>[] =
      await PinnedProject.find({ userId: req.data.userId });
    if (pinnedList.length == 0) {
      return NextResponse.json({ followed: false });
    }
    for (let id of pinnedList[0].projectIDs) {
      if (id == req.data.pinId) return NextResponse.json({ pinned: true });
    }
    return NextResponse.json({ pinned: false });
  }
);
