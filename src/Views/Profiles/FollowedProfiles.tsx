"use client";

import MainContainer from "@/components/global/MainContainer";
import ListRenderer from "@/components/Wrapper/ListRenderer";
import { ProfileInterface } from "@/lib/interface/profile/interface";
import ProfileCard from "@/components/Profile/ProfileCard";
import SearchBar from "@/components/search/SearchBar";
import { useEffect, useState } from "react";
import { windowUsername, windowUserPassword } from "@/lib/data";

export default function FollowedProfiles(
  props: unknown & { searchParams: { search?: string } }
) {
  const [profiles, setProfiles] = useState<ProfileInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (window) {
        setLoading(true);
        setProfiles([
          ...((await fetch(`/api/user/follow/list`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              username: window.localStorage.getItem(windowUsername),
              password: window.localStorage.getItem(windowUserPassword),
              search: props.searchParams.search,
            }),
          })
            .then((res) => res.json())
            .then(async (res) => {
              if (res.followed) {
                const data: any[] = [];
                for (let ele of res.followed.followedIDs) {
                  const d = await fetch(`/api/user?id=${ele}`)
                    .then((res) => res.json())
                    .then((res) => {
                      if (res?.user) return { ...res.user, id: res.user._id };
                      return null;
                    });
                  if (d) data.push(d);
                }
                return data;
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
      <SearchBar defaultValue={props.searchParams.search} />
      <ListRenderer
        list={profiles}
        ItemComponent={(data, id) => <ProfileCard key={id} profile={data} />}
        placeholder="No Profile Found!!"
        loading={loading}
      />
    </MainContainer>
  );
}
