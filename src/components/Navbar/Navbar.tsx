"use client";
import DesktopViewNav from "./DesktopViewNav";
import Logo from "./Logo";
import MobileViewNav from "./MobileViewNav";
import { useUser } from "@/common/hooks/useUser";

export default function Navbar() {
  const { user } = useUser();
  return (
    <div className="w-full fixed z-50 inset-x-0 bg-chef-white border-b border-b-encore/20">
      <div className="w-full lg:max-w-screen-xl mx-auto py-2 px-4 grid grid-cols-[auto_1fr] grid-rows-1 grid-flow-col gap-6 lg:gap-12 items-center">
        <Logo />
        {user && (
          <div className="w-full">
            <MobileViewNav />
            <DesktopViewNav />
          </div>
        )}
      </div>
    </div>
  );
}
