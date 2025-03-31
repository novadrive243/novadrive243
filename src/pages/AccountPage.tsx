import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, Phone, Mail, Instagram, 
  Car, Clock, LogOut, Languages, 
  Star, Bell, Calendar, PhoneCall
} from "lucide-react";
import { LoyaltyCard } from '@/components/loyalty/loyalty-card';
import { DriverProfileCard } from '@/components/drivers/driver-profile-card';
import { NotificationsCenter, Notification } from '@/components/notifications/notifications-center';
import { RatingForm } from '@/components/ratings/rating-form';
import { CalendarIntegration, BookingEvent } from '@/components/calendar/calendar-integration';
import { EmergencyContact } from '@/components/emergency/emergency-contact';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { useTimezone } from '@/hooks/use-timezone';

const AccountPage = () => {
  const { t, language, setLanguage } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const { formatKinshasaDate, getCurrentKinshasaTime } = useTimezone();
  
  // Get registration date from localStorage if available (for demo)
  // In a real app, this would come from the user's profile in the database
  const [registrationDate, setRegistrationDate] = useState<string>('');
  
  useEffect(() => {
    // Try to get user data from localStorage (from registration demo flow)
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        // If we have a dateOfBirth in the format of ISO string, format it
        if (userData.dateOfBirth) {
          setRegistrationDate(formatKinshasaDate(new Date(userData.dateOfBirth), 'dd/MM/yyyy'));
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, [formatKinshasaDate]);
  
  // Sample data for features
  const [selectedDate, setSelectedDate] = useState<Date>(getCurrentKinshasaTime());
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Your booking for tomorrow at 2:00 PM has been confirmed.',
      date: '2 hours ago',
      read: false
    },
    {
      id: '2',
      type: 'promotion',
      title: 'Weekend Special',
      message: 'Get 20% off on all weekend bookings this month!',
      date: '1 day ago',
      read: true
    },
    {
      id: '3',
      type: 'system',
      title: 'Account Created',
      message: 'Welcome to NovaDrive! Your account has been created successfully.',
      date: '3 days ago',
      read: true
    }
  ]);
  
  const sampleDrivers = [
    {
      id: 'd1',
      name: 'Jean Dupont',
      experience: '5 years',
      rating: 4.8,
      languages: ['French', 'English', 'Lingala'],
      certifications: ['Defensive Driving', 'First Aid']
    },
    {
      id: 'd2',
      name: 'Marie Mbeki',
      experience: '3 years',
      rating: 4.5,
      languages: ['French', 'Swahili'],
      certifications: ['City Tour Guide', 'Mechanical Skills']
    }
  ];
  
  const sampleEvents: BookingEvent[] = [
    {
      id: 'e1',
      title: 'Airport Pickup',
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      location: 'N\'Djili Airport',
      status: 'upcoming'
    },
    {
      id: 'e2',
      title: 'Hotel Transfer',
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      location: 'Pullman Hotel',
      status: 'upcoming'
    },
    {
      id: 'e3',
      title: 'City Tour',
      date: new Date(new Date().setDate(new Date().getDate() - 3)),
      location: 'Kinshasa Downtown',
      status: 'completed'
    }
  ];
  
  // Handlers for different features
  const handleLogout = () => {
    sessionStorage.removeItem('pinVerified');
    window.location.href = '/login';
  };
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };
  
  const handleDeleteAll = () => {
    setNotifications([]);
  };
  
  const handleContactDriver = (driverId: string) => {
    toast({
      title: "Driver Contact",
      description: `Connecting you with driver ID: ${driverId}`,
    });
  };
  
  const handleViewDriverProfile = (driverId: string) => {
    toast({
      title: "Driver Profile",
      description: `Viewing full profile of driver ID: ${driverId}`,
    });
  };
  
  const handleRatingSubmit = (ratings: Record<string, number>, comment: string) => {
    console.log("Ratings submitted:", ratings, comment);
  };
  
  const handleAddToCalendar = (event: BookingEvent) => {
    console.log("Adding to calendar:", event);
  };
  
  const handleEmergencyCall = (number: string) => {
    window.open(`tel:${number}`, '_self');
  };
  
  const handleEmergencyMessage = (number: string) => {
    window.open(`sms:${number}`, '_self');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-nova-black">
      <Header />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">
            <span className="gold-gradient-text">{t('account.title')}</span>
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile section */}
            <Card className="bg-nova-black/40 border-nova-gold/20">
              <CardHeader>
                <CardTitle>{t('account.profile')}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-nova-gold/20 text-nova-gold">
                    <User size={32} />
                  </AvatarFallback>
                </Avatar>
                
                <h2 className="text-xl font-bold text-nova-white">
                  {user?.email ? user.email.split('@')[0] : t('account.userName')}
                </h2>
                <p className="text-nova-white/70 mb-6">{user?.email || 'user@example.com'}</p>
                
                <div className="space-y-4 w-full">
                  <div className="flex items-center gap-3 text-nova-white/70">
                    <User className="h-5 w-5 text-nova-gold" />
                    <span>
                      {t('account.member')} 
                      {registrationDate && <span className="ml-1">({registrationDate})</span>}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-nova-white/70">
                    <Car className="h-5 w-5 text-nova-gold" />
                    <span>{t('account.favoriteVehicle')}</span>
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
                  {t('account.logout')}
                </Button>
              </CardContent>
            </Card>
            
            {/* Main content area */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="reservations">
                <TabsList className="bg-nova-black/40 border border-nova-gold/20 overflow-x-auto flex-wrap">
                  <TabsTrigger value="reservations">
                    <Clock className="h-4 w-4 mr-1" />
                    {t('account.reservations')}
                  </TabsTrigger>
                  <TabsTrigger value="loyalty">
                    <Star className="h-4 w-4 mr-1" />
                    {t('account.loyaltyProgram')}
                  </TabsTrigger>
                  <TabsTrigger value="drivers">
                    <User className="h-4 w-4 mr-1" />
                    {t('account.favoriteDrivers')}
                  </TabsTrigger>
                  <TabsTrigger value="notifications">
                    <Bell className="h-4 w-4 mr-1" />
                    {t('account.notifications')}
                  </TabsTrigger>
                  <TabsTrigger value="ratings">
                    <Star className="h-4 w-4 mr-1" />
                    {t('account.myRatings')}
                  </TabsTrigger>
                  <TabsTrigger value="calendar">
                    <Calendar className="h-4 w-4 mr-1" />
                    {t('account.calendarSync')}
                  </TabsTrigger>
                  <TabsTrigger value="emergency">
                    <PhoneCall className="h-4 w-4 mr-1" />
                    {t('account.emergencyContacts')}
                  </TabsTrigger>
                  <TabsTrigger value="contact">
                    <Mail className="h-4 w-4 mr-1" />
                    {t('account.contact')}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="reservations" className="pt-4">
                  <Card className="bg-nova-black/40 border-nova-gold/20">
                    <CardHeader>
                      <CardTitle>{t('account.reservationHistory')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <Clock className="h-12 w-12 text-nova-gold/40 mx-auto mb-4" />
                        <p className="text-nova-white/50">
                          {t('account.noReservations')}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="loyalty" className="pt-4">
                  <LoyaltyCard 
                    points={750} 
                    level="silver" 
                    nextLevelPoints={1000}
                    history={[
                      { date: '2023-09-15', description: 'Airport Transfer', points: 100 },
                      { date: '2023-09-10', description: 'City Tour', points: 150 },
                      { date: '2023-09-05', description: 'Welcome Bonus', points: 500 }
                    ]}
                  />
                </TabsContent>
                
                <TabsContent value="drivers" className="pt-4">
                  <div className="space-y-4">
                    {sampleDrivers.map(driver => (
                      <DriverProfileCard 
                        key={driver.id}
                        driver={driver}
                        onContactClick={handleContactDriver}
                        onViewProfileClick={handleViewDriverProfile}
                      />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="notifications" className="pt-4">
                  <NotificationsCenter 
                    notifications={notifications}
                    onMarkAsRead={handleMarkAsRead}
                    onMarkAllAsRead={handleMarkAllAsRead}
                    onDeleteAll={handleDeleteAll}
                  />
                </TabsContent>
                
                <TabsContent value="ratings" className="pt-4">
                  <RatingForm onSubmit={handleRatingSubmit} />
                </TabsContent>
                
                <TabsContent value="calendar" className="pt-4">
                  <CalendarIntegration 
                    events={sampleEvents}
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                    onAddToCalendar={handleAddToCalendar}
                  />
                </TabsContent>
                
                <TabsContent value="emergency" className="pt-4">
                  <EmergencyContact 
                    onCall={handleEmergencyCall}
                    onMessage={handleEmergencyMessage}
                  />
                </TabsContent>
                
                <TabsContent value="contact" className="pt-4">
                  <Card className="bg-nova-black/40 border-nova-gold/20">
                    <CardHeader>
                      <CardTitle>{t('account.contactUs')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-nova-gold/10 flex items-center justify-center">
                          <Phone className="h-5 w-5 text-nova-gold" />
                        </div>
                        <div>
                          <p className="text-nova-white/50 text-sm">{t('account.phone')}</p>
                          <p className="text-nova-white">+243 855971610</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-nova-gold/10 flex items-center justify-center">
                          <Mail className="h-5 w-5 text-nova-gold" />
                        </div>
                        <div>
                          <p className="text-nova-white/50 text-sm">{t('account.email')}</p>
                          <p className="text-nova-white">novadrive243@gmail.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-nova-gold/10 flex items-center justify-center">
                          <Instagram className="h-5 w-5 text-nova-gold" />
                        </div>
                        <div>
                          <p className="text-nova-white/50 text-sm">{t('account.instagram')}</p>
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
