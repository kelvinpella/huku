type Props = { firstText: string; secondText: string };

export default function Banner({ firstText, secondText }: Props) {
  return (
    <div className="w-10/12 md:w-1/2 mx-auto lg:w-full grid grid-cols-1 grid-rows-2 font-bold">
      <span className="text-xl lg:text-2xl lg:w-1/2 lg:mx-auto whitespace-nowrap">
        {firstText}
      </span>
      <span className="text-2xl lg:text-4xl row-start-2 text-end whitespace-nowrap">
        {secondText}
      </span>
    </div>
  );
}
