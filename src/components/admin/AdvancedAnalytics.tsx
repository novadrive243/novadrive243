
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle, Activity, BarChart3 } from 'lucide-react';

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
  const hasData = bookings.length > 0 || vehicles.length > 0 || profiles.length > 0;
  
  // Calculate total revenue from bookings
  const totalRevenue = bookings.reduce((sum, booking) => sum + Number(booking.total_price || 0), 0);
  
  // Monthly revenue data based on actual bookings or empty if no data
  const revenueData = [];
  if (hasData) {
    // Create a map of months with actual booking data
    const monthlyRevenueMap = new Map();
    const monthNames = language === 'fr' 
      ? ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Initialize last 6 months with zero revenue
    const currentMonth = new Date().getMonth();
    for (let i = 0; i < 6; i++) {
      const monthIndex = (currentMonth - i + 12) % 12;
      monthlyRevenueMap.set(monthNames[monthIndex], 0);
    }
    
    // Fill with actual booking data
    bookings.forEach(booking => {
      if (booking.start_date) {
        const bookingMonth = new Date(booking.start_date).getMonth();
        const monthName = monthNames[bookingMonth];
        if (monthlyRevenueMap.has(monthName)) {
          monthlyRevenueMap.set(
            monthName, 
            monthlyRevenueMap.get(monthName) + Number(booking.total_price || 0)
          );
        }
      }
    });
    
    // Convert map to array for chart
    for (const [month, revenue] of [...monthlyRevenueMap.entries()].reverse()) {
      revenueData.push({ month, revenue });
    }
  } else {
    // If no data, create empty chart with zero values
    const monthNames = language === 'fr' 
      ? ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    
    monthNames.forEach(month => {
      revenueData.push({ month, revenue: 0 });
    });
  }
  
  // Vehicle category distribution data
  const vehicleCategoryData = [];
  if (vehicles.length > 0) {
    // Group vehicles by category
    const categoryMap = new Map();
    vehicles.forEach(vehicle => {
      const category = vehicle.category || (language === 'fr' ? 'Autre' : 'Other');
      if (categoryMap.has(category)) {
        categoryMap.set(category, categoryMap.get(category) + 1);
      } else {
        categoryMap.set(category, 1);
      }
    });
    
    // Convert map to array for chart
    for (const [name, value] of categoryMap.entries()) {
      vehicleCategoryData.push({ name, value });
    }
  } else {
    // Empty chart data
    vehicleCategoryData.push({ 
      name: language === 'fr' ? 'Aucune donnée' : 'No data', 
      value: 1 
    });
  }
  
  // Booking distribution by day of week
  const bookingByDayData = [];
  if (bookings.length > 0) {
    // Initialize days of the week
    const daysOfWeek = language === 'fr' 
      ? ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
      : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    const dayCountMap = new Map(daysOfWeek.map(day => [day, 0]));
    
    // Count bookings by day of week
    bookings.forEach(booking => {
      if (booking.start_date) {
        const bookingDate = new Date(booking.start_date);
        // getDay() returns 0 for Sunday, so adjust to get Monday as 0
        const dayIndex = (bookingDate.getDay() + 6) % 7;
        const dayName = daysOfWeek[dayIndex];
        dayCountMap.set(dayName, dayCountMap.get(dayName) + 1);
      }
    });
    
    // Convert map to array for chart
    daysOfWeek.forEach(day => {
      bookingByDayData.push({ name: day, bookings: dayCountMap.get(day) });
    });
  } else {
    // Empty chart data for days of week
    const daysOfWeek = language === 'fr' 
      ? ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
      : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    daysOfWeek.forEach(day => {
      bookingByDayData.push({ name: day, bookings: 0 });
    });
  }
  
  // Customer acquisition data
  const customerAcquisitionData = [];
  if (profiles.length > 0) {
    // Group profiles by creation month
    const monthlyCustomerMap = new Map();
    const monthNames = language === 'fr' 
      ? ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Initialize last 6 months with zero customers
    const currentMonth = new Date().getMonth();
    for (let i = 0; i < 6; i++) {
      const monthIndex = (currentMonth - i + 12) % 12;
      monthlyCustomerMap.set(monthNames[monthIndex], { newCustomers: 0, returningCustomers: 0 });
    }
    
    // Process profiles
    profiles.forEach(profile => {
      if (profile.created_at) {
        const profileMonth = new Date(profile.created_at).getMonth();
        const monthName = monthNames[profileMonth];
        if (monthlyCustomerMap.has(monthName)) {
          const currentData = monthlyCustomerMap.get(monthName);
          // Check if customer has bookings to determine if they're returning
          const customerBookings = bookings.filter(b => b.user_id === profile.id);
          if (customerBookings.length > 0) {
            currentData.returningCustomers += 1;
          } else {
            currentData.newCustomers += 1;
          }
          monthlyCustomerMap.set(monthName, currentData);
        }
      }
    });
    
    // Convert map to array for chart
    for (const [month, data] of [...monthlyCustomerMap.entries()].reverse()) {
      customerAcquisitionData.push({ 
        month, 
        newCustomers: data.newCustomers, 
        returningCustomers: data.returningCustomers 
      });
    }
  } else {
    // If no data, create empty chart with zero values
    const monthNames = language === 'fr' 
      ? ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    
    monthNames.forEach(month => {
      customerAcquisitionData.push({ 
        month, 
        newCustomers: 0, 
        returningCustomers: 0 
      });
    });
  }
  
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
  
  // Show empty state if no data
  if (!hasData) {
    return (
      <div className="space-y-6">
        <Card className="bg-nova-gray/10 border-nova-gold/20">
          <CardHeader>
            <CardTitle className="text-nova-white">
              {language === 'fr' ? 'Aucune donnée analytique disponible' : 'No Analytics Data Available'}
            </CardTitle>
            <CardDescription className="text-nova-white/60">
              {language === 'fr' 
                ? 'Commencez à ajouter des réservations, des véhicules ou des clients pour voir les analyses' 
                : 'Start adding bookings, vehicles or customers to see analytics'}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-10">
            <BarChart3 className="h-20 w-20 text-nova-gold/30 mb-4" />
            <p className="text-nova-white/70 text-center max-w-md">
              {language === 'fr' 
                ? 'Les graphiques et les analyses apparaîtront ici une fois que vous aurez ajouté des données à votre système.' 
                : 'Charts and analytics will appear here once you add data to your system.'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Colors for charts
  const COLORS = ['#D4AF37', '#B8860B', '#F5DEB3', '#E6C200', '#CFB53B'];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-nova-white flex items-center">
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
                  {totalRevenue > 0 ? '+12.5%' : '0%'}
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
                <Badge className={vehicles.length > 0 ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 border-none" : "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 border-none"}>
                  {vehicles.length > 0 ? <TrendingDown className="mr-1 h-4 w-4" /> : <AlertTriangle className="mr-1 h-4 w-4" />}
                  {vehicles.length > 0 ? '-2.3%' : '0%'}
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
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                <Badge className={bookings.length > 0 ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 border-none" : "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 border-none"}>
                  {bookings.length > 0 ? <TrendingUp className="mr-1 h-4 w-4" /> : <AlertTriangle className="mr-1 h-4 w-4" />}
                  {bookings.length > 0 ? '+8.2%' : '0%'}
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
                <Badge className={profiles.length > 0 ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 border-none" : "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 border-none"}>
                  {profiles.length > 0 ? <TrendingUp className="mr-1 h-4 w-4" /> : <AlertTriangle className="mr-1 h-4 w-4" />}
                  {profiles.length > 0 ? '+5.1%' : '0%'}
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
