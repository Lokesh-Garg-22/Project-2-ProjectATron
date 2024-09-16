"use client";

import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { ProjectInterface } from "../../lib/interface/project/interface";
import { TypographyH2, TypographyP } from "../ui/Typography";
import { PinIcon, PinOffIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { windowUserid } from "@/lib/data";

export default function ProjectCard({
  project,
}: {
  project: ProjectInterface;
}) {
  const [showPin, setShowPin] = useState(false);
  // TODO onUnPin
  async function onUnPin() {}
  // TODO onPin
  async function onPin() {}

  useEffect(() => {
    if (window) {
      if (project.userID == window.localStorage.getItem(windowUserid))
        setShowPin(true);
    }
  }, []);

  return (
    <Card className="max-w-[24rem] grow">
      <CardContent className="pt-6 flex flex-col">
        <div className="flex items-center">
          <Link
            href={"/app/project/" + project.id}
            className="grow hover:underline"
          >
            <TypographyH2>{project.name}</TypographyH2>
          </Link>
          {showPin &&
            (project.pinned ? (
              <div
                onClick={onUnPin}
                className="ml-4 p-1 bg-secondary/50 rounded group cursor-pointer"
              >
                <PinIcon className="group-hover:hidden" />
                <PinOffIcon className="hidden group-hover:block" />
              </div>
            ) : (
              <div
                onClick={onPin}
                className="ml-4 p-1 bg-secondary/50 rounded group cursor-pointer"
              >
                <PinIcon className="opacity-50 group-hover:opacity-100" />
              </div>
            ))}
        </div>
        <div className="py-1 flex gap-1">
          {project.tags.map((ele, id) => (
            <p
              key={id}
              className="px-2 rounded-lg border hover:bg-slate-50/5 shadow shadow-accent-foreground"
            >
              ele
            </p>
          ))}
        </div>
        <TypographyP>Discription</TypographyP>
        {project?.url && (
          <a href={project.url} target="_blank" className="hover:underline">
            Vist Project
          </a>
        )}
      </CardContent>
    </Card>
  );
}
