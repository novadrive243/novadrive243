import { toast as sonnerToast, ExternalToast } from "sonner";
import React from "react";

// Define proper types for the toast function that match how it's being used
export interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
  action?: React.ReactNode;
}

// Custom toast function that supports both old and new API
export const toast = (props: ToastProps | string) => {
  if (typeof props === 'string') {
    // If it's just a string, show a simple toast
    return sonnerToast(props);
  }
  
  const { title, description, variant, duration, action } = props;
  
  // Map variant to sonner's type - fixed to avoid TS error with type property
  const toastOptions: ExternalToast = {
    duration,
    action
  };

  // Add error styling if variant is destructive
  if (variant === 'destructive') {
    // Using proper typing for the sonner toast
    Object.assign(toastOptions, { style: { backgroundColor: 'var(--destructive)', color: 'var(--destructive-foreground)' } });
  }
  
  // Use the appropriate sonner toast based on available props
  if (title && description) {
    return sonnerToast(title, {
      ...toastOptions,
      description
    });
  } else if (title) {
    return sonnerToast(title, toastOptions);
  } else if (description) {
    return sonnerToast(description, toastOptions);
  }
  
  // Fallback to empty toast (shouldn't happen)
  return sonnerToast("Notification");
};

// Keep useToast hook for compatibility with existing code
export function useToast() {
  return {
    toast,
    // For compatibility with shadcn/ui toast
    toasts: [],
  };
}
