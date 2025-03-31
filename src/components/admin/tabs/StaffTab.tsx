
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StaffManagement } from '@/components/admin/StaffManagement';

interface StaffTabProps {
  language: string;
  formatDate: (dateString: string) => string;
}

export const StaffTab = ({
  language,
  formatDate
}: StaffTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff Management</CardTitle>
        <CardDescription>Manage employees and their permissions</CardDescription>
      </CardHeader>
      <CardContent>
        <StaffManagement 
          language={language}
          formatDate={formatDate}
        />
      </CardContent>
    </Card>
  );
};
