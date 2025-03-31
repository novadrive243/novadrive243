
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/language-context";
import { UseFormReturn } from "react-hook-form";

interface PhoneFieldProps {
  form: UseFormReturn<any>;
}

export function PhoneField({ form }: PhoneFieldProps) {
  const { language } = useLanguage();
  
  return (
    <FormField
      control={form.control}
      name="phoneNumber"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-nova-white">
            {language === 'fr' ? 'Numéro de téléphone' : 'Phone Number'} *
          </FormLabel>
          <FormControl>
            <Input 
              placeholder={language === 'fr' ? 'Entrez votre numéro de téléphone' : 'Enter your phone number'} 
              {...field} 
              className="bg-nova-black/60 border-nova-gold/30 text-nova-white"
              type="tel"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
