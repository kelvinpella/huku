import { DownloadableImage, ContactDetailsForm } from "@/typings"; 
import axios from "axios";
/**
 * Fetches user information from the specified URL using the provided user ID.
 *
 * @param param0 - A tuple containing the request URL and the user ID as strings.
 * @returns A promise that resolves to an object containing the user's first name, contact details (including images), and location.
 *
 * @remarks
 * The function expects the backend to return an object with the following structure:
 * - `firstName`: The user's first name.
 * - `contact_details`: An object containing contact details and an array of downloadable images.
 * - `location`: The user's location as a string.
 *
 * @example
 * ```typescript
 * const user = await getUser(["/api/user", "123"]);
 * console.log(user.firstName);
 * ```
 */

export async function getUser([url, userId]: string[]): Promise<{
  firstName: string;
  contact_details: ContactDetailsForm & {images: DownloadableImage[]};
  location: string;
}> {
  const response = await axios.get(url, {
    params: {
      userId,
    },
  });
  return response.data;
}
