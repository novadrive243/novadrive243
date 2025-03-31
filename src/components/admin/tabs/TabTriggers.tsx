
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TabTriggersProps {
  activeTab: string;
}

export const TabTriggers = ({ activeTab }: TabTriggersProps) => {
  return (
    <TabsList className="flex flex-wrap gap-2 p-2 justify-start w-full bg-nova-black border border-nova-gold/20 rounded-md">
      <TabsTrigger value="bookings" className="text-sm px-3 py-1.5 whitespace-nowrap">Bookings</TabsTrigger>
      <TabsTrigger value="vehicles" className="text-sm px-3 py-1.5 whitespace-nowrap">Vehicles</TabsTrigger>
      <TabsTrigger value="customers" className="text-sm px-3 py-1.5 whitespace-nowrap">Customers</TabsTrigger>
      <TabsTrigger value="staff" className="text-sm px-3 py-1.5 whitespace-nowrap">Staff</TabsTrigger>
      <TabsTrigger value="analytics" className="text-sm px-3 py-1.5 whitespace-nowrap">Analytics</TabsTrigger>
      <TabsTrigger value="maintenance" className="text-sm px-3 py-1.5 whitespace-nowrap">Maintenance</TabsTrigger>
      <TabsTrigger value="inventory" className="text-sm px-3 py-1.5 whitespace-nowrap">Inventory</TabsTrigger>
      <TabsTrigger value="rides" className="text-sm px-3 py-1.5 whitespace-nowrap">Rides</TabsTrigger>
      <TabsTrigger value="sessions" className="text-sm px-3 py-1.5 whitespace-nowrap">Sessions</TabsTrigger>
      <TabsTrigger value="notifications" className="text-sm px-3 py-1.5 whitespace-nowrap">Notifications</TabsTrigger>
    </TabsList>
  );
};
