import { AuthOption } from "@/typings";
import { JSX } from "react";
import { FaFacebookF, FaGoogle, FaMobileAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

type Args = {
  [Key in AuthOption]?: string;
};

type Option = {
  icon: JSX.Element;
  label: string;
  value: AuthOption;
  type?: string;
}

/**
 * Get custom labels ( display text ) of methods of authentication
 * @param customLabels - object containing the custom label text for the specified method
 *                     - The keys passed, only options with values equal to the keys will be returned.
 * @returns a list of methods for authentication
 */
export const getAuthOptions = (customLabels?: Args) => {
  let options: Option[] = [
    {
      icon: <FaMobileAlt size={20} />,
      label:
        customLabels && "phone" in customLabels
          ? customLabels.phone!
          : "Tumia namba ya simu",
      value: "phone",
    },
    {
      icon: <FaFacebookF size={20} />,
      label:
        customLabels && "facebook" in customLabels
          ? customLabels.facebook!
          : "Tumia facebook",
      value: "facebook",
      type: "oauth",
    },
    {
      icon: <FaGoogle size={20} />,
      label:
        customLabels && "google" in customLabels
          ? customLabels.google!
          : "Tumia google",
      value: "google",
      type: "oauth",
    },
    {
      icon: <MdEmail size={20} />,
      label:
        customLabels && "email" in customLabels
          ? customLabels.email!
          : "Tumia barua pepe",
      value: "email",
    },
  ];

  // return options with whose values are the keys in customLabels
  if (customLabels) {
    options = options.filter(({ value }) => value in customLabels);
  }

  return options;
};
