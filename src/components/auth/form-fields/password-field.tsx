
import React, { useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface PasswordFieldProps {
  form: UseFormReturn<any>;
  label: string;
  placeholder: string;
}

export function PasswordField({ form, label, placeholder }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-nova-white">{label} *</FormLabel>
          <FormControl>
            <div className="relative">
              <Input 
                placeholder={placeholder} 
                {...field} 
                className="bg-nova-black/60 border-nova-gold/30 text-nova-white pl-10 pr-10"
                type={showPassword ? "text" : "password"}
              />
              <Lock className="absolute left-3 top-3 h-4 w-4 text-nova-gold/70" />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full text-nova-white/70 hover:text-nova-white"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
