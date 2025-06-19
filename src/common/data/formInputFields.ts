import {  FormInputField } from "@/typings";

/**
 * A collection of form input fields used in various forms across the application.
 */
export const formInputFields: FormInputField[] = [
  {
    name: "firstname",
    id: "firstname",
    label: "Jina la kwanza",
    placeholder: "Andika jina lako la kwanza",
    type: "text",
  },
  {
    name: "lastname",
    id: "lastname",
    label: "Jina la ukoo",
    placeholder: "Andika jina lako la ukoo",
    type: "text",
  },
  {
    name: "phone",
    id: "phone",
    label: "Namba ya simu",
    placeholder: "Andika namba ya simu",
    type: "tel",
  },
  {
    name: "email",
    id: "email",
    label: "Barua pepe",
    placeholder: "Andika barua pepe",
    type: "email",
  },
  {
    name: "password",
    id: "password",
    label: "Nywila (Password)",
    placeholder: "Andika nywila utakayotumia",
    type: "password",
  },
  {
    name: "location",
    id: "location",
    label: "Eneo unaloishi",
    placeholder: "Andika eneo unaloishi",
    type: "text",
  },
  {
    name: "whatsapp",
    label: "WhatsApp",
    placeholder: "mfano: 0712345678",
    type: "tel",
  },
  {
    name: "instagram",
    label: "Instagram",
    placeholder: "mfano: @jina_la_akaunti",
    type: "string",
  },
];
