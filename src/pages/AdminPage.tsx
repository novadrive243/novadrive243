
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useLanguage } from '@/contexts/language-context';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Car, CalendarDays, CreditCard, Settings } from 'lucide-react';

// Mock data for the admin dashboard
const bookings = [
  { id: 1, customer: 'John Doe', vehicle: 'Mercedes S-Class', date: '2023-09-15', status: 'Completed', amount: '$120' },
  { id: 2, customer: 'Sarah Wilson', vehicle: 'BMW 7 Series', date: '2023-09-16', status: 'Pending', amount: '$150' },
  { id: 3, customer: 'Michael Brown', vehicle: 'Lexus LS', date: '2023-09-18', status: 'Confirmed', amount: '$135' },
];

const vehicles = [
  { id: 1, model: 'Mercedes S-Class', status: 'Available', lastService: '2023-08-20' },
  { id: 2, model: 'BMW 7 Series', status: 'In Service', lastService: '2023-09-05' },
  { id: 3, model: 'Lexus LS', status: 'Available', lastService: '2023-08-15' },
];

const AdminPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated as admin
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null; // Don't render anything while checking authentication
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-nova-black text-nova-white pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold gold-gradient-text">
            {language === 'fr' ? 'Tableau de bord administrateur' : 'Admin Dashboard'}
          </h1>
          <Button 
            variant="outline" 
            className="border-nova-gold/50 text-nova-gold hover:bg-nova-gold/10"
            onClick={handleLogout}
          >
            {language === 'fr' ? 'Déconnexion' : 'Logout'}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-nova-black/40 border border-nova-gold/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-nova-white">
                {language === 'fr' ? 'Réservations' : 'Bookings'}
              </CardTitle>
              <CalendarDays className="h-4 w-4 text-nova-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-nova-white">{bookings.length}</div>
              <p className="text-xs text-nova-white/70">
                {language === 'fr' ? '+2 depuis hier' : '+2 from yesterday'}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-nova-black/40 border border-nova-gold/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-nova-white">
                {language === 'fr' ? 'Véhicules' : 'Vehicles'}
              </CardTitle>
              <Car className="h-4 w-4 text-nova-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-nova-white">{vehicles.length}</div>
              <p className="text-xs text-nova-white/70">
                {language === 'fr' ? '2 disponibles' : '2 available'}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-nova-black/40 border border-nova-gold/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-nova-white">
                {language === 'fr' ? 'Clients' : 'Customers'}
              </CardTitle>
              <Users className="h-4 w-4 text-nova-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-nova-white">24</div>
              <p className="text-xs text-nova-white/70">
                {language === 'fr' ? '+4 cette semaine' : '+4 this week'}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-nova-black/40 border border-nova-gold/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-nova-white">
                {language === 'fr' ? 'Revenus' : 'Revenue'}
              </CardTitle>
              <CreditCard className="h-4 w-4 text-nova-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-nova-white">$1,234</div>
              <p className="text-xs text-nova-white/70">
                {language === 'fr' ? '+$340 ce mois' : '+$340 this month'}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="bookings" className="mb-8">
          <TabsList className="bg-nova-black/60 border border-nova-gold/20">
            <TabsTrigger value="bookings" className="data-[state=active]:bg-nova-gold/20 data-[state=active]:text-nova-gold">
              {language === 'fr' ? 'Réservations' : 'Bookings'}
            </TabsTrigger>
            <TabsTrigger value="vehicles" className="data-[state=active]:bg-nova-gold/20 data-[state=active]:text-nova-gold">
              {language === 'fr' ? 'Véhicules' : 'Vehicles'}
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-nova-gold/20 data-[state=active]:text-nova-gold">
              {language === 'fr' ? 'Paramètres' : 'Settings'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="bookings">
            <Card className="bg-nova-black/40 border border-nova-gold/20">
              <CardHeader>
                <CardTitle className="text-nova-white">
                  {language === 'fr' ? 'Réservations récentes' : 'Recent Bookings'}
                </CardTitle>
                <CardDescription className="text-nova-white/70">
                  {language === 'fr' ? 'Gérez les réservations de vos clients.' : 'Manage your customer bookings.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-nova-gold/20 hover:bg-nova-gold/5">
                      <TableHead className="text-nova-white">ID</TableHead>
                      <TableHead className="text-nova-white">{language === 'fr' ? 'Client' : 'Customer'}</TableHead>
                      <TableHead className="text-nova-white">{language === 'fr' ? 'Véhicule' : 'Vehicle'}</TableHead>
                      <TableHead className="text-nova-white">{language === 'fr' ? 'Date' : 'Date'}</TableHead>
                      <TableHead className="text-nova-white">{language === 'fr' ? 'Statut' : 'Status'}</TableHead>
                      <TableHead className="text-nova-white text-right">{language === 'fr' ? 'Montant' : 'Amount'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id} className="border-nova-gold/20 hover:bg-nova-gold/5">
                        <TableCell className="text-nova-white">{booking.id}</TableCell>
                        <TableCell className="text-nova-white">{booking.customer}</TableCell>
                        <TableCell className="text-nova-white">{booking.vehicle}</TableCell>
                        <TableCell className="text-nova-white">{booking.date}</TableCell>
                        <TableCell className="text-nova-white">{booking.status}</TableCell>
                        <TableCell className="text-nova-white text-right">{booking.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="border-nova-gold/50 text-nova-gold hover:bg-nova-gold/10">
                  {language === 'fr' ? 'Précédent' : 'Previous'}
                </Button>
                <Button variant="outline" className="border-nova-gold/50 text-nova-gold hover:bg-nova-gold/10">
                  {language === 'fr' ? 'Suivant' : 'Next'}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="vehicles">
            <Card className="bg-nova-black/40 border border-nova-gold/20">
              <CardHeader>
                <CardTitle className="text-nova-white">
                  {language === 'fr' ? 'Flotte de véhicules' : 'Vehicle Fleet'}
                </CardTitle>
                <CardDescription className="text-nova-white/70">
                  {language === 'fr' ? 'Gérez votre flotte de véhicules.' : 'Manage your vehicle fleet.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-nova-gold/20 hover:bg-nova-gold/5">
                      <TableHead className="text-nova-white">ID</TableHead>
                      <TableHead className="text-nova-white">{language === 'fr' ? 'Modèle' : 'Model'}</TableHead>
                      <TableHead className="text-nova-white">{language === 'fr' ? 'Statut' : 'Status'}</TableHead>
                      <TableHead className="text-nova-white">{language === 'fr' ? 'Dernier entretien' : 'Last Service'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vehicles.map((vehicle) => (
                      <TableRow key={vehicle.id} className="border-nova-gold/20 hover:bg-nova-gold/5">
                        <TableCell className="text-nova-white">{vehicle.id}</TableCell>
                        <TableCell className="text-nova-white">{vehicle.model}</TableCell>
                        <TableCell className="text-nova-white">{vehicle.status}</TableCell>
                        <TableCell className="text-nova-white">{vehicle.lastService}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card className="bg-nova-black/40 border border-nova-gold/20">
              <CardHeader>
                <CardTitle className="text-nova-white">
                  {language === 'fr' ? 'Paramètres' : 'Settings'}
                </CardTitle>
                <CardDescription className="text-nova-white/70">
                  {language === 'fr' ? 'Gérez les paramètres de votre tableau de bord.' : 'Manage your dashboard settings.'}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-nova-white font-medium">
                      {language === 'fr' ? 'Notifications' : 'Notifications'}
                    </h3>
                    <p className="text-nova-white/70 text-sm">
                      {language === 'fr' ? 'Recevez des alertes pour les nouvelles réservations' : 'Receive alerts for new bookings'}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="border-nova-gold/50 text-nova-gold hover:bg-nova-gold/10">
                    {language === 'fr' ? 'Configurer' : 'Configure'}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-nova-white font-medium">
                      {language === 'fr' ? 'Sécurité' : 'Security'}
                    </h3>
                    <p className="text-nova-white/70 text-sm">
                      {language === 'fr' ? 'Changez votre mot de passe et vos informations de connexion' : 'Change your password and login information'}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="border-nova-gold/50 text-nova-gold hover:bg-nova-gold/10">
                    {language === 'fr' ? 'Modifier' : 'Edit'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
