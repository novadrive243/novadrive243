
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ShieldCheck } from "lucide-react";

export function CreatePinForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Check if user is registered
  React.useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      // Redirect to registration if not registered
      navigate("/register");
      
      toast({
        variant: "destructive",
        title: language === 'fr' ? "Inscription requise" : "Registration required",
        description: language === 'fr' 
          ? "Veuillez d'abord vous inscrire" 
          : "Please register first",
      });
    }
  }, [navigate, toast, language]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (pin.length !== 6) {
      toast({
        variant: "destructive",
        title: language === 'fr' ? "PIN invalide" : "Invalid PIN",
        description: language === 'fr' 
          ? "Votre PIN doit contenir 6 chiffres" 
          : "Your PIN must be 6 digits",
      });
      return;
    }
    
    if (pin !== confirmPin) {
      toast({
        variant: "destructive",
        title: language === 'fr' ? "Les PINs ne correspondent pas" : "PINs don't match",
        description: language === 'fr' 
          ? "Veuillez confirmer votre PIN correctement" 
          : "Please confirm your PIN correctly",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, you would store the PIN securely
      // For this mock, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store the PIN in localStorage (not secure, just for demo)
      localStorage.setItem('userPin', pin);
      
      // Mark PIN as verified for this session
      sessionStorage.setItem('pinVerified', 'true');
      
      toast({
        title: language === 'fr' ? "PIN créé avec succès" : "PIN created successfully",
        description: language === 'fr' 
          ? "Votre compte est maintenant sécurisé" 
          : "Your account is now secure",
      });
      
      // Navigate to the main app
      navigate("/home");
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
  
  return (
    <Card className="w-full max-w-md mx-auto bg-nova-black border border-nova-gold/30">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-2">
          <ShieldCheck className="h-12 w-12 text-nova-gold" />
        </div>
        <CardTitle className="text-2xl font-bold text-center gold-gradient-text">
          {language === 'fr' ? 'Créer votre PIN' : 'Create your PIN'}
        </CardTitle>
        <CardDescription className="text-center text-nova-white/70">
          {language === 'fr' 
            ? 'Choisissez un code PIN à 6 chiffres pour sécuriser votre compte' 
            : 'Choose a 6-digit PIN code to secure your account'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="text-center text-sm font-medium text-nova-white mb-2">
              {language === 'fr' ? 'Votre PIN à 6 chiffres' : 'Your 6-digit PIN'}
            </div>
            <div className="flex justify-center">
              <InputOTP 
                maxLength={6}
                value={pin}
                onChange={setPin}
              >
                <InputOTPGroup>
                  {[0, 1, 2, 3, 4, 5].map((_, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-center text-sm font-medium text-nova-white mb-2">
              {language === 'fr' ? 'Confirmer votre PIN' : 'Confirm your PIN'}
            </div>
            <div className="flex justify-center">
              <InputOTP 
                maxLength={6}
                value={confirmPin}
                onChange={setConfirmPin}
              >
                <InputOTPGroup>
                  {[0, 1, 2, 3, 4, 5].map((_, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full gold-btn" 
            disabled={isLoading || pin.length < 6 || confirmPin.length < 6}
          >
            {isLoading 
              ? (language === 'fr' ? 'Création en cours...' : 'Creating...') 
              : (language === 'fr' ? 'Créer mon PIN' : 'Create my PIN')}
          </Button>
        </form>
      </CardContent>
      
      <CardFooter className="flex flex-col">
        <p className="text-xs text-center text-nova-white/50">
          {language === 'fr' 
            ? 'Ce PIN vous sera demandé à chaque connexion pour protéger votre compte' 
            : 'This PIN will be required each time you log in to protect your account'}
        </p>
      </CardFooter>
    </Card>
  );
}
