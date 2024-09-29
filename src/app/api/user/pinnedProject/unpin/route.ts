import dbConnect from "@/lib/db/dbConnect";
import { DataRequest } from "@/lib/db/interface";
import PinnedProject, {
  pinnedProjectSchema,
} from "@/lib/db/models/PinedProject";
import Project, { projectSchema } from "@/lib/db/models/Project";
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
    if (pinnedList.length == 0) return NextResponse.json({ unPin: true });
    pinnedList[0].projectIDs = pinnedList[0].projectIDs.filter(
      (ele) => ele != req.data.pinId
    );
    try {
      const project: HydratedDocument<projectSchema> | null =
        await Project.findById(req.data.pinId);
      if (project) {
        project.pinned = false;
        project.save();
      }
    } catch (e) {
      console.log(e);
    }
    await pinnedList[0].save();
    return NextResponse.json({ unPin: true });
  }
);
