import { FormInputField } from "@/typings";
import { Select } from "@headlessui/react";

type Props = Omit<FormInputField, "label"> & {
  selectOptions: { label: string; value: string }[];
};

export default function CustomSelectElement({
  selectOptions,
  ...field
}: Props) {
  const options = selectOptions.map((option) => (
    <option key={option.value} value={option.value} className="bg-red-500">
      {option.label}
    </option>
  ));

  return (
    <>
      <Select
        {...field}
        className="w-full py-2.5 px-6 outline-none border border-black rounded focus:ring focus:ring-black"
      >
        {options}
      </Select>
    </>
  );
}
