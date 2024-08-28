"use client";

import MainContainer from "@/components/global/MainContainer";
import ListRenderer from "@/components/Wrapper/ListRenderer";
import { ProfileInterface } from "@/lib/interface/profile/interface";
import { ProjectInterface } from "@/lib/interface/project/interface";
import ProjectCard from "@/components/Project/ProjectCard";
import {
  TypographyH1,
  TypographyH4,
  TypographyP,
} from "@/components/ui/Typography";
import { LoaderCircleIcon, PlusIcon, User2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function Profile({
  profile,
  projects = [],
}: {
  profile: ProfileInterface;
  projects?: Array<ProjectInterface>;
}) {
  const [followed, setFollowed] = useState(true);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const { toast } = useToast();

  async function onFollow() {
    setLoadingFollow(true);
    const followed = await fetch("/api/user/follow", {
      method: "POST",
      next: { revalidate: 0 },
      body: JSON.stringify({
        username: window.localStorage.getItem("username"),
        password: window.localStorage.getItem("password"),
        followId: profile.id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          toast({ title: res.error, variant: "destructive" });
          setLoadingFollow(false);
          return undefined;
        }
        return res.followed;
      });
    if (followed == undefined) {
      setLoadingFollow(false);
      return;
    }
    setFollowed(true);
    toast({
      title: `🎉 You are now following ${profile.name}!`,
    });
    setLoadingFollow(false);
  }
  async function onUnfollow() {
    setLoadingFollow(true);
    const unfollowed = await fetch("/api/user/follow/unfollow", {
      method: "POST",
      next: { revalidate: 0 },
      body: JSON.stringify({
        username: window.localStorage.getItem("username"),
        password: window.localStorage.getItem("password"),
        followId: profile.id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          toast({ title: res.error, variant: "destructive" });
          setLoadingFollow(false);
          return undefined;
        }
        return res.unfollow;
      });
    setFollowed(false);
    toast({ title: `😔 You have unfollowed ${profile.name}!` });
    setLoadingFollow(false);
  }

  return (
    <MainContainer>
      <div className="flex my-4 mx-4">
        <div className="w-9/12 space-y-3">
          <TypographyH1>{profile.name}</TypographyH1>
          <TypographyH4 className="max-w-[70%]">{profile.about}</TypographyH4>
          <TypographyP className="font-bold">
            Projects: <span>{profile.projects}</span>
          </TypographyP>
          {loadingFollow ? (
            <Button
              disabled
              variant={"outline"}
              size={"sm"}
              className="items-center w-24"
            >
              <LoaderCircleIcon className="animate-spin" />
            </Button>
          ) : followed ? (
            <Button
              variant={"outline"}
              size={"sm"}
              className="items-center group w-24"
              onClick={onUnfollow}
            >
              <span className="group-hover:hidden">Following</span>
              <span className="text-red-500 hidden group-hover:block">
                Un Follow
              </span>
            </Button>
          ) : (
            <Button
              variant={"outline"}
              size={"sm"}
              className="items-center w-24"
              onClick={onFollow}
            >
              <PlusIcon size={16} className="mr-1" />
              Follow
            </Button>
          )}
        </div>
        <div className="shrink-0 grow">
          <div className="w-40 h-full flex items-center justify-center">
            <User2Icon className="w-full h-full" />
          </div>
        </div>
      </div>
      <div className="w-full my-2 mx-3 border rounded-full" />
      <ListRenderer
        list={projects}
        ItemComponent={(data, id) => <ProjectCard key={id} project={data} />}
      />
    </MainContainer>
  );
}
