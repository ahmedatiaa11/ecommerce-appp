import { toast } from "react-toastify";

type ToastOptions = {
  id?: string;
};

export const showSuccess = (message: string, options?: ToastOptions) =>
  toast.success(message, { toastId: options?.id });

export const showError = (message: string, options?: ToastOptions) =>
  toast.error(message, { toastId: options?.id });