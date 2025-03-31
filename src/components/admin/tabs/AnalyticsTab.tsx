
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AdvancedAnalytics } from '@/components/admin/AdvancedAnalytics';

interface AnalyticsTabProps {
  bookings: any[];
  vehicles: any[];
  profiles: any[];
  language: string;
  formatCurrency: (amount: number) => string;
}

export const AnalyticsTab = ({
  bookings,
  vehicles,
  profiles,
  language,
  formatCurrency
}: AnalyticsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Analytics</CardTitle>
        <CardDescription>Detailed business analytics and insights</CardDescription>
      </CardHeader>
      <CardContent>
        <AdvancedAnalytics 
          bookings={bookings}
          vehicles={vehicles}
          profiles={profiles}
          language={language}
          formatCurrency={formatCurrency}
        />
      </CardContent>
    </Card>
  );
};
