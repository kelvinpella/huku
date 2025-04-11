'use server'

import { UserLoginForm } from "@/typings"

export const loginAction = async(formValues:UserLoginForm) => {
    // TODO: Handle login to supabase.
    console.log(formValues)
}