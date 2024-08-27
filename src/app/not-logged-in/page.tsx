"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    if (window) {
      if (window.localStorage.getItem("username")) router.push("/app");
    }
  }, []);

  return <div>Please Login</div>;
}
