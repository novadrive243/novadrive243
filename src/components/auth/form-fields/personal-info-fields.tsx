
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/language-context";
import { UseFormReturn } from "react-hook-form";

interface PersonalInfoFieldsProps {
  form: UseFormReturn<any>;
}

export function PersonalInfoFields({ form }: PersonalInfoFieldsProps) {
  const { language } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Last Name */}
      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-nova-white">
              {language === 'fr' ? 'Nom' : 'Last Name'} *
            </FormLabel>
            <FormControl>
              <Input 
                placeholder={language === 'fr' ? 'Entrez votre nom' : 'Enter your last name'} 
                {...field} 
                className="bg-nova-black/60 border-nova-gold/30 text-nova-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* First Name */}
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-nova-white">
              {language === 'fr' ? 'Prénom' : 'First Name'} *
            </FormLabel>
            <FormControl>
              <Input 
                placeholder={language === 'fr' ? 'Entrez votre prénom' : 'Enter your first name'} 
                {...field} 
                className="bg-nova-black/60 border-nova-gold/30 text-nova-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
