import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { vehicles as frontendVehicles } from '@/data/vehicles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { 
  BarChart3, 
  CarFront, 
  Calendar, 
  Users, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Loader2
} from 'lucide-react';

type Booking = {
  id: string;
  user_id: string;
  vehicle_id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: string;
  created_at: string;
  user?: {
    full_name: string;
  };
  vehicle?: {
    name: string;
  };
}

type Vehicle = {
  id: string;
  name: string;
  price_per_day: number;
  available: boolean;
  category: string;
  image_url: string;
}

type Profile = {
  id: string;
  full_name: string;
  phone: string;
  created_at: string;
}

const StatCard = ({ 
  title, 
  value, 
  icon, 
  change, 
  language 
}: { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode; 
  change: { value: number; positive: boolean };
  language: string;
}) => (
  <Card className="bg-nova-gray/30 border-nova-gold/30">
    <CardContent className="p-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-nova-white/70">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-nova-white mt-1">{value}</h3>
        </div>
        <div className="bg-nova-gold/20 p-3 rounded-full">
          {icon}
        </div>
      </div>
      <div className="flex items-center mt-4">
        {change.positive ? (
          <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
        ) : (
          <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
        )}
        <span className={change.positive ? "text-green-500 text-sm" : "text-red-500 text-sm"}>
          {change.value > 0 ? `+${change.value}%` : `${change.value}%`}
        </span>
        <span className="text-nova-white/50 text-sm ml-2">
          {language === 'fr' ? 'Depuis le mois dernier' : 'Since last month'}
        </span>
      </div>
    </CardContent>
  </Card>
);

const AdminPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Data states
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);

  // Stats calculation
  const availableVehicles = vehicles.filter(v => v.available).length;
  const percentChange = {
    revenue: 12.5,
    bookings: 8.2,
    customers: 5.1,
    vehicles: -2.3
  };
  
  useEffect(() => {
    // Check if admin is authenticated
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth !== 'true') {
      // Redirect to login page if not authenticated as admin
      navigate('/login');
    } else {
      setIsAuthorized(true);
      fetchData();
    }
  }, [navigate]);
  
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch bookings with user and vehicle info
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          *,
          profiles(full_name),
          vehicles(name)
        `)
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (bookingsError) throw bookingsError;
      
      // Format bookings data
      const formattedBookings = bookingsData.map(booking => ({
        ...booking,
        user: booking.profiles,
        vehicle: booking.vehicles
      }));
      
      setBookings(formattedBookings);
      
      // Calculate monthly revenue
      const totalRevenue = bookingsData.reduce((sum, booking) => sum + Number(booking.total_price), 0);
      setMonthlyRevenue(totalRevenue);
      
      // Fetch vehicles
      const { data: vehiclesData, error: vehiclesError } = await supabase
        .from('vehicles')
        .select('*')
        .order('name', { ascending: true });
      
      if (vehiclesError) throw vehiclesError;
      
      // Match Supabase vehicles with frontend vehicles for consistency
      const mappedVehicles = vehiclesData.map(dbVehicle => {
        // Find matching frontend vehicle for additional data
        const frontendMatch = frontendVehicles.find(v => v.name === dbVehicle.name);
        
        return {
          ...dbVehicle,
          // Use frontend image if database image_url is not available
          image_url: dbVehicle.image_url || (frontendMatch ? frontendMatch.image : ''),
          // Ensure we have category data
          category: dbVehicle.category || 'SUV'
        };
      });
      
      setVehicles(mappedVehicles);
      
      // Fetch profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (profilesError) throw profilesError;
      setProfiles(profilesData);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        variant: "destructive",
        title: language === 'fr' ? "Erreur de chargement" : "Loading Error",
        description: language === 'fr' 
          ? "Impossible de charger les données" 
          : "Failed to load data"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (!isAuthorized) return;
    
    // Set up real-time subscriptions
    const bookingsChannel = supabase
      .channel('public:bookings')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'bookings' }, 
        () => {
          console.log('Bookings changed, refreshing data');
          fetchData();
        }
      )
      .subscribe();
      
    const vehiclesChannel = supabase
      .channel('public:vehicles')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'vehicles' }, 
        () => {
          console.log('Vehicles changed, refreshing data');
          fetchData();
        }
      )
      .subscribe();
      
    const profilesChannel = supabase
      .channel('public:profiles')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'profiles' }, 
        () => {
          console.log('Profiles changed, refreshing data');
          fetchData();
        }
      )
      .subscribe();
    
    // Cleanup subscriptions
    return () => {
      supabase.removeChannel(bookingsChannel);
      supabase.removeChannel(vehiclesChannel);
      supabase.removeChannel(profilesChannel);
    };
  }, [isAuthorized]);
  
  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/login');
  };
  
  if (!isAuthorized) {
    return null; // Don't render anything while checking authorization
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const getVehicleDailyPrice = (vehicleName: string) => {
    const frontendVehicle = frontendVehicles.find(v => v.name === vehicleName);
    return frontendVehicle ? frontendVehicle.price.daily : 0;
  };

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
          
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-nova-gold" />
              <span className="ml-2 text-nova-white">
                {language === 'fr' ? 'Chargement...' : 'Loading...'}
              </span>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard 
                  title={language === 'fr' ? 'Revenus Mensuels' : 'Monthly Revenue'}
                  value={formatCurrency(monthlyRevenue)}
                  icon={<DollarSign className="h-6 w-6 text-nova-gold" />}
                  change={{ value: percentChange.revenue, positive: true }}
                  language={language}
                />
                
                <StatCard 
                  title={language === 'fr' ? 'Réservations' : 'Bookings'}
                  value={bookings.length}
                  icon={<Calendar className="h-6 w-6 text-nova-gold" />}
                  change={{ value: percentChange.bookings, positive: true }}
                  language={language}
                />
                
                <StatCard 
                  title={language === 'fr' ? 'Clients' : 'Customers'}
                  value={profiles.length}
                  icon={<Users className="h-6 w-6 text-nova-gold" />}
                  change={{ value: percentChange.customers, positive: true }}
                  language={language}
                />
                
                <StatCard 
                  title={language === 'fr' ? 'Véhicules Disponibles' : 'Available Vehicles'}
                  value={availableVehicles}
                  icon={<CarFront className="h-6 w-6 text-nova-gold" />}
                  change={{ value: percentChange.vehicles, positive: false }}
                  language={language}
                />
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
                      {bookings.length > 0 ? (
                        <Table>
                          <TableHeader className="border-b border-nova-gold/30">
                            <TableRow>
                              <TableHead className="text-nova-gold">ID</TableHead>
                              <TableHead className="text-nova-gold">{language === 'fr' ? 'Client' : 'Customer'}</TableHead>
                              <TableHead className="text-nova-gold">{language === 'fr' ? 'Véhicule' : 'Vehicle'}</TableHead>
                              <TableHead className="text-nova-gold">{language === 'fr' ? 'Date de début' : 'Start Date'}</TableHead>
                              <TableHead className="text-nova-gold">{language === 'fr' ? 'Date de fin' : 'End Date'}</TableHead>
                              <TableHead className="text-nova-gold">{language === 'fr' ? 'Statut' : 'Status'}</TableHead>
                              <TableHead className="text-nova-gold">{language === 'fr' ? 'Montant' : 'Amount'}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {bookings.map((booking) => (
                              <TableRow key={booking.id} className="border-b border-nova-gold/10 hover:bg-nova-gold/5">
                                <TableCell className="text-nova-white font-mono text-xs">{booking.id.split('-')[0]}</TableCell>
                                <TableCell className="text-nova-white">{booking.user?.full_name || 'Unknown'}</TableCell>
                                <TableCell className="text-nova-white">{booking.vehicle?.name || 'Unknown'}</TableCell>
                                <TableCell className="text-nova-white">{formatDate(booking.start_date)}</TableCell>
                                <TableCell className="text-nova-white">{formatDate(booking.end_date)}</TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    booking.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                                    booking.status === 'active' ? 'bg-blue-500/20 text-blue-500' :
                                    booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                                    'bg-red-500/20 text-red-500'
                                  }`}>
                                    {booking.status}
                                  </span>
                                </TableCell>
                                <TableCell className="text-nova-white">{formatCurrency(Number(booking.total_price))}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="text-center p-8 text-nova-white/70">
                          {language === 'fr' ? 'Aucune réservation trouvée' : 'No bookings found'}
                        </div>
                      )}
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
                      {vehicles.length > 0 ? (
                        <Table>
                          <TableHeader className="border-b border-nova-gold/30">
                            <TableRow>
                              <TableHead className="text-nova-gold">{language === 'fr' ? 'Image' : 'Image'}</TableHead>
                              <TableHead className="text-nova-gold">{language === 'fr' ? 'Nom' : 'Name'}</TableHead>
                              <TableHead className="text-nova-gold">{language === 'fr' ? 'Catégorie' : 'Category'}</TableHead>
                              <TableHead className="text-nova-gold">{language === 'fr' ? 'Prix par jour' : 'Price per day'}</TableHead>
                              <TableHead className="text-nova-gold">{language === 'fr' ? 'Disponible' : 'Available'}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {vehicles.map((vehicle) => (
                              <TableRow key={vehicle.id} className="border-b border-nova-gold/10 hover:bg-nova-gold/5">
                                <TableCell>
                                  <div className="h-12 w-16 rounded overflow-hidden">
                                    <img 
                                      src={vehicle.image_url} 
                                      alt={vehicle.name}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                </TableCell>
                                <TableCell className="text-nova-white">{vehicle.name}</TableCell>
                                <TableCell className="text-nova-white">{vehicle.category}</TableCell>
                                <TableCell className="text-nova-white">
                                  {formatCurrency(getVehicleDailyPrice(vehicle.name) || Number(vehicle.price_per_day))}
                                </TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    vehicle.available ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                                  }`}>
                                    {vehicle.available ? 
                                      (language === 'fr' ? 'Disponible' : 'Available') : 
                                      (language === 'fr' ? 'Non disponible' : 'Unavailable')}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="text-center p-8 text-nova-white/70">
                          {language === 'fr' ? 'Aucun véhicule trouvé' : 'No vehicles found'}
                        </div>
                      )}
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
                      {profiles.length > 0 ? (
                        <Table>
                          <TableHeader className="border-b border-nova-gold/30">
                            <TableRow>
                              <TableHead className="text-nova-gold">{language === 'fr' ? 'Nom complet' : 'Full Name'}</TableHead>
                              <TableHead className="text-nova-gold">{language === 'fr' ? 'Téléphone' : 'Phone'}</TableHead>
                              <TableHead className="text-nova-gold">{language === 'fr' ? 'Date d\'inscription' : 'Registration Date'}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {profiles.map((profile) => (
                              <TableRow key={profile.id} className="border-b border-nova-gold/10 hover:bg-nova-gold/5">
                                <TableCell className="text-nova-white">{profile.full_name || 'No name'}</TableCell>
                                <TableCell className="text-nova-white">{profile.phone || 'No phone'}</TableCell>
                                <TableCell className="text-nova-white">{formatDate(profile.created_at)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="text-center p-8 text-nova-white/70">
                          {language === 'fr' ? 'Aucun client trouvé' : 'No customers found'}
                        </div>
                      )}
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
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPage;
