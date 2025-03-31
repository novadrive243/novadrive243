
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RidesHistory } from '@/components/admin/RidesHistory';

export const RidesTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rides History</CardTitle>
        <CardDescription>View completed ride history</CardDescription>
      </CardHeader>
      <CardContent>
        <RidesHistory />
      </CardContent>
    </Card>
  );
};
