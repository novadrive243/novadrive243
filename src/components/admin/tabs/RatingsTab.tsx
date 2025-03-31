
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { VehicleRatings } from '@/components/admin/VehicleRatings';

interface RatingsTabProps {
  language: string;
  formatDate: (dateString: string) => string;
}

export const RatingsTab = ({
  language,
  formatDate
}: RatingsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ratings & Reviews</CardTitle>
        <CardDescription>View customer ratings and feedback</CardDescription>
      </CardHeader>
      <CardContent>
        <VehicleRatings
          language={language}
          formatDate={formatDate}
        />
      </CardContent>
    </Card>
  );
};
