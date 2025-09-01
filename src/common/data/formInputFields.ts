import {
  AuthForm,
  ContactDetailsForm,
  FormInputField,
  PostJobForm,
} from "@/typings";

export const authFormInputFields: FormInputField<AuthForm>[] = [
  {
    name: "firstname",
    id: "firstname",
    label: "First Name",
    placeholder: "Enter your first name",
    type: "text",
  },
  {
    name: "lastname",
    id: "lastname",
    label: "Last Name",
    placeholder: "Enter your last name",
    type: "text",
  },
  {
    name: "phone",
    id: "phone",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    type: "tel",
  },
  {
    name: "email",
    id: "email",
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
  },
  {
    name: "password",
    id: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
  },
  {
    name: "location",
    id: "location",
    label: "Location",
    placeholder: "Enter your location",
    type: "text",
  },
];

export const contactDetailsInputFields: FormInputField<ContactDetailsForm>[] = [
  {
    name: "whatsapp",
    label: "WhatsApp",
    placeholder: "e.g. 0712345678",
    type: "tel",
  },
  {
    name: "instagram",
    label: "Instagram",
    placeholder: "e.g. @account_username",
    type: "text",
  },
];

export const postJobInputFields: FormInputField<PostJobForm>[] = [
  {
    name: "title",
    id: "title",
    label: "Job Title",
    placeholder: "Enter the job title",
    type: "text",
  },
  {
    name: "budget",
    id: "budget",
    label: "Payment (Tsh)",
    placeholder: "Enter the payment amount in Tsh",
    type: "number",
    min: 1,
  },
  {
    name: "skills",
    id: "skills",
    label: "Required Skills (separate with commas)",
    placeholder: "e.g. drawing, writing",
    type: "text",
  },
  {
    name: "description",
    id: "description",
    label: "Job Description",
    placeholder: "Enter the job description",
    type: "textarea",
  },
];
