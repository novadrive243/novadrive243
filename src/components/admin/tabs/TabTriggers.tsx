
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TabTriggersProps {
  activeTab: string;
}

export const TabTriggers = ({ activeTab }: TabTriggersProps) => {
  return (
    <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 p-2 justify-start w-full bg-nova-black border border-nova-gold/20 rounded-md">
      <TabsTrigger value="bookings" className="text-sm px-3 py-1.5">Bookings</TabsTrigger>
      <TabsTrigger value="vehicles" className="text-sm px-3 py-1.5">Vehicles</TabsTrigger>
      <TabsTrigger value="customers" className="text-sm px-3 py-1.5">Customers</TabsTrigger>
      <TabsTrigger value="staff" className="text-sm px-3 py-1.5">Staff</TabsTrigger>
      <TabsTrigger value="analytics" className="text-sm px-3 py-1.5">Analytics</TabsTrigger>
      <TabsTrigger value="maintenance" className="text-sm px-3 py-1.5">Maintenance</TabsTrigger>
      <TabsTrigger value="inventory" className="text-sm px-3 py-1.5">Inventory</TabsTrigger>
      <TabsTrigger value="rides" className="text-sm px-3 py-1.5">Rides</TabsTrigger>
      <TabsTrigger value="sessions" className="text-sm px-3 py-1.5">Sessions</TabsTrigger>
      <TabsTrigger value="notifications" className="text-sm px-3 py-1.5">Notifications</TabsTrigger>
    </TabsList>
  );
};
