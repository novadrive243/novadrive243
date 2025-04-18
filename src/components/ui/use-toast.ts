
// This file re-exports the toast functionality from the hooks directory
import { useToast, toast } from "@/hooks/use-toast";
// Use 'export type' when re-exporting types with isolatedModules enabled
export type { ToastProps } from "@/hooks/use-toast";

export { useToast, toast };
