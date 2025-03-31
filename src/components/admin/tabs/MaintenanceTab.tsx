
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MaintenanceTracking } from '@/components/admin/MaintenanceTracking';

interface MaintenanceTabProps {
  vehicles: any[];
  language: string;
  formatDate: (dateString: string) => string;
}

export const MaintenanceTab = ({
  vehicles,
  language,
  formatDate
}: MaintenanceTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance Tracking</CardTitle>
        <CardDescription>Track vehicle maintenance and service history</CardDescription>
      </CardHeader>
      <CardContent>
        <MaintenanceTracking
          vehicles={vehicles}
          language={language}
          formatDate={formatDate}
        />
      </CardContent>
    </Card>
  );
};
