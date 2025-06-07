import CustomLink from "@/components/Buttons/CustomLink";
import { JSX } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

export const dynamicParams = false;

export const generateStaticParams = () => {
  return [{ status: "success" }, { status: "error" }];
};

export default async function EmailVerification({
  params,
}: {
  params: Promise<{ status: "success" | "error" }>;
}) {
  const { status } = await params;

  const statusMessage: Record<
    typeof status,
    { icon: JSX.Element; text: string; buttonText: string }
  > = {
    success: {
      icon: <FaCheckCircle size={24} className="text-green-500" />,
      text: "Barua pepe yako imethibitishwa.",
      buttonText: "Endelea",
    },
    error: {
      icon: <FaCircleXmark size={24} className="text-red-500" />,
      text: "Oops! Kuna tatizo limetokea.",
      buttonText: "Rudi Nyumbani",
    },
  };

  const message = statusMessage[status];

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full md:max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center">
          Uthibitisho wa Barua Pepe
        </h1>
        <p className="my-4 text-lg text-center flex items-center gap-2">
          <span>{message.icon}</span>
          <span>{message.text}</span>
        </p>
        <CustomLink href={"/"} className="w-max">
          {message.buttonText}
        </CustomLink>
      </div>
    </div>
  );
}
