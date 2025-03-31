
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dashboard } from '@/components/admin/Dashboard';

interface DashboardTabProps {
  bookings: any[];
  vehicles: any[];
  profiles: any[];
  monthlyRevenue: number;
  percentChange: {
    revenue: number;
    bookings: number;
    customers: number;
    vehicles: number;
  };
  language: string;
  formatCurrency: (amount: number) => string;
}

export const DashboardTab = ({
  bookings,
  vehicles,
  profiles,
  monthlyRevenue,
  percentChange,
  language,
  formatCurrency
}: DashboardTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
        <CardDescription>Overview of all NovaDrive operations</CardDescription>
      </CardHeader>
      <CardContent>
        <Dashboard 
          bookings={bookings}
          vehicles={vehicles}
          profiles={profiles}
          monthlyRevenue={monthlyRevenue}
          availableVehicles={vehicles.filter(v => v.available).length}
          percentChange={percentChange}
          language={language}
          formatCurrency={formatCurrency}
        />
      </CardContent>
    </Card>
  );
};
