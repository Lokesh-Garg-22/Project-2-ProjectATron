"use client";

import MainContainer from "@/components/global/MainContainer";
import ListRenderer from "@/components/Wrapper/ListRenderer";
import { ProfileInterface } from "@/lib/interface/profile/interface";
import ProfileCard from "@/components/Profile/ProfileCard";
import SearchBar from "@/components/search/SearchBar";
import { useEffect, useState } from "react";
import { HydratedDocument } from "mongoose";

// TODO
// BUG
export default function FollowedProfiles(
  props: unknown & { searchParams: { search?: string } }
) {
  const profiles: ProfileInterface[] = [
    { name: "Profile 1", about: "About You", projects: 1, id: "awd234" },
    { name: "Profile 2", about: "About You", projects: 1, id: "a46tdi" },
    { name: "Profile 3", about: "About You", projects: 1, id: "aw456d" },
    { name: "Profile 4", about: "About You", projects: 1, id: "awd5yh" },
    { name: "Profile 5", about: "About You", projects: 1, id: "awd223" },
  ];
  const [teams, setTeams] = useState<ProfileInterface[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (window) {
        setLoading(true);
        setTeams([
          ...((await fetch(`/api/user/follow/list`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              username: window.localStorage.getItem("username"),
              password: window.localStorage.getItem("password"),
              search: props.searchParams.search,
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.followed) {
                res.followed.map(async (ele: string) => {
                  return "";
                  return await fetch("/api/user");
                });
                return res.followed;
              }
              return [];
            })) as ProfileInterface[]),
        ]);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <MainContainer className="items-center">
      <SearchBar />
      <ListRenderer
        list={profiles}
        ItemComponent={(data, id) => <ProfileCard key={id} profile={data} />}
        placeholder="No Profile Found!!"
        loading={loading}
      />
    </MainContainer>
  );
}
