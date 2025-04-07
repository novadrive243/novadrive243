import { toast as sonnerToast } from "sonner";

// Re-export toast directly from sonner
export const toast = sonnerToast;

// Keep useToast hook for compatibility with existing code
export function useToast() {
  return {
    toast: sonnerToast,
    // For compatibility with shadcn/ui toast
    toasts: [],
  };
}
