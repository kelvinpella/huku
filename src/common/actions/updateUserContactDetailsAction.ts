"use server";

import { createClient } from "@/utils/supabase/server";
import { ContactDetailsForm } from "@/typings";

/**
 * Updates the authenticated user's contact details in their profile metadata.
 *
 * This action uses Supabase's authentication API to update the user's profile
 * with the provided contact details (such as WhatsApp and Instagram).
 *
 * @param contactDetails - An object containing the user's contact details, conforming to the `ContactDetailsForm` type.
 * @returns A promise that resolves with the result of the update operation from Supabase.
 */

export const updateUserContactDetailsAction = async (
  contactDetails: ContactDetailsForm
) => {
  const supabase = await createClient();
  // Update the user's profile metadata with their WhatsApp and instagram
  return await supabase.auth.updateUser({
    data: {
      contact_details: { ...contactDetails },
    },
  });
};
