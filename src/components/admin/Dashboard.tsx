
import React from 'react';
import { StatCard } from './StatCard';
import { BarChart3, CarFront, Calendar, Users, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DashboardProps {
  bookings: any[];
  vehicles: any[];
  profiles: any[];
  monthlyRevenue: number;
  availableVehicles: number;
  percentChange: {
    revenue: number;
    bookings: number;
    customers: number;
    vehicles: number;
  };
  language: string;
  formatCurrency: (amount: number) => string;
}

export const Dashboard = ({ 
  bookings, 
  vehicles, 
  profiles, 
  monthlyRevenue, 
  availableVehicles, 
  percentChange,
  language,
  formatCurrency
}: DashboardProps) => {
  const hasData = bookings.length > 0 || vehicles.length > 0 || profiles.length > 0;

  if (!hasData) {
    return (
      <Card className="bg-nova-gray/30 border-nova-gold/30">
        <CardHeader>
          <CardTitle className="text-nova-white">
            {language === 'fr' ? 'Bienvenue dans votre Tableau de Bord' : 'Welcome to your Dashboard'}
          </CardTitle>
          <CardDescription className="text-nova-white/70">
            {language === 'fr' 
              ? 'Commencez à ajouter des données pour voir les statistiques' 
              : 'Start adding data to see statistics'}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-8">
          <div className="max-w-md mx-auto">
            <div className="text-nova-white/70 mb-6">
              {language === 'fr' 
                ? 'Aucune donnée n\'est disponible pour le moment. Ajoutez des véhicules, des clients ou des réservations pour commencer.' 
                : 'No data is available yet. Add vehicles, customers, or bookings to get started.'}
            </div>
            <div className="flex flex-col space-y-3">
              <Button variant="outline" className="border-nova-gold/30 text-nova-gold hover:bg-nova-gold/10 hover:text-nova-white">
                <CarFront className="h-4 w-4 mr-2" />
                {language === 'fr' ? 'Ajouter un véhicule' : 'Add Vehicle'}
              </Button>
              <Button variant="outline" className="border-nova-gold/30 text-nova-gold hover:bg-nova-gold/10 hover:text-nova-white">
                <Users className="h-4 w-4 mr-2" />
                {language === 'fr' ? 'Ajouter un client' : 'Add Customer'}
              </Button>
              <Button variant="outline" className="border-nova-gold/30 text-nova-gold hover:bg-nova-gold/10 hover:text-nova-white">
                <Calendar className="h-4 w-4 mr-2" />
                {language === 'fr' ? 'Créer une réservation' : 'Create Booking'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
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
  );
};
