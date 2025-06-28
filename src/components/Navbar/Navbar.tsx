'use client'
import DesktopViewNav from "./DesktopViewNav";
import Logo from "./Logo";
import MobileViewNav from "./MobileViewNav";

export default function Navbar() {
  return (
    <div className="w-full fixed z-50 inset-x-0 bg-chef-white border-b border-b-encore/20">
      <div className="w-full lg:max-w-screen-2xl mx-auto py-2 px-4 grid grid-cols-[auto_1fr] grid-rows-1 grid-flow-col gap-6 items-center">
        <Logo />
        <div className="w-full">
          <MobileViewNav />
          <DesktopViewNav />
        </div>
      </div>
    </div>
  );
}
