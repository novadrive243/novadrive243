
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TabTriggersProps {
  activeTab: string;
}

export const TabTriggers = ({ activeTab }: TabTriggersProps) => {
  return (
    <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1">
      <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
      <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
      <TabsTrigger value="bookings">Bookings</TabsTrigger>
      <TabsTrigger value="customers">Customers</TabsTrigger>
      <TabsTrigger value="staff">Staff</TabsTrigger>
      <TabsTrigger value="analytics">Analytics</TabsTrigger>
      <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
      <TabsTrigger value="inventory">Inventory</TabsTrigger>
      <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
      <TabsTrigger value="ratings">Ratings</TabsTrigger>
      <TabsTrigger value="rides">Rides</TabsTrigger>
      <TabsTrigger value="sessions">Sessions</TabsTrigger>
      <TabsTrigger value="notifications">Notifications</TabsTrigger>
    </TabsList>
  );
};
