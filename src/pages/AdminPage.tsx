
import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  CarFront, 
  Calendar, 
  Users, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

// Mock data for the admin dashboard
const recentBookings = [
  { id: 'BK-1234', customer: 'John Doe', vehicle: 'Mercedes S-Class', date: '2023-11-15', status: 'completed', amount: '$250' },
  { id: 'BK-1235', customer: 'Alice Smith', vehicle: 'BMW 7 Series', date: '2023-11-16', status: 'active', amount: '$320' },
  { id: 'BK-1236', customer: 'Robert Brown', vehicle: 'Tesla Model S', date: '2023-11-17', status: 'pending', amount: '$180' },
  { id: 'BK-1237', customer: 'Emma Wilson', vehicle: 'Audi A8', date: '2023-11-18', status: 'cancelled', amount: '$0' },
];

const AdminPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  useEffect(() => {
    // Check if admin is authenticated
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth !== 'true') {
      // Redirect to login page if not authenticated as admin
      navigate('/login');
    } else {
      setIsAuthorized(true);
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/login');
  };
  
  if (!isAuthorized) {
    return null; // Don't render anything while checking authorization
  }

  return (
    <div className="min-h-screen flex flex-col bg-nova-black text-nova-white">
      <Header />
      
      <main className="flex-grow pt-20 pb-10 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold gold-gradient-text">
              {language === 'fr' ? 'Tableau de Bord Admin' : 'Admin Dashboard'}
            </h1>
            <Button 
              variant="outline" 
              className="border-nova-gold/50 text-nova-gold hover:bg-nova-gold/10"
              onClick={handleLogout}
            >
              {language === 'fr' ? 'Déconnexion' : 'Logout'}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="bg-nova-gray/30 border-nova-gold/30">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-nova-white/70">
                      {language === 'fr' ? 'Revenus Mensuels' : 'Monthly Revenue'}
                    </p>
                    <h3 className="text-2xl font-bold text-nova-white mt-1">$14,825</h3>
                  </div>
                  <div className="bg-nova-gold/20 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-nova-gold" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 text-sm">+12.5%</span>
                  <span className="text-nova-white/50 text-sm ml-2">
                    {language === 'fr' ? 'Depuis le mois dernier' : 'Since last month'}
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-nova-gray/30 border-nova-gold/30">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-nova-white/70">
                      {language === 'fr' ? 'Réservations' : 'Bookings'}
                    </p>
                    <h3 className="text-2xl font-bold text-nova-white mt-1">142</h3>
                  </div>
                  <div className="bg-nova-gold/20 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-nova-gold" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 text-sm">+8.2%</span>
                  <span className="text-nova-white/50 text-sm ml-2">
                    {language === 'fr' ? 'Depuis le mois dernier' : 'Since last month'}
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-nova-gray/30 border-nova-gold/30">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-nova-white/70">
                      {language === 'fr' ? 'Clients' : 'Customers'}
                    </p>
                    <h3 className="text-2xl font-bold text-nova-white mt-1">89</h3>
                  </div>
                  <div className="bg-nova-gold/20 p-3 rounded-full">
                    <Users className="h-6 w-6 text-nova-gold" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 text-sm">+5.1%</span>
                  <span className="text-nova-white/50 text-sm ml-2">
                    {language === 'fr' ? 'Depuis le mois dernier' : 'Since last month'}
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-nova-gray/30 border-nova-gold/30">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-nova-white/70">
                      {language === 'fr' ? 'Véhicules Disponibles' : 'Available Vehicles'}
                    </p>
                    <h3 className="text-2xl font-bold text-nova-white mt-1">14</h3>
                  </div>
                  <div className="bg-nova-gold/20 p-3 rounded-full">
                    <CarFront className="h-6 w-6 text-nova-gold" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-red-500 text-sm">-2.3%</span>
                  <span className="text-nova-white/50 text-sm ml-2">
                    {language === 'fr' ? 'Depuis le mois dernier' : 'Since last month'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="bookings" className="mb-6">
            <TabsList className="bg-nova-gray/30 border border-nova-gold/20 p-1">
              <TabsTrigger 
                value="bookings"
                className="data-[state=active]:bg-nova-gold data-[state=active]:text-nova-black"
              >
                {language === 'fr' ? 'Réservations' : 'Bookings'}
              </TabsTrigger>
              <TabsTrigger 
                value="vehicles"
                className="data-[state=active]:bg-nova-gold data-[state=active]:text-nova-black"
              >
                {language === 'fr' ? 'Véhicules' : 'Vehicles'}
              </TabsTrigger>
              <TabsTrigger 
                value="customers"
                className="data-[state=active]:bg-nova-gold data-[state=active]:text-nova-black"
              >
                {language === 'fr' ? 'Clients' : 'Customers'}
              </TabsTrigger>
              <TabsTrigger 
                value="analytics"
                className="data-[state=active]:bg-nova-gold data-[state=active]:text-nova-black"
              >
                {language === 'fr' ? 'Analyses' : 'Analytics'}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="bookings" className="mt-4">
              <Card className="bg-nova-gray/30 border-nova-gold/30">
                <CardHeader>
                  <CardTitle className="text-nova-white">
                    {language === 'fr' ? 'Réservations Récentes' : 'Recent Bookings'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-nova-white">
                      <thead className="text-xs uppercase text-nova-gold border-b border-nova-gold/30">
                        <tr>
                          <th className="px-4 py-3">ID</th>
                          <th className="px-4 py-3">{language === 'fr' ? 'Client' : 'Customer'}</th>
                          <th className="px-4 py-3">{language === 'fr' ? 'Véhicule' : 'Vehicle'}</th>
                          <th className="px-4 py-3">{language === 'fr' ? 'Date' : 'Date'}</th>
                          <th className="px-4 py-3">{language === 'fr' ? 'Statut' : 'Status'}</th>
                          <th className="px-4 py-3">{language === 'fr' ? 'Montant' : 'Amount'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentBookings.map((booking) => (
                          <tr key={booking.id} className="border-b border-nova-gold/10 hover:bg-nova-gold/5">
                            <td className="px-4 py-3">{booking.id}</td>
                            <td className="px-4 py-3">{booking.customer}</td>
                            <td className="px-4 py-3">{booking.vehicle}</td>
                            <td className="px-4 py-3">{booking.date}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                booking.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                                booking.status === 'active' ? 'bg-blue-500/20 text-blue-500' :
                                booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                                'bg-red-500/20 text-red-500'
                              }`}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">{booking.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="vehicles" className="mt-4">
              <Card className="bg-nova-gray/30 border-nova-gold/30">
                <CardHeader>
                  <CardTitle className="text-nova-white">
                    {language === 'fr' ? 'Gestion des Véhicules' : 'Vehicle Management'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-nova-white/70">
                    {language === 'fr' 
                      ? 'Fonctionnalité en cours de développement.' 
                      : 'This feature is under development.'}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="customers" className="mt-4">
              <Card className="bg-nova-gray/30 border-nova-gold/30">
                <CardHeader>
                  <CardTitle className="text-nova-white">
                    {language === 'fr' ? 'Gestion des Clients' : 'Customer Management'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-nova-white/70">
                    {language === 'fr' 
                      ? 'Fonctionnalité en cours de développement.' 
                      : 'This feature is under development.'}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-4">
              <Card className="bg-nova-gray/30 border-nova-gold/30">
                <CardHeader>
                  <CardTitle className="text-nova-white">
                    {language === 'fr' ? 'Analyses et Rapports' : 'Analytics & Reports'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center items-center p-10">
                    <BarChart3 className="h-16 w-16 text-nova-gold/50" />
                    <p className="ml-4 text-nova-white/70">
                      {language === 'fr' 
                        ? 'Les graphiques et analyses seront bientôt disponibles.' 
                        : 'Charts and analytics will be available soon.'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPage;
