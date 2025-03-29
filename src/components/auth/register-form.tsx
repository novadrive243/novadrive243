
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";
import { CalendarIcon, ChevronRight, Eye, EyeOff, User } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

const phoneRegex = /^(\+\d{1,3})?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const formSchema = z.object({
  lastName: z.string().min(1, { message: "Last name is required" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
  address: z.string().optional(),
  phoneNumber: z.string().regex(phoneRegex, { message: "Invalid phone number format" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export function RegisterForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      address: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
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
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        
        {/* Date of Birth */}
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-nova-white">
                {language === 'fr' ? 'Date de naissance' : 'Date of Birth'} *
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal bg-nova-black/60 border-nova-gold/30 text-nova-white",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: language === 'fr' ? fr : undefined })
                      ) : (
                        <span>{language === 'fr' ? "Sélectionnez une date" : "Select date"}</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-nova-black border-nova-gold/30" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                    className="bg-nova-black text-nova-white"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Address (Optional) */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-nova-white">
                {language === 'fr' ? 'Adresse' : 'Address'} <span className="text-nova-white/50">{language === 'fr' ? '(optionnel)' : '(optional)'}</span>
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={language === 'fr' ? 'Entrez votre adresse' : 'Enter your address'} 
                  {...field} 
                  className="bg-nova-black/60 border-nova-gold/30 text-nova-white resize-none"
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Phone Number */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-nova-white">
                {language === 'fr' ? 'Numéro de téléphone' : 'Phone Number'} *
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder={language === 'fr' ? 'Entrez votre numéro de téléphone' : 'Enter your phone number'} 
                  {...field} 
                  className="bg-nova-black/60 border-nova-gold/30 text-nova-white"
                  type="tel"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-nova-white">
                {language === 'fr' ? 'Adresse e-mail' : 'Email Address'} *
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder={language === 'fr' ? 'Entrez votre adresse e-mail' : 'Enter your email address'} 
                  {...field} 
                  className="bg-nova-black/60 border-nova-gold/30 text-nova-white"
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-nova-white">
                {language === 'fr' ? 'Mot de passe' : 'Password'} *
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder={language === 'fr' ? 'Créez votre mot de passe' : 'Create your password'} 
                    {...field} 
                    className="bg-nova-black/60 border-nova-gold/30 text-nova-white pr-10"
                    type={showPassword ? "text" : "password"}
                  />
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
