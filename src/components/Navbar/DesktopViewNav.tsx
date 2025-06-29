import React from "react";
import Profile from "./Profile";
import AppRelatedMenuItems from "./AppRelatedMenuItems";
import NavItems from "./NavItems";

export default function DesktopViewNav() {
  return (
    <div className="hidden lg:flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <NavItems />
      </div>
      <div className="flex items-center gap-6">
        <AppRelatedMenuItems />
        <Profile />
      </div>
    </div>
  );
}
