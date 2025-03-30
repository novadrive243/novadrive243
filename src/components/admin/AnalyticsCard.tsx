
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from 'lucide-react';

interface AnalyticsCardProps {
  language: string;
}

export const AnalyticsCard = ({ language }: AnalyticsCardProps) => {
  return (
    <Card className="bg-nova-gray/30 border-nova-gold/30">
      <CardHeader>
        <CardTitle className="text-nova-white">
          {language === 'fr' ? 'Analyses et Rapports' : 'Analytics & Reports'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center p-10">
          <BarChart3 className="h-16 w-16 text-nova-gold/50" />
          <p className="ml-4 text-nova-white/70">
            {language === 'fr' 
              ? 'Les graphiques et analyses seront bientôt disponibles.' 
              : 'Charts and analytics will be available soon.'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
