
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/language-context";
import { UseFormReturn } from "react-hook-form";

interface AddressFieldProps {
  form: UseFormReturn<any>;
}

export function AddressField({ form }: AddressFieldProps) {
  const { language } = useLanguage();
  
  return (
    <FormField
      control={form.control}
      name="address"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-nova-white">
            {language === 'fr' ? 'Adresse' : 'Address'} <span className="text-nova-white/50">{language === 'fr' ? '(optionnel)' : '(optional)'}</span>
          </FormLabel>
          <FormControl>
            <Textarea 
              placeholder={language === 'fr' ? 'Entrez votre adresse' : 'Enter your address'} 
              {...field} 
              className="bg-nova-black/60 border-nova-gold/30 text-nova-white resize-none"
              rows={3}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
