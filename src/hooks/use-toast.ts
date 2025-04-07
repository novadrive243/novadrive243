import { toast as sonnerToast } from "sonner";
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
  
  // Map variant to sonner's type
  const type = variant === 'destructive' ? 'error' : 'default';
  
  // Use the appropriate sonner toast based on available props
  if (title && description) {
    return sonnerToast(title, {
      description,
      duration,
      action,
      type,
    });
  } else if (title) {
    return sonnerToast(title, {
      duration,
      action,
      type,
    });
  } else if (description) {
    return sonnerToast(description, {
      duration,
      action,
      type,
    });
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
