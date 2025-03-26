import { AuthFormField } from "@/typings";

/**
 * Signup & login form input fields
 */
export const authFormFields: AuthFormField[] = [
    {
        name: 'firstname',
        id: 'firstname',
        label: 'Jina la kwanza',
        placeholder: 'Andika jina lako la kwanza',
        type: "text"
    },
    {
        name: 'lastname',
        id: 'lastname',
        label: 'Jina la ukoo',
        placeholder: 'Andika jina lako la ukoo',
        type: "text"
    },
    {
        name: 'phone',
        id: 'phone',
        label: 'Namba ya simu',
        placeholder: 'Andika namba ya simu',
        type: "tel"
    },
    {
        name: 'email',
        id: 'email',
        label: 'Barua pepe',
        placeholder: 'Andika barua pepe',
        type: "email"
    },
    {
        name: 'password',
        id: 'password',
        label: 'Nywila (Password)',
        placeholder: 'Andika nywila utakayotumia',
        type: "password"
    },
    {
        name: 'confirmPassword',
        id: 'confirmPassword',
        label: 'Rudia Nywila (Password)',
        placeholder: 'Andika nywila tena',
        type: "password"
    },
    {
        name: 'location',
        id: 'location',
        label: 'Eneo unaloishi',
        placeholder: 'Andika eneo unaloishi',
        type: 'text'
    }
]
