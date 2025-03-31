
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomersTable } from '@/components/admin/CustomersTable';

interface CustomersTabProps {
  profiles: any[];
  language: string;
  formatDate: (dateString: string) => string;
}

export const CustomersTab = ({
  profiles,
  language,
  formatDate,
}: CustomersTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customers</CardTitle>
        <CardDescription>Manage customer accounts and information</CardDescription>
      </CardHeader>
      <CardContent>
        <CustomersTable 
          profiles={profiles}
          language={language}
          formatDate={formatDate}
        />
      </CardContent>
    </Card>
  );
};
