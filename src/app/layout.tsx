import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import SideMenu from "@/components/SideMenu/SideMenu";
import { SideMenuProvider } from "@/providers/SideMenuContext";

export const metadata: Metadata = {
  title: "Talentat",
  description: "talent at your fingertips",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-DM_Sans  antialiased bg-wheat`}>
        <SideMenuProvider>
          <Navbar />
          <SideMenu />
          {children}
        </SideMenuProvider>
      </body>
    </html>
  );
}
