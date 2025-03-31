
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { SessionsTracker } from '@/components/admin/SessionsTracker';

export const SessionsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Sessions</CardTitle>
        <CardDescription>Track user login activity</CardDescription>
      </CardHeader>
      <CardContent>
        <SessionsTracker />
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        Data is refreshed automatically every 5 minutes
      </CardFooter>
    </Card>
  );
};
