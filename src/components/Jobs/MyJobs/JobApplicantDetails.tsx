import { formatPhoneNumber } from "@/common/functions/formatPhoneNumber";
import { getUser } from "@/common/functions/getUser";
import { DownloadableImage } from "@/typings";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  userDetails: Awaited<ReturnType<typeof getUser>>;
};
export default function JobApplicantDetails({ userDetails }: Props) {
  const { firstName, contact_details, location } = userDetails;

  return (
    <div className="customCard">
      <p className="font-semibold">{firstName}</p>
      {Object.keys(contact_details).length > 0 && (
        <div className="w-full">
          <p className="text-sm capitalize">{location}</p>
          <div className="w-full grid grid-cols-1 grid-rows-2 md:flex gap-4 items-center py-4">
            {contact_details.images.map(
              ({ downloadUrl }: DownloadableImage) => {
                return (
                  <div
                    key={downloadUrl}
                    className="w-full aspect-square md:shrink-0 md:size-54 relative rounded-md border p-2"
                  >
                    <Image
                      src={downloadUrl}
                      alt={`${firstName} image`}
                      fill
                      sizes="(max-width: 767px) 100vw, 300px"
                      className="size-full object-cover rounded-md"
                    />
                  </div>
                );
              }
            )}
          </div>
          <div className="grid grid-cols-2 grid-rows-1 gap-2">
            {contact_details.whatsapp && (
              <div className="flex flex-col gap-1">
                <span className="font-semibold">Whatsapp Number:</span>{" "}
                <Link
                  className="text-spanish-violet hover:underline font-semibold"
                  href={`https:wa.me/${formatPhoneNumber(
                    contact_details.whatsapp
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {formatPhoneNumber(contact_details.whatsapp)}
                </Link>
              </div>
            )}
            {contact_details.instagram && (
              <div className="flex flex-col gap-1">
                <span className="font-semibold">Instagram Account:</span>{" "}
                <Link
                  className="text-spanish-violet hover:underline font-semibold w-full truncate"
                  href={`https://www.instagram.com/${contact_details.instagram.replace(
                    /^@/,
                    ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contact_details.instagram.startsWith("@")
                    ? contact_details.instagram
                    : `@${contact_details.instagram}`}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
