import { hostURL } from "@/lib/data";
import { projectSchema } from "@/lib/db/models/Project";
import { ProjectInterface } from "@/lib/interface/project/interface";
import { urlParse } from "@/lib/utils";
import { HydratedDocument } from "mongoose";

export async function getProjects({
  link,
  search,
  userId,
  pinned,
}: {
  link?: string;
  search?: string;
  userId?: string;
  pinned?: boolean;
}) {
  if (!link)
    if (userId) link = `${urlParse(hostURL as string)}/api/user/projects`;
    else link = `${urlParse(hostURL as string)}/api/projects`;
  return (await fetch(
    `${link}?${[
      search && `search=${search}`,
      userId && `id=${userId}`,
      userId && pinned && `pinned=true`,
    ]
      .filter((ele) => ele)
      .join("&")}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((res) => res.projects)
    .then((res: HydratedDocument<projectSchema>[]) =>
      res.map((ele) => {
        return { ...ele, id: ele._id };
      })
    )) as ProjectInterface[];
}
