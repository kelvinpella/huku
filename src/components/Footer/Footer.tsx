import React from "react";

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="w-full lg:max-w-screen-2xl mx-auto flex items-center justify-center py-6 border-t border-t-encore/20">
         <div className="text-sm">© { new Date().getFullYear()} Huku | Mfumo kutoka TEJA </div>
      </div>
    </footer>
  );
}
