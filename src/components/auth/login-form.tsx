
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type FormValues = z.infer<typeof formSchema>;

export function LoginForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    try {
      // In a real app, you would verify credentials with your backend
      console.log("Login attempt:", data);
      
      // Check if user data exists in localStorage
      const userData = localStorage.getItem('userData');
      
      if (userData) {
        const user = JSON.parse(userData);
        
        // Simple credential check for demo purposes
        if (user.email === data.email) {
          // Check if PIN exists
          const hasPin = localStorage.getItem('userPin') !== null;
          
          if (hasPin) {
            // Redirect to PIN verification
            navigate("/verify-pin");
          } else {
            // Redirect to PIN creation
            navigate("/create-pin");
          }
        } else {
          throw new Error("Invalid credentials");
        }
      } else {
        // No user data found, redirect to registration
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
        description: language === 'fr' 
          ? "Adresse e-mail ou mot de passe incorrect" 
          : "Incorrect email or password",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleRegister = () => {
    navigate("/register");
  };
  
  const handleForgotPassword = () => {
    // Handle forgot password functionality
    console.log("Forgot password clicked");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-nova-white">
                {language === 'fr' ? 'Adresse e-mail' : 'Email Address'}
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder={language === 'fr' ? 'Entrez votre adresse e-mail' : 'Enter your email address'} 
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
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-nova-white">
                {language === 'fr' ? 'Mot de passe' : 'Password'}
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder={language === 'fr' ? 'Entrez votre mot de passe' : 'Enter your password'} 
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
