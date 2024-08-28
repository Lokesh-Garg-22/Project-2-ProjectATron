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
    if (req.data.followId == req.data.userId)
      throw new Error("Can't follow your self!");
    const followedList: HydratedDocument<followedUserSchema>[] =
      await FollowedUser.find({ userId: req.data.userId });
    if (followedList.length == 0) {
      const followed: HydratedDocument<followedUserSchema> = new FollowedUser({
        userID: req.data.userId as string,
        followedIDs: [req.data.followId],
      });
      await followed.save();
      return NextResponse.json({ followed });
    }
    let a = true;
    const followed = followedList[0];
    for (let id of followed.followedIDs) {
      if (id == req.data.followId) a = false;
    }
    if (a) followed.followedIDs.push(req.data.followId);
    await followed.save();
    return NextResponse.json({ followed });
  }
);
