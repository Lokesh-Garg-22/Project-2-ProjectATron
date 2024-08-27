"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Authenticate() {
  const router = useRouter();
  useEffect(() => {
    if (window) {
      if (!window.localStorage.getItem("username"))
        router.replace("/not-logged-in");
    }
  }, []);

  return <></>;
}
