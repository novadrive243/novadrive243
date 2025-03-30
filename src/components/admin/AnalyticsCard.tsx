
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Cell 
} from 'recharts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, CarFront, Calendar } from 'lucide-react';

interface AnalyticsCardProps {
  language: string;
  bookings?: any[];
  vehicles?: any[];
  profiles?: any[];
  monthlyRevenue?: number;
}

export const AnalyticsCard = ({ language, bookings = [], vehicles = [], profiles = [], monthlyRevenue = 0 }: AnalyticsCardProps) => {
  // Generate monthly revenue data (last 6 months)
  const currentMonth = new Date().getMonth();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const revenueData = Array.from({ length: 6 }, (_, i) => {
    const monthIndex = (currentMonth - i + 12) % 12;
    const randomVariation = 0.8 + Math.random() * 0.4; // 80% to 120% of current revenue
    return {
      name: monthNames[monthIndex],
      revenue: Math.round((monthlyRevenue * randomVariation) / 6) * 6,
    };
  }).reverse();

  // Bookings by vehicle type
  const bookingsByVehicle = vehicles.map(vehicle => {
    const vehicleBookings = bookings.filter(b => b.vehicle_id === vehicle.id);
    return {
      name: vehicle.name,
      value: vehicleBookings.length,
    };
  });

  // Customer growth data
  const customerData = Array.from({ length: 6 }, (_, i) => {
    const monthIndex = (currentMonth - i + 12) % 12;
    const percentage = profiles.length ? profiles.length / (i + 1) : 10;
    return {
      name: monthNames[monthIndex],
      customers: Math.round(percentage + (Math.random() * 5)),
    };
  }).reverse();

  // Vehicle utilization data
  const utilizationData = vehicles.map(vehicle => {
    const totalDays = 30; // Assuming 30 days period
    const bookedDays = bookings
      .filter(b => b.vehicle_id === vehicle.id)
      .reduce((total, booking) => {
        const startDate = new Date(booking.start_date);
        const endDate = new Date(booking.end_date);
        const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        return total + days;
      }, 0);
    
    return {
      name: vehicle.name,
      utilization: Math.min(Math.round((bookedDays / totalDays) * 100), 100),
    };
  });

  // Colors for charts
  const COLORS = ['#FFD700', '#D4AF37', '#B8860B', '#DAA520', '#FFC125'];

  return (
    <Card className="bg-nova-gray/30 border-nova-gold/30">
      <CardHeader>
        <CardTitle className="text-nova-white">
          {language === 'fr' ? 'Analyses et Rapports' : 'Analytics & Reports'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="revenue" className="w-full">
          <TabsList className="grid grid-cols-4 bg-nova-black text-nova-white mb-6">
            <TabsTrigger value="revenue" className="data-[state=active]:bg-nova-gold/20">
              <DollarSign className="h-4 w-4 mr-2" />
              {language === 'fr' ? 'Revenus' : 'Revenue'}
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-nova-gold/20">
              <Calendar className="h-4 w-4 mr-2" />
              {language === 'fr' ? 'Réservations' : 'Bookings'}
            </TabsTrigger>
            <TabsTrigger value="customers" className="data-[state=active]:bg-nova-gold/20">
              <Users className="h-4 w-4 mr-2" />
              {language === 'fr' ? 'Clients' : 'Customers'}
            </TabsTrigger>
            <TabsTrigger value="utilization" className="data-[state=active]:bg-nova-gold/20">
              <CarFront className="h-4 w-4 mr-2" />
              {language === 'fr' ? 'Utilisation' : 'Utilization'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="revenue" className="mt-0">
            <h3 className="text-lg font-medium text-nova-white mb-4">
              {language === 'fr' ? 'Revenus Mensuels' : 'Monthly Revenue'}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#222', borderColor: '#444', color: '#fff' }} 
                  formatter={(value) => [`$${value}`, language === 'fr' ? 'Revenus' : 'Revenue']}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#FFD700" 
                  strokeWidth={2} 
                  name={language === 'fr' ? 'Revenus ($)' : 'Revenue ($)'} 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="bookings" className="mt-0">
            <h3 className="text-lg font-medium text-nova-white mb-4">
              {language === 'fr' ? 'Réservations par Véhicule' : 'Bookings by Vehicle'}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={bookingsByVehicle}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {bookingsByVehicle.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#222', borderColor: '#444', color: '#fff' }} 
                  formatter={(value) => [value, language === 'fr' ? 'Réservations' : 'Bookings']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="customers" className="mt-0">
            <h3 className="text-lg font-medium text-nova-white mb-4">
              {language === 'fr' ? 'Croissance des Clients' : 'Customer Growth'}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={customerData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#222', borderColor: '#444', color: '#fff' }} 
                  formatter={(value) => [value, language === 'fr' ? 'Clients' : 'Customers']}
                />
                <Legend />
                <Bar 
                  dataKey="customers" 
                  fill="#D4AF37" 
                  name={language === 'fr' ? 'Nouveaux Clients' : 'New Customers'} 
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="utilization" className="mt-0">
            <h3 className="text-lg font-medium text-nova-white mb-4">
              {language === 'fr' ? 'Taux d\'Utilisation (%)' : 'Utilization Rate (%)'}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={utilizationData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis type="number" domain={[0, 100]} stroke="#999" />
                <YAxis dataKey="name" type="category" stroke="#999" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#222', borderColor: '#444', color: '#fff' }} 
                  formatter={(value) => [`${value}%`, language === 'fr' ? 'Utilisation' : 'Utilization']}
                />
                <Legend />
                <Bar 
                  dataKey="utilization" 
                  fill="#B8860B" 
                  name={language === 'fr' ? 'Taux d\'Utilisation' : 'Utilization Rate'} 
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
