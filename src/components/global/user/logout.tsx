import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";

export async function logout() {
  window.localStorage.removeItem("username");
  window.localStorage.removeItem("password");
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
