
import React from 'react';
import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle, Activity, BarChart3 } from "lucide-react";

interface AdvancedAnalyticsProps {
  bookings: any[];
  vehicles: any[];
  profiles: any[];
  language: string;
  formatCurrency: (amount: number) => string;
}

export const AdvancedAnalytics = ({ 
  bookings, 
  vehicles, 
  profiles, 
  language, 
  formatCurrency 
}: AdvancedAnalyticsProps) => {
  // Monthly revenue data for the past 6 months
  const revenueData = [
    { month: language === 'fr' ? 'Jan' : 'Jan', revenue: 24500 },
    { month: language === 'fr' ? 'Fév' : 'Feb', revenue: 28700 },
    { month: language === 'fr' ? 'Mar' : 'Mar', revenue: 32100 },
    { month: language === 'fr' ? 'Avr' : 'Apr', revenue: 38200 },
    { month: language === 'fr' ? 'Mai' : 'May', revenue: 42800 },
    { month: language === 'fr' ? 'Juin' : 'Jun', revenue: 48500 },
  ];
  
  // Vehicle category distribution data
  const vehicleCategoryData = [
    { name: language === 'fr' ? 'Berlines' : 'Sedans', value: 35 },
    { name: language === 'fr' ? 'SUVs' : 'SUVs', value: 25 },
    { name: language === 'fr' ? 'Sport' : 'Sports', value: 20 },
    { name: language === 'fr' ? 'Électrique' : 'Electric', value: 15 },
    { name: language === 'fr' ? 'Autre' : 'Other', value: 5 },
  ];
  
  // Booking distribution by day of week
  const bookingByDayData = [
    { name: language === 'fr' ? 'Lun' : 'Mon', bookings: 15 },
    { name: language === 'fr' ? 'Mar' : 'Tue', bookings: 12 },
    { name: language === 'fr' ? 'Mer' : 'Wed', bookings: 18 },
    { name: language === 'fr' ? 'Jeu' : 'Thu', bookings: 22 },
    { name: language === 'fr' ? 'Ven' : 'Fri', bookings: 30 },
    { name: language === 'fr' ? 'Sam' : 'Sat', bookings: 35 },
    { name: language === 'fr' ? 'Dim' : 'Sun', bookings: 25 },
  ];
  
  // Customer acquisition data
  const customerAcquisitionData = [
    { month: language === 'fr' ? 'Jan' : 'Jan', newCustomers: 18, returningCustomers: 7 },
    { month: language === 'fr' ? 'Fév' : 'Feb', newCustomers: 22, returningCustomers: 9 },
    { month: language === 'fr' ? 'Mar' : 'Mar', newCustomers: 25, returningCustomers: 11 },
    { month: language === 'fr' ? 'Avr' : 'Apr', newCustomers: 30, returningCustomers: 13 },
    { month: language === 'fr' ? 'Mai' : 'May', newCustomers: 28, returningCustomers: 16 },
    { month: language === 'fr' ? 'Juin' : 'Jun', newCustomers: 35, returningCustomers: 19 },
  ];
  
  // Custom render function for tooltips
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-nova-black p-3 border border-nova-gold/20 rounded-md shadow-lg text-nova-white">
          <p className="font-semibold">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {entry.name}: {entry.name.includes('revenue') ? formatCurrency(entry.value) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gold-gradient-text flex items-center">
          <BarChart3 className="mr-2 h-6 w-6 text-nova-gold" />
          {language === 'fr' ? 'Analyses Avancées' : 'Advanced Analytics'}
        </h2>
        <Badge variant="outline" className="text-nova-gold border-nova-gold">
          <Activity className="inline-block mr-1 h-4 w-4" />
          {language === 'fr' ? 'Mise à jour en temps réel' : 'Real-time updates'}
        </Badge>
      </div>
      
      <Tabs defaultValue="revenue" className="w-full">
        <TabsList className="grid grid-cols-4 w-full bg-nova-gray/30 text-nova-white">
          <TabsTrigger value="revenue">
            {language === 'fr' ? 'Revenus' : 'Revenue'}
          </TabsTrigger>
          <TabsTrigger value="vehicles">
            {language === 'fr' ? 'Véhicules' : 'Vehicles'}
          </TabsTrigger>
          <TabsTrigger value="bookings">
            {language === 'fr' ? 'Réservations' : 'Bookings'}
          </TabsTrigger>
          <TabsTrigger value="customers">
            {language === 'fr' ? 'Clients' : 'Customers'}
          </TabsTrigger>
        </TabsList>
        
        {/* Revenue Chart */}
        <TabsContent value="revenue" className="mt-4">
          <Card className="bg-nova-gray/10 border-nova-gold/20">
            <CardHeader>
              <CardTitle className="text-nova-white flex items-center justify-between">
                <span>
                  {language === 'fr' ? 'Analyse des Revenus Mensuels' : 'Monthly Revenue Analysis'}
                </span>
                <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-none">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  +12.5%
                </Badge>
              </CardTitle>
              <CardDescription className="text-nova-white/60">
                {language === 'fr' 
                  ? 'Évolution des revenus au cours des 6 derniers mois' 
                  : 'Revenue growth over the past 6 months'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={revenueData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="month" stroke="#FFF" />
                    <YAxis stroke="#FFF" tickFormatter={(value) => formatCurrency(value).replace('$', '')} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      name={language === 'fr' ? 'Revenus' : 'Revenue'}
                      stroke="#D4AF37"
                      strokeWidth={2}
                      dot={{ r: 6, fill: "#D4AF37", stroke: "#D4AF37", strokeWidth: 1 }}
                      activeDot={{ r: 8, stroke: "#FFF", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Vehicle Distribution Chart */}
        <TabsContent value="vehicles" className="mt-4">
          <Card className="bg-nova-gray/10 border-nova-gold/20">
            <CardHeader>
              <CardTitle className="text-nova-white flex items-center justify-between">
                <span>
                  {language === 'fr' ? 'Distribution des Catégories de Véhicules' : 'Vehicle Category Distribution'}
                </span>
                <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border-none">
                  <TrendingDown className="mr-1 h-4 w-4" />
                  -2.3%
                </Badge>
              </CardTitle>
              <CardDescription className="text-nova-white/60">
                {language === 'fr' 
                  ? 'Répartition des véhicules par catégorie' 
                  : 'Distribution of vehicles by category'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={vehicleCategoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={120}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {vehicleCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#D4AF37', '#B8860B', '#F5DEB3', '#E6C200', '#CFB53B'][index % 5]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Booking by Day Chart */}
        <TabsContent value="bookings" className="mt-4">
          <Card className="bg-nova-gray/10 border-nova-gold/20">
            <CardHeader>
              <CardTitle className="text-nova-white flex items-center justify-between">
                <span>
                  {language === 'fr' ? 'Réservations par Jour de la Semaine' : 'Bookings by Day of Week'}
                </span>
                <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-none">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  +8.2%
                </Badge>
              </CardTitle>
              <CardDescription className="text-nova-white/60">
                {language === 'fr' 
                  ? 'Tendances de réservation par jour de la semaine' 
                  : 'Booking trends by day of the week'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={bookingByDayData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="name" stroke="#FFF" />
                    <YAxis stroke="#FFF" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                      dataKey="bookings"
                      name={language === 'fr' ? 'Réservations' : 'Bookings'}
                      fill="#D4AF37"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Customer Acquisition Chart */}
        <TabsContent value="customers" className="mt-4">
          <Card className="bg-nova-gray/10 border-nova-gold/20">
            <CardHeader>
              <CardTitle className="text-nova-white flex items-center justify-between">
                <span>
                  {language === 'fr' ? 'Acquisition et Fidélisation de Clients' : 'Customer Acquisition & Retention'}
                </span>
                <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-none">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  +5.1%
                </Badge>
              </CardTitle>
              <CardDescription className="text-nova-white/60">
                {language === 'fr' 
                  ? 'Comparaison entre nouveaux clients et clients fidèles' 
                  : 'Comparison between new and returning customers'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={customerAcquisitionData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="month" stroke="#FFF" />
                    <YAxis stroke="#FFF" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                      dataKey="newCustomers"
                      name={language === 'fr' ? 'Nouveaux Clients' : 'New Customers'}
                      fill="#D4AF37"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="returningCustomers"
                      name={language === 'fr' ? 'Clients Fidèles' : 'Returning Customers'}
                      fill="#B8860B"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
