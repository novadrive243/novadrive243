
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";
import { LockKeyhole } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface VerifyAdminPinFormProps {
  onBackToLogin: () => void;
}

export function VerifyAdminPinForm({ onBackToLogin }: VerifyAdminPinFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const MAX_ATTEMPTS = 3;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      // Get stored PIN
      const storedPin = localStorage.getItem('adminPin');
      
      await new Promise(resolve => setTimeout(resolve, 600));
      
      if (pin === storedPin) {
        // Login successful, set admin auth
        localStorage.setItem('adminAuth', 'true');
        
        toast({
          title: language === 'fr' ? "PIN vérifié" : "PIN verified",
          description: language === 'fr' 
            ? "Connexion admin réussie" 
            : "Admin login successful",
        });
        
        navigate("/admin");
      } else {
        // Increment failed attempts
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        
        // Check if max attempts reached
        if (newAttempts >= MAX_ATTEMPTS) {
          toast({
            variant: "destructive",
            title: language === 'fr' ? "Trop de tentatives" : "Too many attempts",
            description: language === 'fr' 
              ? "Veuillez vous connecter avec vos identifiants" 
              : "Please log in with your credentials",
          });
          
          // Reset PIN in localStorage and redirect to normal login
          localStorage.removeItem('adminPin');
          onBackToLogin();
        } else {
          toast({
            variant: "destructive",
            title: language === 'fr' ? "PIN incorrect" : "Incorrect PIN",
            description: language === 'fr' 
              ? `Veuillez réessayer (tentative ${newAttempts}/${MAX_ATTEMPTS})` 
              : `Please try again (attempt ${newAttempts}/${MAX_ATTEMPTS})`,
          });
        }
        
        // Clear the PIN input
        setPin("");
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
  
  return (
    <div>
      <div className="flex items-center justify-center mb-4">
        <LockKeyhole className="h-10 w-10 text-nova-gold" />
      </div>
      
      <h2 className="text-xl font-semibold text-center text-nova-gold mb-4">
        {language === 'fr' ? 'Connexion Admin Rapide' : 'Quick Admin Login'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <div className="text-center text-sm font-medium text-nova-white mb-2">
            {language === 'fr' ? 'Entrez votre PIN à 6 chiffres' : 'Enter your 6-digit PIN'}
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
        
        <Button 
          type="submit" 
          className="w-full gold-btn" 
          disabled={isLoading || pin.length < 6}
        >
          {isLoading 
            ? (language === 'fr' ? 'Vérification...' : 'Verifying...') 
            : (language === 'fr' ? 'Se connecter' : 'Login')}
        </Button>
        
        <div className="text-center">
          <Button 
            type="button" 
            variant="link" 
            className="text-nova-gold/80"
            onClick={onBackToLogin}
          >
            {language === 'fr' ? 'Connexion avec identifiants' : 'Login with credentials'}
          </Button>
        </div>
      </form>
    </div>
  );
}
