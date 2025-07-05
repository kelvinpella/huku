import { JobPostContext } from "@/common/context/JobPostContext";
import { use } from "react";
import { MdOutlineEdit, MdOutlinePeople } from "react-icons/md";
import CustomLink from "../../Buttons/CustomLink";

export default function JobUpdateTools() {
  const { job } = use(JobPostContext);
  const tools = [
    {
      name: "Hariri",
      link: "edit",
      icon: <MdOutlineEdit />,
    },
    {
      name: "Waombaji",
      link: "applicants",
      icon: <MdOutlinePeople />,
    },
  ];
  return (
    <div className="flex itemcenter gap-4">
      {tools.map(({ name, link, icon }) => {
        return (
          <CustomLink key={name} href={`/my-jobs/${job.id}/${link}`}>
            {icon}
          </CustomLink>
        );
      })}
    </div>
  );
}
