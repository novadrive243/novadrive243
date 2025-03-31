
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

interface UserLoginProps {
  onToggleMode: () => void;
}

export function UserLogin({ onToggleMode }: UserLoginProps) {
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
      console.log("User login attempt:", data);
      
      const userData = localStorage.getItem('userData');
      
      if (userData) {
        const user = JSON.parse(userData);
        
        if (user.email === data.email) {
          const hasPin = localStorage.getItem('userPin') !== null;
          
          if (hasPin) {
            navigate("/verify-pin");
          } else {
            navigate("/create-pin");
          }
        } else {
          throw new Error("Invalid credentials");
        }
      } else {
        toast({
          title: language === 'fr' ? "Compte inconnu" : "Account not found",
          description: language === 'fr' 
            ? "Veuillez créer un compte" 
            : "Please create an account",
        });
        navigate("/register");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: language === 'fr' ? "Erreur de connexion" : "Login failed",
        description: language === 'fr' ? "Adresse e-mail ou mot de passe incorrect" : "Incorrect email or password",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-nova-gold">Welcome</h2>
          <Button 
            type="button"
            variant="link" 
            className="text-nova-gold p-0 h-auto"
            onClick={onToggleMode}
          >
            {language === 'fr' ? 'Connexion admin' : 'Admin login'}
          </Button>
        </div>
        
        <EmailField 
          form={form} 
          label={language === 'fr' ? 'Adresse e-mail' : 'Email Address'}
          placeholder={language === 'fr' ? 'Entrez votre adresse e-mail' : 'Enter your email address'}
        />
        
        <PasswordField 
          form={form} 
          label={language === 'fr' ? 'Mot de passe' : 'Password'}
          placeholder={language === 'fr' ? 'Entrez votre mot de passe' : 'Enter your password'}
        />
        
        <div className="flex justify-end">
          <Button 
            variant="link" 
            className="text-nova-gold p-0 h-auto"
            onClick={() => navigate("/reset-pin")}
          >
            {language === 'fr' ? 'Mot de passe oublié?' : 'Forgot password?'}
          </Button>
        </div>
        
        <Button 
          type="submit" 
          className="w-full gold-btn" 
          disabled={isLoading}
        >
          {isLoading 
            ? (language === 'fr' ? 'Connexion en cours...' : 'Logging in...') 
            : (language === 'fr' ? 'Connexion' : 'Login')}
        </Button>
        
        <div className="text-center">
          <p className="text-nova-white/70 text-sm">
            {language === 'fr' ? 'Pas encore de compte?' : 'Don\'t have an account?'}{' '}
            <Button 
              variant="link" 
              className="text-nova-gold p-0 h-auto font-medium"
              onClick={handleRegister}
            >
              {language === 'fr' ? 'S\'inscrire' : 'Register'}
            </Button>
          </p>
        </div>
      </form>
    </Form>
  );
}
