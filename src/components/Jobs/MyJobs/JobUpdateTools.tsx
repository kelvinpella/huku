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
      icon: <MdOutlineEdit size={16} />,
    },
    {
      name: "Waombaji",
      link: "applicants",
      icon: <MdOutlinePeople size={16} />,
    },
  ];
  const numberOfApplicants = job.applicants?.length || 0;

  return (
    <div className="flex itemcenter gap-4">
      {tools.map(({ name, link, icon }) => {
        return (
          <CustomLink key={name} href={`/my-jobs/${job.id}/${link}`}>
            {icon} {link === "applicants" && <span className="text-sm">{numberOfApplicants}</span>}
          </CustomLink>
        );
      })}
    </div>
  );
}
