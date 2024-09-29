"use client";

import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { ProjectInterface } from "../../lib/interface/project/interface";
import { TypographyH2, TypographyP } from "../ui/Typography";
import { Loader2Icon, PinIcon, PinOffIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { windowUserid, windowUsername, windowUserPassword } from "@/lib/data";
import { urlParse } from "@/lib/utils";
import { useToast } from "../ui/use-toast";

export default function ProjectCard({
  project,
}: {
  project: ProjectInterface;
}) {
  const [showPin, setShowPin] = useState(false);
  const [pinned, setPinned] = useState(project.pinned);
  const [loadingPin, setLoadingPin] = useState(false);
  const { toast } = useToast();

  async function onPin() {
    setLoadingPin(true);
    try {
      const pinned = await fetch("/api/user/pinnedProject", {
        method: "POST",
        cache: "no-cache",
        body: JSON.stringify({
          username: window.localStorage.getItem(windowUsername),
          password: window.localStorage.getItem(windowUserPassword),
          pinId: project.id,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            toast({ title: res.error, variant: "destructive" });
            setLoadingPin(false);
            return undefined;
          }
          return res.pinned;
        });
      if (pinned == undefined) {
        setLoadingPin(false);
        return;
      }
      setPinned(true);
      toast({
        title: `🎉 You have pinned ${project.name}!`,
      });
    } catch (e) {
      console.log(e);
    }
    setLoadingPin(false);
  }
  async function onUnPin() {
    setLoadingPin(true);
    try {
      console.log("Un Pin");
      const unPin = await fetch("/api/user/pinnedProject/unpin", {
        method: "POST",
        cache: "no-cache",
        body: JSON.stringify({
          username: window.localStorage.getItem(windowUsername),
          password: window.localStorage.getItem(windowUserPassword),
          pinId: project.id,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            toast({ title: res.error, variant: "destructive" });
            setLoadingPin(false);
            return undefined;
          }
          return res.unPin;
        });
      if (unPin == undefined) {
        setLoadingPin(false);
        return;
      }
      setPinned(false);
      toast({
        title: `You have unpinned ${project.name}!`,
      });
    } catch (e) {
      console.log(e);
    }
    setLoadingPin(false);
  }

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
            (loadingPin ? (
              <div className="ml-4 p-1 bg-secondary/50 rounded">
                <Loader2Icon className="animate-spin" />
              </div>
            ) : pinned ? (
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
        <div className="py-1 flex gap-1 flex-wrap">
          {project.tags.map((ele, id) => (
            <p
              key={id}
              className="px-2 rounded-lg border hover:bg-slate-50/5 shadow shadow-accent-foreground"
            >
              {ele}
            </p>
          ))}
        </div>
        <TypographyP>{project.description}</TypographyP>
        {project?.url && (
          <a
            href={urlParse(project.url)}
            target="_blank"
            className="hover:underline mt-4"
          >
            Vist Project
          </a>
        )}
      </CardContent>
    </Card>
  );
}
