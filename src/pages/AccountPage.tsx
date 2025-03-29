
import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, Phone, Mail, Instagram, 
  Car, Clock, LogOut, Languages 
} from "lucide-react";

const AccountPage = () => {
  const { t, language, setLanguage } = useLanguage();
  
  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem('pinVerified');
    // Redirect to login (this will be handled by the router)
    window.location.href = '/login';
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-nova-black">
      <Header />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">
            <span className="gold-gradient-text">{t('account.title') || 'My Account'}</span>
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile section */}
            <Card className="bg-nova-black/40 border-nova-gold/20">
              <CardHeader>
                <CardTitle>{t('account.profile') || 'Profile'}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-nova-gold/20 text-nova-gold">
                    <User size={32} />
                  </AvatarFallback>
                </Avatar>
                
                <h2 className="text-xl font-bold text-nova-white">
                  {t('account.userName') || 'NovaDrive User'}
                </h2>
                <p className="text-nova-white/70 mb-6">user@example.com</p>
                
                <div className="space-y-4 w-full">
                  <div className="flex items-center gap-3 text-nova-white/70">
                    <User className="h-5 w-5 text-nova-gold" />
                    <span>{t('account.member') || 'Member since 2024'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-nova-white/70">
                    <Car className="h-5 w-5 text-nova-gold" />
                    <span>{t('account.favoriteVehicle') || 'Favorite: Toyota Fortuner'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-nova-white/70">
                    <Languages className="h-5 w-5 text-nova-gold" />
                    <div className="flex gap-2">
                      <button 
                        className={`px-2 py-1 rounded ${language === 'fr' ? 'bg-nova-gold text-nova-black' : 'bg-nova-black/50 text-nova-white'}`}
                        onClick={() => setLanguage('fr')}
                      >
                        FR
                      </button>
                      <button 
                        className={`px-2 py-1 rounded ${language === 'en' ? 'bg-nova-gold text-nova-black' : 'bg-nova-black/50 text-nova-white'}`}
                        onClick={() => setLanguage('en')}
                      >
                        EN
                      </button>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="destructive" 
                  className="mt-8 w-full bg-red-900/20 hover:bg-red-900/30 text-red-400"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('account.logout') || 'Logout'}
                </Button>
              </CardContent>
            </Card>
            
            {/* Main content area */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="reservations">
                <TabsList className="bg-nova-black/40 border border-nova-gold/20">
                  <TabsTrigger value="reservations">
                    {t('account.reservations') || 'Reservations'}
                  </TabsTrigger>
                  <TabsTrigger value="contact">
                    {t('account.contact') || 'Contact'}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="reservations" className="pt-4">
                  <Card className="bg-nova-black/40 border-nova-gold/20">
                    <CardHeader>
                      <CardTitle>{t('account.reservationHistory') || 'Reservation History'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <Clock className="h-12 w-12 text-nova-gold/40 mx-auto mb-4" />
                        <p className="text-nova-white/50">
                          {t('account.noReservations') || 'You have no reservation history'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="contact" className="pt-4">
                  <Card className="bg-nova-black/40 border-nova-gold/20">
                    <CardHeader>
                      <CardTitle>{t('account.contactUs') || 'Contact Us'}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-nova-gold/10 flex items-center justify-center">
                          <Phone className="h-5 w-5 text-nova-gold" />
                        </div>
                        <div>
                          <p className="text-nova-white/50 text-sm">{t('account.phone') || 'Phone'}</p>
                          <p className="text-nova-white">+243 855971610</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-nova-gold/10 flex items-center justify-center">
                          <Mail className="h-5 w-5 text-nova-gold" />
                        </div>
                        <div>
                          <p className="text-nova-white/50 text-sm">{t('account.email') || 'Email'}</p>
                          <p className="text-nova-white">novadrive243@gmail.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-nova-gold/10 flex items-center justify-center">
                          <Instagram className="h-5 w-5 text-nova-gold" />
                        </div>
                        <div>
                          <p className="text-nova-white/50 text-sm">{t('account.instagram') || 'Instagram'}</p>
                          <p className="text-nova-white">@novadrive243</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AccountPage;
