import LogoImage from "@/../public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
export default function Logo() {
  return (
    <div className="relative w-12 lg:w-14 aspect-video">
      <Link href={"/jobs"}>
        <Image
          src={LogoImage}
          alt="Huku Logo"
          fill
          sizes="100px"
          priority
          className="object-contain"
        />
      </Link>
    </div>
  );
}
