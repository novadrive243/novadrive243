
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Mail, Phone, Lock } from "lucide-react";

export function LoginForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, language } = useLanguage();
  
  const [tab, setTab] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, you would authenticate with a backend service
    try {
      // Mock authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // If successful, navigate to PIN creation
      toast({
        title: language === 'fr' ? "Connexion réussie" : "Login successful",
        description: language === 'fr' 
          ? "Bienvenue sur NovaDrive" 
          : "Welcome to NovaDrive",
      });
      
      navigate("/create-pin");
    } catch (error) {
      toast({
        variant: "destructive",
        title: language === 'fr' ? "Erreur de connexion" : "Login error",
        description: language === 'fr' 
          ? "Vérifiez vos informations et réessayez" 
          : "Please check your credentials and try again",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Mock OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: language === 'fr' ? "Vérification réussie" : "Verification successful",
        description: language === 'fr' 
          ? "Bienvenue sur NovaDrive" 
          : "Welcome to NovaDrive",
      });
      
      navigate("/create-pin");
    } catch (error) {
      toast({
        variant: "destructive",
        title: language === 'fr' ? "Erreur de vérification" : "Verification error",
        description: language === 'fr' 
          ? "Code invalide. Veuillez réessayer" 
          : "Invalid code. Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto bg-nova-black border border-nova-gold/30">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center gold-gradient-text">
          {language === 'fr' ? 'Connexion à' : 'Login to'} NovaDrive
        </CardTitle>
        <CardDescription className="text-center text-nova-white/70">
          {language === 'fr' 
            ? 'Accédez à votre compte pour réserver votre chauffeur' 
            : 'Access your account to book your chauffeur'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="grid gap-4">
        <Tabs defaultValue="email" value={tab} onValueChange={setTab}>
          <TabsList className="grid grid-cols-2 w-full bg-nova-gray">
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {language === 'fr' ? 'Email' : 'Email'}
            </TabsTrigger>
            <TabsTrigger value="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              {language === 'fr' ? 'Téléphone' : 'Phone'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="email">
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">
                  {language === 'fr' ? 'Email' : 'Email'}
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === 'fr' ? 'votre@email.com' : 'your@email.com'}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">
                    {language === 'fr' ? 'Mot de passe' : 'Password'}
                  </Label>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="text-xs text-nova-gold"
                    onClick={() => navigate("/forgot-password")}
                  >
                    {language === 'fr' ? 'Mot de passe oublié?' : 'Forgot password?'}
                  </Button>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full gold-btn" 
                disabled={isLoading}
              >
                {isLoading 
                  ? (language === 'fr' ? 'Connexion en cours...' : 'Logging in...') 
                  : (language === 'fr' ? 'Se connecter' : 'Login')}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="phone">
            <form onSubmit={handlePhoneLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">
                  {language === 'fr' ? 'Numéro de téléphone' : 'Phone Number'}
                </Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+243 855971610"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="otp">
                  {language === 'fr' ? 'Code de vérification' : 'Verification Code'}
                </Label>
                <InputOTP 
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                >
                  <InputOTPGroup>
                    {[0, 1, 2, 3, 4, 5].map((_, index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-sm mt-1 text-nova-gold border-nova-gold"
                >
                  {language === 'fr' ? 'Envoyer le code' : 'Send Code'}
                </Button>
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
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm text-nova-white/70">
          {language === 'fr' ? "Vous n'avez pas de compte?" : "Don't have an account?"}
          <Button 
            variant="link" 
            className="text-nova-gold"
            onClick={() => navigate("/signup")}
          >
            {language === 'fr' ? "S'inscrire" : "Sign up"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
