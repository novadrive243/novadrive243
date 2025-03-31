
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";
import { Form } from "@/components/ui/form";
import { ChevronRight } from "lucide-react";
import { registerFormSchema, RegisterFormValues } from "./form-schemas/register-schema";
import { PersonalInfoFields } from "./form-fields/personal-info-fields";
import { DateOfBirthField } from "./form-fields/date-of-birth-field";
import { AddressField } from "./form-fields/address-field";
import { PhoneField } from "./form-fields/phone-field";
import { EmailField } from "./form-fields/email-field";
import { PasswordField } from "./form-fields/password-field";

export function RegisterForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      address: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    
    try {
      // In a real app, you would submit this data to your backend API
      console.log("Registration data:", data);
      
      // Store user data in localStorage (not secure, just for demo purposes)
      localStorage.setItem('userData', JSON.stringify({
        lastName: data.lastName,
        firstName: data.firstName,
        dateOfBirth: data.dateOfBirth.toISOString(),
        address: data.address || "",
        phoneNumber: data.phoneNumber,
        email: data.email,
      }));
      
      toast({
        title: language === 'fr' ? "Inscription réussie" : "Registration successful",
        description: language === 'fr' 
          ? "Veuillez créer votre code PIN" 
          : "Please create your PIN code",
      });
      
      // Navigate to PIN creation
      navigate("/create-pin");
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: language === 'fr' ? "Erreur" : "Error",
        description: language === 'fr' 
          ? "Une erreur est survenue. Veuillez réessayer" 
          : "An error occurred. Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <PersonalInfoFields form={form} />
        <DateOfBirthField form={form} />
        <AddressField form={form} />
        <PhoneField form={form} />
        
        <EmailField 
          form={form} 
          label={language === 'fr' ? 'Adresse e-mail' : 'Email Address'} 
          placeholder={language === 'fr' ? 'Entrez votre adresse e-mail' : 'Enter your email address'}
        />
        
        <PasswordField 
          form={form} 
          label={language === 'fr' ? 'Mot de passe' : 'Password'} 
          placeholder={language === 'fr' ? 'Créez votre mot de passe' : 'Create your password'}
        />
        
        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full gold-btn flex items-center justify-center gap-2" 
          disabled={isLoading}
        >
          {isLoading ? (
            language === 'fr' ? 'Inscription en cours...' : 'Registering...'
          ) : (
            <>
              {language === 'fr' ? 'S\'inscrire' : 'Register'}
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </Button>
        
        {/* Login Link */}
        <div className="text-center">
          <p className="text-nova-white/70 text-sm">
            {language === 'fr' ? 'Vous avez déjà un compte?' : 'Already have an account?'}{' '}
            <Button 
              variant="link" 
              className="text-nova-gold p-0 h-auto font-medium"
              onClick={() => navigate("/login")}
            >
              {language === 'fr' ? 'Connexion' : 'Login'}
            </Button>
          </p>
        </div>
      </form>
    </Form>
  );
}
