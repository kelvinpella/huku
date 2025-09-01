import { CustomMenuItem } from "@/typings";
import { FaGoogle, FaMobileAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const signupMenuItems: CustomMenuItem[] = [
  {
    icon: <FaMobileAlt size={20} />,
    name: "Use a phone number",
    link: "signup/phone",
    id: "phone",
  },
  // TODO implement facebook login
  // {
  //   icon: <FaFacebookF size={20} />,
  //   name:"Use facebook",
  //   action: "facebook",
  // },
  {
    icon: <FaGoogle size={20} />,
    name: "Use google",
    action: "google",
    id: "google",
  },
  {
    icon: <MdEmail size={20} />,
    name: "Use an email address",
    link: "signup/email",
    id: "email",
  },
];
