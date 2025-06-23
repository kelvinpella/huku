import React from "react";
import Banner from "../Banner/Banner";

type Props = {
  children: React.ReactNode;
  bannerText: { firstText: string; secondText: string };
};
export default function AuthPageContainer({ children, bannerText }: Props) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center lg:grid lg:grid-cols-2 grid-rows-1 lg:justify-start lg:gap-44">
      <Banner
        firstText={bannerText.firstText}
        secondText={bannerText.secondText}
      />
      {children}
    </div>
  );
}
