import { toast, ToastContent, ToastOptions } from "react-toastify";

/**
 * Displays a toast notification using react-toastify with default options.
 *
 * @param message - The content to display in the toast notification.
 * @param options - Additional options to customize the toast notification.
 * @returns The toast ID or null if the notification could not be displayed.
 */

export const toastNofication = (
  message: ToastContent,
  options: ToastOptions
) => {
  return toast(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    ...options,
  });
};
