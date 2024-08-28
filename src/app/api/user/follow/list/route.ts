import dbConnect from "@/lib/db/dbConnect";
import { DataRequest } from "@/lib/db/interface";
import FollowedUser, { followedUserSchema } from "@/lib/db/models/FollowedUser";
import User from "@/lib/db/models/User";
import userAuthentication from "@/lib/db/userAuthentication";
import EscapeRegex from "@/lib/db/utils/EscapeRegex";
import GetData from "@/lib/db/utils/GetData";
import TryCatch from "@/lib/db/utils/TryCatch";
import { HydratedDocument } from "mongoose";
import { NextResponse } from "next/server";

export const POST = TryCatch(
  async (req: DataRequest & { data: { search?: string } }) => {
    await dbConnect();
    await GetData(req);
    await userAuthentication(req);
    const followedList: HydratedDocument<followedUserSchema>[] =
      await FollowedUser.find({ userId: req.data.userId });
    if (followedList.length == 0) return NextResponse.json({ followed: [] });
    const regex = new RegExp(EscapeRegex(req.data.search || ""), "gi");
    const followed = followedList[0];
    followed.followedIDs = followed.followedIDs.filter(async (ele) =>
      regex.test((await User.findById(ele)).username)
    );
    return NextResponse.json({ followed });
  }
);
