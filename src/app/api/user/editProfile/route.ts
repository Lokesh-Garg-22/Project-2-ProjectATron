import dbConnect from "@/lib/db/dbConnect";
import { DataRequest } from "@/lib/db/interface";
import User, { userSchema } from "@/lib/db/models/User";
import userAuthentication from "@/lib/db/userAuthentication";
import GetData from "@/lib/db/utils/GetData";
import TryCatch from "@/lib/db/utils/TryCatch";
import { HydratedDocument } from "mongoose";
import { NextResponse } from "next/server";

export const POST = TryCatch(
  async (req: DataRequest & { data: { name?: string; about?: string } }) => {
    await dbConnect();
    await GetData(req);
    await userAuthentication(req);
    const user = (await User.findById(
      req.data.userId
    )) as HydratedDocument<userSchema>;
    if (req.data.name) user.name = req.data.name;
    if (req.data.about) user.about = req.data.about;
    await user.save();
    return NextResponse.json({ msg: "Success", user: user });
  }
);
