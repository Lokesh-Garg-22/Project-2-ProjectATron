import Authenticate from "@/components/Authenticate";
import SideNav from "@/components/global/sideNav/sideNav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Authenticate />
      <main className="flex gap-x-2 px-2">
        <SideNav />
        {children}
      </main>
    </>
  );
}
