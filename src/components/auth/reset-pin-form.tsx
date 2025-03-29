
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
import { KeyRound, Mail } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type FormValues = z.infer<typeof formSchema>;

export function ResetPinForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    try {
      // In a real app, you would trigger a backend API to send a reset email
      console.log("PIN reset requested for:", data.email);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setResetSent(true);
      
      toast({
        title: language === 'fr' ? "Instructions envoyées" : "Instructions sent",
        description: language === 'fr' 
          ? "Vérifiez votre boîte de réception pour les instructions de réinitialisation" 
          : "Check your inbox for reset instructions",
      });
    } catch (error) {
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
  
  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="space-y-6">
      {resetSent ? (
        <div className="space-y-6">
          <Alert className="bg-nova-gold/10 border-nova-gold/30">
            <KeyRound className="h-4 w-4 text-nova-gold" />
            <AlertDescription className="text-nova-white mt-3">
              {language === 'fr' 
                ? "Un email avec des instructions de réinitialisation a été envoyé à l'adresse fournie (si elle est associée à un compte)." 
                : "An email with reset instructions has been sent to the provided address (if it's associated with an account)."}
            </AlertDescription>
          </Alert>
          
          <Button 
            type="button" 
            className="w-full gold-btn" 
            onClick={handleBackToLogin}
          >
            {language === 'fr' ? 'Retour à la connexion' : 'Back to Login'}
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            
            <Button 
              type="submit" 
              className="w-full gold-btn" 
              disabled={isLoading}
            >
              {isLoading 
                ? (language === 'fr' ? 'Envoi en cours...' : 'Sending...') 
                : (language === 'fr' ? 'Réinitialiser mon PIN' : 'Reset my PIN')}
            </Button>
            
            <Button 
              type="button" 
              variant="link" 
              className="w-full text-nova-white/70" 
              onClick={handleBackToLogin}
            >
              {language === 'fr' ? 'Retour à la connexion' : 'Back to Login'}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
