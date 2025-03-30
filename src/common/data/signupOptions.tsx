import { FaFacebookF, FaGoogle, FaMobileAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

/**
 * User signup options
 */
export const signupOptions = [
  {
    icon: <FaMobileAlt size={20} />,
    label: "Tumia namba ya simu",
    value: "phone",
  },
  {
    icon: <FaFacebookF size={20} />,
    label: "Tumia facebook",
    value: "facebook",
    type: "oauth",
  },
  {
    icon: <FaGoogle size={20} />,
    label: "Tumia google",
    value: "google",
    type: "oauth",
  },
  {
    icon: <MdEmail size={20} />,
    label: "Tumia barua pepe",
    value: "email",
  },
];
