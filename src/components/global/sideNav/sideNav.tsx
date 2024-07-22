"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SideNav() {
  const list: Array<{
    title: string;
    list: Array<{ text: string; url: string }>;
  }> = [
    {
      title: "Profile",
      list: [
        { text: "Profiles", url: "/app/profiles" },
        { text: "Followed Profiles", url: "/app/followedProfiles" },
      ],
    },
    {
      title: "Project",
      list: [
        { text: "Projects", url: "/app/projects" },
        { text: "Create Project", url: "/app/create/project" },
      ],
    },
    {
      title: "Team",
      list: [
        { text: "Teams", url: "/app/teams" },
        { text: "Create Team", url: "/app/create/team" },
      ],
    },
  ];

  const [open, setOpen] = useState(true);

  return (
    <>
      <div className={cn("ml-1 shrink-0", open ? "w-48" : "w-2")} />
      <section
        id="SideNav"
        className={cn(
          "fixed w-48 h-[calc(100vh-4.75rem)] my-1 ml-1 border-2 rounded-lg bg-background transition-transform",
          !open &&
            "-translate-x-48 hover:-translate-x-[calc(12rem-4px)] hover:cursor-pointer"
        )}
      >
        <div
          className={cn(
            "h-full flex flex-col py-2 bg-secondary/50 transition",
            !open && "hover:bg-secondary/75"
          )}
          onClick={() => {
            if (!open) setOpen(true);
          }}
        >
          <div className="px-2 pb-1 flex justify-end">
            <XIcon
              className={cn(
                "rounded hover:bg-slate-50/10 xl:hidden",
                !open && "opacity-0"
              )}
              onClick={() => {
                setOpen(false);
              }}
            />
          </div>
          {list.map((ele, id) => (
            <div key={id} className="flex flex-col [&:not(:last-child)]:mb-3">
              {open &&
                ele.list.map((ele, id) => (
                  <Button
                    key={id}
                    asChild
                    variant={"link"}
                    className="justify-start rounded-none hover:no-underline hover:bg-slate-50/10"
                  >
                    <Link href={ele.url}>{ele.text}</Link>
                  </Button>
                ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
