import { toast, ToastOptions } from "react-toastify";

type NormalToastArgs = Parameters<typeof toast>;

type PromiseToastArgs = Parameters<(typeof toast)["promise"]>;

type Args<T> = T extends "normal" ? NormalToastArgs : PromiseToastArgs;

type ToastNotification<T> = {
  toastType?: T;
  args: Args<T>;
};

/**
 * Displays a toast notification using `react-toastify`, supporting both normal and promise-based toasts.
 *
 * @template T - The type of toast to display: `"normal"` for standard toasts, `"promise"` for promise-based toasts.
 * @param {ToastNotification<T>} options - The options for displaying the toast notification.
 * @param {T} [options.toastType] - The type of toast to display. Defaults to `"normal"`.
 * @param {Args<T>} options.args - The arguments to pass to the toast function, depending on the toast type.
 *   - For `"normal"`: Same as `toast(...)`.
 *   - For `"promise"`: Same as `toast.promise(...)`.
 * @returns {ReturnType<typeof toast | (typeof toast)["promise"]>} The result of the toast or toast.promise call.
 *
 * @example
 * // Normal toast
 * toastNotification({ args: ["Hello, world!"] });
 *
 * @example
 * // Promise toast
 * toastNotification({
 *   toastType: "promise",
 *   args: [
 *     fetchData(),
 *     { pending: "Loading...", success: "Loaded!", error: "Error!" }
 *   ]
 * });
 */
 
export const toastNotification = <T extends "normal" | "promise">({
  toastType,
  args,
}: ToastNotification<T>): ReturnType<
  typeof toast | (typeof toast)["promise"]
> => {
  const _toastType = toastType ?? "normal";

  const commonOptions: ToastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
  };

  let runningToast: ReturnType<typeof toast | (typeof toast)["promise"]>;

  if (_toastType === "normal") {
    const [message, otherOptions] = args as NormalToastArgs;
    runningToast = toast(message, {
      ...commonOptions,
      ...otherOptions,
    });
  } else {
    const [promise, status, otherOptions] = args as PromiseToastArgs;
    runningToast = toast.promise(promise, status, {
      ...commonOptions,
      ...otherOptions,
    });
  }

  return runningToast;
};
