"use server";

import { createClient } from "@/utils/supabase/server";
import { ContactDetailsForm } from "@/typings";

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
