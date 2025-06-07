import { parsePhoneNumberWithError } from "libphonenumber-js";

/**
 * Formats a phone number to always start with +255 (Tanzania) if no other + is provided.
 * @param phone - The phone number as a string
 * @returns The phone number in E.164 format (e.g., +2557xxxxxxx)
 */
export function formatPhoneNumber(phone: string): string {
  return parsePhoneNumberWithError(phone, "TZ").number;
}
