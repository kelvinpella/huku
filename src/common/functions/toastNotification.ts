import { toast, ToastContent, ToastOptions } from "react-toastify";

/**
 * Show notification for different processes
 * @param message - message to show
 * @param options - toast options
 * @returns - toast id
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
