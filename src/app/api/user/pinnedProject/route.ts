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

async function updateProject(req: DataRequest & { data: { pinId: string } }) {
  try {
    const project: HydratedDocument<projectSchema> | null =
      await Project.findById(req.data.pinId);
    if (project) {
      project.pinned = true;
      project.save();
    }
  } catch (e) {
    console.log(e);
  }
}

export const POST = TryCatch(
  async (req: DataRequest & { data: { pinId: string } }) => {
    await dbConnect();
    await GetData(req);
    await userAuthentication(req);
    const project: HydratedDocument<projectSchema> = await Project.findById(
      req.data.pinId
    ).catch(() => {
      throw new Error("Project not Found!");
    });
    if (project.userID != req.data.userId)
      throw new Error("Can't pin someone else project!");
    const pinnedList: HydratedDocument<pinnedProjectSchema>[] =
      await PinnedProject.find({ userId: req.data.userId });
    if (pinnedList.length == 0) {
      const pinned: HydratedDocument<pinnedProjectSchema> = new PinnedProject({
        userId: req.data.userId as string,
        projectIDs: [project.id],
      });
      updateProject(req);
      await pinned.save();
      return NextResponse.json({ pinned });
    }
    let a = true;
    const pinned = pinnedList[0];
    for (let id of pinned.projectIDs) {
      if (id == project.id) a = false;
    }
    if (a) {
      pinned.projectIDs.push(project.id);
      updateProject(req);
    }
    await pinned.save();
    return NextResponse.json({ pinned });
  }
);
