import CustomLink from "./CustomLink";

type AuthSwitchButtonProps = Record<"title" | "url", string>;

export default function AuthSwitchButton({
  title,
  url,
}: AuthSwitchButtonProps) {
  return (
    <div className="w-full py-5 ">
      <CustomLink href={url} variant="plane" className="w-full justify-center">
        {title}
      </CustomLink>
    </div>
  );
}
