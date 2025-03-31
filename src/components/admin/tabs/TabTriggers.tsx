
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TabTriggersProps {
  activeTab: string;
}

export const TabTriggers = ({ activeTab }: TabTriggersProps) => {
  return (
    <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-1">
      <TabsTrigger value="bookings">Bookings</TabsTrigger>
      <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
      <TabsTrigger value="customers">Customers</TabsTrigger>
      <TabsTrigger value="staff">Staff</TabsTrigger>
      <TabsTrigger value="analytics">Analytics</TabsTrigger>
      <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
      <TabsTrigger value="inventory">Inventory</TabsTrigger>
      <TabsTrigger value="rides">Rides</TabsTrigger>
      <TabsTrigger value="sessions">Sessions</TabsTrigger>
      <TabsTrigger value="notifications">Notifications</TabsTrigger>
    </TabsList>
  );
};
