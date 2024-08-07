import type { Metadata } from "next";
import {
  Space_Grotesk,
  Chakra_Petch,
  Black_Ops_One,
  Orbitron,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NavBar from "@/components/global/navBar/navBar";
import BgAnimation from "@/components/global/bgAnimation/BgAnimation";
import { Toaster } from "@/components/ui/toaster";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const chakra_petch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-chakra-petch",
  display: "swap",
});
const black_ops_one = Black_Ops_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-black-ops-one",
  display: "swap",
});
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ProjectATron",
  description: "ProjectATron Your Personal Project Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-space_grotesk antialiased dark",
          space_grotesk.variable,
          chakra_petch.variable,
          black_ops_one.variable,
          orbitron.variable
        )}
      >
        <NavBar />
        {children}
        <BgAnimation />
        <Toaster />
      </body>
    </html>
  );
}
