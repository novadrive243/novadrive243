
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";
import { EmailField } from "../form-fields/email-field";
import { PasswordField } from "../form-fields/password-field";
import { loginFormSchema, LoginFormValues } from "../form-schemas/login-schema";

interface AdminLoginProps {
  onToggleMode: () => void;
}

export function AdminLogin({ onToggleMode }: AdminLoginProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    
    try {
      console.log("Admin login attempt:", data);
      
      if (data.email === "admin@novadrive.com" && data.password === "admin123") {
        localStorage.setItem('adminAuth', 'true');
        navigate("/admin");
      } else {
        throw new Error("Invalid admin credentials");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: language === 'fr' ? "Erreur d'authentification admin" : "Admin authentication failed",
        description: language === 'fr' ? "Identifiants administrateur incorrects" : "Incorrect admin credentials",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-nova-gold">
            {language === 'fr' ? 'Connexion Administrateur' : 'Admin Login'}
          </h2>
          <Button 
            type="button"
            variant="link" 
            className="text-nova-gold p-0 h-auto"
            onClick={onToggleMode}
          >
            {language === 'fr' ? 'Connexion utilisateur' : 'User login'}
          </Button>
        </div>
        
        <EmailField 
          form={form} 
          label={language === 'fr' ? 'Adresse e-mail' : 'Email Address'}
          placeholder={language === 'fr' ? 'Email administrateur' : 'Admin email'}
        />
        
        <PasswordField 
          form={form} 
          label={language === 'fr' ? 'Mot de passe' : 'Password'}
          placeholder={language === 'fr' ? 'Mot de passe administrateur' : 'Admin password'}
        />
        
        <Button 
          type="submit" 
          className="w-full gold-btn" 
          disabled={isLoading}
        >
          {isLoading 
            ? (language === 'fr' ? 'Connexion en cours...' : 'Logging in...') 
            : (language === 'fr' ? 'Connexion Admin' : 'Admin Login')}
        </Button>
      </form>
    </Form>
  );
}
