
import React from 'react';
import { StatCard } from './StatCard';
import { BarChart3, CarFront, Calendar, Users, DollarSign } from 'lucide-react';

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
