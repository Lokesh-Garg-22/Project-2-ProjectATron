import dbConnect from "@/lib/db/dbConnect";
import { DataRequest } from "@/lib/db/interface";
import FollowedUser, { followedUserSchema } from "@/lib/db/models/FollowedUser";
import userAuthentication from "@/lib/db/userAuthentication";
import GetData from "@/lib/db/utils/GetData";
import TryCatch from "@/lib/db/utils/TryCatch";
import { HydratedDocument } from "mongoose";
import { NextResponse } from "next/server";

export const POST = TryCatch(
  async (req: DataRequest & { data: { followId: string } }) => {
    await dbConnect();
    await GetData(req);
    await userAuthentication(req);
    const followedList: HydratedDocument<followedUserSchema>[] =
      await FollowedUser.find({ userId: req.data.userId });
    if (followedList.length == 0) return NextResponse.json({ unfollow: true });
    followedList[0].followedIDs = followedList[0].followedIDs.filter(
      (ele) => ele != req.data.followId
    );
    await followedList[0].save();
    return NextResponse.json({ unfollow: true });
  }
);
