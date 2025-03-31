
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface EmailFieldProps {
  form: UseFormReturn<any>;
  label: string;
  placeholder: string;
}

export function EmailField({ form, label, placeholder }: EmailFieldProps) {
  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-nova-white">{label} *</FormLabel>
          <FormControl>
            <div className="relative">
              <Input 
                placeholder={placeholder} 
                {...field} 
                className="bg-nova-black/60 border-nova-gold/30 text-nova-white pl-10"
                type="email"
              />
              <Mail className="absolute left-3 top-3 h-4 w-4 text-nova-gold/70" />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
