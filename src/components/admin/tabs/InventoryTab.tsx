
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InventoryManager } from '@/components/admin/InventoryManager';

interface InventoryTabProps {
  vehicles: any[];
  language: string;
  formatCurrency: (amount: number) => string;
}

export const InventoryTab = ({
  vehicles,
  language,
  formatCurrency
}: InventoryTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Management</CardTitle>
        <CardDescription>Manage parts and supplies inventory</CardDescription>
      </CardHeader>
      <CardContent>
        <InventoryManager
          vehicles={vehicles}
          language={language}
          formatCurrency={formatCurrency}
        />
      </CardContent>
    </Card>
  );
};
