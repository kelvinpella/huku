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
};

/**
 * Get authentication methods or optionally passing the names of the intended methods
 * @param selectedOptionsWithLabelText - object containing the authentication methods, whoese values are the custom labels to be used
 * @returns a list of authentication methods
 */
export const getAuthOptions = (selectedOptionsWithLabelText?: Args) => {
  let options: Option[] = [ 
    {
      icon: <FaMobileAlt size={20} />,
      label:
        selectedOptionsWithLabelText && "phone" in selectedOptionsWithLabelText
          ? selectedOptionsWithLabelText.phone!
          : "Tumia namba ya simu",
      value: "phone",
    },
    // TODO implement facebook login
    // {
    //   icon: <FaFacebookF size={20} />,
    //   label:
    //     selectedOptionsWithLabelText &&
    //     "facebook" in selectedOptionsWithLabelText
    //       ? selectedOptionsWithLabelText.facebook!
    //       : "Tumia facebook",
    //   value: "facebook",
    //   type: "oauth",
    // },
    {
      icon: <FaGoogle size={20} />,
      label:
        selectedOptionsWithLabelText && "google" in selectedOptionsWithLabelText
          ? selectedOptionsWithLabelText.google!
          : "Tumia google",
      value: "google",
      type: "oauth",
    },
    {
      icon: <MdEmail size={20} />,
      label:
        selectedOptionsWithLabelText && "email" in selectedOptionsWithLabelText
          ? selectedOptionsWithLabelText.email!
          : "Tumia barua pepe",
      value: "email",
    },
  ];

  // return options with whose values are the keys in selectedOptionsWithLabelText
  if (selectedOptionsWithLabelText) {
    options = options.filter(
      ({ value }) => value in selectedOptionsWithLabelText
    );
  }

  return options;
};
