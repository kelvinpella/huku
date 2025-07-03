import { CustomMenuItem } from "@/typings";
import { FaGoogle, FaMobileAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const signupMenuItems: CustomMenuItem[] = [
  {
    icon: <FaMobileAlt size={20} />,
    name: "Tumia namba ya simu",
    link: "signup/phone",
    id: "phone",
  },
  // TODO implement facebook login
  // {
  //   icon: <FaFacebookF size={20} />,
  //   name:"Tumia facebook",
  //   action: "facebook",
  // },
  {
    icon: <FaGoogle size={20} />,
    name: "Tumia google",
    action: "google",
    id: "google",
  },
  {
    icon: <MdEmail size={20} />,
    name: "Tumia barua pepe",
    link: "signup/email",
    id: "email",
  },
];
