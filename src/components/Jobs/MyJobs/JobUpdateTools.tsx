import { JobPostContext } from "@/common/context/JobPostContext";
import { use } from "react";
import { MdOutlineEdit, MdOutlinePeople } from "react-icons/md";
import CustomLink from "../../Buttons/CustomLink";

export default function JobUpdateTools() {
  const { job } = use(JobPostContext);
  const tools = [
    {
      name: "Hariri",
      id: "edit",
      link: `/post-job/${job.id}/edit`,
      icon: <MdOutlineEdit size={16} />,
    },
    {
      name: "Waombaji",
      id: "applicants",
      link: `/my-jobs/${job.id}/applicants`,
      icon: <MdOutlinePeople size={16} />,
    },
  ];
  const numberOfApplicants = job.applicants?.length || 0;

  return (
    <div className="flex itemcenter gap-4">
      {tools.map(({ name, link, icon, id }) => {
        return (
          <CustomLink key={name} href={link}>
            {icon}{" "}
            {id === "applicants" && (
              <span className="text-sm">{numberOfApplicants}</span>
            )}
          </CustomLink>
        );
      })}
    </div>
  );
}
