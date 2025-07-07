import {
  AuthForm,
  ContactDetailsForm,
  FormInputField,
  PostJobForm,
} from "@/typings";

export const authFormInputFields: FormInputField<keyof AuthForm>[] = [
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
];

export const contactDetailsInputFields: FormInputField<
  keyof ContactDetailsForm
>[] = [
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
    type: "text",
  },
];

export const postJobInputFields: FormInputField<keyof PostJobForm>[] = [
  {
    name: "title",
    id: "title",
    label: "Jina la kazi",
    placeholder: "Andika jina la kazi",
    type: "text",
  },
  {
    name: "description",
    id: "description",
    label: "Maelezo ya kazi",
    placeholder: "Andika maelezo ya kazi",
    type: "textarea",
  },
  {
    name: "salary",
    id: "salary",
    label: "Malipo (Tsh)",
    placeholder: "Andika kiasi cha malipo kwa Tsh",
    type: "number",
  },
  {
    name: "skills",
    id: "skills",
    label: "Ujuzi unaohitajika (tofautisha na koma)",
    placeholder: "Andika ujuzi unaohitajika, mfano: uchoraji, uandishi",
    type: "text",
  },
];
