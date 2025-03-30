
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode; 
  change: { value: number; positive: boolean };
  language: string;
}

export const StatCard = ({ title, value, icon, change, language }: StatCardProps) => (
  <Card className="bg-nova-gray/30 border-nova-gold/30">
    <CardContent className="p-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-nova-white/70">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-nova-white mt-1">{value}</h3>
        </div>
        <div className="bg-nova-gold/20 p-3 rounded-full">
          {icon}
        </div>
      </div>
      <div className="flex items-center mt-4">
        {change.positive ? (
          <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
        ) : (
          <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
        )}
        <span className={change.positive ? "text-green-500 text-sm" : "text-red-500 text-sm"}>
          {change.value > 0 ? `+${change.value}%` : `${change.value}%`}
        </span>
        <span className="text-nova-white/50 text-sm ml-2">
          {language === 'fr' ? 'Depuis le mois dernier' : 'Since last month'}
        </span>
      </div>
    </CardContent>
  </Card>
);
