import { Button } from "@/components/ui/button";
import { windowUserid, windowUsername, windowUserPassword } from "@/lib/data";
import { LogOutIcon } from "lucide-react";

export async function logout() {
  window.localStorage.removeItem(windowUsername);
  window.localStorage.removeItem(windowUserid);
  window.localStorage.removeItem(windowUserPassword);
  setTimeout(() => {
    window.location.href = "/";
  }, 1000);
}

export default function Logout({ withButton }: { withButton?: boolean }) {
  if (withButton)
    return (
      <Button onClick={logout}>
        <LogOutIcon className="mr-2" />
        <span>Logout</span>
      </Button>
    );
  return (
    <>
      <LogOutIcon className="mr-2" />
      <span>Logout</span>
    </>
  );
}
