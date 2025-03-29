
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

export function VerifyPinForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      // In a real app, you would verify the PIN securely
      // For this mock, we'll just check with localStorage
      const storedPin = localStorage.getItem('userPin');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (pin === storedPin) {
        // Set session verification
        sessionStorage.setItem('pinVerified', 'true');
        
        toast({
          title: language === 'fr' ? "PIN vérifié" : "PIN verified",
          description: language === 'fr' 
            ? "Bienvenue sur NovaDrive" 
            : "Welcome to NovaDrive",
        });
        
        navigate("/home");
      } else {
        toast({
          variant: "destructive",
          title: language === 'fr' ? "PIN incorrect" : "Incorrect PIN",
          description: language === 'fr' 
            ? "Veuillez réessayer" 
            : "Please try again",
        });
      }
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
  
  const handleResetPin = () => {
    navigate("/reset-pin");
  };
  
  return (
    <Card className="w-full max-w-md mx-auto bg-nova-black border border-nova-gold/30">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-2">
          <ShieldCheck className="h-12 w-12 text-nova-gold" />
        </div>
        <CardTitle className="text-2xl font-bold text-center gold-gradient-text">
          {language === 'fr' ? 'Entrez votre PIN' : 'Enter your PIN'}
        </CardTitle>
        <CardDescription className="text-center text-nova-white/70">
          {language === 'fr' 
            ? 'Veuillez entrer votre code PIN à 6 chiffres' 
            : 'Please enter your 6-digit PIN code'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
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
          
          <Button 
            type="submit" 
            className="w-full gold-btn" 
            disabled={isLoading}
          >
            {isLoading 
              ? (language === 'fr' ? 'Vérification...' : 'Verifying...') 
              : (language === 'fr' ? 'Vérifier' : 'Verify')}
          </Button>
        </form>
      </CardContent>
      
      <CardFooter className="flex flex-col">
        <Button 
          variant="link" 
          className="text-nova-gold"
          onClick={handleResetPin}
        >
          {language === 'fr' ? 'PIN oublié?' : 'Forgot PIN?'}
        </Button>
      </CardFooter>
    </Card>
  );
}
